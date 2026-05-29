"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Button from "../../components/Button";

const TEXT_H2 = "text-[22px] lg:text-[26px] font-semibold text-black opacity-90 leading-tight";
const TEXT_H3 = "text-[14px] font-bold text-black opacity-90 leading-snug";
const TEXT_BODY = "text-[12px] lg:text-[13px] font-normal text-black opacity-80 leading-relaxed";

const accreditations = {
  ru: [
    { id: "post", navLogo: "/assets/about/logo-post.png", cardLogo: "/assets/about/logo-post.png", title: "NOCN (National Open College Network)", desc: "Ведущий независимый британский образовательный фонд и центр оценки профессиональных квалификаций. Организация разрабатывает передовые мировые стандарты и сертифицирует практические компетенции специалистов в строительной, инженерной и производственной отраслях. Статус независимого института гарантирует строгую объективность оценки, поэтому сертификаты NOCN признаются работодателями по всему миру как знак высочайшего качества и реального профессионализма." },
    { id: "nebosh", navLogo: "/assets/about/logo-nebosh.png", cardLogo: "/assets/about/logo-nebosh.png", title: "NEBOSH (National Examination Board in Occupational Safety and Health)", desc: "Это ведущая британская экзаменационная комиссия, устанавливающая мировые стандарты в области охраны труда, промышленной безопасности и экологии. Организация разрабатывает учебные программы и выдает престижные международные сертификаты, которые признаются «золотым стандартом» для специалистов HSE по всему миру." },
    { id: "iosh", navLogo: "/assets/about/logo-iosh.png", cardLogo: "/assets/about/logo-iosh.png", title: "IOSH (Institution of Occupational Safety and Health)", desc: "Крупнейшая в мире профессиональная организация специалистов по охране труда. Сертификация IOSH подтверждает высокий уровень знаний в управлении профессиональными рисками на рабочих местах." },
    { id: "iecex", navLogo: "/assets/about/logo-iecex.png", cardLogo: "/assets/about/logo-iecex.png", title: "IECEx (International Electrotechnical Commission System)", desc: "Международная система сертификации оборудования для использования во взрывоопасных средах. Гарантирует высочайший уровень безопасности при работе в зонах повышенного риска." },
    { id: "compex", navLogo: "/assets/about/logo-compex.png", cardLogo: "/assets/about/logo-compex.png", title: "CompEx (Competence in Ex atmospheres)", desc: "Международная схема признания компетентности персонала, работающего во взрывоопасных средах. Обучение и сертификация направлены на предотвращение аварий на объектах энергетики." },
    { id: "rospa", navLogo: "/assets/about/logo-rospa.png", cardLogo: "/assets/about/logo-rospa.png", title: "RoSPA (The Royal Society for the Prevention of Accidents)", desc: "Королевское общество по предотвращению несчастных случаев. Аккредитация RoSPA подтверждает приверженность компании высочайшим стандартам безопасности и непрерывному улучшению." },
  ],
  en: [
    { id: "post", navLogo: "/assets/about/logo-post.png", cardLogo: "/assets/about/logo-post.png", title: "NOCN (National Open College Network)", desc: "A leading independent British educational foundation and professional qualification awarding body. NOCN develops world-class standards and certifies practical competencies of specialists in construction, engineering, and manufacturing. As an independent institution, NOCN guarantees rigorous objectivity, making its certificates globally recognised as a mark of quality and true professionalism." },
    { id: "nebosh", navLogo: "/assets/about/logo-nebosh.png", cardLogo: "/assets/about/logo-nebosh.png", title: "NEBOSH (National Examination Board in Occupational Safety and Health)", desc: "The UK's leading examination board setting global standards in occupational health, safety, and environmental management. NEBOSH develops curricula and awards prestigious international certificates regarded as the 'gold standard' for HSE professionals worldwide." },
    { id: "iosh", navLogo: "/assets/about/logo-iosh.png", cardLogo: "/assets/about/logo-iosh.png", title: "IOSH (Institution of Occupational Safety and Health)", desc: "The world's largest professional body for health and safety practitioners. IOSH certification demonstrates a high level of competence in managing occupational risks in the workplace." },
    { id: "iecex", navLogo: "/assets/about/logo-iecex.png", cardLogo: "/assets/about/logo-iecex.png", title: "IECEx (International Electrotechnical Commission System)", desc: "The international certification system for equipment used in explosive atmospheres. Ensures the highest levels of safety when working in hazardous areas." },
    { id: "compex", navLogo: "/assets/about/logo-compex.png", cardLogo: "/assets/about/logo-compex.png", title: "CompEx (Competence in Ex atmospheres)", desc: "An international scheme for recognising the competence of personnel working in explosive atmospheres. Training and certification focus on accident prevention at energy facilities." },
    { id: "rospa", navLogo: "/assets/about/logo-rospa.png", cardLogo: "/assets/about/logo-rospa.png", title: "RoSPA (The Royal Society for the Prevention of Accidents)", desc: "The Royal Society for the Prevention of Accidents. RoSPA accreditation demonstrates an organisation's commitment to the highest safety standards and continuous improvement." },
  ],
};

const content = {
  ru: {
    heroText: 'Казахстанская компания, работающая в области промышленной безопасности, охраны труда, аварийного реагирования и взрывозащиты с 2007 года. Мы помогаем предприятиям снижать производственные риски, повышать устойчивость бизнеса и формировать зрелую культуру безопасности на основе международных стандартов и лучших отраслевых практик.',
    keyDirections: 'Ключевые направления и отрасли',
    dir1Title: 'Обучение и развитие компетенций персонала', dir1Desc: 'Подготовка специалистов по мировым стандартам (NEBOSH, IOSH, OPITO, CompEx) и авторским курсам, основанным на реальном полевом опыте наших экспертов.',
    dir2Title: 'Инженерные и инспекционные услуги', dir2Desc: 'Профессиональный аудит, технические инспекции и инженерное сопровождение промышленных объектов на всех стадиях их жизненного цикла.',
    dir3Title: 'Консалтинг в области БиОТ и процессной безопасности', dir3Desc: 'Разработка стратегий и внедрение комплексных систем управления безопасностью, полностью адаптированных под специфику и задачи вашего бизнеса.',
    expTitle: 'Опыт и аккредитации',
    expDesc: 'Казахстанская компания, работающая в области промышленной безопасности, охраны труда, аварийного реагирования и взрывозащиты с 2007 года. Мы помогаем предприятиям снижать производственные риски, повышать устойчивость бизнеса и формировать зрелую культуру безопасности на основе международных стандартов и лучших отраслевых практик.',
    missionTitle: 'Наша миссия',
    missionText: '— развитие культуры безопасности и внедрение современных подходов к управлению рисками, которые защищают людей, активы и окружающую среду, обеспечивая устойчивое развитие предприятий и отраслей в целом.',
    cta: 'Оставить заявку',
  },
  en: {
    heroText: 'A Kazakhstan-based company operating in the field of industrial safety, occupational health, emergency response, and explosion protection since 2007. We help enterprises reduce operational risks, strengthen business resilience, and build a mature safety culture based on international standards and best industry practices.',
    keyDirections: 'Key Areas & Industries',
    dir1Title: 'Personnel Training & Competency Development', dir1Desc: 'Training specialists to world-class standards (NEBOSH, IOSH, OPITO, CompEx) and proprietary courses based on our experts\' real-world field experience.',
    dir2Title: 'Engineering & Inspection Services', dir2Desc: 'Professional auditing, technical inspections, and engineering support for industrial facilities at all stages of their lifecycle.',
    dir3Title: 'HSE & Process Safety Consulting', dir3Desc: 'Developing strategies and implementing comprehensive safety management systems fully tailored to the specifics and objectives of your business.',
    expTitle: 'Experience & Accreditations',
    expDesc: 'A Kazakhstan-based company operating in industrial safety, occupational health, emergency response, and explosion protection since 2007. We help enterprises reduce production risks, improve business resilience, and develop a mature safety culture based on international standards and best practices.',
    missionTitle: 'Our Mission',
    missionText: '— to develop a safety culture and implement modern risk management approaches that protect people, assets and the environment, ensuring sustainable development of enterprises and industries as a whole.',
    cta: 'Submit Request',
  },
};

export default function AboutPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ru';
  const t = content[locale as 'ru' | 'en'] ?? content.ru;
  const accrs = accreditations[locale as 'ru' | 'en'] ?? accreditations.ru;
  const [activeAccreditation, setActiveAccreditation] = useState(0);

  return (
    <main className="bg-[#F4F4F4] min-h-screen pb-20">
      <section className="w-full max-w-[1280px] mx-auto pt-[80px] px-4">
        <div className="relative w-full h-[450px] lg:h-[500px] rounded-[15px] overflow-hidden">
          <Image src="/assets/about/hero-bg.jpg" alt="Horizon Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10">
            <div className="flex justify-end">
              <h1 className="text-3xl lg:text-[42px] font-bold text-white leading-tight drop-shadow-md">Horizon INC</h1>
            </div>
            <div className="flex flex-col items-start max-w-[700px]">
              <Image src="/assets/about/horizon-logo-white.png" alt="Horizon Logo" width={70} height={30} className="object-contain mb-6" />
              <p className="text-[13px] lg:text-[15px] text-white/95 leading-relaxed font-medium drop-shadow-md">
                {t.heroText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-10`}>{t.keyDirections}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start">
            <img src="/assets/about/icon-training.png" className="h-14 w-auto mb-6 object-contain" alt="Training" />
            <h3 className={`${TEXT_H3} mb-3`}>{t.dir1Title}</h3>
            <p className={TEXT_BODY}>{t.dir1Desc}</p>
          </div>
          <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start">
            <img src="/assets/about/icon-engineering.png" className="h-14 w-auto mb-6 object-contain" alt="Engineering" />
            <h3 className={`${TEXT_H3} mb-3`}>{t.dir2Title}</h3>
            <p className={TEXT_BODY}>{t.dir2Desc}</p>
          </div>
          <div className="bg-transparent border border-black/30 rounded-[15px] p-8 hover:shadow-md transition-shadow flex flex-col items-start">
            <img src="/assets/about/icon-consulting.png" className="h-14 w-auto mb-6 object-contain" alt="Consulting" />
            <h3 className={`${TEXT_H3} mb-3`}>{t.dir3Title}</h3>
            <p className={TEXT_BODY}>{t.dir3Desc}</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-20 px-4">
        <h2 className={`${TEXT_H2} mb-8`}>{t.expTitle}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className={TEXT_BODY}>{t.expDesc}</p>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
              {accrs.map((item, index) => (
                <div key={item.id} onMouseEnter={() => setActiveAccreditation(index)}
                  className={`cursor-pointer transition-all duration-300 ease-in-out ${activeAccreditation === index ? 'opacity-100 scale-110 filter drop-shadow-md' : 'opacity-40 hover:opacity-80 grayscale hover:grayscale-0'}`}>
                  <img src={item.navLogo} alt={item.id} className="h-10 object-contain" />
                </div>
              ))}
            </div>
            <div className="bg-transparent border border-black/30 rounded-[15px] p-6 flex flex-col md:flex-row items-center md:items-start gap-6 min-h-[160px] transition-all duration-300">
              <div className="h-20 w-32 shrink-0 flex justify-center items-center">
                <img src={accrs[activeAccreditation].cardLogo} alt={accrs[activeAccreditation].title} className="max-h-full max-w-full object-contain" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-black mb-2">{accrs[activeAccreditation].title}</h4>
                <p className="text-[11px] lg:text-[12px] text-black/80 leading-relaxed">{accrs[activeAccreditation].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto mt-24 mb-16 px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-20">
          <div className="shrink-0">
            <img src="/assets/about/horizon-logo-dark.png" alt="Horizon Logo Dark" className="w-[90px] lg:w-[110px] object-contain" />
          </div>
          <div className="flex flex-col md:flex-row gap-4 lg:gap-10 items-start">
            <h2 className={`${TEXT_H2} shrink-0`}>{t.missionTitle}</h2>
            <p className={`${TEXT_BODY} max-w-[600px] mt-1`}>{t.missionText}</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1240px] mx-auto px-4 flex justify-center pb-10">
        <Button>{t.cta}</Button>
      </section>
    </main>
  );
}
