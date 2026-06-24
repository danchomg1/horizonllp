import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Button from '../components/Button';
import Header from '../components/Header';
import { client, urlFor } from '../lib/sanity';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return {
      title: 'Horizon LLP — Health & Safety Training in Kazakhstan',
      description:
        'Horizon LLP — accredited training center in Astana. NEBOSH, IOSH, RoSPA, CompEx international courses. HSE consulting, safety diagnostics, ISO 45001 implementation for oil & gas and industrial sectors of Kazakhstan.',
      alternates: { canonical: 'https://horizon-llp.com/en' },
    };
  }
  return {
    title: 'Horizon LLP — Обучение охране труда и промышленной безопасности в Казахстане',
    description:
      'Horizon LLP — аккредитованный учебный центр в Астане. Международные курсы NEBOSH, IOSH, RoSPA, CompEx. Консалтинг по БиОТ, диагностика систем безопасности, внедрение ISO 45001 для нефтегазового и промышленного секторов Казахстана.',
    alternates: { canonical: 'https://horizon-llp.com' },
  };
}

async function getData() {
  const [homeData, latestNews] = await Promise.all([
    client.fetch(`*[_type == "home"][0]`),
    client.fetch(`
      *[_type == "news"] | order(publishedAt desc)[0...4] {
        _id, title, titleEn, slug, mainImage, publishedAt
      }
    `),
  ]);
  return { ...homeData, latestNews };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');
  const data = await getData();
  const isEn = locale === 'en';

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col">
      <div className="hidden lg:block h-[150px] w-full pointer-events-none" />
      <Header />

      <main className="mt-4 lg:-mt-[200px] relative z-0 flex-grow">
        {/* HERO */}
        <section className="relative w-full flex flex-col-reverse lg:flex-row lg:min-h-[800px] overflow-hidden">
          <div className="w-full lg:w-[50%] lg:min-w-[500px] px-4 md:px-10 lg:pl-[6%] lg:pr-4 pt-10 lg:pt-[320px] pb-20 z-20 relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex-shrink-0 hidden md:block">
                {data?.heroLogo ? (
                  <div className="relative w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] flex items-center justify-center">
                    <Image src={urlFor(data.heroLogo).url()} alt="Hero Logo" fill className="object-contain" />
                  </div>
                ) : (
                  <div className="w-[80px] h-[80px] border border-dashed border-horizon-blue flex items-center justify-center rounded-lg opacity-50">
                    <span className="text-[10px] text-horizon-blue font-bold">LOGO</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start w-full">
                <h1 className="font-black text-[28px] md:text-[36px] text-horizon-blue uppercase leading-[1.1] mb-2 break-words max-w-full">
                  {(isEn && data?.titleEn) ? data.titleEn : (data?.title || 'HORIZON')}
                </h1>
                <h2 className="font-bold text-[20px] md:text-[28px] text-horizon-blue leading-tight mb-4 md:mb-6">
                  {(isEn && data?.subtitleEn) ? data.subtitleEn : (data?.subtitle || 'LLP Consulting')}
                </h2>
                <p className="font-normal text-[14px] md:text-[15px] text-black/80 leading-relaxed mb-8 max-w-md whitespace-pre-wrap">
                  {(isEn && data?.heroDescriptionEn) ? data.heroDescriptionEn : (data?.heroDescription || '')}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto">
                  <Button className="w-full sm:w-[200px]">{t('cta')}</Button>
                  <Link
                    href={`/${locale}/about`}
                    className="font-normal text-[14px] md:text-[16px] text-black/80 flex items-center gap-2 hover:text-horizon-blue transition-colors"
                  >
                    {t('learnMore')}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[300px] px-4 md:px-10 lg:px-0 lg:absolute lg:right-0 lg:-top-60 lg:w-[65%] lg:h-[950px] z-10">
            <div className="relative w-full h-full">
              <Image
                src={data?.heroImage ? urlFor(data.heroImage).url() : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070'}
                alt="Hero"
                fill
                priority
                className="object-cover rounded-[15px] lg:rounded-none lg:scale-[1.01] lg:[mask-image:url(/hero-mask.svg)] lg:[webkit-mask-image:url(/hero-mask.svg)] lg:[mask-size:100%_100%] lg:[webkit-mask-size:100%_100%] lg:[mask-repeat:no-repeat] lg:[webkit-mask-repeat:no-repeat] lg:[mask-position:right_top] lg:[webkit-mask-position:right_top]"
              />
              <div className="absolute inset-0 bg-black/10 rounded-[15px] lg:hidden pointer-events-none" />
            </div>
          </div>
        </section>

        {/* NEWS */}
        <section className="max-w-[1250px] mx-auto px-4 md:px-10 relative z-20 pb-20 mt-10 lg:-mt-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border-b border-gray-200 pb-4 gap-4">
            <h2 className="font-bold text-[28px] md:text-[36px] text-horizon-blue">{t('newsTitle')}</h2>
            <Link
              href={`/${locale}/news`}
              className="font-normal text-[14px] text-black/60 hover:text-horizon-blue transition-colors leading-relaxed"
            >
              {t('viewAll')}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.latestNews?.length > 0 ? (
              data.latestNews.map((item: any) => (
                <Link key={item._id} href={`/${locale}/news/${item.slug.current}`} className="group cursor-pointer block">
                  <div className="relative aspect-square overflow-hidden rounded-[20px] md:rounded-[30px] mb-4 bg-white shadow-md">
                    {item.mainImage ? (
                      <Image
                        src={urlFor(item.mainImage).url()}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={isEn && item.titleEn ? item.titleEn : item.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        {t('noPhoto')}
                      </div>
                    )}
                  </div>
                  <h3 className="font-normal text-[14px] md:text-[15px] text-black leading-snug pr-2 opacity-85 group-hover:text-horizon-blue transition-colors line-clamp-3">
                    {isEn && item.titleEn ? item.titleEn : item.title}
                  </h3>
                </Link>
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center py-10">{t('noNews')}</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
