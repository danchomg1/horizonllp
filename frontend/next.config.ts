import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async redirects() {
    const oldLinksToHome = [
      '/training', '/landing', '/portfolio/obuchenieohranetruda', '/contact-3',
      '/compulsory-courses', '/scaffoldinginspector-landing', '/6179-2', '/3401-2',
      '/behavior-motivation', '/nebosh-psm', '/nebosh-process-safety-management',
      '/contact-2', '/blog-2', '/bez-rubriki', '/issledovanija-hazid',
      '/закончился-курс-nebosh', '/on-job-training',
      '/отечественное-производство-спецодеж', '/kimax-abek2-p3r', '/hse-e-service',
      '/hse-undercover-2', '/craft-skills', '/o-nas-3', '/o-nas-2',
      '/portfolio/kursy-professionalno-tehnicheskoj-podgotovki',
    ];

    return [
      { source: '/:path*', has: [{ type: 'host', value: 'www.horizon-llp.com' }], destination: 'https://horizon-llp.com/:path*', permanent: true },
      { source: '/nebosh-landing', destination: '/ru/nebosh-igc', permanent: true },
      { source: '/blog', destination: '/ru/news', permanent: true },
      { source: '/rospa', destination: '/ru/level-2-defensive-driving-iogp', permanent: true },
      { source: '/konsalting', destination: '/ru/kultura-i-liderstvo', permanent: true },
      { source: '/iosh-landing', destination: '/ru/iosh-working-safely', permanent: true },
      { source: '/hse-undercover', destination: '/ru/tekhnologicheskaya-bezopasnost', permanent: true },
      { source: '/safety-culture', destination: '/ru/kultura-i-liderstvo', permanent: true },
      { source: '/en/nebosh', destination: '/en/nebosh-igc', permanent: true },
      { source: '/en/contacts', destination: '/en', permanent: true },
      { source: '/en/elementor-4810', destination: '/en', permanent: true },
      { source: '/en/about-us-2', destination: '/en/about', permanent: true },
      { source: '/compex-landing', destination: '/ru/compex-01-04', permanent: true },
      { source: '/portfolio/avarijnoe-reagirovanie', destination: '/ru/razrabotka-sistem-upr-avariyami', permanent: true },
      { source: '/nebosh-iogc', destination: '/ru/nebosh-igc', permanent: true },
      { source: '/latestpostt', destination: '/ru/news', permanent: true },
      { source: '/en/compex-ex01-04', destination: '/en/compex-01-04', permanent: true },
      { source: '/en/iosh-managing-safely', destination: '/en/ioshms', permanent: true },
      { source: '/корпоративное-обучение-лидерство-бе', destination: '/ru/kultura-i-liderstvo', permanent: true },
      { source: '/zashhita-jelektroustanovok-vo-vzryvoop', destination: '/ru/inspekcii-i-remont-iecex', permanent: true },
      { source: '/portfolio/compex-01-04', destination: '/ru/compex-01-04', permanent: true },
      { source: '/portfolio/iosh-managing-safely', destination: '/ru/ioshms', permanent: true },
      { source: '/portfolio/inspekcii-vzryvozashhishhennogo-jelektro', destination: '/ru/inspekcii-i-remont-iecex', permanent: true },
      { source: '/documentation/inspekcii-vzryvozashhishhennogo-jelektro', destination: '/ru/inspekcii-i-remont-iecex', permanent: true },
      { source: '/portfolio/audit-sistemy-avarijnogo-reagirovan', destination: '/ru/audit-sistemy-upr-avariyami-i-chs', permanent: true },
      { source: '/iosh-managing-safely', destination: '/ru/ioshms', permanent: true },
      { source: '/portfolio/iosh-managing-safely/', destination: '/ru/ioshms', permanent: true },
      { source: '/kompanija-jt-limited-i-ih-produkt-compex01-04-gaz-i-par/', destination: '/ru/compex-01-04', permanent: true },
      ...oldLinksToHome.map((path) => ({ source: path, destination: '/ru', permanent: true })),
    ];
  },
};

export default withNextIntl(nextConfig);
