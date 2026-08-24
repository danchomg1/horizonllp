import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'NEBOSH IGC',
    description: 'Международный сертификат NEBOSH IGC в области охраны труда и промышленной безопасности. Очное и дистанционное обучение в Казахстане.',
    ogTitle: 'NEBOSH IGC — International General Certificate in Occupational Health and Safety',
  },
  en: {
    title: 'NEBOSH IGC',
    description: 'NEBOSH International General Certificate in Occupational Health and Safety. In-person and distance learning delivered in Kazakhstan.',
    ogTitle: 'NEBOSH IGC — International General Certificate in Occupational Health and Safety',
  },
  kz: {
    title: 'NEBOSH IGC',
    description: 'Еңбекті қорғау және өнеркәсіптік қауіпсіздік саласындағы NEBOSH IGC халықаралық сертификаты. Қазақстанда күндізгі және қашықтан оқыту.',
    ogTitle: 'NEBOSH IGC — International General Certificate in Occupational Health and Safety',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/nebosh-igc');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH IGC — International General Certificate in Occupational Health and Safety',
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
        { '@type': 'ListItem', position: 2, name: 'NEBOSH IGC', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/nebosh-igc';
  const enUrl = 'https://horizon-llp.com/en/nebosh-igc';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/nebosh-igc'),
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
