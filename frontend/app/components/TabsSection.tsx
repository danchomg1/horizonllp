'use client';

import { useState } from 'react';
import { urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { textComponents } from './RichTextComponents'; 

interface Tab {
  _key: string;
  tabTitle: string;
  tabContent: any;
  tabImage?: any;
}

interface Props {
  tabs: Tab[];
}

export default function TabsSection({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="w-full text-black"> 
      <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-start">
        
        {/* --- ЛЕВАЯ КОЛОНКА (МЕНЮ) --- */}
        {/* MOBILE: Горизонтальный скролл (whitespace-nowrap) */}
        {/* DESKTOP: Вертикальный список (flex-col) */}
        <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-2 md:gap-1 pt-0 md:pt-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide"> 
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={tab._key}
                onClick={() => setActiveTab(index)}
                className={`
                  cursor-pointer flex items-center gap-2 md:gap-3 text-left py-2 px-4 md:px-3 rounded-full md:rounded-lg transition-all duration-200 font-sans whitespace-nowrap flex-shrink-0
                  ${isActive 
                    ? 'bg-[#0B0073] md:bg-transparent text-white md:text-[#0B0073] font-medium shadow-md md:shadow-none' 
                    : 'bg-white md:bg-transparent text-gray-500 hover:text-gray-800 hover:bg-black/5 border border-gray-100 md:border-none'
                  }
                `}
              >
                {/* ТОЧКА (Только на Desktop) */}
                <span className={`
                  hidden md:block w-1.5 h-1.5 rounded-full bg-[#0B0073] transition-opacity duration-200 flex-shrink-0
                  ${isActive ? 'opacity-100' : 'opacity-0'}
                `} />
                
                {/* Текст кнопки */}
                <span className="text-[14px] md:text-[15px]">{tab.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* --- ПРАВАЯ КОЛОНКА (КОНТЕНТ) --- */}
        <div className="w-full md:w-3/4 min-h-[300px] bg-white rounded-[20px] md:rounded-[15px] p-6 md:p-10 shadow-sm md:shadow-none">
          
      
          <div className="flex flex-col xl:flex-row gap-8 items-start">
            
            {/* ТЕКСТ */}
            <div className="flex-1 max-w-none text-black text-[14px] md:text-[15px] leading-relaxed">
               {tabs[activeTab].tabContent ? (
                 <PortableText 
                 value={tabs[activeTab].tabContent}
                   components={textComponents} 
                 />
               ) : (
                 <p className="text-gray-400 italic">Нет текста для этой вкладки</p>
               )}
            </div>

            {/* КАРТИНКА / ЛОГО */}
            {tabs[activeTab].tabImage && (
              <div className="w-full md:w-[180px] flex-shrink-0 mt-2 flex justify-center md:justify-start">
                <img 
                  src={urlFor(tabs[activeTab].tabImage).url()} 
                  alt={tabs[activeTab].tabTitle} 
                  className="max-h-[200px] md:max-h-none w-auto h-auto object-contain"
                />
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}