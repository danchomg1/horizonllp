import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { alternatesFor, pick } from '../../lib/locale';
import VerifyForm, { type VerifyLabels } from './VerifyForm';

/**
 * Публичная проверка сертификата.
 *
 * Сюда приходят с бумаги в руках: по QR с бланка или набрав адрес. Ключ
 * доступа не нужен, наружу отдаётся только имя, курс и срок — остальное
 * остаётся в реестре.
 */

const content: Record<'ru' | 'en' | 'kz', VerifyLabels & { meta: string }> = {
  ru: {
    title: 'Проверка сертификата',
    lead: 'Введите номер сертификата — он напечатан на бланке. Подойдёт и номер со старого бланка.',
    placeholder: 'Например, ABC23',
    submit: 'Проверить',
    checking: 'Проверяем…',
    valid: 'Сертификат действителен',
    expired: 'Срок действия сертификата истёк',
    perpetual: 'бессрочный',
    notFound: 'Сертификат не найден',
    notFoundHint: 'Проверьте номер: он набирается без пробелов, буквы латинские.',
    invalid: 'Номер введён неверно',
    failed: 'Не удалось выполнить проверку',
    name: 'Фамилия, имя',
    course: 'Курс',
    issued: 'Дата выдачи',
    until: 'Действует до',
    number: 'Номер сертификата',
    meta: 'Проверка подлинности сертификата Horizon по номеру с бланка.',
  },
  en: {
    title: 'Certificate verification',
    lead: 'Enter the certificate number printed on the document. A number from an older certificate also works.',
    placeholder: 'For example, ABC23',
    submit: 'Verify',
    checking: 'Checking…',
    valid: 'The certificate is valid',
    expired: 'The certificate has expired',
    perpetual: 'unlimited',
    notFound: 'Certificate not found',
    notFoundHint: 'Check the number: no spaces, Latin letters only.',
    invalid: 'The number is not valid',
    failed: 'Verification failed',
    name: 'Surname, name',
    course: 'Course',
    issued: 'Date of issue',
    until: 'Valid until',
    number: 'Certificate number',
    meta: 'Verify the authenticity of a Horizon certificate by its number.',
  },
  kz: {
    title: 'Сертификатты тексеру',
    lead: 'Бланкіде басылған сертификат нөмірін енгізіңіз. Ескі бланктегі нөмір де жарайды.',
    placeholder: 'Мысалы, ABC23',
    submit: 'Тексеру',
    checking: 'Тексерілуде…',
    valid: 'Сертификат жарамды',
    expired: 'Сертификаттың жарамдылық мерзімі өткен',
    perpetual: 'мерзімсіз',
    notFound: 'Сертификат табылмады',
    notFoundHint: 'Нөмірді тексеріңіз: бос орынсыз, латын әріптерімен.',
    invalid: 'Нөмір дұрыс енгізілмеген',
    failed: 'Тексеру орындалмады',
    name: 'Тегі, аты',
    course: 'Курс',
    issued: 'Берілген күні',
    until: 'Жарамдылық мерзімі',
    number: 'Сертификат нөмірі',
    meta: 'Horizon сертификатының түпнұсқалығын нөмірі бойынша тексеру.',
  },
};

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  const t = pick(content, locale);
  return {
    title: t.title,
    description: t.meta,
    ...alternatesFor(locale, '/verify'),
  };
}

export default async function VerifyPage({
  params, searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ code?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = pick(content, locale);

  // Номер может прийти адресом: /verify?code=ABC23 — тогда проверка идёт сразу
  const { code } = await searchParams;

  return (
    <main className="w-full max-w-[1240px] mx-auto px-4 pt-16 pb-24 flex flex-col items-center">
      <h1 className="text-[26px] lg:text-[32px] font-semibold text-black opacity-90 mb-3 text-center">
        {t.title}
      </h1>
      <p className="text-[13px] lg:text-[14px] text-black/65 mb-10 max-w-[560px] text-center leading-relaxed">
        {t.lead}
      </p>

      <VerifyForm labels={t} initialCode={(code ?? '').trim()} />
    </main>
  );
}
