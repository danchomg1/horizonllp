import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'РЛАМ — Руководитель ликвидации аварии на месте',
    description: 'Курс РЛАМ — практическая подготовка руководителей аварийного реагирования на основе международных стандартов UK Fire & Rescue и Incident Command System.',
    ogTitle: 'РЛАМ — Руководитель ликвидации аварии на месте',
  },
  en: {
    title: 'Incident Command at Scene',
    description: 'Incident Command at Scene course — practical training for emergency response commanders based on UK Fire & Rescue and Incident Command System international standards.',
    ogTitle: 'Incident Command at Scene',
  },
  kz: {
    title: 'АЖБ — авария орнындағы жою жетекшісі',
    description: 'АЖБ курсы — UK Fire & Rescue және Incident Command System халықаралық стандарттары негізінде авариялық ден қою басшыларын практикалық дайындау.',
    ogTitle: 'АЖБ — авария орнындағы жою жетекшісі',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/rlam');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: pick({ ru: 'РЛАМ — Руководитель ликвидации аварии на месте', en: 'Incident Command at Scene', kz: 'АЖБ — авария орнындағы жою жетекшісі' }, locale),
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
        { '@type': 'ListItem', position: 2, name: pick({ ru: 'РЛАМ', en: 'Incident Command at Scene', kz: 'АЖБ' }, locale), item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/rlam';
  const enUrl = 'https://horizon-llp.com/en/rlam';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/rlam'),
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
