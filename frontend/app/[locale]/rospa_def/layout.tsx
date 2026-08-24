import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'RoSPA Level 2 Defensive Driving',
    description: 'Программа RoSPA Level 2 Defensive Driving — курс безопасного вождения для специалистов нефтегазового и промышленного секторов. Снижение риска дорожных инцидентов.',
    ogTitle: 'RoSPA Level 2 Defensive Driving',
  },
  en: {
    title: 'RoSPA Level 2 Defensive Driving',
    description: 'RoSPA Level 2 Defensive Driving programme — safe driving course for oil & gas and industrial sector specialists. Reducing road incident risk.',
    ogTitle: 'RoSPA Level 2 Defensive Driving',
  },
  kz: {
    title: 'RoSPA Level 2 Defensive Driving',
    description: 'RoSPA Level 2 Defensive Driving бағдарламасы — мұнай-газ және өнеркәсіп саласы мамандарына арналған қауіпсіз көлік жүргізу курсы. Жол оқиғалары қаупін азайту.',
    ogTitle: 'RoSPA Level 2 Defensive Driving',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/rospa_def');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'RoSPA Level 2 Defensive Driving',
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
        { '@type': 'ListItem', position: 2, name: 'RoSPA Defensive Driving', item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/rospa_def';
  const enUrl = 'https://horizon-llp.com/en/rospa_def';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/rospa_def'),
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
