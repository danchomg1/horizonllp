import type { CertLocale } from '../app/lib/certificates';

/**
 * Разметка бланков.
 *
 * Координаты в пунктах PDF, начало отсчёта — левый нижний угол страницы
 * (842 x 595). Сняты с бланков из sert_sample по скрытому текстовому слою:
 * подписи полей напечатаны в самом бланке, поэтому значения выравниваются
 * по ним, а не по образцам-макетам — в макетах блок сдвинут на 11–17 пт.
 */

export const PAGE = { width: 842, height: 595 };

/** Середина страницы: имя и название курса центрируются по ней. */
const CENTER = 421;

export type FontKey = 'lora' | 'onestRegular' | 'onestBold';

export interface Variant {
  /** Максимальный и минимальный кегль: текст ужимается, пока не влезет. */
  max: number;
  min: number;
  /** Межстрочный интервал в долях кегля. */
  lineHeight: number;
  /** Базовая линия первой строки. */
  first: number;
}

export interface FieldSpec {
  font: FontKey;
  align: 'left' | 'center';
  /** Для center — середина, для left — левый край. */
  x: number;
  maxWidth: number;
  /** Межбуквенный интервал в долях кегля. */
  tracking?: number;
  variants: Variant[];
}

/** Тёмно-синий основного текста и синий нижней строки — сняты с бланка. */
export const NAVY = { r: 0x05 / 255, g: 0x1b / 255, b: 0x38 / 255 };
export const BLUE = { r: 0x05 / 255, g: 0x38 / 255, b: 0x7f / 255 };

/** Поля, одинаковые во всех трёх бланках. */
const COMMON = {
  // Имя: одна строка на 349, при длинном имени переносится на две.
  name: {
    font: 'lora' as FontKey,
    align: 'center' as const,
    x: CENTER,
    maxWidth: 430,
    tracking: -0.03,
    variants: [
      { max: 40, min: 26, lineHeight: 1.15, first: 349 },
      { max: 24, min: 16, lineHeight: 1.15, first: 362 },
    ],
  },

  // Нижний ряд подписей: директор слева, преподаватель справа.
  director: {
    font: 'onestBold' as FontKey,
    align: 'left' as const,
    x: 94,
    maxWidth: 200,
    tracking: 0.017,
    variants: [{ max: 12, min: 8, lineHeight: 1.2, first: 101.5 }],
  },
  instructor: {
    font: 'onestBold' as FontKey,
    align: 'left' as const,
    x: 543,
    maxWidth: 205,
    tracking: 0.017,
    variants: [{ max: 12, min: 8, lineHeight: 1.2, first: 101.5 }],
  },

  // Подвал: номер и срок действия.
  code: {
    font: 'onestRegular' as FontKey,
    align: 'left' as const,
    x: 101,
    maxWidth: 240,
    tracking: 0.02,
    variants: [{ max: 14, min: 9, lineHeight: 1.2, first: 47 }],
  },
  validUntil: {
    font: 'onestRegular' as FontKey,
    align: 'left' as const,
    x: 351,
    maxWidth: 250,
    tracking: 0.02,
    variants: [{ max: 10, min: 7, lineHeight: 1.2, first: 57 }],
  },
} satisfies Record<string, FieldSpec>;

/** Ряд «Продолжительность — Дата — Место» на y=195, кегль общий на три колонки. */
function infoRow(xs: [number, number, number]) {
  const spec = (x: number, maxWidth: number): FieldSpec => ({
    font: 'onestRegular',
    align: 'left',
    x,
    maxWidth,
    tracking: 0,
    variants: [{ max: 12, min: 7.5, lineHeight: 1.2, first: 195 }],
  });
  // Правая граница содержимого бланка — 748 пт, дальше идёт золотая диагональ.
  return {
    hours: spec(xs[0], xs[1] - xs[0] - 12),
    trainingDate: spec(xs[1], xs[2] - xs[1] - 12),
    location: spec(xs[2], 748 - xs[2]),
  };
}

export interface Layout {
  template: string;
  fields: Record<string, FieldSpec>;
}

/**
 * У казахского бланка своя вёрстка: подзаголовок стоит над заголовком,
 * поэтому название курса ниже (297 против 285), а фраза о прохождении —
 * под ним, на 254 вместо 324.
 */
export const LAYOUTS: Record<CertLocale, Layout> = {
  ru: {
    template: 'ru.pdf',
    fields: {
      ...COMMON,
      ...infoRow([168.7, 392.7, 604.7]),
      completed: {
        font: 'onestRegular', align: 'center', x: CENTER, maxWidth: 300, tracking: 0.017,
        variants: [
          { max: 12, min: 9, lineHeight: 1.25, first: 324 },
          { max: 10, min: 8, lineHeight: 1.25, first: 330 },
        ],
      },
      course: {
        font: 'onestBold', align: 'center', x: CENTER, maxWidth: 330, tracking: -0.046,
        variants: [
          { max: 26, min: 19, lineHeight: 1.18, first: 285 },
          { max: 18, min: 13, lineHeight: 1.18, first: 292 },
          { max: 13, min: 9, lineHeight: 1.18, first: 297 },
        ],
      },
    },
  },

  en: {
    template: 'en.pdf',
    fields: {
      ...COMMON,
      ...infoRow([231.2, 397.2, 591.2]),
      completed: {
        font: 'onestRegular', align: 'center', x: CENTER, maxWidth: 340, tracking: 0.017,
        variants: [
          { max: 12, min: 9, lineHeight: 1.25, first: 324 },
          { max: 10, min: 8, lineHeight: 1.25, first: 330 },
        ],
      },
      course: {
        font: 'onestBold', align: 'center', x: CENTER, maxWidth: 330, tracking: -0.046,
        variants: [
          { max: 26, min: 19, lineHeight: 1.18, first: 285 },
          { max: 18, min: 13, lineHeight: 1.18, first: 292 },
          { max: 13, min: 9, lineHeight: 1.18, first: 297 },
        ],
      },
    },
  },

  kz: {
    template: 'kz.pdf',
    fields: {
      ...COMMON,
      ...infoRow([212.2, 382.2, 580.2]),
      completed: {
        font: 'onestRegular', align: 'center', x: CENTER, maxWidth: 330, tracking: 0.017,
        variants: [
          { max: 12, min: 9, lineHeight: 1.25, first: 254 },
          { max: 10, min: 8, lineHeight: 1.25, first: 260 },
        ],
      },
      course: {
        font: 'onestBold', align: 'center', x: CENTER, maxWidth: 330, tracking: -0.046,
        variants: [
          { max: 26, min: 19, lineHeight: 1.18, first: 297 },
          { max: 18, min: 13, lineHeight: 1.18, first: 304 },
          { max: 13, min: 9, lineHeight: 1.18, first: 309 },
        ],
      },
    },
  },
};

/**
 * Печать и подпись по умолчанию — действуют, пока в Studio не задали своё
 * положение. Одно на все три языка: нижний блок у бланков совпадает.
 *
 * Здесь миллиметры от левого верхнего угла листа, как в Studio; в пункты
 * PDF переводит app/lib/certSettings.ts. x/y — центр картинки, высота
 * берётся по пропорциям файла.
 */
const MM = 72 / 25.4;

function mark(xMm: number, yMm: number, widthMm: number) {
  return { x: xMm * MM, y: PAGE.height - yMm * MM, width: widthMm * MM };
}

export const DEFAULT_MARKS = {
  // Подпись ложится на линию над словами «Генеральный директор»,
  // печать перекрывает её правый край — как ставят от руки.
  signature: mark(53.6, 152.2, 42),
  stamp: mark(88, 152, 32),
};
