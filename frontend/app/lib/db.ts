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
  return out as T;
}

function normalizeRows<T extends Record<string, unknown>>(rows: T[]): T[] {
  return rows.map(normalizeRow);
}

export interface CertificateRow {
  id: number;
  code: string;

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
  notes: string | null;
  created_at: string;
  updated_at: string;
}

/** Колонки, по которым разрешена сортировка. Белый список: имя колонки
 *  подставляется в SQL напрямую и не может прийти от пользователя. */
export const SORTABLE = {
  code: 'code',
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
    ? `WHERE code ILIKE $1
        OR first_name_ru ILIKE $1 OR last_name_ru ILIKE $1
        OR company_ru ILIKE $1 OR course_ru ILIKE $1
        OR instructor_ru ILIKE $1`
    : '';

  const rows = like
    ? await sql.query(
        `SELECT * FROM certificates ${where} ${order} LIMIT $2 OFFSET $3`,
        [like, perPage, offset],
      )
    : await sql.query(
        `SELECT * FROM certificates ${order} LIMIT $1 OFFSET $2`,
        [perPage, offset],
      );

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

export async function getByCode(code: string): Promise<CertificateRow | null> {
  const rows = await sql`SELECT * FROM certificates WHERE code = ${code} LIMIT 1`;
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
  'code',
  'first_name_ru', 'last_name_ru', 'company_ru', 'course_ru',
  'instructor_ru', 'location_ru', 'completed_ru',
  'has_en', 'first_name_en', 'last_name_en', 'company_en', 'course_en',
  'instructor_en', 'location_en', 'completed_en',
  'has_kz', 'first_name_kz', 'last_name_kz', 'company_kz', 'course_kz',
  'instructor_kz', 'location_kz', 'completed_kz',
  'training_from', 'training_to', 'hours', 'issued_at',
  'perpetual', 'valid_until',
  'course_ref', 'instructor_ref', 'completed_ref', 'notes',
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
 * Раскатка правок справочника                                         *
 * ------------------------------------------------------------------ */

/**
 * Подтягивает копии названий к справочнику Studio.
 *
 * Записи хранят название курса, имя преподавателя и текст о прохождении
 * строкой — по ним идёт поиск, и они остаются у записей, чей элемент
 * справочника удалили. Но правку в Studio реестр обязан подхватывать, иначе
 * опечатка навсегда остаётся в трёх тысячах строк.
 *
 * Всё делается одним запросом на справочник: пачка значений подставляется
 * через VALUES, а WHERE трогает только те строки, где что-то расходится, —
 * иначе триггер обновил бы «изменён» у всего реестра на каждый вызов.
 */
interface RefRow { id: string; ru: string; en: string; kz: string }
interface CourseRefRow extends RefRow { perpetual: boolean; validityYears: number | null }

export interface SyncResult {
  courses: number;
  instructors: number;
  completions: number;
}

/** Имена колонок берутся из этого перечня, а не из запроса — в SQL они идут строкой. */
const SYNCED = {
  instructor: { ref: 'instructor_ref', cols: ['instructor_ru', 'instructor_en', 'instructor_kz'] },
  completed: { ref: 'completed_ref', cols: ['completed_ru', 'completed_en', 'completed_kz'] },
} as const;

/** VALUES-список вида ($1::text, $2::text, …) с явными типами в первой строке. */
function valuesList(rows: unknown[][], types: string[], values: unknown[]): string {
  return rows
    .map((row, index) => {
      const cells = row.map((cell, i) => {
        values.push(cell);
        // Тип нужен только первой строке, дальше Postgres выводит сам
        return index === 0 ? `$${values.length}::${types[i]}` : `$${values.length}`;
      });
      return `(${cells.join(', ')})`;
    })
    .join(', ');
}

async function syncNames(kind: keyof typeof SYNCED, items: RefRow[]): Promise<number> {
  if (!items.length) return 0;

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
      RETURNING c.id`,
    values,
  );
  return (rows as unknown[]).length;
}

/**
 * Курсы отдельно: вместе с названием у них едет срок действия, а он
 * пересчитывается от даты выдачи конкретной записи.
 */
async function syncCourses(items: CourseRefRow[]): Promise<number> {
  if (!items.length) return 0;

  const values: unknown[] = [];
  const list = valuesList(
    items.map((i) => [i.id, i.ru, i.en, i.kz, i.perpetual, i.validityYears]),
    ['text', 'text', 'text', 'text', 'boolean', 'int'],
    values,
  );

  const rows = await sql.query(
    `WITH ref(id, ru, en, kz, perp, years) AS (VALUES ${list}),
     target AS (
       SELECT c.id,
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
              END AS until
       FROM certificates c JOIN ref r ON c.course_ref = r.id
     )
     UPDATE certificates c
        SET course_ru = t.ru, course_en = t.en, course_kz = t.kz,
            perpetual = t.perp, valid_until = t.until
       FROM target t
      WHERE c.id = t.id
        AND (c.course_ru IS DISTINCT FROM t.ru
          OR c.course_en IS DISTINCT FROM t.en
          OR c.course_kz IS DISTINCT FROM t.kz
          OR c.perpetual IS DISTINCT FROM t.perp
          OR c.valid_until IS DISTINCT FROM t.until)
      RETURNING c.id`,
    values,
  );
  return (rows as unknown[]).length;
}

export async function syncFromRefs(refs: {
  courses: CourseRefRow[];
  instructors: RefRow[];
  completions: RefRow[];
}): Promise<SyncResult> {
  const [courses, instructors, completions] = await Promise.all([
    syncCourses(refs.courses),
    syncNames('instructor', refs.instructors),
    syncNames('completed', refs.completions),
  ]);
  return { courses, instructors, completions };
}

/** Какие из перечисленных номеров уже заняты. Один запрос на весь список. */
export async function takenCodes(codes: string[]): Promise<Set<string>> {
  if (!codes.length) return new Set();
  const rows = await sql.query('SELECT code FROM certificates WHERE code = ANY($1::text[])', [codes]);
  return new Set((rows as { code: string }[]).map((r) => r.code));
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
