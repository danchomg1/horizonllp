import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import TabsSection from '../components/TabsSection';
import { notFound } from 'next/navigation';
import { textComponents } from '../components/RichTextComponents'; 
import Button from '../components/Button'; 

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getData(slug: string) {
  const query = `
    *[_type in [
      "consultingItem", 
      "explosionItem", 
      "emergencyItem", 
      "engineeringItem", 
      "ppeItem", 
      "aboutItem",
      "course"
    ] && slug.current == $slug][0] {
      title,
      heroImage,
      introTitle,
      introText,
      introIcon,
      pageTabs
    }
  `;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function DynamicPage({ params }: Props) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const data = await getData(decodedSlug);

  if (!data) {
    return notFound();
  }

  return (
    <main className="bg-[#F4F4F4] w-full flex flex-col items-center pb-20 min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* 1. HERO SECTION */}
      <div className="w-full flex justify-center relative z-0">
        
        {/* ГЛАВНЫЙ КОНТЕЙНЕР:
            - flex flex-col: На мобилках выстраиваем элементы в столбик (Картинка, потом Кнопка).
            - lg:block: На ПК это обычный блок, чтобы работало absolute позиционирование.
            - lg:h-[550px]: На ПК фиксируем высоту всего блока.
            - px-4: Отступы по бокам на мобилке.
        */}
        <div className="w-full max-w-[1300px] px-4 md:px-10 lg:px-0 relative lg:h-[350px] flex flex-col lg:block items-center">
            
            {/* А. БЛОК КАРТИНКИ */}
            {/* - relative w-full h-[300px]: На мобилке блок имеет свою высоту и ширину.
               - lg:absolute lg:inset-0: На ПК растягивается на весь родительский блок.
            */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-full lg:absolute lg:inset-0 rounded-[15px] lg:rounded-b-[30px] lg:rounded-t-none overflow-hidden shadow-sm lg:shadow-none">
                {data.heroImage ? (
                <img 
                    src={urlFor(data.heroImage).url()} 
                    alt={data.title}
                    className="w-full h-full object-cover"
                />
                ) : (
                <div className="w-full h-full bg-gray-200" />
                )}
                {/* Градиент */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
            </div>

            {/* Б. ВЫРЕЗ (Только Desktop, скрыт на мобилках) */}
            <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[71px] z-10 pointer-events-none">
                 <img 
                    src="/hero-cutout.svg" 
                    alt="" 
                    className="w-full h-full block" 
                 />
            </div>

            {/* В. КНОПКА */}
            {/* - mt-6: Отступ сверху ОТ картинки (на мобилке).
               - lg:mt-0: На ПК отступ убираем.
               - lg:absolute: На ПК включаем абсолютное позиционирование.
               - lg:bottom-0: Прижимаем к низу (в вырез).
            */}
            <div className="mt-6 lg:mt-0 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 z-20 lg:translate-y-0">
                <Button className="!w-[200px] !h-[50px] md:!h-[60px] !text-[16px]">
                   Оставить заявку
                </Button>
            </div>

        </div>
      </div>

      {/* ОСТАЛЬНОЙ КОНТЕНТ */}
      <div className="w-full flex justify-center relative z-10">
        <section className="w-full max-w-[1250px] px-4 md:px-10 mt-16 md:mt-24 mb-12">
            
            <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-8 md:gap-12">
                <div className="flex-1 max-w-[700px] min-w-0">
                  <h1 className="text-[22px] md:text-[28px] font-bold text-black mb-4 md:mb-6 uppercase break-words leading-tight">
                    {data.introTitle || data.title}
                  </h1>
                  <div className="max-w-none text-[#000000] text-[15px] md:text-[16px] break-words whitespace-normal">
                    {data.introText && <PortableText value={data.introText} components={textComponents} />}
                  </div>
                </div>
                
                {data.introIcon && (
                  <div className="w-[120px] md:w-[200px] flex-shrink-0 self-start md:self-auto mt-2">
                    <img src={urlFor(data.introIcon).url()} alt="Icon" className="w-full h-auto object-contain"/>
                  </div>
                )}
            </div>
        </section>
      </div>

      {data.pageTabs && (
        <div className="w-full flex justify-center relative z-10">
           <div className="w-full max-w-[1250px] px-4 md:px-10">
              <TabsSection tabs={data.pageTabs} />
           </div>
        </div>
      )}

    </main>
  );
}