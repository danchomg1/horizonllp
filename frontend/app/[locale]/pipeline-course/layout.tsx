import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale } from '../../lib/locale';

const META = {
  ru: {
    title: 'Ликвидация аварий на трубопроводах',
    description: 'Практический курс по локализации и устранению аварий на трубопроводах для аварийно-спасательных служб и специалистов нефтегазового сектора.',
    ogTitle: 'Ликвидация аварий на трубопроводах — практическая подготовка АСС',
  },
  en: {
    title: 'Pipeline Emergency Response',
    description: 'Practical course in localising and responding to pipeline emergencies for emergency services and oil & gas sector specialists.',
    ogTitle: 'Pipeline Emergency Response',
  },
  kz: {
    title: 'Құбырлардағы аварияларды жою',
    description: 'Құбырлардағы аварияларды оқшаулау және жою бойынша практикалық курс — авариялық-құтқару қызметтері мен мұнай-газ саласы мамандарына арналған.',
    ogTitle: 'Құбырлардағы аварияларды жою — АҚҚ практикалық дайындығы',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/pipeline-course');
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: pick({ ru: 'Ликвидация аварий на трубопроводах', en: 'Pipeline Emergency Response', kz: 'Құбырлардағы аварияларды жою' }, locale),
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
        { '@type': 'ListItem', position: 2, name: pick({ ru: 'Ликвидация аварий на трубопроводах', en: 'Pipeline Emergency Response', kz: 'Құбырлардағы аварияларды жою' }, locale), item: url },
      ],
    },
  ];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const ruUrl = 'https://horizon-llp.com/pipeline-course';
  const enUrl = 'https://horizon-llp.com/en/pipeline-course';
  return {
    title: m.title,
    description: m.description,
    alternates: alternatesFor(locale, '/pipeline-course'),
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
