import type { CSSProperties } from 'react';

/**
 * Стили инструмента. Studio бывает в светлой и тёмной теме, поэтому
 * цвет текста наследуется, а рамки и подложки заданы прозрачностями —
 * так интерфейс читается в обеих.
 */
export const BRAND = '#0B0073';

export const s = {
  page: {
    padding: '24px',
    height: '100%',
    overflow: 'auto',
    fontFamily: 'inherit',
    color: 'inherit',
  } as CSSProperties,

  h1: { margin: 0, fontSize: '22px', fontWeight: 700 } as CSSProperties,
  muted: { opacity: 0.6, fontSize: '13px' } as CSSProperties,

  row: { display: 'flex', gap: '10px', alignItems: 'center' } as CSSProperties,
  spread: { display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' } as CSSProperties,

  input: {
    height: '38px',
    padding: '0 12px',
    borderRadius: '6px',
    border: '1px solid rgba(128,128,128,0.35)',
    background: 'rgba(128,128,128,0.06)',
    color: 'inherit',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  } as CSSProperties,

  label: {
    display: 'block',
    fontSize: '12px',
    opacity: 0.7,
    marginBottom: '5px',
  } as CSSProperties,

  button: {
    height: '38px',
    padding: '0 16px',
    borderRadius: '6px',
    border: '1px solid rgba(128,128,128,0.35)',
    background: 'transparent',
    color: 'inherit',
    fontSize: '14px',
    fontFamily: 'inherit',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  } as CSSProperties,

  primary: {
    height: '38px',
    padding: '0 18px',
    borderRadius: '6px',
    border: `1px solid ${BRAND}`,
    background: BRAND,
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  } as CSSProperties,

  danger: {
    height: '32px',
    padding: '0 12px',
    borderRadius: '6px',
    border: '1px solid rgba(220,60,60,0.5)',
    background: 'transparent',
    color: '#e05252',
    fontSize: '13px',
    fontFamily: 'inherit',
    cursor: 'pointer',
  } as CSSProperties,

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
  } as CSSProperties,

  th: {
    textAlign: 'left',
    padding: '10px 12px',
    borderBottom: '1px solid rgba(128,128,128,0.3)',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  } as CSSProperties,

  td: {
    padding: '10px 12px',
    borderBottom: '1px solid rgba(128,128,128,0.15)',
    verticalAlign: 'top',
  } as CSSProperties,

  code: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontWeight: 600,
    letterSpacing: '0.5px',
  } as CSSProperties,

  card: {
    border: '1px solid rgba(128,128,128,0.25)',
    borderRadius: '8px',
    padding: '18px',
    background: 'rgba(128,128,128,0.04)',
  } as CSSProperties,

  /** Полоса действий над таблицей. */
  bar: {
    flexWrap: 'wrap',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid rgba(128,128,128,0.25)',
    background: 'rgba(128,128,128,0.05)',
  } as CSSProperties,

  check: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    userSelect: 'none',
  } as CSSProperties,

  notice: {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid rgba(40,160,90,0.4)',
    background: 'rgba(40,160,90,0.08)',
    color: '#2ea36a',
    fontSize: '13px',
  } as CSSProperties,

  error: {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid rgba(220,60,60,0.4)',
    background: 'rgba(220,60,60,0.08)',
    color: '#e05252',
    fontSize: '13px',
  } as CSSProperties,

  badge: (tone: 'ok' | 'warn' | 'off'): CSSProperties => ({
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    whiteSpace: 'nowrap',
    border: '1px solid',
    borderColor:
      tone === 'ok' ? 'rgba(40,160,90,0.5)' : tone === 'warn' ? 'rgba(220,60,60,0.5)' : 'rgba(128,128,128,0.4)',
    color: tone === 'ok' ? '#2ea36a' : tone === 'warn' ? '#e05252' : 'inherit',
    opacity: tone === 'off' ? 0.7 : 1,
  }),
};
