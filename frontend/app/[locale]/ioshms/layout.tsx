import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'IOSH Managing Safely',
    description: 'Курс IOSH Managing Safely для руководителей — практические инструменты для управления рисками и ресурсами. Обучение в Казахстане.',
    ogTitle: 'IOSH Managing Safely — Безопасное управление',
  },
  en: {
    title: 'IOSH Managing Safely',
    description: 'IOSH Managing Safely course for managers — practical tools for risk and resource management. Delivered in Kazakhstan.',
    ogTitle: 'IOSH Managing Safely',
  },
  kz: {
    title: 'IOSH Managing Safely',
    description: 'Басшыларға арналған IOSH Managing Safely курсы — қауіптер мен ресурстарды басқарудың практикалық құралдары. Қазақстанда оқыту.',
    ogTitle: 'IOSH Managing Safely — қауіпсіз басқару',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/ioshms');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'IOSH Managing Safely',
      description: pick(META, locale).description,
      url,
      courseMode: ['onsite', 'online'],
      inLanguage: HREFLANG[normalizeLocale(locale)],
      provider: { '@type': 'Organization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: pick({ ru: 'Главная', en: 'Home', kz: 'Басты бет' }, locale), item: localeUrl(locale) },
        { '@type': 'ListItem', position: 2, name: 'IOSH Managing Safely', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/ioshms';
  const enUrl = 'https://horizon-llp.com/en/ioshms';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/ioshms'),
    openGraph: { title: m.ogTitle, description: m.description, images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Horizon LLP' }] },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={makeJsonLd(locale)} />
      {children}
    </>
  );
}
