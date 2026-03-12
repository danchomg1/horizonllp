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
const TEXT_H3 = "text-[16px] font-semibold text-black opacity-90 leading-tight";
const TEXT_BODY = "text-[13px] font-normal text-black opacity-80 leading-relaxed";

export default function NeboshPsmPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/nebosh-psm/hero-bg.jpg" alt="Background PSM" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh-psm/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl lg:text-[46px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">
                  NEBOSH Process Safety Management
                </h1>
                <p className="text-xl lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md">
                  Управление безопасностью на производственных предприятиях с высокими рисками
                </p>
              </div>

              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">
                Курс разработан специально для менеджеров, руководителей и инженеров, ответственных за управление и контроль опасных процессов и оборудования.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. АУДИТОРИЯ И ЦЕЛИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Целевая аудитория */}
            <div className="w-full lg:w-1/3">
                <h2 className={`${TEXT_H2} mb-4`}>Целевая аудитория</h2>
                <p className={TEXT_BODY}>
                  Курс предназначен для специалистов, работающих в отраслях, где важно управление технологической безопасностью, включая нефтегазовую, химическую, фармацевтическую и другие промышленности с высоким уровнем опасности.
                </p>
            </div>

            {/* Цели курса */}
            <div className="w-full lg:w-2/3">
                <h2 className={`${TEXT_H2} mb-6`}>Цели курса</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                        <img src="/assets/nebosh-psm/icon-goal-knowledge.png" className="w-10 h-10 mb-4 opacity-80" alt="Знания" />
                        <p className="text-[12px] font-medium text-black/80 leading-relaxed">Улучшение знаний и понимания технологической безопасности</p>
                    </div>
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                        <img src="/assets/nebosh-psm/icon-goal-risk.png" className="w-10 h-10 mb-4 opacity-80" alt="Риски" />
                        <p className="text-[12px] font-medium text-black/80 leading-relaxed">Разработка умений по оценке рисков и управлению технологической безопасностью</p>
                    </div>
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                        <img src="/assets/nebosh-psm/icon-goal-competence.png" className="w-10 h-10 mb-4 opacity-80" alt="Компетенции" />
                        <p className="text-[12px] font-medium text-black/80 leading-relaxed">Повышение компетенции в разработке и реализации систем безопасности</p>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* ==================== 3. ОСНОВНЫЕ ТЕМЫ ПРОГРАММЫ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Основные темы программы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <img src="/assets/nebosh-psm/icon-topic-management.png" className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="Управление" />
                <h3 className={TEXT_H3}>Управление безопасностью процессов</h3>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <img src="/assets/nebosh-psm/icon-topic-risk.png" className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="Риски" />
                <h3 className={TEXT_H3}>Управление технологическими рисками</h3>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <img src="/assets/nebosh-psm/icon-topic-hazard.png" className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="Опасности" />
                <h3 className={TEXT_H3}>Контроль опасностей в процессах</h3>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <img src="/assets/nebosh-psm/icon-topic-fire.png" className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="ЧС" />
                <h3 className={TEXT_H3}>Действия при возгораниях и чрезвычайных ситуациях</h3>
            </div>

        </div>
      </section>

      {/* ==================== 4. РЕЗУЛЬТАТЫ ОБУЧЕНИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Результаты обучения</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            {[
                { text: "Создание системы управления безопасностью", img: "icon-res-system.png" },
                { text: "Стратегии управления активами и технического обслуживания", img: "icon-res-assets.png" },
                { text: "Безопасный запуск и остановку технологического оборудования", img: "icon-res-startup.png" },
                { text: "Стандарты производительности для критически важных систем и оборудования", img: "icon-res-standards.png" },
                { text: "Опасности и меры контроля для химических реакций, хранения опасных веществ в больших объемах, пожаров и взрывов", img: "icon-res-chemicals.png" },
                { text: "Цель и особенности аварийных планов", img: "icon-res-emergency.png" }
            ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-transparent border border-black/10 rounded-[10px] hover:shadow-sm transition-shadow">
                    <img src={`/assets/nebosh-psm/${item.img}`} className="w-8 h-8 mt-1 opacity-80 object-contain shrink-0" alt="Icon" />
                    <span className="text-[13px] font-medium text-black/80 leading-relaxed">{item.text}</span>
                </div>
            ))}
        </div>
      </section>

      {/* ==================== 5. ФОРМАТ ПРОГРАММЫ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Формат программы</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-psm/icon-format-duration.png" className="h-[50px] w-auto mb-5 opacity-80 object-contain" alt="Длительность" />
                <h3 className={`${TEXT_H3} mb-2`}>Длительность</h3>
                <p className={TEXT_BODY}><b>4 дня</b>. Может варьироваться в зависимости от уровня знаний участников.</p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-psm/icon-format-exam.png" className="h-[50px] w-auto mb-5 opacity-80 object-contain" alt="Оценка" />
                <h3 className={`${TEXT_H3} mb-2`}>Методы оценки</h3>
                <p className={TEXT_BODY}>Контрольное тестирование на портале NEBOSH на английском языке, длительностью 90 минут.</p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-psm/icon-format-methods.png" className="h-[50px] w-auto mb-5 opacity-80 object-contain" alt="Обучение" />
                <h3 className={`${TEXT_H3} mb-2`}>Методы обучения</h3>
                <p className={TEXT_BODY}>Комбинация лекций, групповых обсуждений, практических заданий и кейс-стади.</p>
            </div>

        </div>
      </section>

      {/* ==================== 6. ПРЕИМУЩЕСТВА КУРСА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Преимущества курса</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex gap-5 items-start">
                <img src="/assets/nebosh-psm/icon-ben-certificate.png" className="w-[50px] h-[50px] opacity-80 object-contain shrink-0" alt="Сертификация" />
                <div>
                    <h3 className={`${TEXT_H3} mb-2`}>Сертификация</h3>
                    <p className={TEXT_BODY}>Успешно сдавшие экзамен участники получают международный сертификат NEBOSH.</p>
                </div>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex gap-5 items-start">
                <img src="/assets/nebosh-psm/icon-ben-safety.png" className="w-[50px] h-[50px] opacity-80 object-contain shrink-0" alt="Безопасность" />
                <div>
                    <h3 className={`${TEXT_H3} mb-2`}>Улучшение безопасности</h3>
                    <p className={TEXT_BODY}>Полученные знания и навыки помогут снизить вероятность инцидентов и повысить уровень технологической безопасности.</p>
                </div>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex gap-5 items-start">
                <img src="/assets/nebosh-psm/icon-ben-career.png" className="w-[50px] h-[50px] opacity-80 object-contain shrink-0" alt="Карьера" />
                <div>
                    <h3 className={`${TEXT_H3} mb-2`}>Карьерное развитие</h3>
                    <p className={TEXT_BODY}>Повышение квалификации и получение международного сертификата способствуют профессиональному росту.</p>
                </div>
            </div>

        </div>
      </section>

      {/* ==================== 7. КНОПКИ ЗАЯВКИ ==================== */}
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