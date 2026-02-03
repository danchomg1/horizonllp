'use client';

import Link from 'next/link';

interface AboutItem {
  _id: string;
  title: string;
  slug: { current: string };
}

interface Props {
  items: AboutItem[];
}

export default function AboutDropdown({ items }: Props) {
  if (!items || items.length === 0) return null;

  const glassLayerStyle = {
    backgroundColor: 'rgba(244, 244, 244, 0.65)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  return (
    // Устанавливаем ширину 400px и убираем gap, так как колонка одна
    <div className="absolute left-0 top-[0px] w-[400px] z-50 animate-in fade-in slide-in-from-top-2 duration-200 cursor-default">
      
      {/* ЕДИНСТВЕННАЯ КОЛОНКА */}
      <div className="w-full relative rounded-[15px] shadow-2xl">
        <div
           className="absolute inset-0 rounded-[15px] border border-white/50"
           style={glassLayerStyle}
        />
        
        <div className="relative z-10 flex flex-col p-4">
           <div className="w-full flex flex-col gap-1">
             {items.map((item) => (
               <Link
                 key={item._id}
                 href={`/${item.slug?.current}`}
                 className="cursor-pointer px-4 py-3 rounded-[10px] text-[16px] font-normal text-black hover:bg-black/5 hover:text-[#0B0073] transition-all flex items-center justify-between group"
               >
                 {item.title}
                 {/* Маленькая точка при наведении (опционально) */}
                 <span className="opacity-0 group-hover:opacity-100 text-[6px] text-[#0B0073] transition-opacity">●</span>
               </Link>
             ))}
           </div>
        </div>
      </div>

    </div>
  );
}