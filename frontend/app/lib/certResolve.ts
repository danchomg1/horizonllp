import type { CertificateRow } from './db';
import { getCertRefs, byId, placeLabel, type CertRefs } from './certRefs';
import { addYears } from './certificates';

/**
 * Накладывает на запись текущее состояние справочника Studio.
 *
 * Копии названий в реестре подтягиваются к справочнику отдельным запросом
 * (syncFromRefs), но он идёт по расписанию открытия инструмента, а правку
 * хотят видеть сразу же. Поэтому печать и публичная проверка накладывают
 * справочник поверх записи прямо в момент чтения.
 *
 * Если элемента справочника больше нет — ссылка пустая или документ удалили,
 * — остаётся то написание, что лежит в записи. Так продолжают печататься
 * старые сертификаты по курсам, которых в справочнике давно не осталось.
 */

/** Английское и казахское значения нужны только там, где версия заведена. */
function forLang(has: boolean, value: string, fallbackRu: string, stored: string | null): string | null {
  if (!has) return stored;
  return value || fallbackRu;
}

/** Разложенный по _id справочник: строится один раз на пачку записей. */
export function refIndex(refs: CertRefs) {
  return {
    courses: byId(refs.courses),
    instructors: byId(refs.instructors),
    completions: byId(refs.completions),
    cities: byId(refs.cities),
    countries: byId(refs.countries),
  };
}

type RefIndex = ReturnType<typeof refIndex>;

export function applyRefs(row: CertificateRow, index: RefIndex): CertificateRow {
  const course = row.course_ref ? index.courses.get(row.course_ref) : undefined;
  const instructor = row.instructor_ref ? index.instructors.get(row.instructor_ref) : undefined;
  const completion = row.completed_ref ? index.completions.get(row.completed_ref) : undefined;
  const city = row.location_ref ? index.cities.get(row.location_ref) : undefined;

  const out = { ...row };

  if (course) {
    out.course_ru = course.ru;
    out.course_en = forLang(row.has_en, course.en, course.ru, row.course_en);
    out.course_kz = forLang(row.has_kz, course.kz, course.ru, row.course_kz);

    // Часы — свойство курса, а не конкретной группы
    if (course.hours) out.hours = course.hours;

    // Срок — тоже свойство курса, пересчитывается от даты выдачи записи
    if (course.perpetual) {
      out.perpetual = true;
      out.valid_until = null;
    } else if (row.issued_at && course.validityYears) {
      out.perpetual = false;
      out.valid_until = addYears(row.issued_at, course.validityYears);
    }
  }

  if (instructor) {
    out.instructor_ru = instructor.ru;
    out.instructor_en = forLang(row.has_en, instructor.en, instructor.ru, row.instructor_en);
    out.instructor_kz = forLang(row.has_kz, instructor.kz, instructor.ru, row.instructor_kz);
  }

  if (completion) {
    out.completed_ru = completion.ru;
    out.completed_en = forLang(row.has_en, completion.en, completion.ru, row.completed_en);
    out.completed_kz = forLang(row.has_kz, completion.kz, completion.ru, row.completed_kz);
  }

  if (city) {
    // Место собирается из страны и города — оба живут в справочнике,
    // поэтому переименование города доезжает до выданных сертификатов.
    const country = city.countryId ? index.countries.get(city.countryId) : undefined;
    out.location_ru = placeLabel(city, country, 'ru');
    out.location_en = row.has_en ? placeLabel(city, country, 'en') : row.location_en;
    out.location_kz = row.has_kz ? placeLabel(city, country, 'kz') : row.location_kz;
  }

  return out;
}

/** Одна запись. Справочник кэширован, так что вызов дешёвый. */
export async function resolveRow(row: CertificateRow): Promise<CertificateRow> {
  return applyRefs(row, refIndex(await getCertRefs()));
}

/** Готовый индекс для пачки: справочник читается и раскладывается один раз. */
export async function loadRefIndex(): Promise<RefIndex> {
  return refIndex(await getCertRefs());
}
