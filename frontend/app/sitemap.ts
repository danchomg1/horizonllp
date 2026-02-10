import { MetadataRoute } from 'next';
import { client } from './lib/sanity'; // Убедись, что путь к sanity client правильный

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://horizon-llp.com';

  // 1. ЗАПРОС ДЛЯ "КОРНЕВЫХ" СТРАНИЦ (Услуги, Курсы, О нас)
  // Мы берем все типы, которые обрабатываются в файле app/[slug]/page.tsx
  const rootPagesData = await client.fetch(`
    *[_type in [
      "consultingItem", 
      "emergencyItem", 
      "engineeringItem", 
      "ppeItem", 
      "aboutItem", 
      "course"
    ] && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  // 2. ЗАПРОС ДЛЯ НОВОСТЕЙ
  // Новости лежат отдельно в app/news/[slug]
  const newsData = await client.fetch(`
    *[_type == "news" && defined(slug.current)] {
      "slug": slug.current,
      publishedAt
    }
  `);

  // --- ГЕНЕРАЦИЯ ССЫЛОК ---

  // А. Генерация ссылок для Услуг и Курсов (Приоритет 0.8 - 0.9)
  const rootUrls = rootPagesData.map((item: any) => ({
    url: `${baseUrl}/${item.slug}`,
    lastModified: item._updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Б. Генерация ссылок для Новостей (Приоритет 0.7)
  const newsUrls = newsData.map((item: any) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: item.publishedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // В. Статические страницы (Главная и Контакты)
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1, // Главная - самая важная
    },
    {
      url: `${baseUrl}/contacts`, // Если страница контактов называется так
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Если есть отдельная страница списка новостей
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Возвращаем объединенный массив
  return [...staticUrls, ...rootUrls, ...newsUrls];
}