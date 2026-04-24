import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'NEBOSH Certificate in Managing Stress at Work | Horizon LLP',
  description: 'Курс NEBOSH по управлению стрессом на рабочем месте — инструменты для выявления и устранения источников стресса. Для руководителей и HR-специалистов.',
  alternates: { canonical: 'https://horizon-llp.com/neboshstress' },
  openGraph: {
    title: 'NEBOSH Certificate in Managing Stress at Work',
    description: 'Курс NEBOSH по управлению стрессом на рабочем месте — инструменты для выявления и устранения источников стресса. Для руководителей и HR-специалистов.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEBOSH Certificate in Managing Stress at Work',
    description: 'Курс NEBOSH по управлению стрессом на рабочем месте — инструменты для выявления и устранения источников стресса. Для руководителей и HR-специалистов.',
    url: 'https://horizon-llp.com/neboshstress',
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
      { '@type': 'ListItem', position: 2, name: 'NEBOSH Managing Stress', item: 'https://horizon-llp.com/neboshstress' },
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
