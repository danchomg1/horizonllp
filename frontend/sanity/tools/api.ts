/**
 * Клиент реестра сертификатов для инструмента внутри Studio.
 *
 * Ключ доступа вводит человек и он живёт только в localStorage его браузера —
 * в сборку не попадает. Подробности выбора см. в app/lib/adminAuth.ts.
 */
const KEY_STORAGE = 'horizon-cert-key';

export function getKey(): string {
  try {
    return localStorage.getItem(KEY_STORAGE) ?? '';
  } catch {
    return '';
  }
}

export function setKey(value: string): void {
  try {
    if (value) localStorage.setItem(KEY_STORAGE, value);
    else localStorage.removeItem(KEY_STORAGE);
  } catch {
    // приватный режим — работаем в пределах сессии
  }
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api/certificates${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': getKey(),
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = `Ошибка ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // тело не JSON — оставляем общий текст
    }
    throw new ApiError(message, res.status);
  }

  return res.json() as Promise<T>;
}

export type CertLocale = 'ru' | 'en' | 'kz';

/** Имя файла из Content-Disposition; если сервер его не прислал — запасное. */
function filenameFrom(res: Response, fallback: string): string {
  const match = /filename="([^"]+)"/.exec(res.headers.get('Content-Disposition') ?? '');
  return match ? match[1] : fallback;
}

/**
 * Скачивает бинарный ответ. Обычный fetch не умеет сохранять файл сам,
 * поэтому заворачиваем тело в blob и кликаем по временной ссылке.
 * Возвращает число записей, пропущенных сервером.
 */
async function download(path: string, init: RequestInit, fallbackName: string): Promise<number> {
  const res = await fetch(`/api/certificates${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', 'x-admin-key': getKey(), ...(init.headers ?? {}) },
  });

  if (!res.ok) {
    let message = `Ошибка ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // тело не JSON — оставляем общий текст
    }
    throw new ApiError(message, res.status);
  }

  const url = URL.createObjectURL(await res.blob());
  const link = document.createElement('a');
  link.href = url;
  link.download = filenameFrom(res, fallbackName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Ссылку освобождаем с запасом: часть браузеров читает blob уже после клика
  setTimeout(() => URL.revokeObjectURL(url), 10_000);

  return Number(res.headers.get('X-Skipped') ?? 0);
}

/** Готовит выбранные сертификаты: один файл — PDF, несколько — архив. */
export function downloadCertificates(ids: number[], locales: CertLocale[]): Promise<number> {
  return download('/pdf', { method: 'POST', body: JSON.stringify({ ids, locales }) }, 'certificates.zip');
}

/** Образец бланка со всеми заполненными полями — проверить вёрстку. */
export function downloadSample(locale: CertLocale): Promise<number> {
  return download(`/pdf?locale=${locale}`, {}, `obrazec-${locale}.pdf`);
}

/* ------------------------------------------------------------------ *
 * Справочники                                                         *
 * ------------------------------------------------------------------ */

export interface SyncResult {
  ok: true;
  /** Сколько записей реестра поправилось. */
  total: number;
  courses: number;
  instructors: number;
  completions: number;
  cities: number;
  /** Сколько правок справочника попало в журнал. */
  changes: number;
}

export type ChangeField = 'nameRu' | 'nameEn' | 'nameKz' | 'validity' | 'hours';

export interface ChangeEntry {
  id: number;
  kind: 'course' | 'instructor' | 'completion' | 'city';
  ref_id: string;
  field: ChangeField;
  /** Название элемента справочника на момент правки. */
  title: string;
  old_value: string | null;
  new_value: string | null;
  affected: number;
  created_at: string;
  acknowledged_at: string | null;
}

export interface ChangedRow {
  id: number;
  code: string;
  first_name_ru: string;
  last_name_ru: string;
  course_ru: string;
  issued_at: string | null;
  valid_until: string | null;
  perpetual: boolean;
}

/** Журнал правок справочника; open — только неотмеченные. */
export function listChanges(open = false): Promise<{ changes: ChangeEntry[] }> {
  return request<{ changes: ChangeEntry[] }>(`/changes${open ? '?open=1' : ''}`);
}

/** Одна правка вместе со списком задетых сертификатов. */
export function getChange(id: number): Promise<{ change: ChangeEntry; rows: ChangedRow[] }> {
  return request<{ change: ChangeEntry; rows: ChangedRow[] }>(`/changes/${id}`);
}

/** Отметка «просмотрено»: предупреждение гаснет у всех записей этой правки. */
export function acknowledgeChange(id: number): Promise<{ ok: true; changed: boolean }> {
  return request<{ ok: true; changed: boolean }>(`/changes/${id}`, { method: 'POST' });
}

/** То же для пачки: список правок или все неотмеченные сразу. */
export function acknowledgeChanges(
  target: { ids: number[] } | { all: true },
): Promise<{ ok: true; changed: number }> {
  return request<{ ok: true; changed: number }>('/changes', {
    method: 'POST',
    body: JSON.stringify(target),
  });
}

/**
 * Подтягивает названия в реестре к справочнику Studio. Печать и публичная
 * проверка справочник и так читают на лету — это нужно списку и поиску,
 * которые смотрят в колонки реестра напрямую.
 */
export function syncRegistry(): Promise<SyncResult> {
  return request<SyncResult>('/sync', { method: 'POST' });
}

/* ------------------------------------------------------------------ *
 * Загрузка реестра из Excel                                           *
 * ------------------------------------------------------------------ */

/** Пустой шаблон со списками курсов и преподавателей на момент скачивания. */
export function downloadTemplate(): Promise<number> {
  return download('/template', {}, 'horizon-certificates-template.xlsx');
}

export interface ImportIssue {
  sheet: string;
  row: number;
  column: string;
  message: string;
}

export interface ImportResult {
  ok: boolean;
  /** Сколько записей появилось в реестре. */
  imported?: number;
  /** Сколько строк прошло бы проверку — для режима «только проверить». */
  checked?: number;
  ready?: number;
  errors: ImportIssue[];
  /** Замечаний может быть больше, чем прислано: список обрезан. */
  errorsTotal?: number;
}

/**
 * Отправляет книгу как есть, без multipart: на той стороне всё равно нужен
 * только сам файл. Ответ с замечаниями приходит со статусом 422 — это не
 * сбой, а результат проверки, поэтому ошибкой его не считаем.
 */
export async function importRegistry(file: File, dryRun: boolean): Promise<ImportResult> {
  const res = await fetch(`/api/certificates/import${dryRun ? '?dry=1' : ''}`, {
    method: 'POST',
    headers: { 'x-admin-key': getKey() },
    body: file,
  });

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // тело не JSON — ниже отдадим общий текст
  }

  if (res.status === 422 && body) return body as ImportResult;
  if (!res.ok) {
    const message = (body as { error?: string })?.error ?? `Ошибка ${res.status}`;
    throw new ApiError(message, res.status);
  }
  return body as ImportResult;
}

export interface Certificate {
  id: number;
  code: string;
  legacy_code: string | null;
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

export interface ListResult {
  rows: Certificate[];
  total: number;
  page: number;
  perPage: number;
}

export type SortKey =
  | 'code' | 'legacyCode' | 'firstName' | 'lastName' | 'company'
  | 'course' | 'issuedAt' | 'validUntil' | 'createdAt';

export function listCertificates(params: {
  q?: string;
  sort?: SortKey;
  dir?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}): Promise<ListResult> {
  const search = new URLSearchParams();
  if (params.q) search.set('q', params.q);
  if (params.sort) search.set('sort', params.sort);
  if (params.dir) search.set('dir', params.dir);
  if (params.page) search.set('page', String(params.page));
  if (params.perPage) search.set('perPage', String(params.perPage));
  return request<ListResult>(`?${search.toString()}`);
}

/**
 * Выдача группе: общие поля курса и обучения плюс список людей.
 * Возвращает выданные номера в том же порядке, что и людей.
 */
export function issueBatch(
  shared: Record<string, unknown>,
  people: Record<string, unknown>[],
): Promise<{ ok: true; issued: number; codes: string[] }> {
  return request<{ ok: true; issued: number; codes: string[] }>('/batch', {
    method: 'POST',
    body: JSON.stringify({ shared, people }),
  });
}

export function createCertificate(data: Record<string, unknown>): Promise<Certificate> {
  return request<Certificate>('', { method: 'POST', body: JSON.stringify(data) });
}

export function updateCertificate(id: number, data: Record<string, unknown>): Promise<Certificate> {
  return request<Certificate>(`/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
}

export function removeCertificate(id: number): Promise<{ ok: true }> {
  return request<{ ok: true }>(`/${id}`, { method: 'DELETE' });
}

/** Пробный запрос, чтобы проверить введённый ключ. */
export async function checkKey(): Promise<boolean> {
  try {
    await listCertificates({ perPage: 1 });
    return true;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return false;
    throw error;
  }
}
