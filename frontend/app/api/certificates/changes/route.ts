import { isAuthorized, unauthorized } from '../../../lib/adminAuth';
import { listChanges } from '../../../lib/db';

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
