'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { urlFor } from '../lib/sanity';

// Интерфейс для конкретного курса
interface Course {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  details: string;
  detailsEn?: string;
  logo: any;
  slug: { current: string };
}

interface Category {
  _id: string;
  title: string;
  titleEn?: string;
  courses: Course[];
}

interface Props {
  categories: Category[];
}

const ONLINE_CATEGORY: Category = {
  _id: '__online',
  title: 'Онлайн курсы',
  titleEn: 'Online Courses',
  courses: [{
    title: 'Horizon University',
    titleEn: 'Horizon University',
    description: 'Дистанционное обучение сотрудников, контроль прогресса и управление учебными программами в одной системе.',
    descriptionEn: 'Remote employee training, progress tracking and programme management — all in one system.',
    details: '',
    logo: null,
    slug: { current: 'horizon-university' },
  }],
};

function getCategoryTitle(cat: Category, locale: string): string {
  if (locale === 'en') return cat.titleEn || cat.title;
  if (cat.title === 'NOCN') return 'Аварийное реагирование';
  return cat.title;
}

export default function CoursesDropdown({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'en' ? 'en' : 'ru';

  const allCategories = [...(categories || []), ONLINE_CATEGORY];

  useEffect(() => {
    if (allCategories.length > 0) {
      setActiveCategory(allCategories[0]);
      if (allCategories[0].courses?.length > 0) {
        setActiveCourse(allCategories[0].courses[0]);
      }
    }
  }, [categories]);

  // При наведении на категорию меняем активную группу
  const handleCategoryHover = (category: Category) => {
    setActiveCategory(category);
    if (category.courses?.length > 0) {
      setActiveCourse(category.courses[0]);
    } else {
      setActiveCourse(null);
    }
  };

  if (allCategories.length === 0) return null;

  const glassLayerStyle = {
    backgroundColor: 'rgba(244, 244, 244, 0.65)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  return (
    <div className="absolute left-0 top-[0px] w-full h-[440px] flex gap-[15px] z-50 animate-in fade-in slide-in-from-top-2 duration-200 cursor-default">
      
      {/* --- БЛОК 1 и 2: ЛЕВОЕ ОКНО (Категории + Список курсов) --- */}
      <div className="w-[60%] relative rounded-[15px] shadow-2xl">
        <div className="absolute inset-0 rounded-[15px] border border-white/50" style={glassLayerStyle} />
        
        <div className="relative z-10 flex h-full p-6">
          
          {/* КОЛОНКА 1: КАТЕГОРИИ (NEBOSH, IOSH и т.д.) */}
          <div className="w-[35%] border-r border-gray-400/20 pr-4 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
            {allCategories.map((cat) => (
              <div
                key={cat._id}
                onMouseEnter={() => handleCategoryHover(cat)}
                className={`
                  cursor-pointer px-4 py-3 rounded-[10px] text-[16px] font-normal transition-all flex items-center justify-between
                  ${activeCategory?._id === cat._id ? 'bg-black/5 text-[#0B0073]' : 'text-black hover:bg-black/5'}
                `}
              >
                {getCategoryTitle(cat, locale)}
                {activeCategory?._id === cat._id && <span className="text-[6px] text-[#0B0073]">●</span>}
              </div>
            ))}
          </div>

          {/* КОЛОНКА 2: СПИСОК КУРСОВ (Это ссылки!) */}
          <div className="w-[65%] pl-4 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
              {activeCategory?.courses?.map((course, idx) => {
                if (!course) return null; // Защита

                return (
                  <Link
                    key={idx}
                    href={course.slug?.current ? (locale === 'en' ? `/en/${course.slug.current}` : `/${course.slug.current}`) : '#'}
                    onMouseEnter={() => setActiveCourse(course)}
                    className={`
                      cursor-pointer px-4 py-3 rounded-[10px] text-[16px] font-normal transition-all flex items-center justify-between
                      ${activeCourse?.title === course.title ? 'bg-black/5 text-[#0B0073]' : 'text-black hover:bg-black/5'}
                    `}
                  >
                    {(locale === 'en' && course.titleEn) ? course.titleEn : course.title}
                    {activeCourse?.title === course.title && <span className="text-[6px] text-[#0B0073]">●</span>}
                  </Link>
                );
              })}
          </div>

        </div>
      </div>

      {/* --- БЛОК 3: ПРАВОЕ ОКНО (Превью курса) --- */}
      <div className="w-[40%] relative rounded-[15px] shadow-2xl">
        <div className="absolute inset-0 rounded-[15px] border border-white/50" style={glassLayerStyle} />
        
        <div className="relative z-10 flex flex-col justify-start h-full p-8">
          {activeCourse ? (
            <div className="flex gap-6 items-start">
                {/* Логотип */}
                {activeCourse.logo && (
                  <div className="w-[120px] h-[120px] flex-shrink-0 flex items-center justify-center">
                    <img src={urlFor(activeCourse.logo).url()} alt="Logo" className="w-full h-full object-contain drop-shadow-md" />
                  </div>
                )}
                
                <div className="flex flex-col">
                  {/* Заголовок (тоже ссылка) */}
                  <Link href={activeCourse.slug?.current ? (locale === 'en' ? `/en/${activeCourse.slug.current}` : `/${activeCourse.slug.current}`) : '#'}>
                    <h3 className="text-[16px] font-normal text-[#0B0073] mb-3 leading-tight uppercase tracking-wide hover:underline">
                      {(locale === 'en' && activeCourse.titleEn) ? activeCourse.titleEn : activeCourse.title}
                    </h3>
                  </Link>

                  <div className="w-full h-[1px] bg-[#0B0073]/20 mb-3" />

                  <div className="pr-2">
                      <p className="text-[14px] text-black/80 leading-relaxed font-normal">
                        {(locale === 'en' && activeCourse.descriptionEn) ? activeCourse.descriptionEn : activeCourse.description}
                      </p>
                      {(activeCourse.details || activeCourse.detailsEn) && (
                        <p className="text-[10px] text-gray-500 mt-2 italic">
                          {(locale === 'en' && activeCourse.detailsEn) ? activeCourse.detailsEn : activeCourse.details}
                        </p>
                      )}
                      
                      </div>
                </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm font-normal">
              {locale === 'en' ? 'Select a course' : 'Выберите курс'}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}