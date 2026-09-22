import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import HomeHero from '../components/HomeHero';
import videos from '../components/home-videos.json';

import { client, urlFor } from '../lib/sanity';
import { loc, pick, alternatesFor, href as hrefFor } from '../lib/locale';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: pick({
      ru: 'Horizon LLP — Обучение охране труда и промышленной безопасности в Казахстане',
      en: 'Horizon LLP — Health & Safety Training in Kazakhstan',
      kz: 'Horizon LLP — Қазақстанда еңбекті қорғау және өнеркәсіптік қауіпсіздік бойынша оқыту',
    }, locale),
    description: pick({
      ru: 'Horizon LLP — аккредитованный учебный центр в Астане. Международные курсы NEBOSH, IOSH, RoSPA, CompEx. Консалтинг по БиОТ, диагностика систем безопасности, внедрение ISO 45001 для нефтегазового и промышленного секторов Казахстана.',
      en: 'Horizon LLP — accredited training center in Astana. NEBOSH, IOSH, RoSPA, CompEx international courses. HSE consulting, safety diagnostics, ISO 45001 implementation for oil & gas and industrial sectors of Kazakhstan.',
      kz: 'Horizon LLP — Астанадағы аккредиттелген оқу орталығы. NEBOSH, IOSH, RoSPA, CompEx халықаралық курстары. Еңбекті қорғау бойынша консалтинг, қауіпсіздік жүйелерін диагностикалау, ISO 45001 енгізу.',
    }, locale),
    alternates: alternatesFor(locale),
  };
}

async function getData() {
  const [homeData, latestNews] = await Promise.all([
    client.fetch(`*[_type == "home"][0]{
      ...,
      title, titleEn, titleKz,
      subtitle, subtitleEn, subtitleKz,
      heroDescription, heroDescriptionEn, heroDescriptionKz
    }`),
    client.fetch(`
      *[_type == "news"] | order(publishedAt desc)[0...4] {
        _id, title, titleEn, titleKz, slug, mainImage, publishedAt
      }
    `),
  ]);
  return { ...homeData, latestNews };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');
  const data = await getData();



  const areas=pick({ru:[['Обучение и компетенции','Международные программы и практические навыки для вашей команды.'],['Культура безопасности','Консалтинг и системный подход к управлению производственными рисками.'],['Взрывозащита','Подготовка специалистов для работы во взрывоопасных средах.'],['Аварийное реагирование','Подготовка предприятий и команд к нештатным ситуациям.'],['Инжиниринг','Технические решения и работы для промышленных объектов.'],['Средства защиты','Решения для безопасности людей на рабочем месте.']],en:[['Training & competence','International programmes and practical skills for your team.'],['Safety culture','Consulting and a systematic approach to operational risk.'],['Explosion protection','Competence for working in explosive atmospheres.'],['Emergency response','Preparing businesses and teams for emergencies.'],['Engineering','Technical solutions for industrial facilities.'],['Protective equipment','Workplace protection for your people.']],kz:[['Оқыту және құзыреттер','Командаға арналған халықаралық бағдарламалар мен практикалық дағдылар.'],['Қауіпсіздік мәдениеті','Өндірістік қауіптерді басқарудың жүйелі тәсілі.'],['Жарылыстан қорғау','Жарылыс қаупі бар ортада жұмыс істеуге дайындық.'],['Авариялық ден қою','Кәсіпорындар мен командаларды төтенше жағдайларға дайындау.'],['Инжиниринг','Өнеркәсіптік объектілерге арналған техникалық шешімдер.'],['Қорғаныс құралдары','Жұмыс орнындағы адамдардың қауіпсіздігі.']]},locale);
  const links=['/nebosh-igc','/kultura-i-liderstvo','/compex-01-04','/razrabotka-sistem-upr-avariyami','/elektromontazhnye-raboty','/siz'];
  return <div className="modern-site">
    <HomeHero
      videos={videos}
      headline={pick({ru:'Безопасность начинается\nс людей и знаний.',en:'Safety starts with\npeople and knowledge.',kz:'Қауіпсіздік адамдар\nмен білімнен басталады.'},locale)}
      description={loc<string>(data,'heroDescription',locale) || ''}
      requestLabel={t('cta')}
      aboutLabel={t('learnMore')}
      aboutHref={hrefFor('/about',locale)}
    />
    <section className="modern-section"><div className="modern-section-head"><div><div className="modern-eyebrow">01 / {pick({ru:'Наши направления',en:'Our expertise',kz:'Біздің бағыттар'},locale)}</div><h2>{pick({ru:'Уверенность на каждом\nэтапе работы.',en:'Confidence at every\nstage of work.',kz:'Жұмыстың әр кезеңіндегі\nсенімділік.'},locale).split('\n').map((line,i)=><span key={i} style={{display:'block'}}>{line}</span>)}</h2></div></div><div className="modern-services">{areas.map(([title,desc],i)=><Link className="modern-service" key={title} href={hrefFor(links[i],locale)}><span>0{i+1}<span>↗</span></span><h3>{title}</h3><p>{desc}</p></Link>)}</div></section>
    <section className="modern-section"><div className="modern-university"><div><div className="modern-eyebrow">HORIZON UNIVERSITY</div><h2>{pick({ru:'Обучение рядом.\nГде бы вы ни были.',en:'Learning with you.\nWherever you are.',kz:'Қайда болсаңыз да,\nбілім жаныңызда.'},locale).split('\n').map((line,i)=><span key={i} style={{display:'block'}}>{line}</span>)}</h2><p>{pick({ru:'Курсы, тестирование и развитие компетенций в одной платформе. Обучайте сотрудников и следите за прогрессом всей команды.',en:'Courses, assessments and skills development on one platform. Train your people and track team progress.',kz:'Курстар, тестілеу және құзыреттерді дамыту бір платформада. Қызметкерлерді оқытып, команда үлгерімін бақылаңыз.'},locale)}</p><Link href={hrefFor('/horizon-university',locale)}>{pick({ru:'Открыть платформу',en:'Explore the platform',kz:'Платформамен танысу'},locale)} ↗</Link></div><div className="modern-university-photo"><Image src="/assets/horizon-university/home-learning-blue.webp" alt="Horizon University" fill sizes="(max-width:900px) 100vw, 50vw"/></div></div></section>
    <section className="modern-section"><div className="modern-section-head"><div><div className="modern-eyebrow">02 / HORIZON JOURNAL</div><h2>{t('newsTitle')}</h2></div><Link href={hrefFor('/news',locale)}>{t('viewAll')} ↗</Link></div><div className="modern-news-grid">{data.latestNews?.map((item:any)=><Link key={item._id} href={hrefFor('/news/'+item.slug.current,locale)}><div className="modern-news-photo">{item.mainImage&&<Image src={urlFor(item.mainImage).width(1100).url()} alt={loc<string>(item,'title',locale)||''} fill sizes="(max-width:600px) 100vw, 60vw"/>}</div><h3>{loc(item,'title',locale)}</h3></Link>)}</div></section>
  </div>;
}
