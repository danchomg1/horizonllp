import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  // Падаем сразу и понятно, а не на первом запросе где-то в середине формы
  throw new Error('DATABASE_URL не задан. Проверьте переменные окружения проекта.');
}

export const sql = neon(process.env.DATABASE_URL);

/**
 * Драйвер отдаёт колонки date и timestamptz объектами Date, а весь остальной
 * код работает со строками ISO. Приводим здесь, чтобы дальше по стеку
 * тип совпадал с объявленным и даты можно было сравнивать как строки.
 */
const DATE_COLUMNS = ['training_from', 'training_to', 'issued_at', 'valid_until'] as const;
const STAMP_COLUMNS = ['created_at', 'updated_at'] as const;

function normalizeRow<T extends Record<string, unknown>>(row: T): T {
  if (!row) return row;
  const out = { ...row } as Record<string, unknown>;

  for (const col of DATE_COLUMNS) {
    const value = out[col];
    // Берём компоненты местного времени, а не toISOString: драйвер строит
    // Date для колонки date как полночь по местной зоне, и перевод в UTC
    // сдвинул бы дату на сутки назад.
    if (value instanceof Date) {
      const y = value.getFullYear();
      const m = String(value.getMonth() + 1).padStart(2, '0');
      const d = String(value.getDate()).padStart(2, '0');
      out[col] = y + '-' + m + '-' + d;
    }
  }
  for (const col of STAMP_COLUMNS) {
    const value = out[col];
    if (value instanceof Date) out[col] = value.toISOString();
  }
  // bigint[] драйвер отдаёт строками, а наружу поле объявлено числовым
  if (Array.isArray(out.change_ids)) out.change_ids = out.change_ids.map(Number);
  return out as T;
}

function normalizeRows<T extends Record<string, unknown>>(rows: T[]): T[] {
  return rows.map(normalizeRow);
}

export interface CertificateRow {
  id: number;
  /** Номер, который выдала система: он печатается на бланке. */
  code: string;
  /** Прежний номер из архива. На бланк не идёт, но по нему тоже ищут. */
  legacy_code: string | null;

  /** Печатать ли русский бланк. Сами русские поля заполняются всегда. */
  has_ru: boolean;
  first_name_ru: string;
  last_name_ru: string;
  company_ru: string | null;
  course_ru: string;
  instructor_ru: string | null;
  location_ru: string | null;
  completed_ru: string | null;

  has_en: boolean;
  first_name_en: string | null;
  last_name_en: string | null;
  company_en: string | null;
  course_en: string | null;
  instructor_en: string | null;
  location_en: string | null;
  completed_en: string | null;

  has_kz: boolean;
  first_name_kz: string | null;
  last_name_kz: string | null;
  company_kz: string | null;
  course_kz: string | null;
  instructor_kz: string | null;
  location_kz: string | null;
  completed_kz: string | null;

  training_from: string | null;
  training_to: string | null;
  hours: number | null;
  issued_at: string | null;
  perpetual: boolean;
  valid_until: string | null;

  course_ref: string | null;
  instructor_ref: string | null;
  completed_ref: string | null;
  location_ref: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  /** Неотмеченные правки справочника, задевшие эту запись. */
  change_ids?: number[];
}

/** Колонки, по которым разрешена сортировка. Белый список: имя колонки
 *  подставляется в SQL напрямую и не может прийти от пользователя. */
export const SORTABLE = {
  code: 'code',
  legacyCode: 'legacy_code',
  firstName: 'first_name_ru',
  lastName: 'last_name_ru',
  company: 'company_ru',
  course: 'course_ru',
  issuedAt: 'issued_at',
  validUntil: 'valid_until',
  createdAt: 'created_at',
} as const;

export type SortKey = keyof typeof SORTABLE;

export interface ListParams {
  q?: string;
  sort?: SortKey;
  dir?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

export interface ListResult {
  rows: CertificateRow[];
  total: number;
  page: number;
  perPage: number;
}

/**
 * Список с поиском и сортировкой.
 * Поиск идёт по номеру, имени, фамилии, компании и курсу — по подстроке,
 * без учёта регистра. Похожие символы намеренно не сводятся друг к другу:
 * старые номера содержат и 0, и 1, и их нужно находить как есть.
 */
export async function listCertificates(params: ListParams = {}): Promise<ListResult> {
  const page = Math.max(1, params.page ?? 1);
  const perPage = Math.min(200, Math.max(1, params.perPage ?? 50));
  const offset = (page - 1) * perPage;

  const column = SORTABLE[params.sort ?? 'createdAt'] ?? SORTABLE.createdAt;
  const dir = params.dir === 'asc' ? 'ASC' : 'DESC';

  const q = params.q?.trim();
  const like = q ? `%${q}%` : null;

  // NULL-значения всегда в конце, чтобы пустые даты не занимали первые строки
  const order = `ORDER BY ${column} ${dir} NULLS LAST, id DESC`;

  const where = like
    // Номер ищем по обоим сразу: на руки человеку выдали бумагу со старым
    ? `WHERE (code ILIKE $1 OR legacy_code ILIKE $1)
        OR first_name_ru ILIKE $1 OR last_name_ru ILIKE $1
        OR company_ru ILIKE $1 OR course_ru ILIKE $1
        OR instructor_ru ILIKE $1`
    : '';

  // Вместе со строкой отдаём неотмеченные правки справочника, которые её
  // задели: по ним список рисует предупреждение.
  const select = `SELECT c.*, COALESCE(a.ids, ARRAY[]::bigint[]) AS change_ids
     FROM certificates c
     LEFT JOIN LATERAL (
       SELECT array_agg(ch.id ORDER BY ch.id) AS ids
         FROM certificate_change_rows cr
         JOIN certificate_changes ch ON ch.id = cr.change_id
        WHERE cr.certificate_id = c.id AND ch.acknowledged_at IS NULL
     ) a ON true`;

  const rows = like
    ? await sql.query(`${select} ${where} ${order} LIMIT $2 OFFSET $3`, [like, perPage, offset])
    : await sql.query(`${select} ${order} LIMIT $1 OFFSET $2`, [perPage, offset]);

  const countRows = like
    ? await sql.query(`SELECT count(*)::int AS total FROM certificates ${where}`, [like])
    : await sql.query(`SELECT count(*)::int AS total FROM certificates`);

  return {
    rows: normalizeRows(rows as unknown as Record<string, unknown>[]) as unknown as CertificateRow[],
    total: (countRows as { total: number }[])[0]?.total ?? 0,
    page,
    perPage,
  };
}

/**
 * Публичная проверка по номеру. Ищем и по прежнему номеру: на руках у людей
 * бумага со старым, а нового они не видели. Свой номер приоритетнее — при
 * маловероятном совпадении находится тот сертификат, чей это основной номер.
 */
export async function getByCode(code: string): Promise<CertificateRow | null> {
  const rows = await sql`SELECT * FROM certificates
                          WHERE code = ${code} OR legacy_code = ${code}
                          ORDER BY (code = ${code}) DESC
                          LIMIT 1`;
  return rows[0] ? (normalizeRow(rows[0]) as CertificateRow) : null;
}

export async function getById(id: number): Promise<CertificateRow | null> {
  const rows = await sql`SELECT * FROM certificates WHERE id = ${id} LIMIT 1`;
  return rows[0] ? (normalizeRow(rows[0]) as CertificateRow) : null;
}

export async function codeExists(code: string): Promise<boolean> {
  const rows = await sql`SELECT 1 FROM certificates WHERE code = ${code} LIMIT 1`;
  return rows.length > 0;
}

export async function deleteCertificate(id: number): Promise<boolean> {
  const rows = await sql`DELETE FROM certificates WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}

/** Колонки, которые разрешено писать из формы. Всё остальное игнорируется. */
const WRITABLE = [
  'code', 'legacy_code',
  'has_ru', 'first_name_ru', 'last_name_ru', 'company_ru', 'course_ru',
  'instructor_ru', 'location_ru', 'completed_ru',
  'has_en', 'first_name_en', 'last_name_en', 'company_en', 'course_en',
  'instructor_en', 'location_en', 'completed_en',
  'has_kz', 'first_name_kz', 'last_name_kz', 'company_kz', 'course_kz',
  'instructor_kz', 'location_kz', 'completed_kz',
  'training_from', 'training_to', 'hours', 'issued_at',
  'perpetual', 'valid_until',
  'course_ref', 'instructor_ref', 'completed_ref', 'location_ref', 'notes',
] as const;

export type WritableColumn = (typeof WRITABLE)[number];
export type CertificateInput = Partial<Record<WritableColumn, unknown>>;

function pickWritable(input: CertificateInput): [string[], unknown[]] {
  const cols: string[] = [];
  const values: unknown[] = [];
  for (const col of WRITABLE) {
    if (col in input) {
      cols.push(col);
      // Пустая строка в поле даты сломает вставку, поэтому приводим к NULL
      const raw = input[col];
      values.push(raw === '' ? null : raw);
    }
  }
  return [cols, values];
}

export async function insertCertificate(input: CertificateInput): Promise<CertificateRow> {
  const [cols, values] = pickWritable(input);
  if (!cols.length) throw new Error('Нет полей для записи');

  const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');
  const rows = await sql.query(
    `INSERT INTO certificates (${cols.join(', ')}) VALUES (${placeholders}) RETURNING *`,
    values,
  );
  return normalizeRow((rows as Record<string, unknown>[])[0]) as unknown as CertificateRow;
}

/**
 * Пакетная вставка для загрузки таблицы.
 *
 * Драйвер Neon ходит по HTTP, поэтому на каждый запрос уходит целый круг
 * до сервера — три тысячи отдельных INSERT заняли бы минуты. Пишем пачками
 * многострочным запросом; размер подобран так, чтобы число параметров
 * оставалось далеко от предела Postgres в 65535.
 */
export async function insertMany(inputs: CertificateInput[], batchSize = 200): Promise<number> {
  if (!inputs.length) return 0;

  // Набор колонок один на всю пачку: у строк из таблицы он одинаковый
  const cols = WRITABLE.filter((col) => inputs.some((row) => col in row));
  if (!cols.length) throw new Error('Нет полей для записи');

  let written = 0;

  for (let start = 0; start < inputs.length; start += batchSize) {
    const chunk = inputs.slice(start, start + batchSize);
    const values: unknown[] = [];
    const tuples = chunk.map((row) => {
      const placeholders = cols.map((col) => {
        const raw = row[col];
        values.push(raw === '' || raw === undefined ? null : raw);
        return `$${values.length}`;
      });
      return `(${placeholders.join(', ')})`;
    });

    const rows = await sql.query(
      `INSERT INTO certificates (${cols.join(', ')}) VALUES ${tuples.join(', ')} RETURNING id`,
      values,
    );
    written += (rows as unknown[]).length;
  }

  return written;
}

/* ------------------------------------------------------------------ *
 * Раскатка правок справочника и журнал изменений                      *
 * ------------------------------------------------------------------ */

/**
 * Подтягивает копии названий к справочнику Studio и записывает, что именно
 * изменилось.
 *
 * Записи хранят название курса, имя преподавателя и текст о прохождении
 * строкой — по ним идёт поиск, и они остаются у записей, чей элемент
 * справочника удалили. Но правку в Studio реестр обязан подхватывать, иначе
 * опечатка навсегда остаётся в трёх тысячах строк.
 *
 * Само обновление делается одним запросом на справочник: пачка значений
 * подставляется через VALUES, а WHERE трогает только те строки, где что-то
 * расходится, — иначе триггер обновил бы «изменён» у всего реестра на
 * каждый вызов.
 *
 * Чтобы описать правку словами («срок был 3 года, стал 5»), сравнения строк
 * реестра недостаточно: из даты «действует до» не восстановить срок курса.
 * Поэтому рядом лежит слепок справочника — certificate_ref_state.
 */
export type RefKind = 'course' | 'instructor' | 'completion' | 'city';

interface RefRow { id: string; ru: string; en: string; kz: string }
interface CourseRefRow extends RefRow {
  perpetual: boolean;
  validityYears: number | null;
  hours: number | null;
}

export interface SyncResult {
  /** Сколько записей реестра поправилось, по видам справочника. */
  courses: number;
  instructors: number;
  completions: number;
  cities: number;
  /** Сколько правок справочника попало в журнал. */
  changes: number;
}

/** Имена колонок берутся из этого перечня, а не из запроса — в SQL они идут строкой. */
const SYNCED = {
  instructor: { ref: 'instructor_ref', cols: ['instructor_ru', 'instructor_en', 'instructor_kz'] },
  completion: { ref: 'completed_ref', cols: ['completed_ru', 'completed_en', 'completed_kz'] },
  city: { ref: 'location_ref', cols: ['location_ru', 'location_en', 'location_kz'] },
} as const;

/**
 * VALUES-список вида ($1::text, $2::int, …).
 *
 * Тип пишется у каждой ячейки, а не только у первой строки: параметр без
 * приведения приезжает в Postgres текстом, и список, где первая строка
 * объявлена как ::int, а следующие приходят текстом, отваливается с
 * «types text and integer cannot be matched».
 */
function valuesList(rows: unknown[][], types: string[], values: unknown[]): string {
  return rows
    .map((row) => {
      const cells = row.map((cell, i) => {
        values.push(cell);
        return '$' + values.length + '::' + types[i];
      });
      return `(${cells.join(', ')})`;
    })
    .join(', ');
}

/** id затронутых сертификатов, разложенные по элементам справочника. */
type Touched = Map<string, number[]>;

function collect(rows: { id: string | number; ref: string }[]): Touched {
  const out: Touched = new Map();
  for (const row of rows) {
    const list = out.get(row.ref);
    if (list) list.push(Number(row.id));
    else out.set(row.ref, [Number(row.id)]);
  }
  return out;
}

async function syncNames(kind: keyof typeof SYNCED, items: RefRow[]): Promise<Touched> {
  if (!items.length) return new Map();

  const { ref, cols } = SYNCED[kind];
  const [ruCol, enCol, kzCol] = cols;
  const values: unknown[] = [];
  const list = valuesList(
    items.map((i) => [i.id, i.ru, i.en, i.kz]),
    ['text', 'text', 'text', 'text'],
    values,
  );

  const rows = await sql.query(
    `WITH ref(id, ru, en, kz) AS (VALUES ${list}),
     target AS (
       SELECT c.id,
              r.id AS ref,
              r.ru AS ru,
              CASE WHEN c.has_en THEN COALESCE(NULLIF(r.en, ''), r.ru) ELSE c.${enCol} END AS en,
              CASE WHEN c.has_kz THEN COALESCE(NULLIF(r.kz, ''), r.ru) ELSE c.${kzCol} END AS kz
       FROM certificates c JOIN ref r ON c.${ref} = r.id
     )
     UPDATE certificates c
        SET ${ruCol} = t.ru, ${enCol} = t.en, ${kzCol} = t.kz
       FROM target t
      WHERE c.id = t.id
        AND (c.${ruCol} IS DISTINCT FROM t.ru
          OR c.${enCol} IS DISTINCT FROM t.en
          OR c.${kzCol} IS DISTINCT FROM t.kz)
      RETURNING c.id, t.ref`,
    values,
  );
  return collect(rows as { id: string; ref: string }[]);
}

/**
 * Курсы отдельно: вместе с названием у них едет срок действия, а он
 * пересчитывается от даты выдачи конкретной записи.
 */
async function syncCourses(items: CourseRefRow[]): Promise<Touched> {
  if (!items.length) return new Map();

  const values: unknown[] = [];
  const list = valuesList(
    items.map((i) => [i.id, i.ru, i.en, i.kz, i.perpetual, i.validityYears, i.hours]),
    ['text', 'text', 'text', 'text', 'boolean', 'int', 'int'],
    values,
  );

  const rows = await sql.query(
    `WITH ref(id, ru, en, kz, perp, years, hours) AS (VALUES ${list}),
     target AS (
       SELECT c.id,
              r.id AS ref,
              r.ru AS ru,
              CASE WHEN c.has_en THEN COALESCE(NULLIF(r.en, ''), r.ru) ELSE c.course_en END AS en,
              CASE WHEN c.has_kz THEN COALESCE(NULLIF(r.kz, ''), r.ru) ELSE c.course_kz END AS kz,
              -- Курс, у которого не задано ни число лет, ни «бессрочный»,
              -- ещё не настроен: срок у записи в этом случае не трогаем,
              -- иначе выданное «бессрочно» молча превратилось бы в пустоту.
              CASE WHEN NOT r.perp AND r.years IS NULL THEN c.perpetual ELSE r.perp END AS perp,
              CASE
                WHEN NOT r.perp AND r.years IS NULL THEN c.valid_until
                WHEN r.perp THEN NULL
                -- Без даты выдачи считать не от чего
                WHEN c.issued_at IS NULL THEN c.valid_until
                ELSE (c.issued_at + (r.years * interval '1 year'))::date
              END AS until,
              -- Часы у курса могут быть ещё не заданы: тогда оставляем как есть
              COALESCE(r.hours, c.hours) AS hrs
       FROM certificates c JOIN ref r ON c.course_ref = r.id
     )
     UPDATE certificates c
        SET course_ru = t.ru, course_en = t.en, course_kz = t.kz,
            perpetual = t.perp, valid_until = t.until, hours = t.hrs
       FROM target t
      WHERE c.id = t.id
        AND (c.course_ru IS DISTINCT FROM t.ru
          OR c.course_en IS DISTINCT FROM t.en
          OR c.course_kz IS DISTINCT FROM t.kz
          OR c.perpetual IS DISTINCT FROM t.perp
          OR c.valid_until IS DISTINCT FROM t.until
          OR c.hours IS DISTINCT FROM t.hrs)
      RETURNING c.id, t.ref`,
    values,
  );
  return collect(rows as { id: string; ref: string }[]);
}

/* ------------------------------------------------------------------ *
 * Слепок справочника и разбор правок                                  *
 * ------------------------------------------------------------------ */

interface RefState {
  ref_id: string;
  kind: RefKind;
  name_ru: string | null;
  name_en: string | null;
  name_kz: string | null;
  perpetual: boolean | null;
  validity_years: number | null;
  hours: number | null;
}

/** Человеческая запись срока — она же попадает в журнал. */
function termLabel(perpetual: boolean | null, years: number | null): string {
  if (perpetual) return 'бессрочный';
  return years ? `${years} г.` : 'срок не задан';
}

function hoursLabel(hours: number | null): string {
  return hours ? `${hours} ч.` : 'часы не заданы';
}

export type ChangeField = 'nameRu' | 'nameEn' | 'nameKz' | 'validity' | 'hours';

interface PendingChange {
  kind: RefKind;
  refId: string;
  field: ChangeField;
  title: string;
  oldValue: string | null;
  newValue: string | null;
}

/** Сравнивает слепок с тем, что сейчас в Studio. */
function diffRef(
  kind: RefKind,
  before: RefState | undefined,
  now: RefRow | CourseRefRow,
): PendingChange[] {
  // Элемент видим впервые — сравнивать не с чем, просто запоминаем
  if (!before) return [];

  const out: PendingChange[] = [];
  const add = (field: ChangeField, oldValue: string | null, newValue: string | null) => {
    if ((oldValue ?? '') === (newValue ?? '')) return;
    out.push({ kind, refId: now.id, field, title: now.ru, oldValue, newValue });
  };

  add('nameRu', before.name_ru, now.ru);
  add('nameEn', before.name_en, now.en);
  add('nameKz', before.name_kz, now.kz);

  if ('perpetual' in now) {
    const wasKnown = before.perpetual !== null || before.validity_years !== null;
    if (wasKnown) {
      add('validity',
        termLabel(before.perpetual, before.validity_years),
        termLabel(now.perpetual, now.validityYears));
    }
    if (before.hours !== null && before.hours !== now.hours) {
      add('hours', hoursLabel(before.hours), hoursLabel(now.hours));
    }
  }

  return out;
}

async function loadRefState(): Promise<Map<string, RefState>> {
  const rows = await sql`SELECT ref_id, kind, name_ru, name_en, name_kz, perpetual, validity_years, hours
                         FROM certificate_ref_state`;
  return new Map((rows as unknown as RefState[]).map((r) => [r.ref_id, r]));
}

async function saveRefState(kind: RefKind, items: (RefRow | CourseRefRow)[]): Promise<void> {
  if (!items.length) return;

  const values: unknown[] = [];
  const list = valuesList(
    items.map((i) => [
      i.id, kind, i.ru, i.en, i.kz,
      'perpetual' in i ? i.perpetual : null,
      'validityYears' in i ? i.validityYears : null,
      'hours' in i ? i.hours : null,
    ]),
    ['text', 'text', 'text', 'text', 'text', 'boolean', 'int', 'int'],
    values,
  );

  await sql.query(
    `INSERT INTO certificate_ref_state
       (ref_id, kind, name_ru, name_en, name_kz, perpetual, validity_years, hours)
     VALUES ${list}
     ON CONFLICT (ref_id) DO UPDATE SET
       kind = EXCLUDED.kind, name_ru = EXCLUDED.name_ru,
       name_en = EXCLUDED.name_en, name_kz = EXCLUDED.name_kz,
       perpetual = EXCLUDED.perpetual, validity_years = EXCLUDED.validity_years,
       hours = EXCLUDED.hours,
       updated_at = now()`,
    values,
  );
}

/** Пишет правку в журнал вместе со списком задетых сертификатов. */
async function recordChange(change: PendingChange, affected: number[]): Promise<void> {
  const rows = await sql`
    INSERT INTO certificate_changes (kind, ref_id, field, title, old_value, new_value, affected)
    VALUES (${change.kind}, ${change.refId}, ${change.field}, ${change.title},
            ${change.oldValue}, ${change.newValue}, ${affected.length})
    RETURNING id`;
  const changeId = Number((rows as { id: string }[])[0].id);

  if (!affected.length) return;

  // Пачками: у крупного курса задетых записей больше тысячи
  for (let start = 0; start < affected.length; start += 500) {
    const chunk = affected.slice(start, start + 500);
    const values: unknown[] = [];
    const list = valuesList(
      chunk.map((id) => [changeId, id]),
      ['bigint', 'bigint'],
      values,
    );
    await sql.query(
      `INSERT INTO certificate_change_rows (change_id, certificate_id)
       VALUES ${list} ON CONFLICT DO NOTHING`,
      values,
    );
  }
}

export async function syncFromRefs(refs: {
  courses: CourseRefRow[];
  instructors: RefRow[];
  completions: RefRow[];
  cities: RefRow[];
}): Promise<SyncResult> {
  const before = await loadRefState();

  const [courses, instructors, completions, cities] = await Promise.all([
    syncCourses(refs.courses),
    syncNames('instructor', refs.instructors),
    syncNames('completion', refs.completions),
    syncNames('city', refs.cities),
  ]);

  const groups = [
    ['course', refs.courses, courses],
    ['instructor', refs.instructors, instructors],
    ['completion', refs.completions, completions],
    ['city', refs.cities, cities],
  ] as const;

  let changes = 0;
  for (const [kind, items, touched] of groups) {
    for (const item of items) {
      for (const change of diffRef(kind, before.get(item.id), item)) {
        await recordChange(change, touched.get(item.id) ?? []);
        changes++;
      }
    }
    await saveRefState(kind, items as (RefRow | CourseRefRow)[]);
  }

  const count = (t: Touched) => [...t.values()].reduce((n, ids) => n + ids.length, 0);
  return {
    courses: count(courses),
    instructors: count(instructors),
    completions: count(completions),
    cities: count(cities),
    changes,
  };
}

/* ------------------------------------------------------------------ *
 * Чтение журнала                                                      *
 * ------------------------------------------------------------------ */

export interface ChangeEntry {
  id: number;
  kind: RefKind;
  ref_id: string;
  field: ChangeField;
  title: string;
  old_value: string | null;
  new_value: string | null;
  affected: number;
  created_at: string;
  acknowledged_at: string | null;
}

/** Журнал целиком или только неотмеченные правки. */
export async function listChanges(onlyOpen = false, limit = 200): Promise<ChangeEntry[]> {
  const rows = onlyOpen
    ? await sql`SELECT * FROM certificate_changes WHERE acknowledged_at IS NULL
                ORDER BY created_at DESC, id DESC LIMIT ${limit}`
    : await sql`SELECT * FROM certificate_changes
                ORDER BY created_at DESC, id DESC LIMIT ${limit}`;
  return normalizeRows(rows as unknown as Record<string, unknown>[]) as unknown as ChangeEntry[];
}

export async function getChange(id: number): Promise<ChangeEntry | null> {
  const rows = await sql`SELECT * FROM certificate_changes WHERE id = ${id} LIMIT 1`;
  return rows[0] ? (normalizeRow(rows[0]) as unknown as ChangeEntry) : null;
}

/** Сертификаты, задетые одной правкой. */
export async function changedCertificates(
  changeId: number, limit = 500,
): Promise<Pick<CertificateRow,
  'id' | 'code' | 'first_name_ru' | 'last_name_ru' | 'course_ru' | 'issued_at' | 'valid_until' | 'perpetual'>[]> {
  const rows = await sql`
    SELECT c.id, c.code, c.first_name_ru, c.last_name_ru, c.course_ru,
           c.issued_at, c.valid_until, c.perpetual
      FROM certificate_change_rows r
      JOIN certificates c ON c.id = r.certificate_id
     WHERE r.change_id = ${changeId}
     ORDER BY c.code
     LIMIT ${limit}`;
  return normalizeRows(rows as unknown as Record<string, unknown>[]) as never;
}

/** Отмечает правку просмотренной — предупреждения гаснут у всех её записей. */
export async function acknowledgeChange(id: number): Promise<boolean> {
  const rows = await sql`UPDATE certificate_changes SET acknowledged_at = now()
                         WHERE id = ${id} AND acknowledged_at IS NULL RETURNING id`;
  return rows.length > 0;
}

/**
 * Отмечает сразу несколько правок. Пустой список означает «все неотмеченные»:
 * после крупной правки справочника разбирать их по одной незачем.
 */
export async function acknowledgeChanges(ids: number[]): Promise<number> {
  const rows = ids.length
    ? await sql.query(
        `UPDATE certificate_changes SET acknowledged_at = now()
          WHERE acknowledged_at IS NULL AND id = ANY($1::bigint[]) RETURNING id`,
        [ids],
      )
    : await sql.query(
        `UPDATE certificate_changes SET acknowledged_at = now()
          WHERE acknowledged_at IS NULL RETURNING id`,
      );
  return (rows as unknown[]).length;
}
/** Какие из выданных системой номеров уже заняты. Один запрос на весь список. */
export async function takenCodes(codes: string[]): Promise<Set<string>> {
  if (!codes.length) return new Set();
  const rows = await sql.query('SELECT code FROM certificates WHERE code = ANY($1::text[])', [codes]);
  return new Set((rows as { code: string }[]).map((r) => r.code));
}

/**
 * Какие прежние номера уже есть в реестре. Отдельно от takenCodes: тот
 * следит за уникальностью выданных системой номеров, а этот ловит повторную
 * загрузку одной и той же строки архива.
 */
export async function takenLegacyCodes(codes: string[]): Promise<Set<string>> {
  if (!codes.length) return new Set();
  const rows = await sql.query(
    'SELECT legacy_code FROM certificates WHERE legacy_code = ANY($1::text[])', [codes]);
  return new Set((rows as { legacy_code: string }[]).map((r) => r.legacy_code));
}

export async function updateCertificate(
  id: number,
  input: CertificateInput,
): Promise<CertificateRow | null> {
  const [cols, values] = pickWritable(input);
  if (!cols.length) return getById(id);

  const assignments = cols.map((c, i) => `${c} = $${i + 1}`).join(', ');
  const rows = await sql.query(
    `UPDATE certificates SET ${assignments} WHERE id = $${cols.length + 1} RETURNING *`,
    [...values, id],
  );
  const row = (rows as Record<string, unknown>[])[0];
  return row ? (normalizeRow(row) as unknown as CertificateRow) : null;
}
