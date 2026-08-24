import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'NEBOSH Process Safety Management',
    description: 'Курс NEBOSH PSM — управление безопасностью опасных процессов и оборудования для менеджеров и инженеров производственных предприятий с высокими рисками.',
    ogTitle: 'NEBOSH Process Safety Management',
  },
  en: {
    title: 'NEBOSH Process Safety Management',
    description: 'NEBOSH PSM course — managing the safety of hazardous processes and equipment for managers and engineers at high-risk industrial facilities.',
    ogTitle: 'NEBOSH Process Safety Management',
  },
  kz: {
    title: 'NEBOSH Process Safety Management',
    description: 'NEBOSH PSM курсы — қауіптілігі жоғары кәсіпорындардың менеджерлері мен инженерлеріне арналған қауіпті процестер мен жабдықтың қауіпсіздігін басқару.',
    ogTitle: 'NEBOSH Process Safety Management',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/neboshpsm');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH Process Safety Management',
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
        { '@type': 'ListItem', position: 2, name: 'NEBOSH PSM', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/neboshpsm';
  const enUrl = 'https://horizon-llp.com/en/neboshpsm';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/neboshpsm'),
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
