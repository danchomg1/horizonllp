import { isAuthorized, unauthorized } from '../../../lib/adminAuth';
import { getById, updateCertificate, deleteCertificate } from '../../../lib/db';
import { normalizeCode } from '../../../lib/certificates';

export const runtime = 'nodejs';

type Params = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Params) {
  if (!isAuthorized(req)) return unauthorized();

  const id = Number((await params).id);
  if (!Number.isInteger(id)) return Response.json({ error: 'Неверный id' }, { status: 400 });

  const row = await getById(id);
  if (!row) return Response.json({ error: 'Сертификат не найден' }, { status: 404 });
  return Response.json(row);
}

export async function PATCH(req: Request, { params }: Params) {
  if (!isAuthorized(req)) return unauthorized();

  const id = Number((await params).id);
  if (!Number.isInteger(id)) return Response.json({ error: 'Неверный id' }, { status: 400 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Тело запроса не является JSON' }, { status: 400 });
  }

  if (body.perpetual && body.valid_until) {
    return Response.json(
      { error: 'Нельзя одновременно указать срок действия и бессрочность' },
      { status: 400 },
    );
  }

  try {
    // Свой номер выдан системой и не меняется: он уже напечатан на бланке
    // и мог уйти человеку на руки.
    delete body.code;

    const legacy = String(body.legacy_code ?? '').trim();
    if ('legacy_code' in body) body.legacy_code = legacy ? normalizeCode(legacy) : null;

    const row = await updateCertificate(id, body);
    if (!row) return Response.json({ error: 'Сертификат не найден' }, { status: 404 });
    return Response.json(row);
  } catch (error) {
    console.error('Не удалось обновить сертификат:', error);
    return Response.json({ error: 'Ошибка записи в базу' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  if (!isAuthorized(req)) return unauthorized();

  const id = Number((await params).id);
  if (!Number.isInteger(id)) return Response.json({ error: 'Неверный id' }, { status: 400 });

  const removed = await deleteCertificate(id);
  if (!removed) return Response.json({ error: 'Сертификат не найден' }, { status: 404 });
  return Response.json({ ok: true });
}
