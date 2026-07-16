import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'IOSH Managing Safely | Horizon LLP',
    description: 'Курс IOSH Managing Safely для руководителей — практические инструменты для управления рисками и ресурсами. Обучение в Казахстане.',
    ogTitle: 'IOSH Managing Safely — Безопасное управление',
  },
  en: {
    title: 'IOSH Managing Safely | Horizon LLP',
    description: 'IOSH Managing Safely course for managers — practical tools for risk and resource management. Delivered in Kazakhstan.',
    ogTitle: 'IOSH Managing Safely',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/ioshms' : 'ioshms';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'IOSH Managing Safely',
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
        { '@type': 'ListItem', position: 2, name: 'IOSH Managing Safely', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/ioshms' : 'https://horizon-llp.com/ioshms';
  const ruUrl = 'https://horizon-llp.com/ioshms';
  const enUrl = 'https://horizon-llp.com/en/ioshms';
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
