import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import GlobalHeaderWrapper from "./components/GlobalHeaderWrapper";
import Footer from "./components/Footer";
import { ModalProvider } from "./context/ModalContext";
import JsonLd from "./components/JsonLd";
import Script from "next/script";

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Horizon LLP',
  url: 'https://horizon-llp.com',
  logo: 'https://horizon-llp.com/HORIZON_logo_header.svg',
  description: 'Казахстанский учебный центр в области охраны труда и промышленной безопасности. Официальный партнёр NEBOSH, IOSH, RoSPA, NOCN.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KZ',
    addressLocality: 'Астана',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+77772756107',
      contactType: 'sales',
      email: 'sales@horizon-llp.com',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'reception@horizon-llp.com',
    },
  ],
};

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://horizon-llp.com'),
  title: {
    default: 'Horizon LLP — Обучение охране труда и промышленной безопасности в Казахстане',
    template: '%s | Horizon LLP',
  },
  description:
    'Horizon LLP — учебный центр в Астане (Казахстан). Международные курсы NEBOSH, IOSH, RoSPA, NOCN. Консалтинг по БиОТ, диагностика систем безопасности, внедрение ISO 45001. Обучение для нефтегазового и промышленного секторов.',
  keywords: [
    'охрана труда Казахстан',
    'промышленная безопасность',
    'NEBOSH IGC',
    'IOSH Managing Safely',
    'IOSH Working Safely',
    'ISO 45001',
    'курсы безопасности Астана',
    'обучение охране труда',
    'БиОТ консалтинг',
    'управление рисками',
    'аварийное реагирование',
    'Horizon LLP',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://horizon-llp.com',
    siteName: 'Horizon LLP',
    title: 'Horizon LLP — Обучение охране труда и промышленной безопасности в Казахстане',
    description:
      'Международные курсы NEBOSH, IOSH, RoSPA, NOCN. Консалтинг по БиОТ и внедрение ISO 45001 в Казахстане.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Horizon LLP' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horizon LLP — Обучение охране труда в Казахстане',
    description:
      'Международные курсы NEBOSH, IOSH, RoSPA, NOCN. Консалтинг по БиОТ и внедрение ISO 45001 в Казахстане.',
    images: ['/og.jpg'],
  },
  alternates: {
    canonical: 'https://horizon-llp.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      {/* ДОБАВЛЕНО: overflow-x-hidden, чтобы убрать горизонтальный скролл на мобилках */}
      <body className={`${montserrat.variable} font-sans antialiased bg-[#F4F4F4] min-h-screen flex flex-col overflow-x-hidden`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-577EM9ZKRS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-577EM9ZKRS');
          `}
        </Script>
        <JsonLd data={organizationSchema} />
        <ModalProvider>
            
            {/* Header рендерится здесь. Так как внутри него теперь будет fixed, 
                он вырвется из потока и ляжет поверх контента. */}
            <GlobalHeaderWrapper>
               <Header />
            </GlobalHeaderWrapper>

            {/* flex-grow заставит main занять все свободное место, прижав Footer к низу */}
            <main className="flex-grow w-full">
              {children}
            </main>

            <Footer />

        </ModalProvider>
        
      </body>
    </html>
  );
}