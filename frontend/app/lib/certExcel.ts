import ExcelJS from 'exceljs';
import { addYears, normalizeCode } from './certificates';
import { buildIndex, closestName, refKey, type CertRefs, type CourseRef, type PersonRef } from './certRefs';

/**
 * Обмен реестра сертификатов через Excel.
 *
 * В книге три листа по языкам. Русский — основной: там даты, часы, курс и
 * преподаватель. На английском и казахском только те поля, которые нельзя
 * получить из русских: написание имени, компании и места. Названия курса и
 * преподавателя туда не выносятся намеренно — они берутся из справочника,
 * где уже лежат все три написания.
 *
 * Листы связаны колонкой «№». Она заполнена заранее, поэтому строка 5 на
 * английском листе — это тот же человек, что и строка 5 на русском.
 *
 * Курс и преподаватель выбираются из выпадающего списка: сверка идёт по
 * справочнику, и произвольное написание загрузить нельзя.
 */

export const SHEETS = {
  guide: 'Как заполнять',
  ru: 'Русский',
  en: 'English',
  kz: 'Қазақша',
  refs: 'Справочники',
} as const;

/** Сколько строк в шаблоне пронумеровано и снабжено списками. */
const TEMPLATE_ROWS = 300;

/* ------------------------------------------------------------------ *
 * Шаблон                                                              *
 * ------------------------------------------------------------------ */

interface Column {
  header: string;
  width: number;
  /** Формат даты — нужен, чтобы Excel не превращал ввод в текст. */
  date?: boolean;
}

const RU_COLUMNS: Column[] = [
  { header: '№', width: 6 },
  { header: 'Номер сертификата', width: 20 },
  { header: 'Имя *', width: 18 },
  { header: 'Фамилия *', width: 20 },
  { header: 'Компания', width: 26 },
  { header: 'Курс *', width: 52 },
  { header: 'Преподаватель', width: 26 },
  { header: 'Обучение с', width: 14, date: true },
  { header: 'Обучение по', width: 14, date: true },
  { header: 'Часов', width: 8 },
  { header: 'Место проведения', width: 26 },
  { header: 'Дата выдачи', width: 14, date: true },
];

function langColumns(suffix: string): Column[] {
  return [
    { header: '№', width: 6 },
    { header: `Имя ${suffix}`, width: 18 },
    { header: `Фамилия ${suffix}`, width: 20 },
    { header: `Компания ${suffix}`, width: 26 },
    { header: `Место проведения ${suffix}`, width: 26 },
  ];
}

const GUIDE = [
  ['Как заполнять таблицу'],
  [],
  ['1.', 'Лист «Русский» — основной. Строка без имени, фамилии или курса не загрузится.'],
  ['2.', 'Колонка «№» связывает листы. Английское и казахское написание того же человека'],
  ['', 'пишите на своём листе в строке с тем же номером.'],
  ['3.', 'Курс и преподаватель выбираются из выпадающего списка. Своё название вписать нельзя:'],
  ['', 'у курса в справочнике лежат все три написания и срок действия.'],
  ['4.', 'Если английский или казахский лист для человека не заполнен, сертификат будет'],
  ['', 'только на русском.'],
  ['5.', 'Номер сертификата можно оставить пустым — система выдаст свой. Если номер вписан,'],
  ['', 'он и попадёт в реестр.'],
  ['6.', '«Действует до» в таблице нет: срок берётся у курса и считается от даты выдачи.'],
  ['7.', 'Если дата выдачи пустая, берётся конец обучения, потом начало, потом сегодняшний день.'],
  [],
  ['Даты пишите в формате 31.12.2026, часы — целым числом.'],
];

/** Собирает пустой шаблон со списками курсов и преподавателей. */
export async function buildTemplate(refs: CertRefs): Promise<Uint8Array> {
  const book = new ExcelJS.Workbook();
  book.creator = 'Horizon';
  book.created = new Date();

  /* Инструкция */
  const guide = book.addWorksheet(SHEETS.guide);
  guide.getColumn(1).width = 5;
  guide.getColumn(2).width = 110;
  GUIDE.forEach((line) => guide.addRow(line));
  guide.getRow(1).font = { bold: true, size: 14 };

  const header = (sheet: ExcelJS.Worksheet, columns: Column[]) => {
    sheet.addRow(columns.map((c) => c.header));
    const row = sheet.getRow(1);
    row.font = { bold: true };
    row.height = 22;
    columns.forEach((c, i) => {
      const column = sheet.getColumn(i + 1);
      column.width = c.width;
      if (c.date) column.numFmt = 'dd.mm.yyyy';
    });
    // Шапка остаётся на месте при прокрутке — иначе на трёхстах строках
    // непонятно, какая колонка какая.
    sheet.views = [{ state: 'frozen', ySplit: 1 }];
  };

  const thin: Partial<ExcelJS.Borders> = {
    top: { style: 'hair', color: { argb: 'FFBBBBBB' } },
    left: { style: 'hair', color: { argb: 'FFBBBBBB' } },
    bottom: { style: 'hair', color: { argb: 'FFBBBBBB' } },
    right: { style: 'hair', color: { argb: 'FFBBBBBB' } },
  };

  const numbering = (sheet: ExcelJS.Worksheet, width: number) => {
    for (let i = 1; i <= TEMPLATE_ROWS; i++) {
      const row = sheet.getRow(i + 1);
      row.getCell(1).value = i;
      for (let c = 1; c <= width; c++) row.getCell(c).border = thin;
    }
  };

  /* Русский лист */
  const ru = book.addWorksheet(SHEETS.ru);
  header(ru, RU_COLUMNS);
  numbering(ru, RU_COLUMNS.length);

  // Выпадающие списки ставим на диапазон целиком: поячеечно ExcelJS
  // склеивает их в пересекающиеся куски, и Excel показывает список дважды.
  // Метод рабочий, но в поставляемых типах ExcelJS его нет — отсюда приведение.
  const validations = (ru as unknown as {
    dataValidations: { add(range: string, value: ExcelJS.DataValidation): void };
  }).dataValidations;

  const dropdown = (column: 'F' | 'G', source: 'A' | 'B', count: number, what: string) => {
    validations.add(`${column}2:${column}${TEMPLATE_ROWS + 1}`, {
      type: 'list',
      allowBlank: true,
      formulae: [`'${SHEETS.refs}'!$${source}$2:$${source}$${Math.max(count, 1) + 1}`],
      showErrorMessage: true,
      errorStyle: 'error',
      errorTitle: `${what} не из справочника`,
      error: `Выберите значение из выпадающего списка. Новый ${what.toLowerCase()} сначала заводится в Studio.`,
    });
  };
  dropdown('F', 'A', refs.courses.length, 'Курс');
  dropdown('G', 'B', refs.instructors.length, 'Преподаватель');

  /* Английский и казахский листы */
  const en = book.addWorksheet(SHEETS.en);
  header(en, langColumns('(англ)'));
  numbering(en, 5);

  const kz = book.addWorksheet(SHEETS.kz);
  header(kz, langColumns('(каз)'));
  numbering(kz, 5);

  /* Справочники в конце и скрытые: на них ссылаются выпадающие списки,
     а листать их человеку незачем. */
  const sheetRefs = book.addWorksheet(SHEETS.refs, { state: 'hidden' });
  sheetRefs.getColumn(1).width = 60;
  sheetRefs.getColumn(2).width = 30;
  sheetRefs.addRow(['Курсы', 'Преподаватели']);
  const refRows = Math.max(refs.courses.length, refs.instructors.length);
  for (let i = 0; i < refRows; i++) {
    sheetRefs.addRow([refs.courses[i]?.ru ?? null, refs.instructors[i]?.ru ?? null]);
  }

  const buffer = await book.xlsx.writeBuffer();
  return new Uint8Array(buffer as ArrayBuffer);
}

/* ------------------------------------------------------------------ *
 * Разбор заполненной книги                                            *
 * ------------------------------------------------------------------ */

export interface ImportError {
  sheet: string;
  /** Номер строки в Excel — тот, что человек видит слева. */
  row: number;
  column: string;
  message: string;
}

export interface ImportRow {
  code: string | null;
  first_name_ru: string;
  last_name_ru: string;
  company_ru: string | null;
  course_ru: string;
  instructor_ru: string | null;
  location_ru: string | null;

  has_en: boolean;
  first_name_en: string | null;
  last_name_en: string | null;
  company_en: string | null;
  course_en: string | null;
  instructor_en: string | null;
  location_en: string | null;

  has_kz: boolean;
  first_name_kz: string | null;
  last_name_kz: string | null;
  company_kz: string | null;
  course_kz: string | null;
  instructor_kz: string | null;
  location_kz: string | null;

  training_from: string | null;
  training_to: string | null;
  hours: number | null;
  issued_at: string;
  perpetual: boolean;
  valid_until: string | null;

  course_ref: string;
  instructor_ref: string | null;
}

export interface ParseResult {
  rows: ImportRow[];
  errors: ImportError[];
  /** Явно вписанные номера и строки, где они стоят: занятость проверяет
   *  вызывающий, одним запросом на весь файл. */
  codeRows: Map<string, number>;
}

/** Текст ячейки: ExcelJS отдаёт формулы и форматированный текст объектами. */
function text(value: ExcelJS.CellValue): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  if (value instanceof Date) return value.toISOString().slice(0, 10);

  const rich = value as { richText?: { text: string }[]; result?: unknown; text?: string };
  if (Array.isArray(rich.richText)) return rich.richText.map((p) => p.text).join('').trim();
  if (rich.result !== undefined) return text(rich.result as ExcelJS.CellValue);
  if (typeof rich.text === 'string') return rich.text.trim();
  return '';
}

/**
 * Дата из ячейки. Excel отдаёт настоящую дату объектом, но в выгрузках из
 * других систем она часто оказывается текстом — принимаем оба вида,
 * а также ISO, потому что так выглядят даты в старом архиве.
 */
function readDate(value: ExcelJS.CellValue): string | null | 'bad' {
  if (value === null || value === undefined || value === '') return null;

  if (value instanceof Date) {
    const y = value.getUTCFullYear();
    const m = String(value.getUTCMonth() + 1).padStart(2, '0');
    const d = String(value.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const raw = text(value);
  if (!raw) return null;

  const dotted = /^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/.exec(raw);
  if (dotted) {
    return `${dotted[3]}-${dotted[2].padStart(2, '0')}-${dotted[1].padStart(2, '0')}`;
  }

  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;

  return 'bad';
}

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Строка с одними пробелами считается пустой и молча пропускается. */
function isBlank(cells: string[]): boolean {
  return cells.every((c) => !c);
}

interface LangRow {
  /** Строка в Excel — нужна, чтобы ошибка указывала на реальное место. */
  row: number;
  first: string;
  last: string;
  company: string;
  location: string;
}

/** Собирает английский или казахский лист в карту по колонке «№». */
function readLangSheet(
  sheet: ExcelJS.Worksheet | undefined,
  name: string,
  errors: ImportError[],
): Map<number, LangRow> {
  const out = new Map<number, LangRow>();
  if (!sheet) return out;

  sheet.eachRow((row, index) => {
    if (index === 1) return;

    const values = [2, 3, 4, 5].map((c) => text(row.getCell(c).value));
    if (isBlank(values)) return;

    const no = Number(text(row.getCell(1).value));
    if (!Number.isInteger(no) || no < 1) {
      errors.push({ sheet: name, row: index, column: '№', message: 'не заполнено или не число' });
      return;
    }
    if (out.has(no)) {
      errors.push({ sheet: name, row: index, column: '№', message: `номер ${no} встречается второй раз` });
      return;
    }

    out.set(no, { row: index, first: values[0], last: values[1], company: values[2], location: values[3] });
  });

  return out;
}

/**
 * Разбирает книгу и сверяет её со справочниками. Ошибки собираются все
 * сразу: разбирать таблицу на три тысячи строк по одной ошибке за раз
 * никто не станет.
 */
export async function parseWorkbook(file: ArrayBuffer, refs: CertRefs): Promise<ParseResult> {
  const book = new ExcelJS.Workbook();
  await book.xlsx.load(file);

  const errors: ImportError[] = [];
  const rows: ImportRow[] = [];
  const codeRows = new Map<string, number>();

  const sheetRu = book.getWorksheet(SHEETS.ru) ?? book.worksheets[0];
  if (!sheetRu) {
    errors.push({ sheet: SHEETS.ru, row: 0, column: '', message: 'лист не найден' });
    return { rows, errors, codeRows };
  }

  const en = readLangSheet(book.getWorksheet(SHEETS.en), SHEETS.en, errors);
  const kz = readLangSheet(book.getWorksheet(SHEETS.kz), SHEETS.kz, errors);

  const courseIndex = buildIndex(refs.courses);
  const instructorIndex = buildIndex(refs.instructors);
  const cityIndex = buildIndex(refs.cities);

  const seenNo = new Set<number>();
  const seenCode = new Set<string>();
  const usedNo = new Set<number>();

  sheetRu.eachRow((row, index) => {
    if (index === 1) return;

    const cell = (c: number) => text(row.getCell(c).value);
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(cell);
    if (isBlank(values)) return;

    const before = errors.length;
    const fail = (column: string, message: string) =>
      errors.push({ sheet: SHEETS.ru, row: index, column, message });

    /* Номер строки, по которому подтягиваются другие языки */
    const no = Number(cell(1));
    if (!Number.isInteger(no) || no < 1) {
      fail('№', 'не заполнено или не число');
      return;
    }
    if (seenNo.has(no)) {
      fail('№', `номер ${no} встречается второй раз`);
      return;
    }
    seenNo.add(no);

    /* Обязательные поля */
    const firstName = values[1];
    const lastName = values[2];
    if (!firstName) fail('Имя', 'не заполнено');
    if (!lastName) fail('Фамилия', 'не заполнено');

    /* Курс — только из справочника */
    const courseName = values[4];
    let course: CourseRef | undefined;
    if (!courseName) {
      fail('Курс', 'не заполнено');
    } else {
      course = courseIndex.get(refKey(courseName));
      if (!course) {
        const hint = closestName(courseName, refs.courses);
        fail('Курс', hint
          ? `«${courseName}» нет в справочнике, возможно имелось в виду «${hint}»`
          : `«${courseName}» нет в справочнике — выберите значение из выпадающего списка`);
      } else if (!course.perpetual && !course.validityYears) {
        fail('Курс', `у курса «${course.ru}» в Studio не задан срок действия`);
      }
    }

    /* Преподаватель — необязателен, но если указан, тоже из справочника */
    const instructorName = values[5];
    let instructor: PersonRef | undefined;
    if (instructorName) {
      instructor = instructorIndex.get(refKey(instructorName));
      if (!instructor) {
        const hint = closestName(instructorName, refs.instructors);
        fail('Преподаватель', hint
          ? `«${instructorName}» нет в справочнике, возможно имелось в виду «${hint}»`
          : `«${instructorName}» нет в справочнике — выберите значение из выпадающего списка`);
      }
    }

    /* Даты */
    const from = readDate(row.getCell(8).value);
    const to = readDate(row.getCell(9).value);
    const issued = readDate(row.getCell(12).value);
    if (from === 'bad') fail('Обучение с', 'дату не удалось прочитать, нужен вид 31.12.2026');
    if (to === 'bad') fail('Обучение по', 'дату не удалось прочитать, нужен вид 31.12.2026');
    if (issued === 'bad') fail('Дата выдачи', 'дату не удалось прочитать, нужен вид 31.12.2026');
    if (from !== 'bad' && to !== 'bad' && from && to && to < from) {
      fail('Обучение по', 'конец обучения раньше начала');
    }

    /* Часы */
    const hoursRaw = values[8];
    let hours: number | null = null;
    if (hoursRaw) {
      const parsed = Number(hoursRaw.replace(',', '.'));
      if (!Number.isFinite(parsed) || parsed <= 0 || !Number.isInteger(parsed)) {
        fail('Часов', 'нужно целое число больше нуля');
      } else {
        hours = parsed;
      }
    }

    /* Номер сертификата: пустой — выдадим свой */
    let code: string | null = null;
    const codeRaw = values[0];
    if (codeRaw) {
      code = normalizeCode(codeRaw);
      if (seenCode.has(code)) fail('Номер сертификата', `${code} встречается в таблице второй раз`);
      else codeRows.set(code, index);
      seenCode.add(code);
    }

    // Строка с любым замечанием не загружается целиком: дальше разбор
    // опирается на то, что курс найден и обязательные поля на месте.
    if (errors.length > before || !course) return;

    /* Другие языки: строка есть и в ней заполнено имя — значит версия нужна */
    const enRow = en.get(no);
    const kzRow = kz.get(no);
    usedNo.add(no);

    const hasEn = Boolean(enRow && (enRow.first || enRow.last));
    const hasKz = Boolean(kzRow && (kzRow.first || kzRow.last));

    const locationRu = values[9] || null;
    const city = locationRu ? cityIndex.get(refKey(locationRu)) : undefined;

    const issuedAt = (issued as string | null)
      || (to as string | null)
      || (from as string | null)
      || today();

    rows.push({
      code,
      first_name_ru: firstName,
      last_name_ru: lastName,
      company_ru: values[3] || null,
      course_ru: course.ru,
      instructor_ru: instructor?.ru ?? null,
      location_ru: locationRu,

      has_en: hasEn,
      first_name_en: hasEn ? enRow!.first || null : null,
      last_name_en: hasEn ? enRow!.last || null : null,
      company_en: hasEn ? enRow!.company || null : null,
      course_en: hasEn ? course.en || course.ru : null,
      instructor_en: hasEn ? instructor?.en || instructor?.ru || null : null,
      location_en: hasEn ? enRow!.location || city?.en || null : null,

      has_kz: hasKz,
      first_name_kz: hasKz ? kzRow!.first || null : null,
      last_name_kz: hasKz ? kzRow!.last || null : null,
      company_kz: hasKz ? kzRow!.company || null : null,
      course_kz: hasKz ? course.kz || course.ru : null,
      instructor_kz: hasKz ? instructor?.kz || instructor?.ru || null : null,
      location_kz: hasKz ? kzRow!.location || city?.kz || null : null,

      training_from: (from as string | null) ?? null,
      training_to: (to as string | null) ?? null,
      hours,
      issued_at: issuedAt,
      perpetual: course.perpetual,
      valid_until: course.perpetual ? null : addYears(issuedAt, course.validityYears ?? 0),

      course_ref: course.id,
      instructor_ref: instructor?.id ?? null,
    });
  });

  /* Строки на других языках без пары на русском листе */
  for (const [name, map] of [[SHEETS.en, en], [SHEETS.kz, kz]] as const) {
    for (const [no, lang] of map) {
      if (!usedNo.has(no) && !seenNo.has(no)) {
        errors.push({ sheet: name, row: lang.row, column: '№', message: `на русском листе нет строки № ${no}` });
      }
    }
  }

  return { rows, errors, codeRows };
}

/** Тексты о прохождении добавляются уже при записи — они одинаковы для всех. */
export function withCompleted(row: ImportRow, completed: { ru: string; en: string; kz: string }) {
  return {
    ...row,
    completed_ru: completed.ru,
    completed_en: row.has_en ? completed.en : null,
    completed_kz: row.has_kz ? completed.kz : null,
  };
}
