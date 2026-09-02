-- Реестр выданных сертификатов.
-- Скрипт идемпотентный: можно выполнять повторно.

-- Триграммы нужны для быстрого поиска подстроки (ILIKE '%иванов%').
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS certificates (
  id              bigserial PRIMARY KEY,

  -- Номер, который выдаёт система. Он печатается на бланке и существует
  -- у каждой записи. Регистр и пробелы приводятся к канону в коде.
  code            text NOT NULL UNIQUE,

  -- Прежний номер из архива или со старого бланка. Необязателен, на бланк
  -- не попадает, но по нему тоже находится сертификат: людям на руки выдали
  -- бумагу именно с ним.
  legacy_code     text,

  ---------------------------------------------------------------- русская
  -- Русская версия обязательна: она источник для остальных языков.
  first_name_ru   text NOT NULL,
  last_name_ru    text NOT NULL,
  company_ru      text,
  course_ru       text NOT NULL,
  instructor_ru   text,
  location_ru     text,
  completed_ru    text,

  ---------------------------------------------------------------- английская
  has_en          boolean NOT NULL DEFAULT false,
  first_name_en   text,
  last_name_en    text,
  company_en      text,
  course_en       text,
  instructor_en   text,
  location_en     text,
  completed_en    text,

  ---------------------------------------------------------------- казахская
  has_kz          boolean NOT NULL DEFAULT false,
  first_name_kz   text,
  last_name_kz    text,
  company_kz      text,
  course_kz       text,
  instructor_kz   text,
  location_kz     text,
  completed_kz    text,

  ---------------------------------------------------------------- общее
  -- Даты и часы от языка не зависят, форматирование делается при печати.
  training_from   date,
  training_to     date,
  hours           integer CHECK (hours IS NULL OR hours > 0),
  issued_at       date,

  -- Бессрочный сертификат и дата окончания взаимно исключают друг друга.
  perpetual       boolean NOT NULL DEFAULT false,
  valid_until     date,
  CONSTRAINT valid_until_or_perpetual
    CHECK (NOT (perpetual AND valid_until IS NOT NULL)),

  ---------------------------------------------------------------- служебное
  -- Ссылки на справочники Studio. Названия при этом продолжают лежать
  -- строкой рядом: по ним идёт поиск, они же остаются у записей, чей
  -- элемент справочника удалили. Правка справочника разъезжается по
  -- реестру сама — см. syncFromRefs в app/lib/db.ts.
  course_ref      text,
  instructor_ref  text,
  completed_ref   text,
  location_ref    text,

  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- Поиск по подстроке в полях, по которым ищут чаще всего.
CREATE INDEX IF NOT EXISTS certificates_code_trgm
  ON certificates USING gin (code gin_trgm_ops);
CREATE INDEX IF NOT EXISTS certificates_last_name_trgm
  ON certificates USING gin (last_name_ru gin_trgm_ops);
CREATE INDEX IF NOT EXISTS certificates_first_name_trgm
  ON certificates USING gin (first_name_ru gin_trgm_ops);
CREATE INDEX IF NOT EXISTS certificates_course_trgm
  ON certificates USING gin (course_ru gin_trgm_ops);
CREATE INDEX IF NOT EXISTS certificates_company_trgm
  ON certificates USING gin (company_ru gin_trgm_ops);

-- Сортировка списка.
CREATE INDEX IF NOT EXISTS certificates_issued_at   ON certificates (issued_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS certificates_valid_until ON certificates (valid_until);
CREATE INDEX IF NOT EXISTS certificates_created_at  ON certificates (created_at DESC);

-- updated_at поддерживается базой, чтобы его нельзя было забыть в коде.
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS certificates_touch_updated_at ON certificates;
CREATE TRIGGER certificates_touch_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- Добавление колонок к уже существующей таблице.
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS completed_ref text;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS legacy_code   text;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS location_ref  text;

-- Поиск идёт по обоим номерам сразу.
CREATE INDEX IF NOT EXISTS certificates_legacy_code_trgm
  ON certificates USING gin (legacy_code gin_trgm_ops);

-- Раскатка правок справочника идёт по этим ссылкам.
CREATE INDEX IF NOT EXISTS certificates_course_ref     ON certificates (course_ref);
CREATE INDEX IF NOT EXISTS certificates_instructor_ref ON certificates (instructor_ref);
CREATE INDEX IF NOT EXISTS certificates_completed_ref  ON certificates (completed_ref);
CREATE INDEX IF NOT EXISTS certificates_location_ref   ON certificates (location_ref);

/* ------------------------------------------------------------------ *
 * Журнал правок справочника                                           *
 * ------------------------------------------------------------------ */

-- Слепок справочника на момент прошлой синхронизации. По нему считается,
-- что именно изменилось: сравнивать записи реестра между собой для этого
-- недостаточно — из даты «действует до» не восстановить срок курса.
CREATE TABLE IF NOT EXISTS certificate_ref_state (
  ref_id          text PRIMARY KEY,
  kind            text NOT NULL,          -- course | instructor | completion
  name_ru         text,
  name_en         text,
  name_kz         text,
  perpetual       boolean,
  validity_years  integer,
  hours           integer,
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- Одна строка на одно изменённое свойство: правка сразу трёх написаний
-- даёт три записи, и снять их можно по отдельности.
CREATE TABLE IF NOT EXISTS certificate_changes (
  id              bigserial PRIMARY KEY,
  kind            text NOT NULL,
  ref_id          text NOT NULL,
  -- Что именно поменялось: nameRu | nameEn | nameKz | validity
  field           text NOT NULL,
  title           text NOT NULL,          -- название элемента на момент правки
  old_value       text,
  new_value       text,
  affected        integer NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now(),
  -- Отметка «просмотрено» снимает предупреждение сразу со всех записей
  acknowledged_at timestamptz
);

CREATE INDEX IF NOT EXISTS certificate_changes_open
  ON certificate_changes (created_at DESC) WHERE acknowledged_at IS NULL;

-- Какие именно сертификаты задело каждое изменение.
CREATE TABLE IF NOT EXISTS certificate_change_rows (
  change_id       bigint NOT NULL REFERENCES certificate_changes(id) ON DELETE CASCADE,
  certificate_id  bigint NOT NULL REFERENCES certificates(id) ON DELETE CASCADE,
  PRIMARY KEY (change_id, certificate_id)
);

CREATE INDEX IF NOT EXISTS certificate_change_rows_cert
  ON certificate_change_rows (certificate_id);

-- Слепок хранит и продолжительность: её правку тоже надо замечать.
ALTER TABLE certificate_ref_state ADD COLUMN IF NOT EXISTS hours integer;
