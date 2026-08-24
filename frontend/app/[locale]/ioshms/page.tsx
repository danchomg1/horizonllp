import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";
import { pick } from '../../lib/locale';

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[15px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroSubtitle: "Безопасное управление",
    heroDesc: "Это курс для руководителей, который дает им практические инструменты для управления рисками и ресурсами в их командах.",
    audTitle: "Для кого этот курс?",
    audItems: ["Курс разработан для линейных менеджеров, руководителей отделов, бригадиров и тимлидов в любом секторе и любой организации.", "Вам не нужно быть экспертом по безопасности, чтобы пройти его.", "Он подходит для тех, кто несет ответственность за других людей или процессы."],
    whyTitle: "Зачем это нужно?",
    forCompany: "Для компании",
    comp: [
      { icon: "icon-comp-cost.png", title: "Снижение затрат:", desc: "Меньше аварий и больничных = меньше финансовых потерь." },
      { icon: "icon-comp-legal.png", title: "Юридическая защита:", desc: "Доказательство того, что ваши менеджеры компетентны." },
      { icon: "icon-comp-intl.png", title: "Международный статус:", desc: "Сертификат IOSH признается во всем мире." },
    ],
    forManager: "Для сотрудника (менеджера)",
    mgr: [
      { icon: "icon-mgr-resp.png", title: "Понимание ответственности:", desc: "Вы точно будете знать, за что отвечаете вы." },
      { icon: "icon-mgr-skills.png", title: "Практические навыки:", desc: "Вы научитесь оценивать риски и расследовать инциденты." },
      { icon: "icon-mgr-career.png", title: "Карьера:", desc: "Международный сертификат повышает вашу ценность." },
    ],
    progTitle: "Программа курса (7 модулей)",
    progIntro: "Программа построена логично, шаг за шагом превращая менеджера в лидера безопасности:",
    modules: [
      { img: "icon-mod-1.png", title: "Введение в безопасное управление", desc: "Почему безопасность важна не только морально, но и финансово. Роль менеджера." },
      { img: "icon-mod-2.png", title: "Оценка рисков", desc: "Ключевой модуль. Разница между «опасностью» и «риском». Матрица рисков (5x5)." },
      { img: "icon-mod-3.png", title: "Контроль рисков", desc: "Как выбирать меры защиты? Иерархия контроля. Понятие «разумно практикуемо»." },
      { img: "icon-mod-4.png", title: "Понимание ответственности", desc: "Обзор законодательства (гражданское и уголовное право). Требования закона." },
      { img: "icon-mod-5.png", title: "Понимание опасностей", desc: "Обзор угроз: механические, физические, химические, биологические и др." },
      { img: "icon-mod-6.png", title: "Расследование происшествий", desc: "Важность расследования «почти случившихся» аварий. Поиск коренной причины." },
      { img: "icon-mod-7.png", title: "Измерение эффективности", desc: "Как понять, что система работает? Активный и реактивный мониторинг." },
    ],
    formatTitle: "Формат обучения и экзамена",
    durTitle: "Длительность:", durDesc: "Интенсивный курс, который обычно занимает 3-4 дня (около 22-24 часов обучения).",
    evalTitle: "Оценка (2 этапа):",
    evalDesc1: "Тест: 45 минут, 30 вопросов. Минимум 36 из 60 баллов.",
    evalDesc2: "Практический проект: Оценка рисков на реальном рабочем месте в течение 2 недель.",
    resultTitle: "Результат",
    resultDesc: "После успешной сдачи теста и проекта вы получаете сертификат IOSH Managing Safely, который не имеет срока давности (хотя рекомендуется проходить рефреш-курсы каждые 3 года).",
    cta: "Оставить заявку",
  },
  en: {
    heroSubtitle: "Managing Safely",
    heroDesc: "A course for managers that equips them with practical tools for managing risks and resources within their teams.",
    audTitle: "Who is this course for?",
    audItems: ["The course is designed for line managers, department heads, supervisors, and team leaders in any sector and any organisation.", "You don't need to be a safety expert to take it.", "It is suitable for those who are responsible for other people or processes."],
    whyTitle: "Why is this needed?",
    forCompany: "For the Company",
    comp: [
      { icon: "icon-comp-cost.png", title: "Cost Reduction:", desc: "Fewer accidents and sick days = fewer financial losses." },
      { icon: "icon-comp-legal.png", title: "Legal Protection:", desc: "Proof that your managers are competent." },
      { icon: "icon-comp-intl.png", title: "International Status:", desc: "IOSH certificate is recognised worldwide." },
    ],
    forManager: "For the Employee (Manager)",
    mgr: [
      { icon: "icon-mgr-resp.png", title: "Understanding Responsibilities:", desc: "You will know exactly what you are responsible for." },
      { icon: "icon-mgr-skills.png", title: "Practical Skills:", desc: "You will learn to assess risks and investigate incidents." },
      { icon: "icon-mgr-career.png", title: "Career:", desc: "An international certificate increases your value." },
    ],
    progTitle: "Course Programme (7 Modules)",
    progIntro: "The programme is logically structured, step by step turning a manager into a safety leader:",
    modules: [
      { img: "icon-mod-1.png", title: "Introducing managing safely", desc: "Why safety matters — not just morally but financially. The manager's role." },
      { img: "icon-mod-2.png", title: "Assessing risks", desc: "Key module. The difference between 'hazard' and 'risk'. Risk matrix (5x5)." },
      { img: "icon-mod-3.png", title: "Controlling risks", desc: "How to select control measures? Hierarchy of controls. The concept of 'reasonably practicable'." },
      { img: "icon-mod-4.png", title: "Understanding responsibilities", desc: "Overview of legislation (civil and criminal law). Legal requirements." },
      { img: "icon-mod-5.png", title: "Understanding hazards", desc: "Overview of threats: mechanical, physical, chemical, biological and others." },
      { img: "icon-mod-6.png", title: "Investigating incidents", desc: "The importance of investigating near-misses. Finding the root cause." },
      { img: "icon-mod-7.png", title: "Measuring performance", desc: "How do you know the system is working? Active and reactive monitoring." },
    ],
    formatTitle: "Training Format and Assessment",
    durTitle: "Duration:", durDesc: "An intensive course that typically takes 3–4 days (approximately 22–24 hours of training).",
    evalTitle: "Assessment (2 stages):",
    evalDesc1: "Test: 45 minutes, 30 questions. Minimum 36 out of 60 marks.",
    evalDesc2: "Practical project: A risk assessment at a real workplace over 2 weeks.",
    resultTitle: "Result",
    resultDesc: "After successfully passing the test and project, you receive the IOSH Managing Safely certificate, which has no expiry date (although refresher courses are recommended every 3 years).",
    cta: "Submit Request",
  },

  kz: {
    heroSubtitle: "Қауіпсіз басқару",
    heroDesc: "Бұл басшыларға арналған курс: ол командадағы қауіптер мен ресурстарды басқарудың практикалық құралдарын береді.",
    audTitle: "Бұл курс кімге арналған?",
    audItems: ["Курс кез келген сала мен ұйымдағы желілік менеджерлерге, бөлім басшыларына, бригадирлер мен тимлидтерге арналған.", "Оны өту үшін қауіпсіздік бойынша сарапшы болу қажет емес.", "Ол басқа адамдар немесе процестер үшін жауапты тұлғаларға жарамды."],
    whyTitle: "Бұл не үшін керек?",
    forCompany: "Компания үшін",
    comp: [
      { icon: "icon-comp-cost.png", title: "Шығындарды азайту:", desc: "Авария мен еңбекке жарамсыздық аз болса, қаржылық шығын да аз." },
      { icon: "icon-comp-legal.png", title: "Құқықтық қорғау:", desc: "Менеджерлеріңіздің құзыретті екенін растайтын дәлел." },
      { icon: "icon-comp-intl.png", title: "Халықаралық мәртебе:", desc: "IOSH сертификаты бүкіл әлемде танылады." },
    ],
    forManager: "Қызметкер (менеджер) үшін",
    mgr: [
      { icon: "icon-mgr-resp.png", title: "Жауапкершілікті түсіну:", desc: "Нақты неге жауап беретініңізді білесіз." },
      { icon: "icon-mgr-skills.png", title: "Практикалық дағдылар:", desc: "Қауіптерді бағалауды және оқыс оқиғаларды тергеуді үйренесіз." },
      { icon: "icon-mgr-career.png", title: "Мансап:", desc: "Халықаралық сертификат сіздің құндылығыңызды арттырады." },
    ],
    progTitle: "Курс бағдарламасы (7 модуль)",
    progIntro: "Бағдарлама қадам-қадаммен менеджерді қауіпсіздік көшбасшысына айналдыратындай логикалық құрылған:",
    modules: [
      { img: "icon-mod-1.png", title: "Қауіпсіз басқаруға кіріспе", desc: "Қауіпсіздік неге тек моральдық қана емес, қаржылық тұрғыдан да маңызды. Менеджердің рөлі." },
      { img: "icon-mod-2.png", title: "Қауіптерді бағалау", desc: "Негізгі модуль. Қауіп пен қауіптіліктің айырмашылығы. Қауіптер матрицасы (5x5)." },
      { img: "icon-mod-3.png", title: "Қауіптерді бақылау", desc: "Қорғау шараларын қалай таңдау керек? Бақылау иерархиясы. Ақылға сыйымды практика ұғымы." },
      { img: "icon-mod-4.png", title: "Жауапкершілікті түсіну", desc: "Заңнамаға шолу (азаматтық және қылмыстық құқық). Заң талаптары." },
      { img: "icon-mod-5.png", title: "Қауіптерді түсіну", desc: "Қауіптерге шолу: механикалық, физикалық, химиялық, биологиялық және басқалары." },
      { img: "icon-mod-6.png", title: "Оқыс оқиғаларды тергеу", desc: "Болуға шақ қалған аварияларды тергеудің маңызы. Түбегейлі себепті іздеу." },
      { img: "icon-mod-7.png", title: "Тиімділікті өлшеу", desc: "Жүйенің жұмыс істеп тұрғанын қалай білуге болады? Белсенді және реактивті мониторинг." },
    ],
    formatTitle: "Оқыту және емтихан форматы",
    durTitle: "Ұзақтығы:", durDesc: "Әдетте 3-4 күнді алатын қарқынды курс (шамамен 22-24 сағат оқу).",
    evalTitle: "Бағалау (2 кезең):",
    evalDesc1: "Тест: 45 минут, 30 сұрақ. 60 балдың кемінде 36-сы.",
    evalDesc2: "Практикалық жоба: 2 апта ішінде нақты жұмыс орнындағы қауіптерді бағалау.",
    resultTitle: "Нәтиже",
    resultDesc: "Тест пен жобаны сәтті тапсырғаннан кейін сіз ескіру мерзімі жоқ IOSH Managing Safely сертификатын аласыз (дегенмен әрбір 3 жылда жаңарту курсынан өту ұсынылады).",
    cta: "Өтінім қалдыру",
  },
};

export default async function IoshManagingSafelyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pick(content, locale);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/iosh-managing-safely/hero-bg.jpg" alt="IOSH Managing Safely" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#0B0073]/80"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start"><Image src="/assets/iosh-managing-safely/hse-logo.svg" alt="IOSH" width={120} height={50} className="object-contain" /></div>
            <div className="max-w-3xl">
              <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-2 drop-shadow-lg">IOSH Managing Safely</h1>
              <p className="text-xl lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">{t.heroSubtitle}</p>
              <p className="text-lg lg:text-[16px] font-normal text-white/80 leading-snug drop-shadow-md">{t.heroDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/3">
            <h2 className={`${TEXT_H2} mb-6`}>{t.audTitle}</h2>
            {t.audItems.map((item, i) => (
              <div key={i} className="flex gap-4 items-start mb-6">
                <span className="w-2 h-2 rounded-full bg-[#0B0073] mt-2 shrink-0"></span>
                <p className={TEXT_BODY}>{item}</p>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className={`${TEXT_H2} mb-8`}>{t.whyTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-[13px] font-bold text-black/40 uppercase tracking-widest mb-4">{t.forCompany}</h3>
                <ul className="space-y-4">
                  {t.comp.map((item, i) => (
                    <li key={i} className="flex gap-3 items-center bg-transparent border border-black/10 rounded-[12px] p-4">
                      <img src={`/assets/iosh-managing-safely/${item.icon}`} className="w-8 h-8 opacity-80" alt="" />
                      <div><span className="text-[13px] font-bold block">{item.title}</span><span className="text-[11px] opacity-60">{item.desc}</span></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-black/40 uppercase tracking-widest mb-4">{t.forManager}</h3>
                <ul className="space-y-4">
                  {t.mgr.map((item, i) => (
                    <li key={i} className="flex gap-3 items-center bg-transparent border border-black/10 rounded-[12px] p-4">
                      <img src={`/assets/iosh-managing-safely/${item.icon}`} className="w-8 h-8 opacity-80" alt="" />
                      <div><span className="text-[13px] font-bold block">{item.title}</span><span className="text-[11px] opacity-60">{item.desc}</span></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-4`}>{t.progTitle}</h2>
        <p className={`${TEXT_BODY} mb-10`}>{t.progIntro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.modules.map((mod, i) => (
            <div key={i} className="bg-transparent border border-black/20 rounded-[15px] p-6 hover:shadow-md transition-shadow">
              <img src={`/assets/iosh-managing-safely/${mod.img}`} className="w-10 h-10 mb-4 opacity-80" alt="" />
              <h3 className={`${TEXT_H3} mb-2`}>{mod.title}</h3>
              <p className="text-[11px] text-black/60 leading-relaxed">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.formatTitle}</h2>
        <div className="flex flex-col md:flex-row gap-12 border-l-4 border-[#0B0073] pl-8 py-2">
          <div>
            <div className="flex items-center gap-3 mb-2"><img src="/assets/iosh-managing-safely/icon-format-time.png" className="w-6 h-6 opacity-80" alt="" /><h3 className={TEXT_H3}>{t.durTitle}</h3></div>
            <p className={TEXT_BODY}>{t.durDesc}</p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2"><img src="/assets/iosh-managing-safely/icon-format-eval.png" className="w-6 h-6 opacity-80" alt="" /><h3 className={TEXT_H3}>{t.evalTitle}</h3></div>
            <p className={TEXT_BODY}><b>{locale === 'en' ? 'Test:' : 'Тест:'}</b> {t.evalDesc1.replace(/^Тест: |^Test: /, '')}</p>
            <p className={TEXT_BODY}><b>{locale === 'en' ? 'Practical project:' : 'Практический проект:'}</b> {t.evalDesc2.replace(/^Практический проект: |^Practical project: /, '')}</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 mb-16 px-4">
        <div className="bg-[#0B0073]/5 rounded-[15px] p-8 flex flex-col items-center text-center">
          <img src="/assets/iosh-managing-safely/icon-result-cert.png" className="w-16 h-16 mb-6 opacity-90" alt="" />
          <h2 className={`${TEXT_H2} mb-4`}>{t.resultTitle}</h2>
          <p className="text-[14px] font-medium text-black/80 max-w-2xl">{t.resultDesc}</p>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4 pb-10">
        <div className="flex justify-center"><Button>{t.cta}</Button></div>
      </section>
    </main>
  );
}
