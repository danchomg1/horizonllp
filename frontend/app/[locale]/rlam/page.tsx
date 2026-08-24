import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";
import { pick } from '../../lib/locale';

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[14px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroTitle: "Руководитель ликвидации аварии на месте (РЛАМ)",
    heroSubtitle: "Практический курс подготовки руководителей аварийного реагирования на месте происшествия",
    intro: [
      "Авария — это всегда хаос, неопределенность, дефицит времени и огромный риск. От того, как действует руководитель на месте в первые минуты, зависят жизни людей и масштаб последствий.",
      "Курс «Руководитель ликвидации аварии на месте (РЛАМ)» разработан на основе лучших международных практик (UK Fire & Rescue, Incident Command System, OPITO) для подготовки специалистов к управлению аварийными ситуациями.",
      "Это не просто лекции о том, «как надо», это интенсивный тренинг, где участники погружаются в реалистичные сценарии аварий, принимают сложные решения под давлением и несут ответственность за результат.",
    ],
    audTitle: "Кому предназначен курс",
    audNote: "Особо актуален для предприятий нефтегазовой, нефтехимической, энергетической и горнодобывающей отраслей:",
    aud: [
      { img: "icon-shift.png", text: "Руководители дежурных смен (ДСС/РЛАМ)" },
      { img: "icon-chief.png", text: "Начальники цехов" },
      { img: "icon-operator.png", text: "Операторы установок" },
      { img: "icon-engineer.png", text: "Инженеры по выработке" },
      { img: "icon-manager.png", text: "Руководители производственных участков" },
      { img: "icon-hse.png", text: "Специалисты по ПБ, ОТ и экологии" },
      { img: "icon-rescue.png", text: "Сотрудники аварийно-спасательных формирований" },
    ],
    learnTitle: "Чему учит курс",
    learnNote: "В ходе обучения участники осваивают алгоритмы действий по следующим направлениям:",
    learn: [
      { img: "icon-awareness.png", title: "Ситуационная осведомленность", desc: "Быстрая оценка обстановки, распознавание критических факторов." },
      { img: "icon-decision.png", title: "Принятие решений под давлением", desc: "Применение структурированных алгоритмов (например, FOR-DEC, DECIDE) в условиях стресса." },
      { img: "icon-fcp.png", title: "Организация «Островка безопасности» (FCP)", desc: "Выбор безопасного места, развертывание поста управления (Forward Command Post)." },
      { img: "icon-resources.png", title: "Управление ресурсами", desc: "Расстановка приоритетов, постановка задач, контроль за их выполнением." },
      { img: "icon-escalation.png", title: "Контроль эскалации и локализация", desc: "Принятие мер по недопущению развития аварии, защита критических зон." },
      { img: "icon-communication.png", title: "Коммуникация и доклад штабам", desc: "Передача четкой, структурированной информации (SITREP, METHANE)." },
      { img: "icon-team.png", title: "Командная работа и лидерство", desc: "Работа с паникой, создание эффективной команды реагирования на месте." },
      { img: "icon-handover.png", title: "Передача полномочий", desc: "Корректная и полная передача управления прибывшим профессиональным спасателям." },
    ],
    formatTitle: "Формат обучения",
    formatDur: "Продолжительность: 3 дня",
    day12: {
      img: "icon-theory.png", title: "День 1-2 — теория и настольная подготовка",
      items: ["Роль и ответственность руководителя на месте.", "Законодательство и локальные процедуры.", "Психология поведения людей в условиях ЧС.", "Организация связи и взаимодействия (доклад SITREP).", "Инструменты оценки рисков на месте (Dynamic Risk Assessment)."],
      note: "Отработка вводных на 3D-макетах и планах, самостоятельное принятие решений и управление ситуацией.",
    },
    day3: {
      img: "icon-practice.png", title: "День 3 — практические сценарии",
      desc: "Практика на полигоне с использованием реального оборудования, огня, задымления и имитации утечек опасных веществ.",
      scenTitle: "Сценарии включают:",
      scen: ["Пожар на технологической установке;", "Утечка токсичного газа с пострадавшими;", "Разлив химически опасного вещества."],
      taskTitle: "Задачи командира в сценариях:",
      tasks: ["провести оценку обстановки;", "запросить помощь и организовать эвакуацию;", "поставить задачи команде и передать управление."],
    },
    methodTitle: "Уникальная методология Horizon",
    methodDesc: "Курс использует подход Training Under Stress (тренировка в условиях стресса) — это важнейшее условие для формирования автоматизма действий в критических ситуациях.",
    methodSimTitle: "Имитируются:",
    methodSim: ["дефицит и противоречивость информации;", "фактор времени и внезапные изменения ситуации (эскалация);", "ошибки или паника членов команды;", "шум, плохая видимость и другие отвлекающие факторы."],
    methodNote: "Это позволяет прочувствовать реальную нагрузку и научиться с ней справляться.",
    assessTitle: "Оценка компетентности",
    assessDesc: "По итогам курса проводится комплексная оценка знаний и навыков.",
    assessTheoTitle: "Теоретический тест:",
    assessTheo: ["основы ICS;", "оценка рисков;", "коммуникационные протоколы;", "понимание процедур эвакуации."],
    assessPractTitle: "Практический экзамен:",
    assessPract: ["самостоятельное руководство командой в смоделированной ЧС;", "способность принимать верные решения под стрессом;", "корректная передача информации и управления."],
    assessNote: "Каждый участник получает индивидуальный фидбек и рекомендации.",
    partTitle: "Что получают участники",
    partSkills: "Международно признанные навыки:",
    part: ["уверенность в своих действиях при реальной ЧС;", "статус руководителя аварийной бригады (РЛАМ);", "сертификат об успешном обучении."],
    compTitle: "Результат для компании",
    compLead: "Готовый командир на месте происшествия, который способен:",
    comp: ["быстро взять ситуацию под контроль и не допустить эскалации (увеличения масштаба последствий);", "снизить риск травматизма среди персонала;", "минимизировать финансовые и экологические потери, а также репутационный ущерб."],
    compNote: "Это прямая инвестиция в безопасность предприятия и снижение материальных последствий при авариях.",
    cta: "Оставить заявку",
  },
  en: {
    heroTitle: "On-site Emergency Commander (RLAM)",
    heroSubtitle: "A practical training course for on-site emergency response commanders",
    intro: [
      "An emergency is always chaos, uncertainty, time pressure and enormous risk. The lives of people and the scale of consequences depend on how the on-site commander acts in the first minutes.",
      "The On-site Emergency Commander (RLAM) course has been developed on the basis of best international practices (UK Fire & Rescue, Incident Command System, OPITO) to prepare specialists for managing emergency situations.",
      "This is not simply lectures about 'what to do' — it is an intensive training programme where participants are immersed in realistic emergency scenarios, make complex decisions under pressure and bear responsibility for the outcome.",
    ],
    audTitle: "Who the course is for",
    audNote: "Particularly relevant for enterprises in the oil & gas, petrochemical, energy and mining sectors:",
    aud: [
      { img: "icon-shift.png", text: "Duty shift supervisors (DSS / RLAM)" },
      { img: "icon-chief.png", text: "Workshop / unit managers" },
      { img: "icon-operator.png", text: "Plant operators" },
      { img: "icon-engineer.png", text: "Production engineers" },
      { img: "icon-manager.png", text: "Production section managers" },
      { img: "icon-hse.png", text: "Industrial safety, OHS and environmental specialists" },
      { img: "icon-rescue.png", text: "Emergency response team members" },
    ],
    learnTitle: "What the course teaches",
    learnNote: "During training participants master response algorithms in the following areas:",
    learn: [
      { img: "icon-awareness.png", title: "Situational awareness", desc: "Rapid assessment of the situation, recognising critical factors." },
      { img: "icon-decision.png", title: "Decision-making under pressure", desc: "Applying structured decision algorithms (e.g. FOR-DEC, DECIDE) under stress." },
      { img: "icon-fcp.png", title: "Establishing a Forward Command Post (FCP)", desc: "Selecting a safe location, deploying the Forward Command Post." },
      { img: "icon-resources.png", title: "Resource management", desc: "Setting priorities, assigning tasks, monitoring their completion." },
      { img: "icon-escalation.png", title: "Escalation control and containment", desc: "Taking measures to prevent the incident from developing, protecting critical zones." },
      { img: "icon-communication.png", title: "Communication and reporting to command", desc: "Delivering clear, structured information (SITREP, METHANE)." },
      { img: "icon-team.png", title: "Teamwork and leadership", desc: "Managing panic, building an effective on-site response team." },
      { img: "icon-handover.png", title: "Handover of command", desc: "Correct and complete transfer of command to arriving professional responders." },
    ],
    formatTitle: "Training format",
    formatDur: "Duration: 3 days",
    day12: {
      img: "icon-theory.png", title: "Days 1–2 — theory and tabletop preparation",
      items: ["Role and responsibilities of the on-site commander.", "Legislation and local procedures.", "Psychology of human behaviour in emergencies.", "Communication and coordination (SITREP reporting).", "On-site risk assessment tools (Dynamic Risk Assessment)."],
      note: "Practising inputs on 3D models and plans, independent decision-making and situation management.",
    },
    day3: {
      img: "icon-practice.png", title: "Day 3 — practical scenarios",
      desc: "Field exercises using real equipment, fire, smoke and simulated hazardous substance leaks.",
      scenTitle: "Scenarios include:",
      scen: ["Fire at a process plant;", "Toxic gas leak with casualties;", "Hazardous chemical spill."],
      taskTitle: "Commander's tasks in scenarios:",
      tasks: ["conduct a situation assessment;", "call for assistance and organise evacuation;", "assign tasks to the team and hand over command."],
    },
    methodTitle: "Horizon's unique methodology",
    methodDesc: "The course uses a Training Under Stress approach — the most important condition for building automatic responses in critical situations.",
    methodSimTitle: "Simulated conditions include:",
    methodSim: ["information scarcity and conflicting information;", "time pressure and sudden changes in situation (escalation);", "errors or panic among team members;", "noise, poor visibility and other distracting factors."],
    methodNote: "This enables participants to experience real-world pressure and learn to manage it.",
    assessTitle: "Competence assessment",
    assessDesc: "At the end of the course a comprehensive knowledge and skills assessment is conducted.",
    assessTheoTitle: "Theory test:",
    assessTheo: ["ICS fundamentals;", "risk assessment;", "communication protocols;", "understanding of evacuation procedures."],
    assessPractTitle: "Practical examination:",
    assessPract: ["independently commanding a team in a simulated emergency;", "ability to make correct decisions under stress;", "correct transfer of information and command."],
    assessNote: "Each participant receives individual feedback and recommendations.",
    partTitle: "What participants receive",
    partSkills: "Internationally recognised skills:",
    part: ["confidence in their actions during a real emergency;", "status of on-site emergency commander (RLAM);", "certificate of successful completion."],
    compTitle: "Result for the organisation",
    compLead: "A ready on-site commander capable of:",
    comp: ["quickly taking control of the situation and preventing escalation;", "reducing the risk of personnel injuries;", "minimising financial and environmental losses as well as reputational damage."],
    compNote: "This is a direct investment in enterprise safety and reduction of material consequences in emergencies.",
    cta: "Submit Request",
  },
};

export default async function RlamCoursePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pick(content, locale);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/rlam/hero-bg.jpg" alt="RLAM" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
              <Image src="/assets/rlam/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            <div className="flex flex-col max-w-4xl gap-2">
              <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] drop-shadow-lg">{t.heroTitle}</h1>
              <p className="text-lg lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md">{t.heroSubtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-16 px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            {t.intro.map((p, i) => <p key={i} className={TEXT_BODY}>{p}</p>)}
          </div>
          <div className="w-full lg:w-1/3 relative h-[200px] lg:h-auto rounded-[15px] overflow-hidden shadow-sm">
            <Image src="/assets/rlam/alarm-bg.jpg" alt="Alarm" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-2`}>{t.audTitle}</h2>
        <p className="text-[13px] font-medium text-black/70 mb-8">{t.audNote}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {t.aud.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/30 rounded-[15px] p-5 hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <img src={`/assets/rlam/${item.img}`} className="h-[60px] w-auto mb-4 opacity-80 object-contain" alt="" />
              <p className="text-[11px] font-bold text-black/90 leading-tight">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-2`}>{t.learnTitle}</h2>
        <p className="text-[13px] font-medium text-black/70 mb-8">{t.learnNote}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.learn.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/30 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col items-start">
              <img src={`/assets/rlam/${item.img}`} className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="" />
              <h3 className={`${TEXT_H3} mb-2`}>{item.title}</h3>
              <p className="text-[11px] text-black/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-2`}>{t.formatTitle}</h2>
        <p className="text-[13px] font-bold text-black/80 mb-8">{t.formatDur}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col">
            <img src={`/assets/rlam/${t.day12.img}`} className="h-[72px] w-auto mb-6 opacity-80 object-contain" alt="" />
            <h3 className={`${TEXT_H3} mb-4`}>{t.day12.title}</h3>
            <ul className="space-y-2 mb-4">
              {t.day12.items.map((item, i) => (
                <li key={i} className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> {item}</li>
              ))}
            </ul>
            <p className="text-[12px] font-bold text-black/90">{t.day12.note}</p>
          </div>
          <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col">
            <img src={`/assets/rlam/${t.day3.img}`} className="h-[72px] w-auto mb-6 opacity-80 object-contain" alt="" />
            <h3 className={`${TEXT_H3} mb-4`}>{t.day3.title}</h3>
            <p className="text-[12px] text-black/80 mb-3">{t.day3.desc}</p>
            <p className="text-[12px] font-bold text-black/90 mb-2">{t.day3.scenTitle}</p>
            <ul className="space-y-1 mb-4">
              {t.day3.scen.map((item, i) => (
                <li key={i} className="text-[12px] text-black/80 pl-3 border-l-2 border-[#0B0073]/30">{item}</li>
              ))}
            </ul>
            <p className="text-[12px] font-bold text-black/90 mb-2">{t.day3.taskTitle}</p>
            <ul className="space-y-1">
              {t.day3.tasks.map((item, i) => (
                <li key={i} className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className={`${TEXT_H2} text-center`}>{t.methodTitle}</h2>
        </div>
        <div className="bg-transparent border border-black/20 rounded-[15px] p-8 lg:p-10 flex flex-col lg:flex-row gap-10 items-center">
          <div className="w-full lg:w-1/3 flex justify-center border-b lg:border-b-0 lg:border-r border-black/10 pb-8 lg:pb-0 lg:pr-8">
            <img src="/assets/rlam/horizon-logo-dark.png" alt="Horizon Logo" className="w-[160px] object-contain opacity-90" />
          </div>
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <p className={TEXT_BODY}>{t.methodDesc}</p>
            <p className="text-[13px] font-bold text-black/90 mt-2">{t.methodSimTitle}</p>
            <ul className="space-y-1.5">
              {t.methodSim.map((item, i) => (
                <li key={i} className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> {item}</li>
              ))}
            </ul>
            <p className="text-[12px] font-medium text-black/70 italic mt-2">{t.methodNote}</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow">
            <img src="/assets/rlam/icon-assessment.png" className="h-[72px] w-auto mb-6 opacity-80 object-contain" alt="" />
            <h3 className={`${TEXT_H3} mb-4`}>{t.assessTitle}</h3>
            <p className="text-[12px] text-black/80 mb-4">{t.assessDesc}</p>
            <p className="text-[12px] font-bold text-black/90 mb-2">{t.assessTheoTitle}</p>
            <ul className="space-y-1 mb-4">
              {t.assessTheo.map((item, i) => (
                <li key={i} className="text-[12px] text-black/80 pl-3 border-l-2 border-[#0B0073]/30">{item}</li>
              ))}
            </ul>
            <p className="text-[12px] font-bold text-black/90 mb-2">{t.assessPractTitle}</p>
            <ul className="space-y-1 mb-4">
              {t.assessPract.map((item, i) => (
                <li key={i} className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> {item}</li>
              ))}
            </ul>
            <p className="text-[12px] font-bold text-[#0B0073]">{t.assessNote}</p>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex gap-6 items-start flex-1">
              <img src="/assets/rlam/icon-outcomes.png" className="h-[60px] w-auto opacity-80 object-contain shrink-0" alt="" />
              <div>
                <h3 className={`${TEXT_H3} mb-3`}>{t.partTitle}</h3>
                <p className="text-[12px] font-bold text-black/90 mb-2">{t.partSkills}</p>
                <ul className="space-y-1">
                  {t.part.map((item, i) => (
                    <li key={i} className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex gap-6 items-start flex-1">
              <img src="/assets/rlam/icon-company.png" className="h-[60px] w-auto opacity-80 object-contain shrink-0" alt="" />
              <div>
                <h3 className={`${TEXT_H3} mb-3`}>{t.compTitle}</h3>
                <p className="text-[12px] font-bold text-black/90 mb-2">{t.compLead}</p>
                <ul className="space-y-1 mb-4">
                  {t.comp.map((item, i) => (
                    <li key={i} className="text-[12px] text-black/80 flex items-start gap-2"><span className="text-[#0B0073] mt-0.5">•</span> {item}</li>
                  ))}
                </ul>
                <p className="text-[11px] font-medium text-black/70 italic">{t.compNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4">
        <div className="flex justify-center pb-10">
          <Button>{t.cta}</Button>
        </div>
      </section>
    </main>
  );
}
