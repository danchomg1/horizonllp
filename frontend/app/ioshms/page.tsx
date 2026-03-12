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

export default function IoshManagingSafelyPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/iosh-managing-safely/hero-bg.jpg" alt="IOSH Managing Safely" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/iosh-managing-safely/hse-logo.svg" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">
                  IOSH Managing Safely
                </h1>
                <p className="text-xl lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">
                  Безопасное управление
                </p>
                <p className="text-lg lg:text-[16px] font-normal text-white/80 leading-snug drop-shadow-md">
                   Это курс для руководителей, который дает им практические инструменты для управления рисками и ресурсами в их командах.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ДЛЯ КОГО ЭТОТ КУРС ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="w-full lg:w-1/3">
                <h2 className={`${TEXT_H2} mb-6`}>Для кого этот курс?</h2>
                <div className="flex gap-4 items-start mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                    <p className={TEXT_BODY}>Курс разработан для линейных менеджеров, руководителей отделов, бригадиров и тимлидов в любом секторе и любой организации.</p>
                </div>
                <div className="flex gap-4 items-start mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                    <p className={TEXT_BODY}>Вам не нужно быть экспертом по безопасности, чтобы пройти его.</p>
                </div>
                <div className="flex gap-4 items-start">
                    <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                    <p className={TEXT_BODY}>Он подходит для тех, кто несет ответственность за других людей или процессы.</p>
                </div>
            </div>

            <div className="w-full lg:w-2/3">
                <h2 className={`${TEXT_H2} mb-8`}>Зачем это нужно?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Для компании */}
                    <div>
                        <h3 className="text-[13px] font-bold text-black/40 uppercase tracking-widest mb-4">Для компании</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3 items-center bg-transparent border border-black/10 rounded-[12px] p-4">
                                <img src="/assets/iosh-managing-safely/icon-comp-cost.png" className="w-8 h-8 opacity-80" alt="Cost" />
                                <div><span className="text-[13px] font-bold block">Снижение затрат:</span><span className="text-[11px] opacity-60">Меньше аварий и больничных = меньше финансовых потерь.</span></div>
                            </li>
                            <li className="flex gap-3 items-center bg-transparent border border-black/10 rounded-[12px] p-4">
                                <img src="/assets/iosh-managing-safely/icon-comp-legal.png" className="w-8 h-8 opacity-80" alt="Legal" />
                                <div><span className="text-[13px] font-bold block">Юридическая защита:</span><span className="text-[11px] opacity-60">Доказательство того, что ваши менеджеры компетентны.</span></div>
                            </li>
                            <li className="flex gap-3 items-center bg-transparent border border-black/10 rounded-[12px] p-4">
                                <img src="/assets/iosh-managing-safely/icon-comp-intl.png" className="w-8 h-8 opacity-80" alt="Intl" />
                                <div><span className="text-[13px] font-bold block">Международный статус:</span><span className="text-[11px] opacity-60">Сертификат IOSH признается во всем мире.</span></div>
                            </li>
                        </ul>
                    </div>
                    {/* Для сотрудника */}
                    <div>
                        <h3 className="text-[13px] font-bold text-black/40 uppercase tracking-widest mb-4">Для сотрудника (менеджера)</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3 items-center bg-transparent border border-black/10 rounded-[12px] p-4">
                                <img src="/assets/iosh-managing-safely/icon-mgr-resp.png" className="w-8 h-8 opacity-80" alt="Resp" />
                                <div><span className="text-[13px] font-bold block">Понимание ответственности:</span><span className="text-[11px] opacity-60">Вы точно будете знать, за что отвечаете вы.</span></div>
                            </li>
                            <li className="flex gap-3 items-center bg-transparent border border-black/10 rounded-[12px] p-4">
                                <img src="/assets/iosh-managing-safely/icon-mgr-skills.png" className="w-8 h-8 opacity-80" alt="Skills" />
                                <div><span className="text-[13px] font-bold block">Практические навыки:</span><span className="text-[11px] opacity-60">Вы научитесь оценивать риски и расследовать инциденты.</span></div>
                            </li>
                            <li className="flex gap-3 items-center bg-transparent border border-black/10 rounded-[12px] p-4">
                                <img src="/assets/iosh-managing-safely/icon-mgr-career.png" className="w-8 h-8 opacity-80" alt="Career" />
                                <div><span className="text-[13px] font-bold block">Карьера:</span><span className="text-[11px] opacity-60">Международный сертификат повышает вашу ценность.</span></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ==================== 3. ПРОГРАММА КУРСА (7 модулей) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>Программа курса (7 модулей)</h2>
        <p className={`${TEXT_BODY} mb-10`}>Программа построена логично, шаг за шагом превращая менеджера в лидера безопасности:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
                { title: "Введение в безопасное управление", desc: "Почему безопасность важна не только морально, но и финансово. Роль менеджера.", img: "icon-mod-1.png" },
                { title: "Оценка рисков", desc: "Ключевой модуль. Разница между «опасностью» и «риском». Матрица рисков (5x5).", img: "icon-mod-2.png" },
                { title: "Контроль рисков", desc: "Как выбирать меры защиты? Иерархия контроля. Понятие «разумно практикуемо».", img: "icon-mod-3.png" },
                { title: "Понимание ответственности", desc: "Обзор законодательства (гражданское и уголовное право). Требования закона.", img: "icon-mod-4.png" },
                { title: "Понимание опасностей", desc: "Обзор угроз: механические, физические, химические, биологические и др.", img: "icon-mod-5.png" },
                { title: "Расследование происшествий", desc: "Важность расследования «почти случившихся» аварий. Поиск коренной причины.", img: "icon-mod-6.png" },
                { title: "Измерение эффективности", desc: "Как понять, что система работает? Активный и реактивный мониторинг.", img: "icon-mod-7.png" }
            ].map((mod, idx) => (
                <div key={idx} className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                    <img src={`/assets/iosh-managing-safely/${mod.img}`} className="w-10 h-10 mb-4 opacity-80" alt={mod.title} />
                    <h3 className={`${TEXT_H3} mb-2`}>{mod.title}</h3>
                    <p className="text-[11px] text-black/60 leading-relaxed">{mod.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* ==================== 4. ФОРМАТ И ОЦЕНКА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Формат обучения и экзамена</h2>
        <div className="flex flex-col md:flex-row gap-12 border-l-4 border-[#0B0073] pl-8 py-2">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <img src="/assets/iosh-managing-safely/icon-format-time.png" className="w-6 h-6 opacity-80" alt="Time" />
                    <h3 className={TEXT_H3}>Длительность:</h3>
                </div>
                <p className={TEXT_BODY}>Интенсивный курс, который обычно занимает 3-4 дня (около 22-24 часов обучения).</p>
            </div>
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <img src="/assets/iosh-managing-safely/icon-format-eval.png" className="w-6 h-6 opacity-80" alt="Eval" />
                    <h3 className={TEXT_H3}>Оценка (2 этапа):</h3>
                </div>
                <p className={TEXT_BODY}><b>Тест:</b> 45 минут, 30 вопросов. Минимум 36 из 60 баллов.</p>
                <p className={TEXT_BODY}><b>Практический проект:</b> Оценка рисков на реальном рабочем месте в течение 2 недель.</p>
            </div>
        </div>
      </section>

      {/* ==================== 5. РЕЗУЛЬТАТ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <div className="bg-[#0B0073]/5 rounded-[15px] p-8 flex flex-col items-center text-center">
            <img src="/assets/iosh-managing-safely/icon-result-cert.png" className="w-16 h-16 mb-6 opacity-90" alt="Result" />
            <h2 className={`${TEXT_H2} mb-4`}>Результат</h2>
            <p className="text-[14px] font-medium text-black/80 max-w-2xl">
                После успешной сдачи теста и проекта вы получаете сертификат <b>IOSH Managing Safely</b>, который не имеет срока давности (хотя рекомендуется проходить рефреш-курсы каждые 3 года).
            </p>
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