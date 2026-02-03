'use client';

import { useState } from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/sanity';

interface NewsItem {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage: any;
  description: string;
}

interface Props {
  initialNews: NewsItem[];
}

export default function NewsList({ initialNews }: Props) {
  // Начинаем с 12 новостей
  const [visibleCount, setVisibleCount] = useState(12);

  // Функция "Показать еще" (добавляем по 12)
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  // Форматирование даты строго в "ДД.ММ"
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}`;
  };

  const visibleNews = initialNews.slice(0, visibleCount);
  const hasMore = visibleCount < initialNews.length;

  return (
    <div className="w-full">
      
      {/* СЕТКА НОВОСТЕЙ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {visibleNews.map((item) => (
          <Link 
            key={item._id} 
            href={`/news/${item.slug.current}`}
            className="group flex flex-col gap-4 cursor-pointer"
          >
            {/* КАРТИНКА */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-white shadow-sm relative">
              {item.mainImage ? (
                <img
                  src={urlFor(item.mainImage).url()}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  Нет фото
                </div>
              )}
            </div>

            {/* ТЕКСТ */}
            <div className="flex flex-col">
               <h3 className="text-[14px] leading-snug font-normal text-black group-hover:text-[#0B0073] transition-colors">
                 {/* Дата серым цветом в начале строки */}
                 {item.publishedAt && (
                    <span className="text-gray-500 mr-2">
                        {formatDate(item.publishedAt)}
                    </span>
                 )}
                 {/* Заголовок */}
                 {item.title}
               </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* КНОПКА "ПОКАЗАТЬ ЕЩЕ" (ЗАЛИТЫЙ ТРЕУГОЛЬНИК) */}
      {hasMore && (
        <div className="w-full flex justify-center mt-16 mb-8">
          <button 
            onClick={handleLoadMore}
            className="group p-4 hover:opacity-70 transition-opacity"
            aria-label="Показать еще"
          >
            {/* Рисуем SVG треугольник синего цвета */}
            <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#0B0073]"
            >
                {/* Треугольник, указывающий вниз */}
                <path d="M12 21L3 9H21L12 21Z" />
            </svg>
          </button>
        </div>
      )}

    </div>
  );
}