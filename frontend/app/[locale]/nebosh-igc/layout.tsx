import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'NEBOSH IGC | Horizon LLP',
    description: 'Международный сертификат NEBOSH IGC в области охраны труда и промышленной безопасности. Очное и дистанционное обучение в Казахстане.',
    ogTitle: 'NEBOSH IGC — International General Certificate in Occupational Health and Safety',
  },
  en: {
    title: 'NEBOSH IGC | Horizon LLP',
    description: 'NEBOSH International General Certificate in Occupational Health and Safety. In-person and distance learning delivered in Kazakhstan.',
    ogTitle: 'NEBOSH IGC — International General Certificate in Occupational Health and Safety',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/nebosh-igc' : 'nebosh-igc';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH IGC — International General Certificate in Occupational Health and Safety',
      description: isEn ? META.en.description : META.ru.description,
      url,
      courseMode: ['onsite', 'online'],
      inLanguage: isEn ? 'en' : 'ru',
      provider: { '@type': 'Organization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Главная', item: isEn ? 'https://horizon-llp.com/en' : 'https://horizon-llp.com' },
        { '@type': 'ListItem', position: 2, name: 'NEBOSH IGC', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/nebosh-igc' : 'https://horizon-llp.com/nebosh-igc';
  const ruUrl = 'https://horizon-llp.com/nebosh-igc';
  const enUrl = 'https://horizon-llp.com/en/nebosh-igc';
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical, languages: { 'ru': ruUrl, 'en': enUrl, 'x-default': ruUrl } },
    openGraph: { title: m.ogTitle, description: m.description, images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Horizon LLP' }] },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={makeJsonLd(locale === 'en')} />
      {children}
    </>
  );
}
