import { readFile } from 'fs/promises';
import path from 'path';
import { LineCapStyle, PDFDocument, rgb, setCharacterSpacing, type PDFFont, type PDFPage } from 'pdf-lib';
import realFontkit from '@pdf-lib/fontkit';
import {
  LAYOUTS, CAP_HALF, INFO, INFO_ROW, QR, NAVY, BLUE, WHITE,
  type FieldSpec, type FontKey, type InfoField,
} from './layout';
import QRCode from 'qrcode';
import { ICONS, type Icon } from './icons';
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

let cache: { lora: Buffer; onestRegular: Buffer; onestBold: Buffer } | null = null;

async function loadAssets() {
  if (cache) return cache;
  const [lora, onestRegular, onestBold] = await Promise.all([
    readFile(path.join(ASSETS, 'fonts/Lora-Bold.ttf')),
    readFile(path.join(ASSETS, 'fonts/Onest-Regular.ttf')),
    readFile(path.join(ASSETS, 'fonts/Onest-Bold.ttf')),
  ]);
  cache = { lora, onestRegular, onestBold };
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
  const first = spec.centerOn !== undefined
    ? spec.centerOn - CAP_HALF * placed.size
    : placed.first;

  page.pushOperators(setCharacterSpacing(tc));
  placed.lines.forEach((line, i) => {
    const width = measure(font, line, placed.size, tracking);
    const x = spec.align === 'center' ? spec.x - width / 2 : spec.x;
    const y = first - i * placed.size * placed.lineHeight;
    page.drawText(line, { x, y, size: placed.size, font, color: rgb(color.r, color.g, color.b) });
  });
  page.pushOperators(setCharacterSpacing(0));
}

/**
 * Рисует иконку нижнего ряда. Точка отсчёта — левый верхний угол viewBox:
 * pdf-lib сам переворачивает ось Y для контуров SVG.
 */
function drawIcon(page: PDFPage, icon: Icon, x: number, top: number) {
  const color = rgb(BLUE.r, BLUE.g, BLUE.b);
  for (const shape of icon.paths) {
    page.drawSvgPath(shape.d, shape.mode === 'fill'
      ? { x, y: top, color }
      : {
          x, y: top,
          borderColor: color,
          borderWidth: 1,
          ...(shape.round ? { borderLineCap: LineCapStyle.Round } : {}),
        });
  }
}

/**
 * Рисует проверочный QR прямоугольниками-модулями.
 *
 * Вектором, а не картинкой: при печати и увеличении квадраты остаются
 * чёткими, а файл прибавляет считанные килобайты. Подряд идущие тёмные
 * модули в ряду сливаются в один прямоугольник — так операций в разы
 * меньше, а рисунок тот же.
 */
function drawQr(page: PDFPage, url: string) {
  const { modules } = QRCode.create(url, { errorCorrectionLevel: 'M' });
  const count = modules.size;
  const step = QR.size / count;
  const left = QR.centerX - QR.size / 2;
  const color = rgb(NAVY.r, NAVY.g, NAVY.b);

  for (let row = 0; row < count; row++) {
    let run = 0;
    for (let col = 0; col <= count; col++) {
      const dark = col < count && modules.data[row * count + col];
      if (dark) { run++; continue; }
      if (run) {
        page.drawRectangle({
          x: left + (col - run) * step,
          y: QR.top - (row + 1) * step,
          width: run * step,
          height: step,
          color,
        });
        run = 0;
      }
    }
  }
}

export interface CertificateData {
  code: string;
  name: string;
  course: string;
  completed?: string;
  hours?: string;
  trainingDate?: string;
  /** Две даты вместо одной — тогда столбец подписан «Период обучения». */
  trainingIsRange?: boolean;
  location?: string;
  instructor?: string;
  director: string;
  validUntil?: string;
  /** Адрес проверки: попадает в QR. Не задан — QR не рисуется. */
  verifyUrl?: string;
}

/** Собирает готовый PDF сертификата на бланке нужного языка. */
export async function renderCertificate(
  locale: CertLocale,
  data: CertificateData,
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
  draw('director', data.director);
  draw('instructor', data.instructor);
  draw('code', data.code.toUpperCase(), WHITE);
  draw('validUntil', data.validUntil, BLUE);

  // Нижний ряд собираем целиком: бланк даёт только полоски-разделители.
  // Столбец без значения пропускаем вместе с иконкой и подписью — соседние
  // столбцы при этом остаются на месте.
  const cells: Record<InfoField, { text?: string; label: string }> = {
    hours: { text: data.hours, label: layout.labels.hours },
    trainingDate: {
      text: data.trainingDate,
      label: data.trainingIsRange ? layout.labels.trainingPeriod : layout.labels.trainingDate,
    },
    location: { text: data.location, label: layout.labels.location },
  };

  for (const column of INFO_ROW) {
    const cell = cells[column.field];
    if (!cell.text?.trim()) continue;

    drawIcon(page, ICONS[column.icon], column.iconX, INFO.iconTop);
    page.drawText(cell.label, {
      x: column.textX,
      y: INFO.labelBaseline,
      size: INFO.labelSize,
      font: onestRegular,
      color: rgb(BLUE.r, BLUE.g, BLUE.b),
    });
    drawField(page, onestRegular, column.value, cell.text, NAVY);
  }

  // QR у каждого сертификата свой: он ведёт на проверку по его номеру
  if (data.verifyUrl) drawQr(page, data.verifyUrl);

  return doc.save();
}
