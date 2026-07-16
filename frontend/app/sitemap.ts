import { MetadataRoute } from 'next';
import { client } from './lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://horizon-llp.com';

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

  const newsData = await client.fetch(`
    *[_type == "news" && defined(slug.current)] {
      "slug": slug.current,
      publishedAt
    }
  `);

  // Static folders (hardcoded pages)
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

  // Root static pages
  const staticUrls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/en/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/en/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];

  // Hardcoded static pages + EN versions
  const folderUrls: MetadataRoute.Sitemap = staticFolders.flatMap((slug) => [
    { url: `${baseUrl}/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/en/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ]);

  // Dynamic Sanity pages + EN versions
  const rootUrls: MetadataRoute.Sitemap = rootPagesData.flatMap((item: any) => [
    { url: `${baseUrl}/${item.slug}`, lastModified: item._updatedAt || new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/en/${item.slug}`, lastModified: item._updatedAt || new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ]);

  // News articles + EN versions
  const newsUrls: MetadataRoute.Sitemap = newsData.flatMap((item: any) => [
    { url: `${baseUrl}/news/${item.slug}`, lastModified: item.publishedAt || new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/en/news/${item.slug}`, lastModified: item.publishedAt || new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
  ]);

  return [...staticUrls, ...folderUrls, ...rootUrls, ...newsUrls];
}
