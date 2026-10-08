'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { GraduationCap, CalendarDays, ChevronDown, MonitorCheck, ShieldCheck } from 'lucide-react';
import s from './scenes.module.css';
import { useModal } from '../../context/ModalContext';

function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!ref.current) return;
      const box = ref.current.getBoundingClientRect();
      setReduced(media.matches);
      setProgress(Math.max(0, Math.min(1, -box.top / Math.max(1, box.height - innerHeight))));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    media.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); media.removeEventListener('change', schedule); };
  }, []);
  return { ref, progress, reduced };
}

export function HeroVideo({ className }: { className: string }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { const timer = window.setInterval(() => { const video = videoRef.current; if (video && (video.currentTime > 0 || video.ended || video.error)) { setPlaying(true); clearInterval(timer); } }, 50); return () => clearInterval(timer); }, []);
  return <><div aria-hidden="true" className={`${s.videoWhite} ${playing ? s.videoReady : ""}`}/><video ref={videoRef} onPlaying={() => setPlaying(true)} onError={() => setPlaying(true)} className={className} autoPlay muted playsInline preload="auto" poster="/assets/horizon-university/home-learning-blue.webp" aria-label="Horizon University" onEnded={event => event.currentTarget.pause()}>
    <source src="/assets/horizon-university/main.mp4" type="video/mp4" />
  </video></>;
}

export function LearningScenes({ title, description, label, locale }: { title: string; description: string; label: string; locale: string }) {
  const { ref, progress, reduced } = useScrollProgress();
  const names = locale === 'en' ? ['At home', 'At the work camp', 'On the train', 'In the yurt', 'At the airport'] : locale === 'kz' ? ['Үйде', 'Вахталық қалашықта', 'Пойызда', 'Киіз үйде', 'Әуежайда'] : ['Дома', 'В вахтовом городке', 'В купе поезда', 'В юрте', 'В аэропорту'];
  const position = progress * 4;
  const active = Math.round(position);
  return <div ref={ref} className={s.story}>
    <div className={s.sticky}>
      <div className={s.copy}><span className={s.eyebrow}>01 / {label}</span><h3>{title}</h3><p>{description}</p>
        <div className={s.track} aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
      </div>
      <div className={s.photos}>{names.map((name, i) => <Image key={name} src={`/assets/horizon-university/${i + 1}${i + 1}.png`} alt={name} fill sizes="(max-width: 700px) 80vw, 42vw" loading="eager" className={s.photo} style={{ opacity: reduced ? (active === i ? 1 : 0) : Math.max(0, Math.min(1, (position - i + .65) / .65)), transform: reduced ? undefined : `scale(${1 + .065 * Math.max(0, Math.min(1, position - i))})`, zIndex: i }} />)}</div>
    </div>
  </div>;
}

export function TeamProgress({ title, description, label, locale }: { title: string; description: string; label: string; locale: string }) {
  const { ref, progress, reduced } = useScrollProgress();
  const opening = reduced ? 1 : Math.min(1, progress / .35);
  const p = reduced ? 1 : Math.max(0, Math.min(1, (progress - .28) / .55));
  const t = locale === 'en' ? ['My team', 'Training name: All', 'Training type: All', 'Period: Last 90 days', 'Team training', 'Courses and events', 'Completed', 'In progress', 'Not passed', 'Not started', 'Employee progress', 'employees completed training', 'Learning progress at a glance.'] : locale === 'kz' ? ['Менің командам', 'Оқу атауы: Барлығы', 'Оқу түрі: Барлығы', 'Кезең: Соңғы 90 күн', 'Команданың оқытылуы', 'Курстар мен іс-шаралар', 'Аяқталды', 'Оқу үстінде', 'Өтпеді', 'Басталмады', 'Қызметкерлердің үлгерімі', 'қызметкер оқуды аяқтады', 'Команданың оқу үлгерімі бір экранда.'] : ['Моя команда', 'Название обучения: Все', 'Тип обучения: Не выбрано', 'Период: Последние 90 дней', 'Обученность команды', 'Курсы и мероприятия', 'Завершено', 'В процессе', 'Не пройдено', 'Не начато', 'Прогресс сотрудников', 'сотрудников завершили обучение', 'Прогресс обучения всей команды — на одном экране.'];
  return <div ref={ref} className={s.dashboardStory}><div className={s.dashboardSticky}>
    <div className={s.dashboardIntro}><span className={s.eyebrow}>02 / {label}</span><h3>{title}</h3><p>{description}</p></div>
    <div className={s.laptop}>
    <div className={s.lid} style={{transform: `rotateX(${-84 * (1 - opening)}deg)`}}><span className={s.camera}/><div className={s.screen}>
    <div className={s.browserBar}><span>● ● ●</span><div>Horizon University</div><span>＋</span></div>
    <div style={{opacity: reduced ? 1 : Math.min(1, opening * 2), filter: `brightness(${.25 + .75 * opening})`}}>
    <div className={s.dashboard} role="img" aria-label={`${t[0]}: ${t[6]} 67%, ${t[7]} 18%, ${t[8]} 8%, ${t[9]} 7%. 42/47.`}>
      <div className={s.dashTitle}><h4>{t[0]}</h4><ShieldCheck size={26}/></div>
      <div className={s.filters}>{[GraduationCap, GraduationCap, CalendarDays].map((Icon, i) => <span key={i}><Icon size={17}/>{t[i + 1]}<ChevronDown size={15}/></span>)}</div>
      <div className={s.cards}>
        <div className={s.training}><h5>{t[4]}</h5><div className={s.trainingBody}><div className={s.donut}><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="49" fill="none" stroke="#edf0f4" strokeWidth="10"/>{[67,18,8,7].map((value,i)=><circle key={i} cx="60" cy="60" r="49" fill="none" stroke={['#5bc18d','#519bea','#ee6657','#c3c6cc'][i]} strokeWidth="10" pathLength="100" strokeDasharray={`${value * p} 100`} strokeDashoffset={-[0,67,85,93][i] * p} transform="rotate(-90 60 60)"/>)}</svg><strong>{Math.round(67 * p)}%</strong></div><div className={s.legend}><p>{t[5]}</p>{[67, 18, 8, 7].map((value, i) => <div key={i}><i style={{ background: ['#5bc18d', '#519bea', '#ee6657', '#c3c6cc'][i] }}/><span>{t[6 + i]}</span><b>{Math.round(value * p)}%</b></div>)}</div></div></div>
        <div><h5>{t[10]}</h5><div className={s.gauge}><svg viewBox="0 0 200 110" aria-hidden="true"><path d="M 12 100 A 88 88 0 0 1 188 100" fill="none" stroke="#ef6657" strokeWidth="13"/><path d="M 12 100 A 88 88 0 0 1 188 100" fill="none" stroke="#5bc18d" strokeWidth="13" pathLength="100" strokeDasharray={`${p * 42 / 47 * 100} 100`}/></svg><strong>{Math.round(p * 42)}/47</strong></div><p className={s.centered}>{t[11]}</p></div>
        <div className={s.status}><div style={{ opacity: .25 + .75 * p, transform: `translateY(${(1 - p) * 18}px)` }}><MonitorCheck size={70} strokeWidth={1}/></div><p>{t[12]}</p></div>
      </div>
    </div></div></div></div><div className={s.laptopBase}><span/></div>
    </div>
  </div></div>;
}

const covers = [{"src":"/assets/horizon-university/courses/1-v2.jpg","title":"Безопасная эксплуатация электроустановок II группа допуска"},{"src":"/assets/horizon-university/courses/2-v2.jpg","title":"Безопасная эксплуатация электроустановок III группа допуска"},{"src":"/assets/horizon-university/courses/3-v2.jpg","title":"Безопасная эксплуатация электроустановок IV–V группа допуска"},{"src":"/assets/horizon-university/courses/4-v2.jpg","title":"Безопасность и охрана труда для работников"},{"src":"/assets/horizon-university/courses/5-v2.jpg","title":"Безопасность и охрана труда для руководителей и лиц, ответственных за обеспечение БиОТ"},{"src":"/assets/horizon-university/courses/6-v2.jpg","title":"Безопасные методы работы на высоте"},{"src":"/assets/horizon-university/courses/7-v2.jpg","title":"Курс «Стропальщик»"},{"src":"/assets/horizon-university/courses/8-v2.jpg","title":"Курс подготовки стропальщиков и сигнальщиков для работы с ГПМ"},{"src":"/assets/horizon-university/courses/9-v2.jpg","title":"Основы Трудового кодекса РК"},{"src":"/assets/horizon-university/courses/10-v2.jpg","title":"Подготовка и переподготовка работников в области промышленной безопасности"},{"src":"/assets/horizon-university/courses/11-v2.jpg","title":"Подготовка и переподготовка руководителей, специалистов в области промышленной безопасности"},{"src":"/assets/horizon-university/courses/12-v2.jpg","title":"Пожарно-технический минимум"},{"src":"/assets/horizon-university/courses/13-v2.jpg","title":"Правила обеспечения промышленной безопасности при эксплуатации грузоподъёмных механизмов"},{"src":"/assets/horizon-university/courses/14-v2.jpg","title":"Промышленная безопасность при эксплуатации оборудования, работающего под давлением — для ответственных лиц"},{"src":"/assets/horizon-university/courses/15-v2.jpg","title":"Работа в замкнутом пространстве"},{"src":"/assets/horizon-university/courses/16-v2.jpg","title":"Электробезопасность I группа"}];
/**
 * Лента курсов под первым экраном.
 *
 * Листается сама человеком, а не крутится по кругу: на компьютере — ползунком
 * внизу или прокруткой тачпада, на телефоне — свайпом, с примагничиванием к
 * центру, так что видна середина и по краю от соседей. Карточка под курсором
 * чуть увеличивается, на телефоне крупнее та, что в центре. Нажатие на любую
 * открывает заявку — тема «Онлайн курсы» на этой странице подставляется сама.
 */
const RIBBON_LABEL = { ru: 'Прокрутка курсов', en: 'Scroll courses', kz: 'Курстарды айналдыру' };
const RIBBON_REQUEST = { ru: 'оставить заявку', en: 'send a request', kz: 'өтінім қалдыру' };

export function CourseRibbon({ locale = 'ru' }: { locale?: string }) {
  const { openModal } = useModal();
  const scroller = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const lang = (locale === 'en' || locale === 'kz' ? locale : 'ru') as 'ru' | 'en' | 'kz';

  useEffect(() => {
    const el = scroller.current, b = bar.current, th = thumb.current;
    if (!el || !b || !th) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'));
    let raf = 0;

    const sync = () => {
      raf = 0;
      // Ползунок: ширина — какая доля ленты видна, положение — где мы в ней
      const max = el.scrollWidth - el.clientWidth;
      const w = Math.max(48, b.clientWidth * (el.clientWidth / el.scrollWidth));
      const at = max > 0 ? el.scrollLeft / max : 0;
      th.style.width = `${w}px`;
      th.style.transform = `translateX(${at * (b.clientWidth - w)}px)`;
      th.setAttribute('aria-valuenow', String(Math.round(at * 100)));
      // Насколько карточка близко к центру — по этому на телефоне растёт средняя
      const mid = el.scrollLeft + el.clientWidth / 2;
      for (const c of cards) {
        const focus = Math.max(0, 1 - Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) / c.offsetWidth);
        c.style.setProperty('--focus', focus.toFixed(3));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(sync); };

    // На телефоне начинаем со второй карточки, чтобы соседи были видны с обеих сторон
    if (window.matchMedia('(max-width: 700px)').matches && cards[1]) {
      el.scrollLeft = cards[1].offsetLeft - (el.clientWidth - cards[1].offsetWidth) / 2;
    }
    sync();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /** Ползунок тянется пальцем или мышью; нажатие мимо него — прыжок туда. */
  const drag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scroller.current, b = bar.current, th = thumb.current;
    if (!el || !b || !th) return;
    const rect = b.getBoundingClientRect();
    const tr = th.getBoundingClientRect();
    const travel = rect.width - tr.width;
    const max = el.scrollWidth - el.clientWidth;
    if (travel <= 0 || max <= 0) return;
    const grab = e.clientX >= tr.left && e.clientX <= tr.right ? e.clientX - tr.left : tr.width / 2;
    const move = (x: number) => {
      el.scrollLeft = (Math.min(travel, Math.max(0, x - rect.left - grab)) / travel) * max;
    };
    move(e.clientX);
    b.setPointerCapture(e.pointerId);
    const onMove = (ev: PointerEvent) => move(ev.clientX);
    const onUp = () => {
      b.removeEventListener('pointermove', onMove);
      b.removeEventListener('pointerup', onUp);
      b.removeEventListener('pointercancel', onUp);
    };
    b.addEventListener('pointermove', onMove);
    b.addEventListener('pointerup', onUp);
    b.addEventListener('pointercancel', onUp);
  };

  /** Стрелки на ползунке листают по одной карточке. */
  const keys = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = scroller.current;
    const card = el?.querySelector<HTMLElement>('[data-card]');
    if (!el || !card) return;
    const step = card.offsetWidth + 20;
    const to = { ArrowRight: el.scrollLeft + step, ArrowLeft: el.scrollLeft - step, Home: 0, End: el.scrollWidth }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    el.scrollTo({ left: to, behavior: 'smooth' });
  };

  return <div className={s.ribbonWrap}>
    <div ref={scroller} className={s.ribbon}>
      <div className={s.ribbonTrack}>
        {covers.map((cover) => <button
          type="button"
          data-card
          key={cover.src}
          className={s.courseCover}
          onClick={() => openModal()}
          aria-label={`${cover.title} — ${RIBBON_REQUEST[lang]}`}
        >
          <Image src={cover.src} alt="" fill sizes="(max-width: 700px) 64vw, 440px"/>
          <span className={s.courseTitle}><span>HORIZON UNIVERSITY</span><strong>{cover.title}</strong></span>
        </button>)}
      </div>
    </div>
    <div ref={bar} className={s.ribbonBar} onPointerDown={drag}>
      <div
        ref={thumb}
        className={s.ribbonThumb}
        role="slider"
        tabIndex={0}
        aria-label={RIBBON_LABEL[lang]}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        onKeyDown={keys}
      />
    </div>
  </div>;
}
