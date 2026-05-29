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

  // В. Базовые статические страницы (Главная, Контакты и список новостей)
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1, // Главная - самая важная
    },
    {
      url: `${baseUrl}/contacts`, 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Г. НОВЫЕ СТАТИЧЕСКИЕ СТРАНИЦЫ ИЗ ПАПОК
  // Сюда просто дописывай названия новых папок в кавычках, если будешь создавать еще
  const staticFolders = [
    'diagnostika-biot',
    'iosh-vs',
    'iosh-working-safely',
    'ioshms',
    'nebosh-igc',
    'neboship',
    'neboshlp',
    'neboshpsm',
    'neboshraw',
    'neboshstress',
    'neboshwellbeing',
    'nocn-aicir',
    'pipeline-course',
    'rlam',
    'rospa_def',
    'sistemy-menedzhmenta',
    'horizon-university',
  ];

  // Автоматически превращаем список папок в формат ссылок для карты сайта
  const folderUrls = staticFolders.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Возвращаем объединенный массив из всех 4 блоков
  return [...staticUrls, ...folderUrls, ...rootUrls, ...newsUrls];
}