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

export default function NeboshStressPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/nebosh-stress/hero-bg.jpg" alt="NEBOSH Managing Stress" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh-stress/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <p className="text-lg lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">
                  NEBOSH
                </p>
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">
                  Certificate in Managing Stress at Work
                </h1>
              </div>

              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">
                Курс, который дает руководителям и специалистам инструменты для выявления и устранения источников стресса в рабочей среде, превращая абстрактную проблему в управляемый процесс.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ЗАЧЕМ НУЖЕН КУРС (3 пункта без рамок) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-16 px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 lg:gap-20">
            
            <div className="flex flex-col items-center text-center max-w-[250px]">
                <img src="/assets/nebosh-stress/icon-stress-source.png" className="h-[50px] w-auto opacity-80 object-contain mb-4" alt="Источники" />
                <p className="text-[14px] font-bold text-black/90 leading-snug">Выявить источники стресса</p>
            </div>

            <div className="hidden md:block w-[1px] h-16 bg-black/10"></div>

            <div className="flex flex-col items-center text-center max-w-[250px]">
                <img src="/assets/nebosh-stress/icon-stress-reduce.png" className="h-[50px] w-auto opacity-80 object-contain mb-4" alt="Снижение" />
                <p className="text-[14px] font-bold text-black/90 leading-snug">Снизить его последствия</p>
            </div>

            <div className="hidden md:block w-[1px] h-16 bg-black/10"></div>

            <div className="flex flex-col items-center text-center max-w-[250px]">
                <img src="/assets/nebosh-stress/icon-stress-env.png" className="h-[50px] w-auto opacity-80 object-contain mb-4" alt="Среда" />
                <p className="text-[14px] font-bold text-black/90 leading-snug">Создать здоровую и мотивирующую рабочую среду</p>
            </div>

        </div>
      </section>

      {/* ==================== 3. ЦЕННОСТЬ И АУДИТОРИЯ (С акцентом) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Левая колонка - Ценность курса (Акцентный блок) */}
            <div className="w-full lg:w-1/2 bg-white border border-[#0B0073]/20 shadow-sm rounded-[15px] p-8 lg:p-10 relative overflow-hidden">
                {/* Легкий декоративный элемент */}
                <div className="absolute top-0 left-0 w-2 h-full bg-[#0B0073]"></div>
                
                <h2 className={`${TEXT_H2} mb-4 text-[#0B0073]`}>Чем полезен этот курс?</h2>
                <p className="text-[14px] font-normal text-black/80 leading-relaxed mb-4">
                    Главная ценность курса в том, что он дает <b>системный подход</b>. 
                </p>
                <p className="text-[14px] font-normal text-black/80 leading-relaxed">
                    Вместо абстрактных советов «меньше нервничать», вы получаете инструмент (<b>Risk Assessment</b>), который позволяет выявить, <i>где именно</i> в дизайне работы (в нагрузке, в контроле или в отношениях) есть провал, и устранить его как любой другой производственный риск.
                </p>
            </div>

            {/* Правая колонка - Кому подойдет (Воздушный список) */}
            <div className="w-full lg:w-1/2 pt-4">
                <div className="flex items-center gap-4 mb-6">
                    <img src="/assets/nebosh-stress/icon-audience.png" className="w-10 h-10 opacity-80 object-contain" alt="Аудитория" />
                    <h2 className={TEXT_H2}>Кому подойдет</h2>
                </div>
                
                <p className={`${TEXT_BODY} mb-6`}>Он предназначен не только для специалистов по охране труда, но и для всех, кто управляет людьми:</p>
                
                <ul className="space-y-4 pl-2">
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Линейные руководители и менеджеры.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">HR-специалисты.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Специалисты по охране труда (HSE managers).</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Специалисты по корпоративному здоровью (Occupational health).</span>
                    </li>
                </ul>
            </div>

        </div>
      </section>

      {/* ==================== 4. ПРОГРАММА ОБУЧЕНИЯ (Карточки) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>Программа обучения</h2>
        <p className={`${TEXT_BODY} mb-8 max-w-2xl`}>Курс компактный, обычно длится 1 день (около 7 часов обучения) и состоит из трех основных модулей:</p>
        
        <div className="flex flex-col gap-6">
            
            {/* Модуль 1 */}
            <div className="bg-transparent border border-black/20 rounded-[15px] p-8 flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow">
                <div className="w-full md:w-1/4 flex flex-col items-start shrink-0">
                    <img src="/assets/nebosh-stress/icon-module-1.png" className="h-[50px] w-auto opacity-80 object-contain mb-4" alt="Модуль 1" />
                    <h3 className={`${TEXT_H3} text-[#0B0073]`}>Модуль 1:</h3>
                    <p className="text-[14px] font-bold text-black/90">Ключевые принципы<br/>(Key Principles)</p>
                </div>
                <div className="w-full md:w-3/4">
                    <ul className="space-y-3">
                        <li className="flex gap-3 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}>Разница между понятиями «стресс», «давление» и «психическое заболевание».</span></li>
                        <li className="flex gap-3 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}>Статистика: распространенность стресса и финансовые потери бизнеса.</span></li>
                        <li className="flex gap-3 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}>Признаки стресса у сотрудников.</span></li>
                        <li className="flex gap-3 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}>Юридические обязанности работодателя по управлению стрессом.</span></li>
                    </ul>
                </div>
            </div>

            {/* Модуль 2 */}
            <div className="bg-transparent border border-black/20 rounded-[15px] p-8 flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow">
                <div className="w-full md:w-1/4 flex flex-col items-start shrink-0">
                    <img src="/assets/nebosh-stress/icon-module-2.png" className="h-[50px] w-auto opacity-80 object-contain mb-4" alt="Модуль 2" />
                    <h3 className={`${TEXT_H3} text-[#0B0073]`}>Модуль 2:</h3>
                    <p className="text-[14px] font-bold text-black/90">Идентификация рисков<br/>(Identification of Risk)</p>
                </div>
                <div className="w-full md:w-3/4">
                    <p className="text-[13px] font-medium text-black/80 mb-4 bg-black/5 p-3 rounded-lg">
                        Это ядро курса. Здесь изучают <b>HSE Management Standards</b> — 6 ключевых областей работы, которые, если ими не управлять, приводят к стрессу:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        <div className="flex gap-2 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}><b>Demands (Требования):</b> Объем работы, дедлайны, условия труда.</span></div>
                        <div className="flex gap-2 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}><b>Control (Контроль):</b> Насколько сотрудник может влиять на выполнение работы.</span></div>
                        <div className="flex gap-2 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}><b>Support (Поддержка):</b> Поощрение и ресурсы от руководства и коллег.</span></div>
                        <div className="flex gap-2 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}><b>Relationships (Отношения):</b> Конфликты, буллинг, харассмент.</span></div>
                        <div className="flex gap-2 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}><b>Role (Роль):</b> Понимает ли сотрудник свои обязанности в структуре.</span></div>
                        <div className="flex gap-2 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}><b>Change (Изменения):</b> Как организация сообщает об изменениях.</span></div>
                    </div>
                </div>
            </div>

            {/* Модуль 3 */}
            <div className="bg-transparent border border-black/20 rounded-[15px] p-8 flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow">
                <div className="w-full md:w-1/4 flex flex-col items-start shrink-0">
                    <img src="/assets/nebosh-stress/icon-module-3.png" className="h-[50px] w-auto opacity-80 object-contain mb-4" alt="Модуль 3" />
                    <h3 className={`${TEXT_H3} text-[#0B0073]`}>Модуль 3:</h3>
                    <p className="text-[14px] font-bold text-black/90">Внедрение мер<br/>(Implementing Interventions)</p>
                </div>
                <div className="w-full md:w-3/4">
                    <ul className="space-y-3 mt-2">
                        <li className="flex gap-3 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}>Как применять подход HSE к оценке рисков стресса.</span></li>
                        <li className="flex gap-3 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}>Разработка конкретных вмешательств для снижения уровня стресса.</span></li>
                        <li className="flex gap-3 items-start"><span className="text-[#0B0073] font-bold mt-0.5">•</span><span className={TEXT_BODY}>Как постоянно улучшать рабочую среду.</span></li>
                    </ul>
                </div>
            </div>

        </div>
      </section>

      {/* ==================== 5. ФОРМАТ КУРСА (БЕЗ РАМКИ, с акцентной линией) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Формат курса</h2>
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 border-l-4 border-[#0B0073] pl-6 py-2">
            
            <div className="flex items-center gap-4">
                <img src="/assets/nebosh-stress/icon-format-time.png" className="h-[40px] w-auto opacity-80 object-contain shrink-0" alt="Время" />
                <h3 className="text-[16px] font-bold text-black/90">1 день обучения</h3>
            </div>

            <div className="hidden sm:block w-[1px] h-10 bg-black/20"></div>

            <div className="flex items-center gap-4">
                <img src="/assets/nebosh-stress/icon-format-test.png" className="h-[40px] w-auto opacity-80 object-contain shrink-0" alt="Тест" />
                <h3 className="text-[16px] font-bold text-black/90">+ Тест по рабочему сценарию</h3>
            </div>

        </div>
      </section>

      {/* ==================== 6. КНОПКИ ЗАЯВКИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button>
                Оставить заявку
            </Button>
            

        </div>
      </section>

    </main>
  );
}