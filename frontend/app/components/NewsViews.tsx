'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface Props {
  slug: string;
  locale: string;
}

function pluralRu(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'просмотр';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'просмотра';
  return 'просмотров';
}

export default function NewsViews({ slug, locale }: Props) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const key = `news-viewed:${slug}`;

    // В рамках одной сессии просмотр засчитываем один раз. Флаг ставим сразу,
    // до запроса - иначе двойной вызов эффекта в dev-режиме накрутит счётчик.
    let alreadyCounted = false;
    try {
      alreadyCounted = sessionStorage.getItem(key) === '1';
      if (!alreadyCounted) sessionStorage.setItem(key, '1');
    } catch {
      // приватный режим браузера - просто читаем значение, не увеличивая
      alreadyCounted = true;
    }

    const request = alreadyCounted
      ? fetch(`/api/views?slug=${encodeURIComponent(slug)}`)
      : fetch('/api/views', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }),
        });

    let cancelled = false;
    request
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && typeof data?.views === 'number') setViews(data.views);
      })
      .catch(() => {
        // счётчик не критичен - при сбое просто ничего не показываем
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (views === null) return null;

  const label = locale === 'en' ? (views === 1 ? 'view' : 'views') : pluralRu(views);

  return (
    <span className="inline-flex items-center gap-2 text-[14px] text-gray-500">
      <Eye className="w-4 h-4" />
      {views.toLocaleString(locale === 'en' ? 'en-GB' : 'ru-RU')} {label}
    </span>
  );
}
