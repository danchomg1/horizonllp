import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'NEBOSH Process Safety Management | Horizon LLP',
    description: 'Курс NEBOSH PSM — управление безопасностью опасных процессов и оборудования для менеджеров и инженеров производственных предприятий с высокими рисками.',
    ogTitle: 'NEBOSH Process Safety Management',
  },
  en: {
    title: 'NEBOSH Process Safety Management | Horizon LLP',
    description: 'NEBOSH PSM course — managing the safety of hazardous processes and equipment for managers and engineers at high-risk industrial facilities.',
    ogTitle: 'NEBOSH Process Safety Management',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/neboshpsm' : 'neboshpsm';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH Process Safety Management',
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
        { '@type': 'ListItem', position: 2, name: 'NEBOSH PSM', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/neboshpsm' : 'https://horizon-llp.com/neboshpsm';
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
