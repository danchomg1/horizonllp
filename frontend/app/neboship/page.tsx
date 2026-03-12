"use client";

import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Button from "../components/Button";
import ButtonWhite from "../components/ButtonWhite";

// Подключаем шрифт Montserrat
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

// === ТИПОГРАФИКА ===
const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[15px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

export default function NeboshInvestigationPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/nebosh-investigation/hero-bg.jpg" alt="NEBOSH Incident Investigation" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh-investigation/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <p className="text-lg lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">
                  Краткий однодневный курс от NEBOSH и HSE
                </p>
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">
                  Introduction to Incident Investigation
                </h1>
              </div>

              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">
                Курс поможет научиться эффективно расследовать несложные происшествия и предотвращать их повторение, опираясь на лучшие международные практики.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. АУДИТОРИЯ И РЕЗУЛЬТАТ ДЛЯ КОМПАНИИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Левая колонка - Кому подойдет (БЕЗ РАМКИ, воздушный список) */}
            <div className="w-full lg:w-1/3 flex flex-col items-start pt-2">
                <h2 className={`${TEXT_H2} mb-6`}>Кому подойдет</h2>
                <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Руководителям</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Специалистам по охране труда</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">SHE-кураторам</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Профсоюзным и ответственным представителям</span>
                    </li>
                </ul>
            </div>

            {/* Правая колонка - Для работодателя (С РАМКАМИ, так как это плитка) */}
            <div className="w-full lg:w-2/3">
                <h2 className={`${TEXT_H2} mb-6`}>Для работодателя</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex gap-4 items-center hover:shadow-md transition-shadow">
                        <img src="/assets/nebosh-investigation/icon-emp-reduce.png" className="w-10 h-10 opacity-80 object-contain shrink-0" alt="Снижение" />
                        <h3 className={`${TEXT_H3} text-[13px] leading-snug`}>Снижение количества повторных случаев</h3>
                    </div>

                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex gap-4 items-center hover:shadow-md transition-shadow">
                        <img src="/assets/nebosh-investigation/icon-emp-quality.png" className="w-10 h-10 opacity-80 object-contain shrink-0" alt="Качество" />
                        <h3 className={`${TEXT_H3} text-[13px] leading-snug`}>Повышение качества внутренних расследований</h3>
                    </div>

                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex gap-4 items-center hover:shadow-md transition-shadow">
                        <img src="/assets/nebosh-investigation/icon-emp-trust.png" className="w-10 h-10 opacity-80 object-contain shrink-0" alt="Доверие" />
                        <h3 className={`${TEXT_H3} text-[13px] leading-snug`}>Рост экспертности и доверия</h3>
                    </div>

                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex gap-4 items-center hover:shadow-md transition-shadow">
                        <img src="/assets/nebosh-investigation/icon-emp-culture.png" className="w-10 h-10 opacity-80 object-contain shrink-0" alt="Культура" />
                        <h3 className={`${TEXT_H3} text-[13px] leading-snug`}>Улучшение имиджа и культуры безопасности</h3>
                    </div>

                </div>
            </div>

        </div>
      </section>

      {/* ==================== 3. ВЫ НАУЧИТЕСЬ (Карточки) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Чему вы научитесь на курсе</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-investigation/icon-skill-investigate.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Расследование" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Самостоятельно проводить расследование</p>
            </div>

            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-investigation/icon-skill-interview.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Интервью" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Проводить интервью и собирать доказательства</p>
            </div>

            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-investigation/icon-skill-plan.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="План" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Разрабатывать план предотвращения повторных инцидентов</p>
            </div>

            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-investigation/icon-skill-team.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Команда" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Участвовать в командных расследованиях</p>
            </div>

            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-investigation/icon-skill-culture.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Культура" />
                <p className="text-[12px] font-bold text-black/90 leading-relaxed">Повышать общую культуру безопасности</p>
            </div>

        </div>
      </section>

      {/* ==================== 4. ОЦЕНКА (БЕЗ РАМКИ, с акцентной линией) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Как проходит оценка</h2>
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-l-4 border-[#0B0073] pl-6 py-2">
            <img src="/assets/nebosh-investigation/icon-exam-practice.png" className="h-[50px] w-auto opacity-80 object-contain shrink-0" alt="Оценка" />
            <div>
                <h3 className="text-[16px] font-bold text-black/90 mb-2">Практическое задание:</h3>
                <p className="text-[13px] font-normal text-black/80 leading-relaxed max-w-2xl">
                    Анализ интервью и доказательств, составление структурированного плана действий для предотвращения инцидента в будущем.
                </p>
            </div>
        </div>
      </section>

      {/* ==================== 5. КНОПКИ ЗАЯВКИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Основная кнопка (Модалка) */}
            <Button>
                Оставить заявку
            </Button>
            
          
        </div>
      </section>

    </main>
  );
}