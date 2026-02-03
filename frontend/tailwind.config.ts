import type { Config } from "tailwindcss";

const config: Config = {
  // Указываем пути ко всем файлам, где мы используем классы Tailwind
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      // Подключаем шрифт Montserrat
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
      // Подключаем ваш фирменный синий цвет
      colors: {
        "horizon-blue": "#0B0073",
      },
    },
  },
  plugins: [
    // Плагин для красивого текста (typography)
    require('@tailwindcss/typography'),
  ],
};

export default config;