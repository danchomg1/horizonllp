import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'Диагностика системы БиОТ | Horizon LLP',
  description: 'Комплексная диагностика системы безопасности и охраны труда — выявление скрытых рисков и системных сбоев до наступления инцидента.',
  alternates: { canonical: 'https://horizon-llp.com/diagnostika-biot' },
  openGraph: {
    title: 'Диагностика системы БиОТ — как найти скрытые проблемы до инцидента',
    description: 'Комплексная диагностика системы безопасности и охраны труда — выявление скрытых рисков и системных сбоев до наступления инцидента.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Диагностика системы БиОТ',
    description: 'Комплексная диагностика системы безопасности и охраны труда — выявление скрытых рисков и системных сбоев до наступления инцидента.',
    url: 'https://horizon-llp.com/diagnostika-biot',
    serviceType: 'HSE Consulting',
    areaServed: { '@type': 'Country', name: 'Kazakhstan' },
    provider: {
      '@type': 'Organization',
      name: 'Horizon LLP',
      url: 'https://horizon-llp.com',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://horizon-llp.com' },
      { '@type': 'ListItem', position: 2, name: 'Диагностика системы БиОТ', item: 'https://horizon-llp.com/diagnostika-biot' },
    ],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
