import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'NEBOSH IGC | Horizon LLP',
  description: 'Международный сертификат NEBOSH IGC в области охраны труда и промышленной безопасности. Очное и дистанционное обучение в Казахстане.',
  alternates: { canonical: 'https://horizon-llp.com/nebosh-igc' },
  openGraph: {
    title: 'NEBOSH IGC — International General Certificate in Occupational Health and Safety',
    description: 'Международный сертификат NEBOSH IGC в области охраны труда и промышленной безопасности. Очное и дистанционное обучение в Казахстане.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEBOSH IGC — International General Certificate in Occupational Health and Safety',
    description: 'Международный сертификат NEBOSH IGC в области охраны труда и промышленной безопасности. Очное и дистанционное обучение в Казахстане.',
    url: 'https://horizon-llp.com/nebosh-igc',
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
      { '@type': 'ListItem', position: 2, name: 'NEBOSH IGC', item: 'https://horizon-llp.com/nebosh-igc' },
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
