"use client";

import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Button from "../components/Button"; // <--- ДОБАВЬ ЭТУ СТРОКУ
import ButtonWhite from "../components/ButtonWhite";

// Подключаем шрифт Montserrat
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

// === ТИПОГРАФИКА ===
const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[16px] font-semibold text-black opacity-90 leading-tight";
const TEXT_BODY = "text-[13px] font-normal text-black opacity-80 leading-relaxed";

export default function DiagnostikaPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
{/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          {/* 1. Сама картинка (полностью непрозрачная, на дне) */}
          <Image src="/assets/diag/hero-bg.jpg" alt="Background" fill className="object-cover" />
          
          {/* 2. Синий фильтр поверх картинки (тут меняешь прозрачность, сейчас /80) */}
          <div className="absolute inset-0 bg-[#0B0073]/00"></div>
          
          {/* 3. Контент */}
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo (сверху слева) */}
            <div className="flex justify-start items-start">
              <Image src="/assets/diag/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть: Заголовок и Текст */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              
              {/* Title (слева) */}
              <div className="max-w-2xl">
                {/* Уменьшен интервал: leading-[1.1] и mb-1 */}
                <h1 className="text-3xl lg:text-[36px] font-bold text-white leading-[1.1] mb-1 drop-shadow-lg">
                  Диагностика системы БиОТ:
                </h1>
                <p className="text-xl lg:text-[18px] font-medium text-white/90 leading-tight drop-shadow-md">
                  как найти «скрытые» проблемы до инцидента
                </p>
              </div>

              {/* Right Text (справа, выровнен по низу) */}
              {/* Убрана плашка, уменьшен интервал (leading-snug) */}
              <p className="hidden lg:block text-[12px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">
                Во многих компаниях основные риски рождаются не из незнания правил, а из скрытых системных сбоев: процедуры есть, но не работают, проверки проводятся, но не приводят к изменениям, инциденты не расследуются, а лишь маскируются. Такие проблемы редко видны по отчетам и KPI — они проявляются тогда, когда уже поздно.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. СТАТИСТИКА 35% (С готовым SVG) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-12 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          
          {/* Левая часть: Готовый SVG График (включая текст внутри) */}
          <div className="w-full lg:w-1/2 flex justify-start lg:justify-center">
            <img 
              src="/assets/diag/cercle.svg" 
              alt="35% событий не фиксируются" 
              className="w-full max-w-[400px] lg:max-w-[480px] h-auto object-contain"
            />
          </div>

          {/* Правая часть: Блок с текстом (Исправлено по макету) */}
          <div className="w-full lg:w-1/2 flex items-center justify-start">
            <div className="w-full bg-transparent border border-black/20 rounded-[15px] px-8 py-6 lg:px-10 lg:py-8 flex flex-col items-start justify-center">
              
              {/* Первое предложение: шрифт чуть больше (14-15px) */}
              <p className="text-left text-[14px] lg:text-[15px] text-black/80 mb-3">
                А в глобальном масштабе масштаб потерь <span className="underline underline-offset-4 decoration-black/40 font-semibold">огромен:</span>
              </p>
              
              {/* Второе предложение: стандартный размер (12-13px) и чуть прозрачнее */}
              <p className="text-left text-[12px] lg:text-[13px] text-black/60 leading-relaxed">
                ежегодно миллионы людей погибают по причинам, связанным с работой, а сотни миллионов получают травмы — это отражает системную неэффективность в управлении рисками, а не только в формальном соблюдении требований.
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* ==================== 3. ЗАЧЕМ НУЖНА ДИАГНОСТИКА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-10`}>Зачем нужна диагностика</h2>
        
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          <div className="w-full lg:w-1/3 relative h-[220px] rounded-[15px] overflow-hidden shadow-sm">
            <Image src="/assets/diag/why-img.jpg" alt="Inspection" fill className="object-cover" />
          </div>
          <div className="w-full lg:w-2/3 flex flex-col justify-center">
            <p className="text-[14px] font-semibold text-black/90 mb-4">
              Цели диагностики — помочь руководству увидеть причины, а не только последствия:
            </p>
            <ul className="space-y-3">
              {[
                "где контроль стал формальным;",
                "какие барьеры (технические/организационные) работают нестабильно;",
                "где риски нормализовались («так всегда было»);",
                "почему персонал не сообщает о почти инцидентах и опасных условиях;",
                "как процессы (PTW / LOTO / JSA / Управление подрядчиками) реально работают."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                  <span className={TEXT_BODY}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

{/* ==================== ДИАГРАММА ИНЦИДЕНТА (Векторные картинки) ==================== */}
        <div className="w-full mt-12 flex justify-center items-center">
            
            {/* 1. Десктопная версия (Большие экраны: от 1024px и шире) */}
            <div className="hidden lg:block w-full">
                <img 
                    src="/assets/diag/diagram-desktop.svg" 
                    alt="Схема: Диагностика ловит проблему до триггера" 
                    className="w-full h-auto object-contain drop-shadow-sm"
                />
            </div>

            {/* 2. Планшетная версия / Маленький десктоп (Экраны от 768px до 1024px) */}
            <div className="hidden md:block lg:hidden w-full">
                <img 
                    src="/assets/diag/diagram-desktop_min.svg" 
                    alt="Схема: Диагностика ловит проблему до триггера" 
                    className="w-full h-auto object-contain drop-shadow-sm"
                />
            </div>

            {/* 3. Мобильная версия (Маленькие экраны: до 768px) */}
            <div className="block md:hidden w-full">
                <img 
                    src="/assets/diag/diagram-mobile.svg" 
                    alt="Схема: Диагностика ловит проблему до триггера" 
                    className="w-full h-auto object-contain drop-shadow-sm"
                />
            </div>

        </div>
      </section>

      {/* ==================== 4. ЧТО МЫ ДИАГНОСТИРУЕМ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 items-start mb-10">
            <h2 className={`${TEXT_H2} shrink-0`}>Что мы диагностируем</h2>
            <p className={TEXT_BODY}>
              Мы оцениваем систему БиОТ как управленческий механизм (по модели PDCA) — от планирования и лидерства до проверки эффективности и корректирующих действий.
            </p>
            <p className={TEXT_BODY}>
              Подход согласуется с принципами построения и улучшения систем охраны труда, заложенными в <b>ISO 45001</b> (система должна не просто существовать, а управлять рисками и улучшаться).
            </p>
        </div>

        <p className="text-[12px] text-black/50 mb-6">Диагностика обычно включает:</p>

        {/* 5 Карточек в ряд */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/diag/icon-risk.png" className="w-10 h-10 mb-4 opacity-80" alt="Risk" />
                <h3 className={`${TEXT_H3} mb-3`}>Управление ключевыми рисками</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">PTW, SIMOPS, LOTO, подрядчики, MOC, управление барьерами, готовность к авариям.</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/diag/icon-incident.png" className="w-10 h-10 mb-4 opacity-80" alt="Incident" />
                <h3 className={`${TEXT_H3} mb-3`}>Инциденты и near miss</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Качество расследований, причины недосообщения, обучение на событиях.</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/diag/icon-culture.png" className="w-10 h-10 mb-4 opacity-80" alt="Culture" />
                <h3 className={`${TEXT_H3} mb-3`}>Лидерство и культура безопасности</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Как руководители задают приоритеты, как принимаются решения, как работает обратная связь.</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/diag/icon-field.png" className="w-10 h-10 mb-4 opacity-80" alt="Field" />
                <h3 className={`${TEXT_H3} mb-3`}>Полевые практики</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Как люди реально выполняют работу, соответствие процедур фактическим условиям.</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/diag/icon-competence.png" className="w-10 h-10 mb-4 opacity-80" alt="Competence" />
                <h3 className={`${TEXT_H3} mb-3`}>Компетенции и контроль</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Обучение, допуски, наблюдение за работой, аудит — насколько они формальны.</p>
            </div>

        </div>
      </section>

      {/* ==================== 5. ЧТО ПОЛУЧАЕТ КЛИЕНТ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        
        <div className="flex flex-col md:flex-row gap-10 mb-8">
            <div className="w-full md:w-1/2">
                <h2 className={`${TEXT_H2} mb-4`}>Что получает клиент на выходе</h2>
                <p className={TEXT_BODY}>
                   Чтобы результат был практичным, мы выдаем не «толстый отчет ради отчета», а пакет внедрения:
                </p>
            </div>
            <div className="w-full md:w-1/2">
                <h2 className={`${TEXT_H2} mb-4`}>Почему это работает</h2>
                <p className={TEXT_BODY}>
                   Мы не ищем «виноватых». Мы оцениваем систему и предлагаем решения — так, чтобы безопасность становилась устойчивым элементом производственной эффективности, а не просто «комплаенсом».
                </p>
            </div>
        </div>

     {/* 4 Карточки результата */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            
            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                <img src="/assets/diag/icon-map.png" className="w-8 h-8 shrink-0 opacity-80" alt="Map" />
                <div>
                    <h4 className="text-[13px] font-bold text-black/90 mb-1">Карта зрелости системы БиОТ</h4>
                    <p className="text-[11px] text-black/60 leading-snug">Что работает, что не работает, сохраняя анализ.</p>
                </div>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                <img src="/assets/diag/icon-top.png" className="w-8 h-8 shrink-0 opacity-80" alt="Top" />
                <div>
                    <h4 className="text-[13px] font-bold text-black/90 mb-1">Топ-10/20 приоритетных разрывов</h4>
                    <p className="text-[11px] text-black/60 leading-snug">С объяснением «почему это важно» (влияние на людей, производство, репутацию).</p>
                </div>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                <img src="/assets/diag/icon-roadmap.png" className="w-8 h-8 shrink-0 opacity-80" alt="Roadmap" />
                <div>
                    <h4 className="text-[13px] font-bold text-black/90 mb-1">Дорожная карта улучшений</h4>
                    <p className="text-[11px] text-black/60 leading-snug">На 90 дней / 6 месяцев / 12 месяцев (быстрые победы + системные изменения).</p>
                </div>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                <img src="/assets/diag/icon-smart.png" className="w-8 h-8 shrink-0 opacity-80" alt="Smart" />
                <div>
                    <h4 className="text-[13px] font-bold text-black/90 mb-1">SMART-план действий</h4>
                    <p className="text-[11px] text-black/60 leading-snug">С владельцами, сроками и критериями проверки выполнения.</p>
                </div>
            </div>

        </div>

{/* Кнопки заявки */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pb-10">
            {/* Основная синяя кнопка (открывает модалку) */}
            <Button>
                Оставить заявку
            </Button>

            {/* Вторая белая кнопка (открывает Google Форму) */}
            <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfycmEUau4ILUxGVh0Vgbt57-kIY9fS2e4aLNca6EbZPKagsA/viewform" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                <ButtonWhite noModal>
                    Заполнить форму
                </ButtonWhite>
            </a>
        </div>

      </section>

    </main>
  );
}