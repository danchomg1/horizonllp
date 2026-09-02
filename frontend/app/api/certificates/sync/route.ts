import { isAuthorized, unauthorized } from '../../../lib/adminAuth';
import { syncFromRefs } from '../../../lib/db';
import { getCertRefs, clearCertRefsCache, byId, placeLabel } from '../../../lib/certRefs';

export const runtime = 'nodejs';
// Три тысячи строк обновляются тремя запросами, но база может быть холодной
export const maxDuration = 30;

/**
 * Подтягивает копии названий в реестре к справочнику Studio.
 *
 * Печать и публичная проверка и так накладывают справочник на лету, так что
 * на выданные документы это не влияет. Синхронизация нужна списку и поиску:
 * они читают колонки реестра напрямую, и без неё поиск по исправленному
 * названию курса ничего не найдёт.
 *
 * Вызывается сама при открытии реестра. Тем же адресом можно повесить
 * вебхук Sanity на публикацию certCourse / certInstructor / certCompletion —
 * тогда правка доедет до реестра, даже если инструмент никто не открывал.
 */
export async function POST(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  try {
    // Свежие справочники, а не то, что осело в минутном кэше:
    // синхронизацию запускают ровно после правки.
    clearCertRefsCache();
    const refs = await getCertRefs();

    // В реестре место лежит целиком — «Казахстан, г. Астана», — поэтому
    // в синхронизацию отдаём собранные метки, а не одни названия городов.
    const countries = byId(refs.countries);
    const cities = refs.cities.map((city) => {
      const country = city.online ? undefined : countries.get(city.countryId ?? '');
      return {
        id: city.id,
        ru: placeLabel(city, country, 'ru'),
        en: placeLabel(city, country, 'en'),
        kz: placeLabel(city, country, 'kz'),
      };
    });

    const changed = await syncFromRefs({ ...refs, cities });
    const total = changed.courses + changed.instructors + changed.completions + changed.cities;

    return Response.json({ ok: true, total, ...changed });
  } catch (error) {
    console.error('Не удалось синхронизировать реестр со справочником:', error);
    return Response.json({ error: 'Ошибка синхронизации' }, { status: 500 });
  }
}
