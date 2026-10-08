/**
 * Счётчики Google: Analytics и Google Ads.
 *
 * Библиотека gtag.js грузится на странице один раз (см. [locale]/layout.tsx),
 * а каждый счётчик подключается своей строкой config — так советует Google.
 */

/** Google Analytics 4. */
export const GA_ID = 'G-577EM9ZKRS';

/** Google Ads. */
export const ADS_ID = 'AW-18173557502';

/**
 * Метка конверсии «Заявка с сайта» из Google Ads: Цели → Конверсии → нужная
 * конверсия → «Настройка тега» → «Установить самостоятельно», строка send_to
 * после косой черты. Пока метки нет, конверсия не отправляется: с неверной
 * меткой Google Ads её всё равно не засчитал бы.
 */
export const ADS_LEAD_LABEL = '-VCfCN-I7tAcEP716dlD';

type Gtag = (...args: unknown[]) => void;

/** Заявка ушла: сообщаем Google Ads о конверсии. */
export function trackLead() {
  const gtag = (window as typeof window & { gtag?: Gtag }).gtag;
  if (!gtag || !ADS_LEAD_LABEL) return;
  gtag('event', 'conversion', { send_to: `${ADS_ID}/${ADS_LEAD_LABEL}` });
}
