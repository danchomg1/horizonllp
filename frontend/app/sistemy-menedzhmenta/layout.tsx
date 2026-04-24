import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'Системы менеджмента ISO 9001, 14001, 45001 | Horizon LLP',
  description: 'Разработка и внедрение интегрированных систем менеджмента по стандартам ISO 9001, ISO 14001 и ISO 45001. Диагностика, разработка документации, сопровождение.',
  alternates: { canonical: 'https://horizon-llp.com/sistemy-menedzhmenta' },
  openGraph: {
    title: 'Системы менеджмента ISO 9001, ISO 14001, ISO 45001',
    description: 'Разработка и внедрение интегрированных систем менеджмента по стандартам ISO 9001, ISO 14001 и ISO 45001. Диагностика, разработка документации, сопровождение.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Системы менеджмента ISO 9001, ISO 14001, ISO 45001',
    description: 'Разработка и внедрение интегрированных систем менеджмента по стандартам ISO 9001, ISO 14001 и ISO 45001. Диагностика, разработка документации, сопровождение.',
    url: 'https://horizon-llp.com/sistemy-menedzhmenta',
    serviceType: 'Management Systems Consulting',
    areaServed: { '@type': 'Country', name: 'Kazakhstan' },
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
      { '@type': 'ListItem', position: 2, name: 'Системы менеджмента ISO', item: 'https://horizon-llp.com/sistemy-menedzhmenta' },
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
