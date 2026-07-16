import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'IOSH Working Safely | Horizon LLP',
    description: 'Курс IOSH Working Safely — базовые знания по безопасности для сотрудников любого уровня. Простой и практичный курс от международной организации IOSH.',
    ogTitle: 'IOSH Working Safely',
  },
  en: {
    title: 'IOSH Working Safely | Horizon LLP',
    description: 'IOSH Working Safely course — foundational safety knowledge for employees at all levels. A practical and accessible course from the international body IOSH.',
    ogTitle: 'IOSH Working Safely',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/iosh-working-safely' : 'iosh-working-safely';
  const url = `https://horizon-llp.com/${slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'IOSH Working Safely',
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
        { '@type': 'ListItem', position: 2, name: 'IOSH Working Safely', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn ? 'https://horizon-llp.com/en/iosh-working-safely' : 'https://horizon-llp.com/iosh-working-safely';
  const ruUrl = 'https://horizon-llp.com/iosh-working-safely';
  const enUrl = 'https://horizon-llp.com/en/iosh-working-safely';
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
