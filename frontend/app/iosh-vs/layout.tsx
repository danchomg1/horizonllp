import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'IOSH Vision Zero | Horizon LLP',
  description: 'Курс IOSH Vision Zero — внедрение концепции нулевого травматизма. Разработан IOSH совместно с ISSA для руководителей и специалистов по охране труда.',
  alternates: { canonical: 'https://horizon-llp.com/iosh-vs' },
  openGraph: {
    title: 'IOSH Vision Zero — Концепция нулевого травматизма',
    description: 'Курс IOSH Vision Zero — внедрение концепции нулевого травматизма. Разработан IOSH совместно с ISSA для руководителей и специалистов по охране труда.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'IOSH Vision Zero',
    description: 'Курс IOSH Vision Zero — внедрение концепции нулевого травматизма. Разработан IOSH совместно с ISSA для руководителей и специалистов по охране труда.',
    url: 'https://horizon-llp.com/iosh-vs',
    courseMode: ['onsite', 'online'],
    inLanguage: 'ru',
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
      { '@type': 'ListItem', position: 2, name: 'IOSH Vision Zero', item: 'https://horizon-llp.com/iosh-vs' },
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
