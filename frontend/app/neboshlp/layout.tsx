import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'NEBOSH Leadership Excellence | Horizon LLP',
  description: 'Курс NEBOSH Leadership Excellence — развитие лидерских компетенций в области безопасности для топ-менеджеров. Влияние лидерства на культуру безопасности.',
  alternates: { canonical: 'https://horizon-llp.com/neboshlp' },
  openGraph: {
    title: 'NEBOSH Leadership Excellence — Лидерство в области безопасности и охраны труда',
    description: 'Курс NEBOSH Leadership Excellence — развитие лидерских компетенций в области безопасности для топ-менеджеров. Влияние лидерства на культуру безопасности.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEBOSH Leadership Excellence',
    description: 'Курс NEBOSH Leadership Excellence — развитие лидерских компетенций в области безопасности для топ-менеджеров. Влияние лидерства на культуру безопасности.',
    url: 'https://horizon-llp.com/neboshlp',
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
      { '@type': 'ListItem', position: 2, name: 'NEBOSH Leadership Excellence', item: 'https://horizon-llp.com/neboshlp' },
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
