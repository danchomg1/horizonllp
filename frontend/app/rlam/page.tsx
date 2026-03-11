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
const TEXT_H3 = "text-[14px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

export default function RlamCoursePage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/rlam/hero-bg.jpg" alt="Background RLAM" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/rlam/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col max-w-4xl gap-2">
              <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] drop-shadow-lg">
                Руководитель ликвидации аварии на месте (РЛАМ)
              </h1>
              <p className="text-lg lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md">
                Практический курс подготовки руководителей аварийного реагирования на месте происшествия
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ВВЕДЕНИЕ И МИГАЛКА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-16 px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Текст */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4">
                <p className={TEXT_BODY}>
                    Авария — это всегда хаос, неопределенность, дефицит времени и огромный риск. От того, как действует руководитель на месте в первые минуты, зависят жизни людей и масштаб последствий.
                </p>
                <p className={TEXT_BODY}>
                    Курс «Руководитель ликвидации аварии на месте (РЛАМ)» разработан на основе лучших международных практик (UK Fire & Rescue, Incident Command System, OPITO) для подготовки специалистов к управлению аварийными ситуациями.
                </p>
                <p className={TEXT_BODY}>
                    Это не просто лекции о том, «как надо», это интенсивный тренинг, где участники погружаются в реалистичные сценарии аварий, принимают сложные решения под давлением и несут ответственность за результат.
                </p>
            </div>

            {/* Картинка (Мигалка) */}
            <div className="w-full lg:w-1/3 relative h-[200px] lg:h-auto rounded-[15px] overflow-hidden shadow-sm">
               <Image src="/assets/rlam/alarm-bg.jpg" alt="Alarm" fill className="object-cover" />
            </div>
        </div>
      </section>

      {/* ==================== 3. КОМУ ПРЕДНАЗНАЧЕН КУРС ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-2`}>Кому предназначен курс</h2>
        <p className="text-[13px] font-medium text-black/70 mb-8">Особо актуален для предприятий нефтегазовой, нефтехимической, энергетической и горнодобывающей отраслей:</p>
        
        {/* 7 Карточек */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
                { img: "icon-shift.png", text: "Руководители дежурных смен (ДСС/РЛАМ)" },
                { img: "icon-chief.png", text: "Начальники цехов" },
                { img: "icon-operator.png", text: "Операторы установок" },
                { img: "icon-engineer.png", text: "Инженеры по выработке" },
                { img: "icon-manager.png", text: "Руководители производственных участков" },
                { img: "icon-hse.png", text: "Специалисты по ПБ, ОТ и экологии" },
                { img: "icon-rescue.png", text: "Сотрудники аварийно-спасательных формирований" }
            ].map((item, i) => (
                <div key={i} className="bg-transparent border border-black/30 rounded-[15px] p-5 hover:shadow-md transition-shadow flex flex-col items-center text-center">
                    <img src={`/assets/rlam/${item.img}`} className="h-[60px] w-auto mb-4 opacity-80 object-contain" alt="Icon" />
                    <p className="text-[11px] font-bold text-black/90 leading-tight">{item.text}</p>
                </div>
            ))}
        </div>
      </section>

      {/* ==================== 4. ЧЕМУ УЧИТ КУРС ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-2`}>Чему учит курс</h2>
        <p className="text-[13px] font-medium text-black/70 mb-8">В ходе обучения участники осваивают алгоритмы действий по следующим направлениям:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { img: "icon-awareness.png", title: "Ситуационная осведомленность", desc: "Быстрая оценка обстановки, распознавание критических факторов." },
                { img: "icon-decision.png", title: "Принятие решений под давлением", desc: "Применение структурированных алгоритмов (например, FOR-DEC, DECIDE) в условиях стресса." },
                { img: "icon-fcp.png", title: "Организация «Островка безопасности» (FCP)", desc: "Выбор безопасного места, развертывание поста управления (Forward Command Post)." },
                { img: "icon-resources.png", title: "Управление ресурсами", desc: "Расстановка приоритетов, постановка задач, контроль за их выполнением." },
                { img: "icon-escalation.png", title: "Контроль эскалации и локализация", desc: "Принятие мер по недопущению развития аварии, защита критических зон." },
                { img: "icon-communication.png", title: "Коммуникация и доклад штабам", desc: "Передача четкой, структурированной информации (SITREP, METHANE)." },
                { img: "icon-team.png", title: "Командная работа и лидерство", desc: "Работа с паникой, создание эффективной команды реагирования на месте." },
                { img: "icon-handover.png", title: "Передача полномочий", desc: "Корректная и полная передача управления прибывшим профессиональным спасателям." }
            ].map((item, i) => (
                <div key={i} className="bg-transparent border border-black/30 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col items-start">
                    <img src={`/assets/rlam/${item.img}`} className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="Icon" />
                    <h3 className={`${TEXT_H3} mb-2`}>{item.title}</h3>
                    <p className="text-[11px] text-black/70 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* ==================== 5. ФОРМАТ ОБУЧЕНИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-2`}>Формат обучения</h2>
        <p className="text-[13px] font-bold text-black/80 mb-8">Продолжительность: 3 дня</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* День 1-2 */}
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col">
                <img src="/assets/rlam/icon-theory.png" className="h-[72px] w-auto mb-6 opacity-80 object-contain" alt="Theory" />
                <h3 className={`${TEXT_H3} mb-4`}>День 1-2 — теория и настольная подготовка</h3>
                <ul className="space-y-2 mb-4">
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> Роль и ответственность руководителя на месте.</li>
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> Законодательство и локальные процедуры.</li>
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> Психология поведения людей в условиях ЧС.</li>
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> Организация связи и взаимодействия (доклад SITREP).</li>
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> Инструменты оценки рисков на месте (Dynamic Risk Assessment).</li>
                </ul>
                <p className="text-[12px] font-bold text-black/90">Отработка вводных на 3D-макетах и планах, самостоятельное принятие решений и управление ситуацией.</p>
            </div>

            {/* День 3 */}
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col">
                <img src="/assets/rlam/icon-practice.png" className="h-[72px] w-auto mb-6 opacity-80 object-contain" alt="Practice" />
                <h3 className={`${TEXT_H3} mb-4`}>День 3 — практические сценарии</h3>
                <p className="text-[12px] text-black/80 mb-3">Практика на полигоне с использованием реального оборудования, огня, задымления и имитации утечек опасных веществ.</p>
                
                <p className="text-[12px] font-bold text-black/90 mb-2">Сценарии включают:</p>
                <ul className="space-y-1 mb-4">
                    <li className="text-[12px] text-black/80 pl-3 border-l-2 border-[#0B0073]/30">Пожар на технологической установке;</li>
                    <li className="text-[12px] text-black/80 pl-3 border-l-2 border-[#0B0073]/30">Утечка токсичного газа с пострадавшими;</li>
                    <li className="text-[12px] text-black/80 pl-3 border-l-2 border-[#0B0073]/30">Разлив химически опасного вещества.</li>
                </ul>

                <p className="text-[12px] font-bold text-black/90 mb-2">Задачи командира в сценариях:</p>
                <ul className="space-y-1">
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> провести оценку обстановки;</li>
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> запросить помощь и организовать эвакуацию;</li>
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> поставить задачи команде и передать управление.</li>
                </ul>
            </div>

        </div>
      </section>

      {/* ==================== 6. МЕТОДОЛОГИЯ HORIZON ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col items-center mb-8">
            <h2 className={`${TEXT_H2} text-center`}>Уникальная методология Horizon</h2>
        </div>
        
        <div className="bg-transparent border border-black/20 rounded-[15px] p-8 lg:p-10 flex flex-col lg:flex-row gap-10 items-center">
            
            <div className="w-full lg:w-1/3 flex justify-center border-b lg:border-b-0 lg:border-r border-black/10 pb-8 lg:pb-0 lg:pr-8">
                <img src="/assets/rlam/horizon-logo-dark.png" alt="Horizon Logo" className="w-[160px] object-contain opacity-90" />
            </div>

            <div className="w-full lg:w-2/3 flex flex-col gap-4">
                <p className={TEXT_BODY}>
                    Курс использует подход <span className="font-bold">Training Under Stress</span> (тренировка в условиях стресса) — это важнейшее условие для формирования автоматизма действий в критических ситуациях.
                </p>
                <p className="text-[13px] font-bold text-black/90 mt-2">Имитируются:</p>
                <ul className="space-y-1.5">
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> дефицит и противоречивость информации;</li>
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> фактор времени и внезапные изменения ситуации (эскалация);</li>
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> ошибки или паника членов команды;</li>
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> шум, плохая видимость и другие отвлекающие факторы.</li>
                </ul>
                <p className="text-[12px] font-medium text-black/70 italic mt-2">
                    Это позволяет прочувствовать реальную нагрузку и научиться с ней справляться.
                </p>
            </div>
            
        </div>
      </section>

      {/* ==================== 7. ИТОГИ И ОЦЕНКА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Левая колонка - Оценка */}
            <div className="w-full lg:w-1/2 bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow">
                <img src="/assets/rlam/icon-assessment.png" className="h-[72px] w-auto mb-6 opacity-80 object-contain" alt="Assessment" />
                <h3 className={`${TEXT_H3} mb-4`}>Оценка компетентности</h3>
                <p className="text-[12px] text-black/80 mb-4">По итогам курса проводится комплексная оценка знаний и навыков.</p>
                
                <p className="text-[12px] font-bold text-black/90 mb-2">Теоретический тест:</p>
                <ul className="space-y-1 mb-4">
                    <li className="text-[12px] text-black/80 pl-3 border-l-2 border-[#0B0073]/30">основы ICS;</li>
                    <li className="text-[12px] text-black/80 pl-3 border-l-2 border-[#0B0073]/30">оценка рисков;</li>
                    <li className="text-[12px] text-black/80 pl-3 border-l-2 border-[#0B0073]/30">коммуникационные протоколы;</li>
                    <li className="text-[12px] text-black/80 pl-3 border-l-2 border-[#0B0073]/30">понимание процедур эвакуации.</li>
                </ul>

                <p className="text-[12px] font-bold text-black/90 mb-2">Практический экзамен:</p>
                <ul className="space-y-1 mb-4">
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> самостоятельное руководство командой в смоделированной ЧС;</li>
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> способность принимать верные решения под стрессом;</li>
                    <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> корректная передача информации и управления.</li>
                </ul>
                <p className="text-[12px] font-bold text-[#0B0073]">Каждый участник получает индивидуальный фидбек и рекомендации.</p>
            </div>

            {/* Правая колонка - Участники и Компания (2 карточки друг под другом) */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                
                <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex gap-6 items-start flex-1">
                    <img src="/assets/rlam/icon-outcomes.png" className="h-[60px] w-auto opacity-80 object-contain shrink-0" alt="Outcomes" />
                    <div>
                        <h3 className={`${TEXT_H3} mb-3`}>Что получают участники</h3>
                        <p className="text-[12px] font-bold text-black/90 mb-2">Международно признанные навыки:</p>
                        <ul className="space-y-1">
                            <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> уверенность в своих действиях при реальной ЧС;</li>
                            <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> статус руководителя аварийной бригады (РЛАМ);</li>
                            <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> сертификат об успешном обучении.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex gap-6 items-start flex-1">
                    <img src="/assets/rlam/icon-company.png" className="h-[60px] w-auto opacity-80 object-contain shrink-0" alt="Company" />
                    <div>
                        <h3 className={`${TEXT_H3} mb-3`}>Результат для компании</h3>
                        <p className="text-[12px] font-bold text-black/90 mb-2">Готовый командир на месте происшествия, который способен:</p>
                        <ul className="space-y-1 mb-4">
                            <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> быстро взять ситуацию под контроль и не допустить эскалации (увеличения масштаба последствий);</li>
                            <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> снизить риск травматизма среди персонала;</li>
                            <li className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> минимизировать финансовые и экологические потери, а также репутационный ущерб.</li>
                        </ul>
                        <p className="text-[11px] font-medium text-black/70 italic">Это прямая инвестиция в безопасность предприятия и снижение материальных последствий при авариях.</p>
                    </div>
                </div>

            </div>
            
        </div>
      </section>

      {/* ==================== 8. КНОПКИ (CTA) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pb-10">
            {/* Основная синяя кнопка (открывает форму/модалку) */}
            <Button>
                Оставить заявку
            </Button>

          
        </div>
      </section>

    </main>
  );
}