import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
    description: 'Однодневный курс NEBOSH и HSE по практической оценке рисков на рабочем месте. Лучшие международные практики управления производственными рисками.',
    ogTitle: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
  },
  en: {
    title: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
    description: 'One-day NEBOSH and HSE course on practical workplace risk assessment. International best practices in managing occupational risks.',
    ogTitle: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
  },
  kz: {
    title: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
    description: 'NEBOSH және HSE-дің жұмыс орнындағы қауіптерді практикалық бағалау бойынша бір күндік курсы. Өндірістік қауіптерді басқарудың үздік халықаралық тәжірибелері.',
    ogTitle: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/neboshraw');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
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
        { '@type': 'ListItem', position: 2, name: 'NEBOSH Risk Assessment', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/neboshraw';
  const enUrl = 'https://horizon-llp.com/en/neboshraw';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/neboshraw'),
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
