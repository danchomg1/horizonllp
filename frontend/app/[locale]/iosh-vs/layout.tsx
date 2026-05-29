import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'IOSH Vision Zero | Horizon LLP',
    description: 'Курс IOSH Vision Zero — внедрение концепции нулевого травматизма. Разработан IOSH совместно с ISSA для руководителей и специалистов по охране труда.',
    ogTitle: 'IOSH Vision Zero — Концепция нулевого травматизма',
  },
  en: {
    title: 'IOSH Vision Zero | Horizon LLP',
    description: 'IOSH Vision Zero course — implementing the zero harm concept. Developed by IOSH in partnership with ISSA for managers and health and safety professionals.',
    ogTitle: 'IOSH Vision Zero — Zero Harm Concept',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/iosh-vs' : 'iosh-vs';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'IOSH Vision Zero',
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
        { '@type': 'ListItem', position: 2, name: 'IOSH Vision Zero', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/iosh-vs' : 'https://horizon-llp.com/iosh-vs';
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
