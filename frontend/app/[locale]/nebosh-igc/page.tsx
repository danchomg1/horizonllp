import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";
import { pick } from '../../lib/locale';

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[14px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    subtitle: "International General Certificate in Occupational Health and Safety",
    adv1Title: "Универсальный охват", adv1Desc: "Учебная программа охватывает широкий спектр тем в области безопасности и охраны труда, что делает полученные знания применимыми в любой отрасли и сфере деятельности.",
    adv2Title: "Международное признание", adv2Desc: "Данная квалификация признана государственными и отраслевыми организациями во многих странах, что повышает привлекательность владельца сертификата для работодателей.",
    adv3Title: "Фокус на практических навыках", adv3Desc: "Программа NEBOSH IGC предусматривает оценку практических навыков, что позволяет сразу начать применение инструментов оценки и управления рисками на производстве.",
    deliveryTitle: "Форма проведения",
    del1: "Дистанционное обучение онлайн",
    del2: "Обучение с частичным отрывом от производства с занятиями в несколько часов в день общей длительностью не менее 10 учебных дней",
    del3: "Очное обучение с отрывом от производства в течение двух недель с выходными днями",
    certTitle: "Сертификация",
    certSubtitle: "Для получения международного сертификата NEBOSH IGC необходимо сдать два экзамена",
    ig1Title: "Экзамен по Модулю IG1", ig1Desc: "Проводится удаленно с возможностью использования любых источников информации при условии соблюдения строгих правил по предотвращению плагиата. У вас будет 24 часа на выполнение заданий и загрузку выполненной работы в онлайн систему. Данный экзамен оценивает знания различных элементов систем управления охраной труда и требует аналитического подхода.",
    ig2Title: "Экзамен по Модулю IG2", ig2Desc: "Предусматривает удаленное выполнение развернутой оценки рисков с разработкой плана мероприятий, на что отводится 10 рабочих дней.",
    gradesTitle: "Нормативы сдачи экзамена",
    gradeA: "Отлично:", gradeAVal: "75 баллов или больше",
    gradeB: "Хорошо:", gradeBVal: "65 – 74 баллов",
    gradeC: "Удовлетворительно:", gradeCVal: "45 – 64 баллов",
    courseTitle: "Содержание курса",
    mod1Title: "Модуль IG1: Управление охраной труда",
    el: "Элемент",
    mod1Items: [
      "Основания для эффективного управления охраной труда",
      "Системы управления охраной труда",
      "Управление рисками с учетом процессов и человеческого фактора",
      "Мониторинг и оценка эффективности деятельности в БиОТ",
    ],
    mod2Title: "Модуль IG2: Оценка риска",
    mod2Items: [
      "Физическое и психологическое здоровье",
      "Здоровье опорно-двигательной системы",
      "Химические и биологические факторы",
      "Общие вопросы безопасности рабочих мест",
      "Производственное оборудование и механизмы",
      "Основы пожарной безопасности",
      "Основы электробезопасности",
    ],
    outcomesTitle: "Результаты обучения",
    outcomes: [
      { text: "Принципы эффективного управления охраной труда", img: "icon-outcomes-principles.png" },
      { text: "Давать моральные, юридические и финансовые обоснования мероприятиям БиОТ", img: "icon-outcomes-reasons.png" },
      { text: "Основные этапы обеспечения БиОТ при работе с подрядными организациями", img: "icon-outcomes-contractors.png" },
      { text: "Методы и инструменты идентификации и оценки рисков", img: "icon-outcomes-risk-assessment.png" },
      { text: "Стратегии управления рисками", img: "icon-outcomes-risk-strategy.png" },
      { text: "Показатели культуры безопасности и способы влияния на неё", img: "icon-outcomes-culture.png" },
      { text: "Человеческий фактор и основы поведенческой безопасности", img: "icon-outcomes-behavior.png" },
      { text: "Методы и показатели оценки эффективности деятельности БиОТ", img: "icon-outcomes-kpi.png" },
      { text: "Категории причин происшествий и инструменты их анализа при расследовании", img: "icon-outcomes-investigation.png" },
    ],
    cta: "Оставить заявку",
  },
  en: {
    subtitle: "International General Certificate in Occupational Health and Safety",
    adv1Title: "Universal Coverage", adv1Desc: "The curriculum covers a wide range of health and safety topics, making the knowledge applicable across any industry or sector.",
    adv2Title: "International Recognition", adv2Desc: "This qualification is recognised by government and industry organisations in many countries, increasing the appeal of certificate holders to employers worldwide.",
    adv3Title: "Focus on Practical Skills", adv3Desc: "The NEBOSH IGC includes a practical skills assessment, allowing immediate application of risk assessment and risk management tools in the workplace.",
    deliveryTitle: "Delivery Formats",
    del1: "Distance learning / online",
    del2: "Part-time study with a few hours of classes per day, totalling at least 10 study days",
    del3: "Full-time classroom study over two weeks including weekends",
    certTitle: "Certification",
    certSubtitle: "To obtain the international NEBOSH IGC certificate, candidates must pass two assessments",
    ig1Title: "Unit IG1 Assessment", ig1Desc: "Conducted remotely, open-book, subject to strict anti-plagiarism rules. Candidates have 24 hours to complete and submit their work online. This assessment evaluates knowledge of occupational health and safety management systems and requires analytical thinking.",
    ig2Title: "Unit IG2 Assessment", ig2Desc: "A remotely completed practical risk assessment with a management action plan. Candidates have 10 working days to complete this assessment.",
    gradesTitle: "Grading Standards",
    gradeA: "Distinction:", gradeAVal: "75 marks or above",
    gradeB: "Credit:", gradeBVal: "65 – 74 marks",
    gradeC: "Pass:", gradeCVal: "45 – 64 marks",
    courseTitle: "Course Content",
    mod1Title: "Unit IG1: Management of Health and Safety",
    el: "Element",
    mod1Items: [
      "Why we should manage workplace health and safety",
      "How health and safety management systems work",
      "Managing risk — understanding people and processes",
      "Health and safety monitoring and measuring",
    ],
    mod2Title: "Unit IG2: Risk Assessment",
    mod2Items: [
      "Physical and psychological health",
      "Musculoskeletal health",
      "Chemical and biological agents",
      "General workplace issues",
      "Work equipment",
      "Fire safety",
      "Electrical safety",
    ],
    outcomesTitle: "Learning Outcomes",
    outcomes: [
      { text: "Principles of effective health and safety management", img: "icon-outcomes-principles.png" },
      { text: "Provide moral, legal and financial justification for HSE activities", img: "icon-outcomes-reasons.png" },
      { text: "Key steps in managing HSE with contractor organisations", img: "icon-outcomes-contractors.png" },
      { text: "Hazard identification and risk assessment methods and tools", img: "icon-outcomes-risk-assessment.png" },
      { text: "Risk management strategies", img: "icon-outcomes-risk-strategy.png" },
      { text: "Indicators of safety culture and ways to influence it", img: "icon-outcomes-culture.png" },
      { text: "Human factors and foundations of behavioural safety", img: "icon-outcomes-behavior.png" },
      { text: "Methods and indicators for evaluating HSE performance", img: "icon-outcomes-kpi.png" },
      { text: "Incident causation categories and investigation tools", img: "icon-outcomes-investigation.png" },
    ],
    cta: "Submit Request",
  },

  kz: {
    subtitle: "International General Certificate in Occupational Health and Safety",
    adv1Title: "Әмбебап қамту", adv1Desc: "Оқу бағдарламасы қауіпсіздік және еңбекті қорғау саласындағы тақырыптардың кең ауқымын қамтиды, сондықтан алынған білім кез келген салада қолданылады.",
    adv2Title: "Халықаралық тану", adv2Desc: "Бұл біліктілік көптеген елдердің мемлекеттік және салалық ұйымдарында танылады, бұл сертификат иесінің жұмыс берушілер үшін тартымдылығын арттырады.",
    adv3Title: "Практикалық дағдыларға назар", adv3Desc: "NEBOSH IGC бағдарламасы практикалық дағдыларды бағалауды көздейді, бұл өндірісте қауіптерді бағалау мен басқару құралдарын бірден қолдануға мүмкіндік береді.",
    deliveryTitle: "Өткізу формасы",
    del1: "Онлайн қашықтан оқыту",
    del2: "Өндірістен ішінара қол үзіп, күніне бірнеше сағат сабақпен, жалпы ұзақтығы кемінде 10 оқу күні",
    del3: "Демалыс күндерімен қоса екі апта бойы өндірістен қол үзіп күндізгі оқыту",
    certTitle: "Сертификаттау",
    certSubtitle: "NEBOSH IGC халықаралық сертификатын алу үшін екі емтихан тапсыру қажет",
    ig1Title: "IG1 модулі бойынша емтихан", ig1Desc: "Плагиатқа жол бермеу бойынша қатаң қағидалар сақталған жағдайда кез келген ақпарат көзін пайдалану мүмкіндігімен қашықтан өткізіледі. Тапсырмаларды орындауға және орындалған жұмысты онлайн жүйеге жүктеуге 24 сағат беріледі. Бұл емтихан еңбекті қорғауды басқару жүйелерінің әртүрлі элементтері туралы білімді бағалайды және аналитикалық тәсілді талап етеді.",
    ig2Title: "IG2 модулі бойынша емтихан", ig2Desc: "Іс-шаралар жоспарын әзірлеумен қатар қауіптерді толық бағалауды қашықтан орындауды көздейді, оған 10 жұмыс күні беріледі.",
    gradesTitle: "Емтихан тапсыру нормативтері",
    gradeA: "Өте жақсы:", gradeAVal: "75 балл және одан жоғары",
    gradeB: "Жақсы:", gradeBVal: "65 – 74 балл",
    gradeC: "Қанағаттанарлық:", gradeCVal: "45 – 64 балл",
    courseTitle: "Курс мазмұны",
    mod1Title: "IG1 модулі: Еңбекті қорғауды басқару",
    el: "Элемент",
    mod1Items: [
      "Еңбекті қорғауды тиімді басқарудың негіздері",
      "Еңбекті қорғауды басқару жүйелері",
      "Процестер мен адам факторын ескере отырып қауіптерді басқару",
      "ЕҚҚ саласындағы қызмет тиімділігін бақылау және бағалау",
    ],
    mod2Title: "IG2 модулі: Қауіптерді бағалау",
    mod2Items: [
      "Физикалық және психологиялық денсаулық",
      "Тірек-қимыл жүйесінің денсаулығы",
      "Химиялық және биологиялық факторлар",
      "Жұмыс орындары қауіпсіздігінің жалпы мәселелері",
      "Өндірістік жабдық және механизмдер",
      "Өрт қауіпсіздігі негіздері",
      "Электр қауіпсіздігі негіздері",
    ],
    outcomesTitle: "Оқыту нәтижелері",
    outcomes: [
      { text: "Еңбекті қорғауды тиімді басқару қағидаттары", img: "icon-outcomes-principles.png" },
      { text: "ЕҚҚ іс-шараларына моральдық, құқықтық және қаржылық негіздеме беру", img: "icon-outcomes-reasons.png" },
      { text: "Мердігер ұйымдармен жұмыс кезінде ЕҚҚ қамтамасыз етудің негізгі кезеңдері", img: "icon-outcomes-contractors.png" },
      { text: "Қауіптерді анықтау және бағалау әдістері мен құралдары", img: "icon-outcomes-risk-assessment.png" },
      { text: "Қауіптерді басқару стратегиялары", img: "icon-outcomes-risk-strategy.png" },
      { text: "Қауіпсіздік мәдениетінің көрсеткіштері және оған әсер ету жолдары", img: "icon-outcomes-culture.png" },
      { text: "Адам факторы және мінез-құлық қауіпсіздігінің негіздері", img: "icon-outcomes-behavior.png" },
      { text: "ЕҚҚ қызметінің тиімділігін бағалау әдістері мен көрсеткіштері", img: "icon-outcomes-kpi.png" },
      { text: "Оқыс оқиға себептерінің санаттары және тергеу кезінде оларды талдау құралдары", img: "icon-outcomes-investigation.png" },
    ],
    cta: "Өтінім қалдыру",
  },
};

export default async function NeboshIgcPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pick(content, locale);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/nebosh/hero-bg.jpg" alt="NEBOSH IGC" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
              <Image src="/assets/nebosh/hse-logo.png" alt="HSE Logo" width={120} height={50} className="object-contain" />
            </div>
            <div className="flex flex-col max-w-4xl gap-2">
              <h1 className="text-3xl lg:text-[52px] font-bold text-white leading-[1.1] drop-shadow-lg">Nebosh IGC</h1>
              <p className="text-lg lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: t.adv1Title, desc: t.adv1Desc, icon: "icon-universal.png", alt: t.adv1Title },
            { title: t.adv2Title, desc: t.adv2Desc, icon: "icon-global.png", alt: t.adv2Title },
            { title: t.adv3Title, desc: t.adv3Desc, icon: "icon-practice.png", alt: t.adv3Title },
          ].map((item, i) => (
            <div key={i} className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
              <img src={`/assets/nebosh/${item.icon}`} className="h-[72px] w-auto mb-6 opacity-80 object-contain" alt={item.alt} />
              <h3 className={`${TEXT_H3} mb-3`}>{item.title}</h3>
              <p className={TEXT_BODY}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.deliveryTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "icon-online.png", text: t.del1 },
            { icon: "icon-part-time.png", text: t.del2 },
            { icon: "icon-full-time.png", text: t.del3 },
          ].map((item, i) => (
            <div key={i} className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <img src={`/assets/nebosh/${item.icon}`} className="h-[60px] w-auto mb-5 opacity-80 object-contain" alt="" />
              <p className={`${TEXT_BODY} font-medium`}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-2/3">
            <h2 className={`${TEXT_H2} mb-4`}>{t.certTitle}</h2>
            <p className="text-[13px] font-bold text-[#0B0073] mb-6 uppercase">{t.certSubtitle}</p>
            <div className="flex flex-col gap-5">
              <div className="bg-transparent border border-black/10 rounded-[15px] p-6">
                <div className="flex items-center gap-4 mb-3">
                  <img src="/assets/nebosh/icon-ig1.png" className="h-[40px] w-auto opacity-80 object-contain" alt="IG1" />
                  <h3 className={TEXT_H3}>{t.ig1Title}</h3>
                </div>
                <p className={TEXT_BODY}>{t.ig1Desc}</p>
              </div>
              <div className="bg-transparent border border-black/10 rounded-[15px] p-6">
                <div className="flex items-center gap-4 mb-3">
                  <img src="/assets/nebosh/icon-ig2.png" className="h-[40px] w-auto opacity-80 object-contain" alt="IG2" />
                  <h3 className={TEXT_H3}>{t.ig2Title}</h3>
                </div>
                <p className={TEXT_BODY}>{t.ig2Desc}</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <h2 className={`${TEXT_H2} mb-6`}>{t.gradesTitle}</h2>
            <div className="flex flex-col gap-4">
              <div className="border-l-4 border-[#0B0073] pl-4">
                <h4 className="text-[15px] font-bold text-black/90">{t.gradeA}</h4>
                <p className="text-[14px] font-medium text-black/70">{t.gradeAVal}</p>
              </div>
              <div className="border-l-4 border-black/40 pl-4">
                <h4 className="text-[15px] font-bold text-black/90">{t.gradeB}</h4>
                <p className="text-[14px] font-medium text-black/70">{t.gradeBVal}</p>
              </div>
              <div className="border-l-4 border-black/20 pl-4">
                <h4 className="text-[15px] font-bold text-black/90">{t.gradeC}</h4>
                <p className="text-[14px] font-medium text-black/70">{t.gradeCVal}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.courseTitle}</h2>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <h3 className="text-[15px] font-bold text-[#0B0073] mb-5 uppercase tracking-wide border-b border-black/10 pb-3">{t.mod1Title}</h3>
            <ul className="space-y-4">
              {t.mod1Items.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="text-[13px] font-bold text-black/40">{t.el} {i + 1}</span>
                  <span className={TEXT_BODY}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-[15px] font-bold text-[#0B0073] mb-5 uppercase tracking-wide border-b border-black/10 pb-3">{t.mod2Title}</h3>
            <ul className="space-y-4">
              {t.mod2Items.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="text-[13px] font-bold text-black/40">{t.el} {i + 5}</span>
                  <span className={TEXT_BODY}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.outcomesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
          {t.outcomes.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-transparent border border-black/10 rounded-[10px] hover:shadow-sm transition-shadow">
              <img src={`/assets/nebosh/${item.img}`} className="w-8 h-8 mt-1 opacity-80 object-contain shrink-0" alt="" />
              <span className="text-[13px] font-medium text-black/80 leading-relaxed">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex justify-center">
          <Button>{t.cta}</Button>
        </div>
      </section>
    </main>
  );
}
