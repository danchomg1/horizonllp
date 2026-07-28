export interface Country {
  iso: string;   // ISO 3166-1 alpha-2, он же имя файла флага
  dial: string;  // телефонный код без плюса
  ru: string;
  en: string;
}

// Страны, которые чаще всего выбирают клиенты - показываем их первыми в списке
export const PRIORITY_ISO = ['kz', 'ru', 'uz', 'kg', 'tj', 'tm', 'az', 'ge', 'am', 'by', 'ua'];

// Для кодов, которые делят несколько стран (+7, +1), задаём страну по умолчанию
export const DIAL_DEFAULT: Record<string, string> = {
  '7': 'kz',
  '1': 'us',
  '44': 'gb',
  '39': 'it',
  '61': 'au',
  '212': 'ma',
  '262': 're',
  '590': 'gp',
  '596': 'mq',
  '599': 'cw',
};

export const COUNTRIES: Country[] = [
  { iso: 'kz', dial: '7',   ru: 'Казахстан',            en: 'Kazakhstan' },
  { iso: 'ru', dial: '7',   ru: 'Россия',               en: 'Russia' },
  { iso: 'uz', dial: '998', ru: 'Узбекистан',           en: 'Uzbekistan' },
  { iso: 'kg', dial: '996', ru: 'Кыргызстан',           en: 'Kyrgyzstan' },
  { iso: 'tj', dial: '992', ru: 'Таджикистан',          en: 'Tajikistan' },
  { iso: 'tm', dial: '993', ru: 'Туркменистан',         en: 'Turkmenistan' },
  { iso: 'az', dial: '994', ru: 'Азербайджан',          en: 'Azerbaijan' },
  { iso: 'ge', dial: '995', ru: 'Грузия',               en: 'Georgia' },
  { iso: 'am', dial: '374', ru: 'Армения',              en: 'Armenia' },
  { iso: 'by', dial: '375', ru: 'Беларусь',             en: 'Belarus' },
  { iso: 'ua', dial: '380', ru: 'Украина',              en: 'Ukraine' },
  { iso: 'md', dial: '373', ru: 'Молдова',              en: 'Moldova' },
  { iso: 'mn', dial: '976', ru: 'Монголия',             en: 'Mongolia' },

  { iso: 'tr', dial: '90',  ru: 'Турция',               en: 'Turkey' },
  { iso: 'cn', dial: '86',  ru: 'Китай',                en: 'China' },
  { iso: 'in', dial: '91',  ru: 'Индия',                en: 'India' },
  { iso: 'pk', dial: '92',  ru: 'Пакистан',             en: 'Pakistan' },
  { iso: 'af', dial: '93',  ru: 'Афганистан',           en: 'Afghanistan' },
  { iso: 'ir', dial: '98',  ru: 'Иран',                 en: 'Iran' },
  { iso: 'iq', dial: '964', ru: 'Ирак',                 en: 'Iraq' },
  { iso: 'il', dial: '972', ru: 'Израиль',              en: 'Israel' },
  { iso: 'ae', dial: '971', ru: 'ОАЭ',                  en: 'United Arab Emirates' },
  { iso: 'sa', dial: '966', ru: 'Саудовская Аравия',    en: 'Saudi Arabia' },
  { iso: 'qa', dial: '974', ru: 'Катар',                en: 'Qatar' },
  { iso: 'kw', dial: '965', ru: 'Кувейт',               en: 'Kuwait' },
  { iso: 'om', dial: '968', ru: 'Оман',                 en: 'Oman' },
  { iso: 'bh', dial: '973', ru: 'Бахрейн',              en: 'Bahrain' },
  { iso: 'ye', dial: '967', ru: 'Йемен',                en: 'Yemen' },
  { iso: 'jo', dial: '962', ru: 'Иордания',             en: 'Jordan' },
  { iso: 'lb', dial: '961', ru: 'Ливан',                en: 'Lebanon' },
  { iso: 'sy', dial: '963', ru: 'Сирия',                en: 'Syria' },

  { iso: 'gb', dial: '44',  ru: 'Великобритания',       en: 'United Kingdom' },
  { iso: 'us', dial: '1',   ru: 'США',                  en: 'United States' },
  { iso: 'ca', dial: '1',   ru: 'Канада',               en: 'Canada' },
  { iso: 'de', dial: '49',  ru: 'Германия',             en: 'Germany' },
  { iso: 'fr', dial: '33',  ru: 'Франция',              en: 'France' },
  { iso: 'it', dial: '39',  ru: 'Италия',               en: 'Italy' },
  { iso: 'es', dial: '34',  ru: 'Испания',              en: 'Spain' },
  { iso: 'pt', dial: '351', ru: 'Португалия',           en: 'Portugal' },
  { iso: 'nl', dial: '31',  ru: 'Нидерланды',           en: 'Netherlands' },
  { iso: 'be', dial: '32',  ru: 'Бельгия',              en: 'Belgium' },
  { iso: 'ch', dial: '41',  ru: 'Швейцария',            en: 'Switzerland' },
  { iso: 'at', dial: '43',  ru: 'Австрия',              en: 'Austria' },
  { iso: 'se', dial: '46',  ru: 'Швеция',               en: 'Sweden' },
  { iso: 'no', dial: '47',  ru: 'Норвегия',             en: 'Norway' },
  { iso: 'dk', dial: '45',  ru: 'Дания',                en: 'Denmark' },
  { iso: 'fi', dial: '358', ru: 'Финляндия',            en: 'Finland' },
  { iso: 'is', dial: '354', ru: 'Исландия',             en: 'Iceland' },
  { iso: 'ie', dial: '353', ru: 'Ирландия',             en: 'Ireland' },
  { iso: 'pl', dial: '48',  ru: 'Польша',               en: 'Poland' },
  { iso: 'cz', dial: '420', ru: 'Чехия',                en: 'Czechia' },
  { iso: 'sk', dial: '421', ru: 'Словакия',             en: 'Slovakia' },
  { iso: 'hu', dial: '36',  ru: 'Венгрия',              en: 'Hungary' },
  { iso: 'ro', dial: '40',  ru: 'Румыния',              en: 'Romania' },
  { iso: 'bg', dial: '359', ru: 'Болгария',             en: 'Bulgaria' },
  { iso: 'gr', dial: '30',  ru: 'Греция',               en: 'Greece' },
  { iso: 'hr', dial: '385', ru: 'Хорватия',             en: 'Croatia' },
  { iso: 'si', dial: '386', ru: 'Словения',             en: 'Slovenia' },
  { iso: 'rs', dial: '381', ru: 'Сербия',               en: 'Serbia' },
  { iso: 'ba', dial: '387', ru: 'Босния и Герцеговина', en: 'Bosnia and Herzegovina' },
  { iso: 'mk', dial: '389', ru: 'Северная Македония',   en: 'North Macedonia' },
  { iso: 'al', dial: '355', ru: 'Албания',              en: 'Albania' },
  { iso: 'me', dial: '382', ru: 'Черногория',           en: 'Montenegro' },
  { iso: 'lt', dial: '370', ru: 'Литва',                en: 'Lithuania' },
  { iso: 'lv', dial: '371', ru: 'Латвия',               en: 'Latvia' },
  { iso: 'ee', dial: '372', ru: 'Эстония',              en: 'Estonia' },
  { iso: 'cy', dial: '357', ru: 'Кипр',                 en: 'Cyprus' },
  { iso: 'mt', dial: '356', ru: 'Мальта',               en: 'Malta' },
  { iso: 'lu', dial: '352', ru: 'Люксембург',           en: 'Luxembourg' },

  { iso: 'jp', dial: '81',  ru: 'Япония',               en: 'Japan' },
  { iso: 'kr', dial: '82',  ru: 'Южная Корея',          en: 'South Korea' },
  { iso: 'kp', dial: '850', ru: 'Северная Корея',       en: 'North Korea' },
  { iso: 'hk', dial: '852', ru: 'Гонконг',              en: 'Hong Kong' },
  { iso: 'tw', dial: '886', ru: 'Тайвань',              en: 'Taiwan' },
  { iso: 'sg', dial: '65',  ru: 'Сингапур',             en: 'Singapore' },
  { iso: 'my', dial: '60',  ru: 'Малайзия',             en: 'Malaysia' },
  { iso: 'id', dial: '62',  ru: 'Индонезия',            en: 'Indonesia' },
  { iso: 'th', dial: '66',  ru: 'Таиланд',              en: 'Thailand' },
  { iso: 'vn', dial: '84',  ru: 'Вьетнам',              en: 'Vietnam' },
  { iso: 'ph', dial: '63',  ru: 'Филиппины',            en: 'Philippines' },
  { iso: 'bd', dial: '880', ru: 'Бангладеш',            en: 'Bangladesh' },
  { iso: 'lk', dial: '94',  ru: 'Шри-Ланка',            en: 'Sri Lanka' },
  { iso: 'np', dial: '977', ru: 'Непал',                en: 'Nepal' },
  { iso: 'mm', dial: '95',  ru: 'Мьянма',               en: 'Myanmar' },
  { iso: 'kh', dial: '855', ru: 'Камбоджа',             en: 'Cambodia' },
  { iso: 'la', dial: '856', ru: 'Лаос',                 en: 'Laos' },
  { iso: 'bn', dial: '673', ru: 'Бруней',               en: 'Brunei' },
  { iso: 'mv', dial: '960', ru: 'Мальдивы',             en: 'Maldives' },

  { iso: 'au', dial: '61',  ru: 'Австралия',            en: 'Australia' },
  { iso: 'nz', dial: '64',  ru: 'Новая Зеландия',       en: 'New Zealand' },

  { iso: 'br', dial: '55',  ru: 'Бразилия',             en: 'Brazil' },
  { iso: 'ar', dial: '54',  ru: 'Аргентина',            en: 'Argentina' },
  { iso: 'mx', dial: '52',  ru: 'Мексика',              en: 'Mexico' },
  { iso: 'cl', dial: '56',  ru: 'Чили',                 en: 'Chile' },
  { iso: 'co', dial: '57',  ru: 'Колумбия',             en: 'Colombia' },
  { iso: 'pe', dial: '51',  ru: 'Перу',                 en: 'Peru' },
  { iso: 've', dial: '58',  ru: 'Венесуэла',            en: 'Venezuela' },
  { iso: 'ec', dial: '593', ru: 'Эквадор',              en: 'Ecuador' },
  { iso: 'bo', dial: '591', ru: 'Боливия',              en: 'Bolivia' },
  { iso: 'py', dial: '595', ru: 'Парагвай',             en: 'Paraguay' },
  { iso: 'uy', dial: '598', ru: 'Уругвай',              en: 'Uruguay' },
  { iso: 'cu', dial: '53',  ru: 'Куба',                 en: 'Cuba' },
  { iso: 'cr', dial: '506', ru: 'Коста-Рика',           en: 'Costa Rica' },
  { iso: 'pa', dial: '507', ru: 'Панама',               en: 'Panama' },

  { iso: 'za', dial: '27',  ru: 'ЮАР',                  en: 'South Africa' },
  { iso: 'eg', dial: '20',  ru: 'Египет',               en: 'Egypt' },
  { iso: 'ma', dial: '212', ru: 'Марокко',              en: 'Morocco' },
  { iso: 'dz', dial: '213', ru: 'Алжир',                en: 'Algeria' },
  { iso: 'tn', dial: '216', ru: 'Тунис',                en: 'Tunisia' },
  { iso: 'ly', dial: '218', ru: 'Ливия',                en: 'Libya' },
  { iso: 'sd', dial: '249', ru: 'Судан',                en: 'Sudan' },
  { iso: 'ng', dial: '234', ru: 'Нигерия',              en: 'Nigeria' },
  { iso: 'ke', dial: '254', ru: 'Кения',                en: 'Kenya' },
  { iso: 'et', dial: '251', ru: 'Эфиопия',              en: 'Ethiopia' },
  { iso: 'tz', dial: '255', ru: 'Танзания',             en: 'Tanzania' },
  { iso: 'ug', dial: '256', ru: 'Уганда',               en: 'Uganda' },
  { iso: 'gh', dial: '233', ru: 'Гана',                 en: 'Ghana' },
  { iso: 'ci', dial: '225', ru: 'Кот-д’Ивуар',          en: 'Côte d’Ivoire' },
  { iso: 'sn', dial: '221', ru: 'Сенегал',              en: 'Senegal' },
  { iso: 'ao', dial: '244', ru: 'Ангола',               en: 'Angola' },
  { iso: 'mz', dial: '258', ru: 'Мозамбик',             en: 'Mozambique' },
  { iso: 'zm', dial: '260', ru: 'Замбия',               en: 'Zambia' },
  { iso: 'zw', dial: '263', ru: 'Зимбабве',             en: 'Zimbabwe' },
  { iso: 'na', dial: '264', ru: 'Намибия',              en: 'Namibia' },
  { iso: 'bw', dial: '267', ru: 'Ботсвана',             en: 'Botswana' },
  { iso: 'cm', dial: '237', ru: 'Камерун',              en: 'Cameroon' },
  { iso: 'cd', dial: '243', ru: 'ДР Конго',             en: 'DR Congo' },
];

/** Ищет страну по телефонному коду. Для общих кодов (+7, +1) отдаёт страну из DIAL_DEFAULT. */
export function findByDial(dial: string): Country | undefined {
  if (!dial) return undefined;
  const preferred = DIAL_DEFAULT[dial];
  if (preferred) {
    const c = COUNTRIES.find((x) => x.iso === preferred);
    if (c) return c;
  }
  return COUNTRIES.find((x) => x.dial === dial);
}

/** Подбирает страну по максимально длинному совпадению кода: "9" -> нет, "99" -> нет, "998" -> Узбекистан. */
export function matchDialPrefix(digits: string): Country | undefined {
  for (let len = Math.min(4, digits.length); len >= 1; len--) {
    const found = findByDial(digits.substring(0, len));
    if (found) return found;
  }
  return undefined;
}

/** Приоритетные страны сверху, остальные - по алфавиту выбранного языка. */
export function sortedCountries(locale: 'ru' | 'en'): Country[] {
  const priority = PRIORITY_ISO
    .map((iso) => COUNTRIES.find((c) => c.iso === iso))
    .filter((c): c is Country => Boolean(c));

  const rest = COUNTRIES
    .filter((c) => !PRIORITY_ISO.includes(c.iso))
    .sort((a, b) => a[locale].localeCompare(b[locale], locale));

  return [...priority, ...rest];
}
