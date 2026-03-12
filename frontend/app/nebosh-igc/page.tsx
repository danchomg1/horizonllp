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

export default function NeboshIgcPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/nebosh/hero-bg.jpg" alt="Background NEBOSH" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col max-w-4xl gap-2">
              <h1 className="text-3xl lg:text-[52px] font-bold text-white leading-[1.1] drop-shadow-lg">
                Nebosh IGC
              </h1>
              <p className="text-lg lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md">
                International General Certificate in Occupational Health and Safety
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ПРЕИМУЩЕСТВА (КАРТОЧКИ) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
                <img src="/assets/nebosh/icon-universal.png" className="h-[72px] w-auto mb-6 opacity-80 object-contain" alt="Универсальный охват" />
                <h3 className={`${TEXT_H3} mb-3`}>Универсальный охват</h3>
                <p className={TEXT_BODY}>
                  Учебная программа охватывает широкий спектр тем в области безопасности и охраны труда, что делает полученные знания применимыми в любой отрасли и сфере деятельности.
                </p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
                <img src="/assets/nebosh/icon-global.png" className="h-[72px] w-auto mb-6 opacity-80 object-contain" alt="Международное признание" />
                <h3 className={`${TEXT_H3} mb-3`}>Международное признание</h3>
                <p className={TEXT_BODY}>
                  Данная квалификация признана государственными и отраслевыми организациями во многих странах, что повышает привлекательность владельца сертификата для работодателей.
                </p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
                <img src="/assets/nebosh/icon-practice.png" className="h-[72px] w-auto mb-6 opacity-80 object-contain" alt="Фокус на практических навыках" />
                <h3 className={`${TEXT_H3} mb-3`}>Фокус на практических навыках</h3>
                <p className={TEXT_BODY}>
                  Программа NEBOSH IGC предусматривает оценку практических навыков, что позволяет сразу начать применение инструментов оценки и управления рисками на производстве.
                </p>
            </div>

        </div>
      </section>

      {/* ==================== 3. ФОРМА ПРОВЕДЕНИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Форма проведения</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <img src="/assets/nebosh/icon-online.png" className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="Online" />
                <p className={`${TEXT_BODY} font-medium`}>
                  Дистанционное обучение онлайн
                </p>
            </div>
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <img src="/assets/nebosh/icon-part-time.png" className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="Part time" />
                <p className={`${TEXT_BODY} font-medium`}>
                  Обучение с частичным отрывом от производства с занятиями в несколько часов в день общей длительностью не менее 10 учебных дней
                </p>
            </div>
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <img src="/assets/nebosh/icon-full-time.png" className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="Full time" />
                <p className={`${TEXT_BODY} font-medium`}>
                  Очное обучение с отрывом от производства в течение двух недель с выходными днями
                </p>
            </div>
        </div>
      </section>

      {/* ==================== 4. СЕРТИФИКАЦИЯ И НОРМАТИВЫ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Левая колонка: Сертификация */}
            <div className="w-full lg:w-2/3">
                <h2 className={`${TEXT_H2} mb-4`}>Сертификация</h2>
                <p className="text-[13px] font-bold text-[#0B0073] mb-6 uppercase">
                    Для получения международного сертификата NEBOSH IGC необходимо сдать два экзамена
                </p>
                
                <div className="flex flex-col gap-5">
                    <div className="bg-transparent border border-black/10 rounded-[15px] p-6">
                        <div className="flex items-center gap-4 mb-3">
                            <img src="/assets/nebosh/icon-ig1.png" className="h-[40px] w-auto opacity-80 object-contain" alt="IG1" />
                            <h3 className={TEXT_H3}>Экзамен по Модулю IG1</h3>
                        </div>
                        <p className={TEXT_BODY}>
                            Проводится удаленно с возможностью использования любых источников информации при условии соблюдения строгих правил по предотвращению плагиата. У вас будет 24 часа на выполнение заданий и загрузку выполненной работы в онлайн систему. Данный экзамен оценивает знания различных элементов систем управления охраной труда и требует аналитического подхода.
                        </p>
                    </div>

                    <div className="bg-transparent border border-black/10 rounded-[15px] p-6">
                        <div className="flex items-center gap-4 mb-3">
                            <img src="/assets/nebosh/icon-ig2.png" className="h-[40px] w-auto opacity-80 object-contain" alt="IG2" />
                            <h3 className={TEXT_H3}>Экзамен по Модулю IG2</h3>
                        </div>
                        <p className={TEXT_BODY}>
                            Предусматривает удаленное выполнение развернутой оценки рисков с разработкой плана мероприятий, на что отводится 10 рабочих дней.
                        </p>
                    </div>
                </div>
            </div>

            {/* Правая колонка: Нормативы сдачи */}
            <div className="w-full lg:w-1/3">
                <h2 className={`${TEXT_H2} mb-6`}>Нормативы сдачи экзамена</h2>
                
                <div className="flex flex-col gap-4">
                    <div className="border-l-4 border-[#0B0073] pl-4">
                        <h4 className="text-[15px] font-bold text-black/90">Отлично:</h4>
                        <p className="text-[14px] font-medium text-black/70">75 баллов или больше</p>
                    </div>
                    
                    <div className="border-l-4 border-black/40 pl-4">
                        <h4 className="text-[15px] font-bold text-black/90">Хорошо:</h4>
                        <p className="text-[14px] font-medium text-black/70">65 – 74 баллов</p>
                    </div>
                    
                    <div className="border-l-4 border-black/20 pl-4">
                        <h4 className="text-[15px] font-bold text-black/90">Удовлетворительно:</h4>
                        <p className="text-[14px] font-medium text-black/70">45 – 64 баллов</p>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* ==================== 5. СОДЕРЖАНИЕ КУРСА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Содержание курса</h2>
        
        <div className="flex flex-col md:flex-row gap-10">
            {/* Модуль 1 */}
            <div className="w-full md:w-1/2">
                <h3 className="text-[15px] font-bold text-[#0B0073] mb-5 uppercase tracking-wide border-b border-black/10 pb-3">
                    Модуль IG1: Управление охраной труда
                </h3>
                <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-black/40">Элемент 1</span>
                        <span className={TEXT_BODY}>Основания для эффективного управления охраной труда</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-black/40">Элемент 2</span>
                        <span className={TEXT_BODY}>Системы управления охраной труда</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-black/40">Элемент 3</span>
                        <span className={TEXT_BODY}>Управление рисками с учетом процессов и человеческого фактора</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-black/40">Элемент 4</span>
                        <span className={TEXT_BODY}>Мониторинг и оценка эффективности деятельности в БиОТ</span>
                    </li>
                </ul>
            </div>

            {/* Модуль 2 */}
            <div className="w-full md:w-1/2">
                <h3 className="text-[15px] font-bold text-[#0B0073] mb-5 uppercase tracking-wide border-b border-black/10 pb-3">
                    Модуль IG2: Оценка риска
                </h3>
                <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-black/40">Элемент 5</span>
                        <span className={TEXT_BODY}>Физическое и психологическое здоровье</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-black/40">Элемент 6</span>
                        <span className={TEXT_BODY}>Здоровье опорно-двигательной системы</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-black/40">Элемент 7</span>
                        <span className={TEXT_BODY}>Химические и биологические факторы</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-black/40">Элемент 8</span>
                        <span className={TEXT_BODY}>Общие вопросы безопасности рабочих мест</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-black/40">Элемент 9</span>
                        <span className={TEXT_BODY}>Производственное оборудование и механизмы</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-black/40">Элемент 10</span>
                        <span className={TEXT_BODY}>Основы пожарной безопасности</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-black/40">Элемент 11</span>
                        <span className={TEXT_BODY}>Основы электробезопасности</span>
                    </li>
                </ul>
            </div>
        </div>
      </section>

      {/* ==================== 6. РЕЗУЛЬТАТЫ ОБУЧЕНИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Результаты обучения</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            {[
                { 
                    text: "Принципы эффективного управления охраной труда", 
                    img: "icon-outcomes-principles.png" 
                },
                { 
                    text: "Давать моральные, юридические и финансовые обоснования мероприятиям БиОТ", 
                    img: "icon-outcomes-reasons.png" 
                },
                { 
                    text: "Основные этапы обеспечения БиОТ при работе с подрядными организациями", 
                    img: "icon-outcomes-contractors.png" 
                },
                { 
                    text: "Методы и инструменты идентификации и оценки рисков", 
                    img: "icon-outcomes-risk-assessment.png" 
                },
                { 
                    text: "Стратегии управления рисками", 
                    img: "icon-outcomes-risk-strategy.png" 
                },
                { 
                    text: "Показатели культуры безопасности и способы влияния на неё", 
                    img: "icon-outcomes-culture.png" 
                },
                { 
                    text: "Человеческий фактор и основы поведенческой безопасности", 
                    img: "icon-outcomes-behavior.png" 
                },
                { 
                    text: "Методы и показатели оценки эффективности деятельности БиОТ", 
                    img: "icon-outcomes-kpi.png" 
                },
                { 
                    text: "Категории причин происшествий и инструменты их анализа при расследовании", 
                    img: "icon-outcomes-investigation.png" 
                }
            ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-transparent border border-black/10 rounded-[10px] hover:shadow-sm transition-shadow">
                    <img src={`/assets/nebosh/${item.img}`} className="w-8 h-8 mt-1 opacity-80 object-contain shrink-0" alt={`Icon ${index}`} />
                    <span className="text-[13px] font-medium text-black/80 leading-relaxed">{item.text}</span>
                </div>
            ))}
        </div>
      </section>

      {/* ==================== 7. КНОПКА ЗАЯВКИ ==================== */}
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