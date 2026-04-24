import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'IOSH Managing Safely | Horizon LLP',
  description: 'Курс IOSH Managing Safely для руководителей — практические инструменты для управления рисками и ресурсами. Обучение в Казахстане.',
  alternates: { canonical: 'https://horizon-llp.com/ioshms' },
  openGraph: {
    title: 'IOSH Managing Safely — Безопасное управление',
    description: 'Курс IOSH Managing Safely для руководителей — практические инструменты для управления рисками и ресурсами. Обучение в Казахстане.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'IOSH Managing Safely',
    description: 'Курс IOSH Managing Safely для руководителей — практические инструменты для управления рисками и ресурсами. Обучение в Казахстане.',
    url: 'https://horizon-llp.com/ioshms',
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
      { '@type': 'ListItem', position: 2, name: 'IOSH Managing Safely', item: 'https://horizon-llp.com/ioshms' },
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
