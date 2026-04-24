import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'NEBOSH Introduction to Incident Investigation | Horizon LLP',
  description: 'Однодневный курс NEBOSH и HSE по расследованию производственных происшествий — методы выявления коренных причин и предотвращения повторных инцидентов.',
  alternates: { canonical: 'https://horizon-llp.com/neboship' },
  openGraph: {
    title: 'NEBOSH Introduction to Incident Investigation',
    description: 'Однодневный курс NEBOSH и HSE по расследованию производственных происшествий — методы выявления коренных причин и предотвращения повторных инцидентов.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEBOSH Introduction to Incident Investigation',
    description: 'Однодневный курс NEBOSH и HSE по расследованию производственных происшествий — методы выявления коренных причин и предотвращения повторных инцидентов.',
    url: 'https://horizon-llp.com/neboship',
    courseMode: ['onsite'],
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
      { '@type': 'ListItem', position: 2, name: 'NEBOSH Incident Investigation', item: 'https://horizon-llp.com/neboship' },
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
