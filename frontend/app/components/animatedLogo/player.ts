/**
 * Проигрыватель логотипа: кадр → атрибуты SVG и сам цикл.
 *
 * Отделён от React, чтобы страница-превью запускала ровно этот код: что
 * утвердили в превью, то и крутится на сайте.
 */

import {
  CYCLE, HOLD, EYE_C, PUPIL_C, REST_HSE, REST_HORIZON,
  frameAt, isMoving, untilNextMove, paintTriangle, paintLetter, type Frame,
} from './motion';

/** Готовит отрисовку кадров в разметке логотипа (см. AnimatedLogo). */
export function createPainter(g: SVGGElement) {
  const part = <T extends SVGElement>(name: string) =>
    Array.from(g.querySelectorAll<T>(`[data-part="${name}"]`));
  const [tri] = part<SVGPathElement>('tri');
  const [solid] = part<SVGPathElement>('solid');
  const ghosts = part<SVGPathElement>('ghost');
  const [eye] = part<SVGGElement>('eye');
  const [pupil] = part<SVGPathElement>('pupil');
  const caps = part<SVGPathElement>('caps');
  const lower = part<SVGPathElement>('lower');
  const hse = part<SVGPathElement>('hse');
  const tag = part<SVGPathElement>('tag');

  // Середины букв: по ним буквы едут и вокруг них переворачиваются.
  // Считаются по самой геометрии — собственные transform в getBBox не входят.
  const midX = (n: SVGGraphicsElement) => { const b = n.getBBox(); return b.x + b.width / 2; };
  const capsX = caps.map(midX);
  const lowerX = lower.map(midX);
  // «hse» растут из середины своего низа
  const hseOrigin = hse.map((n) => { const b = n.getBBox(); return [b.x + b.width / 2, b.y + b.height]; });

  return function paint(f: Frame) {
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

    caps.forEach((n, i) => {
      const l = paintLetter(f.k[i], f.move, capsX[i], lowerX[i]);
      n.setAttribute('transform', l.caps.transform);
      n.setAttribute('opacity', String(l.caps.opacity));
      lower[i].setAttribute('transform', l.lower.transform);
      lower[i].setAttribute('opacity', String(l.lower.opacity));
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
}

/**
 * Запускает цикл и возвращает функцию остановки.
 *
 * Кадры считаются только во время перехода; пять секунд покоя — один
 * таймер. В фоновой вкладке цикл замирает и продолжается с того же места.
 * Тем, у кого в системе отключена анимация, логотипы сменяются через
 * короткое затухание — без полёта и переворотов.
 */
export function startLogo(g: SVGGElement): () => void {
  const paint = createPainter(g);

  let elapsed = 0;          // позиция в цикле, мс
  let raf = 0;
  let timer = 0;
  let last = 0;
  let holdFrom = 0;         // когда начался текущий таймер покоя

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
}
