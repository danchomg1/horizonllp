import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'NEBOSH Certificate in Managing Stress at Work | Horizon LLP',
    description: 'Курс NEBOSH по управлению стрессом на рабочем месте — инструменты для выявления и устранения источников стресса. Для руководителей и HR-специалистов.',
    ogTitle: 'NEBOSH Certificate in Managing Stress at Work',
  },
  en: {
    title: 'NEBOSH Certificate in Managing Stress at Work | Horizon LLP',
    description: 'NEBOSH course on managing workplace stress — tools for identifying and addressing sources of stress. For managers and HR professionals.',
    ogTitle: 'NEBOSH Certificate in Managing Stress at Work',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/neboshstress' : 'neboshstress';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH Certificate in Managing Stress at Work',
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
        { '@type': 'ListItem', position: 2, name: 'NEBOSH Managing Stress', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/neboshstress' : 'https://horizon-llp.com/neboshstress';
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
