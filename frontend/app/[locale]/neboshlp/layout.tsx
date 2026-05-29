import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'NEBOSH Leadership Excellence | Horizon LLP',
    description: 'Курс NEBOSH Leadership Excellence — развитие лидерских компетенций в области безопасности для топ-менеджеров. Влияние лидерства на культуру безопасности.',
    ogTitle: 'NEBOSH Leadership Excellence — Лидерство в области безопасности и охраны труда',
  },
  en: {
    title: 'NEBOSH Leadership Excellence | Horizon LLP',
    description: 'NEBOSH Leadership Excellence course — developing safety leadership competencies for senior executives. The influence of leadership on safety culture.',
    ogTitle: 'NEBOSH Leadership Excellence',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/neboshlp' : 'neboshlp';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH Leadership Excellence',
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
        { '@type': 'ListItem', position: 2, name: 'NEBOSH Leadership Excellence', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/neboshlp' : 'https://horizon-llp.com/neboshlp';
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
      <JsonLd data={makeJsonLd(locale === 'en')} />
      {children}
    </>
  );
}
