import { getByCode } from '../../../lib/db';
import { resolveRow } from '../../../lib/certResolve';
import { normalizeCode, isValidCode, formatCertDate, type CertLocale } from '../../../lib/certificates';

export const runtime = 'nodejs';

/**
 * Публичная проверка сертификата по номеру.
 *
 * Ключ не требуется, поэтому наружу отдаётся минимум: имя, курс, дата
 * выдачи и срок действия. Компания, преподаватель и заметки остаются
 * внутри — их незачем показывать тому, кто просто подобрал номер.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const raw = url.searchParams.get('code') ?? '';
  const langParam = url.searchParams.get('lang');
  const lang: CertLocale = langParam === 'en' || langParam === 'kz' ? langParam : 'ru';

  if (!isValidCode(raw)) {
    return Response.json({ found: false, reason: 'invalid' }, { status: 400 });
  }

  const code = normalizeCode(raw);

  try {
    const stored = await getByCode(code);
    if (!stored) return Response.json({ found: false, reason: 'not_found' }, { status: 404 });

    // Справочник поверх записи: если название курса или срок поправили в
    // Studio, проверка обязана показывать поправленное, а не то, что было
    // скопировано в реестр при выдаче.
    const row = await resolveRow(stored);

    // Языковая версия с откатом на русскую, если её не заполняли
    const pickLang = (ru: string | null, en: string | null, kz: string | null) =>
      (lang === 'en' ? en : lang === 'kz' ? kz : ru) || ru || '';

    const firstName = pickLang(row.first_name_ru, row.first_name_en, row.first_name_kz);
    const lastName = pickLang(row.last_name_ru, row.last_name_en, row.last_name_kz);
    const course = pickLang(row.course_ru, row.course_en, row.course_kz);

    // Сравниваем по календарной дате: сертификат действует весь последний день
    const today = new Date().toISOString().slice(0, 10);
    const expired = !row.perpetual && !!row.valid_until && row.valid_until < today;

    return Response.json({
      found: true,
      code: row.code,
      firstName,
      lastName,
      course,
      issuedAt: row.issued_at,
      issuedAtLabel: row.issued_at ? formatCertDate(row.issued_at, lang) : null,
      perpetual: row.perpetual,
      validUntil: row.valid_until,
      validUntilLabel: row.valid_until ? formatCertDate(row.valid_until, lang) : null,
      expired,
    });
  } catch (error) {
    console.error('Не удалось проверить сертификат:', error);
    return Response.json({ found: false, reason: 'error' }, { status: 500 });
  }
}
