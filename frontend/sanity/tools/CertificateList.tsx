import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  listCertificates, removeCertificate, downloadCertificates, downloadSample,
  type Certificate, type SortKey, type CertLocale,
} from './api';
import { s } from './styles';

const COLUMNS: { key: SortKey; title: string }[] = [
  { key: 'code', title: 'Номер' },
  { key: 'lastName', title: 'Фамилия' },
  { key: 'firstName', title: 'Имя' },
  { key: 'company', title: 'Компания' },
  { key: 'course', title: 'Курс' },
  { key: 'issuedAt', title: 'Выдан' },
  { key: 'validUntil', title: 'Действует до' },
];

const PER_PAGE = 25;

const LOCALES: { key: CertLocale; title: string }[] = [
  { key: 'ru', title: 'Русский' },
  { key: 'en', title: 'English' },
  { key: 'kz', title: 'Қазақша' },
];

function validity(row: Certificate): { text: string; tone: 'ok' | 'warn' | 'off' } {
  if (row.perpetual) return { text: 'бессрочный', tone: 'ok' };
  if (!row.valid_until) return { text: '—', tone: 'off' };

  const today = new Date();
  const local = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return row.valid_until < local
    ? { text: `истёк ${row.valid_until}`, tone: 'warn' }
    : { text: row.valid_until, tone: 'off' };
}

interface Props {
  onEdit: (row: Certificate) => void;
  onCreate: () => void;
  /** Меняется после сохранения формы, чтобы список перечитался. */
  refreshToken: number;
}

export function CertificateList({ onEdit, onCreate, refreshToken }: Props) {
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState<Certificate[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortKey>('createdAt');
  const [dir, setDir] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Отметки живут по id и переживают смену страницы: выдачу часто собирают
  // из людей, найденных разными запросами.
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [locales, setLocales] = useState<CertLocale[]>(['ru']);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  // Запросы могут вернуться не в том порядке, в каком ушли; помечаем актуальный
  const requestId = useRef(0);

  const load = useCallback(async (q: string) => {
    const mine = ++requestId.current;
    setLoading(true);
    setError('');
    try {
      const result = await listCertificates({ q, sort, dir, page, perPage: PER_PAGE });
      if (mine !== requestId.current) return; // пришёл ответ на устаревший запрос
      setRows(result.rows);
      setTotal(result.total);
    } catch (e) {
      if (mine !== requestId.current) return;
      setError(e instanceof Error ? e.message : 'Не удалось загрузить список');
    } finally {
      if (mine === requestId.current) setLoading(false);
    }
  }, [sort, dir, page]);

  // Поиск с задержкой, чтобы не дёргать базу на каждую букву
  useEffect(() => {
    const timer = setTimeout(() => load(query), 300);
    return () => clearTimeout(timer);
  }, [query, load, refreshToken]);

  const toggleSort = (key: SortKey) => {
    if (sort === key) setDir(dir === 'asc' ? 'desc' : 'asc');
    else { setSort(key); setDir('asc'); }
    setPage(1);
  };

  const allOnPage = rows.length > 0 && rows.every((row) => selected.has(row.id));

  const toggleRow = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const togglePage = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const row of rows) {
        if (allOnPage) next.delete(row.id);
        else next.add(row.id);
      }
      return next;
    });
  };

  const toggleLocale = (key: CertLocale) => {
    setLocales((prev) => (prev.includes(key) ? prev.filter((l) => l !== key) : [...prev, key]));
  };

  const handleDownload = async () => {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const skipped = await downloadCertificates([...selected], locales);
      setNotice(
        skipped
          ? `Файл собран. Пропущено записей без выбранных языков: ${skipped}`
          : 'Файл собран и скачивается',
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось собрать PDF');
    } finally {
      setBusy(false);
    }
  };

  const handleSample = async () => {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await downloadSample(locales[0] ?? 'ru');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось собрать образец');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (row: Certificate) => {
    const name = `${row.last_name_ru} ${row.first_name_ru}`;
    if (!confirm(`Удалить сертификат ${row.code} (${name})?\n\nДействие необратимо.`)) return;
    try {
      await removeCertificate(row.id);
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(row.id);
        return next;
      });
      load(query);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Не удалось удалить');
    }
  };

  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <div>
      <div style={{ ...s.spread, marginBottom: '16px' }}>
        <div style={{ ...s.row, flex: 1, maxWidth: '520px' }}>
          <input
            style={s.input}
            placeholder="Поиск: номер, имя, фамилия, компания, курс, преподаватель"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          />
          {query && (
            <button style={s.button} onClick={() => setQuery('')}>Сбросить</button>
          )}
        </div>
        <button style={s.primary} onClick={onCreate}>+ Выдать сертификат</button>
      </div>

      <div style={{ ...s.spread, ...s.bar, marginBottom: '14px' }}>
        <div style={{ ...s.row, flexWrap: 'wrap' }}>
          <span style={s.muted}>Языки:</span>
          {LOCALES.map((locale) => (
            <label key={locale.key} style={s.check}>
              <input
                type="checkbox"
                checked={locales.includes(locale.key)}
                onChange={() => toggleLocale(locale.key)}
              />
              {locale.title}
            </label>
          ))}
          <button style={s.button} onClick={handleSample} disabled={busy} title="PDF с текущей печатью и подписью">
            Образец
          </button>
        </div>

        <div style={{ ...s.row, flexWrap: 'wrap' }}>
          <span style={s.muted}>
            {selected.size ? `Отмечено: ${selected.size}` : 'Отметьте строки для выдачи'}
          </span>
          <button
            style={s.primary}
            onClick={handleDownload}
            disabled={busy || !selected.size || !locales.length}
          >
            {busy ? 'Собираем…' : 'Скачать PDF'}
          </button>
          {selected.size > 0 && (
            <button style={s.button} onClick={() => setSelected(new Set())}>Снять отметки</button>
          )}
        </div>
      </div>

      {error && <div style={{ ...s.error, marginBottom: '14px' }}>{error}</div>}
      {notice && <div style={{ ...s.notice, marginBottom: '14px' }}>{notice}</div>}

      <div style={{ ...s.muted, marginBottom: '10px' }}>
        {loading ? 'Загрузка…' : `Найдено: ${total}`}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={{ ...s.th, width: '36px' }}>
                <input
                  type="checkbox"
                  checked={allOnPage}
                  onChange={togglePage}
                  disabled={!rows.length}
                  title="Отметить всю страницу"
                />
              </th>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  style={{ ...s.th, cursor: 'pointer' }}
                  onClick={() => toggleSort(col.key)}
                  title="Сортировать"
                >
                  {col.title}
                  {sort === col.key && <span style={{ opacity: 0.6 }}>{dir === 'asc' ? ' ↑' : ' ↓'}</span>}
                </th>
              ))}
              <th style={s.th}>Языки</th>
              <th style={s.th} />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const v = validity(row);
              return (
                <tr key={row.id}>
                  <td style={s.td}>
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                  <td style={{ ...s.td, ...s.code }}>{row.code}</td>
                  <td style={s.td}>{row.last_name_ru}</td>
                  <td style={s.td}>{row.first_name_ru}</td>
                  <td style={s.td}>{row.company_ru || '—'}</td>
                  <td style={{ ...s.td, maxWidth: '260px' }}>{row.course_ru}</td>
                  <td style={s.td}>{row.issued_at || '—'}</td>
                  <td style={s.td}><span style={s.badge(v.tone)}>{v.text}</span></td>
                  <td style={s.td}>
                    <span style={{ ...s.muted, whiteSpace: 'nowrap' }}>
                      RU{row.has_en ? ' · EN' : ''}{row.has_kz ? ' · KZ' : ''}
                    </span>
                  </td>
                  <td style={{ ...s.td, whiteSpace: 'nowrap' }}>
                    <button style={{ ...s.button, height: '32px', marginRight: '6px' }} onClick={() => onEdit(row)}>
                      Открыть
                    </button>
                    <button style={s.danger} onClick={() => handleDelete(row)}>Удалить</button>
                  </td>
                </tr>
              );
            })}

            {!loading && !rows.length && (
              <tr>
                <td style={{ ...s.td, ...s.muted, textAlign: 'center', padding: '32px' }} colSpan={10}>
                  {query ? 'Ничего не найдено' : 'Пока ни одного сертификата'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div style={{ ...s.row, marginTop: '16px', justifyContent: 'center' }}>
          <button style={s.button} disabled={page <= 1} onClick={() => setPage(page - 1)}>← Назад</button>
          <span style={s.muted}>Страница {page} из {pages}</span>
          <button style={s.button} disabled={page >= pages} onClick={() => setPage(page + 1)}>Вперёд →</button>
        </div>
      )}
    </div>
  );
}
