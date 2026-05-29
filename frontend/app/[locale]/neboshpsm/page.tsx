import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[16px] font-semibold text-black opacity-90 leading-tight";
const TEXT_BODY = "text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroSubtitle: "Управление безопасностью на производственных предприятиях с высокими рисками",
    heroRight: "Курс разработан специально для менеджеров, руководителей и инженеров, ответственных за управление и контроль опасных процессов и оборудования.",
    audTitle: "Целевая аудитория",
    audDesc: "Курс предназначен для специалистов, работающих в отраслях, где важно управление технологической безопасностью, включая нефтегазовую, химическую, фармацевтическую и другие промышленности с высоким уровнем опасности.",
    goalsTitle: "Цели курса",
    goals: [
      { img: "icon-goal-knowledge.png", text: "Улучшение знаний и понимания технологической безопасности" },
      { img: "icon-goal-risk.png", text: "Разработка умений по оценке рисков и управлению технологической безопасностью" },
      { img: "icon-goal-competence.png", text: "Повышение компетенции в разработке и реализации систем безопасности" },
    ],
    topicsTitle: "Основные темы программы",
    topics: ["Управление безопасностью процессов", "Управление технологическими рисками", "Контроль опасностей в процессах", "Действия при возгораниях и чрезвычайных ситуациях"],
    outcomesTitle: "Результаты обучения",
    outcomes: [
      { text: "Создание системы управления безопасностью", img: "icon-res-system.png" },
      { text: "Стратегии управления активами и технического обслуживания", img: "icon-res-assets.png" },
      { text: "Безопасный запуск и остановку технологического оборудования", img: "icon-res-startup.png" },
      { text: "Стандарты производительности для критически важных систем и оборудования", img: "icon-res-standards.png" },
      { text: "Опасности и меры контроля для химических реакций, хранения опасных веществ в больших объемах, пожаров и взрывов", img: "icon-res-chemicals.png" },
      { text: "Цель и особенности аварийных планов", img: "icon-res-emergency.png" },
    ],
    formatTitle: "Формат программы",
    format: [
      { img: "icon-format-duration.png", title: "Длительность", desc: "4 дня. Может варьироваться в зависимости от уровня знаний участников." },
      { img: "icon-format-exam.png", title: "Методы оценки", desc: "Контрольное тестирование на портале NEBOSH на английском языке, длительностью 90 минут." },
      { img: "icon-format-methods.png", title: "Методы обучения", desc: "Комбинация лекций, групповых обсуждений, практических заданий и кейс-стади." },
    ],
    benefitsTitle: "Преимущества курса",
    benefits: [
      { img: "icon-ben-certificate.png", title: "Сертификация", desc: "Успешно сдавшие экзамен участники получают международный сертификат NEBOSH." },
      { img: "icon-ben-safety.png", title: "Улучшение безопасности", desc: "Полученные знания и навыки помогут снизить вероятность инцидентов и повысить уровень технологической безопасности." },
      { img: "icon-ben-career.png", title: "Карьерное развитие", desc: "Повышение квалификации и получение международного сертификата способствуют профессиональному росту." },
    ],
    cta: "Оставить заявку",
  },
  en: {
    heroSubtitle: "Safety Management at High-Risk Industrial Facilities",
    heroRight: "This course is specifically designed for managers, supervisors and engineers responsible for managing and controlling hazardous processes and equipment.",
    audTitle: "Target Audience",
    audDesc: "The course is designed for professionals working in industries where process safety management is critical, including oil & gas, chemical, pharmaceutical and other high-hazard industries.",
    goalsTitle: "Course Objectives",
    goals: [
      { img: "icon-goal-knowledge.png", text: "Improving knowledge and understanding of process safety" },
      { img: "icon-goal-risk.png", text: "Developing skills for risk assessment and process safety management" },
      { img: "icon-goal-competence.png", text: "Enhancing competence in developing and implementing safety management systems" },
    ],
    topicsTitle: "Key Programme Topics",
    topics: ["Process safety management", "Managing process risks", "Controlling hazards in processes", "Actions during fires and emergency situations"],
    outcomesTitle: "Learning Outcomes",
    outcomes: [
      { text: "Creating a safety management system", img: "icon-res-system.png" },
      { text: "Asset management and maintenance strategies", img: "icon-res-assets.png" },
      { text: "Safe start-up and shut-down of process equipment", img: "icon-res-startup.png" },
      { text: "Performance standards for safety-critical systems and equipment", img: "icon-res-standards.png" },
      { text: "Hazards and controls for chemical reactions, large-scale storage of hazardous substances, fires and explosions", img: "icon-res-chemicals.png" },
      { text: "The purpose and features of emergency plans", img: "icon-res-emergency.png" },
    ],
    formatTitle: "Programme Format",
    format: [
      { img: "icon-format-duration.png", title: "Duration", desc: "4 days. May vary depending on participants' knowledge level." },
      { img: "icon-format-exam.png", title: "Assessment methods", desc: "Online test on the NEBOSH portal in English, 90 minutes." },
      { img: "icon-format-methods.png", title: "Training methods", desc: "A combination of lectures, group discussions, practical exercises and case studies." },
    ],
    benefitsTitle: "Programme Benefits",
    benefits: [
      { img: "icon-ben-certificate.png", title: "Certification", desc: "Participants who pass the assessment receive an internationally recognised NEBOSH certificate." },
      { img: "icon-ben-safety.png", title: "Improved safety", desc: "The knowledge and skills gained will help reduce the likelihood of incidents and improve process safety standards." },
      { img: "icon-ben-career.png", title: "Career development", desc: "Upskilling and obtaining an international certificate support professional growth." },
    ],
    cta: "Submit Request",
  },
};

export default async function NeboshPsmPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = content[locale as 'ru' | 'en'] ?? content.ru;

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/nebosh-psm/hero-bg.jpg" alt="NEBOSH PSM" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh-psm/hse-logo.png" alt="NEBOSH" width={120} height={50} className="object-contain" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl lg:text-[46px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">NEBOSH Process Safety Management</h1>
                <p className="text-xl lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md">{t.heroSubtitle}</p>
              </div>
              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">{t.heroRight}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/3">
            <h2 className={`${TEXT_H2} mb-4`}>{t.audTitle}</h2>
            <p className={TEXT_BODY}>{t.audDesc}</p>
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className={`${TEXT_H2} mb-6`}>{t.goalsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.goals.map((g, i) => (
                <div key={i} className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                  <img src={`/assets/nebosh-psm/${g.img}`} className="w-10 h-10 mb-4 opacity-80" alt="" />
                  <p className="text-[12px] font-medium text-black/80 leading-relaxed">{g.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.topicsTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {t.topics.map((topic, i) => (
            <div key={i} className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <h3 className={TEXT_H3}>{topic}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.outcomesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
          {t.outcomes.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-transparent border border-black/10 rounded-[10px] hover:shadow-sm transition-shadow">
              <img src={`/assets/nebosh-psm/${item.img}`} className="w-8 h-8 mt-1 opacity-80 object-contain shrink-0" alt="" />
              <span className="text-[13px] font-medium text-black/80 leading-relaxed">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.formatTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.format.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow">
              <img src={`/assets/nebosh-psm/${item.img}`} className="h-[50px] w-auto mb-5 opacity-80 object-contain" alt="" />
              <h3 className={`${TEXT_H3} mb-2`}>{item.title}</h3>
              <p className={TEXT_BODY}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.benefitsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.benefits.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex gap-5 items-start">
              <img src={`/assets/nebosh-psm/${item.img}`} className="w-[50px] h-[50px] opacity-80 object-contain shrink-0" alt="" />
              <div>
                <h3 className={`${TEXT_H3} mb-2`}>{item.title}</h3>
                <p className={TEXT_BODY}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex justify-center"><Button>{t.cta}</Button></div>
      </section>
    </main>
  );
}
