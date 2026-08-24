import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";
import { pick } from '../../lib/locale';

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[15px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroSubtitle: "Концепция «Нулевого травматизма»",
    heroDesc: "Курс разработан IOSH совместно с ISSA (International Social Security Association). В его основе лежит философия, что все несчастные случаи на производстве и профессиональные заболевания можно предотвратить, если подходить к этому системно.",
    heroRight: "Концепция Vision Zero строится на трех столпах: Безопасность (Safety), Здоровье (Health) и Благополучие (Wellbeing).",
    audTitle: "Для кого этот курс?",
    audIntro: "Этот курс предназначен для лидеров изменений — тех, кто формирует стратегию и культуру компании:",
    aud: [
      { title: "Топ-менеджеры и руководители:", desc: "Чтобы понять, как лидерство влияет на безопасность." },
      { title: "Специалисты по охране труда (HSE):", desc: "Чтобы получить инструменты для внедрения современной превентивной культуры." },
      { title: "Линейные менеджеры:", desc: "Чтобы научиться вовлекать своих людей в вопросы безопасности." },
    ],
    audLast: "Любой персонал, ответственный за формирование безопасной среды.",
    progTitle: "Программа курса",
    prog: [
      { icon: "icon-prog-what.png", title: "Что такое Vision Zero:", desc: "Введение в концепцию как превентивную стратегию." },
      { icon: "icon-prog-rules.png", title: "7 Золотых правил:", desc: "Глубокий разбор принципов." },
      { icon: "icon-prog-ben.png", title: "Преимущества внедрения:", desc: "Почему это выгодно бизнесу (репутация, снижение затрат, продуктивность)." },
      { icon: "icon-prog-action.png", title: "Обязательство и план действий:", desc: "Как превратить теорию в практику." },
    ],
    rulesTitle: "Семь \"Золотых правил\"",
    rulesIntro: "Это ядро курса. Вы не просто узнаете о них, но и проработаете каждое правило применительно к своей компании:",
    rules: [
      { img: "icon-rule-1.png", title: "Лидерство (Take leadership)", desc: "Руководитель должен демонстрировать приверженность безопасности своим примером." },
      { img: "icon-rule-2.png", title: "Выявление угроз (Identify hazards)", desc: "Систематический контроль рисков (не только физических, но и психосоциальных)." },
      { img: "icon-rule-3.png", title: "Определение целей (Define targets)", desc: "Разработка четких программ по безопасности." },
      { img: "icon-rule-4.png", title: "Создание системы безопасности (Ensure a safe system)", desc: "Высокий уровень организации процессов." },
      { img: "icon-rule-5.png", title: "Безопасность оборудования (Safety in machines)", desc: "Использование безопасных технологий и рабочих мест." },
      { img: "icon-rule-6.png", title: "Повышение квалификации (Improve qualifications)", desc: "Развитие компетенций сотрудников." },
      { img: "icon-rule-7.png", title: "Инвестиции в людей (Invest in people)", desc: "Мотивация через вовлечение персонала в принятие решений." },
    ],
    formatTitle: "Формат обучение и оценка",
    durTitle: "Длительность:", durDesc: "1 день (6 часов обучения).",
    methodTitle: "Методы:", methodDesc: "Лекции, интерактивные семинары, разбор кейсов (case-studies) и групповые обсуждения.",
    evalTitle: "Оценка (Action Plan):", evalDesc: "Вместо экзамена каждый участник разрабатывает Личный план действий, связанный с каждым из 7 Золотых правил.",
    evalNote: "Это конкретный список шагов, которые вы предпримете в своей организации, чтобы улучшить лидерство и культуру безопасности.",
    resultTitle: "Результат",
    resultDesc: "После завершения курса вы получаете сертификат IOSH и готовый стратегический план для внедрения Vision Zero в вашей компании.",
    cta: "Оставить заявку",
  },
  en: {
    heroSubtitle: "The Vision Zero Concept",
    heroDesc: "Developed by IOSH together with the ISSA (International Social Security Association), this course is based on the philosophy that all workplace accidents and occupational diseases can be prevented through a systematic approach.",
    heroRight: "The Vision Zero concept is built on three pillars: Safety, Health, and Wellbeing.",
    audTitle: "Who is this course for?",
    audIntro: "This course is designed for change leaders — those who shape company strategy and culture:",
    aud: [
      { title: "Top managers and executives:", desc: "To understand how leadership impacts safety." },
      { title: "HSE professionals:", desc: "To gain tools for implementing a modern preventive safety culture." },
      { title: "Line managers:", desc: "To learn how to engage their people in safety issues." },
    ],
    audLast: "Any personnel responsible for creating a safe environment.",
    progTitle: "Course Programme",
    prog: [
      { icon: "icon-prog-what.png", title: "What is Vision Zero:", desc: "An introduction to the concept as a preventive strategy." },
      { icon: "icon-prog-rules.png", title: "7 Golden Rules:", desc: "An in-depth exploration of the principles." },
      { icon: "icon-prog-ben.png", title: "Benefits of implementation:", desc: "Why it is good for business (reputation, cost reduction, productivity)." },
      { icon: "icon-prog-action.png", title: "Commitment and action plan:", desc: "How to turn theory into practice." },
    ],
    rulesTitle: "The Seven Golden Rules",
    rulesIntro: "This is the core of the course. You won't just learn about them — you will work through each rule as applied to your own company:",
    rules: [
      { img: "icon-rule-1.png", title: "Take leadership", desc: "A leader must demonstrate commitment to safety by personal example." },
      { img: "icon-rule-2.png", title: "Identify hazards", desc: "Systematic risk control (not only physical but also psychosocial risks)." },
      { img: "icon-rule-3.png", title: "Define targets", desc: "Develop clear safety programmes." },
      { img: "icon-rule-4.png", title: "Ensure a safe system", desc: "A high level of process organisation." },
      { img: "icon-rule-5.png", title: "Ensure safety in machines and equipment", desc: "Use of safe technologies and workplaces." },
      { img: "icon-rule-6.png", title: "Improve qualifications", desc: "Development of employee competencies." },
      { img: "icon-rule-7.png", title: "Invest in people", desc: "Motivation through involving personnel in decision-making." },
    ],
    formatTitle: "Training Format and Assessment",
    durTitle: "Duration:", durDesc: "1 day (6 hours of training).",
    methodTitle: "Methods:", methodDesc: "Lectures, interactive workshops, case-study analysis, and group discussions.",
    evalTitle: "Assessment (Action Plan):", evalDesc: "Instead of an exam, each participant develops a Personal Action Plan linked to each of the 7 Golden Rules.",
    evalNote: "This is a specific list of steps you will take in your organisation to improve leadership and safety culture.",
    resultTitle: "Result",
    resultDesc: "Upon completing the course you receive an IOSH certificate and a ready-made strategic plan for implementing Vision Zero in your organisation.",
    cta: "Submit Request",
  },

  kz: {
    heroSubtitle: "Нөлдік жарақаттану тұжырымдамасы",
    heroDesc: "Курсты IOSH пен ISSA (International Social Security Association) бірлесіп әзірлеген. Оның негізінде өндірістегі барлық жазатайым оқиға мен кәсіптік ауруды жүйелі тәсілмен болдырмауға болады деген философия жатыр.",
    heroRight: "Vision Zero тұжырымдамасы үш тірекке негізделген: Қауіпсіздік (Safety), Денсаулық (Health) және Әл-ауқат (Wellbeing).",
    audTitle: "Бұл курс кімге арналған?",
    audIntro: "Бұл курс өзгеріс көшбасшыларына — компанияның стратегиясы мен мәдениетін қалыптастыратындарға арналған:",
    aud: [
      { title: "Жоғары басшылық және басшылар:", desc: "Көшбасшылықтың қауіпсіздікке қалай әсер ететінін түсіну үшін." },
      { title: "Еңбекті қорғау мамандары (HSE):", desc: "Заманауи алдын алу мәдениетін енгізу құралдарын алу үшін." },
      { title: "Желілік менеджерлер:", desc: "Өз адамдарын қауіпсіздік мәселелеріне тарту үшін." },
    ],
    audLast: "Қауіпсіз ортаны қалыптастыруға жауапты кез келген қызметкер.",
    progTitle: "Курс бағдарламасы",
    prog: [
      { icon: "icon-prog-what.png", title: "Vision Zero дегеніміз не:", desc: "Тұжырымдамаға алдын алу стратегиясы ретінде кіріспе." },
      { icon: "icon-prog-rules.png", title: "7 Алтын қағида:", desc: "Қағидаттарды терең талдау." },
      { icon: "icon-prog-ben.png", title: "Енгізудің артықшылықтары:", desc: "Бұл бизнеске неге тиімді (репутация, шығынды азайту, өнімділік)." },
      { icon: "icon-prog-action.png", title: "Міндеттеме және іс-қимыл жоспары:", desc: "Теорияны практикаға қалай айналдыруға болады." },
    ],
    rulesTitle: "Жеті \"Алтын қағида\"",
    rulesIntro: "Бұл курстың өзегі. Сіз олар туралы білуден басқа, әрбір қағиданы өз компанияңызға қатысты пысықтайсыз:",
    rules: [
      { img: "icon-rule-1.png", title: "Көшбасшылық (Take leadership)", desc: "Басшы қауіпсіздікке берілгендігін өз үлгісімен көрсетуі керек." },
      { img: "icon-rule-2.png", title: "Қауіптерді анықтау (Identify hazards)", desc: "Қауіптерді жүйелі бақылау (тек физикалық емес, психоәлеуметтік те)." },
      { img: "icon-rule-3.png", title: "Мақсаттарды белгілеу (Define targets)", desc: "Қауіпсіздік бойынша нақты бағдарламалар әзірлеу." },
      { img: "icon-rule-4.png", title: "Қауіпсіздік жүйесін құру (Ensure a safe system)", desc: "Процестерді ұйымдастырудың жоғары деңгейі." },
      { img: "icon-rule-5.png", title: "Жабдық қауіпсіздігі (Safety in machines)", desc: "Қауіпсіз технологиялар мен жұмыс орындарын пайдалану." },
      { img: "icon-rule-6.png", title: "Біліктілікті арттыру (Improve qualifications)", desc: "Қызметкерлердің құзыреттерін дамыту." },
      { img: "icon-rule-7.png", title: "Адамдарға инвестиция (Invest in people)", desc: "Персоналды шешім қабылдауға тарту арқылы мотивациялау." },
    ],
    formatTitle: "Оқыту форматы және бағалау",
    durTitle: "Ұзақтығы:", durDesc: "1 күн (6 сағат оқу).",
    methodTitle: "Әдістер:", methodDesc: "Дәрістер, интерактивті семинарлар, кейстерді талдау (case-studies) және топтық талқылаулар.",
    evalTitle: "Бағалау (Action Plan):", evalDesc: "Емтиханның орнына әрбір қатысушы 7 Алтын қағиданың әрқайсысымен байланысты Жеке іс-қимыл жоспарын әзірлейді.",
    evalNote: "Бұл көшбасшылық пен қауіпсіздік мәдениетін жақсарту үшін өз ұйымыңызда жасайтын нақты қадамдар тізімі.",
    resultTitle: "Нәтиже",
    resultDesc: "Курс аяқталғаннан кейін сіз IOSH сертификатын және компанияңызда Vision Zero енгізуге арналған дайын стратегиялық жоспар аласыз.",
    cta: "Өтінім қалдыру",
  },
};

export default async function IoshVisionZeroPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pick(content, locale);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/iosh-vision-zero/hero-bg.jpg" alt="IOSH Vision Zero" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start"><Image src="/assets/iosh-vision-zero/hse-logo.png" alt="IOSH" width={120} height={50} className="object-contain" /></div>
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-3xl">
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">IOSH Vision Zero</h1>
                <p className="text-xl lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">{t.heroSubtitle}</p>
                <p className="text-lg lg:text-[16px] font-normal text-white/80 leading-snug drop-shadow-md">{t.heroDesc}</p>
              </div>
              <p className="hidden lg:block text-[13px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">{t.heroRight}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/3">
            <h2 className={`${TEXT_H2} mb-6`}>{t.audTitle}</h2>
            <p className={`${TEXT_BODY} mb-6`}>{t.audIntro}</p>
            <ul className="space-y-4">
              {t.aud.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                  <div><span className="text-[14px] font-bold text-black/90 block">{item.title}</span><span className={TEXT_BODY}>{item.desc}</span></div>
                </li>
              ))}
              <li className="flex gap-4 items-start">
                <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                <span className="text-[14px] font-medium text-black/80">{t.audLast}</span>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className={`${TEXT_H2} mb-8`}>{t.progTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.prog.map((item, i) => (
                <div key={i} className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow flex items-start gap-4">
                  <img src={`/assets/iosh-vision-zero/${item.icon}`} className="w-8 h-8 opacity-80 mt-1 shrink-0" alt="" />
                  <div><h4 className="text-[14px] font-bold text-[#0B0073] mb-1">{item.title}</h4><p className={TEXT_BODY}>{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-24 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>{t.rulesTitle}</h2>
        <p className={`${TEXT_BODY} mb-10 max-w-2xl`}>{t.rulesIntro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.rules.map((rule, i) => (
            <div key={i} className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
              <img src={`/assets/iosh-vision-zero/${rule.img}`} className="w-10 h-10 mb-4 opacity-80" alt="" />
              <h3 className={`${TEXT_H3} mb-2`}>{rule.title}</h3>
              <p className="text-[11px] text-black/60 leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-24 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.formatTitle}</h2>
        <div className="flex flex-col md:flex-row gap-12 border-l-4 border-[#0B0073] pl-8 py-2">
          {[
            { icon: "icon-format-time.png", title: t.durTitle, desc: t.durDesc },
            { icon: "icon-format-method.png", title: t.methodTitle, desc: t.methodDesc },
            { icon: "icon-format-plan.png", title: t.evalTitle, desc: t.evalDesc },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-2"><img src={`/assets/iosh-vision-zero/${item.icon}`} className="w-6 h-6 opacity-80" alt="" /><h3 className={TEXT_H3}>{item.title}</h3></div>
              <p className={TEXT_BODY}>{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] font-normal text-black/60 italic max-w-3xl pl-12">{t.evalNote}</p>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <div className="bg-[#0B0073]/5 rounded-[15px] p-10 flex flex-col md:flex-row items-center gap-10">
          <img src="/assets/iosh-vision-zero/icon-result-strat.png" className="w-16 h-16 opacity-90 shrink-0" alt="" />
          <div><h2 className={`${TEXT_H2} mb-4`}>{t.resultTitle}</h2><p className="text-[15px] font-medium text-black/80">{t.resultDesc}</p></div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex justify-center"><Button>{t.cta}</Button></div>
      </section>
    </main>
  );
}
