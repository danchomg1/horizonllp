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

export default function NeboshRawPage() {
  return (
    <main className={`${montserrat.className} bg-[#F4F4F4] min-h-screen pb-20`}>
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          
          <Image src="/assets/nebosh-raw/hero-bg.jpg" alt="NEBOSH Risk Assessment" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            {/* Logo */}
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh-raw/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            
            {/* Нижняя часть */}
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">
                  Award in Managing Risks and Risk Assessment at Work
                </h1>
                <p className="text-xl lg:text-[18px] font-medium text-white/90 leading-tight drop-shadow-md">
                  Это однодневная квалификация, разработанная экзаменационным советом NEBOSH совместно с государственным регулятором Великобритании — Health and Safety Executive (HSE). 
                </p>
              </div>

              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">
                Курс учит практическому подходу к оценке рисков, основанному на лучших мировых практиках.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ДЛЯ КОГО ЭТОТ КУРС ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>Для кого этот курс?</h2>
        <p className={`${TEXT_BODY} mb-8 max-w-4xl`}>
          Курс универсален и подходит для всех, кто участвует в процессе управления рисками в любой отрасли:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
            <div className="flex gap-4 items-start">
                <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                <div>
                    <span className="text-[15px] font-bold text-black/90 block mb-1">Руководители и линейные менеджеры:</span>
                    <span className={TEXT_BODY}>Чтобы понимать, как создавать безопасные условия для своих команд.</span>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                <div>
                    <span className="text-[15px] font-bold text-black/90 block mb-1">Специалисты по охране труда (SHE/HSE):</span>
                    <span className={TEXT_BODY}>Чтобы обновить знания и освоить подход британского регулятора (HSE).</span>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                <div>
                    <span className="text-[15px] font-bold text-black/90 block mb-1">Представители профсоюзов и "чемпионы" по безопасности:</span>
                    <span className={TEXT_BODY}>Чтобы грамотно выявлять опасности.</span>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                <div>
                    <span className="text-[15px] font-bold text-black/90 block mb-1">Владельцы бизнеса:</span>
                    <span className={TEXT_BODY}>Чтобы самостоятельно оценивать риски в своих компаниях.</span>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                <div>
                    <span className="text-[15px] font-bold text-black/90 block mb-1">Новички:</span>
                    <span className={TEXT_BODY}>Для старта карьеры в области безопасности (предварительные знания не требуются).</span>
                </div>
            </div>
        </div>
      </section>

      {/* ==================== 3. ЗАЧЕМ ЭТО НУЖНО ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>Зачем это нужно</h2>
        <p className={`${TEXT_BODY} mb-8 max-w-3xl`}>
          Главная цель курса — уйти от сложной бюрократии («бумажной безопасности») к реальным действиям по защите людей.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-raw/icon-raw-skill.png" className="w-10 h-10 mb-4 opacity-80 object-contain" alt="Навык" />
                <h3 className={`${TEXT_H3} mb-2`}>Навык, а не теория:</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Вы научитесь проводить оценку рисков не «для галочки», а так, чтобы это реально снижало травматизм.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-raw/icon-raw-tools.png" className="w-10 h-10 mb-4 opacity-80 object-contain" alt="Инструменты" />
                <h3 className={`${TEXT_H3} mb-2`}>Инструменты HSE:</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Вы освоите простые и эффективные инструменты оценки рисков (HSE risk assessment tools), которые используют инспекторы в Великобритании.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-raw/icon-raw-confidence.png" className="w-10 h-10 mb-4 opacity-80 object-contain" alt="Уверенность" />
                <h3 className={`${TEXT_H3} mb-2`}>Уверенность:</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Вы научитесь определять, какие меры контроля действительно необходимы и пропорциональны рискам, а на что не стоит тратить ресурсы.</p>
            </div>
            <div className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                <img src="/assets/nebosh-raw/icon-raw-legal.png" className="w-10 h-10 mb-4 opacity-80 object-contain" alt="Защита" />
                <h3 className={`${TEXT_H3} mb-2`}>Юридическая защита:</h3>
                <p className="text-[11px] text-black/70 leading-relaxed">Для компаний это способ доказать компетентность своих сотрудников в вопросах управления рисками.</p>
            </div>
        </div>
      </section>

      {/* ==================== 4. ФОРМАТ ОБУЧЕНИЯ И ЭКЗАМЕНА ==================== */}
      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>Формат обучения и экзамена</h2>
        <p className={`${TEXT_BODY} mb-8`}>Курс максимально сжат и ориентирован на практику.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Длительность */}
            <div className="lg:col-span-1 bg-transparent border border-black/20 rounded-[15px] p-8 flex flex-col items-center text-center">
                <img src="/assets/nebosh-raw/icon-format-time.png" className="h-[50px] w-auto mb-4 opacity-80" alt="Время" />
                <h3 className={TEXT_H3}>Длительность:</h3>
                <p className={TEXT_BODY}>Всего 1 день (около 6-7 часов обучения).</p>
            </div>
            
            {/* Программа */}
            <div className="lg:col-span-2 bg-transparent border border-black/20 rounded-[15px] p-8">
                <h3 className={`${TEXT_H3} mb-4`}>Программа (3 элемента):</h3>
                <ul className="space-y-3">
                    <li className="flex gap-3 items-start"><span className="text-[#0B0073] font-bold mt-0.5">1.</span><span className={TEXT_BODY}>Зачем нужно управлять рисками (моральные, правовые и финансовые причины).</span></li>
                    <li className="flex gap-3 items-start"><span className="text-[#0B0073] font-bold mt-0.5">2.</span><span className={TEXT_BODY}>Управление рисками: Выявление и понимание опасностей.</span></li>
                    <li className="flex gap-3 items-start"><span className="text-[#0B0073] font-bold mt-0.5">3.</span><span className={TEXT_BODY}>Источники информации и применение инструментов оценки рисков HSE.</span></li>
                </ul>
            </div>
        </div>

        {/* Экзамен */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-l-4 border-[#0B0073] pl-8 py-6">
            <img src="/assets/nebosh-raw/icon-exam-video.png" className="h-[60px] w-auto opacity-80 object-contain shrink-0" alt="Exam" />
            <div>
                <h3 className="text-[16px] font-bold text-black/90 mb-3">Экзамен (Практический):</h3>
                <p className={`${TEXT_BODY} mb-4 italic`}>Здесь нет скучных тестов. В конце дня вы проходите практическую оценку (Unit RAW1):</p>
                <ul className="space-y-2 mb-4">
                    <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-[#0B0073] mt-2 shrink-0"></span><span className={TEXT_BODY}>Вам показывают видео реального рабочего места.</span></li>
                    <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-[#0B0073] mt-2 shrink-0"></span><span className={TEXT_BODY}>Вы должны выявить опасности.</span></li>
                    <li className="flex gap-3 items-start"><span className="w-1.5 h-1.5 rounded-full bg-[#0B0073] mt-2 shrink-0"></span><span className={TEXT_BODY}>Заполнить форму оценки рисков: предложить разумные меры контроля и расставить приоритеты.</span></li>
                </ul>
                <p className="text-[13px] font-semibold text-[#0B0073]">Этот формат гарантирует, что вы действительно научились применять знания на практике.</p>
            </div>
        </div>
      </section>

      {/* ==================== 5. КНОПКИ ЗАЯВКИ ==================== */}
      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10 mt-12">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button>Оставить заявку</Button>
           
        </div>
      </section>

    </main>
  );
}