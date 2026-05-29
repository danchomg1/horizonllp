import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import {
  MonitorPlay, WifiOff, LineChart, FolderCog,
  SlidersHorizontal, Award, Check, ShieldCheck, ArrowRight,
} from 'lucide-react';
import Button from '../../components/Button';

const content = {
  ru: {
    eyebrow: 'Обучающая платформа Horizon',
    heroTitle: 'Horizon University',
    heroSub: 'Дистанционное обучение сотрудников, контроль прогресса и управление учебными программами в одной системе.',
    stat1n: '2007', stat1l: 'опыт Horizon в HSE',
    stat2n: '100%', stat2l: 'контроль прохождения',
    stat3n: 'Offline', stat3l: 'доступ без интернета',
    missionEyebrow: 'Зачем нужна платформа',
    missionText: (
      <>
        Платформа Horizon помогает компаниям организовать обучение сотрудников по{' '}
        <strong>охране труда, технике безопасности и внутренним корпоративным программам</strong>{' '}
        — удобно, системно и с возможностью контроля результатов.
      </>
    ),
    featuresEyebrow: 'Возможности',
    featuresTitle: 'Что позволяет платформа',
    features: [
      { Icon: MonitorPlay, title: 'Дистанционное обучение', desc: 'Сотрудники проходят курсы онлайн в удобном формате — с любого устройства и в удобное время.' },
      { Icon: WifiOff, title: 'Обучение без интернета', desc: 'Доступ к материалам возможен даже при отсутствии подключения к сети — важно для удалённых объектов.' },
      { Icon: LineChart, title: 'Контроль прогресса', desc: 'Руководители и HSE-специалисты видят статус прохождения, результаты и активность обучающихся.' },
      { Icon: FolderCog, title: 'Управление материалами', desc: 'Учебные курсы, программы, тесты и инструкции хранятся централизованно в единой системе.' },
      { Icon: SlidersHorizontal, title: 'Под задачи компании', desc: 'Вводное обучение, повторный инструктаж, HSE-курсы и внутренние программы — в одном пространстве.' },
      { Icon: Award, title: 'Сертификаты и отчёты', desc: 'Автоматическая выдача сертификатов и выгрузка отчётности по итогам обучения сотрудников.' },
    ],
    audienceEyebrow: 'Для кого',
    audienceTitle: 'Компаниям, которым важно —',
    audienceItems: [
      'обучать сотрудников в разных городах и на разных объектах;',
      'снизить нагрузку на учебные центры и HSE-отдел;',
      'видеть прозрачную статистику по обучению;',
      'быстро запускать новые курсы и программы;',
      'поддерживать культуру безопасного труда.',
    ],
    quoteTitle: 'Horizon — опыт в обучении. Теперь — в цифровом формате.',
    quoteText: 'Мы развиваем культуру безопасного труда с 2007 года. Horizon University переносит эту экспертизу в удобную цифровую платформу для всей компании.',
    ctaAccent: 'Начните с демонстрации',
    ctaTitle: 'Покажем платформу под задачи вашей компании',
    ctaDesc: 'Оставьте заявку — продемонстрируем функционал платформы и возможные сценарии использования для вашего бизнеса.',
    cta: 'Оставить заявку',
  },
  en: {
    eyebrow: 'Horizon Learning Platform',
    heroTitle: 'Horizon University',
    heroSub: 'Remote employee training, progress tracking, and educational programme management — all in one system.',
    stat1n: '2007', stat1l: 'Horizon HSE experience',
    stat2n: '100%', stat2l: 'completion control',
    stat3n: 'Offline', stat3l: 'access without internet',
    missionEyebrow: 'Why this platform',
    missionText: (
      <>
        The Horizon platform helps companies organise employee training in{' '}
        <strong>occupational health, safety and internal corporate programmes</strong>{' '}
        — conveniently, systematically and with full visibility of results.
      </>
    ),
    featuresEyebrow: 'Features',
    featuresTitle: 'What the platform enables',
    features: [
      { Icon: MonitorPlay, title: 'Remote Learning', desc: 'Employees complete courses online at their own pace — from any device, at any time.' },
      { Icon: WifiOff, title: 'Offline Access', desc: 'Materials are accessible even without an internet connection — essential for remote sites.' },
      { Icon: LineChart, title: 'Progress Tracking', desc: 'Managers and HSE specialists see completion status, results and learner activity.' },
      { Icon: FolderCog, title: 'Content Management', desc: 'Courses, programmes, tests and instructions are stored centrally in a single system.' },
      { Icon: SlidersHorizontal, title: 'Tailored to Your Needs', desc: 'Induction, refresher training, HSE courses and internal programmes — all in one space.' },
      { Icon: Award, title: 'Certificates & Reports', desc: 'Automatic certificate issuance and reporting upon completion of employee training.' },
    ],
    audienceEyebrow: "Who it's for",
    audienceTitle: 'Companies that need to —',
    audienceItems: [
      'train employees across multiple cities and sites;',
      'reduce the burden on training centres and HSE teams;',
      'have transparent training statistics;',
      'launch new courses and programmes quickly;',
      'build a culture of safe work.',
    ],
    quoteTitle: 'Horizon — expertise in training. Now in digital format.',
    quoteText: 'We have been building a culture of safe work since 2007. Horizon University brings this expertise into a convenient digital platform for your entire company.',
    ctaAccent: 'Start with a demo',
    ctaTitle: "We'll show you the platform tailored to your company's needs",
    ctaDesc: "Submit a request — we'll demonstrate the platform's features and possible use cases for your business.",
    cta: 'Submit Request',
  },
};

export default async function HorizonUniversityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = content[locale as 'ru' | 'en'] ?? content.ru;

  return (
    <main className="bg-[#F4F4F4] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-[680px] flex items-center overflow-hidden bg-[#061B33]">
        <Image
          src="/assets/horizon-university/hero-bg-2.jpg"
          alt="Horizon University"
          fill
          priority
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(275deg, rgba(7,0,55,.92) 0%, rgba(11,0,115,.74) 36%, rgba(6,20,45,.30) 64%, rgba(6,20,45,.05) 100%)' }}
        />

        <div className="relative z-10 w-full max-w-[1180px] mx-auto px-6 md:px-10 pt-28 pb-20 flex justify-end">
          <div className="max-w-[560px]">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/80 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {t.eyebrow}
            </div>

            <h1 className="font-black text-[48px] md:text-[60px] leading-[1.05] tracking-[-0.025em] text-white mb-5">
              {t.heroTitle}
            </h1>

            <p className="text-[18px] md:text-[20px] leading-[1.65] text-white/80 font-normal mb-10 max-w-[460px]">
              {t.heroSub}
            </p>

            <Button className="!w-auto !px-8 gap-2">
              {t.cta}
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="flex gap-10 md:gap-14 mt-14">
              {[
                { n: t.stat1n, l: t.stat1l },
                { n: t.stat2n, l: t.stat2l },
                { n: t.stat3n, l: t.stat3l },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-[28px] font-black text-white tracking-tight">{s.n}</div>
                  <div className="text-[13px] text-white/60 font-medium mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="bg-[#0B0073] py-24 px-6 md:px-10">
        <div className="max-w-[880px] mx-auto">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/70 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            {t.missionEyebrow}
          </div>
          <p className="text-[22px] md:text-[27px] font-medium leading-[1.5] tracking-[-0.01em] text-white">
            {t.missionText}
          </p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-28 px-6 md:px-10">
        <div className="max-w-[1180px] mx-auto">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0B0073] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B0073]" />
              {t.featuresEyebrow}
            </div>
            <h2 className="text-[32px] md:text-[38px] font-bold text-black tracking-tight leading-[1.15]">
              {t.featuresTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-black/8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B0073]/8 text-[#0B0073] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-[17px] font-bold text-black mb-2">{title}</h3>
                <p className="text-[14px] leading-[1.6] text-black/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIENCE ── */}
      <section className="bg-white py-28 px-6 md:px-10">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0B0073] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B0073]" />
              {t.audienceEyebrow}
            </div>
            <h2 className="text-[32px] md:text-[36px] font-bold text-black tracking-tight leading-[1.15] mb-8">
              {t.audienceTitle}
            </h2>

            <div className="flex flex-col gap-4">
              {t.audienceItems.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="flex-none w-7 h-7 rounded-lg bg-[#0B0073] text-white flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-[17px] leading-[1.5] text-black font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden min-h-[420px] lg:min-h-[460px] bg-[#061B33]">
            <Image
              src="/assets/horizon-university/worker-portrait.jpg"
              alt="HSE professional"
              fill
              className="object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(0deg, rgba(7,0,55,.92) 0%, rgba(11,0,115,.45) 42%, rgba(11,0,115,0) 70%)' }}
            />
            <div className="absolute inset-x-0 bottom-0 z-10 p-8 md:p-10 text-white">
              <ShieldCheck className="w-8 h-8 mb-4 opacity-90" />
              <h3 className="text-[22px] font-bold leading-snug mb-3">{t.quoteTitle}</h3>
              <p className="text-[14px] leading-[1.6] text-white/80">{t.quoteText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 md:px-10">
        <div className="max-w-[1180px] mx-auto">
          <div className="relative bg-white rounded-3xl border border-black/8 shadow-md px-8 py-16 md:px-16 text-center overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(680px 280px at 50% -40%, rgba(11,0,115,0.06), transparent 70%)' }}
            />
            <div className="relative">
              <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-[#0B0073] mb-4">
                {t.ctaAccent}
              </p>
              <h2 className="text-[32px] md:text-[40px] font-black text-[#0B0073] tracking-tight leading-[1.12] max-w-[680px] mx-auto mb-5">
                {t.ctaTitle}
              </h2>
              <p className="text-[17px] text-black/60 leading-[1.55] max-w-[580px] mx-auto mb-8">
                {t.ctaDesc}
              </p>
              <div className="flex justify-center">
                <Button className="!w-auto !px-10 gap-2">
                  {t.cta}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
