import React, { useRef, useState } from 'react';
import { downloadTemplate, importRegistry, type ImportIssue, type ImportResult } from './api';
import { s } from './styles';

/**
 * Загрузка реестра из книги Excel.
 *
 * Две кнопки намеренно разные: «Проверить» прогоняет файл через те же
 * проверки, но ничего не пишет. На трёх тысячах строк это единственный
 * способ убедиться, что файл в порядке, не рискуя реестром.
 */

const HINTS = [
  'Шаблон берите свежий: списки курсов и преподавателей попадают в него на момент скачивания.',
  'Курс и преподаватель выбираются из выпадающего списка — по ним подтягиваются перевод и срок действия.',
  'Колонка «№» связывает листы: английское и казахское написание пишутся в строке с тем же номером.',
  'Номер сертификата можно не заполнять — система выдаст свой. Вписанный номер остаётся как есть.',
  'Если хотя бы одна строка с замечанием, не загружается ничего: сперва правится файл.',
];

function IssueList({ issues, total }: { issues: ImportIssue[]; total?: number }) {
  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ ...s.error, marginBottom: '12px' }}>
        Замечаний: {total ?? issues.length}. Реестр не изменён — поправьте файл и загрузите снова.
      </div>

      <div style={{ maxHeight: '420px', overflowY: 'auto', border: '1px solid rgba(128,128,128,0.25)', borderRadius: '8px' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Лист</th>
              <th style={s.th}>Строка</th>
              <th style={s.th}>Ячейка</th>
              <th style={s.th}>Что не так</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, i) => (
              <tr key={i}>
                <td style={s.td}>{issue.sheet}</td>
                <td style={{ ...s.td, ...s.code }}>{issue.row || '—'}</td>
                <td style={s.td}>{issue.column || '—'}</td>
                <td style={s.td}>{issue.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {total !== undefined && total > issues.length && (
        <p style={{ ...s.muted, marginTop: '10px' }}>
          Показаны первые {issues.length} из {total}. Остальные появятся после правки этих.
        </p>
      )}
    </div>
  );
}

export function CertificateImport({ onDone }: { onDone: () => void }) {
  const input = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState<'' | 'template' | 'check' | 'import'>('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ImportResult | null>(null);
  const [notice, setNotice] = useState('');

  const pick = (chosen: File | null) => {
    setFile(chosen);
    setResult(null);
    setError('');
    setNotice('');
  };

  const getTemplate = async () => {
    setBusy('template');
    setError('');
    try {
      await downloadTemplate();
      setNotice('Шаблон скачан');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось скачать шаблон');
    } finally {
      setBusy('');
    }
  };

  const run = async (dryRun: boolean) => {
    if (!file) return;

    setBusy(dryRun ? 'check' : 'import');
    setError('');
    setNotice('');
    setResult(null);

    try {
      const outcome = await importRegistry(file, dryRun);
      setResult(outcome);

      if (outcome.ok && dryRun) {
        setNotice(`Файл в порядке: готово к загрузке записей — ${outcome.checked ?? 0}`);
      }
      if (outcome.ok && !dryRun) {
        setNotice(`Загружено записей: ${outcome.imported ?? 0}`);
        pick(null);
        if (input.current) input.current.value = '';
        onDone();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось обработать файл');
    } finally {
      setBusy('');
    }
  };

  const issues = result && !result.ok ? result.errors : [];

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ ...s.card, marginBottom: '16px' }}>
        <h2 style={{ ...s.h1, fontSize: '17px', marginBottom: '10px' }}>Шаблон</h2>
        <p style={{ ...s.muted, marginTop: 0 }}>
          Книга с тремя листами по языкам. На русском — даты, часы, курс и преподаватель;
          на английском и казахском только написание имени, компании и места.
        </p>
        <button style={s.button} onClick={getTemplate} disabled={busy !== ''}>
          {busy === 'template' ? 'Готовим…' : 'Скачать шаблон'}
        </button>
      </div>

      <div style={{ ...s.card, marginBottom: '16px' }}>
        <h2 style={{ ...s.h1, fontSize: '17px', marginBottom: '10px' }}>Загрузка</h2>

        <input
          ref={input}
          type="file"
          accept=".xlsx"
          onChange={(e) => pick(e.target.files?.[0] ?? null)}
          style={{ ...s.input, height: 'auto', padding: '9px 12px', marginBottom: '14px' }}
        />

        <div style={s.row}>
          <button style={s.button} onClick={() => run(true)} disabled={!file || busy !== ''}>
            {busy === 'check' ? 'Проверяем…' : 'Проверить файл'}
          </button>
          <button style={s.primary} onClick={() => run(false)} disabled={!file || busy !== ''}>
            {busy === 'import' ? 'Загружаем…' : 'Загрузить в реестр'}
          </button>
        </div>

        {error && <div style={{ ...s.error, marginTop: '14px' }}>{error}</div>}
        {notice && <div style={{ ...s.notice, marginTop: '14px' }}>{notice}</div>}

        {issues.length > 0 && <IssueList issues={issues} total={result?.errorsTotal} />}
      </div>

      <div style={{ ...s.card, marginBottom: '40px' }}>
        <h2 style={{ ...s.h1, fontSize: '17px', marginBottom: '10px' }}>Что нужно знать</h2>
        <ul style={{ ...s.muted, margin: 0, paddingLeft: '18px', lineHeight: 1.7 }}>
          {HINTS.map((hint) => <li key={hint}>{hint}</li>)}
        </ul>
      </div>
    </div>
  );
}
