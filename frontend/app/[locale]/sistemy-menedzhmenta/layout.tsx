import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'Системы менеджмента ISO 9001, 14001, 45001',
    description: 'Разработка и внедрение интегрированных систем менеджмента по стандартам ISO 9001, ISO 14001 и ISO 45001. Диагностика, разработка документации, сопровождение.',
    ogTitle: 'Системы менеджмента ISO 9001, ISO 14001, ISO 45001',
  },
  en: {
    title: 'ISO 9001, 14001, 45001 Management Systems',
    description: 'Development and implementation of integrated management systems to ISO 9001, ISO 14001 and ISO 45001 standards. Diagnostics, documentation development and ongoing support.',
    ogTitle: 'ISO 9001, ISO 14001, ISO 45001 Management Systems',
  },
  kz: {
    title: 'ISO 9001, 14001, 45001 менеджмент жүйелері',
    description: 'ISO 9001, ISO 14001 және ISO 45001 стандарттары бойынша біріктірілген менеджмент жүйелерін әзірлеу және енгізу. Диагностика, құжаттама әзірлеу, сүйемелдеу.',
    ogTitle: 'ISO 9001, ISO 14001, ISO 45001 менеджмент жүйелері',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/sistemy-menedzhmenta');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pick({ ru: 'Системы менеджмента ISO 9001, ISO 14001, ISO 45001', en: 'ISO 9001, 14001, 45001 Management Systems', kz: 'ISO 9001, ISO 14001, ISO 45001 менеджмент жүйелері' }, locale),
      description: pick(META, locale).description,
      url,
      serviceType: 'Management Systems Consulting',
      areaServed: { '@type': 'Country', name: 'Kazakhstan' },
      provider: { '@type': 'Organization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: pick({ ru: 'Главная', en: 'Home', kz: 'Басты бет' }, locale), item: localeUrl(locale) },
        { '@type': 'ListItem', position: 2, name: pick({ ru: 'Системы менеджмента ISO', en: 'Management Systems ISO', kz: 'ISO менеджмент жүйелері' }, locale), item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/sistemy-menedzhmenta';
  const enUrl = 'https://horizon-llp.com/en/sistemy-menedzhmenta';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/sistemy-menedzhmenta'),
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
