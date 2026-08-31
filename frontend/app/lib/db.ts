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
  'course_ref', 'instructor_ref', 'notes',
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
