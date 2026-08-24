import { getLocale } from 'next-intl/server';
import { Montserrat } from 'next/font/google';
import { HREFLANG, normalizeLocale } from './lib/locale';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let locale = 'ru';
  try {
    locale = await getLocale();
  } catch {
    // /studio и другие маршруты без локали
  }

  return (
    <html lang={HREFLANG[normalizeLocale(locale)]}>
      <body className={`${montserrat.variable} font-sans antialiased bg-[#F4F4F4] min-h-screen flex flex-col overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
