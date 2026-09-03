import { ICONS, type IconKey } from './icons';
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
  /**
   * Отметка, по которой текст центрируется по высоте вместо базовой линии
   * из варианта. Нужна номеру на плашке: у длинных номеров кегль меньше,
   * а сидеть в плашке они должны так же ровно.
   */
  centerOn?: number;
  variants: Variant[];
}

/** Половина высоты прописных Onest в долях кегля — для centerOn. */
export const CAP_HALF = 0.36;

/** Тёмно-синий основного текста и синий нижней строки — сняты с бланка. */
export const NAVY = { r: 0x05 / 255, g: 0x1b / 255, b: 0x38 / 255 };
export const BLUE = { r: 0x05 / 255, g: 0x38 / 255, b: 0x7f / 255 };
/** Номер сертификата лежит на тёмной плашке, поэтому он вывернутый. */
export const WHITE = { r: 1, g: 1, b: 1 };

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

  // Нижний ряд подписей: директор слева, преподаватель справа. Подписи полей
  // напечатаны на бланке в полосе 114–126, имена идут под ними на одной высоте.
  director: {
    font: 'onestBold' as FontKey,
    align: 'left' as const,
    x: 94,
    maxWidth: 200,
    tracking: 0.017,
    variants: [{ max: 12, min: 8, lineHeight: 1.2, first: 97 }],
  },
  instructor: {
    font: 'onestBold' as FontKey,
    align: 'left' as const,
    x: 543,
    maxWidth: 205,
    tracking: 0.017,
    variants: [{ max: 12, min: 8, lineHeight: 1.2, first: 97 }],
  },

  /**
   * Номер сертификата лежит на тёмной плашке бланка: 94–168 по горизонтали,
   * 40.1–64 по вертикали. Ставим его по центру плашки белым жирным, между
   * символами 2 пт воздуха — отсюда и tracking.
   *
   * Новые номера пятизначные и печатаются полным кеглем. Старые бывают
   * длиннее (в архиве встречаются до четырнадцати знаков), поэтому кегль
   * снижается: 62 пт ширины оставляют по 6 пт полей внутри плашки.
   */
  code: {
    font: 'onestBold' as FontKey,
    align: 'center' as const,
    x: 131,
    maxWidth: 62,
    tracking: 2 / 13,
    centerOn: 52.06,
    // first здесь не используется: базовую линию задаёт centerOn.
    variants: [{ max: 13, min: 6.5, lineHeight: 1.2, first: 47.4 }],
  },
  // Срок действия стоит рядом с плашкой и выравнен по её оптическому центру.
  validUntil: {
    font: 'onestRegular' as FontKey,
    align: 'left' as const,
    x: 351,
    maxWidth: 250,
    tracking: 0.02,
    variants: [{ max: 10, min: 7, lineHeight: 1.2, first: 48.5 }],
  },
} satisfies Record<string, FieldSpec>;

/* ------------------------------------------------------------------ *
 * Нижний ряд: продолжительность, даты, место                          *
 * ------------------------------------------------------------------ */

/**
 * От этого ряда в бланке остались только три вертикальные полоски — по одной
 * слева от каждого столбца (115.5, 310.8 и 531.8). Иконку, подпись и значение
 * рисуем сами: столбец с датами появляется не всегда, а подпись без значения
 * смотрелась бы браком.
 */
export type InfoField = 'hours' | 'trainingDate' | 'location';

export interface InfoColumn {
  field: InfoField;
  icon: IconKey;
  /** Левый край иконки; её верх — на INFO.iconTop. */
  iconX: number;
  /** Левый край подписи и значения. */
  textX: number;
  /** Значение идёт второй строкой, под подписью. */
  value: FieldSpec;
}

/**
 * Проверочный QR — в правом верхнем углу, справа от напечатанной на бланке
 * надписи «Проверить сертификат» (она занимает x 646–725, снизу 540–567).
 *
 * Внутренний край золотой рамки проходит по x = 830 и снизу по y = 582;
 * от него отступаем чуть меньше восьми миллиметров — вплотную к углу код
 * смотрелся зажатым. Ниже и слева поле бланка белое, так что пустого места
 * вокруг кода хватает с запасом.
 */
const FRAME_RIGHT = 830;
const FRAME_TOP = 582;
const FRAME_GAP = 22.2;

export const QR = {
  /** Сторона квадрата в пунктах. */
  size: 72,
  /** Центр по горизонтали. */
  centerX: FRAME_RIGHT - FRAME_GAP - 72 / 2,
  /** Верхний край, отсчёт от низа страницы. */
  top: FRAME_TOP - FRAME_GAP,
};

export const INFO = {
  /** Верх иконки и базовая линия подписи. */
  iconTop: 221,
  labelBaseline: 211,
  labelSize: 10,
};

/** Воздух между иконкой и текстом — снят со старого бланка. */
const ICON_GAP = 10;

export const INFO_ROW: InfoColumn[] = (
  [
    // Продолжительность посередине: она есть у каждого сертификата, потому
    // что задана у курса. Даты и место заполнены не всегда, поэтому стоят
    // по краям — пустой крайний столбец не оставляет дыру в середине ряда.
    //
    // limit — правая граница столбца: у первых двух это следующая полоска
    // минус воздух, у последнего — правый край содержимого бланка.
    { field: 'trainingDate', icon: 'calendar', iconX: 135.5, limit: 298.7 },
    { field: 'hours', icon: 'duration', iconX: 330.8, limit: 519.7 },
    { field: 'location', icon: 'pin', iconX: 551.8, limit: 748 },
  ] as const
).map(({ field, icon, iconX, limit }) => {
  const textX = iconX + ICONS[icon].width + ICON_GAP;
  return {
    field,
    icon,
    iconX,
    textX,
    value: {
      font: 'onestRegular' as FontKey,
      align: 'left' as const,
      x: textX,
      maxWidth: limit - textX,
      tracking: 0,
      variants: [{ max: 12, min: 7.5, lineHeight: 1.2, first: 195 }],
    },
  };
});

/** Подписи нижнего ряда — печатаются вместе со значениями. */
export interface InfoLabels {
  hours: string;
  /** Курс уложился в один день. */
  trainingDate: string;
  /** Две даты, начало и конец. */
  trainingPeriod: string;
  location: string;
}

export interface Layout {
  template: string;
  fields: Record<string, FieldSpec>;
  labels: InfoLabels;
}

/**
 * У казахского бланка своя вёрстка: подзаголовок стоит над заголовком,
 * поэтому название курса ниже (297 против 285), а фраза о прохождении —
 * под ним, на 254 вместо 324.
 */
export const LAYOUTS: Record<CertLocale, Layout> = {
  ru: {
    template: 'ru.pdf',
    labels: {
      hours: 'Продолжительность',
      trainingDate: 'Дата проведения',
      trainingPeriod: 'Период обучения',
      location: 'Место проведения',
    },
    fields: {
      ...COMMON,
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
    labels: {
      hours: 'Duration',
      trainingDate: 'Delivery Date',
      trainingPeriod: 'Training Period',
      location: 'Location',
    },
    fields: {
      ...COMMON,
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
    labels: {
      hours: 'Ұзақтығы',
      trainingDate: 'Өткізілген күні',
      trainingPeriod: 'Оқу кезеңі',
      location: 'Өткізілген жері',
    },
    fields: {
      ...COMMON,
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
