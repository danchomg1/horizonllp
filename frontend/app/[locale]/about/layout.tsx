import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'О компании',
    description: 'Horizon LLP — казахстанский учебный центр в области охраны труда и промышленной безопасности. Официальный партнёр NEBOSH, IOSH, RoSPA и CompEx.',
    ogTitle: 'О компании Horizon LLP',
  },
  en: {
    title: 'About Us',
    description: 'Horizon LLP — Kazakhstan-based training centre in occupational health and industrial safety. Official partner of NEBOSH, IOSH, RoSPA and CompEx.',
    ogTitle: 'About Horizon LLP',
  },
  kz: {
    title: 'Компания туралы',
    description: 'Horizon LLP — еңбекті қорғау және өнеркәсіптік қауіпсіздік саласындағы қазақстандық оқу орталығы. NEBOSH, IOSH, RoSPA және CompEx ресми серіктесі.',
    ogTitle: 'Horizon LLP компаниясы туралы',
  },
};

const jsonLdRu = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'О компании Horizon LLP',
    description: META.ru.description,
    url: 'https://horizon-llp.com/about',
    mainEntity: { '@type': 'EducationalOrganization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://horizon-llp.com' },
      { '@type': 'ListItem', position: 2, name: 'О компании', item: 'https://horizon-llp.com/about' },
    ],
  },
];

const jsonLdEn = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Horizon LLP',
    description: META.en.description,
    url: 'https://horizon-llp.com/en/about',
    mainEntity: { '@type': 'EducationalOrganization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://horizon-llp.com/en' },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://horizon-llp.com/en/about' },
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/about';
  const enUrl = 'https://horizon-llp.com/en/about';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/about'),
    openGraph: { title: m.ogTitle, description: m.description, images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Horizon LLP' }] },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={locale === 'en' ? jsonLdEn : jsonLdRu} />
      {children}
    </>
  );
}
