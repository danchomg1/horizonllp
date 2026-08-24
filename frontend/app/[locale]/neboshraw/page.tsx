import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";
import { pick } from '../../lib/locale';

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[15px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroSubtitle: "Это однодневная квалификация, разработанная экзаменационным советом NEBOSH совместно с государственным регулятором Великобритании — Health and Safety Executive (HSE).",
    heroRight: "Курс учит практическому подходу к оценке рисков, основанному на лучших мировых практиках.",
    audTitle: "Для кого этот курс?",
    audIntro: "Курс универсален и подходит для всех, кто участвует в процессе управления рисками в любой отрасли:",
    aud: [
      { title: "Руководители и линейные менеджеры:", desc: "Чтобы понимать, как создавать безопасные условия для своих команд." },
      { title: "Специалисты по охране труда (SHE/HSE):", desc: "Чтобы обновить знания и освоить подход британского регулятора (HSE)." },
      { title: "Представители профсоюзов и «чемпионы» по безопасности:", desc: "Чтобы грамотно выявлять опасности." },
      { title: "Владельцы бизнеса:", desc: "Чтобы самостоятельно оценивать риски в своих компаниях." },
      { title: "Новички:", desc: "Для старта карьеры в области безопасности (предварительные знания не требуются)." },
    ],
    whyTitle: "Зачем это нужно",
    whyIntro: "Главная цель курса — уйти от сложной бюрократии («бумажной безопасности») к реальным действиям по защите людей.",
    why: [
      { img: "icon-raw-skill.png", title: "Навык, а не теория:", desc: "Вы научитесь проводить оценку рисков не «для галочки», а так, чтобы это реально снижало травматизм." },
      { img: "icon-raw-tools.png", title: "Инструменты HSE:", desc: "Вы освоите простые и эффективные инструменты оценки рисков (HSE risk assessment tools), которые используют инспекторы в Великобритании." },
      { img: "icon-raw-confidence.png", title: "Уверенность:", desc: "Вы научитесь определять, какие меры контроля действительно необходимы и пропорциональны рискам, а на что не стоит тратить ресурсы." },
      { img: "icon-raw-legal.png", title: "Юридическая защита:", desc: "Для компаний это способ доказать компетентность своих сотрудников в вопросах управления рисками." },
    ],
    formatTitle: "Формат обучения и экзамена",
    formatIntro: "Курс максимально сжат и ориентирован на практику.",
    durTitle: "Длительность:", durDesc: "Всего 1 день (около 6-7 часов обучения).",
    progTitle: "Программа (3 элемента):",
    prog: [
      "Зачем нужно управлять рисками (моральные, правовые и финансовые причины).",
      "Управление рисками: Выявление и понимание опасностей.",
      "Источники информации и применение инструментов оценки рисков HSE.",
    ],
    examTitle: "Экзамен (Практический):",
    examIntro: "Здесь нет скучных тестов. В конце дня вы проходите практическую оценку (Unit RAW1):",
    exam: [
      "Вам показывают видео реального рабочего места.",
      "Вы должны выявить опасности.",
      "Заполнить форму оценки рисков: предложить разумные меры контроля и расставить приоритеты.",
    ],
    examNote: "Этот формат гарантирует, что вы действительно научились применять знания на практике.",
    cta: "Оставить заявку",
  },
  en: {
    heroSubtitle: "A one-day qualification developed by NEBOSH together with the UK's national regulator, the Health and Safety Executive (HSE).",
    heroRight: "The course teaches a practical approach to risk assessment based on best global practices.",
    audTitle: "Who is this course for?",
    audIntro: "The course is universal and suitable for everyone involved in risk management in any industry:",
    aud: [
      { title: "Managers and line managers:", desc: "To understand how to create safe conditions for their teams." },
      { title: "SHE/HSE professionals:", desc: "To refresh knowledge and adopt the approach of the UK regulator (HSE)." },
      { title: "Trade union representatives and safety champions:", desc: "To identify hazards effectively." },
      { title: "Business owners:", desc: "To independently assess risks in their own organisations." },
      { title: "Beginners:", desc: "For starting a career in safety (no prior knowledge required)." },
    ],
    whyTitle: "Why this matters",
    whyIntro: "The main goal of the course is to move away from complex bureaucracy ('paper safety') towards real actions that protect people.",
    why: [
      { img: "icon-raw-skill.png", title: "Skill, not theory:", desc: "You will learn to conduct risk assessments not as a box-ticking exercise but in a way that actually reduces injury rates." },
      { img: "icon-raw-tools.png", title: "HSE tools:", desc: "You will master simple and effective HSE risk assessment tools used by inspectors in the UK." },
      { img: "icon-raw-confidence.png", title: "Confidence:", desc: "You will learn to determine which control measures are truly necessary and proportionate to the risks, and where not to spend resources." },
      { img: "icon-raw-legal.png", title: "Legal protection:", desc: "For organisations, this demonstrates the competence of their staff in risk management." },
    ],
    formatTitle: "Training Format and Assessment",
    formatIntro: "The course is highly condensed and practice-oriented.",
    durTitle: "Duration:", durDesc: "Just 1 day (approximately 6–7 hours of training).",
    progTitle: "Programme (3 elements):",
    prog: [
      "Why risk management is needed (moral, legal and financial reasons).",
      "Managing risks: Identifying and understanding hazards.",
      "Sources of information and applying HSE risk assessment tools.",
    ],
    examTitle: "Assessment (Practical):",
    examIntro: "There are no tedious tests. At the end of the day you complete a practical assessment (Unit RAW1):",
    exam: [
      "You are shown a video of a real workplace.",
      "You must identify the hazards.",
      "Complete a risk assessment form: propose reasonable control measures and set priorities.",
    ],
    examNote: "This format ensures you have truly learned to apply knowledge in practice.",
    cta: "Submit Request",
  },

  kz: {
    heroSubtitle: "Бұл NEBOSH емтихан кеңесі Ұлыбританияның мемлекеттік реттеушісі — Health and Safety Executive (HSE) — бірлесіп әзірлеген бір күндік біліктілік.",
    heroRight: "Курс әлемдік үздік тәжірибелерге негізделген қауіптерді бағалаудың практикалық тәсіліне үйретеді.",
    audTitle: "Бұл курс кімге арналған?",
    audIntro: "Курс әмбебап және кез келген салада қауіптерді басқару процесіне қатысатындардың бәріне жарамды:",
    aud: [
      { title: "Басшылар мен желілік менеджерлер:", desc: "Өз командалары үшін қауіпсіз жағдай жасауды түсіну үшін." },
      { title: "Еңбекті қорғау мамандары (SHE/HSE):", desc: "Білімін жаңарту және британдық реттеушінің (HSE) тәсілін игеру үшін." },
      { title: "Кәсіподақ өкілдері мен қауіпсіздік көшбасшылары:", desc: "Қауіптерді сауатты анықтау үшін." },
      { title: "Бизнес иелері:", desc: "Өз компанияларындағы қауіптерді өз бетінше бағалау үшін." },
      { title: "Жаңадан бастаушылар:", desc: "Қауіпсіздік саласында мансап бастау үшін (алдын ала білім талап етілмейді)." },
    ],
    whyTitle: "Бұл не үшін керек",
    whyIntro: "Курстың басты мақсаты — күрделі бюрократиядан (қағаздағы қауіпсіздіктен) адамдарды қорғаудың нақты әрекеттеріне көшу.",
    why: [
      { img: "icon-raw-skill.png", title: "Теория емес, дағды:", desc: "Қауіптерді бағалауды жай көрсету үшін емес, жарақаттануды шынымен азайтатындай жүргізуді үйренесіз." },
      { img: "icon-raw-tools.png", title: "HSE құралдары:", desc: "Ұлыбританиядағы инспекторлар қолданатын қауіптерді бағалаудың қарапайым және тиімді құралдарын (HSE risk assessment tools) игересіз." },
      { img: "icon-raw-confidence.png", title: "Сенімділік:", desc: "Қандай бақылау шаралары шынымен қажет және қауіптерге сай, ал неге ресурс жұмсамау керегін анықтауды үйренесіз." },
      { img: "icon-raw-legal.png", title: "Құқықтық қорғау:", desc: "Компаниялар үшін бұл қызметкерлерінің қауіптерді басқару мәселелеріндегі құзыретін дәлелдеу тәсілі." },
    ],
    formatTitle: "Оқыту және емтихан форматы",
    formatIntro: "Курс барынша ықшам және практикаға бағытталған.",
    durTitle: "Ұзақтығы:", durDesc: "Барлығы 1 күн (шамамен 6-7 сағат оқу).",
    progTitle: "Бағдарлама (3 элемент):",
    prog: [
      "Қауіптерді басқару неге қажет (моральдық, құқықтық және қаржылық себептер).",
      "Қауіптерді басқару: қауіптерді анықтау және түсіну.",
      "Ақпарат көздері және HSE қауіптерді бағалау құралдарын қолдану.",
    ],
    examTitle: "Емтихан (практикалық):",
    examIntro: "Мұнда жалықтыратын тест жоқ. Күн соңында сіз практикалық бағалаудан өтесіз (Unit RAW1):",
    exam: [
      "Сізге нақты жұмыс орнының бейнежазбасы көрсетіледі.",
      "Сіз қауіптерді анықтауыңыз керек.",
      "Қауіптерді бағалау формасын толтыру: ақылға сыйымды бақылау шараларын ұсыну және басымдықтарды белгілеу.",
    ],
    examNote: "Бұл формат білімді практикада қолдануды шынымен үйренгеніңізге кепілдік береді.",
    cta: "Өтінім қалдыру",
  },
};

export default async function NeboshRawPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pick(content, locale);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/nebosh-raw/hero-bg.jpg" alt="NEBOSH Risk Assessment" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh-raw/hse-logo.png" alt="NEBOSH" width={120} height={50} className="object-contain" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">Award in Managing Risks and Risk Assessment at Work</h1>
                <p className="text-xl lg:text-[18px] font-medium text-white/90 leading-tight drop-shadow-md">{t.heroSubtitle}</p>
              </div>
              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">{t.heroRight}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>{t.audTitle}</h2>
        <p className={`${TEXT_BODY} mb-8 max-w-4xl`}>{t.audIntro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
          {t.aud.map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
              <div>
                <span className="text-[15px] font-bold text-black/90 block mb-1">{item.title}</span>
                <span className={TEXT_BODY}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>{t.whyTitle}</h2>
        <p className={`${TEXT_BODY} mb-8 max-w-3xl`}>{t.whyIntro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.why.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
              <img src={`/assets/nebosh-raw/${item.img}`} className="w-10 h-10 mb-4 opacity-80 object-contain" alt="" />
              <h3 className={`${TEXT_H3} mb-2`}>{item.title}</h3>
              <p className="text-[11px] text-black/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>{t.formatTitle}</h2>
        <p className={`${TEXT_BODY} mb-8`}>{t.formatIntro}</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 bg-transparent border border-black/20 rounded-[15px] p-8 flex flex-col items-center text-center">
            <img src="/assets/nebosh-raw/icon-format-time.png" className="h-[50px] w-auto mb-4 opacity-80" alt="" />
            <h3 className={TEXT_H3}>{t.durTitle}</h3>
            <p className={TEXT_BODY}>{t.durDesc}</p>
          </div>
          <div className="lg:col-span-2 bg-transparent border border-black/20 rounded-[15px] p-8">
            <h3 className={`${TEXT_H3} mb-4`}>{t.progTitle}</h3>
            <ul className="space-y-3">
              {t.prog.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="text-[#0B0073] font-bold mt-0.5">{i + 1}.</span>
                  <span className={TEXT_BODY}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-l-4 border-[#0B0073] pl-8 py-6">
          <img src="/assets/nebosh-raw/icon-exam-video.png" className="h-[60px] w-auto opacity-80 object-contain shrink-0" alt="" />
          <div>
            <h3 className="text-[16px] font-bold text-black/90 mb-3">{t.examTitle}</h3>
            <p className={`${TEXT_BODY} mb-4 italic`}>{t.examIntro}</p>
            <ul className="space-y-2 mb-4">
              {t.exam.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                  <span className={TEXT_BODY}>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[13px] font-semibold text-[#0B0073]">{t.examNote}</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10 mt-12">
        <div className="flex justify-center"><Button>{t.cta}</Button></div>
      </section>
    </main>
  );
}
