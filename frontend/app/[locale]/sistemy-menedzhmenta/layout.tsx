import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'Системы менеджмента ISO 9001, 14001, 45001 | Horizon LLP',
    description: 'Разработка и внедрение интегрированных систем менеджмента по стандартам ISO 9001, ISO 14001 и ISO 45001. Диагностика, разработка документации, сопровождение.',
    ogTitle: 'Системы менеджмента ISO 9001, ISO 14001, ISO 45001',
  },
  en: {
    title: 'ISO 9001, 14001, 45001 Management Systems | Horizon LLP',
    description: 'Development and implementation of integrated management systems to ISO 9001, ISO 14001 and ISO 45001 standards. Diagnostics, documentation development and ongoing support.',
    ogTitle: 'ISO 9001, ISO 14001, ISO 45001 Management Systems',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/sistemy-menedzhmenta' : 'sistemy-menedzhmenta';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: isEn ? 'ISO 9001, 14001, 45001 Management Systems' : 'Системы менеджмента ISO 9001, ISO 14001, ISO 45001',
      description: isEn ? META.en.description : META.ru.description,
      url,
      serviceType: 'Management Systems Consulting',
      areaServed: { '@type': 'Country', name: 'Kazakhstan' },
      provider: { '@type': 'Organization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Главная', item: isEn ? 'https://horizon-llp.com/en' : 'https://horizon-llp.com' },
        { '@type': 'ListItem', position: 2, name: isEn ? 'Management Systems ISO' : 'Системы менеджмента ISO', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/sistemy-menedzhmenta' : 'https://horizon-llp.com/sistemy-menedzhmenta';
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
