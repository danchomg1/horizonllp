'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { COUNTRIES, Country, matchDialPrefix, sortedCountries } from '../lib/countries';

interface Props {
  locale: 'ru' | 'en';
  /** Отдаёт номер целиком, в формате "+7 (777) 123-45-67" */
  onChange: (fullPhone: string) => void;
}

const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.iso === 'kz')!;

const LABELS = {
  ru: { search: 'Поиск страны', notFound: 'Страна не найдена', numberPlaceholder: 'Номер телефона' },
  en: { search: 'Search country', notFound: 'Country not found', numberPlaceholder: 'Phone number' },
};

/** У +7 привычная маска (XXX) XXX-XX-XX, у остальных - просто группы по три цифры. */
function formatNational(digits: string, dial: string): string {
  if (dial === '7') {
    const d = digits.substring(0, 10);
    let out = '';
    if (d.length > 0) out = `(${d.substring(0, 3)}`;
    if (d.length >= 4) out += `) ${d.substring(3, 6)}`;
    if (d.length >= 7) out += `-${d.substring(6, 8)}`;
    if (d.length >= 9) out += `-${d.substring(8, 10)}`;
    return out;
  }
  return digits.substring(0, 14).replace(/(\d{3})(?=\d)/g, '$1 ').trim();
}

function maxDigitsFor(dial: string): number {
  return dial === '7' ? 10 : 14;
}

export default function PhoneInput({ locale, onChange }: Props) {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [dial, setDial] = useState<string>(DEFAULT_COUNTRY.dial);
  const [national, setNational] = useState('');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);

  const L = LABELS[locale];
  const list = sortedCountries(locale);

  // Собираем итоговое значение для формы при любом изменении
  useEffect(() => {
    onChange(national ? `+${dial} ${formatNational(national, dial)}` : '');
  }, [dial, national, onChange]);

  // Закрытие выпадающего списка по клику вне компонента
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  // Ввод кода вручную: подбираем страну по самому длинному совпадению
  const handleDialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').substring(0, 4);
    setDial(digits);

    const match = matchDialPrefix(digits);
    if (match) setCountry(match);
  };

  const handleNationalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').substring(0, maxDigitsFor(dial));
    setNational(digits);
  };

  const pickCountry = (c: Country) => {
    setCountry(c);
    setDial(c.dial);
    setOpen(false);
    setSearch('');
    numberRef.current?.focus();
  };

  const q = search.trim().toLowerCase();
  const filtered = q
    ? list.filter(
        (c) =>
          c[locale].toLowerCase().includes(q) ||
          c.en.toLowerCase().includes(q) ||
          c.dial.includes(q.replace('+', '')),
      )
    : list;

  const known = matchDialPrefix(dial);

  return (
    <div ref={wrapRef} className="relative">
      <div
        className={`flex items-center h-[50px] rounded-[15px] border transition-all ${
          focused || open ? 'border-[#0B0073] bg-white' : 'border-[#E0E0E0] bg-transparent'
        }`}
      >
        {/* Код страны с флагом */}
        <div className="flex items-center gap-1.5 pl-3 pr-2 h-full">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 shrink-0 hover:opacity-70 transition-opacity"
            aria-label={country[locale]}
          >
            {known ? (
              <img
                src={`/flags/${country.iso}.png`}
                alt=""
                width={22}
                height={16}
                className="w-[22px] h-[16px] object-cover rounded-[2px] shadow-sm"
              />
            ) : (
              <span className="w-[22px] h-[16px] rounded-[2px] bg-gray-200" />
            )}
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center">
            <span className="text-black select-none">+</span>
            <input
              type="text"
              inputMode="numeric"
              value={dial}
              onChange={handleDialChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-[38px] bg-transparent outline-none text-black font-medium"
              aria-label={locale === 'ru' ? 'Код страны' : 'Country code'}
            />
          </div>
        </div>

        <span className="w-px h-[26px] bg-[#E0E0E0] shrink-0" />

        {/* Номер */}
        <input
          ref={numberRef}
          name="phone"
          type="tel"
          required
          value={formatNational(national, dial)}
          onChange={handleNationalChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={dial === '7' ? '(___) ___-__-__' : L.numberPlaceholder}
          className="flex-1 min-w-0 h-full bg-transparent outline-none px-3 text-black font-medium tracking-wide placeholder:text-gray-400 placeholder:font-normal placeholder:tracking-normal rounded-r-[15px]"
        />
      </div>

      {/* Название выбранной страны - подсказка, что код распознан */}
      {known && (
        <span className="absolute -bottom-5 left-1 text-[12px] text-gray-500">{country[locale]}</span>
      )}

      {/* Выпадающий список */}
      {open && (
        <div className="absolute z-50 top-full left-0 mt-2 w-full min-w-[280px] bg-white rounded-[15px] shadow-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={L.search}
              className="w-full bg-transparent outline-none text-sm text-black placeholder:text-gray-400"
            />
          </div>

          <div className="max-h-[260px] overflow-y-auto overscroll-contain">
            {filtered.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-gray-400">{L.notFound}</div>
            )}
            {filtered.map((c) => (
              <button
                key={c.iso}
                type="button"
                onClick={() => pickCountry(c)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 ${
                  c.iso === country.iso ? 'bg-blue-50/60' : ''
                }`}
              >
                <img
                  src={`/flags/${c.iso}.png`}
                  alt=""
                  width={22}
                  height={16}
                  className="w-[22px] h-[16px] object-cover rounded-[2px] shadow-sm shrink-0"
                />
                <span className="flex-1 min-w-0 truncate text-black">{c[locale]}</span>
                <span className="text-gray-400 shrink-0">+{c.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
