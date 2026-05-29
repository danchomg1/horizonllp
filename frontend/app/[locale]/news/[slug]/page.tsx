import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client, urlFor } from '../../../lib/sanity';
import { PortableText } from '@portabletext/react';
import { textComponents } from '../../../components/RichTextComponents';
import JsonLd from '../../../components/JsonLd';

async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "news" && slug.current == $slug][0] {
      title, titleEn, publishedAt, mainImage, body, bodyEn, description, descriptionEn
    }`,
    { slug }
  );
}

const formatDate = (dateString: string, locale: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'en' ? 'en-GB' : 'ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
};

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const isEn = locale === 'en';
  const post = await client.fetch(
    `*[_type == "news" && slug.current == $slug][0] { title, titleEn, description, descriptionEn, mainImage }`,
    { slug }
  );

  if (!post) return { title: isEn ? 'Article not found | Horizon LLP' : 'Новость не найдена | Horizon LLP' };

  const title = isEn && post.titleEn ? post.titleEn : post.title;
  const desc = isEn && post.descriptionEn ? post.descriptionEn : post.description;
  const fallbackDesc = isEn
    ? `Read the article: "${title}" on the Horizon LLP website.`
    : `Читайте новость: "${title}" на сайте учебного центра Horizon LLP.`;

  return {
    title: `${title} | Horizon LLP`,
    description: desc || fallbackDesc,
    openGraph: {
      title,
      description: desc || fallbackDesc,
      images: post.mainImage ? [urlFor(post.mainImage).url()] : [],
      type: 'article',
    },
  };
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('News');
  const post = await getPost(slug);
  const isEn = locale === 'en';

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <h1 className="text-2xl text-gray-500">{t('notFound')}</h1>
      </div>
    );
  }

  const title = isEn && post.titleEn ? post.titleEn : post.title;
  const body = isEn && post.bodyEn ? post.bodyEn : post.body;
  const desc = isEn && post.descriptionEn ? post.descriptionEn : post.description;
  const fallbackDesc = isEn
    ? `Read the article: "${title}" on the Horizon LLP website.`
    : `Читайте новость: "${title}" на сайте учебного центра Horizon LLP.`;

  const pageUrl = `https://horizon-llp.com/${locale}/news/${slug}`;
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
        { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Главная', item: `https://horizon-llp.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: isEn ? 'News' : 'События', item: `https://horizon-llp.com/${locale}/news` },
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
          <h1 className="text-[32px] md:text-[48px] leading-tight font-black text-[#0B0073] mb-12 uppercase">
            {title}
          </h1>
          <div className="w-full text-black/80">
            <PortableText value={body} components={textComponents} />
          </div>
          <div className="mt-16 pt-8 border-t border-gray-300">
            <a href={`/${locale}/news`} className="inline-flex items-center gap-2 text-[#0B0073] font-bold hover:underline">
              <span>←</span> {t('back')}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
