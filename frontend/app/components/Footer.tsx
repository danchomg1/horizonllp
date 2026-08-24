import { Linkedin, Facebook, Instagram } from 'lucide-react';
import { getLocale } from 'next-intl/server';
import { client, urlFor } from '../lib/sanity';
import { pick } from '../lib/locale';

async function getFooterData() {
  return await client.fetch(`*[_type == "footer"][0]`);
}

const PHONE = '+7 777 275 61 07';
const PHONE_HREF = '+77772756107';
const EMAIL = 'sales@horizon-llp.com';

export default async function Footer() {
  const data = await getFooterData();
  const locale = await getLocale();

  const socials = [
    { href: data?.socials?.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { href: data?.socials?.facebook, Icon: Facebook, label: 'Facebook' },
    { href: data?.socials?.instagram, Icon: Instagram, label: 'Instagram' },
  ].filter((s) => Boolean(s.href));

  return (
    <div className="w-full flex justify-center mt-auto px-4 pb-4">
      <footer className="w-full max-w-[1300px]">
        <div className="bg-[#0B0073] text-white rounded-[20px] px-6 md:px-12 py-8">

          {/* Логотип - контакты - соцсети в одну строку, на мобильных складываются */}
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10">

            <div className="shrink-0">
              {data?.logo ? (
                <img
                  src={urlFor(data.logo).url()}
                  alt="Horizon LLP"
                  className="h-14 w-auto object-contain object-left"
                />
              ) : (
                <div className="h-14 flex items-center">
                  <span className="text-[10px] font-bold border border-white/30 rounded px-3 py-2">LOGO</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 md:flex-grow">
              <a
                href={`tel:${PHONE_HREF}`}
                className="text-[15px] font-medium hover:text-blue-200 transition-colors whitespace-nowrap"
              >
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="text-[15px] font-medium hover:text-blue-200 transition-colors"
              >
                {EMAIL}
              </a>
              <span className="text-[13px] text-gray-300 font-light">
                {pick({ ru: 'Астана, Казахстан', en: 'Astana, Kazakhstan', kz: 'Астана, Қазақстан' }, locale)}
              </span>
            </div>

            <div className="flex flex-row gap-3 shrink-0">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center hover:bg-white hover:text-[#0B0073] transition-colors"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-7 pt-5 border-t border-white/15">
            <p className="text-[11px] text-gray-400 font-sans">
              {data?.copyright || '© 2026 Horizon LLP Consulting'}
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
