import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'NOCN AICIR — Asset Incident Commander | Horizon LLP',
  description: 'Курс NOCN AICIR (Asset Incident Commander – Initial Response) — подготовка руководителей первоначального реагирования на производственные аварии.',
  alternates: { canonical: 'https://horizon-llp.com/nocn-aicir' },
  openGraph: {
    title: 'NOCN AICIR — Asset Incident Commander – Initial Response',
    description: 'Курс NOCN AICIR (Asset Incident Commander – Initial Response) — подготовка руководителей первоначального реагирования на производственные аварии.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NOCN AICIR — Asset Incident Commander Initial Response',
    description: 'Курс NOCN AICIR (Asset Incident Commander – Initial Response) — подготовка руководителей первоначального реагирования на производственные аварии.',
    url: 'https://horizon-llp.com/nocn-aicir',
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
      { '@type': 'ListItem', position: 2, name: 'NOCN AICIR', item: 'https://horizon-llp.com/nocn-aicir' },
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
