import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'РУБЕЖ — Аварийное реагирование',
    description: 'Курс РУБЕЖ (Asset Incident Commander – Initial Response) — подготовка руководителей первоначального реагирования на производственные аварии.',
    ogTitle: 'РУБЕЖ — Asset Incident Commander – Initial Response',
  },
  en: {
    title: 'РУБЕЖ — Emergency Response Training',
    description: 'РУБЕЖ (Asset Incident Commander – Initial Response) course — training initial response commanders for industrial emergencies.',
    ogTitle: 'РУБЕЖ — Asset Incident Commander – Initial Response',
  },
  kz: {
    title: 'РУБЕЖ — авариялық ден қою',
    description: 'РУБЕЖ курсы (Asset Incident Commander – Initial Response) — өндірістік авариялар кезінде бастапқы ден қою басшыларын дайындау.',
    ogTitle: 'РУБЕЖ — Asset Incident Commander – Initial Response',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/nocn-aicir');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'РУБЕЖ — Первичные действия руководителя штаба при крупных технологических авариях',
      description: pick(META, locale).description,
      url,
      courseMode: ['onsite'],
      inLanguage: HREFLANG[normalizeLocale(locale)],
      provider: { '@type': 'Organization', name: 'Horizon LLP', url: 'https://horizon-llp.com' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: pick({ ru: 'Главная', en: 'Home', kz: 'Басты бет' }, locale), item: localeUrl(locale) },
        { '@type': 'ListItem', position: 2, name: 'РУБЕЖ', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/nocn-aicir';
  const enUrl = 'https://horizon-llp.com/en/nocn-aicir';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/nocn-aicir'),
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
