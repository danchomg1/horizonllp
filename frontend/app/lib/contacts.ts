import type { Locale } from './locale';

type Localized = Record<Locale, string>;

export interface Contact {
  /** Короткий адрес страницы: /c/<slug> — чем короче, тем плотнее QR */
  slug: string;
  /** Фамилия и имя раздельно: нужны для поля N в vCard */
  family: Localized;
  given: Localized;
  title: Localized;
  /** Первый номер считается основным */
  phones: string[];
  email: string;
  /** Улица без города и индекса — для поля ADR */
  street: Localized;
  city: Localized;
  country: Localized;
}

export const ORG: Localized = {
  ru: 'Horizon LLP',
  en: 'Horizon LLP',
  kz: 'Horizon LLP',
};

export const SITE = 'https://horizon-llp.com';
export const POSTCODE = 'Z10T2T4';

const CITY: Localized = { ru: 'Астана', en: 'Astana', kz: 'Астана' };
const COUNTRY: Localized = { ru: 'Казахстан', en: 'Kazakhstan', kz: 'Қазақстан' };

const HEAD_OFFICE: Localized = {
  ru: 'ул. Ахмета Байтурсынова, 3, офис 9 (2 этаж), ЖК HighVill, блок В',
  en: 'Akhmet Baitursynov str. 3, Office 9 (2nd floor), HighVill Residential Complex (Block B)',
  kz: 'Ахмет Байтұрсынов к-сі, 3, 9-кеңсе (2-қабат), HighVill тұрғын кешені, В блогы',
};

export const CONTACTS: Contact[] = [
  {
    slug: 'askhat',
    family: { ru: 'Ералиев', en: 'Yeraliyev', kz: 'Ералиев' },
    given: { ru: 'Асхат', en: 'Askhat', kz: 'Асхат' },
    title: {
      ru: 'Ведущий консультант по системам управления охраной труда',
      en: 'Lead Consultant, Health and Safety Management Systems',
      kz: 'Еңбекті қорғауды басқару жүйелері бойынша жетекші консультант',
    },
    phones: ['+7 701 053 5533'],
    email: 'hsms@horizon-llp.com',
    street: HEAD_OFFICE,
    city: CITY,
    country: COUNTRY,
  },
  {
    slug: 'ademi',
    family: { ru: 'Габдулуахит', en: 'Gabduluakhit', kz: 'Габдулуахит' },
    given: { ru: 'Адеми', en: 'Ademi', kz: 'Адеми' },
    title: {
      ru: 'Менеджер по работе с ключевыми клиентами',
      en: 'Key Account Manager',
      kz: 'Негізгі клиенттермен жұмыс жөніндегі менеджер',
    },
    phones: ['+7 777 275 61 07', '+7 702 490 85 63'],
    email: 'sales@horizon-llp.com',
    street: HEAD_OFFICE,
    city: CITY,
    country: COUNTRY,
  },
];

export function getContact(slug: string): Contact | undefined {
  return CONTACTS.find((c) => c.slug === slug);
}

/** Телефон в формате для tel: и для vCard — только цифры и плюс. */
export function telHref(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

export function fullName(contact: Contact, locale: Locale): string {
  return `${contact.given[locale]} ${contact.family[locale]}`;
}
