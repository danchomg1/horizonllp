'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Send, Menu, X, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Button from './Button';
import { urlFor } from '../lib/sanity';
import { LOCALES, LOCALE_LABELS, DEFAULT_LOCALE, normalizeLocale, loc, pick, href as hrefFor } from '../lib/locale';

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
  const t = useTranslations('Header');
  // Язык берём из первого сегмента пути: /en/... , /kz/... , иначе русский
  const locale = normalizeLocale(pathname.split('/')[1]);
  const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/kz';
  
  // =========================================================
  // 👇 НАСТРОЙКИ
  // =========================================================
  const INITIAL_TOP_OFFSET = 110; // Высота старта на главной
  const STICKY_GAP = 10;          // Зазор сверху при прилипании
  // =========================================================

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (pathname && pathname.startsWith('/studio')) {
    return null;
  }
// Сбрасываем меню при любом переходе на новую страницу
  useEffect(() => {
    setActiveMenu(null); // Закрывает десктопные дропдауны
    setIsMobileMenuOpen(false); // На всякий случай закрывает и мобильное меню
  }, [pathname]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (isHomePage) {
        const triggerPoint = INITIAL_TOP_OFFSET - STICKY_GAP;
        setIsSticky(scrollY >= triggerPoint);
      } else {
        setIsSticky(scrollY > STICKY_GAP);
      }
    };

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

  // --- ПОЗИЦИОНИРОВАНИЕ ---
  
  let headerClass = "left-0 right-0 z-50 w-full flex justify-center pointer-events-none"; 
  let topStyle = {};

  if (isHomePage) {
    if (isSticky) {
       headerClass += " fixed";
       topStyle = { top: `${STICKY_GAP}px` };
    } else {
       headerClass += " absolute";
       topStyle = { top: `${INITIAL_TOP_OFFSET}px` };
    }
  } else {
    headerClass += " fixed";
    topStyle = { top: `${STICKY_GAP}px` };
  }

  // Логика видимости для внешних элементов (Лого слева и Кнопка справа)
  // Они видны ВСЕГДА, ЕСЛИ: (Мы НЕ на главной) ИЛИ (Мы на главной И шапка прилипла)
  const showExternalElements = !isHomePage || isSticky;

  return (
    <header 
        className={headerClass}
        style={topStyle}
    >
      
      <div 
        ref={containerRef}
        className="relative pointer-events-auto w-full max-w-[1250px] px-4"
      >
        
        {/* --- ЛОГОТИП СЛЕВА (ВНЕШНИЙ) --- */}
        <div className={`
            absolute top-0 right-full mr-[15px] h-full hidden lg:flex items-center justify-end pointer-events-auto
            transition-all duration-500 ease-in-out
            ${showExternalElements 
                ? 'opacity-100 translate-x-0' // Виден: стоит на месте
                : 'opacity-0 translate-x-4 pointer-events-none' // Скрыт: прозрачный и сдвинут вправо (к центру)
            }
        `}>
            <Link href={hrefFor('/', locale)} className="block">
                <div className="w-[91px] h-[22px] relative flex items-center justify-center">
                    {logo ? (
                      <img src={urlFor(logo).url()} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 text-[10px] text-gray-500 flex items-center justify-center rounded">LOGO</div>
                    )}
                </div>
            </Link>
        </div>

        {/* --- САМА ПОЛОСКА МЕНЮ --- */}
        <div className="relative z-50 h-[50px] px-4 md:px-6 flex items-center justify-between">
            {/* ФОН */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[10px] border border-white/20 shadow-sm rounded-[15px] -z-10" />

            {/* Лого внутри (только для мобильных) */}
            <div className="flex items-center lg:hidden">
                <Link href={hrefFor('/', locale)} className="block">
                    <div className="w-[80px] h-[20px] relative">
                          {logo ? (
                             <img src={urlFor(logo).url()} alt="Logo" className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-xs font-bold text-gray-500">LOGO</span>
                          )}
                    </div>
                </Link>
            </div>

            {/* МЕНЮ */}
            <nav className="hidden lg:flex w-full justify-between items-center h-full">
              <MenuItem label={t('about')} name="about" />
              <MenuItem label={t('courses')} name="courses" />
              <MenuItem label={t('consulting')} name="consulting" />
              <MenuItem label={t('explosion')} name="explosion" />
              <MenuItem label={t('emergency')} name="emergency" />
              <MenuItem label={t('engineering')} name="engineering" />
              <MenuItem label={t('ppe')} name="ppe" />
              <MenuItem label={t('contacts')} name="contacts" />
            </nav>

            {/* БУРГЕР (МОБИЛЬНЫЙ) */}
            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-black hover:bg-black/5 rounded-lg transition-colors"
            >
                <Menu className="w-6 h-6" />
            </button>
        </div>

        {/* --- КНОПКИ СПРАВА (ВНЕШНИЕ, ТОЛЬКО > 1536px) --- */}
        <div className={`
            hidden 2xl:flex absolute top-0 left-full ml-[15px] h-full items-center gap-2 z-40
            transition-all duration-500 ease-in-out
            ${showExternalElements
                ? 'opacity-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 -translate-x-4 pointer-events-none'
            }
        `}>
            <LanguageSwitcher locale={locale} pathname={pathname} />
            <Button className="!w-[50px] !px-0 flex items-center justify-center">
                <Send className="w-5 h-5 -ml-1 text-white" />
            </Button>
        </div>

        {/* --- КНОПКИ ПОД ШАПКОЙ (ВСЕ ЭКРАНЫ < 1536px) --- */}
        <div className="2xl:hidden absolute top-full right-4 mt-2 flex flex-col items-end gap-2 z-40 pointer-events-auto">
            <LanguageSwitcher locale={locale} pathname={pathname} />
            <Button className="!w-[50px] !px-0 flex items-center justify-center">
                <Send className="w-5 h-5 -ml-1 text-white" />
            </Button>
        </div>

        {/* DROPDOWNS */}
        <div className="hidden lg:block absolute top-full left-0 w-full pt-4 z-40">
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
                <MobileAccordion label={t('about')}>
                    {aboutItems?.map((item: any) => {
                        const slugPath = item.slug.current === 'events' ? 'news' : item.slug.current;
                        const itemHref = hrefFor(slugPath, locale);
                        return (
                            <Link
                                key={item._id}
                                href={itemHref}
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="block py-2 pl-4 text-sm text-gray-600 border-l-2 border-gray-100 hover:text-[#0B0073]"
                            >
                                {loc(item, 'title', locale)}
                            </Link>
                        )
                    })}
                </MobileAccordion>

                <MobileAccordion label={t('courses')}>
                    {categories?.map((cat: any) => (
                        <div key={cat._id} className="pl-4 py-2 text-sm text-gray-600 border-l-2 border-gray-100 mb-2">
                            <div className="font-semibold text-black mb-1">{loc(cat, 'title', locale)}</div>
                            <div className="flex flex-col gap-1">
                                {cat.courses?.map((c: any) => (
                                    <Link
                                        key={c.slug?.current}
                                        href={hrefFor(c.slug?.current, locale)}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-1 hover:text-[#0B0073]"
                                    >
                                        {loc(c, 'title', locale)}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="pl-4 py-2 text-sm text-gray-600 border-l-2 border-gray-100 mb-2">
                        <div className="font-semibold text-black mb-1">
                            {pick({ ru: 'Онлайн курсы', en: 'Online Courses', kz: 'Онлайн курстар' }, locale)}
                        </div>
                        <div className="flex flex-col gap-1">
                            <Link
                                href={hrefFor('horizon-university', locale)}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-1 hover:text-[#0B0073]"
                            >
                                Horizon University
                            </Link>
                        </div>
                    </div>
                </MobileAccordion>
                
                <MobileAccordion label={t('consulting')}>
                    {consultingItems?.map((item: any) => (
                        <Link key={item._id} href={hrefFor(item.slug?.current, locale)} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 pl-4 text-sm text-gray-600 border-l-2 border-gray-100 hover:text-[#0B0073]">
                            {loc(item, 'title', locale)}
                        </Link>
                    ))}
                </MobileAccordion>

                <MobileAccordion label={t('explosion')}>
                    {explosionItems?.map((item: any) => (
                        <Link key={item._id} href={hrefFor(item.slug?.current, locale)} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 pl-4 text-sm text-gray-600 border-l-2 border-gray-100 hover:text-[#0B0073]">
                            {loc(item, 'title', locale)}
                        </Link>
                    ))}
                </MobileAccordion>
                
                <Link href="#" className="text-[18px] font-medium py-3 border-b border-gray-100 text-gray-400">{t('mobileEmergency')}</Link>
                <Link href="#" className="text-[18px] font-medium py-3 border-b border-gray-100 text-gray-400">{t('mobileEngineering')}</Link>
                <Link href="#" className="text-[18px] font-medium py-3 border-b border-gray-100 text-gray-400">{t('mobilePpe')}</Link>

                <MobileAccordion label={t('contacts')}>
                    <div className="pl-4 text-sm text-gray-600 space-y-4">
                        {contactCities?.map((city: any) => (
                            <div key={city._id}>
                                <div className="font-bold text-[#0B0073]">{loc(city, 'city', locale)}</div>
                                <div>{city.phones?.[0]}</div>
                            </div>
                        ))}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="text-xs text-gray-400">{t('email')}</div>
                            <a href="mailto:sales@horizon-llp.com" className="font-medium">sales@horizon-llp.com</a>
                        </div>
                    </div>
                </MobileAccordion>
            </div>

            <div className="p-4 border-t border-gray-100">
                <Button className="w-full">{t('cta')}</Button>
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

function LanguageSwitcher({ locale, pathname }: { locale: string; pathname: string }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const switchTo = (newLocale: string) => {
        setOpen(false);
        if (newLocale === locale) return;

        // Снимаем текущий префикс языка, иначе получится /en/kz/...
        const seg = pathname.split('/')[1];
        const bare = (seg === 'en' || seg === 'kz') ? (pathname.slice(seg.length + 1) || '/') : pathname;
        const prefix = newLocale === DEFAULT_LOCALE ? '' : '/' + newLocale;
        router.push(prefix + (bare === '/' ? '' : bare) || '/');
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                aria-label="Выбор языка"
                className="w-[50px] h-[50px] rounded-[15px] bg-[#0B0073] text-white flex flex-col items-center justify-center gap-0.5 shadow-xl hover:shadow-[0_10px_20px_rgba(11,0,115,0.4)] active:scale-95 transition-all duration-300"
            >
                <Globe className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase leading-none">
                    {LOCALE_LABELS[normalizeLocale(locale)]}
                </span>
            </button>
            {open && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-[10px] shadow-lg overflow-hidden z-50 w-[64px]">
                    {LOCALES.map((code) => (
                        <button
                            key={code}
                            onClick={() => switchTo(code)}
                            className={`w-full px-3 py-2.5 text-sm text-left transition-colors ${
                                locale === code ? 'text-[#0B0073] font-bold bg-blue-50' : 'hover:bg-gray-50'
                            }`}
                        >
                            {LOCALE_LABELS[code]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
