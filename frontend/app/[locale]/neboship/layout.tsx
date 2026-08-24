import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'NEBOSH Introduction to Incident Investigation',
    description: 'Однодневный курс NEBOSH и HSE по расследованию производственных происшествий — методы выявления коренных причин и предотвращения повторных инцидентов.',
    ogTitle: 'NEBOSH Introduction to Incident Investigation',
  },
  en: {
    title: 'NEBOSH Introduction to Incident Investigation',
    description: 'One-day NEBOSH and HSE course on investigating workplace incidents — methods for identifying root causes and preventing recurrence.',
    ogTitle: 'NEBOSH Introduction to Incident Investigation',
  },
  kz: {
    title: 'NEBOSH Introduction to Incident Investigation',
    description: 'NEBOSH және HSE-дің оқыс оқиғаларды тергеу бойынша бір күндік курсы — түбегейлі себептерді анықтау және қайталанудың алдын алу әдістері.',
    ogTitle: 'NEBOSH Introduction to Incident Investigation',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/neboship');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH Introduction to Incident Investigation',
      description: pick(META, locale).description,
      url,
      courseMode: ['onsite'],
      inLanguage: HREFLANG[normalizeLocale(locale)],
      provider: { '@type': 'Organization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: pick({ ru: 'Главная', en: 'Home', kz: 'Басты бет' }, locale), item: localeUrl(locale) },
        { '@type': 'ListItem', position: 2, name: 'NEBOSH Incident Investigation', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/neboship';
  const enUrl = 'https://horizon-llp.com/en/neboship';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/neboship'),
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
