import { isAuthorized, unauthorized } from '../../../lib/adminAuth';
import { getCertRefs } from '../../../lib/certRefs';
import { buildTemplate } from '../../../lib/certExcel';

export const runtime = 'nodejs';

const XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

/**
 * Пустой шаблон для загрузки реестра. Списки курсов и преподавателей
 * подставляются из Studio на момент скачивания, поэтому после правки
 * справочника шаблон нужно взять заново.
 */
export async function GET(req: Request) {
  if (!isAuthorized(req)) return unauthorized();

  try {
    const refs = await getCertRefs();
    const bytes = await buildTemplate(refs);

    return new Response(bytes as BodyInit, {
      headers: {
        'Content-Type': XLSX,
        'Content-Disposition': 'attachment; filename="horizon-certificates-template.xlsx"',
        'X-Courses': String(refs.courses.length),
        'X-Instructors': String(refs.instructors.length),
      },
    });
  } catch (error) {
    console.error('Не удалось собрать шаблон:', error);
    return Response.json({ error: 'Ошибка сборки шаблона' }, { status: 500 });
  }
}
