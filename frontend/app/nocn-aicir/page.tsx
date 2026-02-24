"use client";

import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Button from "../components/Button"; // <--- ДОБАВЬ ЭТУ СТРОКУ

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

export default function NocnAicirPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          {/* Сама картинка (на дне) */}
          <Image src="/assets/nocn/hero-bg.jpg" alt="Background NOCN" fill className="object-cover" />
          
          {/* Синий фильтр поверх картинки (установлен на 80%) */}
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          {/* Контент */}
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo (сверху слева) */}
            <div className="flex justify-start items-start">
              <Image src="/assets/nocn/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть: Заголовок и Текст */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              
              {/* Title (слева) */}
              <div className="max-w-2xl">
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-1 drop-shadow-lg">
                  NOCN AICIR
                </h1>
                <p className="text-xl lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md">
                  (Asset Incident Commander – Initial Response)
                </p>
              </div>

              {/* Right Text (справа, выровнен по низу) */}
              <p className="hidden lg:block text-[12px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">
                Практический курс для руководителей и членов штабов аварийного управления. Программа учит действовать в первые критические минуты крупной аварии, когда цена ошибки недопустимо высока, а решения нужно принимать быстро, четко и на основе фактов.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ОТРАБОТКА УПРАВЛЕНИЯ (5 Карточек) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-10`}>Отработка управления инцидентами<br/>по структуре Incident Command System</h2>
        
        {/* 5 Карточек в ряд */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col items-start">
                <img src="/assets/nocn/icon-info.png" className="h-10 w-auto mb-4 opacity-80 object-contain" alt="Info" />
                <h3 className={`${TEXT_H3} mb-1`}>Сбор информации</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">и оценка обстановки;</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col items-start">
                <img src="/assets/nocn/icon-priority.png" className="h-10 w-auto mb-4 opacity-80 object-contain" alt="Priority" />
                <h3 className={`${TEXT_H3} mb-1`}>Постановка приоритетов</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">и распределение ресурсов;</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col items-start">
                <img src="/assets/nocn/icon-comm.png" className="h-10 w-auto mb-4 opacity-80 object-contain" alt="Communication" />
                <h3 className={`${TEXT_H3} mb-1`}>Управление коммуникациями</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">и взаимодействие с оперативными службами;</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col items-start">
                <img src="/assets/nocn/icon-team.png" className="h-10 w-auto mb-4 opacity-80 object-contain" alt="Team" />
                <h3 className={`${TEXT_H3}`}>Команда объекта, контроль эскалации и защита людей, оборудования и окружающей среды.</h3>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col items-start">
                <img src="/assets/nocn/icon-method.png" className="h-10 w-auto mb-4 opacity-80 object-contain" alt="Methodology" />
                <h3 className={`${TEXT_H3} mb-1`}>Методология:</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Курс построен на интенсивных сценариях с четкими протоколами (SITREP, M/ETHANE и др.).</p>
            </div>

        </div>
      </section>

      {/* ==================== 3. СИМУЛЯЦИИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Симуляции, максимально приближенные к реальности</h2>
        
        {/* Сетка: 2 колонки текста + 2 колонки картинка (50% экрана) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            
            {/* Текст 1 (Левый) */}
            <div className="lg:col-span-1">
              <p className={TEXT_BODY}>
                Ключевая особенность — динамика событий, неожиданные вводные, ограниченность ресурсов, конфликтующие сообщения и давление времени.
              </p>
            </div>

            {/* Текст 2 (Средний) */}
            <div className="lg:col-span-1">
              <p className={TEXT_BODY}>
                Это позволяет участникам прочувствовать стресс и нагрузку, которые неизбежны в реальной аварии, и при этом научиться сохранять управляемость, дисциплину решений и контроль команды.
              </p>
            </div>

            {/* Картинка (Правая, занимает 50% ширины на больших экранах) */}
            <div className="lg:col-span-2 relative h-[140px] md:h-[180px] rounded-[15px] overflow-hidden shadow-sm">
               <Image src="/assets/nocn/simulation-bg.jpg" alt="Simulation Alarm" fill className="object-cover" />
            </div>

        </div>
      </section>

      {/* ==================== 4. ИТОГИ ОБУЧЕНИЯ (3 Карточки) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>По итогам обучения участники:</h2>

        {/* 3 Карточки в ряд */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
                <img src="/assets/nocn/icon-confident.png" className="h-12 w-auto shrink-0 opacity-80 object-contain" alt="Confident" />
                <div className="flex flex-col">
                    <h4 className="text-[13px] font-bold text-black/90 mb-0.5">Уверенно применяют</h4>
                    <p className="text-[11px] text-black/60 leading-snug">инструменты принятия решений под давлением.</p>
                </div>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
                <img src="/assets/nocn/icon-ready.png" className="h-12 w-auto shrink-0 opacity-80 object-contain" alt="Ready" />
                <div className="flex flex-col">
                    <h4 className="text-[13px] font-bold text-black/90 mb-0.5">Повышают</h4>
                    <p className="text-[11px] text-black/60 leading-snug">общую готовность к ЧС.</p>
                </div>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
                <img src="/assets/nocn/icon-reduce.png" className="h-12 w-auto shrink-0 opacity-80 object-contain" alt="Reduce" />
                <div className="flex flex-col">
                    <h4 className="text-[13px] font-bold text-black/90 mb-0.5">Снижают</h4>
                    <p className="text-[11px] text-black/60 leading-snug">риск потерь, простоев и репутационных последствий.</p>
                </div>
            </div>

        </div>

{/* Кнопка заявки */}
        <div className="flex justify-center pb-10">
            <Button>
                Оставить заявку
            </Button>
        </div>

      </section>

    </main>
  );
}