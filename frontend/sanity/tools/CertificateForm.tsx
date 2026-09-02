import React, { useEffect, useMemo, useState } from 'react';
import { useClient } from 'sanity';
import { createCertificate, updateCertificate, type Certificate } from './api';
import { addYears } from '../../app/lib/certificates';
import { s } from './styles';

/* ------------------------------------------------------------------ *
 * Справочники из Sanity                                               *
 * ------------------------------------------------------------------ */

interface CourseRef {
  _id: string;
  titleRu: string;
  titleEn?: string;
  titleKz?: string;
  /** Срок действия закреплён за курсом — см. schemaTypes/certCourse.ts. */
  perpetual?: boolean;
  validityYears?: number;
}
interface InstructorRef { _id: string; nameRu: string; nameEn?: string; nameKz?: string }
interface CityRef { nameRu: string; nameEn?: string; nameKz?: string }
interface CompletionRef {
  _id: string;
  textRu: string;
  textEn?: string;
  textKz?: string;
  isDefault?: boolean;
}

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
 * Подсказка при вводе                                                 *
 * ------------------------------------------------------------------ */

interface SuggestProps<T> {
  value: string;
  options: T[];
  /** Все написания варианта — по ним идёт поиск, на любом языке. */
  match: (item: T) => string[];
  label: (item: T) => string;
  hint?: (item: T) => string;
  onPick: (item: T) => void;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function Suggest<T>({ value, options, match, label, hint, onPick, onChange, placeholder, disabled }: SuggestProps<T>) {
  const [open, setOpen] = useState(false);

  const found = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return options.slice(0, 8);
    return options
      .filter((item) => match(item).some((v) => v?.toLowerCase().includes(q)))
      .slice(0, 8);
  }, [value, options, match]);

  return (
    <div style={{ position: 'relative' }}>
      <input
        style={{ ...s.input, opacity: disabled ? 0.6 : 1 }}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        // Клик по подсказке успевает отработать до закрытия
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && !disabled && found.length > 0 && (
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

/* ------------------------------------------------------------------ *
 * Поля формы                                                          *
 * ------------------------------------------------------------------ */

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={s.label}>{label}</label>
      {children}
      {hint && <div style={{ ...s.muted, marginTop: '4px', fontSize: '11px' }}>{hint}</div>}
    </div>
  );
}

function todayLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

type FormState = Record<string, unknown>;

/** Выбранный текст о прохождении раскладывается сразу по трём языкам. */
function pickCompletion(item: CompletionRef): FormState {
  return {
    completed_ru: item.textRu,
    completed_en: item.textEn ?? item.textRu,
    completed_kz: item.textKz ?? item.textRu,
    completed_ref: item._id,
  };
}

const EMPTY: FormState = {
  code: '',
  completed_ref: '',
  first_name_ru: '', last_name_ru: '', company_ru: '', course_ru: '',
  instructor_ru: '', location_ru: '', completed_ru: '',
  has_en: false, first_name_en: '', last_name_en: '', company_en: '', course_en: '',
  instructor_en: '', location_en: '', completed_en: '',
  has_kz: false, first_name_kz: '', last_name_kz: '', company_kz: '', course_kz: '',
  instructor_kz: '', location_kz: '', completed_kz: '',
  training_from: '', training_to: '', hours: '', issued_at: todayLocal(),
  perpetual: false, valid_until: '',
  course_ref: '', instructor_ref: '', notes: '',
};

interface Props {
  row: Certificate | null;
  onCancel: () => void;
  onSaved: () => void;
}

export function CertificateForm({ row, onCancel, onSaved }: Props) {
  const client = useClient({ apiVersion: '2024-01-01' });

  const [form, setForm] = useState<FormState>(() => {
    if (!row) return { ...EMPTY };
    const copy: FormState = { ...EMPTY };
    for (const key of Object.keys(EMPTY)) copy[key] = (row as never)[key] ?? '';
    copy.has_en = row.has_en;
    copy.has_kz = row.has_kz;
    copy.perpetual = row.perpetual;
    return copy;
  });

  const [issueToday, setIssueToday] = useState(!row);
  const [courses, setCourses] = useState<CourseRef[]>([]);
  const [instructors, setInstructors] = useState<InstructorRef[]>([]);
  const [cities, setCities] = useState<CityRef[]>([]);
  const [completions, setCompletions] = useState<CompletionRef[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (patch: FormState) => setForm((prev) => ({ ...prev, ...patch }));
  const str = (key: string) => String(form[key] ?? '');

  // Справочники
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [c, i, ct, cp] = await Promise.all([
          client.fetch<CourseRef[]>(`*[_type=="certCourse" && active != false]|order(titleRu asc){_id,titleRu,titleEn,titleKz,perpetual,validityYears}`),
          client.fetch<InstructorRef[]>(`*[_type=="certInstructor" && active != false]|order(nameRu asc){_id,nameRu,nameEn,nameKz}`),
          client.fetch<CityRef[]>(`*[_type=="certCity"]{nameRu,nameEn,nameKz}`),
          client.fetch<CompletionRef[]>(`*[_type=="certCompletion" && active != false]|order(textRu asc){_id,textRu,textEn,textKz,isDefault}`),
        ]);
        if (cancelled) return;
        setCourses(c ?? []);
        setInstructors(i ?? []);
        setCities(ct ?? []);
        setCompletions(cp ?? []);

        // Текст о прохождении по умолчанию — только для новой записи
        const preset = (cp ?? []).find((t) => t.isDefault) ?? (cp ?? [])[0];
        if (!row && preset) set(pickCompletion(preset));
      } catch {
        if (!cancelled) setError('Не удалось загрузить справочники из Studio');
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  // Дата выдачи «сегодня»
  useEffect(() => {
    if (issueToday) set({ issued_at: todayLocal() });
  }, [issueToday]);

  /** Выбранный курс — источник срока действия. */
  const course = courses.find((c) => c._id === str('course_ref'));

  /**
   * «Действует до» считается по курсу и дате выдачи и руками не правится:
   * срок — свойство курса, а не отдельной выдачи.
   */
  const validityOf = (picked: CourseRef | undefined, issuedAt: string): FormState => {
    if (!picked || !issuedAt) return { perpetual: false, valid_until: '' };
    if (picked.perpetual) return { perpetual: true, valid_until: '' };
    const years = picked.validityYears ?? 0;
    return { perpetual: false, valid_until: years ? addYears(issuedAt, years) ?? '' : '' };
  };

  // Пересчёт при смене даты выдачи: курс тот же, а срок сдвигается
  useEffect(() => {
    if (!course) return;
    set(validityOf(course, str('issued_at')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, form.issued_at]);

  /** Английские и казахские написания подставляются из русских, но только
   *  если их ещё не трогали руками — иначе правки затирались бы. */
  const fillFromRu = (field: 'first_name' | 'last_name' | 'company' | 'location', value: string) => {
    const patch: FormState = { [`${field}_ru`]: value };
    if (form.has_en && !str(`${field}_en`)) patch[`${field}_en`] = transliterate(value);
    if (form.has_kz && !str(`${field}_kz`)) {
      const city = field === 'location' ? cities.find((c) => c.nameRu.toLowerCase() === value.trim().toLowerCase()) : null;
      patch[`${field}_kz`] = city?.nameKz || value;
    }
    set(patch);
  };

  const enableLang = (lang: 'en' | 'kz', on: boolean) => {
    const patch: FormState = { [`has_${lang}`]: on };
    if (on) {
      for (const field of ['first_name', 'last_name', 'company', 'location'] as const) {
        if (str(`${field}_${lang}`)) continue;
        const ru = str(`${field}_ru`);
        if (!ru) continue;
        if (lang === 'en') patch[`${field}_${lang}`] = transliterate(ru);
        else {
          const city = field === 'location' ? cities.find((c) => c.nameRu.toLowerCase() === ru.trim().toLowerCase()) : null;
          patch[`${field}_kz`] = city?.nameKz || ru;
        }
      }
    }
    set(patch);
  };

  const save = async () => {
    setError('');
    for (const [field, title] of [['first_name_ru', 'Имя'], ['last_name_ru', 'Фамилия'], ['course_ru', 'Курс']]) {
      if (!str(field).trim()) { setError(`Не заполнено обязательное поле: ${title}`); return; }
    }

    // Курс и преподаватель хранятся в трёх написаниях, поэтому произвольный
    // текст не годится: из него неоткуда взять казахское название и срок.
    if (!course) {
      setError('Выберите курс из списка. Если нужного курса нет, заведите его в разделе «Сертификаты → Курсы».');
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
    if (!course.perpetual && !course.validityYears) {
      setError(`У курса «${course.titleRu}» не задан срок действия — укажите его в разделе «Сертификаты → Курсы».`);
      return;
    }

    setSaving(true);
    try {
      const payload: FormState = { ...form };
      payload.hours = str('hours') ? Number(str('hours')) : null;
      if (payload.perpetual) payload.valid_until = null;
      if (!row) delete payload.code; // новый номер выдаёт сервер

      if (row) await updateCertificate(row.id, payload);
      else await createCertificate(payload);
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось сохранить');
    } finally {
      setSaving(false);
    }
  };

  const langBlock = (lang: 'en' | 'kz', title: string) => {
    const on = Boolean(form[`has_${lang}`]);
    return (
      <div style={{ ...s.card, marginBottom: '16px', opacity: on ? 1 : 0.75 }}>
        <label style={{ ...s.row, cursor: 'pointer', marginBottom: on ? '14px' : 0 }}>
          <input type="checkbox" checked={on} onChange={(e) => enableLang(lang, e.target.checked)} />
          <strong>{title}</strong>
        </label>

        {on && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Имя">
                <input style={s.input} value={str(`first_name_${lang}`)} onChange={(e) => set({ [`first_name_${lang}`]: e.target.value })} />
              </Field>
              <Field label="Фамилия">
                <input style={s.input} value={str(`last_name_${lang}`)} onChange={(e) => set({ [`last_name_${lang}`]: e.target.value })} />
              </Field>
            </div>

            <Field label="Компания">
              <input style={s.input} value={str(`company_${lang}`)} onChange={(e) => set({ [`company_${lang}`]: e.target.value })} />
            </Field>

            <Field label="Курс" hint="Подставляется из справочника вместе с русским названием">
              <input style={{ ...s.input, opacity: 0.6 }} value={str(`course_${lang}`)} readOnly />
            </Field>

            <Field label="Преподаватель" hint="Подставляется из справочника">
              <input style={{ ...s.input, opacity: 0.6 }} value={str(`instructor_${lang}`)} readOnly />
            </Field>

            <Field label="Место проведения">
              <input style={s.input} value={str(`location_${lang}`)} onChange={(e) => set({ [`location_${lang}`]: e.target.value })} />
            </Field>

            <Field label="Текст о прохождении" hint="Подставляется из справочника">
              <input style={{ ...s.input, opacity: 0.6 }} value={str(`completed_${lang}`)} readOnly />
            </Field>
          </>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ ...s.spread, marginBottom: '20px' }}>
        <div>
          <h1 style={s.h1}>{row ? `Сертификат ${row.code}` : 'Выдать сертификат'}</h1>
          {row && <p style={{ ...s.muted, margin: '4px 0 0' }}>Изменён: {row.updated_at?.slice(0, 10)}</p>}
        </div>
        <div style={s.row}>
          <button style={s.button} onClick={onCancel}>Отмена</button>
          <button style={s.primary} onClick={save} disabled={saving}>
            {saving ? 'Сохраняем…' : 'Сохранить'}
          </button>
        </div>
      </div>

      {error && <div style={{ ...s.error, marginBottom: '16px' }}>{error}</div>}

      {/* ---------------- русская версия ---------------- */}
      <div style={{ ...s.card, marginBottom: '16px' }}>
        <div style={{ ...s.row, marginBottom: '14px' }}>
          <input type="checkbox" checked readOnly disabled />
          <strong>Русская версия</strong>
          <span style={s.muted}>— обязательна, источник для остальных языков</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Field label="Имя *">
            <input style={s.input} value={str('first_name_ru')} onChange={(e) => fillFromRu('first_name', e.target.value)} />
          </Field>
          <Field label="Фамилия *">
            <input style={s.input} value={str('last_name_ru')} onChange={(e) => fillFromRu('last_name', e.target.value)} />
          </Field>
        </div>

        <Field label="Компания">
          <input style={s.input} value={str('company_ru')} onChange={(e) => fillFromRu('company', e.target.value)} />
        </Field>

        <Field
          label="Курс *"
          hint={course
            ? `Срок действия: ${course.perpetual ? 'бессрочный' : course.validityYears ? `${course.validityYears} г.` : 'не задан в справочнике'}`
            : 'Только из справочника: вместе с названием подтягиваются перевод и срок действия'}
        >
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
          {str('course_ru').trim() && !course && (
            <div style={{ ...s.muted, marginTop: '6px', color: '#e05252' }}>
              Выберите курс из списка. Нужного нет — заведите его в разделе «Сертификаты → Курсы».
            </div>
          )}
        </Field>

        <Field label="Преподаватель" hint="Можно вводить на любом языке — подставится нужное написание">
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
          {str('instructor_ru').trim() && !str('instructor_ref') && (
            <div style={{ ...s.muted, marginTop: '6px', color: '#e05252' }}>
              Выберите преподавателя из списка — иначе неоткуда взять казахское и английское написание.
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
          <Field label="Продолжительность" hint="Слово «часов» подставится само">
            <input style={s.input} type="number" min="1" value={str('hours')} onChange={(e) => set({ hours: e.target.value })} />
          </Field>
        </div>

        <Field label="Место проведения">
          <input style={s.input} value={str('location_ru')} onChange={(e) => fillFromRu('location', e.target.value)} placeholder="Казахстан, Атырау" />
        </Field>

        <Field label="Текст о прохождении *" hint="Строка под именем на бланке. Только из справочника: нужны все три языка">
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
          {str('completed_ru').trim() && !str('completed_ref') && (
            <div style={{ ...s.muted, marginTop: '6px', color: '#e05252' }}>
              Выберите текст из списка. Нужного нет — заведите его в разделе «Сертификаты → Тексты о прохождении».
            </div>
          )}
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Field label="Дата выдачи">
            <div style={s.row}>
              <input
                style={{ ...s.input, opacity: issueToday ? 0.6 : 1 }}
                type="date"
                value={str('issued_at')}
                disabled={issueToday}
                onChange={(e) => set({ issued_at: e.target.value })}
              />
            </div>
            <label style={{ ...s.row, marginTop: '6px', cursor: 'pointer' }}>
              <input type="checkbox" checked={issueToday} onChange={(e) => setIssueToday(e.target.checked)} />
              <span style={s.muted}>сегодня</span>
            </label>
          </Field>

          {/* Считается по курсу и дате выдачи — руками не правится */}
          <Field label="Действует до" hint="Срок задан у курса в разделе «Сертификаты → Курсы»">
            <div style={{ ...s.input, display: 'flex', alignItems: 'center', opacity: 0.75 }}>
              {form.perpetual
                ? 'бессрочный'
                : str('valid_until')
                  ? str('valid_until').split('-').reverse().join('.')
                  : course ? 'нужна дата выдачи' : 'выберите курс'}
            </div>
          </Field>
        </div>

        {row && (
          <Field label="Номер сертификата" hint="Менять стоит только при переносе старой записи">
            <input style={{ ...s.input, ...s.code }} value={str('code')} onChange={(e) => set({ code: e.target.value })} />
          </Field>
        )}
      </div>

      {langBlock('en', 'Английская версия')}
      {langBlock('kz', 'Казахская версия')}

      <div style={{ ...s.row, justifyContent: 'flex-end', marginBottom: '40px' }}>
        <button style={s.button} onClick={onCancel}>Отмена</button>
        <button style={s.primary} onClick={save} disabled={saving}>
          {saving ? 'Сохраняем…' : 'Сохранить'}
        </button>
      </div>
    </div>
  );
}
