import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { client, urlFor } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';
import TabsSection from '../../components/TabsSection';
import { notFound } from 'next/navigation';
import { textComponents } from '../../components/RichTextComponents';
import Button from '../../components/Button';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

async function getData(slug: string) {
  return client.fetch(
    `*[_type in ["consultingItem","explosionItem","emergencyItem","engineeringItem","ppeItem","aboutItem","course"] && slug.current == $slug][0] {
      title, titleEn,
      heroImage,
      introTitle, introTitleEn,
      introText, introTextEn,
      introIcon,
      description, descriptionEn,
      pageTabs[] {
        _key, tabTitle, tabTitleEn, tabContent, tabContentEn, tabImage
      }
    }`,
    { slug }
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const isEn = locale === 'en';
  const data = await client.fetch(
    `*[_type in ["consultingItem","explosionItem","emergencyItem","engineeringItem","ppeItem","aboutItem","course"] && slug.current == $slug][0] { title, titleEn, description, descriptionEn, heroImage }`,
    { slug: decodeURIComponent(slug) }
  );
  if (!data) return { title: isEn ? 'Page not found | Horizon LLP' : 'Страница не найдена | Horizon LLP' };
  const title = (isEn && data.titleEn) ? data.titleEn : data.title;
  const description = (isEn && data.descriptionEn) ? data.descriptionEn : data.description;
  return {
    title: `${title} | Horizon LLP`,
    description: description || (isEn ? `Learn more about ${title} — Horizon LLP` : `Подробнее о ${title} — Horizon LLP`),
    openGraph: { title, description, images: data.heroImage ? [urlFor(data.heroImage).url()] : [] },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const data = await getData(decodeURIComponent(slug));
  if (!data) return notFound();

  const title = (isEn && data.titleEn) ? data.titleEn : data.title;
  const introTitle = (isEn && data.introTitleEn) ? data.introTitleEn : data.introTitle;
  const introText = (isEn && data.introTextEn) ? data.introTextEn : data.introText;

  return (
    <main className="bg-[#F4F4F4] w-full flex flex-col items-center pb-20 min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="w-full flex justify-center relative z-0">
        <div className="w-full max-w-[1300px] px-4 md:px-10 lg:px-0 relative lg:h-[350px] flex flex-col lg:block items-center">
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-full lg:absolute lg:inset-0 rounded-[15px] lg:rounded-b-[30px] lg:rounded-t-none overflow-hidden shadow-sm lg:shadow-none">
            {data.heroImage ? (
              <img src={urlFor(data.heroImage).url()} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          </div>
          <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[71px] z-10 pointer-events-none">
            <img src="/hero-cutout.svg" alt="" className="w-full h-full block" />
          </div>
          <div className="mt-6 lg:mt-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 z-20">
            <Button className="!w-[200px] !h-[50px] md:!h-[60px] !text-[16px]">
              {isEn ? 'Submit Request' : 'Оставить заявку'}
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center relative z-10">
        <section className="w-full max-w-[1250px] px-4 md:px-10 mt-16 md:mt-24 mb-12">
          <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-8 md:gap-12">
            <div className="flex-1 max-w-[700px] min-w-0">
              <h1 className="text-[22px] md:text-[28px] font-bold text-black mb-4 md:mb-6 uppercase break-words leading-tight">
                {introTitle || title}
              </h1>
              <div className="max-w-none text-[#000000] text-[15px] md:text-[16px] break-words whitespace-normal">
                {introText && <PortableText value={introText} components={textComponents} />}
              </div>
            </div>
            {data.introIcon && (
              <div className="w-[120px] md:w-[200px] flex-shrink-0 self-start md:self-auto mt-2">
                <img src={urlFor(data.introIcon).url()} alt="Icon" className="w-full h-auto object-contain" />
              </div>
            )}
          </div>
        </section>
      </div>

      {data.pageTabs && (
        <div className="w-full flex justify-center relative z-10">
          <div className="w-full max-w-[1250px] px-4 md:px-10">
            <TabsSection tabs={data.pageTabs} locale={locale} />
          </div>
        </div>
      )}
    </main>
  );
}
