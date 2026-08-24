import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client, urlFor } from '../../../lib/sanity';
import { PortableText } from '@portabletext/react';
import { textComponents } from '../../../components/RichTextComponents';
import JsonLd from '../../../components/JsonLd';
import NewsViews from '../../../components/NewsViews';
import { loc, pick, alternatesFor, intlLocale, localeUrl, href as hrefFor } from '../../../lib/locale';

async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "news" && slug.current == $slug][0] {
      title, titleEn, titleKz, publishedAt, mainImage,
      body, bodyEn, bodyKz, description, descriptionEn, descriptionKz
    }`,
    { slug }
  );
}

const formatDate = (dateString: string, locale: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(intlLocale(locale), {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
};

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await client.fetch(
    `*[_type == "news" && slug.current == $slug][0] { title, titleEn, titleKz, description, descriptionEn, descriptionKz, mainImage }`,
    { slug }
  );

  if (!post) return { title: pick({ ru: 'Новость не найдена', en: 'Article not found', kz: 'Жаңалық табылмады' }, locale) };

  const title = loc(post, 'title', locale);
  const desc = loc(post, 'description', locale);
  const fallbackDesc = pick({
    ru: `Читайте новость: "${title}" на сайте учебного центра Horizon LLP.`,
    en: `Read the article: "${title}" on the Horizon LLP website.`,
    kz: `"${title}" жаңалығын Horizon LLP сайтында оқыңыз.`,
  }, locale);

  return {
    title,
    description: desc || fallbackDesc,
    alternates: alternatesFor(locale, `/news/${slug}`),
    openGraph: {
      title,
      description: desc || fallbackDesc,
      images: post.mainImage ? [urlFor(post.mainImage).url()] : [{ url: '/og.jpg', width: 1200, height: 630 }],
      type: 'article',
    },
  };
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('News');
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <h1 className="text-2xl text-gray-500">{t('notFound')}</h1>
      </div>
    );
  }

  const title = loc(post, 'title', locale);
  const body = loc(post, 'body', locale);
  const desc = loc(post, 'description', locale);
  const fallbackDesc = pick({
    ru: `Читайте новость: "${title}" на сайте учебного центра Horizon LLP.`,
    en: `Read the article: "${title}" on the Horizon LLP website.`,
    kz: `"${title}" жаңалығын Horizon LLP сайтында оқыңыз.`,
  }, locale);

  const pageUrl = localeUrl(locale, `/news/${slug}`);
  const articleJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: desc || fallbackDesc,
      datePublished: post.publishedAt,
      url: pageUrl,
      image: post.mainImage ? urlFor(post.mainImage).url() : undefined,
      publisher: {
        '@type': 'Organization',
        name: 'Horizon LLP',
        url: 'https://horizon-llp.com',
        logo: { '@type': 'ImageObject', url: 'https://horizon-llp.com/HORIZON_logo_header.svg' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: pick({ ru: 'Главная', en: 'Home', kz: 'Басты бет' }, locale), item: localeUrl(locale) },
        { '@type': 'ListItem', position: 2, name: pick({ ru: 'События', en: 'News', kz: 'Жаңалықтар' }, locale), item: localeUrl(locale, '/news') },
        { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <JsonLd data={articleJsonLd} />
      <main className="pb-20">
        <div className="relative w-full max-w-[1300px] mx-auto h-[400px] mb-12 -mt-[120px] rounded-b-[15px] overflow-hidden">
          {post.mainImage ? (
            <img src={urlFor(post.mainImage).url()} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
              <span className="text-white opacity-30 text-4xl font-bold">HORIZON</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-[195px] h-[75px] z-10 pointer-events-none">
            <img src="/news-cutout.svg" alt="" className="w-full h-full block" />
          </div>
          <div className="absolute bottom-0 left-0 w-[190px] h-[50px] z-20 flex items-center pl-[40px]">
            <span className="text-[#8B8B8B] text-[14px] md:text-[16px] font-medium leading-none pt-2">
              {formatDate(post.publishedAt, locale)}
            </span>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto px-6 md:px-10 relative z-10 mt-10">
          <h1 className="text-[32px] md:text-[48px] leading-tight font-black text-[#0B0073] mb-4 uppercase">
            {title}
          </h1>
          <div className="mb-10">
            <NewsViews slug={slug} locale={locale} />
          </div>
          <div className="w-full text-black/80">
            <PortableText value={body} components={textComponents} />
          </div>
          <div className="mt-16 pt-8 border-t border-gray-300">
            <a href={hrefFor('/news', locale)} className="inline-flex items-center gap-2 text-[#0B0073] font-bold hover:underline">
              <span>←</span> {t('back')}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
