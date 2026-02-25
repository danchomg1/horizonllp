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
const TEXT_H3 = "text-[15px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

export default function IsoManagementPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/iso/hero-bg.jpg" alt="Background ISO" fill className="object-cover" />
          
          <div className="absolute inset-0 bg-[#000000]/50"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/iso/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              
              <div className="max-w-2xl">
                <p className="text-lg lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">
                  Разработка и внедрение систем менеджмента по стандартам
                </p>
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-1 drop-shadow-lg">
                  ISO 9001, 14001 и 45001
                </h1>
              </div>

              <p className="hidden lg:block text-[12px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">
                Обеспечиваем эффективность процессов управления за счет интеграции документальной базы и повышения компетентности персонала. Диагностика, разработка, сопровождение.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ИНТЕГРАЦИЯ СТАНДАРТОВ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-1/2">
                <h2 className={TEXT_H2}>Интеграция стандартов в<br/>реальные бизнес-процессы</h2>
            </div>
            <div className="w-full md:w-1/2">
                <p className={TEXT_BODY}>
                   Эффективная система менеджмента — это баланс между регламентирующей документацией и квалификацией персонала. Подход Horizon исключает формальное отношение к стандартам. Мы выстраиваем архитектуру управления, которая функционирует на всех уровнях организации.
                </p>
            </div>
        </div>
      </section>

      {/* ==================== 3. НАШИ ПРИОРИТЕТЫ (3 Карточки) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Наши приоритеты:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
                <img src="/assets/iso/icon-competence.png" className="h-10 w-auto mb-6 opacity-80 object-contain" alt="Competence" />
                <h3 className={`${TEXT_H3} mb-2`}>Компетентность владельцев процессов:</h3>
                <p className="text-[12px] text-black/70 leading-relaxed">Мы не просто передаем инструкции, а обеспечиваем понимание методологии и целей сотрудниками, ответственными за результат.</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
                <img src="/assets/iso/icon-changes.png" className="h-10 w-auto mb-6 opacity-80 object-contain" alt="Changes" />
                <h3 className={`${TEXT_H3} mb-2`}>Управление изменениями:</h3>
                <p className="text-[12px] text-black/70 leading-relaxed">Внедряемые механизмы направлены на реальное улучшение показателей качества, экологической безопасности и охраны труда.</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
                <img src="/assets/iso/icon-result.png" className="h-10 w-auto mb-6 opacity-80 object-contain" alt="Result" />
                <h3 className={`${TEXT_H3} mb-2`}>Результативность:</h3>
                <p className="text-[12px] text-black/70 leading-relaxed">Система разрабатывается с учетом жизненного цикла процессов, обеспечивая гибкость и оперативность реагирования.</p>
            </div>

        </div>
      </section>

      {/* ==================== 4. НАПРАВЛЕНИЯ ВНЕДРЕНИЯ (Блок с лого ISO) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Направления внедрения и оптимизации</h2>
        
        <div className="bg-transparent border border-black/20 rounded-[15px] p-8 lg:p-10 flex flex-col lg:flex-row gap-10 items-center lg:items-stretch">
            {/* Левая часть: Картинка ISO */}
            <div className="w-full lg:w-1/3 flex justify-center items-center border-b lg:border-b-0 lg:border-r border-black/10 pb-8 lg:pb-0 lg:pr-8">
                <img src="/assets/iso/iso-big-logo.png" alt="ISO Logo" className="w-[180px] lg:w-[220px] object-contain opacity-80" />
            </div>

            {/* Правая часть: Три колонки */}
            <div className="w-full lg:w-2/3 flex flex-col justify-between">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <h4 className={`${TEXT_H3} mb-2`}>ISO 9001 (Системы менеджмента качества):</h4>
                        <p className="text-[11px] text-black/70 leading-relaxed">Оптимизация операционных процессов и повышение удовлетворенности потребителей.</p>
                    </div>
                    <div>
                        <h4 className={`${TEXT_H3} mb-2`}>ISO 14001 (Системы экологического менеджмента):</h4>
                        <p className="text-[11px] text-black/70 leading-relaxed">Системное управление экологическими аспектами и минимизация рисков.</p>
                    </div>
                    <div>
                        <h4 className={`${TEXT_H3} mb-2`}>ISO 45001 (Охрана здоровья и безопасность труда):</h4>
                        <p className="text-[11px] text-black/70 leading-relaxed">Обеспечение безопасных условий труда и превентивное управление профессиональными рисками.</p>
                    </div>
                </div>
                
                <div className="pt-6 border-t border-black/10">
                    <p className="text-[11px] text-black/50 font-medium">
                        Мы реализуем проекты как по внедрению интегрированных систем менеджмента (ИСМ), так и по отдельным стандартам в зависимости от задач бизнеса.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* ==================== 5. ЭТАПЫ РАБОТЫ (Список с линиями) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-10`}>Этапы работы согласно внутреннему стандарту Horizon</h2>
        
        <div className="flex flex-col">
            {/* Строка 1 */}
            <div className="flex flex-col md:flex-row py-5 border-t border-black/10 gap-4 md:gap-10">
                <div className="w-full md:w-1/3 font-semibold text-[14px] text-black/90">1. Идентификация проблематики:</div>
                <div className="w-full md:w-2/3 text-[13px] text-black/70">Определение текущих несоответствий и постановка стратегических целей внедрения.</div>
            </div>
            {/* Строка 2 */}
            <div className="flex flex-col md:flex-row py-5 border-t border-black/10 gap-4 md:gap-10">
                <div className="w-full md:w-1/3 font-semibold text-[14px] text-black/90">2. Диагностический анализ:</div>
                <div className="w-full md:w-2/3 text-[13px] text-black/70">Аудит существующих процессов управления и оценка их зрелости.</div>
            </div>
            {/* Строка 3 */}
            <div className="flex flex-col md:flex-row py-5 border-t border-black/10 gap-4 md:gap-10">
                <div className="w-full md:w-1/3 font-semibold text-[14px] text-black/90">3. Разработка системных решений:</div>
                <div className="w-full md:w-2/3 text-[13px] text-black/70">Проектирование и документирование системы менеджмента с учетом специфики отрасли.</div>
            </div>
            {/* Строка 4 */}
            <div className="flex flex-col md:flex-row py-5 border-t border-black/10 gap-4 md:gap-10">
                <div className="w-full md:w-1/3 font-semibold text-[14px] text-black/90">4. Сопровождение внедрения:</div>
                <div className="w-full md:w-2/3 text-[13px] text-black/70">Методическая поддержка при запуске процессов и интеграции стандартов в операционную деятельность.</div>
            </div>
            {/* Строка 5 */}
            <div className="flex flex-col md:flex-row py-5 border-t border-b border-black/10 gap-4 md:gap-10">
                <div className="w-full md:w-1/3 font-semibold text-[14px] text-black/90">5. Оценка результативности:</div>
                <div className="w-full md:w-2/3 text-[13px] text-black/70">Анализ эффективности функционирования системы и корректирующие действия.</div>
            </div>
        </div>
      </section>

      {/* ==================== 6. ФОРМИРОВАНИЕ ИНСТИТУТА ЭКСПЕРТОВ (3 Карточки) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        
        <div className="flex flex-col md:flex-row gap-10 items-start mb-10">
            <div className="w-full md:w-1/2">
                <h2 className={TEXT_H2}>Формирование института внутренних экспертов</h2>
            </div>
            <div className="w-full md:w-1/2">
                <p className={TEXT_BODY}>
                   Ключевая задача Horizon — обеспечить автономность заказчика после завершения проекта. В рамках внедрения мы формируем пулл внутренних экспертов вашей компании.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            
            <div className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
                <img src="/assets/iso/icon-training.png" className="h-10 w-auto mb-6 opacity-80 object-contain" alt="Training" />
                <h3 className={`${TEXT_H3} mb-2`}>Подготовка персонала:</h3>
                <p className="text-[12px] text-black/70 leading-relaxed">Обучение внутренних аудиторов и владельцев процессов методам контроля и оценки.</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
                <img src="/assets/iso/icon-audit.png" className="h-10 w-auto mb-6 opacity-80 object-contain" alt="Audit" />
                <h3 className={`${TEXT_H3} mb-2`}>Стандартизация аудита:</h3>
                <p className="text-[12px] text-black/70 leading-relaxed">Разработка внутренних критериев оценки эффективности, адаптированных под ваши задачи.</p>
            </div>

            <div className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
                <img src="/assets/iso/icon-certification.png" className="h-10 w-auto mb-6 opacity-80 object-contain" alt="Certification" />
                <h3 className={`${TEXT_H3} mb-2`}>Готовность к сертификации:</h3>
                <p className="text-[12px] text-black/70 leading-relaxed">Обеспечение способности компании самостоятельно поддерживать соответствие требованиям внешних аудитов и непрерывно улучшать процессы.</p>
            </div>

        </div>

        <div className="flex items-start gap-4 mb-16 px-2">
            <span className="text-[13px] text-black/50">Результат:</span>
            <p className="text-[13px] text-black/90 font-medium">Заказчик получает действующую систему и компетентную команду для ее поддержания и развития.</p>
        </div>

        {/* Кнопка заявки */}
        <div className="flex justify-center pb-10">
            <Button>
                Оставить заявку
            </Button>
        </div>

      </section>

    </main>
  );
}