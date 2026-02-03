import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import GlobalHeaderWrapper from "./components/GlobalHeaderWrapper";
import Footer from "./components/Footer";
import { ModalProvider } from "./context/ModalContext";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Horizon LLP Consulting",
  description: "Исследование культуры безопасного труда",
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