/**
 * Заполняет introTextEn для страниц сервисов.
 * Запуск: node translate-pages-en.mjs
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(resolve(__dir, '.env.local'), 'utf-8');
const TOKEN = envContent.match(/SANITY_WRITE_TOKEN=(.+)/)?.[1]?.trim();
if (!TOKEN) { console.error('❌ SANITY_WRITE_TOKEN не найден'); process.exit(1); }

const API_URL = 'https://yhtytg6i.api.sanity.io/v2021-10-21/data/mutate/production';

// Helper: создаёт блок Portable Text
const block = (text, style = 'normal', key) => ({
  _key: key || Math.random().toString(36).slice(2, 10),
  _type: 'block',
  style,
  markDefs: [],
  children: [{ _key: Math.random().toString(36).slice(2, 10), _type: 'span', marks: [], text }],
});

const bulletBlock = (text, key) => ({
  ...block(text, 'normal', key),
  level: 1,
  listItem: 'bullet',
});

// ─────────────────────────────────────────────
// ПЕРЕВОДЫ introTextEn
// ─────────────────────────────────────────────
const patches = [

  // ── CULTURE & LEADERSHIP (75e66655) ──
  {
    id: '75e66655-9510-4787-95af-6ee10cd7e2d1',
    set: {
      introTextEn: [
        block('Organisational Culture', 'h3'),
        block('is a combination of beliefs, attitudes, habits and relationships of employees that determine their behavioural patterns, as well as the many factors that influence the formation of such internal attitudes within a team.'),
        block('We take a structured approach to diagnosing the factors that influence employee behaviour at all levels, conducting social research and analysing the systems that determine the level of culture in an organisation.\nThere can be no one-size-fits-all approach here, so we look at what is specifically relevant for the given company, the team\'s mentality and the organisational context as a whole.\nWhen working on leadership development, we account for tools at different levels — including strategic leadership and the personal responsibility of front-line employees — so our programmes are not limited to training sessions alone.'),
      ],
    },
  },

  // ── PROCESS SAFETY (ad207a88) ──
  {
    id: 'ad207a88-1e9b-4dbf-bd5c-7b96ef860a7f',
    set: {
      introTextEn: [
        block('Process safety is a systematic and engineering-based approach to identifying, analysing and reducing risks associated with hazardous industrial processes. Horizon provides professional services in the field of process and technical safety, carrying out comprehensive engineering studies aimed at preventing accidents, fires, explosions and uncontrolled releases at industrial facilities.'),
      ],
    },
  },

  // ── INSPECTIONS & MAINTENANCE IECEx (975f9e7f) ──
  {
    id: '975f9e7f-5b23-41ca-b139-8b25fd84e701',
    set: {
      introTextEn: [
        block('Independent IECEx Compliance Verification', 'h3'),
        block('Inspection of explosion-proof equipment is a systematic verification of electrical equipment installed in hazardous areas against the requirements of the IEC 60079 international standards series. The purpose of the inspection is to confirm that the equipment retains its explosion-protection properties throughout its entire lifecycle: from installation to operation and maintenance.'),
        block('Inspection enables the identification of deviations that may lead to loss of explosion protection: incorrect installation, enclosure damage, non-conforming cable entries, breached earthing, or incorrect Ex marking. The service is critically important for oil & gas, chemical and energy facilities, where personnel safety and asset integrity depend directly on the condition of Ex equipment.'),
        block('The outcome of the inspection is a technically substantiated report classifying identified non-conformances and providing recommendations for their elimination.'),
        block('Regulatory and Technical Basis', 'h3'),
        block('Inspections are carried out in accordance with local PTB and PTE regulations, as well as the IEC 60079 international standards series, including IEC 60079-14 (installation), IEC 60079-17 (inspection and maintenance) and IEC 60079-19 (repair and reconditioning). The requirements of the TR CU 012, IECEx and ATEX schemes for conformity verification and personnel competence are also taken into account.\nThe key element is the participation of a competent inspector holding confirmed qualifications in explosion protection. Unlike installation or service work, an inspection is an independent assessment of equipment condition aimed at objectively confirming its fitness for safe operation.'),
      ],
    },
  },

  // ── EMERGENCY RESPONSE SYSTEM AUDIT (cc8d4c97) ──
  {
    id: 'cc8d4c97-0b04-4de6-9a0e-0ae5e6eff418',
    set: {
      introTextEn: [
        block('The effectiveness of emergency response is determined not only by technical means, but also by the quality of the management system, planning and personnel preparedness.'),
        block('Horizon provides emergency response system audit services aimed at assessing the completeness, relevance and practical applicability of documents governing personnel actions during accidents and emergency situations.'),
      ],
    },
  },

  // ── COMPETENCY ASSESSMENT (88a7de23) ──
  {
    id: '88a7de23-5fe2-49b1-81fe-1a15c69aaa7d',
    set: {
      introTextEn: [
        block('Effective management of emergency and abnormal situations depends directly on the level of preparedness and competence of the personnel involved in decision-making and incident response. Horizon provides comprehensive competency assessment services for personnel at various levels involved in the management and response to emergency situations at high-hazard facilities.'),
        block('As part of this service, Horizon carries out an analysis of current competency levels, an assessment of personnel roles and functions (from line managers and operational teams to emergency management staff and senior management), as well as the development of competency standards based on international approaches and best industry practices in emergency response.'),
      ],
    },
  },

  // ── EMERGENCY MANAGEMENT SYSTEM DEVELOPMENT (ca706b92) ──
  {
    id: 'ca706b92-d719-4b33-a68e-440b51c36d0d',
    set: {
      introTextEn: [
        block('Effective emergency management requires not only individual documents, but an integrated, interconnected system covering management, personnel, procedures and coordination. Horizon provides services for the development and implementation of emergency management systems for high-hazard facilities, taking into account the production specifics, risks and organisational structure of the Client.'),
      ],
    },
  },

  // ── ELECTRICAL INSTALLATION WORKS (dcf048f0) ──
  {
    id: 'dcf048f0-0dfe-45d3-b780-3f020243ea88',
    set: {
      introTextEn: [
        block('Professional electrical installation solutions for industrial and hazardous area facilities', 'h3'),
        block('HORIZON INC provides electrical installation works for industrial facilities, including hazardous production facilities in the oil & gas, petrochemical and energy sectors.'),
        block('We focus on safety, compliance with international standards and high technical competence of personnel, ensuring the reliability and traceability of every stage of the work.'),
        block('Scope and types of electrical installation works', 'h3'),
        block('HORIZON INC performs a full range of electrical installation works within new construction projects, modernisation of existing facilities and planned shutdowns.'),
        block('Main types of work:', 'h3'),
        bulletBlock('Low-voltage (LV, up to 1 kV) electrical installation works;'),
        bulletBlock('Installation, connection and testing of instrumentation and control (I&C) systems;'),
        bulletBlock('Installation of explosion-proof electrical equipment (Ex);'),
        bulletBlock('Earthing and lightning protection systems installation;'),
        bulletBlock('Installation of cable routes, cable trays and cable management systems.'),
        block('Project delivery formats:', 'h3'),
        bulletBlock('greenfield — new facilities;'),
        bulletBlock('brownfield — operating production sites;'),
        bulletBlock('shutdown / turnaround — works during planned shutdowns and major overhauls.'),
      ],
    },
  },
];

// ─────────────────────────────────────────────
// ОТПРАВКА
// ─────────────────────────────────────────────
async function run() {
  const mutations = patches.map(({ id, set }) => ({ patch: { id, set } }));

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations }),
  });

  const json = await res.json();
  if (!res.ok) {
    console.error('❌ Ошибка:', JSON.stringify(json, null, 2));
    process.exit(1);
  }

  console.log(`✅ Переведено ${patches.length} страниц:`);
  patches.forEach(p => console.log(`   • ${p.id}`));
}

run().catch(err => { console.error('❌', err); process.exit(1); });
