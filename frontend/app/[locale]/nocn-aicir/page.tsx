import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[14px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroSubtitle: "(Asset Incident Commander – Initial Response)",
    heroRight: "Практический курс для руководителей и членов штабов аварийного управления. Программа учит действовать в первые критические минуты крупной аварии, когда цена ошибки недопустимо высока, а решения нужно принимать быстро, четко и на основе фактов.",
    icsTitle: "Отработка управления инцидентами\nпо структуре Incident Command System",
    ics: [
      { img: "icon-info.png", title: "Сбор информации", desc: "и оценка обстановки;" },
      { img: "icon-priority.png", title: "Постановка приоритетов", desc: "и распределение ресурсов;" },
      { img: "icon-comm.png", title: "Управление коммуникациями", desc: "и взаимодействие с оперативными службами;" },
      { img: "icon-team.png", title: "Команда объекта, контроль эскалации и защита людей, оборудования и окружающей среды." },
      { img: "icon-method.png", title: "Методология:", desc: "Курс построен на интенсивных сценариях с четкими протоколами (SITREP, M/ETHANE и др.)." },
    ],
    simTitle: "Симуляции, максимально приближенные к реальности",
    sim1: "Ключевая особенность — динамика событий, неожиданные вводные, ограниченность ресурсов, конфликтующие сообщения и давление времени.",
    sim2: "Это позволяет участникам прочувствовать стресс и нагрузку, которые неизбежны в реальной аварии, и при этом научиться сохранять управляемость, дисциплину решений и контроль команды.",
    outcomesTitle: "По итогам обучения участники:",
    outcomes: [
      { img: "icon-confident.png", title: "Уверенно применяют", desc: "инструменты принятия решений под давлением." },
      { img: "icon-ready.png", title: "Повышают", desc: "общую готовность к ЧС." },
      { img: "icon-reduce.png", title: "Снижают", desc: "риск потерь, простоев и репутационных последствий." },
    ],
    cta: "Оставить заявку",
  },
  en: {
    heroSubtitle: "(Asset Incident Commander – Initial Response)",
    heroRight: "A practical course for managers and emergency management team members. The programme teaches participants how to act in the first critical minutes of a major incident, when the cost of error is unacceptably high and decisions must be made quickly, clearly and on the basis of facts.",
    icsTitle: "Practising incident management\nusing the Incident Command System structure",
    ics: [
      { img: "icon-info.png", title: "Gathering information", desc: "and assessing the situation;" },
      { img: "icon-priority.png", title: "Setting priorities", desc: "and allocating resources;" },
      { img: "icon-comm.png", title: "Managing communications", desc: "and coordinating with emergency services;" },
      { img: "icon-team.png", title: "Site team command, escalation control, and protection of people, equipment and the environment." },
      { img: "icon-method.png", title: "Methodology:", desc: "The course is built on intensive scenarios using clear protocols (SITREP, M/ETHANE and others)." },
    ],
    simTitle: "Simulations as close to reality as possible",
    sim1: "The key feature is dynamic events, unexpected inputs, limited resources, conflicting messages and time pressure.",
    sim2: "This allows participants to experience the stress and pressure that are inevitable in a real incident, while learning to maintain control, decision discipline and team management.",
    outcomesTitle: "After completing the training, participants:",
    outcomes: [
      { img: "icon-confident.png", title: "Confidently apply", desc: "decision-making tools under pressure." },
      { img: "icon-ready.png", title: "Improve", desc: "overall emergency preparedness." },
      { img: "icon-reduce.png", title: "Reduce", desc: "the risk of losses, downtime and reputational consequences." },
    ],
    cta: "Submit Request",
  },
};

export default async function NocnAicirPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = content[locale as 'ru' | 'en'] ?? content.ru;

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/nocn/hero-bg.jpg" alt="РУБЕЖ" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-2xl">
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-1 drop-shadow-lg">РУБЕЖ</h1>
                <p className="text-xl lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md">{t.heroSubtitle}</p>
              </div>
              <p className="hidden lg:block text-[12px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">{t.heroRight}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-10 whitespace-pre-line`}>{t.icsTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {t.ics.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col items-start">
              <img src={`/assets/nocn/${item.img}`} className="h-10 w-auto mb-4 opacity-80 object-contain" alt="" />
              <h3 className={`${TEXT_H3} mb-1`}>{item.title}</h3>
              {item.desc && <p className="text-[11px] text-black/70 leading-relaxed">{item.desc}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.simTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          <div className="lg:col-span-1"><p className={TEXT_BODY}>{t.sim1}</p></div>
          <div className="lg:col-span-1"><p className={TEXT_BODY}>{t.sim2}</p></div>
          <div className="lg:col-span-2 relative h-[140px] md:h-[180px] rounded-[15px] overflow-hidden shadow-sm">
            <Image src="/assets/nocn/simulation-bg.jpg" alt="Simulation" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.outcomesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {t.outcomes.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
              <img src={`/assets/nocn/${item.img}`} className="h-12 w-auto shrink-0 opacity-80 object-contain" alt="" />
              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-black/90 mb-0.5">{item.title}</h4>
                <p className="text-[11px] text-black/60 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center pb-10">
          <Button>{t.cta}</Button>
        </div>
      </section>
    </main>
  );
}
