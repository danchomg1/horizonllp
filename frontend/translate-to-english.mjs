/**
 * Скрипт для заполнения английских полей в Sanity.
 * Запуск: node translate-to-english.mjs
 * Требует: SANITY_WRITE_TOKEN в .env.local
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));

// Читаем .env.local
const envPath = resolve(__dir, '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const TOKEN = envContent.match(/SANITY_WRITE_TOKEN=(.+)/)?.[1]?.trim();

if (!TOKEN) {
  console.error('❌ SANITY_WRITE_TOKEN не найден в .env.local');
  process.exit(1);
}

const PROJECT_ID = 'yhtytg6i';
const DATASET = 'production';
const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${DATASET}`;

// ─────────────────────────────────────────────
// ВСЕ ПЕРЕВОДЫ (заполнены вручную)
// ─────────────────────────────────────────────
const patches = [

  // ── CONSULTING ITEMS ──
  {
    id: '43d9118b-7df7-49d4-b0d7-fa22dfc61ca2',
    set: {
      titleEn: 'Management Systems',
      descriptionEn: 'Horizon develops and implements effective management systems where documentation accuracy is synchronised with real people\'s work, ensuring sustainable business development at all stages of the lifecycle.',
      introTitleEn: 'Quality, Occupational Health & Environmental Management Systems',
    },
  },
  {
    id: '75e66655-9510-4787-95af-6ee10cd7e2d1',
    set: {
      titleEn: 'Culture & Leadership',
      descriptionEn: 'We transform organisational culture without templates: from deep diagnostics of corporate mentality and context to implementing leadership programmes that genuinely change employee behaviour at all levels.',
      introTitleEn: 'Safety Culture and Leadership',
    },
  },
  {
    id: 'a39fe09f-2cfa-4d7c-b21d-2e4aa551dd20',
    set: {
      titleEn: 'OHS System Diagnostics',
      descriptionEn: 'In many companies, the main risks arise not from ignorance of rules, but from hidden systemic failures: procedures exist but do not work, inspections are conducted but do not lead to changes, incidents are not investigated but merely concealed. Such problems are rarely visible in reports and KPIs — they emerge when it is already too late.',
      introTitleEn: 'OHS System Diagnostics',
    },
  },
  {
    id: 'ad207a88-1e9b-4dbf-bd5c-7b96ef860a7f',
    set: {
      titleEn: 'Process Safety',
      descriptionEn: 'Horizon ensures process safety for industrial facilities, conducting comprehensive engineering studies (HAZOP, LOPA, SIL) to international standards to prevent accidents and reduce risks.',
      introTitleEn: 'Our Approach and Mission',
    },
  },

  // ── EMERGENCY ITEMS ──
  {
    id: '88a7de23-5fe2-49b1-81fe-1a15c69aaa7d',
    set: {
      titleEn: 'Competency Assessment',
      descriptionEn: 'Horizon conducts comprehensive assessments of personnel readiness for emergency situations, using practical simulations and role audits to identify skill gaps and enhance overall safety culture.',
      introTitleEn: 'Competency Assessment',
    },
  },
  {
    id: 'ca706b92-d719-4b33-a68e-440b51c36d0d',
    set: {
      titleEn: 'Emergency Management System Development',
      descriptionEn: 'Horizon develops comprehensive emergency response systems, turning a set of disparate documents into a working mechanism with clear role distribution and decision-making algorithms. We adapt international standards to your facility\'s specifics, guaranteeing real personnel readiness for effective action under uncertainty and time pressure.',
      introTitleEn: 'Emergency Management System Development',
    },
  },
  {
    id: 'cc8d4c97-0b04-4de6-9a0e-0ae5e6eff418',
    set: {
      titleEn: 'Emergency Response System Audit',
      descriptionEn: 'We verify not just the existence of documents, but the actual operability of the emergency response system, identifying critical gaps between paper plans and personnel actions under real threat conditions.',
      introTitleEn: 'Emergency Response System Audit',
    },
  },

  // ── EXPLOSION ITEMS ──
  {
    id: '975f9e7f-5b23-41ca-b139-8b25fd84e701',
    set: {
      titleEn: 'Inspections & Maintenance (IECEx)',
      descriptionEn: 'Inspection of explosion-proof equipment is a systematic asset verification against IEC 60079 standards, identifying critical defects at all stages of operation and providing a clear risk mitigation plan to ensure facility safety.',
      introTitleEn: 'Inspection of Explosion-Proof Equipment',
    },
  },

  // ── ENGINEERING ITEMS ──
  {
    id: 'dcf048f0-0dfe-45d3-b780-3f020243ea88',
    set: {
      titleEn: 'Electrical Installation Works',
      descriptionEn: 'HORIZON INC performs a full range of electrical installation and instrumentation & control (I&C) works at hazardous industrial facilities, guaranteeing compliance with international safety standards at all stages — from new construction to major overhauls. We ensure the reliability of low-voltage systems, explosion protection and lightning protection, working on both operating plants and greenfield projects.',
      introTitleEn: 'Electrical Installation Works',
    },
  },

  // ── PPE ITEMS ──
  {
    id: '3b9c3a87-f6db-47d8-9db1-fe72b315ad88',
    set: {
      titleEn: 'Workwear Production',
      descriptionEn: 'Development and production of modern specialised workwear for workers across various industries — from manufacturing to construction and energy. All products are created in compliance with occupational health requirements, climatic conditions, and the specifics of work processes.',
      introTitleEn: 'Workwear Production',
    },
  },

  // ── ABOUT ITEMS ──
  {
    id: '858e41b5-8155-42ea-acb4-b2a0f18e9326',
    set: {
      titleEn: 'Events',
      descriptionEn: 'News and events from Horizon INC.',
      introTitleEn: 'Events',
    },
  },
  {
    id: 'ecdc24ed-58ac-4386-828c-ad0c6ce3aa9e',
    set: {
      titleEn: 'About the Company',
      descriptionEn: 'Learn more about Horizon INC — our history, values, and team.',
      introTitleEn: 'About Horizon INC',
    },
  },
  {
    id: 'f378fd62-563a-4d7c-892a-c3bb46b150f7',
    set: {
      titleEn: 'Careers',
      descriptionEn: 'Join the Horizon INC team. We are always looking for talented professionals.',
      introTitleEn: 'Open Positions',
    },
  },

  // ── COURSE CATEGORIES ──
  {
    id: '56678d42-242c-4530-868d-e1f1978f79e8',
    set: { titleEn: 'IOSH' },
  },
  {
    id: '64b7caf8-4fe4-47fc-8f0c-c18906bd1441',
    set: { titleEn: 'NEBOSH' },
  },
  {
    id: '6919d33c-5add-4b59-be70-abf8486d5e5f',
    set: { titleEn: 'NOCN (Emergency Response)' },
  },
  {
    id: '72c5fad3-46d9-4c79-91cd-d412e58d5224',
    set: { titleEn: 'CompEx' },
  },
  {
    id: '96a41951-6cdd-4f86-a2fc-d0bcd21953b5',
    set: { titleEn: 'RoSPA' },
  },

  // ── COURSES ──
  {
    id: '005cf41e-c84f-4789-a7ea-bca60f0f90d5',
    set: {
      titleEn: 'NOCN AICIR',
      descriptionEn: 'NOCN AICIR (Asset Incident Commander – Initial Response) is a practical course for managers and emergency command staff. The programme teaches how to act in the first critical minutes of a major incident, when the cost of an error is unacceptably high and decisions must be made quickly, clearly, and based on facts.',
      introTitleEn: 'NOCN AICIR',
    },
  },
  {
    id: '0ce33193-5e6b-433e-8f93-7c7878de2abb',
    set: {
      titleEn: 'CompEx 01-04 Gas & Vapours',
      descriptionEn: 'This is the gold standard qualification for electrical personnel worldwide.',
      detailsEn: 'Working with gases and vapours in explosive atmospheres',
      introTitleEn: 'CompEx Ex01-Ex04: Gas & Vapours',
    },
  },
  {
    id: '0f50694c-c1ea-4a1c-9480-32f7ae185556',
    set: {
      titleEn: 'IOSH Managing Safely',
      descriptionEn: 'This is the flagship course from the Institution of Occupational Safety and Health (IOSH), recognised worldwide as the standard qualification for managers.',
      detailsEn: 'An intensive course lasting 4 days',
      introTitleEn: 'IOSH Managing Safely',
    },
  },
  {
    id: '113e7c14-c92b-4a1c-bfae-3736a1cfbfa0',
    set: {
      titleEn: 'CompEx Ex05-Ex06: Combustible Dusts',
      descriptionEn: 'The world "gold standard" qualification. The Ex05-Ex06 course focuses on protection from explosive dust — a critically important skill for grain elevators, food processing, and woodworking industries.',
      detailsEn: '(Working with combustible dust in explosive atmospheres)',
      introTitleEn: 'CompEx Ex05-Ex06: Combustible Dusts',
    },
  },
  {
    id: '13a57c3e-883e-42c7-8430-b4a5136cd68b',
    set: {
      titleEn: 'NEBOSH Process Safety Management',
      descriptionEn: 'A specialised course developed in partnership with the UK regulator HSE for managing risks at hazardous industrial facilities (oil & gas, chemical industries). The programme focuses on asset integrity, safe process operations, and preventing catastrophic accidents. Learners study strategies for controlling critical parameters and minimising the consequences of hazardous substance releases.',
      detailsEn: 'Duration: 4 days',
      introTitleEn: 'NEBOSH Process Safety Management',
    },
  },
  {
    id: '28228d15-6f67-4d97-b328-f1b3c12d8b28',
    set: {
      titleEn: 'On-Site Emergency Commander (OSEC)',
      descriptionEn: 'The practical OSEC course prepares managers for effective industrial emergency management in the critical first minutes under stress. The programme combines international standards with intensive simulations to practise decision-making, resource coordination, and catastrophic consequence prevention.',
      introTitleEn: 'On-Site Emergency Commander (OSEC)',
    },
  },
  {
    id: '2d207e59-7b3d-4115-8ccd-5073b16a8f10',
    set: {
      titleEn: 'NEBOSH Leadership Excellence',
      descriptionEn: 'A qualification for senior management and executives, revealing the strategic role of a leader in shaping a safety culture. Based on the HSE "Make it Happen" model, the course teaches how to diagnose the impact of management decisions on safety and minimise human-factor risks. It helps transform formal rule compliance into conscious leadership.',
      detailsEn: 'Duration: 1 day; Teaching methods: Interactive lectures, case studies, group discussions, practical exercises.',
      introTitleEn: 'NEBOSH Leadership Excellence',
    },
  },
  {
    id: '52f67ecf-1397-462b-a710-0a1e1350375d',
    set: {
      titleEn: 'NEBOSH Award in Managing Risks and Risk Assessment at Work',
      descriptionEn: 'This is a one-day qualification developed by the NEBOSH examination board in collaboration with the UK\'s Health and Safety Executive (HSE). The course teaches a practical approach to risk assessment based on global best practices.',
      detailsEn: 'The course is universal and suitable for everyone involved in the risk management process in any industry.',
      introTitleEn: 'Award in Managing Risks and Risk Assessment at Work',
    },
  },
  {
    id: '6c71ec29-0f83-4762-b6a3-1ef88f69eee6',
    set: {
      titleEn: 'Pipeline Incident Response',
      descriptionEn: 'To prevent severe accident consequences, the course trains rapid response using realistic pressurised pipeline simulators. Participants practise team coordination, safe leak isolation methods, and the use of specialised equipment.',
      introTitleEn: 'Pipeline Incident Response',
    },
  },
  {
    id: '7fc0e8bb-dc13-46a9-8b9a-f606026127b3',
    set: {
      titleEn: 'IOSH Working Safely',
      descriptionEn: 'This is the foundational international course that gives employees the fundamental knowledge for safe working without overloading them with complex legal terminology.',
      detailsEn: 'Interactive sessions including video materials and practical assignments.',
      introTitleEn: 'IOSH Working Safely',
    },
  },
  {
    id: 'a3a8799e-a0ee-4010-a214-933c80d2458a',
    set: {
      titleEn: 'Level 2 Defensive Driving (IOGP)',
      descriptionEn: 'Master advanced accident prevention techniques and road risk management to global energy sector standards. Earn a globally recognised certificate from a leader in road safety.',
      introTitleEn: 'RoSPA Level 2 Defensive Driving',
    },
  },
  {
    id: 'b0da0137-6a94-46f7-9731-57dcadc0be65',
    set: {
      titleEn: 'NEBOSH HSE Introduction to Incident Investigation',
      descriptionEn: 'This brief one-day qualification, created by NEBOSH and the UK\'s HSE, will help you learn how to effectively investigate straightforward incidents and prevent their recurrence.',
      detailsEn: 'Managers, health & safety professionals, SHE advisors, union and responsible representatives.',
      introTitleEn: 'NEBOSH HSE Introduction to Incident Investigation',
    },
  },
  {
    id: 'b1e758b8-c5db-44de-9822-6cf6be25dfc1',
    set: {
      titleEn: 'NEBOSH Certificate in Managing Stress at Work',
      descriptionEn: 'NEBOSH HSE Certificate in Managing Stress at Work is a specialised qualification developed jointly by the NEBOSH examination board and the UK\'s Health and Safety Executive (HSE). This course shifts stress management from the realm of "psychology" into risk assessment and concrete management actions.',
      detailsEn: '· identify sources of stress · reduce its consequences · create a healthy and motivating work environment',
      introTitleEn: 'Certificate in Managing Stress at Work',
    },
  },
  {
    id: 'b5cf99c3-40d2-40ad-8fdb-20bffac7c6de',
    set: {
      titleEn: 'CompEx Foundation & Foundation Plus',
      descriptionEn: 'This is the ideal entry point into the explosion safety industry. The programmes provide a fundamental understanding of risks and working standards in explosive atmospheres (IEC 60079).',
      detailsEn: 'Theory course and Extended course with a practical module',
      introTitleEn: 'CompEx Foundation & Foundation Plus',
    },
  },
  {
    id: 'c72d8080-7e9f-4054-a6af-add54f98bc4a',
    set: {
      titleEn: 'NEBOSH IGC',
      descriptionEn: 'NEBOSH IGC is the international "gold standard" qualification, teaching how to build safety management systems to ILO and ISO standards. The course develops the competencies needed by managers and specialists to implement an effective health and safety culture in organisations of any size.',
      detailsEn: 'offline/online, 10 study days',
      introTitleEn: 'NEBOSH IGC',
    },
  },
  {
    id: 'db7a7b08-46d8-46fd-beb7-9c559037fdbb',
    set: {
      titleEn: 'NEBOSH Working with Wellbeing',
      descriptionEn: 'This is an introductory one-day qualification aimed at creating a healthy working atmosphere. The course translates the concept of "wellbeing" from an abstract idea into a concrete set of tools for managers and HR professionals.',
      detailsEn: '· Reduced turnover and sick leave · Fewer injuries and conflicts · Greater engagement and productivity',
      introTitleEn: 'NEBOSH HSE Working with Wellbeing',
    },
  },
  {
    id: 'fc6e422c-14f3-4687-8801-f7aad6d692b6',
    set: {
      titleEn: 'IOSH Vision Zero',
      descriptionEn: 'This course is fundamentally different from standard health and safety training. It is not about "rules and instructions" — it is about transforming mindsets and creating a culture where injuries are unacceptable.',
      detailsEn: 'The concept of "Zero Harm"',
      introTitleEn: 'IOSH Vision Zero',
    },
  },

  // ── CONTACT CITIES ──
  {
    id: '11873081-d2df-4aa6-8a9c-dbb6bc25646a',
    set: {
      cityEn: 'Astana',
      officeNameEn: 'Head Office «HORIZON INC»',
      addressEn: 'Postal code: Z10T2T4; 3 Akhmet Baitursynov St, Office 9 (2nd floor, NP-9), HighVill Residential Complex (Block B)',
    },
  },
  {
    id: '2e717b80-1b1b-4904-a153-f3e5ef5baeaa',
    set: {
      cityEn: 'Atyrau',
      officeNameEn: 'Office «HORIZON INC»',
      addressEn: 'Postal code: E02H1P8; 40a Amandosov St',
    },
  },
  {
    id: '31c33955-5c1b-4cf8-9542-e34e7ab978aa',
    set: {
      cityEn: 'Aksai',
      officeNameEn: 'Training Centre «HORIZON INC»',
      addressEn: 'Postal code: L16F4M5; Burlin District, Aksai city, 51N Industrial Zone St, Horizon INC LLP Base',
    },
  },
];

// ─────────────────────────────────────────────
// ОТПРАВКА В SANITY
// ─────────────────────────────────────────────
async function run() {
  // Разбиваем на пачки по 30 мутаций (лимит Sanity)
  const chunkSize = 30;
  let total = 0;

  for (let i = 0; i < patches.length; i += chunkSize) {
    const chunk = patches.slice(i, i + chunkSize);
    const mutations = chunk.map(({ id, set }) => ({
      patch: { id, set },
    }));

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ mutations }),
    });

    const json = await res.json();
    if (!res.ok) {
      console.error(`❌ Ошибка (батч ${i / chunkSize + 1}):`, JSON.stringify(json, null, 2));
      process.exit(1);
    }
    total += chunk.length;
    console.log(`✅ Батч ${i / chunkSize + 1}: обновлено ${chunk.length} документов`);
  }

  console.log(`\n🎉 Готово! Всего обновлено: ${total} документов.`);
}

run().catch(err => {
  console.error('❌ Неожиданная ошибка:', err);
  process.exit(1);
});
