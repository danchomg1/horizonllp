import type { Metadata } from 'next';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  title: 'О компании | Horizon LLP',
  description: 'Horizon LLP — казахстанский учебный центр в области охраны труда и промышленной безопасности. Официальный партнёр NEBOSH, IOSH, RoSPA, NOCN и CompEx.',
  alternates: { canonical: 'https://horizon-llp.com/about' },
  openGraph: {
    title: 'О компании Horizon LLP',
    description: 'Horizon LLP — казахстанский учебный центр в области охраны труда и промышленной безопасности. Официальный партнёр NEBOSH, IOSH, RoSPA, NOCN и CompEx.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'О компании Horizon LLP',
    description: 'Horizon LLP — казахстанский учебный центр в области охраны труда и промышленной безопасности. Официальный партнёр NEBOSH, IOSH, RoSPA, NOCN и CompEx.',
    url: 'https://horizon-llp.com/about',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Horizon LLP',
      url: 'https://horizon-llp.com',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://horizon-llp.com' },
      { '@type': 'ListItem', position: 2, name: 'О компании', item: 'https://horizon-llp.com/about' },
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
