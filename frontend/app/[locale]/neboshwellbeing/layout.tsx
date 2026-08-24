import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'NEBOSH HSE Working with Wellbeing',
    description: 'Квалификация NEBOSH HSE по обеспечению благополучия сотрудников на работе — практические инструменты для менеджеров и HR по работе с wellbeing.',
    ogTitle: 'NEBOSH HSE Working with Wellbeing — Благополучие на рабочем месте',
  },
  en: {
    title: 'NEBOSH HSE Working with Wellbeing',
    description: 'NEBOSH HSE qualification in workplace wellbeing — practical tools for managers and HR on implementing wellbeing programmes.',
    ogTitle: 'NEBOSH HSE Working with Wellbeing',
  },
  kz: {
    title: 'NEBOSH HSE Working with Wellbeing',
    description: 'Қызметкерлердің жұмыстағы әл-ауқатын қамтамасыз ету бойынша NEBOSH HSE біліктілігі — менеджерлер мен HR үшін практикалық құралдар.',
    ogTitle: 'NEBOSH HSE Working with Wellbeing — жұмыс орнындағы әл-ауқат',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/neboshwellbeing');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH HSE Working with Wellbeing',
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
        { '@type': 'ListItem', position: 2, name: 'NEBOSH Wellbeing', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/neboshwellbeing';
  const enUrl = 'https://horizon-llp.com/en/neboshwellbeing';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/neboshwellbeing'),
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
