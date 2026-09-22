'use client';
import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
export default function GlobalHeaderWrapper({modern}:{children:ReactNode;modern:ReactNode}){const p=usePathname().replace(/^\/(en|kz|ru)(?=\/|$)/,'').replace(/\/$/,'');return p==='/horizon-university'?null:<>{modern}</>;}
