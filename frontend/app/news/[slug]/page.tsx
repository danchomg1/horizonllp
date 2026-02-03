import { client, urlFor } from '../../lib/sanity'; 
import { PortableText } from '@portabletext/react';
// Импортируем ваши стандартизированные стили
import { textComponents } from '../../components/RichTextComponents';

interface NewsPost {
  title: string;
  publishedAt: string;
  mainImage: any;
  body: any;
}

async function getPost(slug: string) {
  const query = `*[_type == "news" && slug.current == $slug][0] {
    title,
    publishedAt,
    mainImage,
    body
  }`;
  const data = await client.fetch(query, { slug }); 
  return data;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsPostPage({ params }: PageProps) {
  const resolvedParams = await params; 
  const { slug } = resolvedParams;
  const post: NewsPost = await getPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <h1 className="text-2xl text-gray-500">Новость не найдена :(</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      
      <main className="pb-20">
        
        {/* --- ОБЛОЖКА --- */}
        <div className="relative w-full max-w-[1300px] mx-auto h-[400px] mb-12 -mt-[120px] rounded-b-[15px] overflow-hidden">
           {/* Картинка */}
           {post.mainImage ? (
             <img 
               src={urlFor(post.mainImage).url()} 
               alt={post.title}
               className="w-full h-full object-cover"
             />
           ) : (
             <div className="w-full h-full bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
               <span className="text-white opacity-30 text-4xl font-bold">HORIZON</span>
             </div>
           )}

           {/* SVG Вырез */}
           <div className="absolute bottom-0 left-0 w-[195px] h-[75px] z-10 pointer-events-none">
              <img src="/news-cutout.svg" alt="" className="w-full h-full block" />
           </div>

           {/* Дата */}
           <div className="absolute bottom-0 left-0 w-[190px] h-[50px] z-20 flex items-center pl-[40px]">
              <span className="text-[#8B8B8B] text-[14px] md:text-[16px] font-medium leading-none pt-2">
                {formatDate(post.publishedAt)}
              </span>
           </div>
        </div>
        
        {/* --- КОНТЕНТ НОВОСТИ --- */}
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 relative z-10 mt-10">
           
           {/* Заголовок */}
           <h1 className="text-[32px] md:text-[48px] leading-tight font-black text-[#0B0073] mb-12 uppercase">
             {post.title}
           </h1>

           {/* ТЕКСТ СТАТЬИ */}
           {/* Убрал класс 'prose', чтобы ваши стили из RichTextComponents работали точно как задано */}
           <div className="w-full text-black/80">
              <PortableText 
                value={post.body} 
                components={textComponents} 
              />
           </div>

           {/* Кнопка Назад */}
           <div className="mt-16 pt-8 border-t border-gray-300">
              <a href="/news" className="inline-flex items-center gap-2 text-[#0B0073] font-bold hover:underline">
                <span>←</span> Вернуться ко всем событиям
              </a>
           </div>

        </div>

      </main>
    </div>
  );
}