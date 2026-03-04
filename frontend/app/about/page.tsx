"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Button from "../components/Button"; // Убедись, что путь к кнопке верный

// Подключаем шрифт Montserrat
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

// === ТИПОГРАФИКА ===
const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[14px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

// === ДАННЫЕ ДЛЯ АККРЕДИТАЦИЙ ===
const accreditations = [
  {
    id: "post",
    navLogo: "/assets/about/logo-post.png",
    cardLogo: "/assets/about/logo-post.png",
    title: "POST (Petroleum Open Standards Training)",
    desc: "Стандарты обучения и оценки компетенций персонала в нефтегазовой отрасли. Обеспечивают единый подход к безопасности и качеству выполнения работ на промышленных объектах."
  },
  {
    id: "nebosh",
    navLogo: "/assets/about/logo-nebosh.png",
    cardLogo: "/assets/about/logo-nebosh-gold.png",
    title: "NEBOSH (National Examination Board in Occupational Safety and Health)",
    desc: "Это ведущая британская экзаменационная комиссия, устанавливающая мировые стандарты в области охраны труда, промышленной безопасности и экологии. Организация разрабатывает учебные программы и выдает престижные международные сертификаты, которые признаются «золотым стандартом» для специалистов HSE по всему миру."
  },
  {
    id: "iosh",
    navLogo: "/assets/about/logo-iosh.png",
    cardLogo: "/assets/about/logo-iosh.png",
    title: "IOSH (Institution of Occupational Safety and Health)",
    desc: "Крупнейшая в мире профессиональная организация специалистов по охране труда. Сертификация IOSH подтверждает высокий уровень знаний в управлении профессиональными рисками на рабочих местах."
  },
  {
    id: "iecex",
    navLogo: "/assets/about/logo-iecex.png",
    cardLogo: "/assets/about/logo-iecex.png",
    title: "IECEx (International Electrotechnical Commission System)",
    desc: "Международная система сертификации оборудования для использования во взрывоопасных средах. Гарантирует высочайший уровень безопасности при работе в зонах повышенного риска."
  },
  {
    id: "compex",
    navLogo: "/assets/about/logo-compex.png",
    cardLogo: "/assets/about/logo-compex.png",
    title: "CompEx (Competence in Ex atmospheres)",
    desc: "Международная схема признания компетентности персонала, работающего во взрывоопасных средах. Обучение и сертификация направлены на предотвращение аварий на объектах энергетики."
  },
  {
    id: "rospa",
    navLogo: "/assets/about/logo-rospa.png",
    cardLogo: "/assets/about/logo-rospa.png",
    title: "RoSPA (The Royal Society for the Prevention of Accidents)",
    desc: "Королевское общество по предотвращению несчастных случаев. Аккредитация RoSPA подтверждает приверженность компании высочайшим стандартам безопасности и непрерывному улучшению."
  }
];

export default function AboutPage() {
  const [activeAccreditation, setActiveAccreditation] = useState(0);

  // Автоматическое переключение каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAccreditation((prev) => (prev + 1) % accreditations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[450px] lg:h-[500px] rounded-[15px] overflow-hidden">
          
          <Image 
            src="/assets/about/hero-bg.jpg" 
            alt="Horizon Background" 
            fill 
            className="object-cover" 
          />
          
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            
            <div className="flex justify-end">
              <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-tight drop-shadow-md">
                Horizon INC
              </h1>
            </div>
            
            <div className="flex flex-col items-start max-w-[700px]">
              {/* Уменьшенный в 2 раза логотип (было 140x60) */}
              <Image 
                src="/assets/about/horizon-logo-white.png" 
                alt="Horizon Logo" 
                width={70} 
                height={30} 
                className="object-contain mb-6" 
              />
              <p className="text-[13px] lg:text-[15px] text-white/95 leading-relaxed font-medium drop-shadow-md">
                Казахстанская компания, работающая в области промышленной 
                безопасности, охраны труда, аварийного реагирования и взрывозащиты 
                с <span className="font-bold">2007 года</span>. Мы помогаем предприятиям снижать производственные риски, 
                повышать устойчивость бизнеса и формировать зрелую культуру 
                безопасности на основе международных стандартов и лучших отраслевых практик.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 2. КЛЮЧЕВЫЕ НАПРАВЛЕНИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-10`}>Ключевые направления и отрасли</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start">
                <img src="/assets/about/icon-training.png" className="h-14 w-auto mb-6 object-contain" alt="Training" />
                <h3 className={`${TEXT_H3} mb-3`}>Обучение и развитие компетенций персонала</h3>
                <p className={TEXT_BODY}>
                  Подготовка специалистов по мировым стандартам (NEBOSH, IOSH, OPITO, CompEx) и авторским курсам, основанным на реальном полевом опыте наших экспертов.
                </p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start">
                <img src="/assets/about/icon-engineering.png" className="h-14 w-auto mb-6 object-contain" alt="Engineering" />
                <h3 className={`${TEXT_H3} mb-3`}>Инженерные и инспекционные услуги</h3>
                <p className={TEXT_BODY}>
                  Профессиональный аудит, технические инспекции и инженерное сопровождение промышленных объектов на всех стадиях их жизненного цикла.
                </p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start">
                <img src="/assets/about/icon-consulting.png" className="h-14 w-auto mb-6 object-contain" alt="Consulting" />
                <h3 className={`${TEXT_H3} mb-3`}>Консалтинг в области БиОТ и процессной безопасности</h3>
                <p className={TEXT_BODY}>
                  Разработка стратегий и внедрение комплексных систем управления безопасностью, полностью адаптированных под специфику и задачи вашего бизнеса.
                </p>
            </div>

        </div>
      </section>

      {/* ==================== 3. ОПЫТ И АККРЕДИТАЦИИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Опыт и аккредитации</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Текст (Левая колонка) */}
            <div className="lg:col-span-4">
              <p className={TEXT_BODY}>
                Казахстанская компания, работающая в области промышленной безопасности, охраны труда, аварийного реагирования и взрывозащиты с 2007 года. Мы помогаем предприятиям снижать производственные риски, повышать устойчивость бизнеса и формировать зрелую культуру безопасности на основе международных стандартов и лучших отраслевых практик.
              </p>
            </div>

            {/* Интерактивный блок с логотипами (Правая колонка) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Ряд навигационных логотипов */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
                {accreditations.map((item, index) => (
                  <div 
                    key={item.id}
                    onMouseEnter={() => setActiveAccreditation(index)}
                    className={`cursor-pointer transition-all duration-300 ease-in-out ${
                      activeAccreditation === index 
                        ? "opacity-100 scale-110 filter drop-shadow-md" 
                        : "opacity-40 hover:opacity-80 grayscale hover:grayscale-0"
                    }`}
                  >
                    <img src={item.navLogo} alt={item.id} className="h-10 object-contain" />
                  </div>
                ))}
              </div>

              {/* Активная карточка */}
              <div className="bg-transparent border border-black/30 rounded-[15px] p-6 flex flex-col md:flex-row items-center md:items-start gap-6 min-h-[160px] transition-all duration-300">
                <div className="h-20 w-32 shrink-0 flex justify-center items-center">
                  <img 
                    src={accreditations[activeAccreditation].cardLogo} 
                    alt={accreditations[activeAccreditation].title} 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-black mb-2 transition-opacity duration-300">
                    {accreditations[activeAccreditation].title}
                  </h4>
                  <p className="text-[11px] lg:text-[12px] text-black/80 leading-relaxed transition-opacity duration-300">
                    {accreditations[activeAccreditation].desc}
                  </p>
                </div>
              </div>

            </div>
        </div>
      </section>

      {/* ==================== 4. НАША МИССИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-24 mb-16 px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-20">
          
          <div className="shrink-0">
            {/* Уменьшенный в 2 раза логотип (было w-[180px] lg:w-[220px]) */}
            <img src="/assets/about/horizon-logo-dark.png" alt="Horizon Logo Dark" className="w-[90px] lg:w-[110px] object-contain" />
          </div>

          <div className="flex flex-col md:flex-row gap-4 lg:gap-10 items-start">
            <h2 className={`${TEXT_H2} shrink-0`}>Наша миссия</h2>
            <p className={`${TEXT_BODY} max-w-[600px] mt-1`}>
              — развитие культуры безопасности и внедрение современных подходов к управлению рисками, которые защищают людей, активы и окружающую среду, обеспечивая устойчивое развитие предприятий и отраслей в целом.
            </p>
          </div>

        </div>
      </section>

      {/* ==================== 5. КНОПКА ДЕЙСТВИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto px-4 flex justify-center pb-10">
        <Button>
            Оставить заявку
        </Button>
      </section>

    </main>
  );
}