'use client';

import { memo, useEffect, useRef } from 'react';
import { VIEW, CAPS, LOWER, HSE, TAG, EYE } from './animatedLogo/paths';
import { H_DY, INITIAL } from './animatedLogo/motion';
import { startLogo } from './animatedLogo/player';

/**
 * Логотип в шапке: HSE и Horizon сменяют друг друга с перетеканием.
 *
 * С сервера приходит неподвижный HSE — логотип виден сразу, ещё до скриптов.
 * Дальше кадры ведёт проигрыватель (animatedLogo/player.ts): он же работает
 * и в странице-превью, так что утверждённое там совпадает с сайтом.
 */

const BLUE = '#153B85';

function AnimatedLogo({ className }: { className?: string }) {
  const root = useRef<SVGGElement>(null);

  useEffect(() => (root.current ? startLogo(root.current) : undefined), []);

  return (
    <svg
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g ref={root} fill={BLUE}>
        <path data-part="ghost" opacity={0} />
        <path data-part="ghost" opacity={0} />
        <path data-part="tri" d={INITIAL.brackets} />
        <path data-part="solid" d={INITIAL.solid} />
        {HSE.map((d, i) => <path key={i} data-part="hse" d={d} />)}
        {/* Заглавные ждут своего перехода скрытыми: исходный кадр — HSE */}
        {CAPS.map((d, i) => <path key={i} data-part="caps" d={d} opacity={0} />)}
        {LOWER.map((d, i) => <path key={i} data-part="lower" d={d} />)}
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
// его кадры ведёт проигрыватель, и лишний проход React ничего бы не изменил.
export default memo(AnimatedLogo);
