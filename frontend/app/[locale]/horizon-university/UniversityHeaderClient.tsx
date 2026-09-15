'use client';
import {useState,useEffect,useRef,type ComponentProps} from 'react';
import {useLocale,useTranslations} from 'next-intl';
import {ChevronDown,ArrowUpRight} from 'lucide-react';

import Image from 'next/image';
import Button from '../../components/Button';
import type HeaderClient from '../../components/HeaderClient';
import AboutDropdown from '../../components/AboutDropdown';
import CoursesDropdown from '../../components/CoursesDropdown';
import ConsultingDropdown from '../../components/ConsultingDropdown';
import ExplosionDropdown from '../../components/ExplosionDropdown';
import EmergencyDropdown from '../../components/EmergencyDropdown';
import EngineeringDropdown from '../../components/EngineeringDropdown';
import PPEDropdown from '../../components/PPEDropdown';
import ContactsDropdown from '../../components/ContactDropdown';
import {href,pick} from '../../lib/locale';
import s from './university-nav.module.css';
export default function UniversityHeaderClient(props:ComponentProps<typeof HeaderClient>){
 const locale=useLocale();const t=useTranslations('Header');const [active,setActive]=useState<string|null>(null);const ref=useRef<HTMLElement>(null);
 useEffect(()=>{const close=(e:PointerEvent)=>{if(!ref.current?.contains(e.target as Node)){setActive(null);}};const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){setActive(null);}};document.addEventListener('pointerdown',close);document.addEventListener('keydown',escape);return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',escape);};},[]);
 const items=[['about',<AboutDropdown key="a" items={props.aboutItems}/>],['courses',<CoursesDropdown key="c" categories={props.categories}/>],['consulting',<ConsultingDropdown key="co" items={props.consultingItems}/>],['explosion',<ExplosionDropdown key="ex" items={props.explosionItems}/>],['emergency',<EmergencyDropdown key="em" items={props.emergencyItems}/>],['engineering',<EngineeringDropdown key="en" items={props.engineeringItems}/>],['ppe',<PPEDropdown key="p" items={props.ppeItems}/>],['contacts',<ContactsDropdown key="ct" cities={props.contactCities}/>]] as const;
 return <header ref={ref} className={s.header}><a className={s.logo} href={href('/',locale)} aria-label="Horizon University"><Image src="/assets/horizon-university/university-logo.svg?v=3" alt="Horizon University" width={343} height={36} unoptimized priority/></a><div className={s.bar}><nav className={s.nav} aria-label={pick({ru:'Основная навигация',en:'Main navigation',kz:'Негізгі мәзір'},locale)}>{items.map(([id])=><button key={id} aria-expanded={active===id} aria-controls="university-menu-panel" onClick={()=>setActive(active===id?null:id)}>{t(id)}<ChevronDown size={13}/></button>)}</nav><div className={s.actions}><div className={s.languages}>{['ru','kz','en'].map(lang=><a key={lang} href={href('/horizon-university',lang)} aria-current={lang===locale?'page':undefined}>{lang.toUpperCase()}</a>)}</div><Button className={s.request}>{pick({ru:'Оставить заявку',en:'Send a request',kz:'Өтінім қалдыру'},locale)}<ArrowUpRight size={17}/></Button></div></div>{active&&<div id="university-menu-panel" className={s.panel} onClick={e=>{if((e.target as HTMLElement).closest('a')){setActive(null);}}}>{items.find(([id])=>id===active)?.[1]}</div>}</header>;
}
