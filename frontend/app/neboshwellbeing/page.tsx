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

export default function NeboshWellbeingPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/nebosh-wellbeing/hero-bg.jpg" alt="NEBOSH Wellbeing" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh-wellbeing/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <p className="text-lg lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">
                  Квалификация NEBOSH HSE по обеспечению благополучия на работе
                </p>
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">
                  NEBOSH HSE Working with Wellbeing
                </h1>
              </div>

              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">
                Курс переводит понятие «благополучие» (wellbeing) из абстрактной идеи в набор конкретных инструментов для менеджеров и HR.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ОПИСАНИЕ И АУДИТОРИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Текст введения */}
            <div className="w-full lg:w-1/2">
                <p className="text-[16px] font-medium text-black/80 leading-relaxed border-l-4 border-[#0B0073] pl-6 py-2">
                  Это вводная однодневная квалификация, направленная на создание здоровой рабочей атмосферы. В основе курса лежит модель «Дерево благополучия NEBOSH» (NEBOSH Wellbeing Tree), которая охватывает 6 ключевых сфер влияния на состояние человека.
                </p>
            </div>

            {/* Кому подойдет */}
            <div className="w-full lg:w-1/2">
                <h2 className={`${TEXT_H2} mb-6`}>Для кого этот курс?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex gap-4 items-start">
                        <img src="/assets/nebosh-wellbeing/icon-aud-hr.png" className="w-8 h-8 opacity-80 shrink-0" alt="HR" />
                        <div>
                            <span className="text-[14px] font-bold text-black/90 block mb-1">HR-специалисты:</span>
                            <span className={TEXT_BODY}>Для внедрения стратегий удержания персонала и снижения выгорания.</span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <img src="/assets/nebosh-wellbeing/icon-aud-hse.png" className="w-8 h-8 opacity-80 shrink-0" alt="HSE" />
                        <div>
                            <span className="text-[14px] font-bold text-black/90 block mb-1">Специалисты по охране труда (HSE):</span>
                            <span className={TEXT_BODY}>Чтобы расширить экспертизу за пределы физической безопасности.</span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <img src="/assets/nebosh-wellbeing/icon-aud-managers.png" className="w-8 h-8 opacity-80 shrink-0" alt="Managers" />
                        <div>
                            <span className="text-[14px] font-bold text-black/90 block mb-1">Линейные руководители и менеджеры:</span>
                            <span className={TEXT_BODY}>Чтобы научиться поддерживать свои команды.</span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <img src="/assets/nebosh-wellbeing/icon-aud-leaders.png" className="w-8 h-8 opacity-80 shrink-0" alt="Leaders" />
                        <div>
                            <span className="text-[14px] font-bold text-black/90 block mb-1">Лидеры команд:</span>
                            <span className={TEXT_BODY}>Все, кто хочет создать продуктивную и поддерживающую среду.</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* ==================== 3. ДЛЯ ЧЕГО ЭТО НУЖНО ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>Для чего это нужно</h2>
        <p className={`${TEXT_BODY} mb-8 max-w-3xl`}>
          Главная цель — показать прямую связь между самочувствием сотрудников и успехами бизнеса. «Здоровые люди = здоровый бизнес».
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-wellbeing/icon-ben-loss.png" className="w-10 h-10 mb-4 opacity-80 object-contain" alt="Убытки" />
                <h3 className={`${TEXT_H3} mb-2`}>Снижение убытков:</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Уменьшение количества больничных, текучести кадров и случаев травматизма.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-wellbeing/icon-ben-eff.png" className="w-10 h-10 mb-4 opacity-80 object-contain" alt="Эффективность" />
                <h3 className={`${TEXT_H3} mb-2`}>Рост эффективности:</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Повышение вовлеченности, морального духа и производительности труда.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-wellbeing/icon-ben-sol.png" className="w-10 h-10 mb-4 opacity-80 object-contain" alt="Решения" />
                <h3 className={`${TEXT_H3} mb-2`}>Готовые решения:</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Вместо теории вы получаете набор практических инициатив, которые доказали свою эффективность.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-wellbeing/icon-ben-culture.png" className="w-10 h-10 mb-4 opacity-80 object-contain" alt="Культура" />
                <h3 className={`${TEXT_H3} mb-2`}>Культура:</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Формирование среды, где сотрудники чувствуют поддержку.</p>
            </div>
        </div>
      </section>

      {/* ==================== 4. МОДЕЛЬ ДЕРЕВО БЛАГОПОЛУЧИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>Программа: Модель "Дерево благополучия"</h2>
        <p className={`${TEXT_BODY} mb-10`}>Курс строится вокруг 6 ветвей благополучия. Вы узнаете, как каждая из них влияет на работу и как их развивать:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-center gap-5">
                <img src="/assets/nebosh-wellbeing/icon-tree-interaction.png" className="w-12 h-12 opacity-80 object-contain shrink-0" alt="Interaction" />
                <div>
                    <h4 className="text-[14px] font-bold text-black/90">Взаимодействие (Interaction)</h4>
                    <p className="text-[12px] text-black/60">Как общение и социальные связи внутри коллектива влияют на здоровье.</p>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <img src="/assets/nebosh-wellbeing/icon-tree-exercise.png" className="w-12 h-12 opacity-80 object-contain shrink-0" alt="Exercise" />
                <div>
                    <h4 className="text-[14px] font-bold text-black/90">Движение (Exercise/Movement)</h4>
                    <p className="text-[12px] text-black/60">Роль физической активности в профилактике стресса и болезней.</p>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <img src="/assets/nebosh-wellbeing/icon-tree-mindfulness.png" className="w-12 h-12 opacity-80 object-contain shrink-0" alt="Mindfulness" />
                <div>
                    <h4 className="text-[14px] font-bold text-black/90">Осознанность (Mindfulness)</h4>
                    <p className="text-[12px] text-black/60">Управление вниманием и ментальным здоровьем.</p>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <img src="/assets/nebosh-wellbeing/icon-tree-nutrition.png" className="w-12 h-12 opacity-80 object-contain shrink-0" alt="Nutrition" />
                <div>
                    <h4 className="text-[14px] font-bold text-black/90">Питание (Nutrition)</h4>
                    <p className="text-[12px] text-black/60">Влияние правильного питания на уровень энергии и концентрацию.</p>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <img src="/assets/nebosh-wellbeing/icon-tree-kindness.png" className="w-12 h-12 opacity-80 object-contain shrink-0" alt="Kindness" />
                <div>
                    <h4 className="text-[14px] font-bold text-black/90">Доброта (Kindness)</h4>
                    <p className="text-[12px] text-black/60">Почему культура поддержки и уважения выгодна бизнесу.</p>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <img src="/assets/nebosh-wellbeing/icon-tree-learning.png" className="w-12 h-12 opacity-80 object-contain shrink-0" alt="Learning" />
                <div>
                    <h4 className="text-[14px] font-bold text-black/90">Обучение (Learning)</h4>
                    <p className="text-[12px] text-black/60">Развитие как фактор мотивации и удовлетворенности жизнью.</p>
                </div>
            </div>
        </div>
      </section>

      {/* ==================== 5. ФОРМАТ И ОЦЕНКА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Формат обучения и экзамена</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Длительность */}
            <div className="flex gap-6 items-start">
                <span className="text-[18px] font-bold text-[#0B0073]">Длительность:</span>
                <p className={TEXT_BODY}>1 день (около 7 часов обучения).</p>
            </div>
            
            {/* Оценка */}
            <div className="lg:col-span-2 border-l-4 border-[#0B0073] pl-8">
                <h3 className="text-[16px] font-bold text-black/90 mb-4">Оценка (Без экзаменов):</h3>
                <p className="text-[13px] text-black/70 italic mb-4">Вместо теста вы выполняете практическую работу (Unit WEL1), которая приносит реальную пользу вашей компании прямо в процессе обучения:</p>
                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <img src="/assets/nebosh-wellbeing/icon-eval-plan.png" className="w-6 h-6 opacity-80 mt-1" alt="Eval" />
                        <div>
                            <span className="text-[14px] font-bold text-black/90 block">Анализ:</span>
                            <span className={TEXT_BODY}>Вы оцениваете сильные и слабые стороны вашей компании по каждому из 6 направлений «Дерева благополучия».</span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <img src="/assets/nebosh-wellbeing/icon-eval-plan.png" className="w-6 h-6 opacity-80 mt-1" alt="Plan" />
                        <div>
                            <span className="text-[14px] font-bold text-black/90 block">План действий:</span>
                            <span className={TEXT_BODY}>Вы разрабатываете «План вмешательства» (Intervention Plan), предлагая конкретные меры для улучшения ситуации и способы оценки их эффективности.</span>
                        </div>
                    </div>
                </div>
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