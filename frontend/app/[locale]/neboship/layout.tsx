import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'NEBOSH Introduction to Incident Investigation | Horizon LLP',
    description: 'Однодневный курс NEBOSH и HSE по расследованию производственных происшествий — методы выявления коренных причин и предотвращения повторных инцидентов.',
    ogTitle: 'NEBOSH Introduction to Incident Investigation',
  },
  en: {
    title: 'NEBOSH Introduction to Incident Investigation | Horizon LLP',
    description: 'One-day NEBOSH and HSE course on investigating workplace incidents — methods for identifying root causes and preventing recurrence.',
    ogTitle: 'NEBOSH Introduction to Incident Investigation',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/neboship' : 'neboship';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH Introduction to Incident Investigation',
      description: isEn ? META.en.description : META.ru.description,
      url,
      courseMode: ['onsite'],
      inLanguage: isEn ? 'en' : 'ru',
      provider: { '@type': 'Organization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Главная', item: isEn ? 'https://horizon-llp.com/en' : 'https://horizon-llp.com' },
        { '@type': 'ListItem', position: 2, name: 'NEBOSH Incident Investigation', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/neboship' : 'https://horizon-llp.com/neboship';
  const ruUrl = 'https://horizon-llp.com/neboship';
  const enUrl = 'https://horizon-llp.com/en/neboship';
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
