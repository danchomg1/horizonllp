import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroSubtitle: "Краткий однодневный курс от NEBOSH и HSE",
    heroDesc: "Курс поможет научиться эффективно расследовать несложные происшествия и предотвращать их повторение, опираясь на лучшие международные практики.",
    audTitle: "Кому подойдет",
    audItems: ["Руководителям", "Специалистам по охране труда", "SHE-кураторам", "Профсоюзным и ответственным представителям"],
    empTitle: "Для работодателя",
    empItems: ["Снижение количества повторных случаев", "Повышение качества внутренних расследований", "Рост экспертности и доверия", "Улучшение имиджа и культуры безопасности"],
    learnTitle: "Чему вы научитесь на курсе",
    learnItems: ["Самостоятельно проводить расследование", "Проводить интервью и собирать доказательства", "Разрабатывать план предотвращения повторных инцидентов", "Участвовать в командных расследованиях", "Повышать общую культуру безопасности"],
    evalTitle: "Как проходит оценка",
    evalSubtitle: "Практическое задание:",
    evalDesc: "Анализ интервью и доказательств, составление структурированного плана действий для предотвращения инцидента в будущем.",
    cta: "Оставить заявку",
  },
  en: {
    heroSubtitle: "A concise one-day course from NEBOSH and HSE",
    heroDesc: "This course will help you learn how to effectively investigate simple incidents and prevent their recurrence, drawing on best international practices.",
    audTitle: "Who is it for?",
    audItems: ["Managers", "Health and safety specialists", "SHE coordinators", "Trade union and responsible representatives"],
    empTitle: "For the employer",
    empItems: ["Reduction in repeat incidents", "Improved quality of internal investigations", "Growing expertise and trust", "Improved image and safety culture"],
    learnTitle: "What you will learn on the course",
    learnItems: ["Conduct investigations independently", "Conduct interviews and gather evidence", "Develop a plan to prevent repeat incidents", "Participate in team investigations", "Improve overall safety culture"],
    evalTitle: "How the assessment works",
    evalSubtitle: "Practical task:",
    evalDesc: "Analysis of interviews and evidence, compiling a structured action plan to prevent future incidents.",
    cta: "Submit Request",
  },
};

export default async function NeboshIpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = content[locale as 'ru' | 'en'] ?? content.ru;

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <div className="absolute inset-0 bg-[#0B0073]"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start"><img src="/assets/nebosh/hse-logo.png" alt="NEBOSH HSE" className="h-[50px] object-contain" /></div>
            <div className="max-w-3xl">
              <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">NEBOSH HSE Certificate in Incident Investigation</h1>
              <p className="text-xl lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">{t.heroSubtitle}</p>
              <p className="text-lg lg:text-[16px] font-normal text-white/80 leading-snug drop-shadow-md">{t.heroDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className={`${TEXT_H2} mb-6`}>{t.audTitle}</h2>
            <ul className="space-y-3">{t.audItems.map((item, i) => (<li key={i} className="flex gap-3 items-start"><span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span><span className={TEXT_BODY}>{item}</span></li>))}</ul>
          </div>
          <div>
            <h2 className={`${TEXT_H2} mb-6`}>{t.empTitle}</h2>
            <ul className="space-y-3">{t.empItems.map((item, i) => (<li key={i} className="flex gap-3 items-start"><span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span><span className={TEXT_BODY}>{item}</span></li>))}</ul>
          </div>
          <div>
            <h2 className={`${TEXT_H2} mb-6`}>{t.learnTitle}</h2>
            <ul className="space-y-3">{t.learnItems.map((item, i) => (<li key={i} className="flex gap-3 items-start"><span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span><span className={TEXT_BODY}>{item}</span></li>))}</ul>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <div className="bg-[#0B0073]/5 rounded-[15px] p-8">
          <h2 className={`${TEXT_H2} mb-4`}>{t.evalTitle}</h2>
          <p className="text-[14px] font-bold text-[#0B0073] mb-2">{t.evalSubtitle}</p>
          <p className={TEXT_BODY}>{t.evalDesc}</p>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex justify-center"><Button>{t.cta}</Button></div>
      </section>
    </main>
  );
}
