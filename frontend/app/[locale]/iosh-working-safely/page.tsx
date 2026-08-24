import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";
import { pick } from '../../lib/locale';

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[15px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroDesc: "Этот курс отличается своей простотой и практичностью. Он разработан так, чтобы любой сотрудник, независимо от уровня образования, понял основы безопасности и важность предотвращения инцидентов.",
    audienceTitle: "Для кого этот курс?",
    audienceIntro: "Курс универсален и подходит для сотрудников всех уровней и отраслей:",
    audienceItems: ["Рабочие и технические специалисты.", "Менеджеры и руководители (как вводный курс).", "Любой персонал, желающий повысить свое понимание в области охраны труда."],
    advTitle: "Преимущества",
    forEmployee: "Для сотрудника",
    ben1Title: "Международная сертификация:", ben1Desc: "По окончании курса выдается признанный во всем мире сертификат IOSH.",
    ben2Title: "Понятные знания:", ben2Desc: "Отсутствие сложной терминологии позволяет сосредоточиться на реальных задачах.",
    forCompany: "Для компании",
    comp1Title: "Снижение аварийности", comp1Desc: "Повышает осведомленность сотрудников, способствуя снижению числа несчастных случаев.",
    comp2Title: "Соответствие нормам", comp2Desc: "Помогает организации выполнять законодательные требования в области охраны труда.",
    comp3Title: "Единый стандарт", comp3Desc: "Создает общий язык безопасности внутри компании.",
    progTitle: "Программа курса", progIntro: "Программа лаконична и охватывает самые важные аспекты:",
    prog1Title: "Введение в принципы безопасной работы", prog1Desc: "Основы охраны здоровья и безопасности на рабочем месте.",
    prog2Title: "Определение опасных факторов и рисков", prog2Desc: "Как различать опасность и риск, и почему это важно.",
    prog3Title: "Определение общих опасных факторов", prog3Desc: "Обзор типичных угроз на рабочем месте.",
    prog4Title: "Повышение показателей безопасности", prog4Desc: "Как каждый сотрудник может повлиять на улучшение общей безопасности.",
    formatTitle: "Формат обучения и экзамена",
    durTitle: "Длительность:", durDesc: "1 день (может варьироваться в зависимости от уровня группы).",
    methodTitle: "Методы обучения:", methodDesc: "Это не просто лекции, а интерактивные занятия, включающие видеоматериалы и практические задания.",
    evalTitle: "Оценка:", evalDesc: "Для получения сертификата необходимо пройти контрольное тестирование, подтверждающее усвоение материала.",
    cta: "Оставить заявку",
  },
  en: {
    heroDesc: "This course is known for its simplicity and practicality. It is designed so that any employee, regardless of their level of education, understands the basics of safety and the importance of preventing incidents.",
    audienceTitle: "Who is this course for?",
    audienceIntro: "The course is universal and suitable for employees at all levels and in all industries:",
    audienceItems: ["Workers and technical specialists.", "Managers and supervisors (as an introductory course).", "Any staff wishing to improve their understanding of occupational health and safety."],
    advTitle: "Benefits",
    forEmployee: "For the Employee",
    ben1Title: "International Certification:", ben1Desc: "Upon completion, participants receive a globally recognised IOSH certificate.",
    ben2Title: "Clear Knowledge:", ben2Desc: "No complex terminology means focus stays on real-world tasks.",
    forCompany: "For the Company",
    comp1Title: "Reduced Incidents", comp1Desc: "Increases employee awareness, helping to reduce accidents.",
    comp2Title: "Regulatory Compliance", comp2Desc: "Helps the organisation meet legal requirements in occupational health and safety.",
    comp3Title: "Common Standard", comp3Desc: "Creates a shared safety language within the company.",
    progTitle: "Course Programme", progIntro: "The programme is concise and covers the most important aspects:",
    prog1Title: "Introduction to working safely", prog1Desc: "Basics of occupational health and safety in the workplace.",
    prog2Title: "Identifying hazards and controlling risks", prog2Desc: "How to distinguish between hazard and risk, and why it matters.",
    prog3Title: "Identifying common hazards", prog3Desc: "An overview of typical workplace threats.",
    prog4Title: "Improving safety performance", prog4Desc: "How every employee can contribute to improving overall safety.",
    formatTitle: "Training Format and Assessment",
    durTitle: "Duration:", durDesc: "1 day (may vary depending on the group's level).",
    methodTitle: "Training methods:", methodDesc: "Not just lectures — interactive sessions including video materials and practical exercises.",
    evalTitle: "Assessment:", evalDesc: "To obtain the certificate, candidates must pass a test confirming mastery of the material.",
    cta: "Submit Request",
  },

  kz: {
    heroDesc: "Бұл курс қарапайымдылығымен және практикалығымен ерекшеленеді. Ол білім деңгейіне қарамастан кез келген қызметкер қауіпсіздік негіздерін және оқыс оқиғалардың алдын алудың маңызын түсінетіндей әзірленген.",
    audienceTitle: "Бұл курс кімге арналған?",
    audienceIntro: "Курс әмбебап және барлық деңгейдегі қызметкерлер мен салаларға жарамды:",
    audienceItems: ["Жұмысшылар мен техникалық мамандар.", "Менеджерлер мен басшылар (кіріспе курс ретінде).", "Еңбекті қорғау саласындағы түсінігін арттырғысы келетін кез келген қызметкер."],
    advTitle: "Артықшылықтары",
    forEmployee: "Қызметкер үшін",
    ben1Title: "Халықаралық сертификаттау:", ben1Desc: "Курс соңында бүкіл әлемде танылатын IOSH сертификаты берiледi.",
    ben2Title: "Түсінікті білім:", ben2Desc: "Күрделі терминологияның болмауы нақты міндеттерге назар аударуға мүмкіндік береді.",
    forCompany: "Компания үшін",
    comp1Title: "Аварияның азаюы", comp1Desc: "Қызметкерлердің хабардарлығын арттырып, жазатайым оқиғалар санының азаюына ықпал етеді.",
    comp2Title: "Нормаларға сәйкестік", comp2Desc: "Ұйымға еңбекті қорғау саласындағы заң талаптарын орындауға көмектеседі.",
    comp3Title: "Бірыңғай стандарт", comp3Desc: "Компания ішінде қауіпсіздіктің ортақ тілін қалыптастырады.",
    progTitle: "Курс бағдарламасы", progIntro: "Бағдарлама ықшам және ең маңызды аспектілерді қамтиды:",
    prog1Title: "Қауіпсіз жұмыс қағидаттарына кіріспе", prog1Desc: "Жұмыс орнындағы денсаулықты сақтау және қауіпсіздік негіздері.",
    prog2Title: "Қауіпті факторлар мен қауіптерді анықтау", prog2Desc: "Қауіп пен қауіптілікті қалай ажыратуға болады және бұл неге маңызды.",
    prog3Title: "Жалпы қауіпті факторларды анықтау", prog3Desc: "Жұмыс орнындағы тән қауіптерге шолу.",
    prog4Title: "Қауіпсіздік көрсеткіштерін арттыру", prog4Desc: "Әрбір қызметкер жалпы қауіпсіздікті жақсартуға қалай ықпал ете алады.",
    formatTitle: "Оқыту және емтихан форматы",
    durTitle: "Ұзақтығы:", durDesc: "1 күн (топ деңгейіне қарай өзгеруі мүмкін).",
    methodTitle: "Оқыту әдістері:", methodDesc: "Бұл жай дәрістер емес, бейнематериалдар мен практикалық тапсырмаларды қамтитын интерактивті сабақтар.",
    evalTitle: "Бағалау:", evalDesc: "Сертификат алу үшін материалдың игерілгенін растайтын бақылау тестінен өту қажет.",
    cta: "Өтінім қалдыру",
  },
};

export default async function IoshWorkingSafelyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pick(content, locale);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/iosh-working-safely/hero-bg.jpg" alt="IOSH Working Safely" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
              <Image src="/assets/iosh-working-safely/hse-logo.svg" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">IOSH Working Safely</h1>
                <p className="text-xl lg:text-[20px] font-medium text-white/90 leading-tight drop-shadow-md">{t.heroDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-1/3 pt-2">
            <div className="flex items-center gap-4 mb-8">
              <img src="/assets/iosh-working-safely/icon-audience.png" className="w-10 h-10 opacity-80 object-contain" alt="Audience" />
              <h2 className={TEXT_H2}>{t.audienceTitle}</h2>
            </div>
            <p className={`${TEXT_BODY} mb-6`}>{t.audienceIntro}</p>
            <ul className="space-y-4">
              {t.audienceItems.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-1.5 shrink-0"></span>
                  <span className="text-[14px] font-medium text-black/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-2/3">
            <h2 className={`${TEXT_H2} mb-8`}>{t.advTitle}</h2>
            <h3 className="text-[13px] font-bold text-black/40 uppercase tracking-widest mb-4">{t.forEmployee}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex gap-4 items-center">
                <img src="/assets/iosh-working-safely/icon-ben-intl.png" className="w-10 h-10 opacity-80 object-contain shrink-0" alt="Cert" />
                <div><span className="text-[14px] font-bold text-black/90 block">{t.ben1Title}</span><span className={TEXT_BODY}>{t.ben1Desc}</span></div>
              </div>
              <div className="bg-transparent border border-black/20 rounded-[15px] p-6 flex gap-4 items-center">
                <img src="/assets/iosh-working-safely/icon-ben-knowledge.png" className="w-10 h-10 opacity-80 object-contain shrink-0" alt="Know" />
                <div><span className="text-[14px] font-bold text-black/90 block">{t.ben2Title}</span><span className={TEXT_BODY}>{t.ben2Desc}</span></div>
              </div>
            </div>
            <h3 className="text-[13px] font-bold text-black/40 uppercase tracking-widest mb-4">{t.forCompany}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: "icon-comp-reduce.png", title: t.comp1Title, desc: t.comp1Desc },
                { icon: "icon-comp-norm.png", title: t.comp2Title, desc: t.comp2Desc },
                { icon: "icon-comp-std.png", title: t.comp3Title, desc: t.comp3Desc },
              ].map((item, i) => (
                <div key={i} className="bg-transparent border border-black/20 rounded-[15px] p-5 flex flex-col items-start">
                  <img src={`/assets/iosh-working-safely/${item.icon}`} className="w-8 h-8 opacity-80 mb-3" alt="" />
                  <h4 className="text-[13px] font-bold text-black/90 mb-1">{item.title}</h4>
                  <p className="text-[11px] text-black/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-24 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>{t.progTitle}</h2>
        <p className={`${TEXT_BODY} mb-10`}>{t.progIntro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "icon-prog-intro.png", title: t.prog1Title, desc: t.prog1Desc },
            { icon: "icon-prog-risk.png", title: t.prog2Title, desc: t.prog2Desc },
            { icon: "icon-prog-hazard.png", title: t.prog3Title, desc: t.prog3Desc },
            { icon: "icon-prog-improve.png", title: t.prog4Title, desc: t.prog4Desc },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <img src={`/assets/iosh-working-safely/${item.icon}`} className="w-14 h-14 opacity-80 mb-4" alt="" />
              <h4 className="text-[14px] font-bold text-black/90 leading-snug">{item.title}</h4>
              <p className="text-[11px] text-black/60 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-24 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.formatTitle}</h2>
        <div className="flex flex-col md:flex-row gap-12 border-l-4 border-[#0B0073] pl-8 py-4 bg-white/30 rounded-r-[15px]">
          {[
            { icon: "icon-format-time.png", title: t.durTitle, desc: t.durDesc },
            { icon: "icon-format-method.png", title: t.methodTitle, desc: t.methodDesc },
            { icon: "icon-format-eval.png", title: t.evalTitle, desc: t.evalDesc },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img src={`/assets/iosh-working-safely/${item.icon}`} className="w-6 h-6 opacity-70" alt="" />
                <span className="text-[15px] font-bold text-black/90">{item.title}</span>
              </div>
              <p className={TEXT_BODY}>{item.desc}</p>
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
