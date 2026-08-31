/**
 * Применяет db/schema.sql к базе из DATABASE_URL.
 * Скрипт идемпотентный — можно гонять после каждой правки схемы.
 *
 *   node db/apply.mjs
 */
import { readFileSync } from 'fs';
import { neon } from '@neondatabase/serverless';

function readEnv(name) {
  if (process.env[name]) return process.env[name];
  try {
    const file = readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
    return file.match(new RegExp('^' + name + '=(.+)$', 'm'))?.[1]?.trim();
  } catch {
    return undefined;
  }
}

const url = readEnv('DATABASE_URL');
if (!url) {
  console.error('DATABASE_URL не найден ни в окружении, ни в .env.local');
  process.exit(1);
}

const sql = neon(url);
const source = readFileSync(new URL('./schema.sql', import.meta.url), 'utf8');

/**
 * Режем файл на выражения. Тела функций в $$ ... $$ содержат точки с запятой,
 * поэтому просто split(';') сломался бы — отслеживаем долларовые кавычки.
 */
function splitStatements(text) {
  const out = [];
  let current = '';
  let inDollar = false;

  for (const line of text.split(/\r?\n/)) {
    const dollars = (line.match(/\$\$/g) || []).length;
    current += line + '\n';
    if (dollars % 2 === 1) inDollar = !inDollar;
    if (!inDollar && line.trimEnd().endsWith(';')) {
      const stmt = current.trim();
      if (stmt && !stmt.split('\n').every((l) => l.trim().startsWith('--'))) out.push(stmt);
      current = '';
    }
  }
  if (current.trim()) out.push(current.trim());
  return out;
}

const statements = splitStatements(source);
console.log('выражений в схеме: ' + statements.length);

for (const [i, stmt] of statements.entries()) {
  const label = stmt.replace(/\s+/g, ' ').slice(0, 62);
  try {
    await sql.query(stmt);
    console.log('  ' + String(i + 1).padStart(2) + '. ok   ' + label);
  } catch (error) {
    console.error('  ' + String(i + 1).padStart(2) + '. СБОЙ ' + label);
    console.error('      ' + error.message);
    process.exit(1);
  }
}

const [{ count }] = await sql`SELECT count(*)::int AS count FROM certificates`;
console.log('\nсхема применена, записей в таблице: ' + count);
