import { isAuthorized, unauthorized } from '../../../lib/adminAuth';
import { sql } from '../../../lib/db';
import { buildExport, type ExportRow } from '../../../lib/certExcel';

export const runtime = 'nodejs';
// Три тысячи строк собираются дольше стандартного лимита
export const maxDuration = 60;

const XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

/**
 * Выгрузка всего реестра одним листом.
 *
 * Даты берём строками через to_char: объект Date у драйвера — локальная
 * полночь, и любое приведение к ISO сдвинуло бы день назад.
 */
export async function GET(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  try {
    const rows = await sql`
      SELECT code, legacy_code, last_name_ru, first_name_ru, company_ru, course_ru,
             instructor_ru, location_ru, completed_ru, hours, perpetual,
             has_ru, has_en, has_kz,
             last_name_en, first_name_en, last_name_kz, first_name_kz,
             to_char(training_from,'DD.MM.YYYY') AS training_from,
             to_char(training_to,'DD.MM.YYYY')   AS training_to,
             to_char(issued_at,'DD.MM.YYYY')     AS issued_at,
             to_char(valid_until,'DD.MM.YYYY')   AS valid_until
        FROM certificates
       ORDER BY issued_at DESC NULLS LAST, id DESC`;

    const bytes = await buildExport(rows as unknown as ExportRow[]);
    const stamp = new Date().toISOString().slice(0, 10);

    return new Response(bytes as BodyInit, {
      headers: {
        'Content-Type': XLSX,
        'Content-Disposition': `attachment; filename="horizon-registry-${stamp}.xlsx"`,
        'X-Rows': String(rows.length),
      },
    });
  } catch (error) {
    console.error('Не удалось выгрузить реестр:', error);
    return Response.json({ error: 'Ошибка выгрузки' }, { status: 500 });
  }
}
