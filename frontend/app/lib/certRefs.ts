import { client } from './sanity';

/**
 * Справочники сертификатов из Studio — курсы, преподаватели и города.
 *
 * Курс и преподаватель хранятся в трёх написаниях, поэтому свободный ввод
 * здесь невозможен в принципе: из строки «Process Safety Management» неоткуда
 * взять казахское название. И в форме выдачи, и при загрузке таблицы значение
 * обязано найтись в справочнике, иначе запись не проходит.
 */

export interface CourseRef {
  id: string;
  ru: string;
  en: string;
  kz: string;
  /** Срок действия закреплён за курсом, а не за конкретной выдачей. */
  perpetual: boolean;
  validityYears: number | null;
}

export interface PersonRef {
  id: string;
  ru: string;
  en: string;
  kz: string;
}

export interface CityRef {
  ru: string;
  en: string;
  kz: string;
}

export interface CertRefs {
  courses: CourseRef[];
  instructors: PersonRef[];
  cities: CityRef[];
}

const QUERY = `{
  "courses": *[_type == "certCourse" && active != false] | order(titleRu asc){
    "id": _id, "ru": titleRu, "en": titleEn, "kz": titleKz, perpetual, validityYears
  },
  "instructors": *[_type == "certInstructor" && active != false] | order(nameRu asc){
    "id": _id, "ru": nameRu, "en": nameEn, "kz": nameKz
  },
  "cities": *[_type == "certCity"] | order(nameRu asc){
    "ru": nameRu, "en": nameEn, "kz": nameKz
  }
}`;

interface RawRefs {
  courses?: Partial<CourseRef>[];
  instructors?: Partial<PersonRef>[];
  cities?: Partial<CityRef>[];
}

export async function getCertRefs(): Promise<CertRefs> {
  const raw = (await client.fetch<RawRefs | null>(QUERY)) ?? {};

  return {
    courses: (raw.courses ?? [])
      .filter((c): c is Partial<CourseRef> & { id: string; ru: string } => Boolean(c.id && c.ru))
      .map((c) => ({
        id: c.id!,
        ru: c.ru!.trim(),
        en: c.en?.trim() || '',
        kz: c.kz?.trim() || '',
        perpetual: c.perpetual === true,
        validityYears: typeof c.validityYears === 'number' ? c.validityYears : null,
      })),
    instructors: (raw.instructors ?? [])
      .filter((i): i is Partial<PersonRef> & { id: string; ru: string } => Boolean(i.id && i.ru))
      .map((i) => ({ id: i.id!, ru: i.ru!.trim(), en: i.en?.trim() || '', kz: i.kz?.trim() || '' })),
    cities: (raw.cities ?? [])
      .filter((c): c is Partial<CityRef> & { ru: string } => Boolean(c.ru))
      .map((c) => ({ ru: c.ru!.trim(), en: c.en?.trim() || '', kz: c.kz?.trim() || '' })),
  };
}

/* ------------------------------------------------------------------ *
 * Сверка написаний                                                    *
 * ------------------------------------------------------------------ */

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
