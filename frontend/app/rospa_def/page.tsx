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

export default function RospaDefensiveDrivingPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[500px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/rospa/hero-bg.jpg" alt="RoSPA Defensive Driving" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/rospa/hse-logo.svg" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <p className="text-lg lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">
                  Программа RoSPA Level 2
                </p>
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">
                  RoSPA Level 2 Defensive Driving
                </h1>
              </div>

              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">
                Дорожные инциденты остаются одной из ведущих причин смертности в промышленном и энергетическом секторах. Программа RoSPA Level 2 предлагает комплексный подход к безопасности.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ВСТУПИТЕЛЬНЫЙ ТЕКСТ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-12 px-4">
        <div className="max-w-4xl border-l-4 border-[#0B0073] pl-8 py-2">
            <p className="text-[15px] font-medium text-black/80 leading-relaxed">
                Этот курс выходит за рамки базовых технических навыков управления автомобилем. Мы исследуем психологию поведения водителя, обучаем распознаванию скрытых угроз и формируем позитивное отношение к вождению. Программа позволяет водителям уверенно и безопасно управлять транспортными средствами в любой среде — от городских дорог до экстремального бездорожья и сложных погодных условий.
            </p>
        </div>
      </section>

      {/* ==================== 2. ЦЕЛИ И АУДИТОРИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Цели программы (Карточки) */}
            <div className="w-full lg:w-2/3">
                <h2 className={`${TEXT_H2} mb-8`}>цели программы</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                        <img src="/assets/rospa/icon-goal-min.png" className="w-10 h-10 mb-4 opacity-80" alt="Минимизация" />
                        <h3 className={`${TEXT_H3} mb-2`}>Минимизация рисков:</h3>
                        <p className={TEXT_BODY}>Развитие устойчивых навыков защитного вождения для снижения вероятности аварий.</p>
                    </div>
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                        <img src="/assets/rospa/icon-goal-prevent.png" className="w-10 h-10 mb-4 opacity-80" alt="Предотвращение" />
                        <h3 className={`${TEXT_H3} mb-2`}>Предотвращение ДТП:</h3>
                        <p className={TEXT_BODY}>Глубокое обучение методам активного избегания столкновений.</p>
                    </div>
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                        <img src="/assets/rospa/icon-goal-aware.png" className="w-10 h-10 mb-4 opacity-80" alt="Осведомленность" />
                        <h3 className={`${TEXT_H3} mb-2`}>Ситуационная осведомленность:</h3>
                        <p className={TEXT_BODY}>Повышение скорости реакции на неожиданные препятствия и изменения дорожной обстановки.</p>
                    </div>
                </div>
            </div>

            {/* Целевая аудитория (Воздушный список) */}
            <div className="w-full lg:w-1/3">
                <h2 className={`${TEXT_H2} mb-8`}>Целевая аудитория</h2>
                <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Профессиональные водители всех категорий.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Корпоративные водители компаний энергетического и промышленного секторов.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Частные лица, стремящиеся к максимальному уровню безопасности при управлении автомобилем.</span>
                    </li>
                </ul>
            </div>

        </div>
      </section>

      {/* ==================== 3. КЛЮЧЕВЫЕ ТЕМЫ (Карточки) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Ключевые темы курса:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/rospa/icon-topic-base.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Основы" />
                <p className="text-[13px] font-bold text-black/90 leading-relaxed">Основы защитного вождения.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/rospa/icon-topic-weather.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Условия" />
                <p className="text-[13px] font-bold text-black/90 leading-relaxed">Реагирование на изменения погодных и дорожных условий.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/rospa/icon-topic-stress.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Стресс" />
                <p className="text-[13px] font-bold text-black/90 leading-relaxed">Техники управления стрессом.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                <img src="/assets/rospa/icon-topic-decision.png" className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="Решения" />
                <p className="text-[13px] font-bold text-black/90 leading-relaxed">Психологические аспекты принятия решений за рулем.</p>
            </div>
        </div>
      </section>

      {/* ==================== 4. ФОРМАТ ПРОГРАММЫ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Формат программы</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow">
                <img src="/assets/rospa/icon-format-time.png" className="h-[45px] w-auto mb-5 opacity-80 object-contain" alt="Длительность" />
                <h3 className={`${TEXT_H3} mb-2`}>Длительность:</h3>
                <p className={TEXT_BODY}>1–2 дня (варьируется в зависимости от исходного уровня подготовки участников).</p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow">
                <img src="/assets/rospa/icon-format-methods.png" className="h-[45px] w-auto mb-5 opacity-80 object-contain" alt="Методы" />
                <h3 className={`${TEXT_H3} mb-2`}>Методы обучения:</h3>
                <p className={TEXT_BODY}>Теоретические лекции и видеоанализ реальных дорожных ситуаций. Интенсивные практические занятия на дороге.</p>
            </div>

            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow">
                <img src="/assets/rospa/icon-format-eval.png" className="h-[45px] w-auto mb-5 opacity-80 object-contain" alt="Оценка" />
                <h3 className={`${TEXT_H3} mb-2`}>Методы оценки:</h3>
                <p className={TEXT_BODY}>Экзаменационное тестирование и практическое вождение с экспертными комментариями и разбором кейс-стади.</p>
            </div>

        </div>
      </section>

      {/* ==================== 5. ПРЕИМУЩЕСТВА ПРОГРАММЫ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Преимущества программы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col">
                <img src="/assets/rospa/icon-ben-intl.png" className="w-10 h-10 mb-4 opacity-80" alt="Сертификация" />
                <h4 className="text-[13px] font-bold text-black/90 mb-2">Международная сертификация:</h4>
                <p className="text-[11px] text-black/60 leading-snug">Выдача официального документа, признаваемого во всем мире.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col">
                <img src="/assets/rospa/icon-ben-risk.png" className="w-10 h-10 mb-4 opacity-80" alt="Риски" />
                <h4 className="text-[13px] font-bold text-black/90 mb-2">Снижение рисков:</h4>
                <p className="text-[11px] text-black/60 leading-snug">Значительное сокращение частоты ДТП и связанных с ними травм.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col">
                <img src="/assets/rospa/icon-ben-personal.png" className="w-10 h-10 mb-4 opacity-80" alt="Развитие" />
                <h4 className="text-[13px] font-bold text-black/90 mb-2">Личное развитие:</h4>
                <p className="text-[11px] text-black/60 leading-snug">Рост уверенности за рулем и навыков критического восприятия дорожной обстановки.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col">
                <img src="/assets/rospa/icon-ben-econ.png" className="w-10 h-10 mb-4 opacity-80" alt="Экономика" />
                <h4 className="text-[13px] font-bold text-black/90 mb-2">Экономическая эффективность:</h4>
                <p className="text-[11px] text-black/60 leading-snug">Уменьшение простоев и убытков компании из-за эксплуатационных сбоев и аварий.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col">
                <img src="/assets/rospa/icon-ben-rep.png" className="w-10 h-10 mb-4 opacity-80" alt="Репутация" />
                <h4 className="text-[13px] font-bold text-black/90 mb-2">Репутационный капитал:</h4>
                <p className="text-[11px] text-black/60 leading-snug">Демонстрация приверженности компании высоким стандартам безопасности и заботе о сотрудниках.</p>
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