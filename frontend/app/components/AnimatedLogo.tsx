'use client';

import { memo, useEffect, useRef } from 'react';
import { WORD, HSE, TAG, EYE } from './animatedLogo/paths';
import {
  CYCLE, HOLD, H_DY, EYE_C, PUPIL_C, INITIAL, REST_HSE, REST_HORIZON,
  frameAt, isMoving, untilNextMove, paintTriangle, wordShift, type Frame,
} from './animatedLogo/motion';

/**
 * Логотип в шапке: HSE и Horizon сменяют друг друга с перетеканием.
 *
 * С сервера приходит неподвижный HSE — логотип виден сразу, ещё до скриптов.
 * Кадры считаются только во время перехода; пять секунд покоя — это один
 * таймер. В фоновой вкладке цикл замирает и продолжается с того же места.
 *
 * Тем, у кого в системе отключена анимация, логотипы просто сменяются через
 * короткое затухание — без полёта и вращения.
 */

const BLUE = '#153B85';

function AnimatedLogo({ className }: { className?: string }) {
  const root = useRef<SVGGElement>(null);

  useEffect(() => {
    const g = root.current;
    if (!g) return;

    const part = <T extends SVGElement>(name: string) =>
      Array.from(g.querySelectorAll<T>(`[data-part="${name}"]`));
    const [tri] = part<SVGPathElement>('tri');
    const [solid] = part<SVGPathElement>('solid');
    const ghosts = part<SVGPathElement>('ghost');
    const [eye] = part<SVGGElement>('eye');
    const [pupil] = part<SVGPathElement>('pupil');
    const word = part<SVGPathElement>('word');
    const hse = part<SVGPathElement>('hse');
    const tag = part<SVGPathElement>('tag');

    // Буквы растут из середины своего низа
    const origin = (n: SVGGraphicsElement): [number, number] => {
      const b = n.getBBox();
      return [b.x + b.width / 2, b.y + b.height];
    };
    const hseOrigin = hse.map(origin);

    const paint = (f: Frame) => {
      const t = paintTriangle(f);
      tri.setAttribute('d', t.brackets);
      solid.setAttribute('d', t.solid);
      solid.setAttribute('opacity', t.solidOpacity.toFixed(3));
      t.ghosts.forEach((gh, i) => {
        ghosts[i].setAttribute('d', gh.d);
        ghosts[i].setAttribute('opacity', gh.opacity.toFixed(3));
      });

      const e = Math.max(0, f.e);
      eye.setAttribute('transform',
        `translate(${EYE_C[0]} ${EYE_C[1]}) scale(1 ${e.toFixed(3)}) translate(${-EYE_C[0]} ${-EYE_C[1]})`);
      eye.setAttribute('opacity', Math.min(1, e * 4).toFixed(3));
      const pu = 0.4 + 0.6 * Math.max(0, f.pupil);
      pupil.setAttribute('transform',
        `translate(${PUPIL_C[0]} ${PUPIL_C[1]}) scale(${pu.toFixed(3)}) translate(${-PUPIL_C[0]} ${-PUPIL_C[1]})`);

      word.forEach((n, i) => {
        const [dx, dy] = wordShift(f.k[i]);
        n.setAttribute('transform', `translate(${dx.toFixed(3)} ${dy.toFixed(3)})`);
      });

      hse.forEach((n, j) => {
        const w = f.w[j], [cx, by] = hseOrigin[j];
        n.setAttribute('transform',
          `translate(${cx} ${(by + (1 - w) * 7).toFixed(3)}) scale(${(0.72 + 0.28 * w).toFixed(3)}) translate(${-cx} ${-by})`);
        n.setAttribute('opacity', w.toFixed(3));
      });

      tag.forEach((n, i) => {
        const v = f.v[i];
        n.setAttribute('transform', `translate(0 ${((1 - v) * 5).toFixed(3)})`);
        n.setAttribute('opacity', v.toFixed(3));
      });
    };

    let elapsed = 0;          // позиция в цикле, мс
    let raf = 0;
    let timer = 0;
    let last = 0;
    let holdFrom = 0;         // когда начался текущий таймер покоя

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --- без анимации: смена через затухание --- */
    if (reduce) {
      let horizon = false;
      g.style.transition = 'opacity .3s ease';
      const swap = () => {
        g.style.opacity = '0';
        timer = window.setTimeout(() => {
          horizon = !horizon;
          paint(horizon ? REST_HORIZON : REST_HSE);
          g.style.opacity = '1';
          timer = window.setTimeout(swap, HOLD + 1400);
        }, 300);
      };
      timer = window.setTimeout(swap, HOLD);
      return () => window.clearTimeout(timer);
    }

    /* --- обычный режим --- */
    const tick = (now: number) => {
      // Больше четверти секунды между кадрами — значит, браузер притормозил;
      // лучше чуть замедлить переход, чем проскочить его рывком.
      elapsed = (elapsed + Math.min(250, now - last)) % CYCLE;
      last = now;
      paint(frameAt(elapsed));
      if (isMoving(elapsed)) raf = requestAnimationFrame(tick);
      else rest();
    };

    const rest = () => {
      const wait = untilNextMove(elapsed);
      holdFrom = performance.now();
      timer = window.setTimeout(() => {
        timer = 0;
        elapsed = (elapsed + wait) % CYCLE;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }, wait);
    };

    const stop = () => {
      if (timer) {
        // Засчитываем уже прошедшую часть паузы
        elapsed = (elapsed + performance.now() - holdFrom) % CYCLE;
        window.clearTimeout(timer);
        timer = 0;
      }
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const start = () => {
      last = performance.now();
      if (isMoving(elapsed)) raf = requestAnimationFrame(tick);
      else rest();
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    if (!document.hidden) start();

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, []);

  return (
    <svg viewBox="0 0 281 30" className={className} aria-hidden="true" focusable="false">
      <g ref={root} fill={BLUE}>
        <path data-part="ghost" opacity={0} />
        <path data-part="ghost" opacity={0} />
        <path data-part="tri" d={INITIAL.brackets} />
        <path data-part="solid" d={INITIAL.solid} />
        {HSE.map((d, i) => <path key={i} data-part="hse" d={d} />)}
        {WORD.map((d, i) => <path key={i} data-part="word" d={d} />)}
        {TAG.map((d, i) => <path key={i} data-part="tag" d={d} />)}
        <g transform={`translate(0 ${H_DY})`}>
          <g data-part="eye" opacity={0}>
            <path d={EYE[0]} />
            <path data-part="pupil" d={EYE[1]} />
          </g>
        </g>
      </g>
    </svg>
  );
}

// Шапка перерисовывается при каждом открытии меню, а логотипу это не нужно:
// его кадры ведёт эффект, и лишний проход React ничего бы не изменил.
export default memo(AnimatedLogo);
