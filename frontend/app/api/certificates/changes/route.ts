import { isAuthorized, unauthorized } from '../../../lib/adminAuth';
import { listChanges, acknowledgeChanges } from '../../../lib/db';

export const runtime = 'nodejs';

/**
 * Журнал правок справочника: что менялось, когда и сколько записей задело.
 * `?open=1` оставляет только неотмеченные — по ним список рисует
 * предупреждения.
 */
export async function GET(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  const onlyOpen = new URL(req.url).searchParams.get('open') === '1';

  try {
    const changes = await listChanges(onlyOpen);
    return Response.json({ changes });
  } catch (error) {
    console.error('Не удалось прочитать журнал изменений:', error);
    return Response.json({ error: 'Ошибка чтения журнала' }, { status: 500 });
  }
}

/**
 * Отмечает просмотренными сразу несколько правок: `{ ids: [...] }` —
 * выбранные, `{ all: true }` — все неотмеченные.
 */
export async function POST(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  let body: { ids?: unknown; all?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Тело запроса не является JSON' }, { status: 400 });
  }

  const ids = Array.isArray(body.ids) ? body.ids.map(Number).filter(Number.isInteger) : [];
  if (!ids.length && body.all !== true) {
    return Response.json({ error: 'Не выбрано ни одного изменения' }, { status: 400 });
  }

  try {
    const changed = await acknowledgeChanges(body.all === true ? [] : ids);
    return Response.json({ ok: true, changed });
  } catch (error) {
    console.error('Не удалось отметить изменения:', error);
    return Response.json({ error: 'Ошибка записи' }, { status: 500 });
  }
}
