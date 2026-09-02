import { client } from './sanity';

/**
 * Справочники сертификатов из Studio — курсы, преподаватели, тексты о
 * прохождении и города.
 *
 * Справочник здесь — источник правды. Название курса, имя преподавателя,
 * текст о прохождении и срок действия берутся из него в момент печати и
 * проверки, а в самой записи реестра лежат копией: по ней идёт поиск и она
 * же остаётся, если элемент справочника когда-нибудь удалят. Копии
 * подтягиваются к справочнику сами — см. syncFromRefs в app/lib/db.ts.
 *
 * Свободный ввод в этих полях невозможен в принципе: из строки
 * «Process Safety Management» неоткуда взять казахское название.
 */

export interface CourseRef {
  id: string;
  ru: string;
  en: string;
  kz: string;
  /** Срок действия закреплён за курсом, а не за конкретной выдачей. */
  perpetual: boolean;
  validityYears: number | null;
  /** Продолжительность в часах — тоже свойство курса, а не выдачи. */
  hours: number | null;
}

export interface PersonRef {
  id: string;
  ru: string;
  en: string;
  kz: string;
}

export interface CompletionRef {
  id: string;
  ru: string;
  en: string;
  kz: string;
  isDefault: boolean;
}

export interface CountryRef {
  id: string;
  ru: string;
  en: string;
  kz: string;
}

export interface CityRef {
  id: string;
  ru: string;
  en: string;
  kz: string;
  /** Пусто у «Онлайн»: перед ним страна не печатается. */
  countryId: string | null;
  online: boolean;
}

export interface CertRefs {
  courses: CourseRef[];
  instructors: PersonRef[];
  completions: CompletionRef[];
  countries: CountryRef[];
  cities: CityRef[];
}

const QUERY = `{
  "courses": *[_type == "certCourse" && active != false] | order(titleRu asc){
    "id": _id, "ru": titleRu, "en": titleEn, "kz": titleKz, perpetual, validityYears, hours
  },
  "instructors": *[_type == "certInstructor" && active != false] | order(nameRu asc){
    "id": _id, "ru": nameRu, "en": nameEn, "kz": nameKz
  },
  "completions": *[_type == "certCompletion" && active != false] | order(textRu asc){
    "id": _id, "ru": textRu, "en": textEn, "kz": textKz, isDefault
  },
  "countries": *[_type == "certCountry"] | order(order asc, nameRu asc){
    "id": _id, "ru": nameRu, "en": nameEn, "kz": nameKz
  },
  "cities": *[_type == "certCity"] | order(order asc, nameRu asc){
    "id": _id, "ru": nameRu, "en": nameEn, "kz": nameKz,
    "countryId": country._ref, online
  }
}`;

interface RawRefs {
  courses?: Partial<CourseRef>[];
  instructors?: Partial<PersonRef>[];
  completions?: Partial<CompletionRef>[];
  countries?: Partial<CountryRef>[];
  cities?: Partial<CityRef>[];
}

/* ------------------------------------------------------------------ *
 * Загрузка и кэш                                                      *
 * ------------------------------------------------------------------ */

// Справочники читаются на каждый выпуск PDF и на каждую публичную проверку,
// а меняются редко. Минуты жизни хватает, чтобы правка доехала сама.
const TTL_MS = 60_000;
let cached: { at: number; value: CertRefs } | null = null;

const EMPTY: CertRefs = { courses: [], instructors: [], completions: [], countries: [], cities: [] };

export async function getCertRefs(): Promise<CertRefs> {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.value;

  let raw: RawRefs;
  try {
    raw = (await client.fetch<RawRefs | null>(QUERY)) ?? {};
  } catch (error) {
    // Studio недоступна — печатаем по копиям, которые лежат в записях
    console.error('Не удалось прочитать справочники сертификатов:', error);
    return cached?.value ?? EMPTY;
  }

  const text = (v: string | undefined) => v?.trim() || '';

  const value: CertRefs = {
    courses: (raw.courses ?? [])
      .filter((c) => c.id && c.ru)
      .map((c) => ({
        id: c.id!,
        ru: c.ru!.trim(),
        en: text(c.en),
        kz: text(c.kz),
        perpetual: c.perpetual === true,
        validityYears: typeof c.validityYears === 'number' ? c.validityYears : null,
        hours: typeof c.hours === 'number' ? c.hours : null,
      })),
    instructors: (raw.instructors ?? [])
      .filter((i) => i.id && i.ru)
      .map((i) => ({ id: i.id!, ru: i.ru!.trim(), en: text(i.en), kz: text(i.kz) })),
    completions: (raw.completions ?? [])
      .filter((c) => c.id && c.ru)
      .map((c) => ({
        id: c.id!, ru: c.ru!.trim(), en: text(c.en), kz: text(c.kz), isDefault: c.isDefault === true,
      })),
    countries: (raw.countries ?? [])
      .filter((c) => c.id && c.ru)
      .map((c) => ({ id: c.id!, ru: c.ru!.trim(), en: text(c.en), kz: text(c.kz) })),
    // Город без страны и без отметки «онлайн» заведён не до конца —
    // в списках выдачи ему делать нечего.
    cities: (raw.cities ?? [])
      .filter((c) => c.id && c.ru && (c.countryId || c.online))
      .map((c) => ({
        id: c.id!, ru: c.ru!.trim(), en: text(c.en), kz: text(c.kz),
        countryId: c.countryId ?? null, online: c.online === true,
      })),
  };

  cached = { at: Date.now(), value };
  return value;
}

/** Сбрасывает кэш — нужен, когда правку из Studio хотят увидеть сразу. */
export function clearCertRefsCache(): void {
  cached = null;
}

/** Текст о прохождении по умолчанию: отмеченный галочкой, иначе первый. */
export function defaultCompletion(refs: CertRefs): CompletionRef | null {
  return refs.completions.find((c) => c.isDefault) ?? refs.completions[0] ?? null;
}

/**
 * Место проведения одной строкой: «Казахстан, г. Астана».
 * У «Онлайн» страны нет, поэтому печатается одно слово.
 */
export function placeLabel(
  city: CityRef,
  country: CountryRef | undefined,
  locale: 'ru' | 'en' | 'kz',
): string {
  const name = city[locale] || city.ru;
  if (city.online || !country) return name;
  return `${country[locale] || country.ru}, ${name}`;
}

/** Города выбранной страны плюс «Онлайн» — он доступен всегда. */
export function citiesOf(refs: CertRefs, countryId: string): CityRef[] {
  return refs.cities.filter((c) => c.online || c.countryId === countryId);
}

/* ------------------------------------------------------------------ *
 * Поиск по справочнику                                                *
 * ------------------------------------------------------------------ */

/** Разложить справочник по _id — так его читают печать и проверка. */
export function byId<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]));
}

/**
 * Ключ для сравнения. В таблицах гуляет регистр, ё/е, кавычки, тире и лишние
 * пробелы — курс от этого другим не становится, поэтому всё это сводим к
 * одному виду. Слова при этом сохраняются: «Основы» и «основа» остаются
 * разными значениями, иначе можно молча подставить не тот курс.
 */
export function refKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[«»""'`]/g, '')
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, ' ');
}

/** Ищет по всем трём написаниям сразу: в таблице могут заполнить любое. */
export function buildIndex<T extends { ru: string; en: string; kz: string }>(
  items: T[],
): Map<string, T> {
  const index = new Map<string, T>();
  for (const item of items) {
    for (const spelling of [item.ru, item.en, item.kz]) {
      if (!spelling) continue;
      const key = refKey(spelling);
      // Первое вхождение выигрывает: список отсортирован, так что при
      // случайном дубле в справочнике поведение остаётся предсказуемым.
      if (!index.has(key)) index.set(key, item);
    }
  }
  return index;
}

/**
 * Ближайшее название по общим трёхсимвольным кускам. Нужно только для
 * подсказки в тексте ошибки — подставлять найденное молча нельзя.
 */
export function closestName(value: string, items: { ru: string }[]): string | null {
  const query = refKey(value);
  if (query.length < 3) return null;

  const grams = (s: string) => {
    const out = new Set<string>();
    for (let i = 0; i + 3 <= s.length; i++) out.add(s.slice(i, i + 3));
    return out;
  };

  const queryGrams = grams(query);
  let best: { name: string; score: number } | null = null;

  for (const item of items) {
    const candidate = grams(refKey(item.ru));
    let shared = 0;
    for (const g of queryGrams) if (candidate.has(g)) shared++;
    const score = shared / Math.max(queryGrams.size, candidate.size, 1);
    if (!best || score > best.score) best = { name: item.ru, score };
  }

  return best && best.score >= 0.4 ? best.name : null;
}
