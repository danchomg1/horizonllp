import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'NEBOSH Award in Managing Risks and Risk Assessment at Work | Horizon LLP',
  description: 'Однодневный курс NEBOSH и HSE по практической оценке рисков на рабочем месте. Лучшие международные практики управления производственными рисками.',
  alternates: { canonical: 'https://horizon-llp.com/neboshraw' },
  openGraph: {
    title: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
    description: 'Однодневный курс NEBOSH и HSE по практической оценке рисков на рабочем месте. Лучшие международные практики управления производственными рисками.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
    description: 'Однодневный курс NEBOSH и HSE по практической оценке рисков на рабочем месте. Лучшие международные практики управления производственными рисками.',
    url: 'https://horizon-llp.com/neboshraw',
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
      { '@type': 'ListItem', position: 2, name: 'NEBOSH Risk Assessment', item: 'https://horizon-llp.com/neboshraw' },
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
