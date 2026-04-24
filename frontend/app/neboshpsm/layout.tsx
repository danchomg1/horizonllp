import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'NEBOSH Process Safety Management | Horizon LLP',
  description: 'Курс NEBOSH PSM — управление безопасностью опасных процессов и оборудования для менеджеров и инженеров производственных предприятий с высокими рисками.',
  alternates: { canonical: 'https://horizon-llp.com/neboshpsm' },
  openGraph: {
    title: 'NEBOSH Process Safety Management',
    description: 'Курс NEBOSH PSM — управление безопасностью опасных процессов и оборудования для менеджеров и инженеров производственных предприятий с высокими рисками.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEBOSH Process Safety Management',
    description: 'Курс NEBOSH PSM — управление безопасностью опасных процессов и оборудования для менеджеров и инженеров производственных предприятий с высокими рисками.',
    url: 'https://horizon-llp.com/neboshpsm',
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
      { '@type': 'ListItem', position: 2, name: 'NEBOSH Process Safety Management', item: 'https://horizon-llp.com/neboshpsm' },
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
