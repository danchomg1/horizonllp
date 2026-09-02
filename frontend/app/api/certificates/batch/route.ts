import { isAuthorized, unauthorized } from '../../../lib/adminAuth';
import { insertMany, takenCodes, takenLegacyCodes, type CertificateInput } from '../../../lib/db';
import { generateCode, normalizeCode } from '../../../lib/certificates';

export const runtime = 'nodejs';
// Группу в полсотни человек пишем одним запросом, но база бывает холодной
export const maxDuration = 30;

/** Сколько человек разрешено выдать за один раз. */
const MAX_PEOPLE = 200;

/**
 * Подбирает свободные номера сразу на всю группу: проверка по базе одна на
 * все кандидаты, а не по одному запросу на человека.
 */
async function allocateCodes(count: number): Promise<string[]> {
  const ready: string[] = [];
  const used = new Set<string>();

  for (let attempt = 0; attempt < 5 && ready.length < count; attempt++) {
    const batch: string[] = [];
    while (batch.length < count - ready.length) {
      const code = generateCode();
      if (used.has(code)) continue;
      used.add(code);
      batch.push(code);
    }
    // Занятые остаются в used, чтобы не выпасть повторно на следующем круге
    const taken = await takenCodes(batch);
    for (const code of batch) if (!taken.has(code)) ready.push(code);
  }

  if (ready.length < count) throw new Error('Не удалось подобрать свободные номера');
  return ready;
}

/**
 * Выдача группе.
 *
 * Курс, преподаватель, даты, место и текст у группы общие — они приходят
 * в `shared`. Личное у каждого своё: имя на трёх языках, компания и
 * дополнительный номер. Свой номер система выдаёт каждому.
 *
 * Всё или ничего: пачка пишется одним запросом, поэтому половина группы
 * в реестре осесть не может.
 */
export async function POST(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  let body: { shared?: Record<string, unknown>; people?: Record<string, unknown>[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Тело запроса не является JSON' }, { status: 400 });
  }

  const shared = body.shared ?? {};
  const people = Array.isArray(body.people) ? body.people : [];

  if (!people.length) {
    return Response.json({ error: 'Не добавлено ни одного человека' }, { status: 400 });
  }
  if (people.length > MAX_PEOPLE) {
    return Response.json({ error: `За один раз можно выдать не больше ${MAX_PEOPLE}` }, { status: 400 });
  }
  if (!String(shared.course_ru ?? '').trim()) {
    return Response.json({ error: 'Не выбран курс' }, { status: 400 });
  }

  // Пустое имя или фамилия — сразу с номером строки, чтобы было понятно чьё
  const missing: string[] = [];
  people.forEach((person, index) => {
    for (const [field, title] of [['first_name_ru', 'Имя'], ['last_name_ru', 'Фамилия']] as const) {
      if (!String(person[field] ?? '').trim()) missing.push(`${index + 1}: ${title}`);
    }
  });
  if (missing.length) {
    return Response.json(
      { error: `Не заполнено — участник ${missing.join('; участник ')}` },
      { status: 400 },
    );
  }

  try {
    /* Дополнительные номера: уникальны и внутри группы, и по реестру */
    const extras = people
      .map((p) => String(p.legacy_code ?? '').trim())
      .filter(Boolean)
      .map(normalizeCode);

    const repeated = extras.filter((code, i) => extras.indexOf(code) !== i);
    if (repeated.length) {
      return Response.json(
        { error: `Дополнительный номер повторяется: ${[...new Set(repeated)].join(', ')}` },
        { status: 400 },
      );
    }
    const taken = await takenLegacyCodes(extras);
    if (taken.size) {
      return Response.json(
        { error: `Дополнительный номер уже есть в реестре: ${[...taken].join(', ')}` },
        { status: 409 },
      );
    }

    const codes = await allocateCodes(people.length);
    const rows: CertificateInput[] = people.map((person, index) => {
      const extra = String(person.legacy_code ?? '').trim();
      return {
        ...shared,
        ...person,
        code: codes[index],
        legacy_code: extra ? normalizeCode(extra) : null,
      };
    });

    const written = await insertMany(rows);
    return Response.json({ ok: true, issued: written, codes }, { status: 201 });
  } catch (error) {
    console.error('Не удалось выдать группе:', error);
    return Response.json({ error: 'Ошибка записи в базу' }, { status: 500 });
  }
}
