import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'Диагностика системы БиОТ',
    description: 'Комплексная диагностика системы безопасности и охраны труда — выявление скрытых рисков и системных сбоев до наступления инцидента.',
    ogTitle: 'Диагностика системы БиОТ — как найти скрытые проблемы до инцидента',
  },
  en: {
    title: 'HSE Management System Diagnostics',
    description: 'Comprehensive diagnostics of health, safety and environment management systems — identifying hidden risks and systemic failures before incidents occur.',
    ogTitle: 'HSE Management System Diagnostics — Finding Hidden Problems Before Incidents',
  },
  kz: {
    title: 'ЕҚҚ жүйесін диагностикалау',
    description: 'Еңбекті қорғау және қауіпсіздік жүйесін кешенді диагностикалау — оқыс оқиға болғанға дейін жасырын қауіптер мен жүйелік ақауларды анықтау.',
    ogTitle: 'ЕҚҚ жүйесін диагностикалау — жасырын мәселелерді оқиғаға дейін табу',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/diagnostika-biot');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pick({ ru: 'Диагностика системы БиОТ', en: 'HSE Management System Diagnostics', kz: 'ЕҚҚ жүйесін диагностикалау' }, locale),
      description: pick(META, locale).description,
      url,
      serviceType: 'HSE Consulting',
      areaServed: { '@type': 'Country', name: 'Kazakhstan' },
      provider: { '@type': 'Organization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: pick({ ru: 'Главная', en: 'Home', kz: 'Басты бет' }, locale), item: localeUrl(locale) },
        { '@type': 'ListItem', position: 2, name: pick({ ru: 'Диагностика системы БиОТ', en: 'HSE Diagnostics', kz: 'ЕҚҚ диагностикасы' }, locale), item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/diagnostika-biot';
  const enUrl = 'https://horizon-llp.com/en/diagnostika-biot';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/diagnostika-biot'),
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
