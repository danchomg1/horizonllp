import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";
import ButtonWhite from "../../components/ButtonWhite";
import { pick } from '../../lib/locale';

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[16px] font-semibold text-black opacity-90 leading-tight";
const TEXT_BODY = "text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroTitle: "Диагностика системы БиОТ:",
    heroSubtitle: "как найти «скрытые» проблемы до инцидента",
    heroRight: "Во многих компаниях основные риски рождаются не из незнания правил, а из скрытых системных сбоев: процедуры есть, но не работают, проверки проводятся, но не приводят к изменениям, инциденты не расследуются, а лишь маскируются.",
    statLeft: "А в глобальном масштабе масштаб потерь огромен:",
    statRight: "ежегодно миллионы людей погибают по причинам, связанным с работой, а сотни миллионов получают травмы — это отражает системную неэффективность в управлении рисками, а не только в формальном соблюдении требований.",
    whyTitle: "Зачем нужна диагностика",
    whyLead: "Цели диагностики — помочь руководству увидеть причины, а не только последствия:",
    whyItems: [
      "где контроль стал формальным;",
      "какие барьеры (технические/организационные) работают нестабильно;",
      "где риски нормализовались («так всегда было»);",
      "почему персонал не сообщает о почти инцидентах и опасных условиях;",
      "как процессы (PTW / LOTO / JSA / Управление подрядчиками) реально работают.",
    ],
    diagTitle: "Что мы диагностируем",
    diagIntro: "Мы оцениваем систему БиОТ как управленческий механизм (по модели PDCA) — от планирования и лидерства до проверки эффективности и корректирующих действий.",
    diagNote: "Подход согласуется с принципами построения и улучшения систем охраны труда, заложенными в ISO 45001.",
    diagSub: "Диагностика обычно включает:",
    diag: [
      { img: "icon-risk.png", title: "Управление ключевыми рисками", desc: "PTW, SIMOPS, LOTO, подрядчики, MOC, управление барьерами, готовность к авариям." },
      { img: "icon-incident.png", title: "Инциденты и near miss", desc: "Качество расследований, причины недосообщения, обучение на событиях." },
      { img: "icon-culture.png", title: "Лидерство и культура безопасности", desc: "Как руководители задают приоритеты, как принимаются решения, как работает обратная связь." },
      { img: "icon-field.png", title: "Полевые практики", desc: "Как люди реально выполняют работу, соответствие процедур фактическим условиям." },
      { img: "icon-competence.png", title: "Компетенции и контроль", desc: "Обучение, допуски, наблюдение за работой, аудит — насколько они формальны." },
    ],
    outTitle: "Что получает клиент на выходе",
    outDesc: "Чтобы результат был практичным, мы выдаем не «толстый отчет ради отчета», а пакет внедрения:",
    whyWorksTitle: "Почему это работает",
    whyWorksDesc: "Мы не ищем «виноватых». Мы оцениваем систему и предлагаем решения — так, чтобы безопасность становилась устойчивым элементом производственной эффективности, а не просто «комплаенсом».",
    out: [
      { img: "icon-map.png", title: "Карта зрелости системы БиОТ", desc: "Что работает, что не работает, сохраняя анализ." },
      { img: "icon-top.png", title: "Топ-10/20 приоритетных разрывов", desc: "С объяснением «почему это важно» (влияние на людей, производство, репутацию)." },
      { img: "icon-roadmap.png", title: "Дорожная карта улучшений", desc: "На 90 дней / 6 месяцев / 12 месяцев (быстрые победы + системные изменения)." },
      { img: "icon-smart.png", title: "SMART-план действий", desc: "С владельцами, сроками и критериями проверки выполнения." },
    ],
    cta: "Оставить заявку",
    cta2: "Заполнить форму",
  },
  en: {
    heroTitle: "HSE System Diagnostics:",
    heroSubtitle: "Finding 'hidden' problems before an incident occurs",
    heroRight: "In many companies the key risks stem not from ignorance of rules but from hidden systemic failures: procedures exist but don't work, inspections are carried out but lead to no changes, incidents are not investigated but merely concealed.",
    statLeft: "And on a global scale the losses are enormous:",
    statRight: "Millions of people die each year from work-related causes and hundreds of millions are injured — this reflects systemic inefficiency in risk management, not just formal non-compliance.",
    whyTitle: "Why diagnostics are needed",
    whyLead: "The goal of diagnostics is to help management see causes, not just consequences:",
    whyItems: [
      "where controls have become merely formal;",
      "which barriers (technical/organisational) are operating unreliably;",
      "where risks have been normalised ('it's always been this way');",
      "why staff don't report near-misses and unsafe conditions;",
      "how processes (PTW / LOTO / JSA / Contractor management) actually work in practice.",
    ],
    diagTitle: "What we diagnose",
    diagIntro: "We assess the HSE management system as a management mechanism (using the PDCA model) — from planning and leadership through to performance verification and corrective actions.",
    diagNote: "The approach aligns with the principles for building and improving occupational health and safety systems set out in ISO 45001.",
    diagSub: "The diagnostic typically covers:",
    diag: [
      { img: "icon-risk.png", title: "Key risk management", desc: "PTW, SIMOPS, LOTO, contractors, MOC, barrier management, emergency preparedness." },
      { img: "icon-incident.png", title: "Incidents and near misses", desc: "Quality of investigations, reasons for under-reporting, learning from events." },
      { img: "icon-culture.png", title: "Leadership and safety culture", desc: "How leaders set priorities, how decisions are made, how feedback loops operate." },
      { img: "icon-field.png", title: "Field practices", desc: "How people actually perform work, alignment of procedures with real conditions." },
      { img: "icon-competence.png", title: "Competence and oversight", desc: "Training, permits, work observation, auditing — how formal these actually are." },
    ],
    outTitle: "What the client receives",
    outDesc: "To ensure the result is practical, we deliver not a 'thick report for the sake of reporting' but an implementation package:",
    whyWorksTitle: "Why this works",
    whyWorksDesc: "We don't look for 'culprits'. We assess the system and propose solutions — so that safety becomes a sustainable element of operational performance, not just 'compliance'.",
    out: [
      { img: "icon-map.png", title: "HSE system maturity map", desc: "What is working, what is not, with analysis preserved." },
      { img: "icon-top.png", title: "Top 10/20 priority gaps", desc: "With an explanation of 'why this matters' (impact on people, production, reputation)." },
      { img: "icon-roadmap.png", title: "Improvement roadmap", desc: "Over 90 days / 6 months / 12 months (quick wins + systemic changes)." },
      { img: "icon-smart.png", title: "SMART action plan", desc: "With owners, deadlines and completion verification criteria." },
    ],
    cta: "Submit Request",
    cta2: "Fill in the form",
  },

  kz: {
    heroTitle: "ЕҚҚ жүйесін диагностикалау:",
    heroSubtitle: "жасырын мәселелерді оқыс оқиғаға дейін қалай табуға болады",
    heroRight: "Көптеген компанияларда негізгі қауіптер қағиданы білмеуден емес, жасырын жүйелік ақаулардан туындайды: рәсімдер бар, бірақ жұмыс істемейді; тексерулер жүргізіледі, бірақ өзгеріске әкелмейді; оқыс оқиғалар тергелмей, тек жасырылады.",
    statLeft: "Ал жаһандық ауқымда шығын көлемі орасан:",
    statRight: "жыл сайын миллиондаған адам жұмысқа байланысты себептерден қаза болады, ал жүздеген миллионы жарақат алады — бұл тек талаптарды ресми сақтауда ғана емес, қауіптерді басқарудағы жүйелік тиімсіздікті көрсетеді.",
    whyTitle: "Диагностика не үшін қажет",
    whyLead: "Диагностиканың мақсаты — басшылыққа тек салдарды емес, себептерді көруге көмектесу:",
    whyItems: [
      "бақылау қай жерде ресми сипат алды;",
      "қандай тосқауылдар (техникалық/ұйымдастырушылық) тұрақсыз жұмыс істейді;",
      "қауіптер қай жерде қалыпты саналып кетті (әрқашан солай болған);",
      "персонал болуға шақ қалған оқиғалар мен қауіпті жағдайлар туралы неге хабарламайды;",
      "процестер (PTW / LOTO / JSA / мердігерлерді басқару) шын мәнінде қалай жұмыс істейді.",
    ],
    diagTitle: "Біз нені диагностикалаймыз",
    diagIntro: "Біз ЕҚҚ жүйесін басқару тетігі ретінде бағалаймыз (PDCA моделі бойынша) — жоспарлау мен көшбасшылықтан бастап тиімділікті тексеру және түзету әрекеттеріне дейін.",
    diagNote: "Тәсіл ISO 45001 стандартында қаланған еңбекті қорғау жүйелерін құру және жетілдіру қағидаттарымен үйлеседі.",
    diagSub: "Диагностика әдетте мыналарды қамтиды:",
    diag: [
      { img: "icon-risk.png", title: "Негізгі қауіптерді басқару", desc: "PTW, SIMOPS, LOTO, мердігерлер, MOC, тосқауылдарды басқару, авариялық дайындық." },
      { img: "icon-incident.png", title: "Оқыс оқиғалар және near miss", desc: "Тергеу сапасы, толық хабарламау себептері, оқиғалардан сабақ алу." },
      { img: "icon-culture.png", title: "Көшбасшылық және қауіпсіздік мәдениеті", desc: "Басшылар басымдықты қалай белгілейді, шешім қалай қабылданады, кері байланыс қалай жұмыс істейді." },
      { img: "icon-field.png", title: "Далалық практикалар", desc: "Адамдар жұмысты шын мәнінде қалай орындайды, рәсімдердің нақты жағдайға сәйкестігі." },
      { img: "icon-competence.png", title: "Құзыреттер және бақылау", desc: "Оқыту, рұқсаттар, жұмысты бақылау, аудит — олар қаншалықты ресми." },
    ],
    outTitle: "Клиент нәтижесінде не алады",
    outDesc: "Нәтиже практикалық болуы үшін біз есеп үшін жазылған қалың есепті емес, енгізу пакетін береміз:",
    whyWorksTitle: "Бұл неге жұмыс істейді",
    whyWorksDesc: "Біз кінәлілерді іздемейміз. Біз жүйені бағалап, шешім ұсынамыз — қауіпсіздік жай комплаенс емес, өндірістік тиімділіктің тұрақты элементіне айналатындай.",
    out: [
      { img: "icon-map.png", title: "ЕҚҚ жүйесінің кемелдік картасы", desc: "Не жұмыс істейді, не жұмыс істемейді — талдауымен." },
      { img: "icon-top.png", title: "Басым 10/20 алшақтық", desc: "Бұл неге маңызды екенін түсіндірумен (адамдарға, өндіріске, репутацияға әсері)." },
      { img: "icon-roadmap.png", title: "Жақсарту жол картасы", desc: "90 күн / 6 ай / 12 айға (жылдам жеңістер + жүйелік өзгерістер)." },
      { img: "icon-smart.png", title: "SMART іс-қимыл жоспары", desc: "Иелерімен, мерзімдерімен және орындалуын тексеру өлшемдерімен." },
    ],
    cta: "Өтінім қалдыру",
    cta2: "Форманы толтыру",
  },
};

export default async function DiagnostikaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pick(content, locale);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/diag/hero-bg.jpg" alt="HSE Diagnostics" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/00"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
              <Image src="/assets/diag/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-2xl">
                <h1 className="text-3xl lg:text-[36px] font-bold text-white leading-[1.1] mb-1 drop-shadow-lg">{t.heroTitle}</h1>
                <p className="text-xl lg:text-[18px] font-medium text-white/90 leading-tight drop-shadow-md">{t.heroSubtitle}</p>
              </div>
              <p className="hidden lg:block text-[12px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">{t.heroRight}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-12 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          <div className="w-full lg:w-1/2 flex justify-start lg:justify-center">
            <img src="/assets/diag/cercle.svg" alt="Statistics" className="w-full max-w-[400px] lg:max-w-[480px] h-auto object-contain" />
          </div>
          <div className="w-full lg:w-1/2 flex items-center justify-start">
            <div className="w-full bg-transparent border border-black/20 rounded-[15px] px-8 py-6 lg:px-10 lg:py-8 flex flex-col items-start justify-center">
              <p className="text-left text-[14px] lg:text-[15px] text-black/80 mb-3">{t.statLeft} <span className="underline underline-offset-4 decoration-black/40 font-semibold"></span></p>
              <p className="text-left text-[12px] lg:text-[13px] text-black/60 leading-relaxed">{t.statRight}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-10`}>{t.whyTitle}</h2>
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          <div className="w-full lg:w-1/3 relative h-[220px] rounded-[15px] overflow-hidden shadow-sm">
            <Image src="/assets/diag/why-img.jpg" alt="Inspection" fill className="object-cover" />
          </div>
          <div className="w-full lg:w-2/3 flex flex-col justify-center">
            <p className="text-[14px] font-semibold text-black/90 mb-4">{t.whyLead}</p>
            <ul className="space-y-3">
              {t.whyItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                  <span className={TEXT_BODY}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full mt-12 flex justify-center items-center">
          <div className="hidden lg:block w-full">
            <img src="/assets/diag/diagram-desktop.svg" alt="Diagnostic diagram" className="w-full h-auto object-contain drop-shadow-sm" />
          </div>
          <div className="hidden md:block lg:hidden w-full">
            <img src="/assets/diag/diagram-desktop_min.svg" alt="Diagnostic diagram" className="w-full h-auto object-contain drop-shadow-sm" />
          </div>
          <div className="block md:hidden w-full">
            <img src="/assets/diag/diagram-mobile.svg" alt="Diagnostic diagram" className="w-full h-auto object-contain drop-shadow-sm" />
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 items-start mb-10">
          <h2 className={`${TEXT_H2} shrink-0`}>{t.diagTitle}</h2>
          <p className={TEXT_BODY}>{t.diagIntro}</p>
          <p className={TEXT_BODY}>{t.diagNote}</p>
        </div>
        <p className="text-[12px] text-black/50 mb-6">{t.diagSub}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {t.diag.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow">
              <img src={`/assets/diag/${item.img}`} className="w-10 h-10 mb-4 opacity-80" alt="" />
              <h3 className={`${TEXT_H3} mb-3`}>{item.title}</h3>
              <p className="text-[11px] text-black/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col md:flex-row gap-10 mb-8">
          <div className="w-full md:w-1/2">
            <h2 className={`${TEXT_H2} mb-4`}>{t.outTitle}</h2>
            <p className={TEXT_BODY}>{t.outDesc}</p>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className={`${TEXT_H2} mb-4`}>{t.whyWorksTitle}</h2>
            <p className={TEXT_BODY}>{t.whyWorksDesc}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {t.out.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
              <img src={`/assets/diag/${item.img}`} className="w-8 h-8 shrink-0 opacity-80" alt="" />
              <div>
                <h4 className="text-[13px] font-bold text-black/90 mb-1">{item.title}</h4>
                <p className="text-[11px] text-black/60 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pb-10">
          <Button>{t.cta}</Button>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfycmEUau4ILUxGVh0Vgbt57-kIY9fS2e4aLNca6EbZPKagsA/viewform" target="_blank" rel="noopener noreferrer">
            <ButtonWhite noModal>{t.cta2}</ButtonWhite>
          </a>
        </div>
      </section>
    </main>
  );
}
