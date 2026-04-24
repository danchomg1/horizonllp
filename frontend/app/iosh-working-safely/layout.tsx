import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'IOSH Working Safely | Horizon LLP',
  description: 'Курс IOSH Working Safely — базовые знания по безопасности для сотрудников любого уровня. Простой и практичный курс от международной организации IOSH.',
  alternates: { canonical: 'https://horizon-llp.com/iosh-working-safely' },
  openGraph: {
    title: 'IOSH Working Safely',
    description: 'Курс IOSH Working Safely — базовые знания по безопасности для сотрудников любого уровня. Простой и практичный курс от международной организации IOSH.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'IOSH Working Safely',
    description: 'Курс IOSH Working Safely — базовые знания по безопасности для сотрудников любого уровня. Простой и практичный курс от международной организации IOSH.',
    url: 'https://horizon-llp.com/iosh-working-safely',
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
      { '@type': 'ListItem', position: 2, name: 'IOSH Working Safely', item: 'https://horizon-llp.com/iosh-working-safely' },
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
