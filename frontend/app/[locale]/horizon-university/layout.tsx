import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';
import { pick, alternatesFor, localeUrl, HREFLANG, normalizeLocale, OG_LOCALE } from '../../lib/locale';

const META = {
  ru: {
    title: 'Horizon University — LMS для обучения сотрудников в Казахстане',
    description: 'Horizon University — цифровая платформа для дистанционного обучения сотрудников по охране труда и промышленной безопасности. Курсы под задачи компании, адаптация новичков и контроль прогресса.',
    keywords: [
      'Horizon University', 'корпоративное обучение', 'LMS платформа',
      'дистанционное обучение охрана труда', 'e-learning безопасность',
      'обучение персонала HSE', 'контроль обучения сотрудников',
      'сертификаты охрана труда',
      'учебная платформа Казахстан', 'Horizon LLP',
    ],
    ogTitle: 'Horizon University — обучающая платформа',
    ogDescription: 'Дистанционное обучение сотрудников по охране труда и промышленной безопасности. Курсы под задачи компании, адаптация новичков и контроль прогресса.',
    twitterTitle: 'Horizon University — корпоративная обучающая платформа',
    twitterDescription: 'Обучение сотрудников по охране труда онлайн. Курсы под задачи компании, адаптация новичков и контроль прогресса.',
  },
  en: {
    title: 'Horizon University — Corporate Learning Platform',
    description: 'Horizon University — digital platform for remote employee training in occupational health and industrial safety. Custom courses, employee onboarding and progress tracking.',
    keywords: [
      'Horizon University', 'corporate learning', 'LMS platform',
      'remote HSE training', 'e-learning safety',
      'employee training platform', 'HSE training management',
      'safety certificates',
      'learning platform Kazakhstan', 'Horizon LLP',
    ],
    ogTitle: 'Horizon University — Learning Platform',
    ogDescription: 'Remote employee training in occupational health and industrial safety. Custom courses, employee onboarding and progress tracking.',
    twitterTitle: 'Horizon University — Corporate Learning Platform',
    twitterDescription: 'Employee HSE training online. Custom courses, employee onboarding and progress tracking.',
  },
  kz: {
    title: 'Horizon University — корпоративтік оқу платформасы',
    description: 'Horizon University — қызметкерлерді еңбекті қорғау және өнеркәсіптік қауіпсіздік бойынша қашықтан оқытуға арналған цифрлық платформа. Компанияға арналған курстар, қызметкерлерді бейімдеу және үлгерімді бақылау.',
    keywords: [
      'Horizon University', 'корпоративтік оқыту', 'LMS платформа',
      'еңбекті қорғау қашықтан оқыту', 'e-learning қауіпсіздік',
      'қызметкерлерді оқыту платформасы', 'еңбекті қорғау сертификаттары',
      'оқу платформасы Қазақстан', 'Horizon LLP',
    ],
    ogTitle: 'Horizon University — оқу платформасы',
    ogDescription: 'Қызметкерлерді еңбекті қорғау және өнеркәсіптік қауіпсіздік бойынша қашықтан оқыту. Компанияға арналған курстар, қызметкерлерді бейімдеу және үлгерімді бақылау.',
    twitterTitle: 'Horizon University — корпоративтік оқу платформасы',
    twitterDescription: 'Қызметкерлерді еңбекті қорғау бойынша онлайн оқыту. Компанияға арналған курстар, қызметкерлерді бейімдеу және үлгерімді бақылау.',
  },
};

const makeJsonLd = (locale: string) => {
  const url = localeUrl(locale, '/horizon-university');
  const m = pick(META, locale);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Horizon University',
      description: m.description,
      url,
      applicationCategory: 'EducationApplication',
      operatingSystem: 'Any operating system with a modern web browser',
      inLanguage: HREFLANG[normalizeLocale(locale)],
      provider: {
        '@type': 'Organization',
        name: 'Horizon LLP',
        url: 'https://horizon-llp.com',
      },

    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: pick({ ru: 'Главная', en: 'Home', kz: 'Басты бет' }, locale),
          item: localeUrl(locale),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Horizon University',
          item: url,
        },
      ],
    },
  ];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = pick(META, locale);
  const canonical = localeUrl(locale, '/horizon-university');

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: alternatesFor(locale, '/horizon-university'),
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'Horizon LLP',
      locale: OG_LOCALE[normalizeLocale(locale)],
      title: m.ogTitle,
      description: m.ogDescription,
      images: [{ url: '/assets/horizon-university/home-learning-blue.webp', alt: 'Horizon University' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.twitterTitle,
      description: m.twitterDescription,
      images: ['/og.jpg'],
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <JsonLd data={makeJsonLd(locale)} />
      {children}
    </>
  );
}
