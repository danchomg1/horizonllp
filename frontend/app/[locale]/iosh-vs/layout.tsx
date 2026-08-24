import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'IOSH Vision Zero',
    description: 'Курс IOSH Vision Zero — внедрение концепции нулевого травматизма. Разработан IOSH совместно с ISSA для руководителей и специалистов по охране труда.',
    ogTitle: 'IOSH Vision Zero — Концепция нулевого травматизма',
  },
  en: {
    title: 'IOSH Vision Zero',
    description: 'IOSH Vision Zero course — implementing the zero harm concept. Developed by IOSH in partnership with ISSA for managers and health and safety professionals.',
    ogTitle: 'IOSH Vision Zero — Zero Harm Concept',
  },
  kz: {
    title: 'IOSH Vision Zero',
    description: 'IOSH Vision Zero курсы — нөлдік жарақаттану тұжырымдамасын енгізу. IOSH пен ISSA бірлесіп әзірлеген, басшылар мен еңбекті қорғау мамандарына арналған.',
    ogTitle: 'IOSH Vision Zero — нөлдік жарақаттану тұжырымдамасы',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/iosh-vs');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'IOSH Vision Zero',
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
        { '@type': 'ListItem', position: 2, name: 'IOSH Vision Zero', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/iosh-vs';
  const enUrl = 'https://horizon-llp.com/en/iosh-vs';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/iosh-vs'),
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
