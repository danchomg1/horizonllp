import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Phone, Mail, Globe, MapPin, UserPlus } from 'lucide-react';
import { CONTACTS, getContact, telHref, fullName, ORG, SITE } from '../../../lib/contacts';
import { normalizeLocale, pick, alternatesFor, type Locale } from '../../../lib/locale';

interface Props {
  params: Promise<{ locale: string; person: string }>;
}

export function generateStaticParams() {
  return CONTACTS.map((c) => ({ person: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, person } = await params;
  const contact = getContact(person);
  if (!contact) return { title: 'Horizon LLP' };

  const l = normalizeLocale(locale);
  const name = fullName(contact, l);

  return {
    title: `${name} — ${ORG[l]}`,
    description: contact.title[l],
    alternates: alternatesFor(locale, `/c/${person}`),
    // Визитка нужна для перехода по QR, а не для поиска: личные телефоны
    // в выдаче собирают спам. Снимите, если карточку надо индексировать.
    robots: { index: false, follow: false },
  };
}

export default async function ContactCardPage({ params }: Props) {
  const { locale, person } = await params;
  setRequestLocale(locale);

  const contact = getContact(person);
  if (!contact) notFound();

  const l: Locale = normalizeLocale(locale);
  const name = fullName(contact, l);

  const t = {
    save: pick({ ru: 'Сохранить в контакты', en: 'Save to contacts', kz: 'Контактыға сақтау' }, l),
    hint: pick({
      ru: 'Откроется карточка контакта — подтвердите сохранение',
      en: 'A contact card will open — confirm to save',
      kz: 'Контакт картасы ашылады — сақтауды растаңыз',
    }, l),
  };

  return (
    <main className="bg-[#F4F4F4] min-h-screen pt-[90px] pb-16 px-4">
      <div className="w-full max-w-[440px] mx-auto">
        <div className="bg-white rounded-[24px] shadow-sm border border-black/5 overflow-hidden">

          {/* Шапка карточки */}
          <div className="bg-[#0B0073] px-7 pt-8 pb-7 text-center">
            <img
              src="/assets/email/logo-horizon-white.png"
              alt={ORG[l]}
              width={64}
              className="w-16 h-auto mx-auto mb-5"
            />
            <h1 className="text-[26px] leading-tight font-bold text-white">{name}</h1>
            <p className="mt-2 text-[14px] leading-snug text-[#C8C4EE]">{contact.title[l]}</p>
          </div>

          {/* Контакты */}
          <div className="px-7 py-6 flex flex-col gap-1">
            {contact.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${telHref(phone)}`}
                className="flex items-center gap-4 py-3 group"
              >
                <Phone className="w-5 h-5 text-[#0B0073] shrink-0" />
                <span className="text-[16px] font-medium text-black group-hover:text-[#0B0073] transition-colors">
                  {phone}
                </span>
              </a>
            ))}

            <a href={`mailto:${contact.email}`} className="flex items-center gap-4 py-3 group">
              <Mail className="w-5 h-5 text-[#0B0073] shrink-0" />
              <span className="text-[16px] font-medium text-black group-hover:text-[#0B0073] transition-colors break-all">
                {contact.email}
              </span>
            </a>

            <a href={SITE} className="flex items-center gap-4 py-3 group">
              <Globe className="w-5 h-5 text-[#0B0073] shrink-0" />
              <span className="text-[16px] font-medium text-black group-hover:text-[#0B0073] transition-colors">
                horizon-llp.com
              </span>
            </a>

            <div className="flex items-start gap-4 py-3">
              <MapPin className="w-5 h-5 text-[#0B0073] shrink-0 mt-0.5" />
              <span className="text-[14px] leading-relaxed text-black/70">
                {contact.city[l]}, {contact.street[l]}
              </span>
            </div>
          </div>

          {/* Кнопка сохранения */}
          <div className="px-7 pb-7">
            <a
              href={`/api/vcard/${contact.slug}?lang=${l}`}
              download
              className="flex items-center justify-center gap-2 w-full h-[58px] bg-[#0B0073] text-white rounded-[15px] text-[17px] font-medium shadow-lg shadow-[#0B0073]/20 hover:bg-[#1A00A8] active:scale-[0.98] transition-all"
            >
              <UserPlus className="w-5 h-5" />
              {t.save}
            </a>
            <p className="mt-3 text-center text-[12px] leading-relaxed text-black/40">
              {t.hint}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
