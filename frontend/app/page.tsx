import Link from 'next/link';
import Button from './components/Button';
import Header from './components/Header';
import { client, urlFor } from './lib/sanity'; 
async function getData() {
  const [homeData, latestNews] = await Promise.all([
    client.fetch(`*[_type == "home"][0]`),
    client.fetch(`
      *[_type == "news"] | order(publishedAt desc)[0...4] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt
      }
    `)
  ]);
  return { ...homeData, latestNews };
}

export default async function Home() {
  const data = await getData();

  return (
    // ИСПРАВЛЕНИЕ 1: Убрали 'overflow-x-hidden' отсюда. 
    // Теперь sticky Header увидит скролл и заработает.
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col">
      
      {/* Spacer для десктопа */}
      <div className="hidden lg:block h-[150px] w-full pointer-events-none" />

      {/* Header */}
      <Header />

      <main className="mt-4 lg:-mt-[200px] relative z-0 flex-grow">
        
        {/* --- HERO SECTION --- */}
        {/* ИСПРАВЛЕНИЕ 2: Добавили 'overflow-hidden' сюда, чтобы картинка справа не создавала горизонтальный скролл */}
        <section className="relative w-full flex flex-col-reverse lg:flex-row lg:min-h-[800px] overflow-hidden">
           
           {/* ЛЕВАЯ ЧАСТЬ (Текст) */}
           <div className="w-full lg:w-[50%] lg:min-w-[500px] px-4 md:px-10 lg:pl-[6%] lg:pr-4 pt-10 lg:pt-[320px] pb-20 z-20 relative">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                
                {/* ЛОГО */}
                <div className="flex-shrink-0 hidden md:block">
                   {data?.heroLogo ? (
                     <div className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] flex items-center justify-center">
                        <img src={urlFor(data.heroLogo).url()} alt="Hero Logo" className="w-full h-full object-contain"/>
                     </div>
                   ) : (
                     <div className="w-[80px] h-[80px] border border-dashed border-horizon-blue flex items-center justify-center rounded-lg opacity-50">
                       <span className="text-[10px] text-horizon-blue font-bold">LOGO</span>
                     </div>
                   )}
                </div>

                {/* ТЕКСТЫ */}
                <div className="flex flex-col items-start w-full">
                    <h1 className="font-black text-[28px] md:text-[36px] text-horizon-blue uppercase leading-[1.1] mb-2 break-words max-w-full">
                      {data?.title || "HORIZON"}
                    </h1>
                    <h2 className="font-bold text-[20px] md:text-[28px] text-horizon-blue leading-tight mb-4 md:mb-6">
                      {data?.subtitle || "LLP Consulting"}
                    </h2>
                    <p className="font-normal text-[14px] md:text-[15px] text-black/80 leading-relaxed mb-8 max-w-md whitespace-pre-wrap">
                      {data?.heroDescription || "Компания «HORIZON» была основана в 2007 году..."}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto">
                      <Button className="w-full sm:w-[200px]">Оставить заявку</Button>
                      <Link href="/about" className="font-normal text-[14px] md:text-[16px] text-black/80 flex items-center gap-2 hover:text-horizon-blue transition-colors">
                          подробнее о компании ▸
                      </Link>
                    </div>
                </div>
              </div>
           </div>

           {/* ПРАВАЯ ЧАСТЬ (Картинка) */}
           <div className="
              relative w-full h-[300px] 
              px-4 md:px-10 
              lg:px-0 lg:absolute lg:right-0 lg:-top-60 lg:w-[65%] lg:h-[950px] 
              z-10
           ">
              <div className="relative w-full h-full">
                <img 
                   src={data?.heroImage ? urlFor(data.heroImage).url() : "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"}
                   alt="Hero"
                   className="
                      w-full h-full object-cover 
                      rounded-[15px] lg:rounded-none lg:scale-[1.01]
                      lg:[mask-image:url(/hero-mask.svg)] lg:[webkit-mask-image:url(/hero-mask.svg)] 
                      lg:[mask-size:100%_100%] lg:[webkit-mask-size:100%_100%] 
                      lg:[mask-repeat:no-repeat] lg:[webkit-mask-repeat:no-repeat] 
                      lg:[mask-position:right_top] lg:[webkit-mask-position:right_top]
                   "
                />
                <div className="absolute inset-0 bg-black/10 rounded-[15px] lg:hidden pointer-events-none" />
              </div>
           </div>
        </section>

        {/* НОВОСТИ */}
        <section className="max-w-[1250px] mx-auto px-4 md:px-10 relative z-20 pb-20 mt-10 lg:-mt-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border-b border-gray-200 pb-4 gap-4">
            <h2 className="font-bold text-[28px] md:text-[36px] text-horizon-blue">Последние события</h2>
            <Link href="/news" className="font-normal text-[14px] text-black/60 hover:text-horizon-blue transition-colors leading-relaxed">
              смотреть все новости ▸
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {data?.latestNews?.length > 0 ? (
               data.latestNews.map((newsItem: any) => (
                <Link key={newsItem._id} href={`/news/${newsItem.slug.current}`} className="group cursor-pointer block">
                  <div className="aspect-square overflow-hidden rounded-[20px] md:rounded-[30px] mb-4 bg-white shadow-md">
                    {newsItem.mainImage ? (
                      <img src={urlFor(newsItem.mainImage).url()} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={newsItem.title}/>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Нет фото</div>
                    )}
                  </div>
                  <h3 className="font-normal text-[14px] md:text-[15px] text-black leading-snug pr-2 opacity-90 group-hover:text-horizon-blue transition-colors line-clamp-3">
                     {newsItem.title}
                  </h3>
                </Link>
               ))
             ) : (
               <p className="text-gray-400 col-span-full text-center py-10">Новостей пока нет.</p>
             )}
          </div>
        </section>
      </main>
    </div>
  );
}  