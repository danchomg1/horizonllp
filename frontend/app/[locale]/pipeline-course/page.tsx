import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[14px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroTitle: "Ликвидация аварий на трубопроводах",
    heroSubtitle: "Практическая подготовка аварийно-спасательных служб",
    descTitle: "Интенсивный практический курс\nпо локализации и устранению аварий на трубопроводах",
    desc: [
      "Аварии на трубопроводах несут огромные риски: утечки опасных веществ, пожары, экологический ущерб и остановка производства. От скорости и правильности действий первых прибывших подразделений зависят жизни людей и масштабы последствий.",
      "Курс готовит участников к действиям в условиях реальной аварии, используя реалистичные тренажеры-симуляторы трубопроводов под давлением.",
      "Программа включает отработку координации внутри команды, выбор правильных методов изоляции и ремонта, а также использование специализированного оборудования.",
    ],
    audTitle: "Для кого предназначен курс",
    aud: [
      { img: "icon-rescue.png", text: "Аварийно-спасательные службы предприятий" },
      { img: "icon-fire.png", text: "Пожарные и газоспасательные подразделения" },
      { img: "icon-repair.png", text: "Работники аварийно-ремонтных бригад" },
      { img: "icon-operator.png", text: "Операторы технологических установок" },
      { img: "icon-hse.png", text: "Специалисты по промышленной безопасности и ОТ" },
      { img: "icon-staff.png", text: "Сотрудники нештатных аварийно-спасательных формирований" },
    ],
    objTitle: "Цели обучения",
    objLead: "В ходе курса участники получают практические навыки:",
    obj: [
      "Оценка обстановки и разведка места аварии.",
      "Выбор и применение соответствующих средств индивидуальной защиты.",
      "Изоляция аварийного участка трубопровода.",
      "Установка бандажей, хомутов и заглушек под давлением.",
      "Контроль качества выполненных ремонтных работ.",
    ],
    formatTitle: "Формат обучения",
    formatInfo: [
      { label: "Продолжительность:", val: "2-3 дня (в зависимости от уровня подготовки)." },
      { label: "Формат:", val: "30% теории / 70% практики на полигоне." },
      { label: "Оценка:", val: "Практический экзамен по сценариям." },
    ],
    formatCards: [
      { img: "icon-theory.png", text: "Интерактивная теория" },
      { img: "icon-demo.png", text: "Демонстрация оборудования" },
      { img: "icon-practice.png", text: "Практика на тренажерах" },
      { img: "icon-exam.png", text: "Итоговые тренировки" },
    ],
    topicsTitle: "Основные темы курса",
    topics: [
      { img: "icon-danger.png", title: "Опасности при авариях на трубопроводах", items: ["Свойства опасных веществ.", "Физика процессов истечения газов и жидкостей.", "Зоны загазованности и пожаров.", "Факторы риска для персонала."] },
      { img: "icon-ppe.png", title: "Средства индивидуальной защиты и ВДА", items: ["Выбор средств защиты органов дыхания (ВДА) и кожи.", "Правила надевания и проверки.", "Контроль времени работы в аппарате."] },
      { img: "icon-equip.png", title: "Специализированное оборудование", intro: "Оборудование для локализации утечек:", items: ["пневматические бандажи и пластыри;", "механические хомуты и струбцины;", "герметизирующие пасты и ленты.", "Искробезопасный инструмент."] },
    ],
    scenTitle: "Практические сценарии",
    scenLead: "Во второй день курса участники выполняют реалистичные сценарии тренировок:",
    scenarios: [
      { img: "icon-gas.png", title: "Утечка газа на надземном трубопроводе", desc: "— локализация пневматическим бандажом;\n— организация рабочей зоны." },
      { img: "icon-oil.png", title: "Разрыв нефтепровода с проливом продукта", desc: "— установка бандажа;\n— применение сорбентов и сбор продукта." },
      { img: "icon-flange.png", title: "Течь во фланцевом соединении под давлением", desc: "— установка специального кожуха;\n— контроль давления и герметичности." },
    ],
    skillsTitle: "Какие навыки получат участники",
    skillsLead: "По итогам курса участники смогут:",
    skills: ["быстро оценивать ситуацию при авариях на трубопроводах;", "выбирать методы локализации;", "безопасно работать в ВДА;", "слаженно действовать в команде."],
    resultTitle: "Результат для предприятия",
    resultLead: "После прохождения курса персонал предприятия сможет:",
    result: ["сократить время реагирования на аварии;", "минимизировать ущерб от утечек;", "повысить безопасность проведения ремонтных работ."],
    cta: "Оставить заявку",
  },
  en: {
    heroTitle: "Pipeline Emergency Response",
    heroSubtitle: "Practical training for emergency response teams",
    descTitle: "An intensive practical course\nin pipeline leak containment and emergency response",
    desc: [
      "Pipeline accidents pose enormous risks: hazardous substance leaks, fires, environmental damage and production stoppages. The lives of people and the scale of consequences depend on the speed and correctness of the first responding teams.",
      "The course prepares participants for actions in a real emergency, using realistic pressurised pipeline training simulators.",
      "The programme includes team coordination drills, selecting the correct isolation and repair methods, and using specialised equipment.",
    ],
    audTitle: "Who the course is for",
    aud: [
      { img: "icon-rescue.png", text: "Enterprise emergency response teams" },
      { img: "icon-fire.png", text: "Fire and gas rescue units" },
      { img: "icon-repair.png", text: "Emergency repair crew members" },
      { img: "icon-operator.png", text: "Process plant operators" },
      { img: "icon-hse.png", text: "Industrial safety and occupational health specialists" },
      { img: "icon-staff.png", text: "Non-professional emergency response team members" },
    ],
    objTitle: "Training objectives",
    objLead: "During the course participants develop practical skills in:",
    obj: [
      "Assessing the situation and reconnaissance of the incident site.",
      "Selecting and using appropriate personal protective equipment.",
      "Isolating the damaged pipeline section.",
      "Installing clamps, wraps and plugs under pressure.",
      "Quality control of completed repair work.",
    ],
    formatTitle: "Training format",
    formatInfo: [
      { label: "Duration:", val: "2–3 days (depending on participants' level of preparation)." },
      { label: "Format:", val: "30% theory / 70% practical work on the training ground." },
      { label: "Assessment:", val: "Practical scenario-based examination." },
    ],
    formatCards: [
      { img: "icon-theory.png", text: "Interactive theory" },
      { img: "icon-demo.png", text: "Equipment demonstration" },
      { img: "icon-practice.png", text: "Simulator practice" },
      { img: "icon-exam.png", text: "Final exercises" },
    ],
    topicsTitle: "Key course topics",
    topics: [
      { img: "icon-danger.png", title: "Hazards in pipeline emergencies", items: ["Properties of hazardous substances.", "Physics of gas and liquid discharge processes.", "Gas cloud and fire zones.", "Risk factors for personnel."] },
      { img: "icon-ppe.png", title: "Personal protective equipment and breathing apparatus", items: ["Selecting respiratory and skin protection.", "Donning and inspection procedures.", "Monitoring time in breathing apparatus."] },
      { img: "icon-equip.png", title: "Specialised equipment", intro: "Equipment for leak containment:", items: ["pneumatic clamps and patches;", "mechanical clamps and grips;", "sealing compounds and tapes.", "Intrinsically safe tools."] },
    ],
    scenTitle: "Practical scenarios",
    scenLead: "On the second day of the course participants complete realistic training scenarios:",
    scenarios: [
      { img: "icon-gas.png", title: "Gas leak on an above-ground pipeline", desc: "— containment using a pneumatic clamp;\n— setting up the work zone." },
      { img: "icon-oil.png", title: "Oil pipeline rupture with product spill", desc: "— installing a clamp;\n— using absorbents and collecting the product." },
      { img: "icon-flange.png", title: "Leak at a flanged joint under pressure", desc: "— fitting a special enclosure;\n— pressure monitoring and leak-tightness verification." },
    ],
    skillsTitle: "Skills participants will gain",
    skillsLead: "On completing the course participants will be able to:",
    skills: ["rapidly assess the situation in pipeline emergencies;", "select containment methods;", "work safely in breathing apparatus;", "operate effectively as a team."],
    resultTitle: "Result for the organisation",
    resultLead: "After completing the course, the organisation's personnel will be able to:",
    result: ["reduce emergency response times;", "minimise damage from leaks;", "improve the safety of repair operations."],
    cta: "Submit Request",
  },
};

export default async function PipelineCoursePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = content[locale as 'ru' | 'en'] ?? content.ru;

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/pipeline/hero-bg.jpg" alt="Pipeline Emergency" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
              <Image src="/assets/pipeline/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            <div className="flex flex-col max-w-3xl gap-2">
              <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] drop-shadow-lg">{t.heroTitle}</h1>
              <p className="text-lg lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md">{t.heroSubtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8 whitespace-pre-line`}>{t.descTitle}</h2>
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.desc.map((p, i) => <p key={i} className={TEXT_BODY}>{p}</p>)}
          </div>
          <div className="w-full lg:w-1/3 relative h-[180px] lg:h-auto rounded-[15px] overflow-hidden shadow-sm">
            <Image src="/assets/pipeline/alarm-bg.jpg" alt="Alarm" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.audTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.aud.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-5 hover:shadow-md transition-shadow flex flex-col items-start">
              <img src={`/assets/pipeline/${item.img}`} className="h-12 w-auto mb-4 opacity-80 object-contain" alt="" />
              <p className="text-[11px] font-bold text-black/90 leading-tight">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-2`}>{t.objTitle}</h2>
        <p className="text-[14px] font-medium text-black/80 mb-6">{t.objLead}</p>
        <ul className="space-y-3 max-w-4xl">
          {t.obj.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
              <span className={TEXT_BODY}>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.formatTitle}</h2>
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {t.formatInfo.map((item, i) => (
              <p key={i} className={TEXT_BODY}><b>{item.label}</b> {item.val}</p>
            ))}
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.formatCards.map((item, i) => (
              <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow aspect-square">
                <img src={`/assets/pipeline/${item.img}`} className="h-12 w-auto mb-3 opacity-80 object-contain" alt="" />
                <p className="text-[10px] font-bold text-black/90 leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.topicsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.topics.map((topic, i) => (
            <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start">
              <img src={`/assets/pipeline/${topic.img}`} className="h-18 w-auto mb-6 opacity-80 object-contain" alt="" />
              <h3 className={`${TEXT_H3} mb-4`}>{topic.title}</h3>
              {topic.intro && <p className="text-[11px] text-black/70 leading-relaxed mb-2">{topic.intro}</p>}
              <ul className="space-y-2">
                {topic.items.map((item, j) => (
                  <li key={j} className="text-[11px] text-black/70 leading-relaxed">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-2`}>{t.scenTitle}</h2>
        <p className="text-[13px] text-black/80 mb-8">{t.scenLead}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.scenarios.map((scen, i) => (
            <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-6 hover:shadow-md transition-shadow">
              <h4 className="text-[16px] font-bold text-black/90 mb-4">{locale === 'ru' ? `Сценарий ${i + 1}` : `Scenario ${i + 1}`}</h4>
              <div className="w-full h-[120px] bg-transparent flex items-center justify-center mb-4">
                <img src={`/assets/pipeline/${scen.img}`} className="h-24 opacity-80 object-contain" alt="" />
              </div>
              <h3 className={`${TEXT_H3} mb-2`}>{scen.title}</h3>
              <p className="text-[11px] text-black/70 leading-relaxed whitespace-pre-line">{scen.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4 mb-16">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <h2 className={`${TEXT_H2} mb-4`}>{t.skillsTitle}</h2>
            <p className="text-[13px] text-black/80 font-medium mb-4">{t.skillsLead}</p>
            <ul className="space-y-2">
              {t.skills.map((item, i) => (
                <li key={i} className="text-[12px] text-black/70 flex items-start gap-2">
                  <span className="text-[#0B0073] mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className={`${TEXT_H2} mb-4`}>{t.resultTitle}</h2>
            <p className="text-[13px] text-black/80 font-medium mb-4">{t.resultLead}</p>
            <ul className="space-y-2">
              {t.result.map((item, i) => (
                <li key={i} className="text-[12px] text-black/70 flex items-start gap-2">
                  <span className="text-[#0B0073] mt-0.5">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex justify-center"><Button>{t.cta}</Button></div>
      </section>
    </main>
  );
}
