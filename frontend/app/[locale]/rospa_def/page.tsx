import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";
import { pick } from '../../lib/locale';

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[15px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroSubtitle: "Программа RoSPA Level 2",
    heroRight: "Дорожные инциденты остаются одной из ведущих причин смертности в промышленном и энергетическом секторах. Программа RoSPA Level 2 предлагает комплексный подход к безопасности.",
    intro: "Этот курс выходит за рамки базовых технических навыков управления автомобилем. Мы исследуем психологию поведения водителя, обучаем распознаванию скрытых угроз и формируем позитивное отношение к вождению. Программа позволяет водителям уверенно и безопасно управлять транспортными средствами в любой среде — от городских дорог до экстремального бездорожья и сложных погодных условий.",
    goalsTitle: "Цели программы",
    goals: [
      { img: "icon-goal-min.png", title: "Минимизация рисков:", desc: "Развитие устойчивых навыков защитного вождения для снижения вероятности аварий." },
      { img: "icon-goal-prevent.png", title: "Предотвращение ДТП:", desc: "Глубокое обучение методам активного избегания столкновений." },
      { img: "icon-goal-aware.png", title: "Ситуационная осведомленность:", desc: "Повышение скорости реакции на неожиданные препятствия и изменения дорожной обстановки." },
    ],
    audTitle: "Целевая аудитория",
    aud: [
      "Профессиональные водители всех категорий.",
      "Корпоративные водители компаний энергетического и промышленного секторов.",
      "Частные лица, стремящиеся к максимальному уровню безопасности при управлении автомобилем.",
    ],
    topicsTitle: "Ключевые темы курса:",
    topics: [
      { img: "icon-topic-base.png", text: "Основы защитного вождения." },
      { img: "icon-topic-weather.png", text: "Реагирование на изменения погодных и дорожных условий." },
      { img: "icon-topic-stress.png", text: "Техники управления стрессом." },
      { img: "icon-topic-decision.png", text: "Психологические аспекты принятия решений за рулем." },
    ],
    formatTitle: "Формат программы",
    format: [
      { img: "icon-format-time.png", title: "Длительность:", desc: "1–2 дня (варьируется в зависимости от исходного уровня подготовки участников)." },
      { img: "icon-format-methods.png", title: "Методы обучения:", desc: "Теоретические лекции и видеоанализ реальных дорожных ситуаций. Интенсивные практические занятия на дороге." },
      { img: "icon-format-eval.png", title: "Методы оценки:", desc: "Экзаменационное тестирование и практическое вождение с экспертными комментариями и разбором кейс-стади." },
    ],
    benefitsTitle: "Преимущества программы",
    benefits: [
      { img: "icon-ben-intl.png", title: "Международная сертификация:", desc: "Выдача официального документа, признаваемого во всем мире." },
      { img: "icon-ben-risk.png", title: "Снижение рисков:", desc: "Значительное сокращение частоты ДТП и связанных с ними травм." },
      { img: "icon-ben-personal.png", title: "Личное развитие:", desc: "Рост уверенности за рулем и навыков критического восприятия дорожной обстановки." },
      { img: "icon-ben-econ.png", title: "Экономическая эффективность:", desc: "Уменьшение простоев и убытков компании из-за эксплуатационных сбоев и аварий." },
      { img: "icon-ben-rep.png", title: "Репутационный капитал:", desc: "Демонстрация приверженности компании высоким стандартам безопасности и заботе о сотрудниках." },
    ],
    cta: "Оставить заявку",
  },
  en: {
    heroSubtitle: "RoSPA Level 2 Programme",
    heroRight: "Road incidents remain one of the leading causes of fatalities in the industrial and energy sectors. The RoSPA Level 2 programme offers a comprehensive approach to safety.",
    intro: "This course goes beyond basic vehicle control skills. We explore the psychology of driver behaviour, teach recognition of hidden hazards and build a positive attitude to driving. The programme enables drivers to operate vehicles confidently and safely in any environment — from urban roads to extreme off-road conditions and adverse weather.",
    goalsTitle: "Programme objectives",
    goals: [
      { img: "icon-goal-min.png", title: "Risk minimisation:", desc: "Developing robust defensive driving skills to reduce the likelihood of accidents." },
      { img: "icon-goal-prevent.png", title: "Accident prevention:", desc: "In-depth training in active collision avoidance techniques." },
      { img: "icon-goal-aware.png", title: "Situational awareness:", desc: "Improving reaction speed to unexpected hazards and changes in road conditions." },
    ],
    audTitle: "Target audience",
    aud: [
      "Professional drivers of all categories.",
      "Corporate drivers in energy and industrial sector companies.",
      "Private individuals seeking the highest level of safety when driving.",
    ],
    topicsTitle: "Key course topics:",
    topics: [
      { img: "icon-topic-base.png", text: "Fundamentals of defensive driving." },
      { img: "icon-topic-weather.png", text: "Responding to changes in weather and road conditions." },
      { img: "icon-topic-stress.png", text: "Stress management techniques." },
      { img: "icon-topic-decision.png", text: "Psychological aspects of decision-making while driving." },
    ],
    formatTitle: "Programme format",
    format: [
      { img: "icon-format-time.png", title: "Duration:", desc: "1–2 days (varies depending on participants' starting level)." },
      { img: "icon-format-methods.png", title: "Training methods:", desc: "Theory lectures and video analysis of real road situations. Intensive practical driving sessions." },
      { img: "icon-format-eval.png", title: "Assessment methods:", desc: "Written examination and practical driving assessment with expert commentary and case-study review." },
    ],
    benefitsTitle: "Programme benefits",
    benefits: [
      { img: "icon-ben-intl.png", title: "International certification:", desc: "Issue of an official document recognised worldwide." },
      { img: "icon-ben-risk.png", title: "Risk reduction:", desc: "Significant reduction in accident frequency and associated injuries." },
      { img: "icon-ben-personal.png", title: "Personal development:", desc: "Growing confidence behind the wheel and critical road-awareness skills." },
      { img: "icon-ben-econ.png", title: "Economic efficiency:", desc: "Reduced company downtime and losses due to operational failures and accidents." },
      { img: "icon-ben-rep.png", title: "Reputational value:", desc: "Demonstrating the organisation's commitment to high safety standards and employee welfare." },
    ],
    cta: "Submit Request",
  },
};

export default async function RospaDefensiveDrivingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pick(content, locale);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[500px] rounded-[15px] overflow-hidden">
          <Image src="/assets/rospa/hero-bg.jpg" alt="RoSPA Defensive Driving" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
              <Image src="/assets/rospa/hse-logo.svg" alt="RoSPA" width={120} height={50} className="object-contain" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <p className="text-lg lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">{t.heroSubtitle}</p>
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">RoSPA Level 2 Defensive Driving</h1>
              </div>
              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">{t.heroRight}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-12 px-4">
        <div className="max-w-4xl border-l-4 border-[#0B0073] pl-8 py-2">
          <p className="text-[15px] font-medium text-black/80 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-2/3">
            <h2 className={`${TEXT_H2} mb-8`}>{t.goalsTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.goals.map((item, i) => (
                <div key={i} className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
                  <img src={`/assets/rospa/${item.img}`} className="w-10 h-10 mb-4 opacity-80" alt="" />
                  <h3 className={`${TEXT_H3} mb-2`}>{item.title}</h3>
                  <p className={TEXT_BODY}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <h2 className={`${TEXT_H2} mb-8`}>{t.audTitle}</h2>
            <ul className="space-y-4">
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
        <h2 className={`${TEXT_H2} mb-8`}>{t.topicsTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.topics.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/20 rounded-[15px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
              <img src={`/assets/rospa/${item.img}`} className="h-[40px] w-auto mb-4 opacity-80 object-contain" alt="" />
              <p className="text-[13px] font-bold text-black/90 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.formatTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.format.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow">
              <img src={`/assets/rospa/${item.img}`} className="h-[45px] w-auto mb-5 opacity-80 object-contain" alt="" />
              <h3 className={`${TEXT_H3} mb-2`}>{item.title}</h3>
              <p className={TEXT_BODY}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.benefitsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.benefits.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow flex flex-col">
              <img src={`/assets/rospa/${item.img}`} className="w-10 h-10 mb-4 opacity-80" alt="" />
              <h4 className="text-[13px] font-bold text-black/90 mb-2">{item.title}</h4>
              <p className="text-[11px] text-black/60 leading-snug">{item.desc}</p>
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
