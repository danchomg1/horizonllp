import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'RoSPA Level 2 Defensive Driving | Horizon LLP',
    description: 'Программа RoSPA Level 2 Defensive Driving — курс безопасного вождения для специалистов нефтегазового и промышленного секторов. Снижение риска дорожных инцидентов.',
    ogTitle: 'RoSPA Level 2 Defensive Driving',
  },
  en: {
    title: 'RoSPA Level 2 Defensive Driving | Horizon LLP',
    description: 'RoSPA Level 2 Defensive Driving programme — safe driving course for oil & gas and industrial sector specialists. Reducing road incident risk.',
    ogTitle: 'RoSPA Level 2 Defensive Driving',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/rospa_def' : 'rospa_def';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'RoSPA Level 2 Defensive Driving',
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
        { '@type': 'ListItem', position: 2, name: 'RoSPA Defensive Driving', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/rospa_def' : 'https://horizon-llp.com/rospa_def';
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
