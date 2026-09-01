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

export interface Certificate {
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

export interface ListResult {
  rows: Certificate[];
  total: number;
  page: number;
  perPage: number;
}

export type SortKey =
  | 'code' | 'firstName' | 'lastName' | 'company'
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
