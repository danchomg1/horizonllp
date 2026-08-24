import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'NEBOSH Leadership Excellence',
    description: 'Курс NEBOSH Leadership Excellence — развитие лидерских компетенций в области безопасности для топ-менеджеров. Влияние лидерства на культуру безопасности.',
    ogTitle: 'NEBOSH Leadership Excellence — Лидерство в области безопасности и охраны труда',
  },
  en: {
    title: 'NEBOSH Leadership Excellence',
    description: 'NEBOSH Leadership Excellence course — developing safety leadership competencies for senior executives. The influence of leadership on safety culture.',
    ogTitle: 'NEBOSH Leadership Excellence',
  },
  kz: {
    title: 'NEBOSH Leadership Excellence',
    description: 'NEBOSH Leadership Excellence курсы — жоғары басшылыққа арналған қауіпсіздік саласындағы көшбасшылық құзыреттерін дамыту. Көшбасшылықтың қауіпсіздік мәдениетіне әсері.',
    ogTitle: 'NEBOSH Leadership Excellence — қауіпсіздік саласындағы көшбасшылық',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/neboshlp');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH Leadership Excellence',
      description: pick(META, locale).description,
      url,
      courseMode: ['onsite', 'online'],
      inLanguage: HREFLANG[normalizeLocale(locale)],
      provider: { '@type': 'Organization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: pick({ ru: 'Главная', en: 'Home', kz: 'Басты бет' }, locale), item: localeUrl(locale) },
        { '@type': 'ListItem', position: 2, name: 'NEBOSH Leadership Excellence', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/neboshlp';
  const enUrl = 'https://horizon-llp.com/en/neboshlp';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/neboshlp'),
    openGraph: { title: m.ogTitle, description: m.description, images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Horizon LLP' }] },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={makeJsonLd(locale)} />
      {children}
    </>
  );
}
