import { isAuthorized, unauthorized } from '../../../lib/adminAuth';
import { insertMany, takenCodes } from '../../../lib/db';
import { generateCode } from '../../../lib/certificates';
import { getCertRefs } from '../../../lib/certRefs';
import { parseWorkbook, SHEETS, type ImportError } from '../../../lib/certExcel';

export const runtime = 'nodejs';
// Три тысячи строк разбираются и пишутся дольше стандартного лимита
export const maxDuration = 60;

/** Восемь мегабайт — это заведомо больше любого реального реестра. */
const MAX_BYTES = 8 * 1024 * 1024;

/**
 * Подбирает свободные номера сразу на всю пачку. Проверка по базе одна на
 * все кандидаты: три тысячи отдельных запросов не уложатся в лимит времени.
 */
async function allocateCodes(count: number, reserved: Set<string>): Promise<string[]> {
  const ready: string[] = [];
  const used = new Set(reserved);

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

  if (ready.length < count) throw new Error('Не удалось подобрать свободные номера сертификатов');
  return ready;
}

/** Ошибки в порядке листов и строк — так их удобнее править в файле. */
function sortErrors(errors: ImportError[]): ImportError[] {
  const order: string[] = [SHEETS.ru, SHEETS.en, SHEETS.kz];
  return [...errors].sort((a, b) => {
    const sheet = order.indexOf(a.sheet) - order.indexOf(b.sheet);
    return sheet !== 0 ? sheet : a.row - b.row;
  });
}

/**
 * Загрузка реестра из книги Excel.
 *
 * Всё или ничего: если хотя бы одна строка не проходит проверку, не пишется
 * ничего и возвращается полный список замечаний. Частичная загрузка оставила
 * бы файл и реестр в состоянии, где непонятно, что уже внутри, а что нет.
 *
 * `?dry=1` делает то же самое, но без записи — для кнопки «Проверить файл».
 */
export async function POST(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  const file = await req.arrayBuffer();
  if (!file.byteLength) {
    return Response.json({ error: 'Файл пустой' }, { status: 400 });
  }
  if (file.byteLength > MAX_BYTES) {
    return Response.json({ error: 'Файл больше 8 МБ' }, { status: 413 });
  }

  const dryRun = new URL(req.url).searchParams.get('dry') === '1';

  try {
    const refs = await getCertRefs();
    if (!refs.courses.length) {
      return Response.json(
        { error: 'В Studio не заведено ни одного курса — загружать не с чем' },
        { status: 400 },
      );
    }
    if (!refs.completions.length) {
      return Response.json(
        { error: 'В Studio не заведено ни одного текста о прохождении' },
        { status: 400 },
      );
    }

    let parsed;
    try {
      parsed = await parseWorkbook(file, refs);
    } catch (error) {
      console.error('Не удалось разобрать книгу:', error);
      return Response.json({ error: 'Файл не читается как книга Excel' }, { status: 400 });
    }

    // Занятость номеров проверяем здесь: разбору для этого пришлось бы
    // ходить в базу построчно.
    const errors = [...parsed.errors];
    const codes = [...parsed.codeRows.keys()];
    if (codes.length) {
      const taken = await takenCodes(codes);
      for (const code of taken) {
        errors.push({
          sheet: SHEETS.ru,
          row: parsed.codeRows.get(code) ?? 0,
          column: 'Номер сертификата',
          message: `${code} уже есть в реестре`,
        });
      }
    }

    if (errors.length) {
      return Response.json({
        ok: false,
        ready: parsed.rows.length,
        errors: sortErrors(errors).slice(0, 200),
        errorsTotal: errors.length,
      }, { status: 422 });
    }

    if (!parsed.rows.length) {
      return Response.json({ error: 'В файле нет ни одной заполненной строки' }, { status: 400 });
    }

    if (dryRun) {
      return Response.json({ ok: true, checked: parsed.rows.length, imported: 0, errors: [] });
    }

    /* Номера: вписанные берём как есть, остальным выдаём свои */
    const need = parsed.rows.filter((row) => !row.code).length;
    const fresh = await allocateCodes(need, new Set(codes));
    let next = 0;

    const payload = parsed.rows.map((row) => ({ ...row, code: row.code ?? fresh[next++] }));

    const imported = await insertMany(payload);
    return Response.json({ ok: true, imported, errors: [] });
  } catch (error) {
    console.error('Не удалось загрузить реестр:', error);
    return Response.json({ error: 'Ошибка загрузки' }, { status: 500 });
  }
}
