'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Link from 'next/link';
import Button from './Button';
import styles from './HomeHero.module.css';

interface Props {
  videos: string[];
  headline: string;
  description: string;
  requestLabel: string;
  aboutLabel: string;
  aboutHref: string;
}

export default function HomeHero(props: Props) {
  const [source, setSource] = useState('');
  const video = useRef<HTMLVideoElement>(null);
  const word = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setSource(props.videos[Math.floor(Math.random() * props.videos.length)] || '');
  }, [props.videos]);

  function reset() {
    word.current?.style.setProperty('--move-x', '0px');
    word.current?.style.setProperty('--move-y', '0px');
  }

  function follow(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    word.current?.style.setProperty('--move-x', `${((event.clientX - box.left) / box.width - .5) * 12}px`);
    word.current?.style.setProperty('--move-y', `${((event.clientY - box.top) / box.height - .5) * 8}px`);
  }

  return (
    <section className={styles.hero} aria-labelledby="home-heading">
      <div className={styles.banner} onPointerMove={follow} onPointerLeave={reset}>
        {source && <video
          ref={video}
          className={styles.video}
          src={source}
          muted autoPlay playsInline preload="auto"
          aria-hidden="true" disablePictureInPicture
          onLoadedMetadata={() => {
            const element = video.current;
            if (element && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              element.pause();
              element.currentTime = Math.max(0, element.duration - .05);
            }
          }}
        />}
        <div className={styles.fade} />
        <div className={styles.eyebrow}>HSE · TRAINING · CONSULTING</div>
        {/*
          Название компании — крупная надпись на баннере, но не заголовок
          страницы: главным считается обещание под ним. Поисковик берёт из
          заголовка текст, когда переписывает строку в выдаче, и слово
          «HORIZON» ему там ничего не говорит. Внешний вид держится на классе,
          поэтому смена тега ничего не двигает.
        */}
        <p className={styles.title}><span ref={word}>HORIZON</span></p>
      </div>
      <div className={styles.content}>
        <div className={styles.lead}>
          <h1 id="home-heading">{props.headline}</h1>
          <div className={styles.actions}>
            <Button className="modern-button">{props.requestLabel} ↗</Button>
            <Link href={props.aboutHref}>{props.aboutLabel} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <p className={styles.description}>{props.description}</p>
      </div>
    </section>
  );
}
