import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";
import { pick } from '../../lib/locale';

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[15px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroSubtitle: "Квалификация NEBOSH HSE по обеспечению благополучия на работе",
    heroRight: "Курс переводит понятие «благополучие» (wellbeing) из абстрактной идеи в набор конкретных инструментов для менеджеров и HR.",
    intro: "Это вводная однодневная квалификация, направленная на создание здоровой рабочей атмосферы. В основе курса лежит модель «Дерево благополучия NEBOSH» (NEBOSH Wellbeing Tree), которая охватывает 6 ключевых сфер влияния на состояние человека.",
    audTitle: "Для кого этот курс?",
    aud: [
      { img: "icon-aud-hr.png", title: "HR-специалисты:", desc: "Для внедрения стратегий удержания персонала и снижения выгорания." },
      { img: "icon-aud-hse.png", title: "Специалисты по охране труда (HSE):", desc: "Чтобы расширить экспертизу за пределы физической безопасности." },
      { img: "icon-aud-managers.png", title: "Линейные руководители и менеджеры:", desc: "Чтобы научиться поддерживать свои команды." },
      { img: "icon-aud-leaders.png", title: "Лидеры команд:", desc: "Все, кто хочет создать продуктивную и поддерживающую среду." },
    ],
    whyTitle: "Для чего это нужно",
    whyIntro: "Главная цель — показать прямую связь между самочувствием сотрудников и успехами бизнеса. «Здоровые люди = здоровый бизнес».",
    why: [
      { img: "icon-ben-loss.png", title: "Снижение убытков:", desc: "Уменьшение количества больничных, текучести кадров и случаев травматизма." },
      { img: "icon-ben-eff.png", title: "Рост эффективности:", desc: "Повышение вовлеченности, морального духа и производительности труда." },
      { img: "icon-ben-sol.png", title: "Готовые решения:", desc: "Вместо теории вы получаете набор практических инициатив, которые доказали свою эффективность." },
      { img: "icon-ben-culture.png", title: "Культура:", desc: "Формирование среды, где сотрудники чувствуют поддержку." },
    ],
    treeTitle: "Программа: Модель \"Дерево благополучия\"",
    treeIntro: "Курс строится вокруг 6 ветвей благополучия. Вы узнаете, как каждая из них влияет на работу и как их развивать:",
    tree: [
      { img: "icon-tree-interaction.png", title: "Взаимодействие (Interaction)", desc: "Как общение и социальные связи внутри коллектива влияют на здоровье." },
      { img: "icon-tree-exercise.png", title: "Движение (Exercise/Movement)", desc: "Роль физической активности в профилактике стресса и болезней." },
      { img: "icon-tree-mindfulness.png", title: "Осознанность (Mindfulness)", desc: "Управление вниманием и ментальным здоровьем." },
      { img: "icon-tree-nutrition.png", title: "Питание (Nutrition)", desc: "Влияние правильного питания на уровень энергии и концентрацию." },
      { img: "icon-tree-kindness.png", title: "Доброта (Kindness)", desc: "Почему культура поддержки и уважения выгодна бизнесу." },
      { img: "icon-tree-learning.png", title: "Обучение (Learning)", desc: "Развитие как фактор мотивации и удовлетворенности жизнью." },
    ],
    formatTitle: "Формат обучения и экзамена",
    durLabel: "Длительность:",
    durDesc: "1 день (около 7 часов обучения).",
    evalTitle: "Оценка (Без экзаменов):",
    evalIntro: "Вместо теста вы выполняете практическую работу (Unit WEL1), которая приносит реальную пользу вашей компании прямо в процессе обучения:",
    eval: [
      { img: "icon-eval-plan.png", title: "Анализ:", desc: "Вы оцениваете сильные и слабые стороны вашей компании по каждому из 6 направлений «Дерева благополучия»." },
      { img: "icon-eval-plan.png", title: "План действий:", desc: "Вы разрабатываете «План вмешательства» (Intervention Plan), предлагая конкретные меры для улучшения ситуации и способы оценки их эффективности." },
    ],
    cta: "Оставить заявку",
  },
  en: {
    heroSubtitle: "NEBOSH HSE qualification for workplace wellbeing",
    heroRight: "This course translates the concept of 'wellbeing' from an abstract idea into a concrete set of tools for managers and HR professionals.",
    intro: "This is an introductory one-day qualification aimed at creating a healthy working atmosphere. At its core is the NEBOSH Wellbeing Tree model, which covers 6 key areas influencing a person's wellbeing.",
    audTitle: "Who is this course for?",
    aud: [
      { img: "icon-aud-hr.png", title: "HR professionals:", desc: "To implement retention strategies and reduce burnout." },
      { img: "icon-aud-hse.png", title: "HSE professionals:", desc: "To extend expertise beyond physical safety." },
      { img: "icon-aud-managers.png", title: "Line managers and supervisors:", desc: "To learn how to support their teams." },
      { img: "icon-aud-leaders.png", title: "Team leaders:", desc: "Anyone who wants to create a productive and supportive environment." },
    ],
    whyTitle: "Why this matters",
    whyIntro: "The main goal is to demonstrate the direct link between employee wellbeing and business success. 'Healthy people = healthy business'.",
    why: [
      { img: "icon-ben-loss.png", title: "Reducing losses:", desc: "Fewer sick days, lower staff turnover and reduced injury rates." },
      { img: "icon-ben-eff.png", title: "Growing effectiveness:", desc: "Increased engagement, morale and productivity." },
      { img: "icon-ben-sol.png", title: "Ready-made solutions:", desc: "Instead of theory you receive a set of practical initiatives that have proven their effectiveness." },
      { img: "icon-ben-culture.png", title: "Culture:", desc: "Building an environment where employees feel supported." },
    ],
    treeTitle: "Programme: The Wellbeing Tree Model",
    treeIntro: "The course is built around 6 branches of wellbeing. You will learn how each of them affects work and how to develop them:",
    tree: [
      { img: "icon-tree-interaction.png", title: "Interaction", desc: "How communication and social connections within a team affect health." },
      { img: "icon-tree-exercise.png", title: "Exercise / Movement", desc: "The role of physical activity in preventing stress and illness." },
      { img: "icon-tree-mindfulness.png", title: "Mindfulness", desc: "Managing attention and mental health." },
      { img: "icon-tree-nutrition.png", title: "Nutrition", desc: "The impact of proper nutrition on energy levels and concentration." },
      { img: "icon-tree-kindness.png", title: "Kindness", desc: "Why a culture of support and respect benefits the business." },
      { img: "icon-tree-learning.png", title: "Learning", desc: "Development as a factor of motivation and life satisfaction." },
    ],
    formatTitle: "Training Format and Assessment",
    durLabel: "Duration:",
    durDesc: "1 day (approximately 7 hours of training).",
    evalTitle: "Assessment (No exams):",
    evalIntro: "Instead of a test you complete a practical assignment (Unit WEL1), which delivers real value to your company during the training itself:",
    eval: [
      { img: "icon-eval-plan.png", title: "Analysis:", desc: "You assess the strengths and weaknesses of your organisation across each of the 6 branches of the Wellbeing Tree." },
      { img: "icon-eval-plan.png", title: "Action plan:", desc: "You develop an Intervention Plan, proposing specific measures to improve the situation and ways to measure their effectiveness." },
    ],
    cta: "Submit Request",
  },
};

export default async function NeboshWellbeingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pick(content, locale);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/nebosh-wellbeing/hero-bg.jpg" alt="NEBOSH Wellbeing" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh-wellbeing/hse-logo.png" alt="NEBOSH" width={120} height={50} className="object-contain" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <p className="text-lg lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">{t.heroSubtitle}</p>
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">NEBOSH HSE Working with Wellbeing</h1>
              </div>
              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">{t.heroRight}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/2">
            <p className="text-[16px] font-medium text-black/80 leading-relaxed border-l-4 border-[#0B0073] pl-6 py-2">{t.intro}</p>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className={`${TEXT_H2} mb-6`}>{t.audTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.aud.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <img src={`/assets/nebosh-wellbeing/${item.img}`} className="w-8 h-8 opacity-80 shrink-0" alt="" />
                  <div>
                    <span className="text-[14px] font-bold text-black/90 block mb-1">{item.title}</span>
                    <span className={TEXT_BODY}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>{t.whyTitle}</h2>
        <p className={`${TEXT_BODY} mb-8 max-w-3xl`}>{t.whyIntro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.why.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
              <img src={`/assets/nebosh-wellbeing/${item.img}`} className="w-10 h-10 mb-4 opacity-80 object-contain" alt="" />
              <h3 className={`${TEXT_H3} mb-2`}>{item.title}</h3>
              <p className="text-[11px] text-black/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>{t.treeTitle}</h2>
        <p className={`${TEXT_BODY} mb-10`}>{t.treeIntro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.tree.map((item, i) => (
            <div key={i} className="flex items-center gap-5">
              <img src={`/assets/nebosh-wellbeing/${item.img}`} className="w-12 h-12 opacity-80 object-contain shrink-0" alt="" />
              <div>
                <h4 className="text-[14px] font-bold text-black/90">{item.title}</h4>
                <p className="text-[12px] text-black/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.formatTitle}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="flex gap-6 items-start">
            <span className="text-[18px] font-bold text-[#0B0073]">{t.durLabel}</span>
            <p className={TEXT_BODY}>{t.durDesc}</p>
          </div>
          <div className="lg:col-span-2 border-l-4 border-[#0B0073] pl-8">
            <h3 className="text-[16px] font-bold text-black/90 mb-4">{t.evalTitle}</h3>
            <p className="text-[13px] text-black/70 italic mb-4">{t.evalIntro}</p>
            <div className="space-y-4">
              {t.eval.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <img src={`/assets/nebosh-wellbeing/${item.img}`} className="w-6 h-6 opacity-80 mt-1" alt="" />
                  <div>
                    <span className="text-[14px] font-bold text-black/90 block">{item.title}</span>
                    <span className={TEXT_BODY}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex justify-center"><Button>{t.cta}</Button></div>
      </section>
    </main>
  );
}
