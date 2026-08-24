import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { client } from '../../lib/sanity';
import NewsList from '../../components/NewsList';
import { loc, pick, alternatesFor } from '../../lib/locale';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = pick({
    ru: 'События и новости',
    en: 'News & Events',
    kz: 'Жаңалықтар мен оқиғалар',
  }, locale);
  return {
    title,
    description: pick({
      ru: 'Последние новости, события и обновления от Horizon LLP — учебного центра по охране труда и промышленной безопасности в Казахстане.',
      en: 'Latest news, events and updates from Horizon LLP — health, safety and environment training centre in Kazakhstan.',
      kz: 'Horizon LLP жаңалықтары мен оқиғалары — Қазақстандағы еңбекті қорғау және өнеркәсіптік қауіпсіздік оқу орталығы.',
    }, locale),
    alternates: alternatesFor(locale, '/news'),
    openGraph: {
      title,
      description: pick({
        ru: 'Последние новости и события Horizon LLP.',
        en: 'Latest news and events from Horizon LLP.',
        kz: 'Horizon LLP соңғы жаңалықтары мен оқиғалары.',
      }, locale),
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Horizon LLP' }],
    },
  };
}

async function getNews() {
  return client.fetch(
    `*[_type == "news" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...40] {
      _id, title, titleEn, titleKz, slug, publishedAt, mainImage,
      description, descriptionEn, descriptionKz
    }`,
    {},
    { next: { revalidate: 10 } }
  );
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('News');
  const news = await getNews();
  const normalizedNews = news.map((item: any) => ({
    ...item,
    title: loc(item, 'title', locale),
    description: loc(item, 'description', locale),
  }));

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <div className="h-[100px]" />
      <main className="w-full max-w-[1250px] mx-auto px-4 py-8">
        <h1 className="text-[36px] font-bold text-[#0B0073] mb-10">{t('pageTitle')}</h1>
        <NewsList initialNews={normalizedNews} locale={locale} />
      </main>
    </div>
  );
}
