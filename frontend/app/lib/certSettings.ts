import { client } from './sanity';
import type { CertLocale } from './certificates';
import type { MarkSpec } from '../../certificates/render';
import { DEFAULT_MARKS, PAGE } from '../../certificates/layout';

/**
 * Настройки сертификатов из Studio: подписант и расположение печати
 * с подписью. Документ единственный, id у него фиксированный.
 *
 * В Studio координаты задаются в миллиметрах от левого верхнего угла листа,
 * потому что так их удобно снять с распечатки. Здесь они переводятся в
 * пункты PDF с началом в левом нижнем углу — то, чем оперирует отрисовка.
 */

const MM_TO_PT = 72 / 25.4;

interface RawSettings {
  directorRu?: string;
  directorEn?: string;
  directorKz?: string;
  signatureShow?: boolean;
  signatureUrl?: string;
  signatureX?: number;
  signatureY?: number;
  signatureWidth?: number;
  stampShow?: boolean;
  stampUrl?: string;
  stampX?: number;
  stampY?: number;
  stampWidth?: number;
}

const QUERY = `*[_id == "certSettings"][0]{
  directorRu, directorEn, directorKz,
  signatureShow, signatureX, signatureY, signatureWidth,
  "signatureUrl": signatureImage.asset->url,
  stampShow, stampX, stampY, stampWidth,
  "stampUrl": stampImage.asset->url
}`;

export interface CertSettings {
  director: Record<CertLocale, string>;
  signature: MarkSpec | null;
  stamp: MarkSpec | null;
}

const FALLBACK_DIRECTOR: Record<CertLocale, string> = {
  ru: 'Малик Бакытбек',
  en: 'Malik Bakytbek',
  kz: 'Малик Бақытбек',
};

/**
 * Собирает положение метки. Показ выключен или ширина не задана — метки нет.
 * Незаполненные координаты берутся из значений по умолчанию, чтобы пустой
 * документ настроек давал тот же результат, что и заполненный.
 */
function toMark(
  show: boolean | undefined,
  x: number | undefined,
  y: number | undefined,
  width: number | undefined,
  image: Uint8Array | undefined,
  fallback: { x: number; y: number; width: number },
): MarkSpec | null {
  if (show === false) return null;

  const w = typeof width === 'number' && width > 0 ? width * MM_TO_PT : fallback.width;
  return {
    image,
    x: typeof x === 'number' ? x * MM_TO_PT : fallback.x,
    // Y в Studio отсчитывается сверху, в PDF — снизу
    y: typeof y === 'number' ? PAGE.height - y * MM_TO_PT : fallback.y,
    width: w,
  };
}

/* ------------------------------------------------------------------ *
 * Кэш                                                                 *
 * ------------------------------------------------------------------ */

// Настройки меняют редко, а читаются на каждую пачку сертификатов.
// Минуты жизни хватает, чтобы правка в Studio доехала без перезапуска.
const TTL_MS = 60_000;
let cached: { at: number; value: CertSettings } | null = null;

const imageCache = new Map<string, Uint8Array>();

async function loadImage(url: string | undefined): Promise<Uint8Array | undefined> {
  if (!url) return undefined;

  const hit = imageCache.get(url);
  if (hit) return hit;

  const res = await fetch(url);
  if (!res.ok) {
    // Картинка недоступна — рисуем файлом по умолчанию, а не падаем
    console.error('Не удалось загрузить картинку печати:', url, res.status);
    return undefined;
  }

  const bytes = new Uint8Array(await res.arrayBuffer());
  imageCache.set(url, bytes);
  return bytes;
}

export async function getCertSettings(): Promise<CertSettings> {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.value;

  let raw: RawSettings = {};
  try {
    raw = (await client.fetch<RawSettings | null>(QUERY)) ?? {};
  } catch (error) {
    // Studio недоступна — сертификаты всё равно должны выпускаться
    console.error('Не удалось прочитать настройки сертификатов:', error);
  }

  const [signatureImage, stampImage] = await Promise.all([
    loadImage(raw.signatureUrl),
    loadImage(raw.stampUrl),
  ]);

  const value: CertSettings = {
    director: {
      ru: raw.directorRu?.trim() || FALLBACK_DIRECTOR.ru,
      en: raw.directorEn?.trim() || FALLBACK_DIRECTOR.en,
      kz: raw.directorKz?.trim() || FALLBACK_DIRECTOR.kz,
    },
    signature: toMark(
      raw.signatureShow, raw.signatureX, raw.signatureY, raw.signatureWidth,
      signatureImage, DEFAULT_MARKS.signature,
    ),
    stamp: toMark(
      raw.stampShow, raw.stampX, raw.stampY, raw.stampWidth,
      stampImage, DEFAULT_MARKS.stamp,
    ),
  };

  cached = { at: Date.now(), value };
  return value;
}

/** Сбрасывает кэш — нужен, когда правку из Studio хотят увидеть сразу. */
export function clearCertSettingsCache(): void {
  cached = null;
}
