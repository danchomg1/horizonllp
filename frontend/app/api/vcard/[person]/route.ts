import { readFile } from 'fs/promises';
import path from 'path';
import { getContact, telHref, fullName, ORG, SITE, POSTCODE } from '../../../lib/contacts';
import { normalizeLocale, type Locale } from '../../../lib/locale';

/** Экранирование значений vCard: обратный слеш, точка с запятой, запятая, перевод строки. */
function esc(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Перенос длинных строк по 75 октетов (RFC 2426). Считаем именно байты UTF-8:
 * если резать по символам, кириллица и казахские буквы разъедутся.
 */
function fold(line: string): string {
  const LIMIT = 74;
  const out: string[] = [];
  let current = '';
  let bytes = 0;

  for (const char of line) {
    const size = Buffer.byteLength(char, 'utf8');
    if (bytes + size > LIMIT) {
      out.push(current);
      current = ' ' + char; // продолжение строки начинается с пробела
      bytes = 1 + size;
    } else {
      current += char;
      bytes += size;
    }
  }
  out.push(current);
  return out.join('\r\n');
}

let logoBase64: string | null = null;

async function getLogo(): Promise<string | null> {
  if (logoBase64 !== null) return logoBase64 || null;
  try {
    const file = path.join(process.cwd(), 'public', 'assets', 'email', 'logo-horizon.png');
    logoBase64 = (await readFile(file)).toString('base64');
    return logoBase64;
  } catch {
    logoBase64 = '';
    return null;
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ person: string }> },
) {
  const { person } = await params;
  const contact = getContact(person);
  if (!contact) return new Response('Not found', { status: 404 });

  const url = new URL(req.url);
  const locale: Locale = normalizeLocale(url.searchParams.get('lang') || undefined);

  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(contact.family[locale])};${esc(contact.given[locale])};;;`,
    `FN:${esc(fullName(contact, locale))}`,
    `ORG:${esc(ORG[locale])}`,
    `TITLE:${esc(contact.title[locale])}`,
  ];

  contact.phones.forEach((phone, i) => {
    // Первый номер помечаем предпочтительным, чтобы телефон звонил именно на него
    const type = i === 0 ? 'CELL,VOICE,PREF' : 'CELL,VOICE';
    lines.push(`TEL;TYPE=${type}:${telHref(phone)}`);
  });

  lines.push(`EMAIL;TYPE=INTERNET,WORK:${esc(contact.email)}`);
  lines.push(`URL:${SITE}`);
  lines.push(
    `ADR;TYPE=WORK:;;${esc(contact.street[locale])};${esc(contact.city[locale])};;${POSTCODE};${esc(contact.country[locale])}`,
  );

  const logo = await getLogo();
  if (logo) lines.push(`PHOTO;ENCODING=b;TYPE=PNG:${logo}`);

  lines.push(`REV:${new Date().toISOString().replace(/\.\d{3}/, '')}`);
  lines.push('END:VCARD');

  const vcard = lines.map(fold).join('\r\n') + '\r\n';
  const filename = `${contact.family.en}-${contact.given.en}.vcf`;

  return new Response(vcard, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
