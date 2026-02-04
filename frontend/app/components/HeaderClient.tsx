'use client';

import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Send, Menu, X } from 'lucide-react'; 
import Button from './Button'; 
import { urlFor } from '../lib/sanity'; 

import CoursesDropdown from './CoursesDropdown';
import ConsultingDropdown from './ConsultingDropdown';
import ExplosionDropdown from './ExplosionDropdown';
import EmergencyDropdown from './EmergencyDropdown';
import EngineeringDropdown from './EngineeringDropdown';
import PPEDropdown from './PPEDropdown';
import ContactsDropdown from './ContactDropdown';
import AboutDropdown from './AboutDropdown';

interface HeaderClientProps {
  categories: any;
  consultingItems: any;
  explosionItems: any;
  emergencyItems: any;
  engineeringItems: any;
  ppeItems: any;
  contactCities: any;
  aboutItems: any;
  logo?: any;
}

export default function HeaderClient({
  categories,
  consultingItems,
  explosionItems,
  emergencyItems,
  engineeringItems,
  ppeItems,
  contactCities,
  aboutItems,
  logo 
}: HeaderClientProps) {
  
  const pathname = usePathname();
  // Проверяем, главная ли это страница
  const isHomePage = pathname === '/';
  
  // Высота, на которой стоит шапка изначально (в пикселях)
  const INITIAL_TOP_OFFSET = 500;

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false); // Состояние "Прилипла ли шапка?"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Прячем шапку в админке
  if (pathname && pathname.startsWith('/studio')) {
    return null;
  }

  // 2. Логика скролла и прилипания
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (isHomePage) {
        // НА ГЛАВНОЙ: Прилипаем только когда доскроллили до места старта шапки (500px)
        setIsSticky(scrollY >= INITIAL_TOP_OFFSET);
      } else {
        // НА ДРУГИХ: Прилипаем почти сразу (эффект сжатия)
        setIsSticky(scrollY > 20);
      }
    };

    // Запускаем проверку сразу и при скролле
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMenu = (name: string) => {
    setActiveMenu(activeMenu === name ? null : name);
  };

  const MenuItem = ({ label, name, isLink }: { label: string, name?: string, isLink?: boolean }) => {
    const isOpen = name ? activeMenu === name : false;
    
    // Цвет текста меняется: если шапка "липкая" (белая полоса) - текст всегда черный
    // Если шапка прозрачная (в начале) - можно настроить иначе, но пока оставим черный/синий для читаемости
    
    if (isLink) {
      return (
        <div className="h-full flex items-center px-3 xl:px-4 cursor-pointer hover:text-[#0B0073] transition-colors font-medium text-[13px] xl:text-sm whitespace-nowrap">
          {label}
        </div>
      );
    }

    return (
      <button
        onClick={() => name && toggleMenu(name)}
        className={`h-full flex items-center gap-1 px-3 xl:px-4 text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
          isOpen ? 'text-[#0B0073]' : 'text-black hover:text-[#0B0073]'
        }`}
      >
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    );
  };

  // --- ВЫЧИСЛЕНИЕ КЛАССОВ ПОЗИЦИОНИРОВАНИЯ ---
  
  // Базовые классы
  let headerClasses = "left-0 right-0 z-50 w-full flex justify-center transition-all duration-300 ease-in-out pointer-events-none";
  
  if (isHomePage) {
    if (isSticky) {
      // Главная, проскроллили > 500px -> ФИКСИРУЕМ НАВЕРХУ
      headerClasses += " fixed top-0 px-0";
    } else {
      // Главная, в начале -> АБСОЛЮТНОЕ ПОЗИЦИОНИРОВАНИЕ НА 500px
      // Она едет вверх вместе со скроллом
      headerClasses += ` absolute top-[${INITIAL_TOP_OFFSET}px] px-4`;
    }
  } else {
    // Не главная -> Всегда фиксирована сверху (с анимацией сжатия)
    headerClasses += isSticky ? " fixed top-0 px-0" : " fixed top-4 md:top-8 px-4";
  }

  return (
    <header className={headerClasses}>
      
      <div 
        ref={containerRef}
        className={`
          relative pointer-events-auto w-full transition-all duration-500 ease-in-out
          ${isSticky ? 'max-w-full' : 'max-w-[1250px]'}
        `}
      >
        
        {/* ЛОГОТИП СЛЕВА (DESKTOP) */}
        {/* Показываем его, если шапка НЕ "прилипла" (начальное состояние) */}
        <div className={`
            absolute top-0 right-full mr-[15px] h-full hidden lg:flex items-center justify-end pointer-events-auto transition-opacity duration-300
            ${isSticky ? 'opacity-0 pointer-events-none' : 'opacity-100'} 
        `}>
            <Link href="/" className="block">
                <div className="w-[91px] h-[22px] relative flex items-center justify-center">
                    {logo ? (
                      <img src={urlFor(logo).url()} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 text-[10px] text-gray-500 flex items-center justify-center rounded">LOGO</div>
                    )}
                </div>
            </Link>
        </div>

        {/* САМА ПОЛОСКА МЕНЮ */}
        <div className="relative z-50 h-[50px] px-4 md:px-6 flex items-center justify-between">
            {/* ФОН */}
            <div className={`
                absolute inset-0 bg-white/80 backdrop-blur-[10px] border border-white/20 shadow-sm -z-10 transition-all duration-500
                ${isSticky ? 'rounded-none border-b-gray-200' : 'rounded-[15px]'}
            `} />

            {/* Логотип внутри полоски (для мобильных ИЛИ когда шапка прилипла на десктопе) */}
            <div className={`flex items-center transition-all duration-300 ${isSticky ? 'lg:flex' : 'lg:hidden'}`}>
                <Link href="/" className="block">
                    <div className="w-[80px] h-[20px] relative">
                          {logo ? (
                             <img src={urlFor(logo).url()} alt="Logo" className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-xs font-bold text-gray-500">LOGO</span>
                          )}
                    </div>
                </Link>
            </div>

            {/* НАВИГАЦИЯ */}
            <nav className={`hidden lg:flex w-full justify-between items-center h-full ${isSticky ? 'pl-8' : ''}`}>
              <MenuItem label="О нас" name="about" />
              <MenuItem label="Международные курсы" name="courses" />
              <MenuItem label="Консалтинг" name="consulting" />
              <MenuItem label="Взрывозащита (IEC Ex)" name="explosion" />
              <MenuItem label="Аварийное реагирование" name="emergency" />
              <MenuItem label="Инжиниринг" name="engineering" />
              <MenuItem label="СИЗ" name="ppe" />
              <MenuItem label="Контакты" name="contacts" />
            </nav>

            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-black hover:bg-black/5 rounded-lg transition-colors"
            >
                <Menu className="w-6 h-6" />
            </button>
        </div>

        {/* КНОПКА СПРАВА */}
        <div className={`
            hidden lg:flex
            absolute top-0 left-full ml-[15px] h-full items-center
            transition-all duration-500 ease-in-out z-40
            ${isSticky 
               ? 'opacity-0 pointer-events-none translate-x-[-20px]' 
               : 'opacity-100 translate-x-0 pointer-events-auto'
            }
        `}>
             <Button className="!w-[50px] !px-0 flex items-center justify-center">
                <Send className="w-5 h-5 -ml-1 text-white" />
             </Button>
        </div>

        {/* DROPDOWNS */}
        <div className={`hidden lg:block absolute top-full left-0 w-full pt-4 z-40 transition-all duration-300 ${isSticky ? 'max-w-[1250px] mx-auto left-0 right-0' : ''}`}>
           {activeMenu === 'about' && <div className="relative w-full"><AboutDropdown items={aboutItems} /></div>}
           {activeMenu === 'courses' && <div className="relative w-full"><CoursesDropdown categories={categories} /></div>}
           {activeMenu === 'consulting' && <div className="relative w-full"><ConsultingDropdown items={consultingItems} /></div>}
           {activeMenu === 'explosion' && <div className="relative w-full"><ExplosionDropdown items={explosionItems} /></div>}
           {activeMenu === 'emergency' && <div className="relative w-full"><EmergencyDropdown items={emergencyItems} /></div>}
           {activeMenu === 'engineering' && <div className="relative w-full"><EngineeringDropdown items={engineeringItems} /></div>}
           {activeMenu === 'ppe' && <div className="relative w-full"><PPEDropdown items={ppeItems} /></div>}
           {activeMenu === 'contacts' && (
             <div className="relative w-full flex justify-end">
                <ContactsDropdown cities={contactCities} />
             </div>
           )}
        </div>

        {/* МОБИЛЬНОЕ МЕНЮ */}
        <div className={`
            fixed inset-0 z-[100] bg-white transition-transform duration-300 ease-in-out lg:hidden flex flex-col
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
            <div className="h-[60px] px-4 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
                <div className="w-[100px]">
                    {logo && <img src={urlFor(logo).url()} alt="Logo" className="w-full h-full object-contain" />}
                </div>
                <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 bg-gray-100 rounded-full text-black hover:bg-gray-200"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-2">
                <MobileAccordion label="О нас">
                    {aboutItems?.map((item: any) => {
                        const href = item.slug.current === 'events' ? '/news' : `/${item.slug.current}`;
                        return (
                            <Link 
                                key={item._id} 
                                href={href} 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="block py-2 pl-4 text-sm text-gray-600 border-l-2 border-gray-100 hover:text-[#0B0073]"
                            >
                                {item.title}
                            </Link>
                        )
                    })}
                </MobileAccordion>

                <MobileAccordion label="Международные курсы">
                    {categories?.map((cat: any) => (
                        <div key={cat._id} className="pl-4 py-2 text-sm text-gray-600 border-l-2 border-gray-100 mb-2">
                            <div className="font-semibold text-black mb-1">{cat.title}</div>
                            <div className="flex flex-col gap-1">
                                {cat.courses?.map((c: any) => (
                                    <Link 
                                        key={c.slug?.current} 
                                        href={`/${c.slug?.current}`} 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-1 hover:text-[#0B0073]"
                                    >
                                        {c.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </MobileAccordion>
                
                <MobileAccordion label="Консалтинг">
                    {consultingItems?.map((item: any) => (
                        <Link key={item._id} href={`/${item.slug?.current}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 pl-4 text-sm text-gray-600 border-l-2 border-gray-100 hover:text-[#0B0073]">
                            {item.title}
                        </Link>
                    ))}
                </MobileAccordion>

                <MobileAccordion label="Взрывозащита">
                    {explosionItems?.map((item: any) => (
                        <Link key={item._id} href={`/${item.slug?.current}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 pl-4 text-sm text-gray-600 border-l-2 border-gray-100 hover:text-[#0B0073]">
                            {item.title}
                        </Link>
                    ))}
                </MobileAccordion>
                
                <Link href="#" className="text-[18px] font-medium py-3 border-b border-gray-100 text-gray-400">Аварийное реагирование</Link>
                <Link href="#" className="text-[18px] font-medium py-3 border-b border-gray-100 text-gray-400">Инжиниринг</Link>
                <Link href="#" className="text-[18px] font-medium py-3 border-b border-gray-100 text-gray-400">СИЗ</Link>

                <MobileAccordion label="Контакты">
                    <div className="pl-4 text-sm text-gray-600 space-y-4">
                        {contactCities?.map((city: any) => (
                            <div key={city._id}>
                                <div className="font-bold text-[#0B0073]">{city.city}</div>
                                <div>{city.phones?.[0]}</div>
                            </div>
                        ))}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="text-xs text-gray-400">Email</div>
                            <a href="mailto:sales@horizon-llp.com" className="font-medium">sales@horizon-llp.com</a>
                        </div>
                    </div>
                </MobileAccordion>
            </div>

            <div className="p-4 border-t border-gray-100">
                <Button className="w-full">Оставить заявку</Button>
            </div>
        </div>

      </div>
    </header>
  );
}

function MobileAccordion({ label, children }: { label: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-100">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-3 text-[18px] font-medium text-left"
            >
                {label}
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-[#0B0073]' : 'text-gray-400'}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                {children}
            </div>
            </div>
    );
} 
// fix vercel trigger