import React, { useEffect, useMemo, useState } from 'react';
import { useClient } from 'sanity';
import { issueBatch, updateCertificate, type Certificate } from './api';
import { addYears } from '../../app/lib/certificates';
import { s } from './styles';

/**
 * Выдача сертификатов.
 *
 * Курс редко читают одному человеку: обычно приходит группа, у которой общее
 * всё, кроме имени, компании и номера. Поэтому форма работает с группой —
 * участники добавляются кнопкой, а курс, даты, место и текст заполняются один
 * раз на всех. Правка существующей записи — та же форма с одним участником.
 *
 * Языки равноценны: три галочки наверху решают, какие бланки выпускать.
 * Русские поля при этом заполняются всегда — из них берётся транслитерация,
 * и по ним же идёт поиск в реестре.
 */

/* ------------------------------------------------------------------ *
 * Справочники из Sanity                                               *
 * ------------------------------------------------------------------ */

interface CourseRef {
  _id: string;
  titleRu: string;
  titleEn?: string;
  titleKz?: string;
  perpetual?: boolean;
  validityYears?: number;
  hours?: number;
}
interface InstructorRef { _id: string; nameRu: string; nameEn?: string; nameKz?: string }
interface CountryRef { _id: string; nameRu: string; nameEn?: string; nameKz?: string }
interface CityRef { _id: string; nameRu: string; nameEn?: string; nameKz?: string; countryId?: string }
interface CompletionRef {
  _id: string;
  textRu: string;
  textEn?: string;
  textKz?: string;
  isDefault?: boolean;
}

/** Онлайн — не город, а режим: справочной записи у него нет. */
const ONLINE_PLACE = { ru: 'Онлайн', en: 'Online', kz: 'Онлайн' };

type Lang = 'ru' | 'kz' | 'en';
const LANGS: { key: Lang; title: string; short: string }[] = [
  { key: 'ru', title: 'Русский', short: 'ру' },
  { key: 'kz', title: 'Қазақша', short: 'кз' },
  { key: 'en', title: 'English', short: 'анг' },
];

/* ------------------------------------------------------------------ *
 * Транслитерация (та же таблица, что и на сервере)                    *
 * ------------------------------------------------------------------ */

const TRANSLIT: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
  з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
  п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
  ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  ә: 'a', ғ: 'g', қ: 'k', ң: 'n', ө: 'o', ұ: 'u', ү: 'u', һ: 'h', і: 'i',
};
const VOWELS = new Set('аеёиоуыэюяәөұүі'.split(''));

function transliterate(input: string): string {
  let out = '';
  let prev = '';
  for (const char of input) {
    const lower = char.toLowerCase();
    let mapped = TRANSLIT[lower];
    if (mapped === undefined) { out += char; prev = lower; continue; }
    if (lower === 'е') {
      const atStart = prev === '' || (!TRANSLIT[prev] && !VOWELS.has(prev));
      if (atStart || VOWELS.has(prev) || prev === 'ь' || prev === 'ъ') mapped = 'ye';
    }
    prev = lower;
    if (mapped === '') continue;
    out += char === lower ? mapped : mapped[0].toUpperCase() + mapped.slice(1);
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Мелочи интерфейса                                                   *
 * ------------------------------------------------------------------ */

interface SuggestProps<T> {
  value: string;
  options: T[];
  match: (item: T) => string[];
  label: (item: T) => string;
  hint?: (item: T) => string;
  onPick: (item: T) => void;
  onChange: (value: string) => void;
  placeholder?: string;
}

function Suggest<T>({ value, options, match, label, hint, onPick, onChange, placeholder }: SuggestProps<T>) {
  const [open, setOpen] = useState(false);

  const found = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return options.slice(0, 8);
    return options.filter((item) => match(item).some((v) => v?.toLowerCase().includes(q))).slice(0, 8);
  }, [value, options, match]);

  return (
    <div style={{ position: 'relative' }}>
      <input
        style={s.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        // Клик по подсказке успевает отработать до закрытия
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && found.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20,
          marginTop: '4px', maxHeight: '240px', overflowY: 'auto',
          border: '1px solid rgba(128,128,128,0.35)', borderRadius: '6px',
          background: 'var(--card-bg-color, #1a1a1a)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        }}>
          {found.map((item, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); onPick(item); setOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '8px 12px', border: 'none', background: 'transparent',
                color: 'inherit', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit',
              }}
            >
              {label(item)}
              {hint && <span style={{ ...s.muted, marginLeft: '8px' }}>{hint(item)}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={s.label}>{label}</label>
      {children}
      {hint && <div style={{ ...s.muted, marginTop: '4px', fontSize: '11px' }}>{hint}</div>}
    </div>
  );
}

/** Показометр: значение приходит из справочника и руками не правится. */
function ReadOnly({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...s.input, display: 'flex', alignItems: 'center', opacity: 0.7 }}>
      {children}
    </div>
  );
}

/** Подпись языка слева от ряда полей. */
function LangTag({ lang }: { lang: Lang }) {
  return (
    <span style={{ ...s.muted, width: '28px', flexShrink: 0, paddingTop: '10px', fontSize: '12px' }}>
      {LANGS.find((l) => l.key === lang)!.short}
    </span>
  );
}

/** Ряд «подпись языка — значение из справочника». */
function LangLine({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
      <LangTag lang={lang} />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* ------------------------------------------------------------------ *
 * Состояние                                                           *
 * ------------------------------------------------------------------ */

/** Личное у участника: остальное в группе общее. */
interface Person {
  key: number;
  firstRu: string; lastRu: string;
  firstKz: string; lastKz: string;
  firstEn: string; lastEn: string;
  company: string;
  /** Дополнительный номер — необязателен, включается галочкой. */
  extraOn: boolean;
  extra: string;
  /** Номер, выданный системой: есть только у сохранённой записи. */
  code?: string;
}

let nextKey = 1;
const blankPerson = (): Person => ({
  key: nextKey++,
  firstRu: '', lastRu: '', firstKz: '', lastKz: '', firstEn: '', lastEn: '',
  company: '', extraOn: false, extra: '',
});

type Shared = Record<string, unknown>;

const EMPTY_SHARED: Shared = {
  course_ru: '', course_en: '', course_kz: '', course_ref: '',
  instructor_ru: '', instructor_en: '', instructor_kz: '', instructor_ref: '',
  completed_ru: '', completed_en: '', completed_kz: '', completed_ref: '',
  location_ru: '', location_en: '', location_kz: '', location_ref: '',
  training_from: '', training_to: '',
  issued_at: todayLocal(), perpetual: false, valid_until: '',
};

/** Место не указано: столбец на бланке тогда не рисуется вовсе. */
const CLEAR_PLACE: Shared = { location_ru: '', location_en: '', location_kz: '', location_ref: '' };

/** Обучение прошло онлайн: место есть, но справочной записи у него нет. */
const ONLINE: Shared = {
  location_ru: ONLINE_PLACE.ru, location_en: ONLINE_PLACE.en, location_kz: ONLINE_PLACE.kz,
  location_ref: '',
};

function pickCity(city: CityRef, country: CountryRef | undefined): Shared {
  const join = (name: string, countryName: string | undefined) =>
    countryName ? `${countryName}, ${name}` : name;
  return {
    location_ru: join(city.nameRu, country?.nameRu),
    location_en: join(city.nameEn ?? city.nameRu, country?.nameEn ?? country?.nameRu),
    location_kz: join(city.nameKz ?? city.nameRu, country?.nameKz ?? country?.nameRu),
    location_ref: city._id,
  };
}

function pickCompletion(item: CompletionRef): Shared {
  return {
    completed_ru: item.textRu,
    completed_en: item.textEn ?? item.textRu,
    completed_kz: item.textKz ?? item.textRu,
    completed_ref: item._id,
  };
}

interface Props {
  row: Certificate | null;
  onCancel: () => void;
  onSaved: () => void;
}

export function CertificateForm({ row, onCancel, onSaved }: Props) {
  const client = useClient({ apiVersion: '2024-01-01' });

  const [langs, setLangs] = useState<Record<Lang, boolean>>(() =>
    row ? { ru: row.has_ru, kz: row.has_kz, en: row.has_en } : { ru: true, kz: true, en: true });

  const [people, setPeople] = useState<Person[]>(() => {
    if (!row) return [blankPerson()];
    return [{
      key: nextKey++,
      firstRu: row.first_name_ru, lastRu: row.last_name_ru,
      firstKz: row.first_name_kz ?? '', lastKz: row.last_name_kz ?? '',
      firstEn: row.first_name_en ?? '', lastEn: row.last_name_en ?? '',
      company: row.company_ru ?? '',
      extraOn: Boolean(row.legacy_code), extra: row.legacy_code ?? '',
      code: row.code,
    }];
  });

  const [shared, setShared] = useState<Shared>(() => {
    if (!row) return { ...EMPTY_SHARED };
    const copy: Shared = { ...EMPTY_SHARED };
    for (const key of Object.keys(EMPTY_SHARED)) copy[key] = (row as never)[key] ?? '';
    copy.perpetual = row.perpetual;
    return copy;
  });

  const [issueToday, setIssueToday] = useState(!row);
  const [courses, setCourses] = useState<CourseRef[]>([]);
  const [instructors, setInstructors] = useState<InstructorRef[]>([]);
  const [cities, setCities] = useState<CityRef[]>([]);
  const [countries, setCountries] = useState<CountryRef[]>([]);
  const [completions, setCompletions] = useState<CompletionRef[]>([]);
  const [countryId, setCountryId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (patch: Shared) => setShared((prev) => ({ ...prev, ...patch }));
  const str = (key: string) => String(shared[key] ?? '');

  const patchPerson = (key: number, patch: Partial<Person>) =>
    setPeople((prev) => prev.map((p) => (p.key === key ? { ...p, ...patch } : p)));

  /* --- справочники --- */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [c, i, ct, co, cp] = await Promise.all([
          client.fetch<CourseRef[]>(`*[_type=="certCourse" && active != false]|order(titleRu asc){_id,titleRu,titleEn,titleKz,perpetual,validityYears,hours}`),
          client.fetch<InstructorRef[]>(`*[_type=="certInstructor" && active != false]|order(nameRu asc){_id,nameRu,nameEn,nameKz}`),
          client.fetch<CityRef[]>(`*[_type=="certCity" && defined(country)]|order(order asc, nameRu asc){_id,nameRu,nameEn,nameKz,"countryId":country._ref}`),
          client.fetch<CountryRef[]>(`*[_type=="certCountry"]|order(order asc, nameRu asc){_id,nameRu,nameEn,nameKz}`),
          client.fetch<CompletionRef[]>(`*[_type=="certCompletion" && active != false]|order(textRu asc){_id,textRu,textEn,textKz,isDefault}`),
        ]);
        if (cancelled) return;
        setCourses(c ?? []);
        setInstructors(i ?? []);
        setCities(ct ?? []);
        setCountries(co ?? []);
        setCompletions(cp ?? []);

        // По умолчанию первая страна и её первый город — так выдают чаще всего
        const country = (co ?? [])[0];
        if (country) setCountryId(country._id);
        if (!row && country) {
          const first = (ct ?? []).find((x) => x.countryId === country._id);
          if (first) set(pickCity(first, country));
        }
        const preset = (cp ?? []).find((t) => t.isDefault) ?? (cp ?? [])[0];
        if (!row && preset) set(pickCompletion(preset));
      } catch {
        if (!cancelled) setError('Не удалось загрузить справочники из Studio');
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  useEffect(() => {
    if (issueToday) set({ issued_at: todayLocal() });
  }, [issueToday]);

  const course = courses.find((c) => c._id === str('course_ref'));

  /** «Действует до» задаётся курсом и руками не правится. */
  const validityOf = (picked: CourseRef | undefined, issuedAt: string): Shared => {
    if (!picked || !issuedAt) return { perpetual: false, valid_until: '' };
    if (picked.perpetual) return { perpetual: true, valid_until: '' };
    const years = picked.validityYears ?? 0;
    return { perpetual: false, valid_until: years ? addYears(issuedAt, years) ?? '' : '' };
  };

  useEffect(() => {
    if (!course) return;
    set(validityOf(course, str('issued_at')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, shared.issued_at]);

  const placeOptions = cities.filter((c) => c.countryId === countryId);
  const isOnline = !str('location_ref') && str('location_ru') === ONLINE_PLACE.ru;
  const noPlace = !str('location_ref') && !str('location_ru');

  /**
   * Русское написание — источник: казахское копируется как есть, английское
   * транслитерируется. Уже поправленное руками не затираем.
   */
  const fillFromRu = (key: number, field: 'first' | 'last', value: string) => {
    const person = people.find((p) => p.key === key);
    if (!person) return;

    const ru = field === 'first' ? person.firstRu : person.lastRu;
    const kz = field === 'first' ? person.firstKz : person.lastKz;
    const en = field === 'first' ? person.firstEn : person.lastEn;

    const patch: Record<string, string> = { [field === 'first' ? 'firstRu' : 'lastRu']: value };
    if (!kz || kz === ru) patch[field === 'first' ? 'firstKz' : 'lastKz'] = value;
    if (!en || en === transliterate(ru)) patch[field === 'first' ? 'firstEn' : 'lastEn'] = transliterate(value);

    patchPerson(key, patch as Partial<Person>);
  };

  /* --- сохранение --- */
  const save = async () => {
    setError('');

    if (!langs.ru && !langs.kz && !langs.en) {
      setError('Выберите хотя бы один язык сертификата.');
      return;
    }
    if (!course) {
      setError('Выберите курс из списка. Нужного нет — заведите его в разделе «Сертификаты → Курсы».');
      return;
    }
    if (!course.perpetual && !course.validityYears) {
      setError(`У курса «${course.titleRu}» не задан срок действия — укажите его в разделе «Сертификаты → Курсы».`);
      return;
    }
    if (str('instructor_ru').trim() && !str('instructor_ref')) {
      setError('Выберите преподавателя из списка или очистите поле.');
      return;
    }
    if (!str('completed_ref')) {
      setError(completions.length
        ? 'Выберите текст о прохождении из списка.'
        : 'В разделе «Сертификаты → Тексты о прохождении» не заведено ни одного текста.');
      return;
    }
    for (const [index, person] of people.entries()) {
      if (!person.firstRu.trim() || !person.lastRu.trim()) {
        setError(`Участник ${index + 1}: заполните имя и фамилию по-русски.`);
        return;
      }
    }

    setSaving(true);
    try {
      const common: Shared = {
        ...shared,
        hours: course.hours ?? null,
        has_ru: langs.ru,
        has_kz: langs.kz,
        has_en: langs.en,
      };
      if (common.perpetual) common.valid_until = null;

      const toRow = (person: Person) => ({
        first_name_ru: person.firstRu.trim(),
        last_name_ru: person.lastRu.trim(),
        company_ru: person.company.trim() || null,
        first_name_kz: langs.kz ? person.firstKz.trim() || person.firstRu.trim() : null,
        last_name_kz: langs.kz ? person.lastKz.trim() || person.lastRu.trim() : null,
        first_name_en: langs.en ? person.firstEn.trim() || transliterate(person.firstRu.trim()) : null,
        last_name_en: langs.en ? person.lastEn.trim() || transliterate(person.lastRu.trim()) : null,
        legacy_code: person.extraOn && person.extra.trim() ? person.extra.trim() : null,
      });

      if (row) await updateCertificate(row.id, { ...common, ...toRow(people[0]) });
      else await issueBatch(common, people.map(toRow));

      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось сохранить');
    } finally {
      setSaving(false);
    }
  };

  /* ---------------------------------------------------------------- *
   * Разметка                                                          *
   * ---------------------------------------------------------------- */

  // Компания и номер стоят один раз на человека — в первом видимом ряду
  const grid = {
    display: 'grid',
    gridTemplateColumns: '28px 1fr 1fr 1.2fr 150px',
    gap: '10px',
    alignItems: 'start',
  } as const;

  const visible = LANGS.filter((l) => langs[l.key]);
  // Русский ряд нужен всегда: он источник остальных написаний
  const rows: Lang[] = visible.some((l) => l.key === 'ru')
    ? visible.map((l) => l.key)
    : ['ru', ...visible.map((l) => l.key)];

  const personRow = (person: Person, lang: Lang, first: boolean) => {
    const value = {
      ru: [person.firstRu, person.lastRu],
      kz: [person.firstKz, person.lastKz],
      en: [person.firstEn, person.lastEn],
    }[lang];

    const change = (which: 'first' | 'last', next: string) => {
      if (lang === 'ru') { fillFromRu(person.key, which, next); return; }
      const field = `${which}${lang === 'kz' ? 'Kz' : 'En'}`;
      patchPerson(person.key, { [field]: next } as Partial<Person>);
    };

    return (
      <div key={lang} style={{ ...grid, marginBottom: '8px' }}>
        <LangTag lang={lang} />
        <input
          style={s.input}
          value={value[0]}
          placeholder={lang === 'ru' ? 'Имя' : undefined}
          onChange={(e) => change('first', e.target.value)}
        />
        <input
          style={s.input}
          value={value[1]}
          placeholder={lang === 'ru' ? 'Фамилия' : undefined}
          onChange={(e) => change('last', e.target.value)}
        />

        {first ? (
          <>
            <input
              style={s.input}
              value={person.company}
              placeholder="Компания"
              onChange={(e) => patchPerson(person.key, { company: e.target.value })}
            />
            <div style={{ ...s.input, ...s.code, display: 'flex', alignItems: 'center', opacity: 0.7 }}>
              {person.code ?? 'выдаст система'}
            </div>
          </>
        ) : (
          <>
            <span />
            <span />
          </>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1040px' }}>
      <div style={{ ...s.spread, marginBottom: '20px' }}>
        <div>
          <h1 style={s.h1}>{row ? `Сертификат ${row.code}` : 'Выдать сертификаты'}</h1>
          <p style={{ ...s.muted, margin: '4px 0 0' }}>
            {row
              ? `Изменён: ${row.updated_at?.slice(0, 10)}`
              : 'Курс, даты и место заполняются один раз на всю группу'}
          </p>
        </div>
        <div style={s.row}>
          <button style={s.button} onClick={onCancel}>Отмена</button>
          <button style={s.primary} onClick={save} disabled={saving}>
            {saving ? 'Сохраняем…' : row ? 'Сохранить' : `Выдать (${people.length})`}
          </button>
        </div>
      </div>

      {error && <div style={{ ...s.error, marginBottom: '16px' }}>{error}</div>}

      {/* ---------------- языки ---------------- */}
      <div style={{ ...s.row, ...s.bar, marginBottom: '16px' }}>
        <span style={s.muted}>Языки сертификата:</span>
        {LANGS.map((lang) => (
          <label key={lang.key} style={s.check}>
            <input
              type="checkbox"
              checked={langs[lang.key]}
              onChange={(e) => setLangs((prev) => ({ ...prev, [lang.key]: e.target.checked }))}
            />
            {lang.title}
          </label>
        ))}
        {!langs.ru && (
          <span style={{ ...s.muted, marginLeft: 'auto', fontSize: '12px' }}>
            русский ряд остаётся: из него берутся остальные написания
          </span>
        )}
      </div>

      {/* ---------------- участники ---------------- */}
      <div style={{ ...s.card, marginBottom: '16px' }}>
        <div style={{ ...grid, marginBottom: '10px' }}>
          <span />
          <span style={s.label}>Имя</span>
          <span style={s.label}>Фамилия</span>
          <span style={s.label}>Компания</span>
          <span style={s.label}>Номер сертификата</span>
        </div>

        {people.map((person, index) => (
          <div
            key={person.key}
            style={{
              paddingBottom: '12px',
              marginBottom: '12px',
              borderBottom: index < people.length - 1 ? '1px solid rgba(128,128,128,0.2)' : 'none',
            }}
          >
            {rows.map((lang, i) => personRow(person, lang, i === 0))}

            <div style={{ ...s.row, marginTop: '6px', flexWrap: 'wrap' }}>
              <label style={s.check}>
                <input
                  type="checkbox"
                  checked={person.extraOn}
                  onChange={(e) => patchPerson(person.key, {
                    extraOn: e.target.checked,
                    extra: e.target.checked ? person.extra : '',
                  })}
                />
                Дополнительный номер
              </label>
              {person.extraOn && (
                <input
                  style={{ ...s.input, ...s.code, width: '220px' }}
                  value={person.extra}
                  placeholder="например EXFGP1681"
                  onChange={(e) => patchPerson(person.key, { extra: e.target.value })}
                />
              )}
              <span style={{ ...s.muted, fontSize: '11px' }}>
                на бланк не идёт, но по нему тоже находится сертификат
              </span>

              {!row && people.length > 1 && (
                <button
                  style={{ ...s.danger, marginLeft: 'auto' }}
                  onClick={() => setPeople((prev) => prev.filter((p) => p.key !== person.key))}
                >
                  Убрать
                </button>
              )}
            </div>
          </div>
        ))}

        {!row && (
          <button style={s.button} onClick={() => setPeople((prev) => [...prev, blankPerson()])}>
            + Добавить человека
          </button>
        )}
      </div>

      {/* ---------------- курс и обучение ---------------- */}
      <div style={{ ...s.card, marginBottom: '16px' }}>
        <Field
          label="Курс *"
          hint={course
            ? `Срок действия: ${course.perpetual ? 'бессрочный' : course.validityYears ? `${course.validityYears} г.` : 'не задан'} · продолжительность: ${course.hours ?? '—'} ч.`
            : 'Только из справочника: вместе с названием подтягиваются перевод, срок и часы'}
        >
          <LangLine lang="ru">
            <Suggest<CourseRef>
              value={str('course_ru')}
              options={courses}
              match={(c) => [c.titleRu, c.titleEn ?? '', c.titleKz ?? '']}
              label={(c) => c.titleRu}
              hint={(c) => (c.perpetual ? 'бессрочный' : c.validityYears ? `${c.validityYears} г.` : '')}
              onChange={(v) => set({ course_ru: v, course_ref: '', course_en: '', course_kz: '' })}
              onPick={(c) => set({
                course_ru: c.titleRu,
                course_en: c.titleEn ?? '',
                course_kz: c.titleKz ?? '',
                course_ref: c._id,
                ...validityOf(c, str('issued_at')),
              })}
              placeholder="Начните вводить название"
            />
          </LangLine>
          {langs.kz && <LangLine lang="kz"><ReadOnly>{str('course_kz') || '—'}</ReadOnly></LangLine>}
          {langs.en && <LangLine lang="en"><ReadOnly>{str('course_en') || '—'}</ReadOnly></LangLine>}
          {str('course_ru').trim() && !course && (
            <div style={{ ...s.muted, color: '#e05252' }}>
              Выберите курс из списка. Нужного нет — заведите его в разделе «Сертификаты → Курсы».
            </div>
          )}
        </Field>

        <Field label="Преподаватель" hint="Можно вводить на любом языке — подставится нужное написание">
          <LangLine lang="ru">
            <Suggest<InstructorRef>
              value={str('instructor_ru')}
              options={instructors}
              match={(i) => [i.nameRu, i.nameEn ?? '', i.nameKz ?? '']}
              label={(i) => i.nameRu}
              hint={(i) => i.nameEn ?? ''}
              onChange={(v) => set({ instructor_ru: v, instructor_ref: '', instructor_en: '', instructor_kz: '' })}
              onPick={(i) => set({
                instructor_ru: i.nameRu,
                instructor_en: i.nameEn ?? '',
                instructor_kz: i.nameKz ?? '',
                instructor_ref: i._id,
              })}
              placeholder="Начните вводить фамилию"
            />
          </LangLine>
          {langs.kz && <LangLine lang="kz"><ReadOnly>{str('instructor_kz') || '—'}</ReadOnly></LangLine>}
          {langs.en && <LangLine lang="en"><ReadOnly>{str('instructor_en') || '—'}</ReadOnly></LangLine>}
          {str('instructor_ru').trim() && !str('instructor_ref') && (
            <div style={{ ...s.muted, color: '#e05252' }}>
              Выберите преподавателя из списка — иначе неоткуда взять остальные написания.
            </div>
          )}
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <Field label="Обучение с">
            <input style={s.input} type="date" value={str('training_from')} onChange={(e) => set({ training_from: e.target.value })} />
          </Field>
          <Field label="Обучение по">
            <input style={s.input} type="date" value={str('training_to')} onChange={(e) => set({ training_to: e.target.value })} />
          </Field>
          <Field label="Продолжительность" hint="Задана у курса">
            <ReadOnly>{course?.hours ? `${course.hours} ч.` : 'выберите курс'}</ReadOnly>
          </Field>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Field label="Страна">
            <select
              style={{ ...s.input, appearance: 'auto', opacity: isOnline || noPlace ? 0.5 : 1 }}
              disabled={isOnline || noPlace}
              value={countryId}
              onChange={(e) => {
                setCountryId(e.target.value);
                // Город из прежней страны здесь больше не подходит
                const city = cities.find((c) => c.countryId === e.target.value);
                set(city ? pickCity(city, countries.find((c) => c._id === e.target.value)) : CLEAR_PLACE);
              }}
            >
              {countries.map((c) => <option key={c._id} value={c._id}>{c.nameRu}</option>)}
            </select>
          </Field>

          <Field label="Место проведения">
            <select
              style={{ ...s.input, appearance: 'auto', opacity: isOnline || noPlace ? 0.5 : 1 }}
              value={str('location_ref')}
              disabled={isOnline || noPlace}
              onChange={(e) => {
                const city = cities.find((c) => c._id === e.target.value);
                if (city) set(pickCity(city, countries.find((c) => c._id === city.countryId)));
              }}
            >
              {!str('location_ref') && (
                <option value="">
                  {placeOptions.length ? '— выберите город —' : '— у страны нет городов —'}
                </option>
              )}
              {placeOptions.map((c) => <option key={c._id} value={c._id}>{c.nameRu}</option>)}
            </select>

            {/* Галочки взаимно исключают друг друга и список городов */}
            <div style={{ ...s.row, marginTop: '8px', flexWrap: 'wrap' }}>
              <label style={s.check}>
                <input type="checkbox" checked={isOnline} onChange={(e) => set(e.target.checked ? ONLINE : CLEAR_PLACE)} />
                Онлайн
              </label>
              <label style={s.check}>
                <input
                  type="checkbox"
                  checked={noPlace}
                  onChange={(e) => {
                    if (e.target.checked) { set(CLEAR_PLACE); return; }
                    const city = placeOptions[0];
                    if (city) set(pickCity(city, countries.find((c) => c._id === city.countryId)));
                  }}
                />
                Не указано
              </label>
            </div>
          </Field>
        </div>
      </div>

      {/* ---------------- выдача ---------------- */}
      <div style={{ ...s.card, marginBottom: '16px' }}>
        <Field label="Текст о прохождении *" hint="Строка под именем на бланке">
          <LangLine lang="ru">
            <Suggest<CompletionRef>
              value={str('completed_ru')}
              options={completions}
              match={(t) => [t.textRu, t.textEn ?? '', t.textKz ?? '']}
              label={(t) => t.textRu}
              hint={(t) => (t.isDefault ? 'по умолчанию' : '')}
              onChange={(v) => set({ completed_ru: v, completed_ref: '', completed_en: '', completed_kz: '' })}
              onPick={(t) => set(pickCompletion(t))}
              placeholder="Начните вводить текст"
            />
          </LangLine>
          {langs.kz && <LangLine lang="kz"><ReadOnly>{str('completed_kz') || '—'}</ReadOnly></LangLine>}
          {langs.en && <LangLine lang="en"><ReadOnly>{str('completed_en') || '—'}</ReadOnly></LangLine>}
          {str('completed_ru').trim() && !str('completed_ref') && (
            <div style={{ ...s.muted, color: '#e05252' }}>
              Выберите текст из списка. Нужного нет — заведите его в разделе «Сертификаты → Тексты о прохождении».
            </div>
          )}
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Field label="Дата выдачи">
            <input
              style={{ ...s.input, opacity: issueToday ? 0.6 : 1 }}
              type="date"
              value={str('issued_at')}
              disabled={issueToday}
              onChange={(e) => set({ issued_at: e.target.value })}
            />
            <label style={{ ...s.row, marginTop: '6px', cursor: 'pointer' }}>
              <input type="checkbox" checked={issueToday} onChange={(e) => setIssueToday(e.target.checked)} />
              <span style={s.muted}>сегодня</span>
            </label>
          </Field>

          {/* Считается по курсу и дате выдачи — руками не правится */}
          <Field label="Действует до" hint="Срок задан у курса">
            <ReadOnly>
              {shared.perpetual
                ? 'бессрочный'
                : str('valid_until')
                  ? str('valid_until').split('-').reverse().join('.')
                  : course ? 'нужна дата выдачи' : 'выберите курс'}
            </ReadOnly>
          </Field>
        </div>
      </div>

      <div style={{ ...s.row, justifyContent: 'flex-end', marginBottom: '40px' }}>
        <button style={s.button} onClick={onCancel}>Отмена</button>
        <button style={s.primary} onClick={save} disabled={saving}>
          {saving ? 'Сохраняем…' : row ? 'Сохранить' : `Выдать (${people.length})`}
        </button>
      </div>
    </div>
  );
}
