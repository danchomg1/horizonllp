import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "../../i18n/routing";
import { pick, alternatesFor, localeUrl, OG_LOCALE, normalizeLocale, SITE_URL } from "../lib/locale";
import "../globals.css";

import Header from "../components/Header";
import GlobalHeaderWrapper from "../components/GlobalHeaderWrapper";
import Footer from "../components/Footer";
import { ModalProvider } from "../context/ModalContext";
import JsonLd from "../components/JsonLd";
import Script from "next/script";

const organizationSchema = (locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Horizon LLP',
  url: 'https://horizon-llp.com',
  logo: 'https://horizon-llp.com/HORIZON_logo_header.svg',
  description: pick({
    ru: 'Казахстанский учебный центр в области охраны труда и промышленной безопасности. Официальный партнёр NEBOSH, IOSH, RoSPA и CompEx.',
    en: 'Kazakhstan-based training centre in occupational health and industrial safety. Official partner of NEBOSH, IOSH, RoSPA and CompEx.',
    kz: 'Еңбекті қорғау және өнеркәсіптік қауіпсіздік саласындағы қазақстандық оқу орталығы. NEBOSH, IOSH, RoSPA және CompEx ресми серіктесі.',
  }, locale),
  address: { '@type': 'PostalAddress', addressCountry: 'KZ', addressLocality: pick({ ru: 'Астана', en: 'Astana', kz: 'Астана' }, locale) },
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+77772756107', contactType: 'sales', email: 'sales@horizon-llp.com' },
    { '@type': 'ContactPoint', contactType: 'customer service', email: 'reception@horizon-llp.com' },
  ],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = pick({
    ru: 'Horizon LLP — Обучение охране труда и промышленной безопасности в Казахстане',
    en: 'Horizon LLP — Health & Safety Training in Kazakhstan',
    kz: 'Horizon LLP — Қазақстанда еңбекті қорғау және өнеркәсіптік қауіпсіздік бойынша оқыту',
  }, locale);

  const description = pick({
    ru: 'Horizon LLP — учебный центр в Астане (Казахстан). Международные курсы NEBOSH, IOSH, RoSPA, CompEx. Консалтинг по БиОТ, диагностика систем безопасности, внедрение ISO 45001. Обучение для нефтегазового и промышленного секторов.',
    en: 'Horizon LLP — accredited training center in Astana, Kazakhstan. NEBOSH, IOSH, RoSPA, CompEx international courses. HSE consulting, safety diagnostics, ISO 45001 implementation for oil & gas and industrial sectors.',
    kz: 'Horizon LLP — Астанадағы (Қазақстан) оқу орталығы. NEBOSH, IOSH, RoSPA, CompEx халықаралық курстары. Еңбекті қорғау бойынша консалтинг, қауіпсіздік жүйелерін диагностикалау, ISO 45001 енгізу.',
  }, locale);

  const shortDescription = pick({
    ru: 'Международные курсы NEBOSH, IOSH, RoSPA, CompEx. Консалтинг по БиОТ и внедрение ISO 45001 в Казахстане.',
    en: 'NEBOSH, IOSH, RoSPA, CompEx international courses. HSE consulting and ISO 45001 implementation in Kazakhstan.',
    kz: 'NEBOSH, IOSH, RoSPA, CompEx халықаралық курстары. Еңбекті қорғау бойынша консалтинг және ISO 45001 енгізу.',
  }, locale);

  const keywords = pick({
    ru: [
      'охрана труда Казахстан', 'промышленная безопасность', 'NEBOSH IGC', 'IOSH Managing Safely',
      'IOSH Working Safely', 'ISO 45001', 'курсы безопасности Астана', 'обучение охране труда',
      'БиОТ консалтинг', 'управление рисками', 'аварийное реагирование', 'Horizon LLP',
    ],
    en: [
      'health and safety Kazakhstan', 'industrial safety', 'NEBOSH IGC', 'IOSH Managing Safely',
      'IOSH Working Safely', 'ISO 45001', 'safety courses Astana', 'HSE training',
      'OHS consulting', 'risk management', 'emergency response', 'Horizon LLP',
    ],
    kz: [
      'еңбекті қорғау Қазақстан', 'өнеркәсіптік қауіпсіздік', 'NEBOSH IGC', 'IOSH Managing Safely',
      'ISO 45001', 'Астана қауіпсіздік курстары', 'еңбекті қорғау бойынша оқыту',
      'қауіптерді бағалау', 'авариялық ден қою', 'Horizon LLP',
    ],
  }, locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: '%s | Horizon LLP' },
    description,
    keywords,
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[normalizeLocale(locale)],
      url: localeUrl(locale),
      siteName: 'Horizon LLP',
      title,
      description: shortDescription,
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Horizon LLP' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: shortDescription,
      images: ['/og.jpg'],
    },
    alternates: alternatesFor(locale),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-577EM9ZKRS" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-577EM9ZKRS');`}
      </Script>
      <JsonLd data={organizationSchema(locale)} />
      <NextIntlClientProvider messages={messages}>
        <ModalProvider>
          <GlobalHeaderWrapper>
            <Header />
          </GlobalHeaderWrapper>
          <main className="flex-grow w-full">{children}</main>
          <Footer />
        </ModalProvider>
      </NextIntlClientProvider>
    </>
  );
}
