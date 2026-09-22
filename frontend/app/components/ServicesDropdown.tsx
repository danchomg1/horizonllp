'use client';

import {useState, type ComponentProps} from 'react';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import type HeaderClient from './HeaderClient';
import {href, loc} from '../lib/locale';
import styles from './ServicesDropdown.module.css';

export default function ServicesDropdown(props: ComponentProps<typeof HeaderClient>) {
  const locale = useLocale();
  const t = useTranslations('Header');
  const [active, setActive] = useState(0);
  const groups: {id: string; items?: {_id: string; title: string; titleEn?: string; titleKz?: string; slug: {current: string}}[]}[] = [
    {id: 'consulting', items: props.consultingItems},
    {id: 'explosion', items: props.explosionItems},
    {id: 'emergency', items: props.emergencyItems},
    {id: 'engineering', items: props.engineeringItems},
  ];
  return <div className={styles.layout}>
    <div className={styles.groups} role="tablist" aria-label={t(groups[active].id)}>
      {groups.map((group, index) => <button key={group.id} type="button" role="tab"
        id={`service-tab-${group.id}`} aria-selected={index === active}
        aria-controls="service-links" onClick={() => setActive(index)}
        onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
        {t(group.id)} <span aria-hidden="true">→</span>
      </button>)}
    </div>
    <div id="service-links" role="tabpanel" aria-labelledby={`service-tab-${groups[active].id}`} className={styles.links}>
      <h3>{t(groups[active].id)}</h3>
      {groups[active].items?.filter(item => item.slug?.current).map(item =>
        <Link key={item._id} href={href(item.slug.current, locale)}>
          <span>{loc<string>(item, 'title', locale)}</span><span aria-hidden="true">↗</span>
        </Link>)}
    </div>
  </div>;
}
