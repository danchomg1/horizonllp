import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'NEBOSH Certificate in Managing Stress at Work',
    description: 'Курс NEBOSH по управлению стрессом на рабочем месте — инструменты для выявления и устранения источников стресса. Для руководителей и HR-специалистов.',
    ogTitle: 'NEBOSH Certificate in Managing Stress at Work',
  },
  en: {
    title: 'NEBOSH Certificate in Managing Stress at Work',
    description: 'NEBOSH course on managing workplace stress — tools for identifying and addressing sources of stress. For managers and HR professionals.',
    ogTitle: 'NEBOSH Certificate in Managing Stress at Work',
  },
  kz: {
    title: 'NEBOSH Certificate in Managing Stress at Work',
    description: 'Жұмыс орнындағы күйзелісті басқару бойынша NEBOSH курсы — күйзеліс көздерін анықтау және жою құралдары. Басшылар мен HR мамандарына арналған.',
    ogTitle: 'NEBOSH Certificate in Managing Stress at Work',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/neboshstress');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH Certificate in Managing Stress at Work',
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
        { '@type': 'ListItem', position: 2, name: 'NEBOSH Managing Stress', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/neboshstress';
  const enUrl = 'https://horizon-llp.com/en/neboshstress';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/neboshstress'),
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
