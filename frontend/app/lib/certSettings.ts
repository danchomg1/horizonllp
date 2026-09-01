import { client } from './sanity';
import type { CertLocale } from './certificates';

/**
 * Настройки сертификатов из Studio: подписант и тексты о прохождении.
 * Документ единственный, id у него фиксированный.
 */

interface RawSettings {
  directorRu?: string;
  directorEn?: string;
  directorKz?: string;
  completedRu?: string;
  completedEn?: string;
  completedKz?: string;
}

const QUERY = `*[_id == "certSettings"][0]{
  directorRu, directorEn, directorKz,
  completedRu, completedEn, completedKz
}`;

export interface CertSettings {
  director: Record<CertLocale, string>;
  completed: Record<CertLocale, string>;
}

const FALLBACK: CertSettings = {
  director: {
    ru: 'Малик Бакытбек',
    en: 'Malik Bakytbek',
    kz: 'Малик Бақытбек',
  },
  completed: {
    ru: 'успешно прошёл(а) курс обучения',
    en: 'has successfully completed the training course',
    kz: 'оқу курсын сәтті аяқтады',
  },
};

// Настройки меняют редко, а читаются на каждую пачку сертификатов.
// Минуты жизни хватает, чтобы правка в Studio доехала без перезапуска.
const TTL_MS = 60_000;
let cached: { at: number; value: CertSettings } | null = null;

export async function getCertSettings(): Promise<CertSettings> {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.value;

  let raw: RawSettings = {};
  try {
    raw = (await client.fetch<RawSettings | null>(QUERY)) ?? {};
  } catch (error) {
    // Studio недоступна — сертификаты всё равно должны выпускаться
    console.error('Не удалось прочитать настройки сертификатов:', error);
  }

  const value: CertSettings = {
    director: {
      ru: raw.directorRu?.trim() || FALLBACK.director.ru,
      en: raw.directorEn?.trim() || FALLBACK.director.en,
      kz: raw.directorKz?.trim() || FALLBACK.director.kz,
    },
    completed: {
      ru: raw.completedRu?.trim() || FALLBACK.completed.ru,
      en: raw.completedEn?.trim() || FALLBACK.completed.en,
      kz: raw.completedKz?.trim() || FALLBACK.completed.kz,
    },
  };

  cached = { at: Date.now(), value };
  return value;
}

/** Сбрасывает кэш — нужен, когда правку из Studio хотят увидеть сразу. */
export function clearCertSettingsCache(): void {
  cached = null;
}
