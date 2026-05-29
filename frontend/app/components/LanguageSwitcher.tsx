'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'en', label: 'EN', name: 'English' },
  // { code: 'kz', label: 'KZ', name: 'Қазақша' }, // coming soon
] as const;

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLocale = pathname.startsWith('/en') ? 'en' : 'ru';
  const current = LANGUAGES.find(l => l.code === currentLocale)!;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const switchTo = (code: string) => {
    if (code === currentLocale) { setOpen(false); return; }
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
    setOpen(false);
    if (code === 'en') {
      router.push(`/en${pathname}`);
    } else {
      router.push(pathname.replace(/^\/en/, '') || '/');
    }
  };

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-1 text-[13px] font-semibold px-2 py-1 rounded-md transition-colors whitespace-nowrap ${
          open ? 'text-[#0B0073] bg-black/5' : 'text-black/60 hover:text-[#0B0073] hover:bg-black/5'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current.label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[130px] bg-white/90 backdrop-blur-[10px] border border-white/20 shadow-lg rounded-xl overflow-hidden z-[200]">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => switchTo(lang.code)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] transition-colors text-left ${
                lang.code === currentLocale
                  ? 'text-[#0B0073] font-bold bg-[#0B0073]/5'
                  : 'text-black/70 hover:bg-black/5 font-medium'
              }`}
            >
              <span className="w-6 font-bold">{lang.label}</span>
              <span className="text-black/50 font-normal">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
