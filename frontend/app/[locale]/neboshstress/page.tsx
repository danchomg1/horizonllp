import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[15px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroRight: "Курс, который дает руководителям и специалистам инструменты для выявления и устранения источников стресса в рабочей среде, превращая абстрактную проблему в управляемый процесс.",
    pillars: ["Выявить источники стресса", "Снизить его последствия", "Создать здоровую и мотивирующую рабочую среду"],
    pillarsImgs: ["icon-stress-source.png", "icon-stress-reduce.png", "icon-stress-env.png"],
    valueTitle: "Чем полезен этот курс?",
    valueDesc1: "Главная ценность курса в том, что он дает системный подход.",
    valueDesc2: "Вместо абстрактных советов «меньше нервничать», вы получаете инструмент (Risk Assessment), который позволяет выявить, где именно в дизайне работы (в нагрузке, в контроле или в отношениях) есть провал, и устранить его как любой другой производственный риск.",
    audTitle: "Кому подойдет",
    audIntro: "Он предназначен не только для специалистов по охране труда, но и для всех, кто управляет людьми:",
    aud: ["Линейные руководители и менеджеры.", "HR-специалисты.", "Специалисты по охране труда (HSE managers).", "Специалисты по корпоративному здоровью (Occupational health)."],
    progTitle: "Программа обучения",
    progIntro: "Курс компактный, обычно длится 1 день (около 7 часов обучения) и состоит из трех основных модулей:",
    modules: [
      {
        img: "icon-module-1.png", num: "Модуль 1:", title: "Ключевые принципы (Key Principles)",
        items: ["Разница между понятиями «стресс», «давление» и «психическое заболевание».", "Статистика: распространенность стресса и финансовые потери бизнеса.", "Признаки стресса у сотрудников.", "Юридические обязанности работодателя по управлению стрессом."],
      },
      {
        img: "icon-module-2.png", num: "Модуль 2:", title: "Идентификация рисков (Identification of Risk)",
        intro: "Это ядро курса. Здесь изучают HSE Management Standards — 6 ключевых областей работы, которые, если ими не управлять, приводят к стрессу:",
        standards: [
          { key: "Demands (Требования):", val: "Объем работы, дедлайны, условия труда." },
          { key: "Control (Контроль):", val: "Насколько сотрудник может влиять на выполнение работы." },
          { key: "Support (Поддержка):", val: "Поощрение и ресурсы от руководства и коллег." },
          { key: "Relationships (Отношения):", val: "Конфликты, буллинг, харассмент." },
          { key: "Role (Роль):", val: "Понимает ли сотрудник свои обязанности в структуре." },
          { key: "Change (Изменения):", val: "Как организация сообщает об изменениях." },
        ],
      },
      {
        img: "icon-module-3.png", num: "Модуль 3:", title: "Внедрение мер (Implementing Interventions)",
        items: ["Как применять подход HSE к оценке рисков стресса.", "Разработка конкретных вмешательств для снижения уровня стресса.", "Как постоянно улучшать рабочую среду."],
      },
    ],
    formatTitle: "Формат курса",
    dur: "1 день обучения",
    test: "+ Тест по рабочему сценарию",
    cta: "Оставить заявку",
  },
  en: {
    heroRight: "A course that equips managers and specialists with tools to identify and address sources of workplace stress, turning an abstract problem into a manageable process.",
    pillars: ["Identify sources of stress", "Reduce its consequences", "Create a healthy and motivating work environment"],
    pillarsImgs: ["icon-stress-source.png", "icon-stress-reduce.png", "icon-stress-env.png"],
    valueTitle: "What is the value of this course?",
    valueDesc1: "The main value of the course is that it provides a systematic approach.",
    valueDesc2: "Instead of abstract advice to 'worry less', you receive a tool (Risk Assessment) that allows you to identify exactly where in the design of work (in demands, control or relationships) there is a gap, and address it just like any other occupational hazard.",
    audTitle: "Who is it for?",
    audIntro: "It is designed not only for health and safety specialists, but for everyone who manages people:",
    aud: ["Line managers and supervisors.", "HR professionals.", "HSE managers.", "Occupational health specialists."],
    progTitle: "Training Programme",
    progIntro: "The course is compact, typically lasting 1 day (approximately 7 hours of training) and comprises three core modules:",
    modules: [
      {
        img: "icon-module-1.png", num: "Module 1:", title: "Key Principles",
        items: ["The difference between 'stress', 'pressure' and 'mental illness'.", "Statistics: prevalence of stress and financial losses to business.", "Signs of stress in employees.", "Legal duties of employers in managing stress."],
      },
      {
        img: "icon-module-2.png", num: "Module 2:", title: "Identification of Risk",
        intro: "This is the core of the course. Here you study the HSE Management Standards — 6 key areas of work which, if not managed, lead to stress:",
        standards: [
          { key: "Demands:", val: "Workload, deadlines, working conditions." },
          { key: "Control:", val: "How much the employee can influence how they do their work." },
          { key: "Support:", val: "Encouragement and resources from management and colleagues." },
          { key: "Relationships:", val: "Conflicts, bullying, harassment." },
          { key: "Role:", val: "Whether the employee understands their responsibilities within the structure." },
          { key: "Change:", val: "How the organisation communicates changes." },
        ],
      },
      {
        img: "icon-module-3.png", num: "Module 3:", title: "Implementing Interventions",
        items: ["How to apply the HSE approach to stress risk assessment.", "Developing specific interventions to reduce stress levels.", "How to continually improve the working environment."],
      },
    ],
    formatTitle: "Course Format",
    dur: "1 day of training",
    test: "+ Workplace scenario test",
    cta: "Submit Request",
  },
};

export default async function NeboshStressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = content[locale as 'ru' | 'en'] ?? content.ru;

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/nebosh-stress/hero-bg.jpg" alt="NEBOSH Managing Stress" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh-stress/hse-logo.png" alt="NEBOSH" width={120} height={50} className="object-contain" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <p className="text-lg lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">NEBOSH</p>
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">Certificate in Managing Stress at Work</h1>
              </div>
              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">{t.heroRight}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-16 px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 lg:gap-20">
          {t.pillars.map((pillar, i) => (
            <div key={i} className="flex flex-col items-center text-center max-w-[250px]">
              {i > 0 && <div className="hidden md:block w-[1px] h-16 bg-black/10 absolute"></div>}
              <img src={`/assets/nebosh-stress/${t.pillarsImgs[i]}`} className="h-[50px] w-auto opacity-80 object-contain mb-4" alt="" />
              <p className="text-[14px] font-bold text-black/90 leading-snug">{pillar}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/2 bg-white border border-[#0B0073]/20 shadow-sm rounded-[15px] p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#0B0073]"></div>
            <h2 className={`${TEXT_H2} mb-4 text-[#0B0073]`}>{t.valueTitle}</h2>
            <p className="text-[14px] font-normal text-black/80 leading-relaxed mb-4"><b>{t.valueDesc1}</b></p>
            <p className="text-[14px] font-normal text-black/80 leading-relaxed">{t.valueDesc2}</p>
          </div>
          <div className="w-full lg:w-1/2 pt-4">
            <div className="flex items-center gap-4 mb-6">
              <img src="/assets/nebosh-stress/icon-audience.png" className="w-10 h-10 opacity-80 object-contain" alt="" />
              <h2 className={TEXT_H2}>{t.audTitle}</h2>
            </div>
            <p className={`${TEXT_BODY} mb-6`}>{t.audIntro}</p>
            <ul className="space-y-4 pl-2">
              {t.aud.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                  <span className="text-[14px] font-medium text-black/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>{t.progTitle}</h2>
        <p className={`${TEXT_BODY} mb-8 max-w-2xl`}>{t.progIntro}</p>
        <div className="flex flex-col gap-6">
          {t.modules.map((mod, i) => (
            <div key={i} className="bg-transparent border border-black/20 rounded-[15px] p-8 flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow">
              <div className="w-full md:w-1/4 flex flex-col items-start shrink-0">
                <img src={`/assets/nebosh-stress/${mod.img}`} className="h-[50px] w-auto opacity-80 object-contain mb-4" alt="" />
                <h3 className={`${TEXT_H3} text-[#0B0073]`}>{mod.num}</h3>
                <p className="text-[14px] font-bold text-black/90">{mod.title}</p>
              </div>
              <div className="w-full md:w-3/4">
                {mod.items && (
                  <ul className="space-y-3">
                    {mod.items.map((item, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <span className="text-[#0B0073] font-bold mt-0.5">•</span>
                        <span className={TEXT_BODY}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {mod.intro && (
                  <>
                    <p className="text-[13px] font-medium text-black/80 mb-4 bg-black/5 p-3 rounded-lg">{mod.intro}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      {mod.standards!.map((s, j) => (
                        <div key={j} className="flex gap-2 items-start">
                          <span className="text-[#0B0073] font-bold mt-0.5">•</span>
                          <span className={TEXT_BODY}><b>{s.key}</b> {s.val}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.formatTitle}</h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 border-l-4 border-[#0B0073] pl-6 py-2">
          <div className="flex items-center gap-4">
            <img src="/assets/nebosh-stress/icon-format-time.png" className="h-[40px] w-auto opacity-80 object-contain shrink-0" alt="" />
            <h3 className="text-[16px] font-bold text-black/90">{t.dur}</h3>
          </div>
          <div className="hidden sm:block w-[1px] h-10 bg-black/20"></div>
          <div className="flex items-center gap-4">
            <img src="/assets/nebosh-stress/icon-format-test.png" className="h-[40px] w-auto opacity-80 object-contain shrink-0" alt="" />
            <h3 className="text-[16px] font-bold text-black/90">{t.test}</h3>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex justify-center"><Button>{t.cta}</Button></div>
      </section>
    </main>
  );
}
