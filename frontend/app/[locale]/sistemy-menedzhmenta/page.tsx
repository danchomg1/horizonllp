import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Button from "../../components/Button";
import ButtonWhite from "../../components/ButtonWhite";

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[15px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const content = {
  ru: {
    heroSubtitle: "Разработка и внедрение систем менеджмента по стандартам",
    heroTitle: "ISO 9001, 14001 и 45001",
    heroRight: "Обеспечиваем эффективность процессов управления за счет интеграции документальной базы и повышения компетентности персонала. Диагностика, разработка, сопровождение.",
    integTitle: "Интеграция стандартов в\nреальные бизнес-процессы",
    integDesc: "Эффективная система менеджмента — это баланс между регламентирующей документацией и квалификацией персонала. Подход Horizon исключает формальное отношение к стандартам. Мы выстраиваем архитектуру управления, которая функционирует на всех уровнях организации.",
    prioritiesTitle: "Наши приоритеты:",
    priorities: [
      { img: "icon-competence.png", title: "Компетентность владельцев процессов:", desc: "Мы не просто передаем инструкции, а обеспечиваем понимание методологии и целей сотрудниками, ответственными за результат." },
      { img: "icon-changes.png", title: "Управление изменениями:", desc: "Внедряемые механизмы направлены на реальное улучшение показателей качества, экологической безопасности и охраны труда." },
      { img: "icon-result.png", title: "Результативность:", desc: "Система разрабатывается с учетом жизненного цикла процессов, обеспечивая гибкость и оперативность реагирования." },
    ],
    dirTitle: "Направления внедрения и оптимизации",
    standards: [
      { title: "ISO 9001 (Системы менеджмента качества):", desc: "Оптимизация операционных процессов и повышение удовлетворенности потребителей." },
      { title: "ISO 14001 (Системы экологического менеджмента):", desc: "Системное управление экологическими аспектами и минимизация рисков." },
      { title: "ISO 45001 (Охрана здоровья и безопасность труда):", desc: "Обеспечение безопасных условий труда и превентивное управление профессиональными рисками." },
    ],
    dirNote: "Мы реализуем проекты как по внедрению интегрированных систем менеджмента (ИСМ), так и по отдельным стандартам в зависимости от задач бизнеса.",
    stepsTitle: "Этапы работы согласно внутреннему стандарту Horizon",
    steps: [
      { label: "1. Идентификация проблематики:", desc: "Определение текущих несоответствий и постановка стратегических целей внедрения." },
      { label: "2. Диагностический анализ:", desc: "Аудит существующих процессов управления и оценка их зрелости." },
      { label: "3. Разработка системных решений:", desc: "Проектирование и документирование системы менеджмента с учетом специфики отрасли." },
      { label: "4. Сопровождение внедрения:", desc: "Методическая поддержка при запуске процессов и интеграции стандартов в операционную деятельность." },
      { label: "5. Оценка результативности:", desc: "Анализ эффективности функционирования системы и корректирующие действия." },
    ],
    expertsTitle: "Формирование института внутренних экспертов",
    expertsDesc: "Ключевая задача Horizon — обеспечить автономность заказчика после завершения проекта. В рамках внедрения мы формируем пулл внутренних экспертов вашей компании.",
    experts: [
      { img: "icon-training.png", title: "Подготовка персонала:", desc: "Обучение внутренних аудиторов и владельцев процессов методам контроля и оценки." },
      { img: "icon-audit.png", title: "Стандартизация аудита:", desc: "Разработка внутренних критериев оценки эффективности, адаптированных под ваши задачи." },
      { img: "icon-certification.png", title: "Готовность к сертификации:", desc: "Обеспечение способности компании самостоятельно поддерживать соответствие требованиям внешних аудитов и непрерывно улучшать процессы." },
    ],
    resultLabel: "Результат:",
    resultDesc: "Заказчик получает действующую систему и компетентную команду для ее поддержания и развития.",
    cta: "Оставить заявку",
    cta2: "Заполнить форму",
  },
  en: {
    heroSubtitle: "Development and implementation of management systems to international standards",
    heroTitle: "ISO 9001, 14001 and 45001",
    heroRight: "We ensure the effectiveness of management processes through integration of the document base and improvement of personnel competence. Diagnostics, development, ongoing support.",
    integTitle: "Integrating standards into\nreal business processes",
    integDesc: "An effective management system is a balance between regulatory documentation and personnel competence. The Horizon approach rules out a purely formal attitude to standards. We build a management architecture that functions at all levels of the organisation.",
    prioritiesTitle: "Our priorities:",
    priorities: [
      { img: "icon-competence.png", title: "Competence of process owners:", desc: "We don't just hand over instructions — we ensure that employees responsible for results understand the methodology and objectives." },
      { img: "icon-changes.png", title: "Change management:", desc: "The mechanisms we implement are aimed at genuine improvement of quality, environmental safety and occupational health indicators." },
      { img: "icon-result.png", title: "Effectiveness:", desc: "The system is developed taking into account the lifecycle of processes, ensuring flexibility and responsiveness." },
    ],
    dirTitle: "Implementation and optimisation areas",
    standards: [
      { title: "ISO 9001 (Quality Management Systems):", desc: "Optimisation of operational processes and improvement of customer satisfaction." },
      { title: "ISO 14001 (Environmental Management Systems):", desc: "Systematic management of environmental aspects and risk minimisation." },
      { title: "ISO 45001 (Occupational Health and Safety):", desc: "Ensuring safe working conditions and preventive management of occupational risks." },
    ],
    dirNote: "We implement projects both for integrated management systems (IMS) and for individual standards depending on the business objectives.",
    stepsTitle: "Work stages according to the Horizon internal standard",
    steps: [
      { label: "1. Problem identification:", desc: "Defining current non-conformities and setting strategic implementation objectives." },
      { label: "2. Diagnostic analysis:", desc: "Auditing existing management processes and assessing their maturity." },
      { label: "3. Developing system solutions:", desc: "Designing and documenting the management system taking account of industry specifics." },
      { label: "4. Implementation support:", desc: "Methodological support during process launch and integration of standards into operations." },
      { label: "5. Performance assessment:", desc: "Analysing system effectiveness and taking corrective actions." },
    ],
    expertsTitle: "Building an internal expert community",
    expertsDesc: "Horizon's key task is to ensure the client's autonomy after the project is completed. As part of implementation we build a pool of internal experts within your organisation.",
    experts: [
      { img: "icon-training.png", title: "Personnel training:", desc: "Training internal auditors and process owners in monitoring and assessment methods." },
      { img: "icon-audit.png", title: "Audit standardisation:", desc: "Developing internal performance assessment criteria tailored to your requirements." },
      { img: "icon-certification.png", title: "Certification readiness:", desc: "Enabling the organisation to independently maintain compliance with external audit requirements and continually improve processes." },
    ],
    resultLabel: "Result:",
    resultDesc: "The client receives a functioning system and a competent team to maintain and develop it.",
    cta: "Submit Request",
    cta2: "Fill in the form",
  },
};

export default async function IsoManagementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = content[locale as 'ru' | 'en'] ?? content.ru;

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[15px] overflow-hidden">
          <Image src="/assets/iso/hero-bg.jpg" alt="ISO Management Systems" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#000000]/50"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-start items-start">
              <Image src="/assets/iso/hse-logo.png" alt="ISO Logo" width={120} height={50} className="object-contain" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-8">
              <div className="max-w-2xl">
                <p className="text-lg lg:text-[22px] font-medium text-white/90 leading-tight drop-shadow-md mb-2">{t.heroSubtitle}</p>
                <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-[1.1] mb-1 drop-shadow-lg">{t.heroTitle}</h1>
              </div>
              <p className="hidden lg:block text-[12px] text-white/90 max-w-[420px] leading-snug font-light text-left drop-shadow-md pb-1">{t.heroRight}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-1/2">
            <h2 className={`${TEXT_H2} whitespace-pre-line`}>{t.integTitle}</h2>
          </div>
          <div className="w-full md:w-1/2">
            <p className={TEXT_BODY}>{t.integDesc}</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-16 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.prioritiesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.priorities.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
              <img src={`/assets/iso/${item.img}`} className="h-10 w-auto mb-6 opacity-80 object-contain" alt="" />
              <h3 className={`${TEXT_H3} mb-2`}>{item.title}</h3>
              <p className="text-[12px] text-black/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.dirTitle}</h2>
        <div className="bg-transparent border border-black/20 rounded-[15px] p-8 lg:p-10 flex flex-col lg:flex-row gap-10 items-center lg:items-stretch">
          <div className="w-full lg:w-1/3 flex justify-center items-center border-b lg:border-b-0 lg:border-r border-black/10 pb-8 lg:pb-0 lg:pr-8">
            <img src="/assets/iso/iso-big-logo.png" alt="ISO Logo" className="w-[180px] lg:w-[220px] object-contain opacity-80" />
          </div>
          <div className="w-full lg:w-2/3 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {t.standards.map((item, i) => (
                <div key={i}>
                  <h4 className={`${TEXT_H3} mb-2`}>{item.title}</h4>
                  <p className="text-[11px] text-black/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-black/10">
              <p className="text-[11px] text-black/50 font-medium">{t.dirNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-10`}>{t.stepsTitle}</h2>
        <div className="flex flex-col">
          {t.steps.map((step, i) => (
            <div key={i} className={`flex flex-col md:flex-row py-5 border-t ${i === t.steps.length - 1 ? 'border-b' : ''} border-black/10 gap-4 md:gap-10`}>
              <div className="w-full md:w-1/3 font-semibold text-[14px] text-black/90">{step.label}</div>
              <div className="w-full md:w-2/3 text-[13px] text-black/70">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <div className="flex flex-col md:flex-row gap-10 items-start mb-10">
          <div className="w-full md:w-1/2">
            <h2 className={TEXT_H2}>{t.expertsTitle}</h2>
          </div>
          <div className="w-full md:w-1/2">
            <p className={TEXT_BODY}>{t.expertsDesc}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {t.experts.map((item, i) => (
            <div key={i} className="bg-transparent border border-black/50 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start min-h-[200px]">
              <img src={`/assets/iso/${item.img}`} className="h-10 w-auto mb-6 opacity-80 object-contain" alt="" />
              <h3 className={`${TEXT_H3} mb-2`}>{item.title}</h3>
              <p className="text-[12px] text-black/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-4 mb-16 px-2">
          <span className="text-[13px] text-black/50">{t.resultLabel}</span>
          <p className="text-[13px] text-black/90 font-medium">{t.resultDesc}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pb-10">
          <Button>{t.cta}</Button>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfycmEUau4ILUxGVh0Vgbt57-kIY9fS2e4aLNca6EbZPKagsA/viewform" target="_blank" rel="noopener noreferrer">
            <ButtonWhite noModal>{t.cta2}</ButtonWhite>
          </a>
        </div>
      </section>
    </main>
  );
}
