import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'RoSPA Level 2 Defensive Driving | Horizon LLP',
  description: 'Программа RoSPA Level 2 Defensive Driving — курс безопасного вождения для специалистов нефтегазового и промышленного секторов. Снижение риска дорожных инцидентов.',
  alternates: { canonical: 'https://horizon-llp.com/rospa_def' },
  openGraph: {
    title: 'RoSPA Level 2 Defensive Driving',
    description: 'Программа RoSPA Level 2 Defensive Driving — курс безопасного вождения для специалистов нефтегазового и промышленного секторов.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'RoSPA Level 2 Defensive Driving',
    description: 'Программа RoSPA Level 2 Defensive Driving — курс безопасного вождения для специалистов нефтегазового и промышленного секторов. Снижение риска дорожных инцидентов.',
    url: 'https://horizon-llp.com/rospa_def',
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
      { '@type': 'ListItem', position: 2, name: 'RoSPA Defensive Driving', item: 'https://horizon-llp.com/rospa_def' },
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
