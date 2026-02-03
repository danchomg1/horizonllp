import React from 'react';
import { PortableTextComponents } from '@portabletext/react';
import { urlFor } from '../lib/sanity';

// Вспомогательная функция для получения ID видео из ссылки YouTube
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const textComponents: PortableTextComponents = {
  
  // 1. ТИПЫ КОНТЕНТА (Картинки и Видео)
  types: {
    // КАРТИНКИ
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        // БЫЛО: justify-center (центр) -> СТАЛО: justify-start (лево)
        <div className="w-full flex justify-start my-8">
          {/* Фиксированная ширина 400px */}
          <div className="relative w-[400px] rounded-[20px] overflow-hidden shadow-sm">
            <img
              src={urlFor(value).url()}
              alt={value.alt || 'Image'}
              className="w-full h-auto object-cover"
            />
            {value.alt && (
              <p className="text-left text-gray-400 text-xs mt-2 italic">{value.alt}</p>
            )}
          </div>
        </div>
      );
    },
    
    // YOUTUBE ВИДЕО
    youtube: ({ value }: any) => {
      const { url } = value;
      const id = getYouTubeId(url);
      if (!id) return null;
      return (
        // БЫЛО: justify-center (центр) -> СТАЛО: justify-start (лево)
        <div className="w-full flex justify-start my-8">
           {/* Фиксированная ширина 400px */}
          <div className="w-[400px] aspect-video rounded-[20px] overflow-hidden shadow-lg bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    },
  },

  // 2. СТИЛИ ТЕКСТА (Остаются без изменений)
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-[26px] font-medium text-black mb-6 mt-8 font-sans">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-[22px] font-medium text-black mb-4 mt-6 font-sans">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-[18px] font-normal text-black mb-3 mt-4 font-sans">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-[14px] font-normal text-black mb-4 leading-relaxed font-sans">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#0B0073] pl-4 py-2 my-6 italic text-gray-700 bg-gray-50 rounded-r-lg font-sans text-[14px]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-4 text-[14px] text-black font-sans">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-5 mb-4 text-[14px] text-black font-sans">{children}</ol>,
  },
};