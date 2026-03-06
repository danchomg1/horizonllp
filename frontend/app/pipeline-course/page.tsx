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

export default function PipelineCoursePage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/pipeline/hero-bg.jpg" alt="Background Pipeline" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/pipeline/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col max-w-3xl gap-2">
              <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] drop-shadow-lg">
                Ликвидация аварий на трубопроводах
              </h1>
              <p className="text-lg lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md">
                Практическая подготовка аварийно-спасательных служб
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ОПИСАНИЕ КУРСА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Интенсивный практический курс<br/>по локализации и устранению аварий на трубопроводах</h2>
        
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* 3 колонки текста */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
                <p className={TEXT_BODY}>
                    Аварии на трубопроводах несут огромные риски: утечки опасных веществ, пожары, экологический ущерб и остановка производства. От скорости и правильности действий первых прибывших подразделений зависят жизни людей и масштабы последствий.
                </p>
                <p className={TEXT_BODY}>
                    Курс готовит участников к действиям в условиях реальной аварии, используя реалистичные тренажеры-симуляторы трубопроводов под давлением.
                </p>
                <p className={TEXT_BODY}>
                    Программа включает отработку координации внутри команды, выбор правильных методов изоляции и ремонта, а также использование специализированного оборудования.
                </p>
            </div>

            {/* Картинка (Мигалка) */}
            <div className="w-full lg:w-1/3 relative h-[180px] lg:h-auto rounded-[15px] overflow-hidden shadow-sm">
               <Image src="/assets/pipeline/alarm-bg.jpg" alt="Alarm" fill className="object-cover" />
            </div>
        </div>
      </section>

      {/* ==================== 3. ДЛЯ КОГО ПРЕДНАЗНАЧЕН КУРС ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Для кого предназначен курс</h2>
        
        {/* 6 Карточек в ряд */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
                { img: "icon-rescue.png", text: "Аварийно-спасательные службы предприятий" },
                { img: "icon-fire.png", text: "Пожарные и газоспасательные подразделения" },
                { img: "icon-repair.png", text: "Работники аварийно-ремонтных бригад" },
                { img: "icon-operator.png", text: "Операторы технологических установок" },
                { img: "icon-hse.png", text: "Специалисты по промышленной безопасности и ОТ" },
                { img: "icon-staff.png", text: "Сотрудники нештатных аварийно-спасательных формирований" }
            ].map((item, i) => (
                <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-5 hover:shadow-md transition-shadow flex flex-col items-start">
                    <img src={`/assets/pipeline/${item.img}`} className="h-12 w-auto mb-4 opacity-80 object-contain" alt="Icon" />
                    <p className="text-[11px] font-bold text-black/90 leading-tight">{item.text}</p>
                </div>
            ))}
        </div>
      </section>

      {/* ==================== 4. ЦЕЛИ ОБУЧЕНИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-2`}>Цели обучения</h2>
        <p className="text-[14px] font-medium text-black/80 mb-6">В ходе курса участники получают практические навыки:</p>
        
        <ul className="space-y-3 max-w-4xl">
            {[
            "Оценка обстановки и разведка места аварии.",
            "Выбор и применение соответствующих средств индивидуальной защиты.",
            "Изоляция аварийного участка трубопровода.",
            "Установка бандажей, хомутов и заглушек под давлением.",
            "Контроль качества выполненных ремонтных работ."
            ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                <span className={TEXT_BODY}>{item}</span>
            </li>
            ))}
        </ul>
      </section>

      {/* ==================== 5. ФОРМАТ ОБУЧЕНИЯ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Формат обучения</h2>
        
        <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <p className={TEXT_BODY}><b>Продолжительность:</b> 2-3 дня (в зависимости от уровня подготовки).</p>
                <p className={TEXT_BODY}><b>Формат:</b> 30% теории / 70% практики на полигоне.</p>
                <p className={TEXT_BODY}><b>Оценка:</b> Практический экзамен по сценариям.</p>
            </div>
            
            <div className="w-full lg:w-1/2 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { img: "icon-theory.png", text: "Интерактивная теория" },
                    { img: "icon-demo.png", text: "Демонстрация оборудования" },
                    { img: "icon-practice.png", text: "Практика на тренажерах" },
                    { img: "icon-exam.png", text: "Итоговые тренировки" }
                ].map((item, i) => (
                    <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow aspect-square">
                        <img src={`/assets/pipeline/${item.img}`} className="h-12 w-auto mb-3 opacity-80 object-contain" alt="Icon" />
                        <p className="text-[10px] font-bold text-black/90 leading-tight">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* ==================== 6. ОСНОВНЫЕ ТЕМЫ КУРСА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Основные темы курса</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start">
                <img src="/assets/pipeline/icon-danger.png" className="h-18 w-auto mb-6 opacity-80 object-contain" alt="Danger" />
                <h3 className={`${TEXT_H3} mb-4`}>Опасности при авариях на трубопроводах</h3>
                <ul className="space-y-2">
                    <li className="text-[11px] text-black/70 leading-relaxed">• Свойства опасных веществ.</li>
                    <li className="text-[11px] text-black/70 leading-relaxed">• Физика процессов истечения газов и жидкостей.</li>
                    <li className="text-[11px] text-black/70 leading-relaxed">• Зоны загазованности и пожаров.</li>
                    <li className="text-[11px] text-black/70 leading-relaxed">• Факторы риска для персонала.</li>
                </ul>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start">
                <img src="/assets/pipeline/icon-ppe.png" className="h-18 w-auto mb-6 opacity-80 object-contain" alt="PPE" />
                <h3 className={`${TEXT_H3} mb-4`}>Средства индивидуальной защиты и ВДА</h3>
                <ul className="space-y-2">
                    <li className="text-[11px] text-black/70 leading-relaxed">• Выбор средств защиты органов дыхания (ВДА) и кожи.</li>
                    <li className="text-[11px] text-black/70 leading-relaxed">• Правила надевания и проверки.</li>
                    <li className="text-[11px] text-black/70 leading-relaxed">• Контроль времени работы в аппарате.</li>
                </ul>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start">
                <img src="/assets/pipeline/icon-equip.png" className="h-18 w-auto mb-6 opacity-80 object-contain" alt="Equipment" />
                <h3 className={`${TEXT_H3} mb-4`}>Специализированное оборудование</h3>
                <p className="text-[11px] text-black/70 leading-relaxed mb-2">Оборудование для локализации утечек:</p>
                <ul className="space-y-2">
                    <li className="text-[11px] text-black/70 leading-relaxed">• пневматические бандажи и пластыри;</li>
                    <li className="text-[11px] text-black/70 leading-relaxed">• механические хомуты и струбцины;</li>
                    <li className="text-[11px] text-black/70 leading-relaxed">• герметизирующие пасты и ленты.</li>
                    <li className="text-[11px] text-black/70 leading-relaxed mt-2">• Искробезопасный инструмент.</li>
                </ul>
            </div>
        </div>
      </section>

      {/* ==================== 7. ПРАКТИЧЕСКИЕ СЦЕНАРИИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-2`}>Практические сценарии</h2>
        <p className="text-[13px] text-black/80 mb-8">Во второй день курса участники выполняют реалистичные сценарии тренировок:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <h4 className="text-[16px] font-bold text-black/90 mb-4">Сценарий 1</h4>
                {/* Рамка border border-black/10 и rounded-lg убраны */}
                <div className="w-full h-[120px] bg-transparent flex items-center justify-center mb-4">
                    <img src="/assets/pipeline/icon-gas.png" className="h-24 opacity-80 object-contain" alt="Gas" />
                </div>
                <h3 className={`${TEXT_H3} mb-2`}>Утечка газа на надземном трубопроводе</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">— локализация пневматическим бандажом;<br/>— организация рабочей зоны.</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <h4 className="text-[16px] font-bold text-black/90 mb-4">Сценарий 2</h4>
                {/* Рамка border border-black/10 и rounded-lg убраны */}
                <div className="w-full h-[120px] bg-transparent flex items-center justify-center mb-4">
                    <img src="/assets/pipeline/icon-oil.png" className="h-24 opacity-80 object-contain" alt="Oil" />
                </div>
                <h3 className={`${TEXT_H3} mb-2`}>Разрыв нефтепровода с проливом продукта</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">— установка бандажа;<br/>— применение сорбентов и сбор продукта.</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <h4 className="text-[16px] font-bold text-black/90 mb-4">Сценарий 3</h4>
                {/* Рамка border border-black/10 и rounded-lg убраны */}
                <div className="w-full h-[120px] bg-transparent flex items-center justify-center mb-4">
                    <img src="/assets/pipeline/icon-flange.png" className="h-24 opacity-80 object-contain" alt="Flange" />
                </div>
                <h3 className={`${TEXT_H3} mb-2`}>Течь во фланцевом соединении под давлением</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">— установка специального кожуха;<br/>— контроль давления и герметичности.</p>
            </div>
        </div>
      </section>

      {/* ==================== 8. ИТОГИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4 mb-16">
        <div className="flex flex-col md:flex-row gap-10">
            {/* Левая колонка */}
            <div className="w-full md:w-1/2">
                <h2 className={`${TEXT_H2} mb-4`}>Какие навыки получат участники</h2>
                <p className="text-[13px] text-black/80 font-medium mb-4">По итогам курса участники смогут:</p>
                <ul className="space-y-2">
                    <li className="text-[12px] text-black/70 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> быстро оценивать ситуацию при авариях на трубопроводах;</li>
                    <li className="text-[12px] text-black/70 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> выбирать методы локализации;</li>
                    <li className="text-[12px] text-black/70 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> безопасно работать в ВДА;</li>
                    <li className="text-[12px] text-black/70 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> слаженно действовать в команде.</li>
                </ul>
            </div>

            {/* Правая колонка */}
            <div className="w-full md:w-1/2">
                <h2 className={`${TEXT_H2} mb-4`}>Результат для предприятия</h2>
                <p className="text-[13px] text-black/80 font-medium mb-4">После прохождения курса персонал предприятия сможет:</p>
                <ul className="space-y-2">
                    <li className="text-[12px] text-black/70 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> сократить время реагирования на аварии;</li>
                    <li className="text-[12px] text-black/70 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> минимизировать ущерб от утечек;</li>
                    <li className="text-[12px] text-black/70 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> повысить безопасность проведения ремонтных работ.</li>
                </ul>
            </div>
        </div>
      </section>

      {/* ==================== 9. КНОПКА ЗАЯВКИ ==================== */}
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