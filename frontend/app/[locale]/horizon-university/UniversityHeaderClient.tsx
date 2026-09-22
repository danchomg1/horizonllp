'use client';
import {useState,useEffect,useRef,type ComponentProps} from 'react';
import {usePathname} from 'next/navigation';
import {useLocale,useTranslations} from 'next-intl';
import {ChevronDown,ArrowUpRight} from 'lucide-react';

import Image from 'next/image';
import Button from '../../components/Button';
import type HeaderClient from '../../components/HeaderClient';
import AboutDropdown from '../../components/AboutDropdown';
import CoursesDropdown from '../../components/CoursesDropdown';
import ServicesDropdown from '../../components/ServicesDropdown';
import PPEDropdown from '../../components/PPEDropdown';
import ContactsDropdown from '../../components/ContactDropdown';
import {href,pick} from '../../lib/locale';
import s from './university-nav.module.css';
export default function UniversityHeaderClient(props:ComponentProps<typeof HeaderClient>){
 const pathname=usePathname();const currentPath=pathname.replace(/^\/(en|kz|ru)(?=\/|$)/,'')||'/';
 const locale=useLocale();const t=useTranslations('Header');const [active,setActive]=useState<string|null>(null);const ref=useRef<HTMLElement>(null);
 useEffect(()=>{const close=(e:PointerEvent)=>{if(!ref.current?.contains(e.target as Node)){setActive(null);}};const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){setActive(null);}};document.addEventListener('pointerdown',close);document.addEventListener('keydown',escape);return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',escape);};},[]);
 const items=[['about',<AboutDropdown key="a" items={props.aboutItems}/>],['courses',<CoursesDropdown key="c" categories={props.categories}/>],['services',<ServicesDropdown {...props}/>],['ppe',<PPEDropdown key="p" items={props.ppeItems}/>],['contacts',<ContactsDropdown key="ct" cities={props.contactCities}/>]] as const;
 return <header ref={ref} className={s.header}><a className={s.logo} href={href('/',locale)} aria-label="Horizon University"><Image src="/assets/horizon-university/university-logo.svg?v=3" alt="Horizon University" width={343} height={36} unoptimized priority/></a><div className={s.bar}><nav className={s.nav} aria-label={pick({ru:'Основная навигация',en:'Main navigation',kz:'Негізгі мәзір'},locale)}>{items.map(([id])=><button key={id} aria-expanded={active===id} aria-controls="university-menu-panel" onClick={()=>setActive(active===id?null:id)}>{id==='services'?pick({ru:'Услуги',en:'Services',kz:'Қызметтер'},locale):t(id)}<ChevronDown size={13}/></button>)}<a className={s.verify} href={href('/verify',locale)} onClick={()=>setActive(null)}>{pick({ru:'Проверить сертификат',en:'Verify certificate',kz:'Сертификатты тексеру'},locale)}</a></nav><div className={s.actions}><div className={s.languages}>{['ru','kz','en'].map(lang=><a key={lang} href={href(currentPath,lang)} aria-current={lang===locale?'page':undefined}>{lang.toUpperCase()}</a>)}</div><Button className={s.request}>{pick({ru:'Оставить заявку',en:'Send a request',kz:'Өтінім қалдыру'},locale)}<ArrowUpRight size={17}/></Button><a className={s.whatsapp} href="https://wa.me/77772756107" target="_blank" rel="noopener noreferrer">{pick({ru:'Написать в WhatsApp',en:'Message on WhatsApp',kz:'WhatsApp-қа жазу'},locale)}<ArrowUpRight size={15}/></a></div></div>{active&&<div id="university-menu-panel" className={s.panel} onClick={e=>{if((e.target as HTMLElement).closest('a')){setActive(null);}}}>{items.find(([id])=>id===active)?.[1]}</div>}</header>;
}
