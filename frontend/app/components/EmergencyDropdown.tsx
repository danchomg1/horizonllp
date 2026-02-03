
'use client';



import { useState, useEffect } from 'react';

import { urlFor } from '../lib/sanity';

import Link from 'next/link'; // <--- 1. ИМПОРТИРУЕМ LINK



interface ConsultingItem {

  _id: string;

  title: string;

  description: string;

  image: any;

  slug: { current: string }; // <--- 2. ДОБАВЛЯЕМ SLUG В ИНТЕРФЕЙС

}



interface Props {

  items: ConsultingItem[];

}



export default function ConsultingDropdown({ items }: Props) {

  const [activeItem, setActiveItem] = useState<ConsultingItem | null>(null);



  useEffect(() => {

    if (items && items.length > 0) {

      setActiveItem(items[0]);

    }

  }, [items]);



  if (!items || items.length === 0) return null;



  const glassLayerStyle = {

    backgroundColor: 'rgba(244, 244, 244, 0.65)',

    backdropFilter: 'blur(10px)',

    WebkitBackdropFilter: 'blur(10px)',

  };



  return (

    <div className="absolute left-0 top-[0px] w-full h-[400px] flex gap-[15px] z-50 animate-in fade-in slide-in-from-top-2 duration-200 cursor-default">

     

      {/* ЛЕВАЯ КОЛОНКА */}

      <div className="w-[35%] relative rounded-[15px] shadow-2xl">

        <div

           className="absolute inset-0 rounded-[15px] border border-white/50"

           style={glassLayerStyle}

        />

       

        <div className="relative z-10 flex h-full p-6">

           <div className="w-full flex flex-col gap-1 overflow-y-auto custom-scrollbar">

             {items.map((item) => (

               // 3. ЗАМЕНЯЕМ div НА Link

               // Обязательно проверяем, что slug существует

               <Link

                 key={item._id}

                 href={`/${item.slug?.current}`} // <--- ВОТ ССЫЛКА НА СТРАНИЦУ

                 onMouseEnter={() => setActiveItem(item)}

                 className={`

                   cursor-pointer px-4 py-3 rounded-[10px] text-[16px] font-normal transition-all flex items-center justify-between

                   ${activeItem?._id === item._id

                     ? 'bg-black/5 text-[#0B0073]'

                     : 'text-black hover:bg-black/5'}

                 `}

               >

                 {item.title}

                 {activeItem?._id === item._id && <span className="text-[6px] text-[#0B0073]">●</span>}

               </Link>

             ))}

           </div>

        </div>

      </div>



      {/* ПРАВАЯ КОЛОНКА (Остается без изменений) */}

      <div className="w-[65%] relative rounded-[15px] shadow-2xl">

         <div

           className="absolute inset-0 rounded-[15px] border border-white/50"

           style={glassLayerStyle}

        />

         

         <div className="relative z-10 flex flex-col justify-start h-full p-8">

           {activeItem ? (

             <div className="flex gap-8 items-start h-full">

                {activeItem.image && (

                  <div className="w-[140px] h-[140px] flex-shrink-0 flex items-center justify-center">

                     <img

                        src={urlFor(activeItem.image).url()}

                        alt={activeItem.title}

                        className="w-full h-full object-contain drop-shadow-md"

                     />

                  </div>

                )}

                <div className="flex flex-col w-full">

                   <h3 className="text-[20px] font-normal text-[#0B0073] mb-4 leading-tight uppercase tracking-wide">

                      {activeItem.title}

                   </h3>

                   <div className="w-full h-[1px] bg-[#0B0073]/20 mb-4" />

                   <div className="overflow-y-auto max-h-[280px] custom-scrollbar pr-4">

                      <p className="text-[15px] text-black/80 leading-relaxed font-normal whitespace-pre-wrap">

                          {activeItem.description}

                      </p>

                   </div>

                </div>

             </div>

           ) : (

             <div className="h-full flex items-center justify-center text-gray-500 text-sm font-normal">

               Выберите услугу

             </div>

           )}

         </div>

      </div>



    </div>

  );

}