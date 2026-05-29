import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'NOCN AICIR — Asset Incident Commander | Horizon LLP',
    description: 'Курс NOCN AICIR (Asset Incident Commander – Initial Response) — подготовка руководителей первоначального реагирования на производственные аварии.',
    ogTitle: 'NOCN AICIR — Asset Incident Commander – Initial Response',
  },
  en: {
    title: 'NOCN AICIR — Asset Incident Commander | Horizon LLP',
    description: 'NOCN AICIR (Asset Incident Commander – Initial Response) course — training initial response commanders for industrial emergencies.',
    ogTitle: 'NOCN AICIR — Asset Incident Commander – Initial Response',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/nocn-aicir' : 'nocn-aicir';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NOCN AICIR — Asset Incident Commander Initial Response',
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
        { '@type': 'ListItem', position: 2, name: 'NOCN AICIR', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/nocn-aicir' : 'https://horizon-llp.com/nocn-aicir';
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
