import ExcelJS from 'exceljs';
import { addYears, normalizeCode } from './certificates';
import {
  buildIndex, closestName, defaultCompletion, placeLabel, refKey,
  type CertRefs, type CityRef, type CompletionRef, type CountryRef,
  type CourseRef, type PersonRef,
} from './certRefs';

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
 * Курс, преподаватель и текст о прохождении выбираются из выпадающего
 * списка: сверка идёт по справочнику, и произвольное написание загрузить
 * нельзя — иначе неоткуда взять остальные два языка.
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
  { header: 'Имя *', width: 18 },
  { header: 'Фамилия *', width: 20 },
  { header: 'Компания', width: 26 },
  { header: 'Курс *', width: 52 },
  { header: 'Преподаватель', width: 26 },
  { header: 'Обучение с', width: 14, date: true },
  { header: 'Обучение по', width: 14, date: true },
  { header: 'Страна', width: 18 },
  { header: 'Место проведения', width: 24 },
  { header: 'Дата выдачи', width: 14, date: true },
  { header: 'Текст о прохождении', width: 40 },
  // Прежний номер идёт последним: он необязателен, свой номер система
  // выдаёт сама, и на бланк попадает именно он.
  { header: 'Прежний номер', width: 20 },
];

/**
 * Номер колонки на русском листе по её заголовку, как в Excel — с единицы.
 *
 * Номера и буквы колонок нигде не пишутся руками: на тринадцати колонках
 * промахнуться на одну слишком легко, и выпадающий список для текста о
 * прохождении однажды уже сел на «Дату выдачи».
 */
const RU_COL: Record<string, number> = Object.fromEntries(
  RU_COLUMNS.map((column, index) => [column.header, index + 1]),
);

function columnLetter(header: string): string {
  const index = RU_COL[header];
  if (!index) throw new Error(`Нет колонки «${header}» в шаблоне`);
  return String.fromCharCode(64 + index); // колонок тринадцать, до Z хватает
}

function langColumns(suffix: string): Column[] {
  return [
    { header: '№', width: 6 },
    { header: `Имя ${suffix}`, width: 18 },
    { header: `Фамилия ${suffix}`, width: 20 },
  ];
}

const GUIDE = [
  ['Как заполнять таблицу'],
  [],
  ['1.', 'Лист «Русский» — основной. Строка без имени, фамилии или курса не загрузится.'],
  ['2.', 'Колонка «№» связывает листы. Английское и казахское написание того же человека'],
  ['', 'пишите на своём листе в строке с тем же номером.'],
  ['3.', 'Курс, преподаватель, страна, место и текст о прохождении выбираются из выпадающих'],
  ['', 'списков. Своё значение вписать нельзя: в справочнике лежат все три написания.'],
  ['', 'У курса там же заданы срок действия и продолжительность в часах.'],
  ['4.', 'На английском и казахском листах только имя и фамилия. Компания берётся из'],
  ['', 'русского написания, место — из справочника. Лист не заполнен — сертификат'],
  ['', 'будет только на русском.'],
  ['5.', 'Свой номер система выдаёт каждому сертификату сама, его писать не нужно.'],
  ['', 'В последнюю колонку впишите прежний номер со старого бланка, если он есть:'],
  ['', 'на печать он не идёт, но сертификат будет находиться и по нему.'],
  ['6.', '«Действует до» и «Часов» в таблице нет: и то и другое задано у курса.'],
  ['7.', 'Если дата выдачи пустая, берётся конец обучения, потом начало, потом сегодняшний день.'],
  ['8.', 'Текст о прохождении тоже из списка. Оставите пустым — подставится отмеченный'],
  ['', 'в Studio как «по умолчанию».'],
  ['9.', 'Место проведения можно не заполнять — тогда на бланке этого столбца не будет.'],
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

  const dropdown = (header: string, source: 'A' | 'B' | 'C' | 'D' | 'E', count: number, what: string) => {
    const column = columnLetter(header);
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
  dropdown('Курс *', 'A', refs.courses.length, 'Курс');
  dropdown('Преподаватель', 'B', refs.instructors.length, 'Преподаватель');
  dropdown('Текст о прохождении', 'C', refs.completions.length, 'Текст о прохождении');
  dropdown('Страна', 'D', refs.countries.length, 'Страна');
  dropdown('Место проведения', 'E', refs.cities.length, 'Место проведения');

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
  sheetRefs.getColumn(3).width = 50;
  sheetRefs.getColumn(4).width = 24;
  sheetRefs.getColumn(5).width = 26;
  sheetRefs.addRow(['Курсы', 'Преподаватели', 'Тексты о прохождении', 'Страны', 'Места']);
  const refRows = Math.max(
    refs.courses.length, refs.instructors.length, refs.completions.length,
    refs.countries.length, refs.cities.length,
  );
  for (let i = 0; i < refRows; i++) {
    sheetRefs.addRow([
      refs.courses[i]?.ru ?? null,
      refs.instructors[i]?.ru ?? null,
      refs.completions[i]?.ru ?? null,
      refs.countries[i]?.ru ?? null,
      refs.cities[i]?.ru ?? null,
    ]);
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
  /** Прежний номер со старого бланка; свой выдаёт система. */
  legacy_code: string | null;
  first_name_ru: string;
  last_name_ru: string;
  company_ru: string | null;
  course_ru: string;
  instructor_ru: string | null;
  location_ru: string | null;
  completed_ru: string;

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
  issued_at: string;
  perpetual: boolean;
  valid_until: string | null;

  course_ref: string;
  instructor_ref: string | null;
  completed_ref: string;
  location_ref: string | null;
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
 *
 * Возвращает 'american', если запись явно в порядке «месяц, день»: такую
 * строку нужно показать человеку, а не угадывать за него.
 */
function readDate(value: ExcelJS.CellValue): string | null | 'bad' | 'american' {
  if (value === null || value === undefined || value === '') return null;

  if (value instanceof Date) {
    const y = value.getUTCFullYear();
    const m = String(value.getUTCMonth() + 1).padStart(2, '0');
    const d = String(value.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const raw = text(value);
  if (!raw) return null;

  // Порядок «день, месяц, год» — так написано в шапке шаблона. Если на месте
  // месяца стоит число больше двенадцати, это американская запись 03/15/2021:
  // молча прочитать её нельзя, потому что 03/09/2022 при этом разошлось бы
  // на четыре месяца и никто бы не заметил.
  const parts = /^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/.exec(raw);
  if (parts) {
    const day = Number(parts[1]);
    const month = Number(parts[2]);
    if (month > 12) return 'american';
    if (day < 1 || day > 31 || month < 1) return 'bad';
    return `${parts[3]}-${parts[2].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
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

    const values = [2, 3].map((c) => text(row.getCell(c).value));
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

    out.set(no, { row: index, first: values[0], last: values[1] });
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
  const countryIndex = buildIndex(refs.countries);
  const completionIndex = buildIndex(refs.completions);
  const fallbackCompletion = defaultCompletion(refs);

  const seenNo = new Set<number>();
  const seenCode = new Set<string>();
  const usedNo = new Set<number>();

  sheetRu.eachRow((row, index) => {
    if (index === 1) return;

    // Колонки берём по заголовку, а не по номеру: см. RU_COL
    const cell = (header: string) => text(row.getCell(RU_COL[header]).value);
    const filled = RU_COLUMNS.slice(1).map((c) => cell(c.header));
    if (isBlank(filled)) return;

    const before = errors.length;
    const fail = (column: string, message: string) =>
      errors.push({ sheet: SHEETS.ru, row: index, column, message });

    /* Номер строки, по которому подтягиваются другие языки */
    const no = Number(cell('№'));
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
    const firstName = cell('Имя *');
    const lastName = cell('Фамилия *');
    if (!firstName) fail('Имя', 'не заполнено');
    if (!lastName) fail('Фамилия', 'не заполнено');

    /* Курс — только из справочника */
    const courseName = cell('Курс *');
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
    const instructorName = cell('Преподаватель');
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

    /* Текст о прохождении — тоже только из справочника */
    const completionName = cell('Текст о прохождении');
    let completion: CompletionRef | undefined | null;
    if (completionName) {
      completion = completionIndex.get(refKey(completionName));
      if (!completion) {
        const hint = closestName(completionName, refs.completions);
        fail('Текст о прохождении', hint
          ? `«${completionName}» нет в справочнике, возможно имелось в виду «${hint}»`
          : `«${completionName}» нет в справочнике — выберите значение из выпадающего списка`);
      }
    } else {
      completion = fallbackCompletion;
      if (!completion) fail('Текст о прохождении', 'в Studio не заведено ни одного текста о прохождении');
    }

    /* Даты */
    const dateCell = (header: string) => readDate(row.getCell(RU_COL[header]).value);
    const from = dateCell('Обучение с');
    const to = dateCell('Обучение по');
    const issued = dateCell('Дата выдачи');
    const dateProblem = (column: string, result: typeof from) => {
      if (result === 'bad') fail(column, 'дату не удалось прочитать, нужен вид 31.12.2026');
      if (result === 'american') {
        fail(column, 'дата записана как «месяц/день/год» — переведите её в вид 31.12.2026');
      }
    };
    dateProblem('Обучение с', from);
    dateProblem('Обучение по', to);
    dateProblem('Дата выдачи', issued);

    const usable = (v: typeof from) => (v === 'bad' || v === 'american' ? null : v);
    if (usable(from) && usable(to) && usable(to)! < usable(from)!) {
      fail('Обучение по', 'конец обучения раньше начала');
    }

    /* Место: страна и город, оба из справочника */
    const countryName = cell('Страна');
    const cityName = cell('Место проведения');
    let city: CityRef | undefined;
    let country: CountryRef | undefined;

    if (countryName) {
      country = countryIndex.get(refKey(countryName));
      if (!country) fail('Страна', `«${countryName}» нет в справочнике — выберите значение из списка`);
    }
    if (cityName) {
      city = cityIndex.get(refKey(cityName));
      if (!city) {
        const hint = closestName(cityName, refs.cities);
        fail('Место проведения', hint
          ? `«${cityName}» нет в справочнике, возможно имелось в виду «${hint}»`
          : `«${cityName}» нет в справочнике — выберите значение из списка`);
      } else if (!city.online && country && city.countryId !== country.id) {
        fail('Место проведения', `«${city.ru}» не относится к стране «${country.ru}»`);
      } else if (!city.online && !country) {
        fail('Страна', 'не заполнено — без страны место на бланк не собрать');
      }
    }

    /* Прежний номер со старого бланка; свой выдаёт система */
    let legacyCode: string | null = null;
    const codeRaw = cell('Прежний номер');
    if (codeRaw) {
      legacyCode = normalizeCode(codeRaw);
      if (seenCode.has(legacyCode)) fail('Прежний номер', `${legacyCode} встречается в таблице второй раз`);
      else codeRows.set(legacyCode, index);
      seenCode.add(legacyCode);
    }

    // Строка с любым замечанием не загружается целиком: дальше разбор
    // опирается на то, что курс с текстом найдены и поля на месте.
    if (errors.length > before || !course || !completion) return;

    /* Другие языки: строка есть и в ней заполнено имя — значит версия нужна */
    const enRow = en.get(no);
    const kzRow = kz.get(no);
    usedNo.add(no);

    const hasEn = Boolean(enRow && (enRow.first || enRow.last));
    const hasKz = Boolean(kzRow && (kzRow.first || kzRow.last));

    // Место собирается из справочника, чтобы на трёх языках совпало
    const place = (locale: 'ru' | 'en' | 'kz') =>
      city ? placeLabel(city, city.online ? undefined : country, locale) : null;

    // Непрочитанные даты сюда не доходят: строка с ними уже отсеяна выше
    const issuedAt = usable(issued) || usable(to) || usable(from) || today();

    rows.push({
      legacy_code: legacyCode,
      first_name_ru: firstName,
      last_name_ru: lastName,
      // Компания одна на все языки: заводить три написания незачем
      company_ru: cell('Компания') || null,
      course_ru: course.ru,
      instructor_ru: instructor?.ru ?? null,
      location_ru: place('ru'),
      completed_ru: completion.ru,

      has_en: hasEn,
      first_name_en: hasEn ? enRow!.first || null : null,
      last_name_en: hasEn ? enRow!.last || null : null,
      company_en: null,
      course_en: hasEn ? course.en || course.ru : null,
      instructor_en: hasEn ? instructor?.en || instructor?.ru || null : null,
      location_en: hasEn ? place('en') : null,
      completed_en: hasEn ? completion.en || completion.ru : null,

      has_kz: hasKz,
      first_name_kz: hasKz ? kzRow!.first || null : null,
      last_name_kz: hasKz ? kzRow!.last || null : null,
      company_kz: null,
      course_kz: hasKz ? course.kz || course.ru : null,
      instructor_kz: hasKz ? instructor?.kz || instructor?.ru || null : null,
      location_kz: hasKz ? place('kz') : null,
      completed_kz: hasKz ? completion.kz || completion.ru : null,

      training_from: usable(from),
      training_to: usable(to),
      // Часы — свойство курса, в таблице их нет
      hours: course.hours,
      issued_at: issuedAt,
      perpetual: course.perpetual,
      valid_until: course.perpetual ? null : addYears(issuedAt, course.validityYears ?? 0),

      course_ref: course.id,
      instructor_ref: instructor?.id ?? null,
      completed_ref: completion.id,
      location_ref: city?.id ?? null,
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

