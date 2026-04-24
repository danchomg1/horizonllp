import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Блок редиректов (перенаправлений)
  async redirects() {

// 1. СПИСОК ССЫЛОК ДЛЯ ГЛАВНОЙ
    // Просто добавляй сюда любые старые адреса через запятую
    const oldLinksToHome = [
      '/training',
      '/landing',
      '/portfolio/obuchenieohranetruda',
      '/contact-3',
      '/compulsory-courses',
      '/scaffoldinginspector-landing',
      '/6179-2',
      '/3401-2',
      '/behavior-motivation',
      '/nebosh-psm',
      '/nebosh-process-safety-management',
      '/contact-2',
      '/en/contacts',
      '/blog-2',
      '/bez-rubriki',
      '/issledovanija-hazid',
      '/закончился-курс-nebosh',
      '/on-job-training',
      '/horizon-university',
      '/отечественное-производство-спецодеж',
      '/en/elementor-4810',
      '/kimax-abek2-p3r',
      '/hse-e-service',
      '/hse-undercover-2',
      '/craft-skills',
      '/o-nas-3',
      '/o-nas-2',
      '/en/about-us-2',
      '/portfolio/kursy-professionalno-tehnicheskoj-podgotovki',

    ];

    return [
      // www → без www (301 permanent)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.horizon-llp.com' }],
        destination: 'https://horizon-llp.com/:path*',
        permanent: true,
      },

      //1. NEBOSH
      {
        source: '/nebosh-landing',   // Старый адрес (откуда)
        destination: '/nebosh-igc',  // Новый адрес (куда)
        permanent: true,             // true = 301 редирект (говорит Гуглу: "Я переехал навсегда")
      },

      //2. блог - на новости
      {
        source: '/blog',
        destination: '/news',
        permanent: true,
      },

      //rospa - level-2
      {
        source: '/rospa',
        destination: '/level-2-defensive-driving-iogp',
        permanent: true,
      },

      //konsalting - kultura-i-liderstvo
      {
        source: '/konsalting',
        destination: '/kultura-i-liderstvo',
        permanent: true,
      },

       //iosh
      {
        source: '/iosh-landing',
        destination: '/iosh-working-safely',
        permanent: true,
      },
      
      //hse-undercover
      {
        source: '/hse-undercover',
        destination: '/tekhnologicheskaya-bezopasnost',
        permanent: true,
      },

      //safety-culture
      {
        source: '/safety-culture',
        destination: '/kultura-i-liderstvo',
        permanent: true,
      },

      //en/nebosh
      {
        source: '/en/nebosh',
        destination: '/nebosh-igc',
        permanent: true,
      },
      // compex-landing
      {
        source: '/compex-landing',
        destination: '/compex-01-04',
        permanent: true,
      },
     // avarijnoe-reagirovanie
      {
        source: '/portfolio/avarijnoe-reagirovanie',
        destination: '/razrabotka-sistem-upr-avariyami',
        permanent: true,
      },
     // nebosh-iogc
      {
        source: '/nebosh-iogc',
        destination: '/nebosh-igc',
        permanent: true,
      },
     // latestpostt
      {
        source: '/latestpostt',
        destination: '/news',
        permanent: true,
      },

         // en/compex-ex01-04
      {
        source: '/en/compex-ex01-04',
        destination: '/compex-01-04',
        permanent: true,
      },
   
         // en/iosh-managing-safely
      {
        source: '/en/iosh-managing-safely',
        destination: '/iosh-managing-safely',
        permanent: true,
      },

         // корпоративное-обучение-лидерство-бе
      {
        source: '/корпоративное-обучение-лидерство-бе',
        destination: '/kultura-i-liderstvo',
        permanent: true,
      },

         // zashhita-jelektroustanovok-vo-vzryvoop
      {
        source: '/zashhita-jelektroustanovok-vo-vzryvoop',
        destination: '/inspekcii-i-remont-iecex',
        permanent: true,
      },

      // portfolio/compex-01-04
      {
        source: '/portfolio/compex-01-04',
        destination: '/compex-01-04',
        permanent: true,
      },

      // portfolio/iosh-managing-safely
      {
        source: '/portfolio/iosh-managing-safely',
        destination: '/iosh-managing-safely',
        permanent: true,
      },
      // portfolio/inspekcii-vzryvozashhishhennogo-jelektro
      {
        source: '/portfolio/inspekcii-vzryvozashhishhennogo-jelektro',
        destination: '/inspekcii-i-remont-iecex',
        permanent: true,
      },

      // documentation/inspekcii-vzryvozashhishhennogo-jelektro
      {
        source: '/documentation/inspekcii-vzryvozashhishhennogo-jelektro',
        destination: '/inspekcii-i-remont-iecex',
        permanent: true,
      },

            // portfolio/audit-sistemy-avarijnogo-reagirovan
      {
        source: '/portfolio/audit-sistemy-avarijnogo-reagirovan',
        destination: '/audit-sistemy-upr-avariyami-i-chs',
        permanent: true,
      },


      // https://www.horizon-llp.com/iosh-managing-safely
      {
        source: '/iosh-managing-safely',
        destination: '/ioshms',
        permanent: true,
      },


      // https://horizon-llp.com/portfolio/iosh-managing-safely/
      {
        source: '/portfolio/iosh-managing-safely/',
        destination: '/ioshms',
        permanent: true,
      },

      // https://horizon-llp.com/kompanija-jt-limited-i-ih-produkt-compex01-04-gaz-i-par/
      {
        source: '/kompanija-jt-limited-i-ih-produkt-compex01-04-gaz-i-par/',
        destination: '/compex-01-04',
        permanent: true,
      },



// Б. А вот тут мы "распаковываем" наш список на Главную
      // (Этот код сам создаст правила для каждой ссылки из списка выше)
      ...oldLinksToHome.map((path) => ({
        source: path,
        destination: '/',
        permanent: true,
      })),

    ];
  },
};

export default nextConfig;