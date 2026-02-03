import { client } from '../lib/sanity';
import NewsList from '../components/NewsList';
import Header from '../components/Header'; // Если Header нужен тут отдельно, или он в layout

// Функция загрузки данных (берем последние 40)
async function getNews() {
  const query = `
    *[_type == "news"] | order(publishedAt desc) [0...40] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      description
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      
      {/* Отступ для фиксированной шапки, если она не в layout */}
      <div className="h-[100px]" /> 
      {/* <Header />  <-- Если он не в layout.tsx */}

      <main className="w-full max-w-[1250px] mx-auto px-4 py-8">
        
        {/* ЗАГОЛОВОК СТРАНИЦЫ */}
        <h1 className="text-[36px] font-bold text-[#0B0073] mb-10">
          События
        </h1>

        {/* СПИСОК НОВОСТЕЙ */}
        <NewsList initialNews={news} />

      </main>
    </div>
  );
}