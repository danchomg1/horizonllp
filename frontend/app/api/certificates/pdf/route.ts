import JSZip from 'jszip';
import { isAuthorized, unauthorized } from '../../../lib/adminAuth';
import { getById, type CertificateRow } from '../../../lib/db';
import {
  formatCertDate, formatDateRange, formatHours, transliterate, type CertLocale,
} from '../../../lib/certificates';
import { renderCertificate, type CertificateData } from '../../../../certificates/render';
import { getCertSettings } from '../../../lib/certSettings';
import { applyRefs, loadRefIndex } from '../../../lib/certResolve';

export const runtime = 'nodejs';
// Пакет из десятков сертификатов не укладывается в стандартный лимит
export const maxDuration = 60;

const LOCALES: CertLocale[] = ['ru', 'en', 'kz'];

/**
 * Срок действия. Подпись поля напечатана на бланке («Срок действия
 * сертификата», «Valid until», «Жарамдылық мерзімі»), поэтому в значении
 * повторять её не нужно — по образцам там стоит одна дата, и только
 * по-русски перед ней есть «до».
 */
const LABELS: Record<CertLocale, { until: (d: string) => string; perpetual: string }> = {
  ru: { until: (d) => `до ${d}`, perpetual: 'бессрочный' },
  en: { until: (d) => d, perpetual: 'unlimited' },
  kz: { until: (d) => d, perpetual: 'мерзімсіз' },
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

  // Дат может не быть вовсе — тогда столбец на бланке остаётся пустым.
  // Одна дата подписывается «Дата проведения», две — «Период обучения».
  // Совпадающие концы считаем одним днём: курс на один день так и заводят.
  const isRange = Boolean(row.training_from && row.training_to && row.training_to !== row.training_from);
  const trainingDate = row.training_from
    ? (isRange
        ? formatDateRange(row.training_from, row.training_to!, locale)
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
    trainingIsRange: isRange,
    location: pickField(row, 'location', locale) || undefined,
    instructor: pickField(row, 'instructor', locale) || undefined,
    director,
    validUntil,
  };
}

/** Языки, на которых сертификат выпускается: у каждого своя галочка. */
function availableLocales(row: CertificateRow, requested: CertLocale[]): CertLocale[] {
  return requested.filter((l) =>
    (l === 'ru' && row.has_ru) || (l === 'en' && row.has_en) || (l === 'kz' && row.has_kz));
}

/**
 * Запись-образец для проверки настроек. Заполнены все поля бланка, включая
 * самое длинное — название курса, чтобы сразу было видно перенос строк.
 */
const SAMPLE: CertificateRow = {
  id: 0,
  code: 'ABC23',
  legacy_code: null,
  has_ru: true,

  first_name_ru: 'Асхат',
  last_name_ru: 'Ералиев',
  company_ru: null,
  course_ru: 'Управление технологической безопасностью на опасных производственных объектах',
  instructor_ru: 'Абулханова Гульнара',
  location_ru: 'Казахстан, г. Астана',
  completed_ru: 'успешно прошёл(а) курс обучения',

  has_en: true,
  first_name_en: 'Askhat',
  last_name_en: 'Yeraliyev',
  company_en: null,
  course_en: 'Process Safety Management at Hazardous Production Facilities',
  instructor_en: 'Abulkhanova Gulnara',
  location_en: 'Kazakhstan, Astana',
  completed_en: 'has successfully completed the training course',

  has_kz: true,
  first_name_kz: 'Асхат',
  last_name_kz: 'Ералиев',
  company_kz: null,
  course_kz: 'Қауіпті өндірістік объектілердегі технологиялық қауіпсіздікті басқару',
  instructor_kz: 'Әбілқанова Гүлнара',
  location_kz: 'Қазақстан, Астана қаласы',
  completed_kz: 'оқу курсын сәтті аяқтады',

  // Период, а не один день: это самое широкое значение в нижнем ряду,
  // на образце сразу видно, влезает ли оно в столбец.
  training_from: '2026-03-15',
  training_to: '2026-03-19',
  hours: 16,
  issued_at: '2026-03-15',
  perpetual: false,
  valid_until: '2027-03-15',

  course_ref: null,
  instructor_ref: null,
  completed_ref: null,
  location_ref: null,
  notes: null,
  created_at: '',
  updated_at: '',
};

/** Образец для проверки вёрстки: реальная запись из реестра не нужна. */
export async function GET(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  const asked = new URL(req.url).searchParams.get('locale');
  const locale = LOCALES.includes(asked as CertLocale) ? (asked as CertLocale) : 'ru';

  const settings = await getCertSettings();

  try {
    const bytes = await renderCertificate(
      locale,
      toCertificateData(SAMPLE, locale, settings.director[locale]),
    );
    return new Response(bytes as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="obrazec-${locale}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Не удалось собрать образец:', error);
    return Response.json({ error: 'Ошибка генерации образца' }, { status: 500 });
  }
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

  // Подписант задаётся в Studio; из запроса приходит только явная
  // замена подписанта для конкретной пачки.
  const settings = await getCertSettings();
  const override = typeof body.director === 'string' ? body.director.trim() : '';

  try {
    const files: { name: string; bytes: Uint8Array }[] = [];
    const skipped: string[] = [];

    // Справочник — источник правды для курса, преподавателя, текста о
    // прохождении и срока: правку в Studio печать подхватывает сразу,
    // не дожидаясь, пока копии в реестре подтянутся.
    const refs = await loadRefIndex();

    for (const id of ids) {
      const stored = await getById(id);
      if (!stored) continue;
      const row = applyRefs(stored, refs);

      const locales = availableLocales(row, requested);
      if (!locales.length) {
        skipped.push(row.code);
        continue;
      }

      for (const locale of locales) {
        const director = override || settings.director[locale];
        const bytes = await renderCertificate(locale, toCertificateData(row, locale, director));
        // Фамилия в имени файла всегда латиницей: кириллица в архивах
        // читается не во всех распаковщиках. Английское поле берём напрямую,
        // потому что pickField откатился бы на русское написание.
        const person = row.last_name_en?.trim() || transliterate(row.last_name_ru);
        files.push({
          name: `${row.code}-${locale.toUpperCase()}-${person}.pdf`.replace(/[^A-Za-z0-9._-]/g, '_'),
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
