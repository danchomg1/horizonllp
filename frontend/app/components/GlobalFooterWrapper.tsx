'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function GlobalFooterWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return /\/horizon-university\/?$/.test(pathname) ? null : <>{children}</>;
}
