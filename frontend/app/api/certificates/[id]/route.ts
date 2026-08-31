import { isAuthorized, unauthorized } from '../../../lib/adminAuth';
import { getById, updateCertificate, deleteCertificate, codeExists } from '../../../lib/db';
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
    // Смена номера разрешена, но он должен остаться уникальным
    if (typeof body.code === 'string' && body.code.trim()) {
      const code = normalizeCode(body.code);
      const current = await getById(id);
      if (!current) return Response.json({ error: 'Сертификат не найден' }, { status: 404 });
      if (code !== current.code && (await codeExists(code))) {
        return Response.json({ error: `Номер ${code} уже занят` }, { status: 409 });
      }
      body.code = code;
    }

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
