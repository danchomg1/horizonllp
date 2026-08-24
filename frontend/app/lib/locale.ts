export type Locale = 'ru' | 'en' | 'kz';

export const LOCALES: Locale[] = ['ru', 'en', 'kz'];
export const DEFAULT_LOCALE: Locale = 'ru';

export const SITE_URL = 'https://horizon-llp.com';

/** Подпись на кнопке переключателя языка. */
export const LOCALE_LABELS: Record<Locale, string> = {
  ru: 'RU',
  en: 'EN',
  kz: 'KZ',
};

/**
 * Код языка для hreflang и атрибута lang.
 * В адресе у нас /kz/, но kz - это код страны, а не языка: поисковикам
 * нужен именно kk, иначе казахская версия размечена некорректно.
 */
export const HREFLANG: Record<Locale, string> = {
  ru: 'ru',
  en: 'en',
  kz: 'kk',
};

export function isLocale(value?: string): value is Locale {
  return !!value && (LOCALES as string[]).includes(value);
}

export function normalizeLocale(value?: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Суффикс переведённых полей в Sanity: ru -> '', en -> 'En', kz -> 'Kz'. */
export function fieldSuffix(locale: string): '' | 'En' | 'Kz' {
  if (locale === 'en') return 'En';
  if (locale === 'kz') return 'Kz';
  return '';
}

/**
 * Значение поля на нужном языке с откатом на русский.
 * loc(course, 'title', 'kz') -> titleKz, если заполнено, иначе title.
 */
export function loc<T = any>(doc: any, field: string, locale: string): T | undefined {
  if (!doc) return undefined;

  const suffix = fieldSuffix(locale);
  if (suffix) {
    const translated = doc[field + suffix];
    const empty =
      translated === undefined ||
      translated === null ||
      translated === '' ||
      (Array.isArray(translated) && translated.length === 0);
    if (!empty) return translated as T;
  }

  return doc[field] as T;
}

/** Префикс пути: ru -> '', en -> '/en', kz -> '/kz'. */
export function localePath(locale: string): string {
  return normalizeLocale(locale) === DEFAULT_LOCALE ? '' : `/${normalizeLocale(locale)}`;
}

/** Ссылка внутри сайта с учётом языка: href('nebosh-igc', 'kz') -> '/kz/nebosh-igc'. */
export function href(path: string, locale: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${localePath(locale)}${clean}` || '/';
}

/** Абсолютный адрес страницы для нужного языка. */
export function localeUrl(locale: string, path = ''): string {
  const clean = path && !path.startsWith('/') ? `/${path}` : path;
  return `${SITE_URL}${localePath(locale)}${clean}`;
}

/** Готовый объект alternates.languages для generateMetadata. */
export function languageAlternates(path = ''): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const l of LOCALES) alternates[HREFLANG[l]] = localeUrl(l, path);
  alternates['x-default'] = localeUrl(DEFAULT_LOCALE, path);
  return alternates;
}

/** Полный блок alternates: canonical текущего языка + все языковые версии. */
export function alternatesFor(locale: string, path = '') {
  return {
    canonical: localeUrl(locale, path),
    languages: languageAlternates(path),
  };
}

/** Выбор значения из словаря по языку с откатом на русский. */
export function pick<T>(dict: Partial<Record<Locale, T>>, locale: string): T {
  const l = normalizeLocale(locale);
  return (dict[l] ?? dict[DEFAULT_LOCALE]) as T;
}
