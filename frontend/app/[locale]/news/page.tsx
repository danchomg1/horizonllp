import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '../../lib/sanity';
import NewsList from '../../components/NewsList';

async function getNews(locale: string) {
  const isEn = locale === 'en';
  const query = isEn
    ? `*[_type == "news" && defined(slug.current) && defined(titleEn) && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...40] {
        _id, title, titleEn, slug, publishedAt, mainImage, description, descriptionEn
      }`
    : `*[_type == "news" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...40] {
        _id, title, slug, publishedAt, mainImage, description
      }`;
  return client.fetch(query, {}, { next: { revalidate: 10 } });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('News');
  const news = await getNews(locale);
  const isEn = locale === 'en';

  const normalizedNews = isEn
    ? news.map((item: any) => ({
        ...item,
        title: item.titleEn || item.title,
        description: item.descriptionEn || item.description,
      }))
    : news;

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <div className="h-[100px]" />
      <main className="w-full max-w-[1250px] mx-auto px-4 py-8">
        <h1 className="text-[36px] font-bold text-[#0B0073] mb-10">{t('pageTitle')}</h1>
        <NewsList initialNews={normalizedNews} />
      </main>
    </div>
  );
}
