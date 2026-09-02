import { isAuthorized, unauthorized } from '../../../../lib/adminAuth';
import { getChange, changedCertificates, acknowledgeChange } from '../../../../lib/db';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

/** Одна правка вместе со списком задетых сертификатов. */
export async function GET(req: Request, { params }: Params) {
  if (!isAuthorized(req)) return unauthorized();

  const id = Number((await params).id);
  if (!Number.isInteger(id)) return Response.json({ error: 'Неверный id' }, { status: 400 });

  try {
    const change = await getChange(id);
    if (!change) return Response.json({ error: 'Изменение не найдено' }, { status: 404 });

    const rows = await changedCertificates(id);
    return Response.json({ change, rows });
  } catch (error) {
    console.error('Не удалось прочитать изменение:', error);
    return Response.json({ error: 'Ошибка чтения журнала' }, { status: 500 });
  }
}

/**
 * Отметка «просмотрено». Предупреждение гаснет сразу у всех записей,
 * которых коснулась эта правка, — по одной их отмечать бессмысленно.
 */
export async function POST(req: Request, { params }: Params) {
  if (!isAuthorized(req)) return unauthorized();

  const id = Number((await params).id);
  if (!Number.isInteger(id)) return Response.json({ error: 'Неверный id' }, { status: 400 });

  try {
    const done = await acknowledgeChange(id);
    return Response.json({ ok: true, changed: done });
  } catch (error) {
    console.error('Не удалось отметить изменение:', error);
    return Response.json({ error: 'Ошибка записи' }, { status: 500 });
  }
}
