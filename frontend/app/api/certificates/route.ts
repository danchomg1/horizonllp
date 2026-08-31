import { isAuthorized, unauthorized } from '../../lib/adminAuth';
import { listCertificates, insertCertificate, codeExists, SORTABLE, type SortKey } from '../../lib/db';
import { generateCode, normalizeCode } from '../../lib/certificates';

export const runtime = 'nodejs';

/** Подбирает свободный номер. Коллизия при 31^5 маловероятна, но проверяем. */
async function allocateCode(attempts = 12): Promise<string> {
  for (let i = 0; i < attempts; i++) {
    const code = generateCode();
    if (!(await codeExists(code))) return code;
  }
  throw new Error('Не удалось подобрать свободный номер сертификата');
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  const url = new URL(req.url);
  const sortParam = url.searchParams.get('sort') ?? '';
  const sort = (sortParam in SORTABLE ? sortParam : 'createdAt') as SortKey;

  try {
    const result = await listCertificates({
      q: url.searchParams.get('q') ?? undefined,
      sort,
      dir: url.searchParams.get('dir') === 'asc' ? 'asc' : 'desc',
      page: Number(url.searchParams.get('page')) || 1,
      perPage: Number(url.searchParams.get('perPage')) || 50,
    });
    return Response.json(result);
  } catch (error) {
    console.error('Не удалось получить список сертификатов:', error);
    return Response.json({ error: 'Ошибка чтения из базы' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Тело запроса не является JSON' }, { status: 400 });
  }

  // Русская версия обязательна — она источник для остальных языков
  const required = ['first_name_ru', 'last_name_ru', 'course_ru'] as const;
  const missing = required.filter((f) => !String(body[f] ?? '').trim());
  if (missing.length) {
    return Response.json(
      { error: 'Не заполнены обязательные поля', fields: missing },
      { status: 400 },
    );
  }

  if (body.perpetual && body.valid_until) {
    return Response.json(
      { error: 'Нельзя одновременно указать срок действия и бессрочность' },
      { status: 400 },
    );
  }

  try {
    // Номер либо задан вручную (перенос старой записи), либо выдаём новый
    const manual = String(body.code ?? '').trim();
    let code: string;
    if (manual) {
      code = normalizeCode(manual);
      if (await codeExists(code)) {
        return Response.json({ error: `Номер ${code} уже занят` }, { status: 409 });
      }
    } else {
      code = await allocateCode();
    }

    const row = await insertCertificate({ ...body, code });
    return Response.json(row, { status: 201 });
  } catch (error) {
    console.error('Не удалось создать сертификат:', error);
    return Response.json({ error: 'Ошибка записи в базу' }, { status: 500 });
  }
}
