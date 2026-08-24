import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'IOSH Working Safely',
    description: 'Курс IOSH Working Safely — базовые знания по безопасности для сотрудников любого уровня. Простой и практичный курс от международной организации IOSH.',
    ogTitle: 'IOSH Working Safely',
  },
  en: {
    title: 'IOSH Working Safely',
    description: 'IOSH Working Safely course — foundational safety knowledge for employees at all levels. A practical and accessible course from the international body IOSH.',
    ogTitle: 'IOSH Working Safely',
  },
  kz: {
    title: 'IOSH Working Safely',
    description: 'IOSH Working Safely курсы — кез келген деңгейдегі қызметкерлерге арналған қауіпсіздік негіздері. IOSH халықаралық ұйымының қарапайым және практикалық курсы.',
    ogTitle: 'IOSH Working Safely',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/iosh-working-safely');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'IOSH Working Safely',
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
        { '@type': 'ListItem', position: 2, name: 'IOSH Working Safely', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/iosh-working-safely';
  const enUrl = 'https://horizon-llp.com/en/iosh-working-safely';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/iosh-working-safely'),
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
