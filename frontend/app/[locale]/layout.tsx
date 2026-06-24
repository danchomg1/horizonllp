import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "../../i18n/routing";
import "../globals.css";

import Header from "../components/Header";
import GlobalHeaderWrapper from "../components/GlobalHeaderWrapper";
import Footer from "../components/Footer";
import { ModalProvider } from "../context/ModalContext";
import JsonLd from "../components/JsonLd";
import Script from "next/script";

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Horizon LLP',
  url: 'https://horizon-llp.com',
  logo: 'https://horizon-llp.com/HORIZON_logo_header.svg',
  description: 'Казахстанский учебный центр в области охраны труда и промышленной безопасности. Официальный партнёр NEBOSH, IOSH, RoSPA и CompEx.',
  address: { '@type': 'PostalAddress', addressCountry: 'KZ', addressLocality: 'Астана' },
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+77772756107', contactType: 'sales', email: 'sales@horizon-llp.com' },
    { '@type': 'ContactPoint', contactType: 'customer service', email: 'reception@horizon-llp.com' },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'en') {
    return {
      metadataBase: new URL('https://horizon-llp.com'),
      title: {
        default: 'Horizon LLP — Health & Safety Training in Kazakhstan',
        template: '%s | Horizon LLP',
      },
      description:
        'Horizon LLP — accredited training center in Astana, Kazakhstan. NEBOSH, IOSH, RoSPA, CompEx international courses. HSE consulting, safety diagnostics, ISO 45001 implementation for oil & gas and industrial sectors.',
      keywords: [
        'health and safety Kazakhstan', 'industrial safety', 'NEBOSH IGC', 'IOSH Managing Safely',
        'IOSH Working Safely', 'ISO 45001', 'safety courses Astana', 'HSE training',
        'OHS consulting', 'risk management', 'emergency response', 'Horizon LLP',
      ],
      openGraph: {
        type: 'website', locale: 'en_US', url: 'https://horizon-llp.com',
        siteName: 'Horizon LLP',
        title: 'Horizon LLP — Health & Safety Training in Kazakhstan',
        description: 'NEBOSH, IOSH, RoSPA, CompEx international courses. HSE consulting and ISO 45001 implementation in Kazakhstan.',
        images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Horizon LLP' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Horizon LLP — Health & Safety Training in Kazakhstan',
        description: 'NEBOSH, IOSH, RoSPA, CompEx international courses. HSE consulting and ISO 45001 implementation in Kazakhstan.',
        images: ['/og.jpg'],
      },
      alternates: { canonical: 'https://horizon-llp.com/en' },
    };
  }

  return {
    metadataBase: new URL('https://horizon-llp.com'),
    title: {
      default: 'Horizon LLP — Обучение охране труда и промышленной безопасности в Казахстане',
      template: '%s | Horizon LLP',
    },
    description:
      'Horizon LLP — учебный центр в Астане (Казахстан). Международные курсы NEBOSH, IOSH, RoSPA, CompEx. Консалтинг по БиОТ, диагностика систем безопасности, внедрение ISO 45001. Обучение для нефтегазового и промышленного секторов.',
    keywords: [
      'охрана труда Казахстан', 'промышленная безопасность', 'NEBOSH IGC', 'IOSH Managing Safely',
      'IOSH Working Safely', 'ISO 45001', 'курсы безопасности Астана', 'обучение охране труда',
      'БиОТ консалтинг', 'управление рисками', 'аварийное реагирование', 'Horizon LLP',
    ],
    openGraph: {
      type: 'website', locale: 'ru_RU', url: 'https://horizon-llp.com',
      siteName: 'Horizon LLP',
      title: 'Horizon LLP — Обучение охране труда и промышленной безопасности в Казахстане',
      description: 'Международные курсы NEBOSH, IOSH, RoSPA, CompEx. Консалтинг по БиОТ и внедрение ISO 45001 в Казахстане.',
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Horizon LLP' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Horizon LLP — Обучение охране труда в Казахстане',
      description: 'Международные курсы NEBOSH, IOSH, RoSPA, CompEx. Консалтинг по БиОТ и внедрение ISO 45001 в Казахстане.',
      images: ['/og.jpg'],
    },
    alternates: { canonical: 'https://horizon-llp.com' },
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
      <JsonLd data={organizationSchema} />
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
