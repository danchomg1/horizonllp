import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'Диагностика системы БиОТ | Horizon LLP',
    description: 'Комплексная диагностика системы безопасности и охраны труда — выявление скрытых рисков и системных сбоев до наступления инцидента.',
    ogTitle: 'Диагностика системы БиОТ — как найти скрытые проблемы до инцидента',
  },
  en: {
    title: 'HSE Management System Diagnostics | Horizon LLP',
    description: 'Comprehensive diagnostics of health, safety and environment management systems — identifying hidden risks and systemic failures before incidents occur.',
    ogTitle: 'HSE Management System Diagnostics — Finding Hidden Problems Before Incidents',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/diagnostika-biot' : 'diagnostika-biot';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: isEn ? 'HSE Management System Diagnostics' : 'Диагностика системы БиОТ',
      description: isEn ? META.en.description : META.ru.description,
      url,
      serviceType: 'HSE Consulting',
      areaServed: { '@type': 'Country', name: 'Kazakhstan' },
      provider: { '@type': 'Organization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Главная', item: isEn ? 'https://horizon-llp.com/en' : 'https://horizon-llp.com' },
        { '@type': 'ListItem', position: 2, name: isEn ? 'HSE Diagnostics' : 'Диагностика системы БиОТ', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/diagnostika-biot' : 'https://horizon-llp.com/diagnostika-biot';
  const ruUrl = 'https://horizon-llp.com/diagnostika-biot';
  const enUrl = 'https://horizon-llp.com/en/diagnostika-biot';
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical, languages: { 'ru': ruUrl, 'en': enUrl, 'x-default': ruUrl } },
    openGraph: { title: m.ogTitle, description: m.description, images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Horizon LLP' }] },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={makeJsonLd(locale === 'en')} />
      {children}
    </>
  );
}
