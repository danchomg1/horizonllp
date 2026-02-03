'use client';

import { useState, useEffect } from 'react';

interface ContactCity {
  _id: string;
  city: string;
  officeName: string;
  address: string;
  phones: string[];
}

interface Props {
  cities: ContactCity[];
}

export default function ContactsDropdown({ cities }: Props) {
  const [activeCity, setActiveCity] = useState<ContactCity | null>(null);

  useEffect(() => {
    if (cities && cities.length > 0) {
      setActiveCity(cities[0]);
    }
  }, [cities]);

  if (!cities || cities.length === 0) return null;

  const glassLayerStyle = {
    backgroundColor: 'rgba(244, 244, 244, 0.65)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  return (
    // ИЗМЕНЕНИЕ 1: Уменьшили высоту h-[350px] -> h-[280px]
    <div className="absolute right-0 top-[0px] w-full h-[280px] flex gap-[15px] z-50 animate-in fade-in slide-in-from-top-2 duration-200 cursor-default">
      
      {/* --- ЛЕВОЕ ОКНО --- */}
      <div className="w-[60%] relative rounded-[15px] shadow-2xl">
        <div className="absolute inset-0 rounded-[15px] border border-white/50" style={glassLayerStyle} />
        
        <div className="relative z-10 flex h-full p-6">
            <div className="w-[40%] border-r border-gray-400/20 pr-4 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                {cities.map((item) => {
                    const isActive = activeCity?._id === item._id;
                    return (
                        <div
                            key={item._id}
                            onMouseEnter={() => setActiveCity(item)}
                            className={`
                                cursor-pointer px-4 py-3 rounded-[10px] text-[16px] font-normal transition-all flex items-center justify-between
                                ${isActive 
                                    ? 'bg-black/5 text-[#0B0073]' 
                                    : 'text-black hover:bg-black/5'}
                            `}
                        >
                            {item.city}
                            {isActive && <span className="text-[6px] text-[#0B0073]">●</span>}
                        </div>
                    )
                })}
            </div>

            <div className="w-[60%] pl-8 flex flex-col justify-center text-[#1A1A1A]">
                {activeCity ? (
                    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
                        <div>
                            <h4 className="text-[18px] text-[#0B0073] mb-2 font-normal uppercase tracking-wide">
                                {activeCity.officeName}
                            </h4>
                            <div className="w-[50px] h-[1px] bg-[#0B0073]/20 mb-3" />
                            <p className="text-[15px] text-gray-800 leading-relaxed font-normal">
                                {activeCity.address}
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                            {activeCity.phones?.map((phone, idx) => (
                                <p key={idx} className="text-[16px] font-medium text-black tracking-wide">
                                    {phone}
                                </p>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                        Выберите город
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* --- ПРАВОЕ ОКНО --- */}
      <div className="w-[40%] relative rounded-[15px] shadow-2xl">
          <div className="absolute inset-0 rounded-[15px] border border-white/50" style={glassLayerStyle} />
          
          <div className="relative z-10 flex h-full p-8 justify-between items-center">
              
              <div className="flex flex-col gap-5 text-[#1A1A1A] text-[14px]">
                  <div className="flex flex-col gap-1">
                      <span className="text-[12px] text-gray-500 uppercase tracking-wider">E-mail</span>
                      <a href="mailto:sales@horizon-llp.com" className="text-[16px] font-medium hover:text-[#0B0073] transition-colors border-b border-transparent hover:border-[#0B0073] w-max pb-0.5">
                          sales@horizon-llp.com
                      </a>
                  </div>

                  <div className="flex flex-col gap-1">
                      <span className="text-[12px] text-gray-500 uppercase tracking-wider">Для юр. лиц</span>
                      <a href="tel:+77776400487" className="text-[16px] font-medium hover:text-[#0B0073] transition-colors">
                          +7 777 640 04 87
                      </a>
                  </div>

                  <div className="flex flex-col gap-1">
                      <span className="text-[12px] text-gray-500 uppercase tracking-wider">Для физ. лиц</span>
                      <a href="tel:+77772756107" className="text-[16px] font-medium hover:text-[#0B0073] transition-colors">
                          +7 777 275 61 07
                      </a>
                  </div>
              </div>

              {/* ИЗМЕНИЛИ ОТСТУП: gap-[60px] -> gap-[40px], чтобы влезло в новую высоту */}
              <div className="flex flex-col gap-[40px]">
                  <SocialIcon 
                      href="https://www.instagram.com/horizon_hse/" 
                      src="/inst.svg" 
                      alt="Instagram" 
                  />
                  <SocialIcon 
                      href="https://www.facebook.com/profile.php?id=100085460114812" 
                      src="/fb.svg" 
                      alt="Facebook" 
                  />
                  <SocialIcon 
                      href="https://www.linkedin.com/company/2317004/admin/dashboard/" 
                      src="/linkedin.svg" 
                      alt="LinkedIn" 
                  />
              </div>
          </div>
      </div>

    </div>
  );
}

// ИЗМЕНЕНИЕ 2: Уменьшили размер 50px -> 30px
function SocialIcon({ href, src, alt }: { href: string, src: string, alt: string }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-[30px] h-[30px] flex items-center justify-center hover:scale-110 transition-transform duration-200"
        >
            <img src={src} alt={alt} className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity" />
        </a>
    )
}