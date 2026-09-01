import { readFile } from 'fs/promises';
import path from 'path';
import { PDFDocument, rgb, setCharacterSpacing, type PDFFont, type PDFPage } from 'pdf-lib';
import realFontkit from '@pdf-lib/fontkit';
import { LAYOUTS, DEFAULT_MARKS, NAVY, BLUE, type FieldSpec, type FontKey } from './layout';
import type { CertLocale } from '../app/lib/certificates';

const ASSETS = path.join(process.cwd(), 'certificates');

/* ------------------------------------------------------------------ *
 * Шрифты                                                              *
 * ------------------------------------------------------------------ */

/**
 * Начертания встраиваются подмножеством из трёх статических файлов.
 *
 * Переменный Onest сюда не годится: fontkit не умеет делать подмножество
 * из экземпляра переменного шрифта — часть глифов (r, B, P и другие)
 * получает битые контуры и просто не рисуется. Встраивание целиком тоже
 * не спасает: тогда в файл уходят исходные контуры, то есть вес не
 * применяется вовсе, а ширины при этом берутся от экземпляра, и «Safety»
 * печатается как «Safet y».
 *
 * Поэтому обычное и жирное — отдельные статические файлы Onest 2.001
 * (827 глифов, казахские буквы на месте). Старые файлы из прежнего
 * генератора не подходят: в них 509 глифов и нет ә ғ қ ң ө ұ ү һ.
 */

let cache: { lora: Buffer; onestRegular: Buffer; onestBold: Buffer; signature: Buffer; stamp: Buffer } | null = null;

async function loadAssets() {
  if (cache) return cache;
  const [lora, onestRegular, onestBold, signature, stamp] = await Promise.all([
    readFile(path.join(ASSETS, 'fonts/Lora-Bold.ttf')),
    readFile(path.join(ASSETS, 'fonts/Onest-Regular.ttf')),
    readFile(path.join(ASSETS, 'fonts/Onest-Bold.ttf')),
    readFile(path.join(ASSETS, 'stamps/signature.png')),
    readFile(path.join(ASSETS, 'stamps/stamp.png')),
  ]);
  cache = { lora, onestRegular, onestBold, signature, stamp };
  return cache;
}

/* ------------------------------------------------------------------ *
 * Подбор кегля и перенос строк                                        *
 * ------------------------------------------------------------------ */

/** Ширина строки с учётом межбуквенного интервала. */
function measure(font: PDFFont, text: string, size: number, tracking: number): number {
  const extra = tracking * size * Math.max(0, [...text].length - 1);
  return font.widthOfTextAtSize(text, size) + extra;
}

/** Жадный перенос по словам в заданное число строк. Возвращает null, если не влезло. */
function wrap(
  font: PDFFont, text: string, size: number, tracking: number,
  maxWidth: number, maxLines: number,
): string[] | null {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];

  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? current + ' ' + word : word;
    if (measure(font, candidate, size, tracking) <= maxWidth) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    // Слово само по себе шире строки — этот кегль не подходит
    if (measure(font, word, size, tracking) > maxWidth) return null;
    current = word;
    if (lines.length >= maxLines) return null;
  }
  if (current) lines.push(current);
  return lines.length <= maxLines ? lines : null;
}

interface Fitted {
  lines: string[];
  size: number;
  lineHeight: number;
  first: number;
}

/**
 * Перебирает варианты по возрастанию числа строк и берёт первый подходящий:
 * сперва пробуем уместить в одну строку, уменьшая кегль, затем в две.
 */
function fit(font: PDFFont, text: string, spec: FieldSpec): Fitted | null {
  const tracking = spec.tracking ?? 0;

  for (const variant of spec.variants) {
    const lineCount = spec.variants.indexOf(variant) + 1;
    for (let size = variant.max; size >= variant.min; size -= 0.25) {
      const lines = wrap(font, text, size, tracking, spec.maxWidth, lineCount);
      if (lines && lines.length) {
        return { lines, size, lineHeight: variant.lineHeight, first: variant.first };
      }
    }
  }

  // Ничего не подошло — печатаем минимальным кеглем последнего варианта,
  // обрезав по ширине, чтобы поле не осталось пустым.
  const last = spec.variants[spec.variants.length - 1];
  return { lines: [text], size: last.min, lineHeight: last.lineHeight, first: last.first };
}

/* ------------------------------------------------------------------ *
 * Отрисовка                                                           *
 * ------------------------------------------------------------------ */

function drawField(
  page: PDFPage, font: PDFFont, spec: FieldSpec, text: string,
  color: { r: number; g: number; b: number },
) {
  const value = String(text ?? '').trim();
  if (!value) return;

  const placed = fit(font, value, spec);
  if (!placed) return;

  const tracking = spec.tracking ?? 0;
  const tc = tracking * placed.size;

  page.pushOperators(setCharacterSpacing(tc));
  placed.lines.forEach((line, i) => {
    const width = measure(font, line, placed.size, tracking);
    const x = spec.align === 'center' ? spec.x - width / 2 : spec.x;
    const y = placed.first - i * placed.size * placed.lineHeight;
    page.drawText(line, { x, y, size: placed.size, font, color: rgb(color.r, color.g, color.b) });
  });
  page.pushOperators(setCharacterSpacing(0));
}

/**
 * Ставит печать или подпись по центру заданной точки.
 *
 * Формат определяем по сигнатуре файла: в Studio можно загрузить и JPEG,
 * а pdf-lib встраивает PNG и JPEG разными методами.
 */
async function drawMark(
  doc: PDFDocument, page: PDFPage, spec: MarkSpec, fallback: Uint8Array,
) {
  const bytes = spec.image ?? fallback;
  const isPng = bytes[0] === 0x89 && bytes[1] === 0x50;

  const img = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
  const height = (img.height / img.width) * spec.width;

  page.drawImage(img, {
    x: spec.x - spec.width / 2,
    y: spec.y - height / 2,
    width: spec.width,
    height,
  });
}

export interface CertificateData {
  code: string;
  name: string;
  course: string;
  completed?: string;
  hours?: string;
  trainingDate?: string;
  location?: string;
  instructor?: string;
  director: string;
  validUntil?: string;
}

export interface MarkSpec {
  /** Готовый файл картинки. Не задан — берём тот, что лежит в stamps/. */
  image?: Uint8Array;
  /** Центр картинки в пунктах; начало отсчёта — левый нижний угол страницы. */
  x: number;
  y: number;
  /** Ширина в пунктах, высота считается по пропорциям файла. */
  width: number;
}

/** null — метку не ставить, undefined — взять положение по умолчанию. */
export interface StampPlacement {
  signature?: MarkSpec | null;
  stamp?: MarkSpec | null;
}

/** Собирает готовый PDF сертификата на бланке нужного языка. */
export async function renderCertificate(
  locale: CertLocale,
  data: CertificateData,
  placement: StampPlacement = {},
): Promise<Uint8Array> {
  const layout = LAYOUTS[locale];
  const assets = await loadAssets();

  const templateBytes = await readFile(path.join(ASSETS, 'templates', layout.template));
  const doc = await PDFDocument.load(templateBytes);
  const page = doc.getPage(0);

  doc.registerFontkit(realFontkit);
  const [lora, onestRegular, onestBold] = await Promise.all([
    doc.embedFont(assets.lora, { subset: true }),
    doc.embedFont(assets.onestRegular, { subset: true }),
    doc.embedFont(assets.onestBold, { subset: true }),
  ]);

  const fonts: Record<FontKey, PDFFont> = { lora, onestRegular, onestBold };

  const draw = (field: string, text: string | undefined, color = NAVY) => {
    const spec = layout.fields[field];
    if (!spec || !text) return;
    drawField(page, fonts[spec.font], spec, text, color);
  };

  draw('name', data.name);
  draw('completed', data.completed);
  draw('course', data.course);
  draw('hours', data.hours);
  draw('trainingDate', data.trainingDate);
  draw('location', data.location);
  draw('director', data.director);
  draw('instructor', data.instructor);
  draw('code', data.code, BLUE);
  draw('validUntil', data.validUntil, BLUE);

  // Печать и подпись: положение общее для всех языков, печать кладётся
  // поверх подписи — в этом порядке их и ставят от руки.
  const sig = placement.signature === undefined ? DEFAULT_MARKS.signature : placement.signature;
  const stm = placement.stamp === undefined ? DEFAULT_MARKS.stamp : placement.stamp;

  if (sig) await drawMark(doc, page, sig, assets.signature);
  if (stm) await drawMark(doc, page, stm, assets.stamp);

  return doc.save();
}
