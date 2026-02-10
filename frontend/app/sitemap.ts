import { MetadataRoute } from 'next';
import { client } from './lib/sanity'; // Проверь путь

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://horizon-llp.com';

  // 1. Получаем все новости
  const news = await client.fetch(`*[_type == "news"]{ "slug": slug.current, publishedAt }`);
  
  // 2. Получаем все курсы (или категории, смотря какая у тебя структура url)
  // Допустим, у курсов тоже есть slug
  const courses = await client.fetch(`*[_type == "course"]{ "slug": slug.current, _updatedAt }`);

  // 3. Формируем массив для новостей
  const newsUrls = news.map((item: any) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: item.publishedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 4. Формируем массив для курсов
  const courseUrls = courses.map((item: any) => ({
    url: `${baseUrl}/courses/${item.slug}`, // Или просто /${item.slug}, как у тебя настроено
    lastModified: item._updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.9, // Курсы важнее новостей!
  }));

  // 5. Возвращаем общий список (Главная + Статика + Динамика)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...newsUrls,
    ...courseUrls,
  ];
}