import React, { useEffect, useState } from 'react';
import { checkKey, getKey, setKey, type Certificate } from './api';
import { CertificateList } from './CertificateList';
import { CertificateForm } from './CertificateForm';
import { s } from './styles';

type View = { name: 'list' } | { name: 'form'; row: Certificate | null };

/** Экран ввода ключа доступа. */
function KeyGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;

    setChecking(true);
    setError('');
    setKey(value.trim());
    try {
      if (await checkKey()) onUnlock();
      else { setKey(''); setError('Ключ не подошёл'); }
    } catch (e) {
      setKey('');
      setError(e instanceof Error ? e.message : 'Не удалось проверить ключ');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={submit} style={{ ...s.card, width: '380px' }}>
        <h2 style={{ ...s.h1, fontSize: '18px', marginBottom: '6px' }}>Доступ к реестру</h2>
        <p style={{ ...s.muted, marginTop: 0, marginBottom: '16px' }}>
          Введите ключ один раз — браузер запомнит его.
        </p>

        <input
          style={s.input}
          type="password"
          autoFocus
          placeholder="Ключ доступа"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        {error && <div style={{ ...s.error, marginTop: '12px' }}>{error}</div>}

        <button type="submit" style={{ ...s.primary, width: '100%', marginTop: '14px' }} disabled={checking}>
          {checking ? 'Проверяем…' : 'Войти'}
        </button>
      </form>
    </div>
  );
}

export default function CertificatesTool() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [view, setView] = useState<View>({ name: 'list' });
  const [refreshToken, setRefreshToken] = useState(0);

  // Ключ мог остаться с прошлого раза — проверяем его молча
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getKey()) { setUnlocked(false); return; }
      try {
        const ok = await checkKey();
        if (!cancelled) setUnlocked(ok);
      } catch {
        if (!cancelled) setUnlocked(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (unlocked === null) {
    return <div style={{ ...s.page, ...s.muted }}>Проверяем доступ…</div>;
  }

  if (!unlocked) return <KeyGate onUnlock={() => setUnlocked(true)} />;

  if (view.name === 'form') {
    return (
      <div style={s.page}>
        <CertificateForm
          row={view.row}
          onCancel={() => setView({ name: 'list' })}
          onSaved={() => {
            setRefreshToken((n) => n + 1);
            setView({ name: 'list' });
          }}
        />
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={{ ...s.spread, marginBottom: '20px' }}>
        <div>
          <h1 style={s.h1}>Сертификаты</h1>
          <p style={{ ...s.muted, margin: '4px 0 0' }}>
            Реестр выданных сертификатов
          </p>
        </div>
        <button
          style={s.button}
          onClick={() => { setKey(''); setUnlocked(false); }}
          title="Забыть ключ на этом устройстве"
        >
          Выйти
        </button>
      </div>

      <CertificateList
        refreshToken={refreshToken}
        onCreate={() => setView({ name: 'form', row: null })}
        onEdit={(row) => setView({ name: 'form', row })}
      />
    </div>
  );
}
