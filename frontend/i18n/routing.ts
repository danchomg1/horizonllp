import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // kz - казахский. В адресе используем kz как более привычный в Казахстане,
  // а поисковикам в hreflang отдаём корректный код языка kk (см. lib/locale.ts).
  locales: ['ru', 'en', 'kz'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed',
  localeDetection: false,
});
