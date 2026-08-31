import { timingSafeEqual } from 'crypto';

/**
 * Простая защита административных маршрутов общим ключом.
 *
 * Почему не сессия Sanity: Studio авторизуется через cookie домена
 * api.sanity.io, до наших маршрутов она не доходит, а извлечь токен
 * из Studio штатного способа нет. Общий ключ команды — компромисс:
 * он не попадает в сборку, его вводит человек, и он живёт только
 * в localStorage браузера.
 *
 * Публичная проверка сертификата этим ключом НЕ закрыта: у неё
 * отдельный маршрут и она отдаёт лишь минимум полей.
 */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // timingSafeEqual требует одинаковой длины, иначе бросает исключение
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isAuthorized(req: Request): boolean {
  const expected = process.env.CERT_ADMIN_KEY;
  if (!expected) return false; // ключ не настроен — доступа нет ни у кого

  const provided = req.headers.get('x-admin-key');
  if (!provided) return false;

  return safeEqual(provided, expected);
}

/** Готовый ответ для неавторизованного запроса. */
export function unauthorized(): Response {
  return Response.json(
    { error: process.env.CERT_ADMIN_KEY ? 'Неверный ключ доступа' : 'Ключ доступа не настроен на сервере' },
    { status: 401 },
  );
}
