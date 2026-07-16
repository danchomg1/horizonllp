import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'NEBOSH Award in Managing Risks and Risk Assessment at Work | Horizon LLP',
    description: 'Однодневный курс NEBOSH и HSE по практической оценке рисков на рабочем месте. Лучшие международные практики управления производственными рисками.',
    ogTitle: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
  },
  en: {
    title: 'NEBOSH Award in Managing Risks and Risk Assessment at Work | Horizon LLP',
    description: 'One-day NEBOSH and HSE course on practical workplace risk assessment. International best practices in managing occupational risks.',
    ogTitle: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/neboshraw' : 'neboshraw';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
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
        { '@type': 'ListItem', position: 2, name: 'NEBOSH Risk Assessment', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/neboshraw' : 'https://horizon-llp.com/neboshraw';
  const ruUrl = 'https://horizon-llp.com/neboshraw';
  const enUrl = 'https://horizon-llp.com/en/neboshraw';
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
