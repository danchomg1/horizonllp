import { Linkedin, Facebook, Instagram } from 'lucide-react';
import { client, urlFor } from '../lib/sanity'; // Добавил urlFor

async function getFooterData() {
  return await client.fetch(`*[_type == "footer"][0]`);
}

export default async function Footer() {
  const data = await getFooterData();

  const columns = data?.columns || [
    { title: 'Квалификации', links: ['Nebosh', 'Iosh', 'Rospa', 'CompEx'] },
    { title: 'Услуги', links: ['Инспекции', 'Консалтинг', 'Аудит', 'Обучение'] },
    { title: 'Инжиниринг', links: ['Проектирование', 'Надзор'] },
  ];

  return (
    <div className="w-full flex justify-center mt-auto px-4 pb-4">
      <footer className="w-full max-w-[1300px]">
        
        <div className="bg-[#0B0073] text-white rounded-[20px] pt-12 pb-10 px-4 md:px-12">
           
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* 1. ЛОГОТИП */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  {/* Контейнер для логотипа */}
                  <div className="w-14 h-14 border border-white/30 flex items-center justify-center rounded mb-4 overflow-hidden relative bg-white/5">
                      {data?.logo ? (
                        <img 
                            src={urlFor(data.logo).url()} 
                            alt="Footer Logo" 
                            className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <span className="text-[10px] font-bold">LOGO</span>
                      )}
                  </div>
                </div>
              </div>

              {/* 2. МЕНЮ (Колонки) */}
              <div className="md:col-span-9 flex flex-wrap justify-between px-0 lg:px-10 gap-8 md:gap-0">
                 {columns.map((col: any, idx: number) => (
                    <div key={idx} className="min-w-[120px]">
                      <h3 className="font-bold mb-6 text-sm">{col.title}</h3>
                      <ul className="space-y-3 text-xs text-gray-300 font-light font-sans">
                        {col.links?.map((link: string, i: number) => (
                           <li key={i} className="cursor-pointer hover:text-white transition-colors">
                              {link}
                           </li>
                        ))}
                      </ul>
                    </div>
                 ))}
              </div>

              {/* 3. СОЦСЕТИ И КОПИРАЙТ */}
              <div className="md:col-span-1 flex flex-col justify-between items-end h-full">
                  
                  {/* Иконки соцсетей */}
                  <div className="flex md:flex-col gap-4 mt-2">
                      {data?.socials?.linkedin && (
                        <a href={data.socials.linkedin} target="_blank" rel="noreferrer">
                           <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-300 transition-colors"/>
                        </a>
                      )}
                      {data?.socials?.facebook && (
                          <a href={data.socials.facebook} target="_blank" rel="noreferrer">
                            <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-300 transition-colors"/>
                          </a>
                      )}
                      {data?.socials?.instagram && (
                          <a href={data.socials.instagram} target="_blank" rel="noreferrer">
                            <Instagram className="w-5 h-5 cursor-pointer hover:text-blue-300 transition-colors"/>
                          </a>
                      )}

                      {!data?.socials && (
                        <>
                           <Linkedin className="w-5 h-5 opacity-50"/>
                           <Facebook className="w-5 h-5 opacity-50"/>
                           <Instagram className="w-5 h-5 opacity-50"/>
                        </>
                      )}
                  </div>
                  
                  {/* Копирайт */}
                  <div className="whitespace-nowrap mt-8 md:mt-0 md:absolute md:bottom-10 md:right-16">
                      <p className="text-[10px] text-gray-400 font-sans">
                          {data?.copyright || '© 2026 Horizon LLP Consulting'}
                      </p>
                  </div>
              </div>

           </div>
        </div>

      </footer>
    </div>
  );
}