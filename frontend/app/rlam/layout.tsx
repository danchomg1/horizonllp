import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'РЛАМ — Руководитель ликвидации аварии на месте | Horizon LLP',
  description: 'Курс РЛАМ — практическая подготовка руководителей аварийного реагирования на основе международных стандартов UK Fire & Rescue и Incident Command System.',
  alternates: { canonical: 'https://horizon-llp.com/rlam' },
  openGraph: {
    title: 'РЛАМ — Руководитель ликвидации аварии на месте',
    description: 'Курс РЛАМ — практическая подготовка руководителей аварийного реагирования на основе международных стандартов UK Fire & Rescue и Incident Command System.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'РЛАМ — Руководитель ликвидации аварии на месте',
    description: 'Курс РЛАМ — практическая подготовка руководителей аварийного реагирования на основе международных стандартов UK Fire & Rescue и Incident Command System.',
    url: 'https://horizon-llp.com/rlam',
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
      { '@type': 'ListItem', position: 2, name: 'РЛАМ', item: 'https://horizon-llp.com/rlam' },
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
