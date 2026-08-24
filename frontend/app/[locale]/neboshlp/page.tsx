import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";
import { pick } from '../../lib/locale';

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    title: "NEBOSH Leadership Excellence",
    subtitle: "Лидерство в области безопасности и охраны труда",
    desc: "Курс для тех, кто хочет понять истинное влияние своего лидерства на корпоративную культуру и научиться принимать эффективные бизнес-решения без ущерба для безопасности людей.",
    audTitle: "Целевая аудитория",
    audItems: ["Руководители высшего и среднего звена.", "Менеджеры по охране труда.", "Любые специалисты, заинтересованные в улучшении лидерских качеств в контексте безопасности и охраны труда на рабочем месте."],
    goalTitle: "Цель программы",
    goalItems: ["Развитие лидерских навыков в контексте управления охраной труда.", "Понимание влияния лидерства на безопасность и охрану труда на рабочем месте.", "Применение лучших практик для формирования культуры безопасности."],
    topicsTitle: "Основные темы программы",
    topics: ["Что означает лидерство в области безопасности и охраны труда", "Моральные, правовые и финансовые причины хорошего лидерства по БиОТ", "Связи между лидерством и культурой охраны труда и техники безопасности", "Каковы различные стили лидерства", "Как человеческие ошибки могут повлиять на производительность и культуру", "Модель эффективного руководства в области безопасности и охраны труда", "Как лидеры могут строить эффективные отношения с коллегами"],
    formatTitle: "Формат программы",
    formatDur: "Длительность: 1 день (может варьироваться в зависимости от уровня знаний участников).",
    formatMethod: "Методы обучения: Интерактивные лекции, кейс-стади, групповые обсуждения, практические упражнения.",
    benefitsTitle: "Преимущества программы",
    benefits: ["Лидерство, которое отражает модель эффективного руководства безопасности и охраны труда.", "Здоровье и безопасность будут учитываться при принятии бизнес-решений в будущем.", "Лидеры, которые признают, что их собственное поведение влияет на культуру охраны здоровья и безопасности."],
    cta: "Оставить заявку",
  },
  en: {
    title: "NEBOSH Leadership Excellence",
    subtitle: "Leadership in Health and Safety",
    desc: "A course for those who want to understand the true impact of their leadership on corporate culture and learn to make effective business decisions without compromising people's safety.",
    audTitle: "Target Audience",
    audItems: ["Senior and middle managers.", "Health and safety managers.", "Any professionals interested in improving leadership qualities in the context of workplace health and safety."],
    goalTitle: "Programme Objectives",
    goalItems: ["Developing leadership skills in the context of health and safety management.", "Understanding the impact of leadership on workplace health and safety.", "Applying best practices to build a safety culture."],
    topicsTitle: "Key Programme Topics",
    topics: ["What leadership means in health and safety", "Moral, legal and financial reasons for good HSE leadership", "Connections between leadership and health and safety culture", "Different leadership styles", "How human errors can affect performance and culture", "A model of effective leadership in health and safety", "How leaders can build effective relationships with colleagues"],
    formatTitle: "Programme Format",
    formatDur: "Duration: 1 day (may vary depending on participants' knowledge level).",
    formatMethod: "Training methods: Interactive lectures, case studies, group discussions, practical exercises.",
    benefitsTitle: "Programme Benefits",
    benefits: ["Leadership that reflects a model of effective health and safety leadership.", "Health and safety will be considered in future business decision-making.", "Leaders who recognise that their own behaviour impacts health and safety culture."],
    cta: "Submit Request",
  },

  kz: {
    title: "NEBOSH Leadership Excellence",
    subtitle: "Қауіпсіздік және еңбекті қорғау саласындағы көшбасшылық",
    desc: "Өз көшбасшылығының корпоративтік мәдениетке нақты әсерін түсінгісі және адамдардың қауіпсіздігіне зиян келтірмей тиімді бизнес-шешім қабылдауды үйренгісі келетіндерге арналған курс.",
    audTitle: "Мақсатты аудитория",
    audItems: ["Жоғарғы және орта деңгей басшылары.", "Еңбекті қорғау менеджерлері.", "Жұмыс орнындағы қауіпсіздік және еңбекті қорғау тұрғысында көшбасшылық қасиеттерін жақсартуға мүдделі кез келген маман."],
    goalTitle: "Бағдарламаның мақсаты",
    goalItems: ["Еңбекті қорғауды басқару тұрғысында көшбасшылық дағдыларын дамыту.", "Көшбасшылықтың жұмыс орнындағы қауіпсіздік және еңбекті қорғауға әсерін түсіну.", "Қауіпсіздік мәдениетін қалыптастыру үшін үздік тәжірибелерді қолдану."],
    topicsTitle: "Бағдарламаның негізгі тақырыптары",
    topics: ["Қауіпсіздік және еңбекті қорғау саласындағы көшбасшылық дегеніміз не", "ЕҚҚ бойынша жақсы көшбасшылықтың моральдық, құқықтық және қаржылық себептері", "Көшбасшылық пен еңбекті қорғау және қауіпсіздік техникасы мәдениеті арасындағы байланыс", "Көшбасшылықтың әртүрлі стильдері қандай", "Адам қателіктері өнімділік пен мәдениетке қалай әсер етуі мүмкін", "Қауіпсіздік және еңбекті қорғау саласындағы тиімді басшылық моделі", "Көшбасшылар әріптестерімен тиімді қатынас қалай құра алады"],
    formatTitle: "Бағдарлама форматы",
    formatDur: "Ұзақтығы: 1 күн (қатысушылардың білім деңгейіне қарай өзгеруі мүмкін).",
    formatMethod: "Оқыту әдістері: Интерактивті дәрістер, кейс-стади, топтық талқылаулар, практикалық жаттығулар.",
    benefitsTitle: "Бағдарламаның артықшылықтары",
    benefits: ["Қауіпсіздік және еңбекті қорғаудың тиімді басшылық моделін көрсететін көшбасшылық.", "Болашақта бизнес-шешім қабылдау кезінде денсаулық пен қауіпсіздік ескерілетін болады.", "Өз мінез-құлқының денсаулық сақтау және қауіпсіздік мәдениетіне әсер ететінін мойындайтын көшбасшылар."],
    cta: "Өтінім қалдыру",
  },
};

export default async function NeboshLpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pick(content, locale);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <div className="absolute inset-0 bg-[#0B0073]"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div><img src="/assets/nebosh/hse-logo.png" alt="NEBOSH" className="h-[50px] object-contain" /></div>
            <div className="max-w-3xl">
              <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">{t.title}</h1>
              <p className="text-xl lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">{t.subtitle}</p>
              <p className="text-lg lg:text-[16px] font-normal text-white/80 leading-snug drop-shadow-md">{t.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-transparent border border-black/20 rounded-[15px] p-6">
            <h2 className={`${TEXT_H2} mb-6`}>{t.audTitle}</h2>
            <ul className="space-y-3">{t.audItems.map((item, i) => (<li key={i} className="flex gap-3 items-start"><span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span><span className={TEXT_BODY}>{item}</span></li>))}</ul>
          </div>
          <div className="bg-transparent border border-black/20 rounded-[15px] p-6">
            <h2 className={`${TEXT_H2} mb-6`}>{t.goalTitle}</h2>
            <ul className="space-y-3">{t.goalItems.map((item, i) => (<li key={i} className="flex gap-3 items-start"><span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span><span className={TEXT_BODY}>{item}</span></li>))}</ul>
          </div>
          <div className="bg-transparent border border-black/20 rounded-[15px] p-6">
            <h2 className={`${TEXT_H2} mb-6`}>{t.benefitsTitle}</h2>
            <ul className="space-y-3">{t.benefits.map((item, i) => (<li key={i} className="flex gap-3 items-start"><span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span><span className={TEXT_BODY}>{item}</span></li>))}</ul>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-16 px-4">
        <h2 className={`${TEXT_H2} mb-6`}>{t.topicsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.topics.map((topic, i) => (
            <div key={i} className="flex gap-4 items-start p-4 border border-black/10 rounded-[12px]">
              <span className="text-[13px] font-bold text-[#0B0073] shrink-0">{i + 1}.</span>
              <span className={TEXT_BODY}>{topic}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-16 mb-16 px-4">
        <div className="bg-[#0B0073]/5 rounded-[15px] p-8">
          <h2 className={`${TEXT_H2} mb-4`}>{t.formatTitle}</h2>
          <p className={`${TEXT_BODY} mb-2`}>{t.formatDur}</p>
          <p className={TEXT_BODY}>{t.formatMethod}</p>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex justify-center"><Button>{t.cta}</Button></div>
      </section>
    </main>
  );
}
