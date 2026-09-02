'use client';

import React, { useCallback, useEffect, useState } from 'react';

/**
 * Проверка сертификата по номеру.
 *
 * Номер вводит посторонний человек с бумаги в руках, поэтому здесь принимаются
 * оба номера — и выданный системой, и прежний со старого бланка: разбираться,
 * какой из них у него на руках, он не должен.
 *
 * Код можно передать и адресом — `?code=ABC23`. Тогда проверка идёт сразу,
 * без нажатия кнопки: так работает переход по ссылке из письма.
 */

export interface VerifyLabels {
  title: string;
  lead: string;
  placeholder: string;
  submit: string;
  checking: string;
  valid: string;
  expired: string;
  perpetual: string;
  notFound: string;
  notFoundHint: string;
  invalid: string;
  failed: string;
  name: string;
  course: string;
  issued: string;
  until: string;
  number: string;
}

interface Result {
  found: boolean;
  code?: string;
  firstName?: string;
  lastName?: string;
  course?: string;
  issuedAtLabel?: string | null;
  validUntilLabel?: string | null;
  perpetual?: boolean;
  expired?: boolean;
  reason?: string;
}

const FIELD =
  'w-full h-[52px] px-4 rounded-[12px] border border-black/30 bg-white ' +
  'text-[15px] text-black placeholder-black/40 outline-none focus:border-black/60 ' +
  'tracking-[0.08em] uppercase';

const SUBMIT =
  'h-[52px] px-8 rounded-[12px] bg-[#0B0073] text-white text-[15px] font-semibold ' +
  'disabled:opacity-50 hover:opacity-90 transition-opacity whitespace-nowrap';

export default function VerifyForm({ labels, initialCode }: { labels: VerifyLabels; initialCode: string }) {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const check = useCallback(async (value: string) => {
    const query = value.trim();
    if (!query) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/certificates/verify?code=${encodeURIComponent(query)}`);
      const body = (await res.json()) as Result;
      setResult(body);
    } catch {
      setResult({ found: false, reason: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  // Код из адреса проверяем сразу: по такой ссылке приходят с готовым номером
  useEffect(() => {
    if (initialCode) void check(initialCode);
  }, [initialCode, check]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    void check(code);
  };

  return (
    <div className="w-full max-w-[720px]">
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          className={FIELD}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={labels.placeholder}
          aria-label={labels.number}
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className={SUBMIT} disabled={loading || !code.trim()}>
          {loading ? labels.checking : labels.submit}
        </button>
      </form>

      {result && (result.found ? <Found result={result} labels={labels} /> : <Missing result={result} labels={labels} />)}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Найден                                                              *
 * ------------------------------------------------------------------ */

function Found({ result, labels }: { result: Result; labels: VerifyLabels }) {
  const expired = Boolean(result.expired);

  // Действующий — зелёным, просроченный — красным: цвет здесь несёт смысл,
  // поэтому дублируется словами в заголовке карточки.
  const tone = expired
    ? { box: 'border-[#c0392b]/50 bg-[#c0392b]/[0.06]', text: 'text-[#a5281b]' }
    : { box: 'border-[#1e8449]/50 bg-[#1e8449]/[0.06]', text: 'text-[#166b3a]' };

  const until = result.perpetual
    ? labels.perpetual
    : result.validUntilLabel ?? '—';

  return (
    <div className={`rounded-[15px] border p-6 sm:p-8 ${tone.box}`}>
      <div className={`text-[18px] sm:text-[20px] font-bold mb-6 ${tone.text}`}>
        {expired ? labels.expired : labels.valid}
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-x-6 gap-y-3">
        <Row label={labels.name}>{`${result.lastName ?? ''} ${result.firstName ?? ''}`.trim() || '—'}</Row>
        <Row label={labels.course}>{result.course || '—'}</Row>
        <Row label={labels.issued}>{result.issuedAtLabel || '—'}</Row>
        <Row label={labels.until} strong={expired}>{until}</Row>
        <Row label={labels.number} mono>{result.code || '—'}</Row>
      </dl>
    </div>
  );
}

function Row({
  label, children, mono, strong,
}: { label: string; children: React.ReactNode; mono?: boolean; strong?: boolean }) {
  return (
    <>
      <dt className="text-[13px] text-black/55 sm:pt-[2px]">{label}</dt>
      <dd
        className={`text-[15px] text-black/90 mb-2 sm:mb-0 ${mono ? 'font-mono tracking-[0.08em]' : ''} ${
          strong ? 'font-semibold' : ''
        }`}
      >
        {children}
      </dd>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Не найден                                                           *
 * ------------------------------------------------------------------ */

function Missing({ result, labels }: { result: Result; labels: VerifyLabels }) {
  const invalid = result.reason === 'invalid';
  const failed = result.reason === 'error';

  return (
    <div className="rounded-[15px] border border-black/25 bg-black/[0.03] p-6 sm:p-8">
      <div className="text-[18px] sm:text-[20px] font-bold text-black/75 mb-2">
        {failed ? labels.failed : invalid ? labels.invalid : labels.notFound}
      </div>
      {!failed && <p className="text-[13px] text-black/55 m-0">{labels.notFoundHint}</p>}
    </div>
  );
}
