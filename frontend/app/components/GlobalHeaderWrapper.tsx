'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

// Принимаем children (это будет наш Header)
export default function GlobalHeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Если мы на главной странице, возвращаем null (ничего не рисуем)
  if (pathname === '/') {
    return null;
  }

  // Если не на главной, рисуем то, что передали внутрь (Header)
  return <>{children}</>;
}