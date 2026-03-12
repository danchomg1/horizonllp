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

export default function IoshVisionZeroPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/iosh-vision-zero/hero-bg.jpg" alt="IOSH Vision Zero" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/iosh-vision-zero/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">
                  IOSH Vision Zero
                </h1>
                <p className="text-xl lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">
                  Концепция «Нулевого травматизма»
                </p>
                <p className="text-lg lg:text-[16px] font-normal text-white/80 leading-snug drop-shadow-md">
                   Курс разработан IOSH совместно с ISSA (International Social Security Association). В его основе лежит философия, что все несчастные случаи на производстве и профессиональные заболевания можно предотвратить, если подходить к этому системно.
                </p>
              </div>

              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">
                Концепция Vision Zero строится на трех столпах: Безопасность (Safety), Здоровье (Health) и Благополучие (Wellbeing).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ДЛЯ КОГО ЭТОТ КУРС ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="w-full lg:w-1/3">
                <h2 className={`${TEXT_H2} mb-6`}>Для кого этот курс?</h2>
                <p className={`${TEXT_BODY} mb-6`}>Этот курс предназначен для лидеров изменений — тех, кто формирует стратегию и культуру компании:</p>
                <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                        <div>
                            <span className="text-[14px] font-bold text-black/90 block">Топ-менеджеры и руководители:</span>
                            <span className={TEXT_BODY}>Чтобы понять, как лидерство влияет на безопасность.</span>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                        <div>
                            <span className="text-[14px] font-bold text-black/90 block">Специалисты по охране труда (HSE):</span>
                            <span className={TEXT_BODY}>Чтобы получить инструменты для внедрения современной превентивной культуры.</span>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                        <div>
                            <span className="text-[14px] font-bold text-black/90 block">Линейные менеджеры:</span>
                            <span className={TEXT_BODY}>Чтобы научиться вовлекать своих людей в вопросы безопасности.</span>
                        </div>
                    </li>
                    <li className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                        <span className="text-[14px] font-medium text-black/80">Любой персонал, ответственный за формирование безопасной среды.</span>
                    </li>
                </ul>
            </div>

            <div className="w-full lg:w-2/3">
                <h2 className={`${TEXT_H2} mb-8`}>Программа курса</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow flex items-start gap-4">
                        <img src="/assets/iosh-vision-zero/icon-prog-what.png" className="w-8 h-8 opacity-80 mt-1 shrink-0" alt="What" />
                        <div>
                            <h4 className="text-[14px] font-bold text-[#0B0073] mb-1">Что такое Vision Zero:</h4>
                            <p className={TEXT_BODY}>Введение в концепцию как превентивную стратегию.</p>
                        </div>
                    </div>

                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow flex items-start gap-4">
                        <img src="/assets/iosh-vision-zero/icon-prog-rules.png" className="w-8 h-8 opacity-80 mt-1 shrink-0" alt="Rules" />
                        <div>
                            <h4 className="text-[14px] font-bold text-[#0B0073] mb-1">7 Золотых правил:</h4>
                            <p className={TEXT_BODY}>Глубокий разбор принципов.</p>
                        </div>
                    </div>

                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow flex items-start gap-4">
                        <img src="/assets/iosh-vision-zero/icon-prog-ben.png" className="w-8 h-8 opacity-80 mt-1 shrink-0" alt="Benefits" />
                        <div>
                            <h4 className="text-[14px] font-bold text-[#0B0073] mb-1">Преимущества внедрения:</h4>
                            <p className={TEXT_BODY}>Почему это выгодно бизнесу (репутация, снижение затрат, продуктивность).</p>
                        </div>
                    </div>

                    <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow flex items-start gap-4">
                        <img src="/assets/iosh-vision-zero/icon-prog-action.png" className="w-8 h-8 opacity-80 mt-1 shrink-0" alt="Action" />
                        <div>
                            <h4 className="text-[14px] font-bold text-[#0B0073] mb-1">Обязательство и план действий:</h4>
                            <p className={TEXT_BODY}>Как превратить теорию в практику.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </section>

      {/* ==================== 3. СЕМЬ ЗОЛОТЫХ ПРАВИЛ (Карточки) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-24 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>Семь "Золотых правил"</h2>
        <p className={`${TEXT_BODY} mb-10 max-w-2xl`}>Это ядро курса. Вы не просто узнаете о них, но и проработаете каждое правило применительно к своей компании:</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
                { title: "Лидерство (Take leadership)", desc: "Руководитель должен демонстрировать приверженность безопасности своим примером.", img: "icon-rule-1.png" },
                { title: "Выявление угроз (Identify hazards)", desc: "Систематический контроль рисков (не только физических, но и психосоциальных).", img: "icon-rule-2.png" },
                { title: "Определение целей (Define targets)", desc: "Разработка четких программ по безопасности.", img: "icon-rule-3.png" },
                { title: "Создание системы безопасности (Ensure a safe system)", desc: "Высокий уровень организации процессов.", img: "icon-rule-4.png" },
                { title: "Безопасность оборудования (Safety in machines)", desc: "Использование безопасных технологий и рабочих мест.", img: "icon-rule-5.png" },
                { title: "Повышение квалификации (Improve qualifications)", desc: "Развитие компетенций сотрудников.", img: "icon-rule-6.png" },
                { title: "Инвестиции в людей (Invest in people)", desc: "Мотивация через вовлечение персонала в принятие решений.", img: "icon-rule-7.png" }
            ].map((rule, idx) => (
                <div key={idx} className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                    <img src={`/assets/iosh-vision-zero/${rule.img}`} className="w-10 h-10 mb-4 opacity-80" alt={rule.title} />
                    <h3 className={`${TEXT_H3} mb-2`}>{rule.title}</h3>
                    <p className="text-[11px] text-black/60 leading-relaxed">{rule.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* ==================== 4. ФОРМАТ И ОЦЕНКА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-24 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Формат обучение и оценка</h2>
        <div className="flex flex-col md:flex-row gap-12 border-l-4 border-[#0B0073] pl-8 py-2">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <img src="/assets/iosh-vision-zero/icon-format-time.png" className="w-6 h-6 opacity-80" alt="Time" />
                    <h3 className={TEXT_H3}>Длительность:</h3>
                </div>
                <p className={TEXT_BODY}>1 день (6 часов обучения).</p>
            </div>
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <img src="/assets/iosh-vision-zero/icon-format-method.png" className="w-6 h-6 opacity-80" alt="Methods" />
                    <h3 className={TEXT_H3}>Методы:</h3>
                </div>
                <p className={TEXT_BODY}>Лекции, интерактивные семинары, разбор кейсов (case-studies) и групповые обсуждения.</p>
            </div>
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <img src="/assets/iosh-vision-zero/icon-format-plan.png" className="w-6 h-6 opacity-80" alt="Eval" />
                    <h3 className={TEXT_H3}>Оценка (Action Plan):</h3>
                </div>
                <p className={TEXT_BODY}>Вместо экзамена каждый участник разрабатывает Личный план действий, связанный с каждым из 7 Золотых правил.</p>
            </div>
        </div>
        <p className="mt-6 text-[13px] font-normal text-black/60 italic max-w-3xl pl-12">
            Это конкретный список шагов, которые вы предпримете в своей организации, чтобы улучшить лидерство и культуру безопасности.
        </p>
      </section>

      {/* ==================== 5. РЕЗУЛЬТАТ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <div className="bg-[#0B0073]/5 rounded-[15px] p-10 flex flex-col md:flex-row items-center gap-10">
            <img src="/assets/iosh-vision-zero/icon-result-strat.png" className="w-16 h-16 opacity-90 shrink-0" alt="Result" />
            <div>
                <h2 className={`${TEXT_H2} mb-4`}>Результат</h2>
                <p className="text-[15px] font-medium text-black/80">
                    После завершения курса вы получаете сертификат IOSH и готовый стратегический план для внедрения Vision Zero в вашей компании.
                </p>
            </div>
        </div>
      </section>

      {/* ==================== 6. КНОПКИ ЗАЯВКИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button>Оставить заявку</Button>
         
        </div>
      </section>

    </main>
  );
}