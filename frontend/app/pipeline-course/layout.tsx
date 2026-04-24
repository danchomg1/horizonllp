import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'Ликвидация аварий на трубопроводах | Horizon LLP',
  description: 'Практический курс по локализации и устранению аварий на трубопроводах для аварийно-спасательных служб и специалистов нефтегазового сектора.',
  alternates: { canonical: 'https://horizon-llp.com/pipeline-course' },
  openGraph: {
    title: 'Ликвидация аварий на трубопроводах — практическая подготовка АСС',
    description: 'Практический курс по локализации и устранению аварий на трубопроводах для аварийно-спасательных служб и специалистов нефтегазового сектора.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Ликвидация аварий на трубопроводах',
    description: 'Практический курс по локализации и устранению аварий на трубопроводах для аварийно-спасательных служб и специалистов нефтегазового сектора.',
    url: 'https://horizon-llp.com/pipeline-course',
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
      { '@type': 'ListItem', position: 2, name: 'Ликвидация аварий на трубопроводах', item: 'https://horizon-llp.com/pipeline-course' },
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
