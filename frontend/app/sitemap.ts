import { MetadataRoute } from 'next';
import { client } from './lib/sanity';
import { LOCALES, localeUrl } from './lib/locale';

type Entry = MetadataRoute.Sitemap[number];

/** Один и тот же путь во всех языковых версиях. */
function forAllLocales(
  path: string,
  lastModified: Date | string,
  changeFrequency: NonNullable<Entry['changeFrequency']>,
  priority: number,
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified,
    changeFrequency,
    priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

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

  // Страницы, свёрстанные кодом
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

  return [
    ...forAllLocales('', now, 'yearly', 1),
    ...forAllLocales('/news', now, 'daily', 0.8),
    ...forAllLocales('/about', now, 'monthly', 0.9),

    ...staticFolders.flatMap((slug) => forAllLocales(`/${slug}`, now, 'monthly', 0.8)),

    ...rootPagesData.flatMap((item: any) =>
      forAllLocales(`/${item.slug}`, item._updatedAt || now, 'monthly', 0.8),
    ),

    ...newsData.flatMap((item: any) =>
      forAllLocales(`/news/${item.slug}`, item.publishedAt || now, 'weekly', 0.7),
    ),
  ];
}
