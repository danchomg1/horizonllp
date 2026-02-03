import { client } from '../lib/sanity';
import HeaderClient from './HeaderClient';

// --- ЗАПРОСЫ ДАННЫХ ---
async function getCategories() {
  return await client.fetch(`
    *[_type == "courseCategory"] | order(title asc) {
      _id,
      title,
      courses[]->{
        title,
        description,
        logo,
        details,
        slug
      }
    }
  `);
}

async function getConsultingItems() {
  return await client.fetch(`*[_type == "consultingItem"] | order(order asc)`);
}
async function getExplosionItems() {
  return await client.fetch(`*[_type == "explosionItem"] | order(order asc)`);
}
async function getEmergencyItems() {
  return await client.fetch(`*[_type == "emergencyItem"] | order(order asc)`);
}
async function getEngineeringItems() {
  return await client.fetch(`*[_type == "engineeringItem"] | order(order asc)`);
}
async function getPPEItems() {
  return await client.fetch(`*[_type == "ppeItem"] | order(order asc)`);
}

// Запрос для городов (Контакты)
async function getContactCities() {
  return await client.fetch(`
    *[_type == "contactCity"] | order(order asc) {
      _id,
      city,
      officeName,
      address,
      phones
    }
  `);
}

// --- ОБНОВЛЕННЫЙ ЗАПРОС ---
async function getAboutItems() {
  return await client.fetch(`
    *[_type == "aboutItem"] | order(order asc) {
      _id,
      title,
      slug,
      description,      // <--- Добавили
      dropdownImage     // <--- Добавили
    }
  `);
}

// Функция для получения логотипа
async function getHeaderSettings() {
  return await client.fetch(`*[_type == "header"][0] { scrollLogo }`);
}

export default async function Header() {
  // Загружаем все данные
  const categories = await getCategories();
  const consultingItems = await getConsultingItems();
  const explosionItems = await getExplosionItems();
  const emergencyItems = await getEmergencyItems();
  const engineeringItems = await getEngineeringItems();
  const ppeItems = await getPPEItems();
  const contactCities = await getContactCities();
  
  // Получаем "О нас"
  const aboutItems = await getAboutItems();
  
  const headerSettings = await getHeaderSettings();

  return (
    <HeaderClient 
      categories={categories}
      consultingItems={consultingItems}
      explosionItems={explosionItems}
      emergencyItems={emergencyItems}
      engineeringItems={engineeringItems}
      ppeItems={ppeItems}
      contactCities={contactCities}
      // Передаем в клиент
      aboutItems={aboutItems} 
      logo={headerSettings?.scrollLogo} 
    />
  );
}