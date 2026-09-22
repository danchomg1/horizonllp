import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { client, urlFor } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';
import TabsSection from '../../components/TabsSection';
import { notFound } from 'next/navigation';
import { textComponents } from '../../components/RichTextComponents';
import Button from '../../components/Button';
import { loc, pick, alternatesFor, localeUrl } from '../../lib/locale';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

async function getData(slug: string) {
  return client.fetch(
    `*[_type in ["consultingItem","explosionItem","emergencyItem","engineeringItem","ppeItem","aboutItem","course"] && slug.current in [$slug, "/" + $slug]][0] {
      title, titleEn, titleKz,
      heroImage,
      introTitle, introTitleEn, introTitleKz,
      introText, introTextEn, introTextKz,
      introIcon,
      description, descriptionEn, descriptionKz,
      pageTabs[] {
        _key, tabTitle, tabTitleEn, tabTitleKz, tabContent, tabContentEn, tabContentKz, tabImage
      }
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const data = await client.fetch(
    `*[_type in ["consultingItem","explosionItem","emergencyItem","engineeringItem","ppeItem","aboutItem","course"] && slug.current in [$slug, "/" + $slug]][0] { title, titleEn, titleKz, description, descriptionEn, descriptionKz, heroImage }`,
    { slug: decodeURIComponent(slug) }
  );
  if (!data) return { title: pick({ ru: 'Страница не найдена', en: 'Page not found', kz: 'Бет табылмады' }, locale) };
  const title = loc(data, 'title', locale);
  const description = loc(data, 'description', locale);
  return {
    title,
    description: description || pick({
      ru: `Подробнее о ${title} — Horizon LLP`,
      en: `Learn more about ${title} — Horizon LLP`,
      kz: `${title} туралы толығырақ — Horizon LLP`,
    }, locale),
    alternates: alternatesFor(locale, `/${slug}`),
    twitter: { card: 'summary_large_image', title, description, images: data.heroImage ? [urlFor(data.heroImage).url()] : ['/og.jpg'] },
    openGraph: {
      url: localeUrl(locale, `/${slug}`),
      title,
      description,
      images: data.heroImage ? [urlFor(data.heroImage).url()] : [{ url: '/og.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const data = await getData(decodeURIComponent(slug));
  if (!data) return notFound();

  const title = loc(data, 'title', locale);
  const introTitle = loc(data, 'introTitle', locale);
  const introText = loc(data, 'introText', locale);

  return (
    <main className="interior-page service-page">
      <section className="service-hero">
        {data.heroImage && <img src={urlFor(data.heroImage).width(1800).url()} alt="" className="service-hero-image" />}
        <div className="service-hero-copy">
          <span className="interior-eyebrow">HORIZON · {pick({ru:'Экспертиза и развитие',en:'Expertise and development',kz:'Сараптама және даму'},locale)}</span>
          <h1>{title}</h1>
          <Button>{pick({ru:'Обсудить задачу',en:'Discuss your needs',kz:'Міндетті талқылау'},locale)} <span aria-hidden="true">↗</span></Button>
        </div>
      </section>
      <section className="service-intro">
        <div><span className="interior-eyebrow">HORIZON LLP</span><h2>{introTitle || title}</h2></div>
        <div className="service-intro-body">
          {data.introIcon && <img src={urlFor(data.introIcon).url()} alt="" className="service-intro-icon" />}
          {introText ? <PortableText value={introText} components={textComponents}/> : loc(data,'description',locale) && <p>{loc(data,'description',locale)}</p>}
        </div>
      </section>
      {data.pageTabs?.length > 0 && <section className="service-details"><TabsSection tabs={data.pageTabs} locale={locale}/></section>}
      <section className="interior-contact"><div><span className="interior-eyebrow">HORIZON · {pick({ru:'Работаем вместе',en:'Work with us',kz:'Бірге жұмыс істейміз'},locale)}</span><h2>{pick({ru:'Решение для вашей команды.',en:'A solution for your team.',kz:'Командаңызға арналған шешім.'},locale)}</h2></div><Button>{pick({ru:'Оставить заявку',en:'Send a request',kz:'Өтінім қалдыру'},locale)} <span aria-hidden="true">↗</span></Button></section>
    </main>
  );
}
