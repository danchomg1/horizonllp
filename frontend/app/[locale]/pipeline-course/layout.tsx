import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'Ликвидация аварий на трубопроводах | Horizon LLP',
    description: 'Практический курс по локализации и устранению аварий на трубопроводах для аварийно-спасательных служб и специалистов нефтегазового сектора.',
    ogTitle: 'Ликвидация аварий на трубопроводах — практическая подготовка АСС',
  },
  en: {
    title: 'Pipeline Emergency Response | Horizon LLP',
    description: 'Practical course in localising and responding to pipeline emergencies for emergency services and oil & gas sector specialists.',
    ogTitle: 'Pipeline Emergency Response',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/pipeline-course' : 'pipeline-course';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: isEn ? 'Pipeline Emergency Response' : 'Ликвидация аварий на трубопроводах',
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
        { '@type': 'ListItem', position: 2, name: isEn ? 'Pipeline Emergency Response' : 'Ликвидация аварий на трубопроводах', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/pipeline-course' : 'https://horizon-llp.com/pipeline-course';
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
