import JSZip from 'jszip';
import { isAuthorized, unauthorized } from '../../../lib/adminAuth';
import { getById, type CertificateRow } from '../../../lib/db';
import { formatCertDate, formatDateRange, formatHours, type CertLocale } from '../../../lib/certificates';
import { renderCertificate, type CertificateData } from '../../../../certificates/render';

export const runtime = 'nodejs';
// Пакет из десятков сертификатов не укладывается в стандартный лимит
export const maxDuration = 60;

const LOCALES: CertLocale[] = ['ru', 'en', 'kz'];

/** Подписи «действует до» и «бессрочно» на каждом языке. */
const LABELS: Record<CertLocale, { until: (d: string) => string; perpetual: string }> = {
  ru: { until: (d) => `до ${d}`, perpetual: 'бессрочный' },
  en: { until: (d) => `until ${d}`, perpetual: 'unlimited' },
  kz: { until: (d) => `${d} дейін`, perpetual: 'мерзімсіз' },
};

/** Значение поля на нужном языке с откатом на русское. */
function pickField(row: CertificateRow, base: string, locale: CertLocale): string {
  const suffix = locale === 'en' ? '_en' : locale === 'kz' ? '_kz' : '_ru';
  const value = (row as unknown as Record<string, string | null>)[base + suffix];
  const fallback = (row as unknown as Record<string, string | null>)[base + '_ru'];
  return (value || fallback || '').trim();
}

function toCertificateData(row: CertificateRow, locale: CertLocale, director: string): CertificateData {
  const labels = LABELS[locale];

  const trainingDate = row.training_from
    ? (row.training_to
        ? formatDateRange(row.training_from, row.training_to, locale)
        : formatCertDate(row.training_from, locale))
    : undefined;

  const validUntil = row.perpetual
    ? labels.perpetual
    : row.valid_until
      ? labels.until(formatCertDate(row.valid_until, locale))
      : undefined;

  return {
    code: row.code,
    // В бланке имя идёт одной строкой: фамилия, затем имя
    name: `${pickField(row, 'last_name', locale)} ${pickField(row, 'first_name', locale)}`.trim(),
    course: pickField(row, 'course', locale),
    completed: pickField(row, 'completed', locale) || undefined,
    hours: row.hours ? formatHours(row.hours, locale) : undefined,
    trainingDate,
    location: pickField(row, 'location', locale) || undefined,
    instructor: pickField(row, 'instructor', locale) || undefined,
    director,
    validUntil,
  };
}

/** Языки, на которых у записи есть данные. */
function availableLocales(row: CertificateRow, requested: CertLocale[]): CertLocale[] {
  return requested.filter((l) => l === 'ru' || (l === 'en' && row.has_en) || (l === 'kz' && row.has_kz));
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  let body: { ids?: unknown; locales?: unknown; director?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Тело запроса не является JSON' }, { status: 400 });
  }

  const ids = Array.isArray(body.ids) ? body.ids.map(Number).filter(Number.isInteger) : [];
  if (!ids.length) return Response.json({ error: 'Не выбрано ни одного сертификата' }, { status: 400 });

  const requested = (Array.isArray(body.locales) ? body.locales : ['ru'])
    .filter((l): l is CertLocale => LOCALES.includes(l as CertLocale));
  if (!requested.length) return Response.json({ error: 'Не выбран язык' }, { status: 400 });

  const director = String(body.director ?? 'Малик Бакытбек');

  try {
    const files: { name: string; bytes: Uint8Array }[] = [];
    const skipped: string[] = [];

    for (const id of ids) {
      const row = await getById(id);
      if (!row) continue;

      const locales = availableLocales(row, requested);
      if (!locales.length) {
        skipped.push(row.code);
        continue;
      }

      for (const locale of locales) {
        const bytes = await renderCertificate(locale, toCertificateData(row, locale, director));
        const person = pickField(row, 'last_name', 'en') || pickField(row, 'last_name', 'ru');
        files.push({
          name: `${row.code}-${locale.toUpperCase()}-${person}.pdf`.replace(/[\\/:*?"<>|]/g, '_'),
          bytes,
        });
      }
    }

    if (!files.length) {
      return Response.json(
        { error: 'Нечего генерировать: у выбранных записей нет версий на указанных языках' },
        { status: 400 },
      );
    }

    // Один файл отдаём как есть, несколько — архивом
    if (files.length === 1) {
      return new Response(files[0].bytes as BodyInit, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${files[0].name}"`,
          'X-Skipped': String(skipped.length),
        },
      });
    }

    const zip = new JSZip();
    for (const file of files) zip.file(file.name, file.bytes);
    // PDF уже сжат внутри, повторное сжатие только тратит время
    const archive = await zip.generateAsync({ type: 'uint8array', compression: 'STORE' });

    return new Response(archive as BodyInit, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="certificates-${files.length}.zip"`,
        'X-Skipped': String(skipped.length),
      },
    });
  } catch (error) {
    console.error('Не удалось сгенерировать сертификаты:', error);
    return Response.json({ error: 'Ошибка генерации PDF' }, { status: 500 });
  }
}
