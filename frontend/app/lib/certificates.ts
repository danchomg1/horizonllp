export type CertLocale = 'ru' | 'en' | 'kz';

/* ------------------------------------------------------------------ *
 * Номер сертификата                                                   *
 * ------------------------------------------------------------------ */

/**
 * Алфавит генерации: цифры и заглавные латинские буквы без пар, которые
 * путают при ручном вводе — 0/O и 1/I/L. Даёт 31^5 ≈ 28,6 млн комбинаций.
 *
 * Важно: в поиске эти символы НЕ исключаются. Старые номера вроде EXKG001
 * содержат и ноль, и единицу, и их нужно находить.
 */
export const CODE_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
export const CODE_LENGTH = 5;

/** Случайный номер. Уникальность проверяется отдельно, по базе. */
export function generateCode(random: () => number = Math.random): string {
  let out = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    out += CODE_ALPHABET[Math.floor(random() * CODE_ALPHABET.length)];
  }
  return out;
}

/**
 * Приведение введённого номера к каноническому виду: убираем пробелы
 * и поднимаем регистр. Похожие символы намеренно не заменяем — иначе
 * сломается поиск по старым номерам.
 */
export function normalizeCode(input: string): string {
  return input.trim().replace(/\s+/g, '').toUpperCase();
}

/** Длина у старых записей гуляет от 4 до 14 символов, поэтому диапазон широкий. */
export function isValidCode(code: string): boolean {
  return /^[A-Z0-9-]{3,20}$/.test(normalizeCode(code));
}

/* ------------------------------------------------------------------ *
 * Транслитерация                                                      *
 * ------------------------------------------------------------------ */

// Паспортный вариант: «Ишанбеков Данияр» -> «Ishanbekov Daniyar».
// Отличается от ГОСТ тем, что я/ю/й дают ya/yu/y, а не ia/iu/i.
const TRANSLIT: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
  з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
  п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
  ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  // Казахские буквы
  ә: 'a', ғ: 'g', қ: 'k', ң: 'n', ө: 'o', ұ: 'u', ү: 'u', һ: 'h', і: 'i',
};

// Гласные нужны для правила «е»: в начале слова и после гласной она
// звучит йотированно. Отсюда Ералиев -> Yeraliyev, но Ишанбеков -> Ishanbekov.
const VOWELS = new Set('аеёиоуыэюяәөұүі'.split(''));

/** Кириллица -> латиница. Результат всегда можно поправить руками. */
export function transliterate(input: string): string {
  let out = '';
  let prev = '';

  for (const char of input) {
    const lower = char.toLowerCase();
    let mapped = TRANSLIT[lower];

    if (mapped === undefined) {
      out += char; // латиница, дефисы, пробелы — как есть
      prev = lower;
      continue;
    }

    if (lower === 'е' || lower === 'э') {
      const atWordStart = prev === '' || !TRANSLIT[prev] && !VOWELS.has(prev);
      const afterVowel = VOWELS.has(prev);
      const afterSoftSign = prev === 'ь' || prev === 'ъ';
      if (lower === 'е' && (atWordStart || afterVowel || afterSoftSign)) mapped = 'ye';
    }

    prev = lower;
    if (mapped === '') continue; // ъ и ь не дают звука

    // Заглавная буква даёт заглавной только первую букву сочетания:
    // Щ -> Shch, а не SHCH.
    out += char === lower ? mapped : mapped[0].toUpperCase() + mapped.slice(1);
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Продолжительность обучения                                          *
 * ------------------------------------------------------------------ */

/** Русское склонение: 1 час, 2 часа, 5 часов, 21 час. */
function hoursRu(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'час';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'часа';
  return 'часов';
}

/** «20 часов» / «20 hours» / «20 сағат» — в казахском счётное слово не склоняется. */
export function formatHours(value: number, locale: CertLocale): string {
  if (locale === 'en') return `${value} ${value === 1 ? 'hour' : 'hours'}`;
  if (locale === 'kz') return `${value} сағат`;
  return `${value} ${hoursRu(value)}`;
}

/* ------------------------------------------------------------------ *
 * Даты                                                                *
 * ------------------------------------------------------------------ */

const MONTHS: Record<CertLocale, string[]> = {
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
       'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  en: ['January', 'February', 'March', 'April', 'May', 'June',
       'July', 'August', 'September', 'October', 'November', 'December'],
  kz: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым',
       'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
};

/** «15 января 2026 г.» / «15 January 2026» / «2026 жылғы 15 қаңтар». */
export function formatCertDate(iso: string, locale: CertLocale): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;

  const month = MONTHS[locale][m - 1];
  if (locale === 'en') return `${d} ${month} ${y}`;
  if (locale === 'kz') return `${y} жылғы ${d} ${month}`;
  return `${d} ${month} ${y} г.`;
}

/** Диапазон обучения: «15–19 января 2026 г.», месяц не повторяется. */
export function formatDateRange(fromIso: string, toIso: string, locale: CertLocale): string {
  if (!toIso || fromIso === toIso) return formatCertDate(fromIso, locale);

  const [fy, fm, fd] = fromIso.split('-').map(Number);
  const [ty, tm] = toIso.split('-').map(Number);

  if (fy === ty && fm === tm) {
    const tail = formatCertDate(toIso, locale);
    // Подменяем в готовой строке только день начала — так падежи и
    // порядок слов остаются правильными для каждого языка.
    return locale === 'kz'
      ? tail.replace(/(\d+)\s/, `${fd}–$1 `)
      : `${fd}–${tail}`;
  }
  return `${formatCertDate(fromIso, locale)} — ${formatCertDate(toIso, locale)}`;
}
