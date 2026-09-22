'use client';
import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
export default function GlobalFooterWrapper({children}:{children:ReactNode}){const p=usePathname().replace(/^\/(en|kz|ru)(?=\/|$)/,'').replace(/\/$/,'');return p==='/horizon-university'?null:<div className="modern-footer">{children}</div>;}
