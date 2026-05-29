import type { Metadata } from 'next';
import JsonLd from '../../components/JsonLd';

const META = {
  ru: {
    title: 'Horizon University — корпоративная обучающая платформа',
    description: 'Horizon University — цифровая платформа для дистанционного обучения сотрудников по охране труда и промышленной безопасности. Контроль прогресса, сертификаты, офлайн-доступ.',
    keywords: [
      'Horizon University', 'корпоративное обучение', 'LMS платформа',
      'дистанционное обучение охрана труда', 'e-learning безопасность',
      'обучение персонала HSE', 'контроль обучения сотрудников',
      'офлайн обучение производство', 'сертификаты охрана труда',
      'учебная платформа Казахстан', 'Horizon LLP',
    ],
    ogTitle: 'Horizon University — обучающая платформа',
    ogDescription: 'Дистанционное обучение сотрудников по охране труда и промышленной безопасности. Контроль прогресса, сертификаты, офлайн-доступ для удалённых объектов.',
    twitterTitle: 'Horizon University — корпоративная обучающая платформа',
    twitterDescription: 'Обучение сотрудников по охране труда онлайн. Контроль прогресса, сертификаты, офлайн-доступ.',
  },
  en: {
    title: 'Horizon University — Corporate Learning Platform',
    description: 'Horizon University — digital platform for remote employee training in occupational health and industrial safety. Progress tracking, certificates, offline access.',
    keywords: [
      'Horizon University', 'corporate learning', 'LMS platform',
      'remote HSE training', 'e-learning safety',
      'employee training platform', 'HSE training management',
      'offline learning industrial', 'safety certificates',
      'learning platform Kazakhstan', 'Horizon LLP',
    ],
    ogTitle: 'Horizon University — Learning Platform',
    ogDescription: 'Remote employee training in occupational health and industrial safety. Progress tracking, certificates, offline access for remote sites.',
    twitterTitle: 'Horizon University — Corporate Learning Platform',
    twitterDescription: 'Employee HSE training online. Progress tracking, certificates, offline access.',
  },
};

const makeJsonLd = (isEn: boolean) => {
  const slug = isEn ? 'en/horizon-university' : 'horizon-university';
  const url = `https://horizon-llp.com/${slug}`;
  const m = isEn ? META.en : META.ru;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Horizon University',
      description: m.description,
      url,
      applicationCategory: 'EducationApplication',
      operatingSystem: 'Web, Android, iOS',
      inLanguage: isEn ? 'en' : 'ru',
      provider: {
        '@type': 'Organization',
        name: 'Horizon LLP',
        url: 'https://horizon-llp.com',
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Horizon LLP' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isEn ? 'Home' : 'Главная',
          item: isEn ? 'https://horizon-llp.com/en' : 'https://horizon-llp.com',
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
  const isEn = locale === 'en';
  const m = isEn ? META.en : META.ru;
  const canonical = isEn
    ? 'https://horizon-llp.com/en/horizon-university'
    : 'https://horizon-llp.com/horizon-university';

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical,
      languages: {
        ru: 'https://horizon-llp.com/horizon-university',
        en: 'https://horizon-llp.com/en/horizon-university',
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'Horizon LLP',
      locale: isEn ? 'en_US' : 'ru_RU',
      title: m.ogTitle,
      description: m.ogDescription,
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Horizon University' }],
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
      <JsonLd data={makeJsonLd(locale === 'en')} />
      {children}
    </>
  );
}
