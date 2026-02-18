import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

// Подключаем шрифт Montserrat
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"], // Добавил 500 для medium, если понадобится
  variable: "--font-montserrat",
});

// === ТИПОГРАФИЯ (Уменьшена на 2px, сжатый интервал) ===
// Заголовки: 18px (было 20), semibold
const TEXT_H2 = "text-[18px] font-semibold text-black opacity-100 leading-tight";
// Подзаголовки: 15px (было 17), regular
const TEXT_SUB = "text-[15px] font-normal text-black opacity-80 leading-snug";
// Обычный текст: 12px (было 14), regular
const TEXT_BODY = "text-[12px] font-normal text-black opacity-80 leading-snug";

export const metadata = {
  title: "ISO 9001, 14001, 45001 | Horizon",
  description: "Разработка и внедрение систем менеджмента.",
};

export default function IsoPage() {
  return (
    // 2. ФОН #F4F4F4
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
{/* ==================== 1. HERO SECTION (Обновленный) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[500px] rounded-[15px] overflow-hidden group">
          
          {/* 1. ФОН: ВИДЕО или КАРТИНКА */}
          <div className="absolute inset-0 z-0">
             {/* Сначала пытаемся показать видео */}
             <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover"
                poster="/assets/iso/hero-main.jpg" // Картинка показывается, пока грузится видео (или если видео нет)
             >
                <source src="/assets/iso/hero-video.mp4" type="video/mp4" />
             </video>
             
             {/* Если видео нет, поверх ляжет картинка (резерв), но лучше видео загрузить */}
             {/* Затемнение фона для читаемости */}
             <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* 2. ЛОГОТИП HSE (Слева сверху) */}
          <div className="absolute top-8 left-8 lg:top-10 lg:left-10 z-10">
             <Image 
                src="/assets/iso/hse-logo.png" 
                alt="HSE Horizon Logo" 
                width={140} 
                height={60} 
                className="object-contain"
             />
          </div>

          {/* 3. ТЕКСТ СПРАВА СВЕРХУ (Выравнивание по левому краю) */}
          <div className="hidden lg:block absolute top-10 right-10 z-10 max-w-[380px]">
             <p className="text-[14px] text-white text-left leading-relaxed opacity-90 font-light">
                Обеспечиваем эффективность процессов управления за счет интеграции документальной базы и повышения компетентности персонала. <br/>
                Диагностика, разработка, сопровождение.
             </p>
          </div>

          {/* 4. ЗАГОЛОВОК (Снизу слева, уменьшенный) */}
          <div className="absolute bottom-10 left-8 lg:bottom-12 lg:left-10 z-10 text-white">
            <h1 className="text-[26px] lg:text-[30px] font-semibold leading-tight mb-1 drop-shadow-md max-w-2xl">
              Разработка и внедрение систем <br />
              менеджмента по стандартам
            </h1>
            <div className="text-[42px] lg:text-[46px] font-bold mt-1 tracking-wide">
              ISO 9001, 14001 и 45001
            </div>
          </div>

        </div>
      </section>
      {/* ==================== 2. ИНТЕГРАЦИЯ + ПАРЕНЬ В КАСКЕ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-16 px-4 mb-20">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-10">
          
          {/* Левая часть: Заголовок */}
          <div className="lg:w-1/3 mb-10 lg:mb-0">
            <h2 className="text-[26px] lg:text-[28px] font-semibold text-black/90 leading-tight">
              Интеграция стандартов в <br />
              реальные бизнес-процессы
            </h2>
          </div>

          {/* Правая часть: БЛОК С ТЕКСТОМ */}
          {/* 3. ОБВОДКА ВМЕСТО ФОНА */}
          <div className="lg:w-2/3 relative">
            <div className="rounded-[15px] border border-black/80 bg-transparent p-8 lg:pr-40 flex items-center min-h-[200px] relative overflow-visible">
               <div className="max-w-md">
                 <p className={TEXT_BODY}>
                   Эффективная система менеджмента — это баланс между регламентирующей документацией и квалификацией персонала. Подход Horizon исключает формальное отношение к стандартам. Мы выстраиваем архитектуру управления, которая функционирует на всех уровнях организации.
                 </p>
               </div>
               
               {/* Парень */}
               <div className="hidden lg:block absolute bottom-0 -right-10 w-[280px] h-[340px]">
                  <Image 
                    src="/assets/iso/worker-man.png" 
                    alt="Worker" 
                    fill 
                    className="object-contain object-bottom"
                  />
               </div>
            </div>
          </div>

        </div>
      </section>

{/* ==================== 3. НАШИ ПРИОРИТЕТЫ (Карточки) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-12 px-4">
        <h2 className={`${TEXT_H2} mb-6`}>Наши приоритеты:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Карточка 1 */}
            {/* 1. ФОН bg-transparent, РАМКА border-black/10 (аккуратная серая) */}
            <div className="bg-transparent border border-black/10 rounded-[15px] p-6 h-[240px] relative overflow-hidden group">
                <div className="flex flex-col h-full justify-between relative z-10 w-[60%]">
                    <h3 className={`${TEXT_H2} mb-2 leading-tight`}>Компетентность <br/> владельцев <br/> процессов:</h3>
                    <p className={TEXT_BODY}>
                        Мы не просто передаем инструкции, а обеспечиваем понимание методологии и целей.
                    </p>
                </div>
                {/* 2. ИКОНКА УВЕЛИЧЕНА (было 140px -> стало 180px) */}
                <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[180px] h-[180px]">
                    <img src="/assets/iso/icon-chart.png" alt="icon" className="w-full h-full object-contain opacity-90" />
                </div>
            </div>

            {/* Карточка 2 */}
            <div className="bg-transparent border border-black/10 rounded-[15px] p-6 h-[240px] relative overflow-hidden group">
                <div className="flex flex-col h-full justify-between relative z-10 w-[60%]">
                    <h3 className={`${TEXT_H2} mb-2 leading-tight`}>Управление <br/> изменениями:</h3>
                    <p className={TEXT_BODY}>
                        Внедряемые механизмы направлены на реальное улучшение показателей качества.
                    </p>
                </div>
                <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[180px] h-[180px]">
                     <img src="/assets/iso/icon-brain.png" alt="icon" className="w-full h-full object-contain opacity-90" />
                </div>
            </div>

            {/* Карточка 3 */}
            <div className="bg-transparent border border-black/10 rounded-[15px] p-6 h-[240px] relative overflow-hidden group">
                <div className="flex flex-col h-full justify-between relative z-10 w-[60%]">
                    <h3 className={`${TEXT_H2} mb-2 leading-tight`}>Результативность:</h3>
                    <p className={`${TEXT_BODY}`}>
                        Система разрабатывается с учетом жизненного цикла процессов, обеспечивая гибкость.
                    </p>
                </div>
                <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[180px] h-[180px]">
                     <img src="/assets/iso/icon-arrow.png" alt="icon" className="w-full h-full object-contain opacity-90" />
                </div>
            </div>
        </div>
      </section>

      {/* ==================== 4. СИНИЙ БЛОК ISO ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-12 px-4">
        <h2 className={`${TEXT_H2} mb-6`}>Направления внедрения и оптимизации</h2>
        
        {/* 6. ИСПРАВЛЕНИЕ ОТСТУПОВ И ЛИНИИ */}
        <div className="bg-[#0B0073] rounded-[15px] p-8 lg:p-10 text-white flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden min-h-[320px]">
            {/* Глобус слева */}
            <div className="shrink-0 relative z-10 w-[200px] aspect-square flex items-center justify-center">
                 <Image src="/assets/iso/iso-globe.png" alt="ISO" width={220} height={220} className="object-contain" />
            </div>

            {/* Список стандартов */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full z-10 items-start pb-10">
                <div className="space-y-3">
                    <h4 className="text-[16px] font-bold text-white leading-tight">ISO 9001 (Системы менеджмента качества):</h4>
                    <p className="text-[11px] opacity-70 font-light leading-snug">
                        Оптимизация операционных процессов и повышение удовлетворенности потребителей.
                    </p>
                </div>
                <div className="space-y-3">
                    <h4 className="text-[16px] font-bold text-white leading-tight">ISO 14001 (Системы экологического менеджмента):</h4>
                    <p className="text-[11px] opacity-70 font-light leading-snug">
                        Системное управление экологическими аспектами и минимизация рисков.
                    </p>
                </div>
                <div className="space-y-3">
                    <h4 className="text-[16px] font-bold text-white leading-tight">ISO 45001 (Охрана здоровья и безопасность труда):</h4>
                    <p className="text-[11px] opacity-70 font-light leading-snug">
                        Обеспечение безопасных условий труда и превентивное управление профессиональными рисками.
                    </p>
                </div>
            </div>
            
            {/* Тонкая линия внизу */}
            <div className="absolute bottom-10 left-[260px] right-10 h-[1px] bg-white/20 z-10 hidden lg:block"></div>
            <p className="absolute bottom-4 left-[260px] text-[10px] text-white/50 z-10 hidden lg:block">
                Мы реализуем проекты как по внедрению интегрированных систем менеджмента (ИСМ), так и по отдельным стандартам.
            </p>
        </div>
      </section>

      {/* ==================== 5. ЭТАПЫ РАБОТЫ (Список) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>Этапы работы согласно внутреннему стандарту Horizon</h2>

        <div className="w-full border-t border-gray-300">
            {[
                { id: "1. Идентификация проблематики:", desc: "Определение текущих несоответствий и постановка стратегических целей внедрения." },
                { id: "2. Диагностический анализ:", desc: "Аудит существующих процессов управления и оценка их зрелости." },
                { id: "3. Разработка системных решений:", desc: "Проектирование и документирование системы менеджмента с учетом специфики отрасли." },
                { id: "4. Сопровождение внедрения:", desc: "Методическая поддержка при запуске процессов и интеграции стандартов в операционную деятельность." },
                { id: "5. Оценка результативности:", desc: "Анализ эффективности функционирования системы и корректирующие действия." },
            ].map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row py-5 border-b border-gray-300 hover:bg-gray-100/50 transition-colors px-2">
                    <div className="w-full md:w-1/3 mb-1 md:mb-0">
                        <span className={TEXT_SUB}>{item.id}</span>
                    </div>
                    <div className="w-full md:w-2/3">
                        <span className={TEXT_BODY}>{item.desc}</span>
                    </div>
                </div>
            ))}
        </div>
      </section>

{/* ==================== 6. ФОРМИРОВАНИЕ ИНСТИТУТА (Нижние карточки) ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-6">
            <h2 className={`${TEXT_H2} max-w-lg`}>Формирование института внутренних экспертов</h2>
            
            <div className="w-full md:w-auto flex justify-end">
                 <p className="text-[10px] text-black/60 max-w-[320px] text-left leading-tight">
                    Ключевая задача Horizon — обеспечить автономность заказчика после завершения проекта. В рамках внедрения мы формируем пул внутренних экспертов вашей компании.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Карточка 1 */}
            <div className="bg-white border border-[#E0E0E0] rounded-[15px] h-[220px] overflow-hidden flex flex-row relative">
                {/* Левая часть: Текст (Теперь занимает больше места) */}
                <div className="flex-1 p-6 flex flex-col justify-center z-20 relative">
                    <h3 className={`${TEXT_H2} mb-3`}>Подготовка <br/> персонала:</h3>
                    <p className={TEXT_BODY}>
                        Обучение внутренних аудиторов и владельцев процессов методам контроля и оценки.
                    </p>
                </div>
                {/* Правая часть: Картинка (Сужена до 120px) */}
                <div className="w-[120px] relative h-full shrink-0">
                     <Image src="/assets/iso/expert-1.jpg" alt="Training" fill className="object-cover" />
                     {/* Градиент тоже немного сузил (w-16), чтобы не закрывал узкую картинку */}
                     <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"></div>
                </div>
            </div>

            {/* Карточка 2 */}
            <div className="bg-white border border-[#E0E0E0] rounded-[15px] h-[220px] overflow-hidden flex flex-row relative">
                <div className="flex-1 p-6 flex flex-col justify-center z-20 relative">
                    <h3 className={`${TEXT_H2} mb-3`}>Стандартизация <br/> аудита:</h3>
                    <p className={TEXT_BODY}>
                        Разработка внутренних критериев оценки эффективности, адаптированных под ваши задачи.
                    </p>
                </div>
                <div className="w-[120px] relative h-full shrink-0">
                     <Image src="/assets/iso/expert-2.jpg" alt="Audit" fill className="object-cover" />
                     <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"></div>
                </div>
            </div>

            {/* Карточка 3 */}
            <div className="bg-white border border-[#E0E0E0] rounded-[15px] h-[220px] overflow-hidden flex flex-row relative">
                <div className="flex-1 p-6 flex flex-col justify-center z-20 relative">
                    <h3 className={`${TEXT_H2} mb-3`}>Готовность к <br/> сертификации:</h3>
                    <p className={TEXT_BODY}>
                        Обеспечение способности компании самостоятельно поддерживать соответствие требованиям.
                    </p>
                </div>
                <div className="w-[120px] relative h-full shrink-0">
                     <Image src="/assets/iso/expert-3.jpg" alt="Certification" fill className="object-cover" />
                     <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"></div>
                </div>
            </div>
        </div>
        
        {/* Результат */}
        <div className="mt-6 flex items-start gap-4 max-w-lg">
            <span className={TEXT_SUB}>Результат:</span>
            <p className={TEXT_BODY}>
                Заказчик получает действующую систему и компетентную команду для ее поддержки и развития.
            </p>
        </div>

      </section>

    </main>
  );
}