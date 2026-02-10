import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Запрещаем индексировать админку
    },
    sitemap: 'https://horizon-llp.com/sitemap.xml',
  };
}