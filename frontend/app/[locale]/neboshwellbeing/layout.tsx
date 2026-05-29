import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'NEBOSH HSE Working with Wellbeing | Horizon LLP',
    description: 'Квалификация NEBOSH HSE по обеспечению благополучия сотрудников на работе — практические инструменты для менеджеров и HR по работе с wellbeing.',
    ogTitle: 'NEBOSH HSE Working with Wellbeing — Благополучие на рабочем месте',
  },
  en: {
    title: 'NEBOSH HSE Working with Wellbeing | Horizon LLP',
    description: 'NEBOSH HSE qualification in workplace wellbeing — practical tools for managers and HR on implementing wellbeing programmes.',
    ogTitle: 'NEBOSH HSE Working with Wellbeing',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/neboshwellbeing' : 'neboshwellbeing';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH HSE Working with Wellbeing',
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
        { '@type': 'ListItem', position: 2, name: 'NEBOSH Wellbeing', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/neboshwellbeing' : 'https://horizon-llp.com/neboshwellbeing';
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
