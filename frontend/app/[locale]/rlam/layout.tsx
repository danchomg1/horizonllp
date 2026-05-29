import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'РЛАМ — Руководитель ликвидации аварии на месте | Horizon LLP',
    description: 'Курс РЛАМ — практическая подготовка руководителей аварийного реагирования на основе международных стандартов UK Fire & Rescue и Incident Command System.',
    ogTitle: 'РЛАМ — Руководитель ликвидации аварии на месте',
  },
  en: {
    title: 'Incident Command at Scene | Horizon LLP',
    description: 'Incident Command at Scene course — practical training for emergency response commanders based on UK Fire & Rescue and Incident Command System international standards.',
    ogTitle: 'Incident Command at Scene',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/rlam' : 'rlam';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: isEn ? 'Incident Command at Scene' : 'РЛАМ — Руководитель ликвидации аварии на месте',
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
        { '@type': 'ListItem', position: 2, name: isEn ? 'Incident Command at Scene' : 'РЛАМ', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/rlam' : 'https://horizon-llp.com/rlam';
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
