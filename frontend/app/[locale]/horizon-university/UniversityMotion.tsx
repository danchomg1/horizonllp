'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Fine-pointer effects are decorative; touch and reduced-motion keep a static layout. */
export default function UniversityMotion({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let active: HTMLElement | null = null;
    const reset = () => {
      cancelAnimationFrame(frame);
      active?.style.removeProperty('--rx');
      active?.style.removeProperty('--ry');
      active?.style.removeProperty('--mx');
      active?.style.removeProperty('--my');
      active = null;
      element.style.removeProperty('--px');
      element.style.removeProperty('--py');
    };
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType === 'touch') return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('article, button, [data-motion-card]') : null;
      const hero = element.querySelector<HTMLElement>('[data-hero]');
      const x = event.clientX;
      const y = event.clientY;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (active !== target) {
          active?.style.removeProperty('--rx'); active?.style.removeProperty('--ry');
          active?.style.removeProperty('--mx'); active?.style.removeProperty('--my');
        }
        active = target;
        if (hero) {
          const box = hero.getBoundingClientRect();
          const inside = y >= box.top && y <= box.bottom;
          element.style.setProperty('--px', inside ? `${((x - box.left) / box.width - .5) * 12}px` : '0px');
          element.style.setProperty('--py', inside ? `${((y - box.top) / box.height - .5) * 8}px` : '0px');
        }
        if (target) {
          const box = target.getBoundingClientRect();
          const dx = (x - box.left) / box.width - .5;
          const dy = (y - box.top) / box.height - .5;
          target.style.setProperty('--rx', `${-dy * 3}deg`);
          target.style.setProperty('--ry', `${dx * 3}deg`);
          target.style.setProperty('--mx', `${x - box.left}px`);
          target.style.setProperty('--my', `${y - box.top}px`);
        }
      });
    };
    element.addEventListener('pointermove', move, { passive: true });
    element.addEventListener('pointerleave', reset);
    preference.addEventListener('change', reset);
    return () => {
      reset(); element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset); preference.removeEventListener('change', reset);
    };
  }, []);
  return <div ref={root} className={className}>{children}</div>;
}
