import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'NEBOSH HSE Working with Wellbeing | Horizon LLP',
  description: 'Квалификация NEBOSH HSE по обеспечению благополучия сотрудников на работе — практические инструменты для менеджеров и HR по работе с wellbeing.',
  alternates: { canonical: 'https://horizon-llp.com/neboshwellbeing' },
  openGraph: {
    title: 'NEBOSH HSE Working with Wellbeing — Благополучие на рабочем месте',
    description: 'Квалификация NEBOSH HSE по обеспечению благополучия сотрудников на работе — практические инструменты для менеджеров и HR по работе с wellbeing.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEBOSH HSE Working with Wellbeing',
    description: 'Квалификация NEBOSH HSE по обеспечению благополучия сотрудников на работе — практические инструменты для менеджеров и HR по работе с wellbeing.',
    url: 'https://horizon-llp.com/neboshwellbeing',
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
      { '@type': 'ListItem', position: 2, name: 'NEBOSH Wellbeing', item: 'https://horizon-llp.com/neboshwellbeing' },
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
