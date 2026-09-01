import { readFile } from 'fs/promises';
import path from 'path';
import { PDFDocument, rgb, setCharacterSpacing, type PDFFont, type PDFPage } from 'pdf-lib';
import realFontkit from '@pdf-lib/fontkit';
import { LAYOUTS, STAMPS, NAVY, BLUE, type FieldSpec, type FontKey } from './layout';
import type { CertLocale } from '../app/lib/certificates';

const ASSETS = path.join(process.cwd(), 'certificates');

/* ------------------------------------------------------------------ *
 * Шрифты                                                              *
 * ------------------------------------------------------------------ */

/**
 * Onest — переменный шрифт. Обычное начертание берём напрямую из файла,
 * жирное — экземпляром по оси веса.
 *
 * Тонкость: fontkit ломает подмножество глифов у экземпляров переменного
 * шрифта (теряются ь, һ и другие). Проверено: базовый шрифт с подмножеством
 * отрисовывается полностью, вариация — нет. Поэтому жирное начертание
 * встраивается целиком. Это ~190 КБ на файл, зато буквы не пропадают.
 */
function variationFontkit(wght: number) {
  return {
    create: (bytes: Uint8Array) => {
      const font = realFontkit.create(bytes as never) as never as {
        getVariation?: (v: Record<string, number>) => unknown;
      };
      return (font.getVariation ? font.getVariation({ wght }) : font) as never;
    },
  };
}

let cache: { lora: Buffer; onest: Buffer; signature: Buffer; stamp: Buffer } | null = null;

async function loadAssets() {
  if (cache) return cache;
  const [lora, onest, signature, stamp] = await Promise.all([
    readFile(path.join(ASSETS, 'fonts/Lora-Bold.ttf')),
    readFile(path.join(ASSETS, 'fonts/Onest-Variable.ttf')),
    readFile(path.join(ASSETS, 'stamps/signature.png')),
    readFile(path.join(ASSETS, 'stamps/stamp.png')),
  ]);
  cache = { lora, onest, signature, stamp };
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

export interface StampPlacement {
  signature?: { x: number; y: number; width: number } | null;
  stamp?: { x: number; y: number; width: number } | null;
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

  // Обычные начертания подмножеством, жирное — целиком (см. комментарий выше)
  doc.registerFontkit(realFontkit);
  const lora = await doc.embedFont(assets.lora, { subset: true });
  const onestRegular = await doc.embedFont(assets.onest, { subset: true });

  doc.registerFontkit(variationFontkit(700) as never);
  const onestBold = await doc.embedFont(assets.onest, { subset: false });

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

  // Печать и подпись: позиция общая для всех языков
  const sig = placement.signature === undefined ? STAMPS.signature : placement.signature;
  const stm = placement.stamp === undefined ? STAMPS.stamp : placement.stamp;

  if (sig) {
    const img = await doc.embedPng(assets.signature);
    const scale = sig.width / img.width;
    page.drawImage(img, { x: sig.x, y: sig.y, width: sig.width, height: img.height * scale });
  }
  if (stm) {
    const img = await doc.embedPng(assets.stamp);
    const scale = stm.width / img.width;
    page.drawImage(img, { x: stm.x, y: stm.y, width: stm.width, height: img.height * scale });
  }

  return doc.save();
}
