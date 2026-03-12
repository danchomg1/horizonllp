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

export default function IoshWorkingSafelyPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/iosh-working-safely/hero-bg.jpg" alt="IOSH Working Safely" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/iosh-working-safely/hse-logo.svg" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">
                  IOSH Working Safely
                </h1>
                <p className="text-xl lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md">
                   Этот курс отличается своей простотой и практичностью. Он разработан так, чтобы любой сотрудник, независимо от уровня образования, понял основы безопасности и важность предотвращения инцидентов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. АУДИТОРИЯ И ПРЕИМУЩЕСТВА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Для кого этот курс (Без рамки, воздушный список) */}
            <div className="w-full lg:w-1/3 pt-2">
                <div className="flex items-center gap-4 mb-8">
                    <img src="/assets/iosh-working-safely/icon-audience.png" className="w-10 h-10 opacity-80 object-contain" alt="Audience" />
                    <h2 className={TEXT_H2}>Для кого этот курс?</h2>
                </div>
                <p className={`${TEXT_BODY} mb-6`}>Курс универсален и подходит для сотрудников всех уровней и отраслей:</p>
                <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Рабочие и технические специалисты.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Менеджеры и руководители (как вводный курс).</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Любой персонал, желающий повысить свое понимание в области охраны труда.</span>
                    </li>
                </ul>
            </div>

            {/* Преимущества (Карточки) */}
            <div className="w-full lg:w-2/3">
                <h2 className={`${TEXT_H2} mb-8`}>Преимущества</h2>
                
                {/* Для сотрудника */}
                <h3 className="text-[13px] font-bold text-black/40 uppercase tracking-widest mb-4">Для сотрудника</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex gap-4 items-center">
                        <img src="/assets/iosh-working-safely/icon-ben-intl.png" className="w-10 h-10 opacity-80 object-contain shrink-0" alt="Cert" />
                        <div>
                            <span className="text-[14px] font-bold text-black/90 block">Международная сертификация:</span>
                            <span className={TEXT_BODY}>По окончании курса выдается признанный во всем мире сертификат IOSH.</span>
                        </div>
                    </div>
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex gap-4 items-center">
                        <img src="/assets/iosh-working-safely/icon-ben-knowledge.png" className="w-10 h-10 opacity-80 object-contain shrink-0" alt="Know" />
                        <div>
                            <span className="text-[14px] font-bold text-black/90 block">Понятные знания:</span>
                            <span className={TEXT_BODY}>Отсутствие сложной терминологии позволяет сосредоточиться на реальных задачах.</span>
                        </div>
                    </div>
                </div>

                {/* Для компании */}
                <h3 className="text-[13px] font-bold text-black/40 uppercase tracking-widest mb-4">Для компании</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-5 flex flex-col items-start">
                        <img src="/assets/iosh-working-safely/icon-comp-reduce.png" className="w-8 h-8 opacity-80 mb-3" alt="Safe" />
                        <h4 className="text-[13px] font-bold text-black/90 mb-1">Снижение аварийности</h4>
                        <p className="text-[11px] text-black/60 leading-relaxed">Повышает осведомленность сотрудников, способствуя снижению числа несчастных случаев.</p>
                    </div>
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-5 flex flex-col items-start">
                        <img src="/assets/iosh-working-safely/icon-comp-norm.png" className="w-8 h-8 opacity-80 mb-3" alt="Norm" />
                        <h4 className="text-[13px] font-bold text-black/90 mb-1">Соответствие нормам</h4>
                        <p className="text-[11px] text-black/60 leading-relaxed">Помогает организации выполнять законодательные требования в области охраны труда.</p>
                    </div>
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-5 flex flex-col items-start">
                        <img src="/assets/iosh-working-safely/icon-comp-std.png" className="w-8 h-8 opacity-80 mb-3" alt="Std" />
                        <h4 className="text-[13px] font-bold text-black/90 mb-1">Единый стандарт</h4>
                        <p className="text-[11px] text-black/60 leading-relaxed">Создает общий язык безопасности внутри компании.</p>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* ==================== 3. ПРОГРАММА КУРСА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-24 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>Программа курса</h2>
        <p className={`${TEXT_BODY} mb-10`}>Программа лаконична и охватывает самые важные аспекты:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
                <img src="/assets/iosh-working-safely/icon-prog-intro.png" className="w-14 h-14 opacity-80 mb-4" alt="Intro" />
                <h4 className="text-[14px] font-bold text-black/90 leading-snug">Введение в принципы безопасной работы</h4>
                <p className="text-[11px] text-black/60 mt-2">Основы охраны здоровья и безопасности на рабочем месте.</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <img src="/assets/iosh-working-safely/icon-prog-risk.png" className="w-14 h-14 opacity-80 mb-4" alt="Risk" />
                <h4 className="text-[14px] font-bold text-black/90 leading-snug">Определение опасных факторов и рисков</h4>
                <p className="text-[11px] text-black/60 mt-2">Как различать опасность и риск, и почему это важно.</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <img src="/assets/iosh-working-safely/icon-prog-hazard.png" className="w-14 h-14 opacity-80 mb-4" alt="Hazard" />
                <h4 className="text-[14px] font-bold text-black/90 leading-snug">Определение общих опасных факторов</h4>
                <p className="text-[11px] text-black/60 mt-2">Обзор типичных угроз на рабочем месте.</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <img src="/assets/iosh-working-safely/icon-prog-improve.png" className="w-14 h-14 opacity-80 mb-4" alt="Improve" />
                <h4 className="text-[14px] font-bold text-black/90 leading-snug">Повышение показателей безопасности</h4>
                <p className="text-[11px] text-black/60 mt-2">Как каждый сотрудник может повлиять на улучшение общей безопасности.</p>
            </div>
        </div>
      </section>

      {/* ==================== 4. ФОРМАТ ОБУЧЕНИЯ (Акцентная линия) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-24 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Формат обучения и экзамена</h2>
        <div className="flex flex-col md:flex-row gap-12 border-l-4 border-[#0B0073] pl-8 py-4 bg-white/30 rounded-r-[15px]">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <img src="/assets/iosh-working-safely/icon-format-time.png" className="w-6 h-6 opacity-70" alt="Time" />
                    <span className="text-[15px] font-bold text-black/90">Длительность:</span>
                </div>
                <p className={TEXT_BODY}>1 день (может варьироваться в зависимости от уровня группы).</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <img src="/assets/iosh-working-safely/icon-format-method.png" className="w-6 h-6 opacity-70" alt="Method" />
                    <span className="text-[15px] font-bold text-black/90">Методы обучения:</span>
                </div>
                <p className={TEXT_BODY}>Это не просто лекции, а интерактивные занятия, включающие видеоматериалы и практические задания.</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <img src="/assets/iosh-working-safely/icon-format-eval.png" className="w-6 h-6 opacity-70" alt="Eval" />
                    <span className="text-[15px] font-bold text-black/90">Оценка:</span>
                </div>
                <p className={TEXT_BODY}>Для получения сертификата необходимо пройти контрольное тестирование, подтверждающее усвоение материала.</p>
            </div>
        </div>
      </section>

      {/* ==================== 5. КНОПКИ ЗАЯВКИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button>Оставить заявку</Button>

        </div>
      </section>

    </main>
  );
}