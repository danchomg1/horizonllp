import React, { useCallback, useEffect, useState } from 'react';
import {
  listChanges, getChange, acknowledgeChange, acknowledgeChanges,
  type ChangeEntry, type ChangedRow,
} from './api';
import { s } from './styles';

/**
 * Журнал правок справочника.
 *
 * Правка курса или преподавателя расходится по всему реестру сама, поэтому
 * её видно на записях: жёлтый восклицательный знак с пояснением, что и когда
 * изменилось. Галочка снимает знак сразу у всех записей этой правки —
 * отмечать их по одной бессмысленно, изменение-то было одно.
 */

const KIND: Record<ChangeEntry['kind'], string> = {
  course: 'Курс',
  instructor: 'Преподаватель',
  completion: 'Текст о прохождении',
  city: 'Место проведения',
};

/** «русское название», «английское написание имени», «срок действия». */
export function fieldLabel(change: ChangeEntry): string {
  if (change.field === 'validity') return 'срок действия';
  if (change.field === 'hours') return 'продолжительность';

  const what = change.kind === 'instructor' ? 'написание имени'
    : change.kind === 'completion' ? 'текст' : 'название';
  const lang = change.field === 'nameRu' ? 'русское'
    : change.field === 'nameEn' ? 'английское' : 'казахское';
  return `${lang} ${what}`;
}

/** «02.09.2026, 14:31» — журнал читают, чтобы вспомнить, когда это было. */
export function whenLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/* ------------------------------------------------------------------ *
 * Карточка одной правки                                               *
 * ------------------------------------------------------------------ */

interface CardProps {
  change: ChangeEntry;
  onAck?: (id: number) => void;
  onOpen?: (id: number) => void;
  busy?: boolean;
  /** Галочка выбора: показывается только у неотмеченных правок в журнале. */
  selected?: boolean;
  onSelect?: (id: number, on: boolean) => void;
}

export function ChangeCard({ change, onAck, onOpen, busy, selected, onSelect }: CardProps) {
  // Отмеченная правка уходит в серое: смотреть на неё больше не нужно
  const done = Boolean(change.acknowledged_at);
  const tone = done
    ? { background: 'rgba(128,128,128,0.05)', borderColor: 'rgba(128,128,128,0.25)' }
    : { background: 'rgba(210,160,40,0.07)', borderColor: 'rgba(210,160,40,0.4)' };

  return (
    <div style={{ ...s.card, ...tone, opacity: done ? 0.7 : 1 }}>
      <div style={{ ...s.spread, alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ minWidth: 0, display: 'flex', gap: '10px' }}>
          {onSelect && !done && (
            <input
              type="checkbox"
              checked={Boolean(selected)}
              onChange={(e) => onSelect(change.id, e.target.checked)}
              style={{ marginTop: '3px' }}
            />
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, marginBottom: '2px' }}>
              {KIND[change.kind]}: {change.title}
            </div>
            <div style={{ ...s.muted, marginBottom: '10px' }}>
              изменено {fieldLabel(change)} · {whenLabel(change.created_at)}
            </div>

            <div style={{ fontSize: '13px', lineHeight: 1.6 }}>
              <div><span style={s.muted}>было:&nbsp;&nbsp;</span>{change.old_value || '—'}</div>
              <div><span style={s.muted}>стало:</span> <strong>{change.new_value || '—'}</strong></div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
          {onAck && !done && (
            <button
              style={s.button}
              onClick={() => onAck(change.id)}
              disabled={busy}
              title="Снять предупреждение со всех записей этой правки"
            >
              ✓ Отметить
            </button>
          )}
          {done && (
            <span style={s.badge('off')}>отмечено {whenLabel(change.acknowledged_at!)}</span>
          )}
          {onOpen && (
            <button style={s.button} onClick={() => onOpen(change.id)}>
              Записи: {change.affected}
            </button>
          )}
          {!onOpen && <span style={s.muted}>записей: {change.affected}</span>}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Значок на строке реестра                                            *
 * ------------------------------------------------------------------ */

interface AlertProps {
  changes: ChangeEntry[];
  onAck: (id: number) => void;
  busy: boolean;
}

/**
 * Жёлтый восклицательный знак рядом с номером. Наведение раскрывает по
 * панели на каждую правку — у каждой своя галочка.
 */
export function ChangeAlerts({ changes, onAck, busy }: AlertProps) {
  const [open, setOpen] = useState(false);
  if (!changes.length) return null;

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        style={{
          cursor: 'help', color: '#d2a028', fontSize: '15px',
          fontWeight: 700, marginRight: '6px', userSelect: 'none',
        }}
        aria-label={`Изменений в справочнике: ${changes.length}`}
      >
        ⚠
      </span>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 40,
          width: '460px', maxHeight: '340px', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: '8px',
          padding: '4px', borderRadius: '8px',
          background: 'var(--card-bg-color, #1a1a1a)',
          border: '1px solid rgba(128,128,128,0.35)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        }}>
          {changes.map((change) => (
            <ChangeCard key={change.id} change={change} onAck={onAck} busy={busy} />
          ))}
        </div>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Экран журнала                                                       *
 * ------------------------------------------------------------------ */

function AffectedRows({ rows }: { rows: ChangedRow[] }) {
  if (!rows.length) {
    return <p style={{ ...s.muted, margin: '12px 0 0' }}>Ни одной записи эта правка не задела.</p>;
  }

  return (
    <div style={{ marginTop: '12px', maxHeight: '420px', overflowY: 'auto',
      border: '1px solid rgba(128,128,128,0.25)', borderRadius: '8px' }}>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Номер</th>
            <th style={s.th}>Фамилия, имя</th>
            <th style={s.th}>Курс</th>
            <th style={s.th}>Выдан</th>
            <th style={s.th}>Действует до</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td style={{ ...s.td, ...s.code }}>{row.code}</td>
              <td style={s.td}>{row.last_name_ru} {row.first_name_ru}</td>
              <td style={s.td}>{row.course_ru}</td>
              <td style={s.td}>{row.issued_at ?? '—'}</td>
              <td style={s.td}>{row.perpetual ? 'бессрочный' : row.valid_until ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface JournalProps {
  /** Правка, которую надо раскрыть сразу — приход из плашки над списком. */
  focus?: number | null;
  onChanged: () => void;
}

export function CertificateChanges({ focus, onChanged }: JournalProps) {
  const [changes, setChanges] = useState<ChangeEntry[]>([]);
  const [openId, setOpenId] = useState<number | null>(focus ?? null);
  const [rows, setRows] = useState<ChangedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await listChanges(false);
      setChanges(result.changes);
      // Отмеченные правки выбирать больше не из чего
      setSelected((prev) => {
        const open = new Set(result.changes.filter((c) => !c.acknowledged_at).map((c) => c.id));
        return new Set([...prev].filter((id) => open.has(id)));
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось прочитать журнал');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  // Список задетых записей грузится только для раскрытой правки
  useEffect(() => {
    if (openId === null) { setRows([]); return; }
    let cancelled = false;
    (async () => {
      try {
        const result = await getChange(openId);
        if (!cancelled) setRows(result.rows);
      } catch {
        if (!cancelled) setRows([]);
      }
    })();
    return () => { cancelled = true; };
  }, [openId]);

  const run = async (action: () => Promise<unknown>) => {
    setBusy(true);
    setError('');
    try {
      await action();
      await load();
      onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось отметить');
    } finally {
      setBusy(false);
    }
  };

  const ack = (id: number) => run(() => acknowledgeChange(id));
  const ackSelected = () => run(() => acknowledgeChanges({ ids: [...selected] }));
  const ackAll = () => run(() => acknowledgeChanges({ all: true }));

  const toggle = (id: number, on: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  if (loading) return <div style={s.muted}>Читаем журнал…</div>;

  if (!changes.length) {
    return (
      <div style={s.card}>
        <p style={{ margin: 0 }}>Справочник пока не правили — журнал пуст.</p>
        <p style={{ ...s.muted, marginBottom: 0 }}>
          Сюда попадают правки названий курсов и преподавателей, текстов о прохождении
          и сроков действия — вместе со списком записей, которых они коснулись.
        </p>
      </div>
    );
  }

  const open = changes.find((c) => c.id === openId) ?? null;
  const pending = changes.filter((c) => !c.acknowledged_at);
  const allChosen = pending.length > 0 && pending.every((c) => selected.has(c.id));

  return (
    <div style={{ maxWidth: '980px' }}>
      {error && <div style={{ ...s.error, marginBottom: '16px' }}>{error}</div>}

      {pending.length > 0 && (
        <div style={{ ...s.spread, ...s.bar, marginBottom: '16px' }}>
          <label style={s.check}>
            <input
              type="checkbox"
              checked={allChosen}
              onChange={() => setSelected(allChosen ? new Set() : new Set(pending.map((c) => c.id)))}
            />
            Выбрать неотмеченные ({pending.length})
          </label>

          <div style={{ ...s.row, flexWrap: 'wrap' }}>
            <button style={s.button} onClick={ackSelected} disabled={busy || !selected.size}>
              Отметить выбранные{selected.size ? ` (${selected.size})` : ''}
            </button>
            <button style={s.primary} onClick={ackAll} disabled={busy}>
              Отметить все
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
        {changes.map((change) => (
          <div key={change.id}>
            <ChangeCard
              change={change}
              onAck={ack}
              onOpen={(id) => setOpenId(id === openId ? null : id)}
              busy={busy}
              selected={selected.has(change.id)}
              onSelect={toggle}
            />
            {open?.id === change.id && <AffectedRows rows={rows} />}
          </div>
        ))}
      </div>
    </div>
  );
}
