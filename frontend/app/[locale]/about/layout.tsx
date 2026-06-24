import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'О компании | Horizon LLP',
    description: 'Horizon LLP — казахстанский учебный центр в области охраны труда и промышленной безопасности. Официальный партнёр NEBOSH, IOSH, RoSPA и CompEx.',
    ogTitle: 'О компании Horizon LLP',
  },
  en: {
    title: 'About Us | Horizon LLP',
    description: 'Horizon LLP — Kazakhstan-based training centre in occupational health and industrial safety. Official partner of NEBOSH, IOSH, RoSPA and CompEx.',
    ogTitle: 'About Horizon LLP',
  },
};

const jsonLdRu = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'О компании Horizon LLP',
    description: META.ru.description,
    url: 'https://horizon-llp.com/about',
    mainEntity: { '@type': 'EducationalOrganization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
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

const jsonLdEn = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Horizon LLP',
    description: META.en.description,
    url: 'https://horizon-llp.com/en/about',
    mainEntity: { '@type': 'EducationalOrganization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://horizon-llp.com/en' },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://horizon-llp.com/en/about' },
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/about' : 'https://horizon-llp.com/about';
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical },
    openGraph: { title: m.ogTitle, description: m.description },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={locale === 'en' ? jsonLdEn : jsonLdRu} />
      {children}
    </>
  );
}
