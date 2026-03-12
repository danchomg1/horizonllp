"use client";

import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Button from "../components/Button";

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

export default function NeboshLeadershipPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/nebosh-leadership/hero-bg.jpg" alt="NEBOSH Leadership Excellence" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh-leadership/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">
                  NEBOSH Leadership Excellence
                </h1>
                <p className="text-xl lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md">
                  Лидерство в области безопасности и охраны труда
                </p>
              </div>

              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">
                Курс для тех, кто хочет понять истинное влияние своего лидерства на корпоративную культуру и научиться принимать эффективные бизнес-решения без ущерба для безопасности людей.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. АУДИТОРИЯ И ЦЕЛИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Левая колонка - Целевая аудитория */}
            <div className="w-full lg:w-1/3">
                <h2 className={`${TEXT_H2} mb-6`}>Целевая аудитория</h2>
                <ul className="space-y-4">
                    <li className="flex gap-3 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                        <span className={TEXT_BODY}>Руководители высшего и среднего звена.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                        <span className={TEXT_BODY}>Менеджеры по охране труда.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                        <span className={TEXT_BODY}>Любые специалисты, заинтересованные в улучшении лидерских качеств в контексте безопасности и охраны труда на рабочем месте.</span>
                    </li>
                </ul>
            </div>

            {/* Правая колонка - Цель программы */}
            <div className="w-full lg:w-2/3">
                <h2 className={`${TEXT_H2} mb-6`}>Цель программы</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-transparent border border-black/30 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                        <img src="/assets/nebosh-leadership/icon-goal-dev.png" className="w-10 h-10 mb-4 opacity-80 object-contain" alt="Развитие" />
                        <p className="text-[12px] font-medium text-black/80 leading-relaxed">Развитие лидерских навыков в контексте управления охраной труда.</p>
                    </div>
                    <div className="bg-transparent border border-black/30 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                        <img src="/assets/nebosh-leadership/icon-goal-influence.png" className="w-10 h-10 mb-4 opacity-80 object-contain" alt="Влияние" />
                        <p className="text-[12px] font-medium text-black/80 leading-relaxed">Понимание влияния лидерства на безопасность и охрану труда на рабочем месте.</p>
                    </div>
                    <div className="bg-transparent border border-black/30 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                        <img src="/assets/nebosh-leadership/icon-goal-practice.png" className="w-10 h-10 mb-4 opacity-80 object-contain" alt="Практики" />
                        <p className="text-[12px] font-medium text-black/80 leading-relaxed">Применение лучших практик для формирования культуры безопасности.</p>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* ==================== 3. ОСНОВНЫЕ ТЕМЫ ПРОГРАММЫ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Основные темы программы</h2>
        
        {/* Карточки в сетке. 7 штук. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-transparent border border-black/30 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-leadership/icon-topic-meaning.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Значение лидерства" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Что означает лидерство в области безопасности и охраны труда</p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-leadership/icon-topic-reasons.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Причины" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Моральные, правовые и финансовые причины хорошего лидерства по БиОТ</p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-leadership/icon-topic-culture.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Культура" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Связи между лидерством и культурой охраны труда и техники безопасности</p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-leadership/icon-topic-styles.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Стили" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Каковы различные стили лидерства</p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-leadership/icon-topic-error.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Ошибки" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Как человеческие ошибки могут повлиять на производительность и культуру</p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-leadership/icon-topic-model.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Модель" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Модель эффективного руководства в области безопасности и охраны труда</p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-leadership/icon-topic-relations.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Отношения" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Как лидеры могут строить эффективные отношения с коллегами</p>
            </div>

        </div>
      </section>

      {/* ==================== 4. ФОРМАТ ПРОГРАММЫ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Формат программы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex items-start gap-6">
                <img src="/assets/nebosh-leadership/icon-format-time.png" className="h-[50px] w-auto opacity-80 object-contain shrink-0" alt="Длительность" />
                <div>
                    <h3 className={`${TEXT_H3} mb-2`}>Длительность</h3>
                    <p className={TEXT_BODY}><b>1 день</b> (может варьироваться в зависимости от уровня знаний участников).</p>
                </div>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex items-start gap-6">
                <img src="/assets/nebosh-leadership/icon-format-methods.png" className="h-[50px] w-auto opacity-80 object-contain shrink-0" alt="Методы" />
                <div>
                    <h3 className={`${TEXT_H3} mb-2`}>Методы обучения</h3>
                    <p className={TEXT_BODY}>Интерактивные лекции, кейс-стади, групповые обсуждения, практические упражнения.</p>
                </div>
            </div>

        </div>
      </section>

      {/* ==================== 5. ПРЕИМУЩЕСТВА ПРОГРАММЫ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Преимущества программы</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <img src="/assets/nebosh-leadership/icon-ben-model.png" className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="Лидерство" />
                <p className={TEXT_BODY}>
                  <b>Лидерство</b>, которое отражает модель эффективного руководства безопасности и охраны труда.
                </p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <img src="/assets/nebosh-leadership/icon-ben-decisions.png" className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="Решения" />
                <p className={TEXT_BODY}>
                  <b>Здоровье и безопасность</b> будут учитываться при принятии бизнес-решений в будущем.
                </p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <img src="/assets/nebosh-leadership/icon-ben-behavior.png" className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="Поведение" />
                <p className={TEXT_BODY}>
                  Лидеры, которые <b>признают</b>, что их собственное поведение влияет на культуру охраны здоровья и безопасности.
                </p>
            </div>

        </div>
      </section>

      {/* ==================== 6. КНОПКА ЗАЯВКИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex justify-center">
            <Button>
                Оставить заявку
            </Button>
        </div>
      </section>

    </main>
  );
}