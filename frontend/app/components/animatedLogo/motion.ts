/**
 * Перетекание логотипов HSE ⇄ Horizon: геометрия и хореография.
 *
 * Здесь только расчёты, без DOM — поэтому исходный кадр считается ещё на
 * сервере, и логотип виден до загрузки скриптов.
 *
 * Надпись в логотипах разная: HORIZON заглавными в Horizon и horizon
 * строчными в HSE. Буквы те же и в том же порядке, поэтому каждая на ходу
 * переворачивается из заглавной в строчную — волной, слева направо.
 * Треугольник — три уголка с глазом в Horizon и сплошной ▶ в HSE — строится
 * здесь по вершинам, а не берётся картинкой: иначе между ними нечему было
 * бы перетекать.
 */

type Pt = [number, number];

/* ------------------------------------------------------------------ *
 * Шкала цикла                                                         *
 * ------------------------------------------------------------------ */

export const HOLD = 5000;
export const MORPH = 2000;
export const T_TO_HORIZON = HOLD;
export const T_HORIZON = HOLD + MORPH;
export const T_TO_HSE = 2 * HOLD + MORPH;
export const CYCLE = 2 * (HOLD + MORPH);

/* ------------------------------------------------------------------ *
 * Геометрия                                                           *
 * ------------------------------------------------------------------ */

/**
 * Логотип Horizon ставится в рамку HSE со сдвигом вниз на 9 — тогда его
 * HORIZON стоит на той же строке, что и horizon в HSE (низ букв на 26), и
 * в обоих логотипах эта строка совпадает со строкой меню в шапке.
 */
export const H_DY = 9;

/** Линия, к которой буквы сжимаются, переворачиваясь: середина строки. */
const FLIP_Y = 20.5;

/**
 * Вершины треугольника по часовой: в Horizon — верх, правый низ, левый низ.
 *
 * Треугольник почти равносторонний, и ▲ совпадает с ▶ уже при повороте на
 * 30° против часовой: верх уходит в левый верх ▶, правый низ становится
 * остриём. Поворот на 90° по часовой проходил бы через силуэт ◀, и глазу
 * казалось бы, что треугольник дёрнулся не в ту сторону.
 */
const TRI_H: Pt[] = [[12.8718, 0 + H_DY], [25.7445, 21.8619 + H_DY], [0, 21.8619 + H_DY]];
const TRI_S: Pt[] = [[41.3208, 0], [52, 6.23951], [41.3208, 12.4779]];

/** Уголки Horizon: плечо — четверть стороны, толщина 1.47. */
const ALPHA_H = 0.2503;
const THICK_H = 1.472;

/** Дуга полёта: треугольник сперва поднимается, потом уходит вправо. */
const ARC: Pt = [16, 5];

/** Центр глаза и зрачка в координатах логотипа Horizon (до сдвига H_DY). */
export const EYE_C: Pt = [12.87, 13.26];
export const PUPIL_C: Pt = [12.77, 13.26];

const add = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]];
const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
const mul = (a: Pt, k: number): Pt => [a[0] * k, a[1] * k];
const dot = (a: Pt, b: Pt) => a[0] * b[0] + a[1] * b[1];
const len = (a: Pt) => Math.hypot(a[0], a[1]);
const unit = (a: Pt): Pt => { const l = len(a) || 1; return [a[0] / l, a[1] / l]; };
const rot = (v: Pt, t: number): Pt => {
  const c = Math.cos(t), s = Math.sin(t);
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c];
};
const centroid = (V: Pt[]): Pt => [(V[0][0] + V[1][0] + V[2][0]) / 3, (V[0][1] + V[1][1] + V[2][1]) / 3];
const inradius = (V: Pt[]) => {
  const a = len(sub(V[1], V[2])), b = len(sub(V[0], V[2])), c = len(sub(V[0], V[1]));
  const area = Math.abs((V[1][0] - V[0][0]) * (V[2][1] - V[0][1]) - (V[2][0] - V[0][0]) * (V[1][1] - V[0][1])) / 2;
  return (2 * area) / (a + b + c);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const bez = (p0: Pt, p1: Pt, p2: Pt, t: number): Pt => [
  (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
  (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1],
];
const fmt = (p: Pt) => p[0].toFixed(3) + ' ' + p[1].toFixed(3);

/**
 * Поворот с масштабом, переводящий треугольник Horizon в ▶. Оба почти
 * равносторонние, остаток после подгонки — сотые доли; его добавляем
 * постепенно, чтобы в конце совпасть с исходником точно.
 */
const FIT = (() => {
  const ca = centroid(TRI_H), cb = centroid(TRI_S);
  const a = TRI_H.map((p) => sub(p, ca));
  const b = TRI_S.map((p) => sub(p, cb));
  let sc = 0, ss = 0, aa = 0;
  for (let i = 0; i < 3; i++) {
    sc += dot(a[i], b[i]);
    ss += a[i][0] * b[i][1] - a[i][1] * b[i][0];
    aa += dot(a[i], a[i]);
  }
  const phi = Math.atan2(ss, sc);
  const s = (sc * Math.cos(phi) + ss * Math.sin(phi)) / aa;
  const res = b.map((q, i) => sub(q, mul(rot(a[i], phi), s)));
  return { ca, cb, a, phi, s, res };
})();

const TAU_H = THICK_H / inradius(TRI_H);

function triangleAt(fT: number, fR: number, fS: number): Pt[] {
  const c = bez(FIT.ca, ARC, FIT.cb, fT);
  const scale = Math.pow(FIT.s, fS);
  const ang = FIT.phi * fR;
  const r = Math.max(0, Math.min(1, fS));
  return FIT.a.map((v, i) => add(add(c, mul(rot(v, ang), scale)), mul(FIT.res[i], r)));
}

/**
 * Три уголка одним контуром: одна фигура закрашивается целиком, и на
 * стыках уголков не остаётся волосяных просветов.
 *
 * alpha — доля стороны под плечом, tau — толщина в долях вписанного
 * радиуса. При alpha = 0.5 и tau → 1 уголки смыкаются в сплошной
 * треугольник. burst на миг отталкивает уголки от центра.
 */
function bracketsPath(V: Pt[], alpha: number, tau: number, burst: number) {
  const C = centroid(V);
  const t = tau * inradius(V);
  let d = '';
  for (let i = 0; i < 3; i++) {
    const P0 = V[i], N = V[(i + 1) % 3], P = V[(i + 2) % 3];
    const dN = unit(sub(N, P0)), dP = unit(sub(P, P0));
    let nN: Pt = [-dN[1], dN[0]]; if (dot(nN, sub(P, P0)) < 0) nN = mul(nN, -1);
    let nP: Pt = [-dP[1], dP[0]]; if (dot(nP, sub(N, P0)) < 0) nP = mul(nP, -1);
    const A = add(P0, mul(dN, alpha * len(sub(N, P0))));
    const B = add(P0, mul(dP, alpha * len(sub(P, P0))));
    const A2 = add(A, mul(nN, t));
    const B2 = add(B, mul(nP, t));
    // Внутренний угол — пересечение двух сдвинутых внутрь сторон
    const rhs = mul(sub(nP, nN), t);
    const det = -dN[0] * dP[1] + dP[0] * dN[1];
    const lam = (-rhs[0] * dP[1] + dP[0] * rhs[1]) / det;
    const Q = add(add(P0, mul(nN, t)), mul(dN, lam));
    const out = mul(unit(sub(P0, C)), burst);
    d += 'M' + [P0, A, A2, Q, B2, B].map((p) => fmt(add(p, out))).join('L') + 'Z';
  }
  return d;
}

const solidPath = (V: Pt[]) => 'M' + V.map(fmt).join('L') + 'Z';

/* ------------------------------------------------------------------ *
 * Плавности                                                           *
 * ------------------------------------------------------------------ */

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const inOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
const outCubic = (t: number) => 1 - (1 - t) ** 3;
const inCubic = (t: number) => t ** 3;
const inOutBack = (t: number, c1 = 1.2) => {
  const c2 = c1 * 1.525;
  return t < 0.5
    ? ((2 * t) ** 2 * ((c2 + 1) * 2 * t - c2)) / 2
    : ((2 * t - 2) ** 2 * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
};
const outBack = (t: number, c1 = 1.9) => 1 + (c1 + 1) * (t - 1) ** 3 + c1 * (t - 1) ** 2;

/* ------------------------------------------------------------------ *
 * Состояния                                                           *
 * ------------------------------------------------------------------ */

/**
 * Кадр анимации. Всё — от 0 до 1, где 1 означает «как в HSE»:
 * v — буквы подписи, w — «hse», k — буквы слова (0 — HORIZON, 1 — horizon),
 * f* — полёт треугольника (сдвиг, поворот, масштаб), g — уголки
 * сомкнулись в сплошной, e — глаз открыт (тут 1 — как в Horizon).
 */
export interface Frame {
  v: number[];
  w: number[];
  k: number[];
  /** Слово целиком: 0 — на месте HORIZON в Horizon, 1 — на месте horizon в HSE. */
  move: number;
  fT: number; fR: number; fS: number;
  /** Сырой ход полёта — по нему строится шлейф. */
  fl: number;
  /** 1 — летит к HSE, −1 — к Horizon, 0 — стоит. */
  dir: number;
  g: number;
  e: number;
  pupil: number;
}

const all = (n: number, v: number) => Array.from({ length: n }, () => v);

export const REST_HSE: Frame = {
  v: all(16, 1), w: all(3, 1), k: all(7, 1), move: 1,
  fT: 1, fR: 1, fS: 1, fl: 0, dir: 0, g: 1, e: 0, pupil: 0,
};
export const REST_HORIZON: Frame = {
  v: all(16, 0), w: all(3, 0), k: all(7, 0), move: 0,
  fT: 0, fR: 0, fS: 0, fl: 0, dir: 0, g: 0, e: 1, pupil: 1,
};

/**
 * Horizon → HSE: глаз закрывается, уголки смыкаются, треугольник улетает на
 * место ▶, HORIZON отъезжает вправо, поднимаются «hse», последней — подпись.
 */
function toHse(p: number): Frame {
  const fl = seg(p, 0.30, 0.80);
  return {
    e: 1 - inCubic(seg(p, 0.00, 0.14)),
    pupil: 1 - inCubic(seg(p, 0.00, 0.10)),
    g: inOutCubic(seg(p, 0.08, 0.40)),
    fT: inOutCubic(fl), fR: inOutBack(fl), fS: inOutCubic(fl), fl, dir: 1,
    move: inOutCubic(seg(p, 0.24, 0.70)),
    k: all(7, 0).map((_, i) => seg(p, 0.26 + 0.03 * i, 0.44 + 0.03 * i)),
    w: [0, 1, 2].map((j) => outCubic(seg(p, 0.58 + 0.06 * j, 0.84 + 0.06 * j))),
    v: all(16, 0).map((_, i) => outCubic(seg(p, 0.60 + 0.011 * i, 0.78 + 0.011 * i))),
  };
}

/**
 * HSE → Horizon: подпись уходит справа налево, «hse» оседают, ▶ летит
 * обратно, раскрывается в три уголка, и последним открывается глаз.
 */
function toHorizon(p: number): Frame {
  const fl = seg(p, 0.18, 0.66);
  return {
    v: all(16, 0).map((_, i) => 1 - inCubic(seg(p, 0.011 * (15 - i), 0.16 + 0.011 * (15 - i)))),
    w: [0, 1, 2].map((j) => 1 - inCubic(seg(p, 0.08 + 0.06 * (2 - j), 0.30 + 0.06 * (2 - j)))),
    move: 1 - inOutCubic(seg(p, 0.16, 0.62)),
    k: all(7, 0).map((_, i) => 1 - seg(p, 0.18 + 0.03 * i, 0.36 + 0.03 * i)),
    fT: 1 - inOutCubic(fl), fR: 1 - inOutBack(fl), fS: 1 - inOutCubic(fl), fl, dir: -1,
    g: 1 - inOutCubic(seg(p, 0.56, 0.86)),
    e: outBack(seg(p, 0.80, 1.00)),
    pupil: outBack(seg(p, 0.86, 1.00)),
  };
}

/** Кадр по времени от начала цикла. Цикл начинается с HSE. */
export function frameAt(t: number): Frame {
  const T = ((t % CYCLE) + CYCLE) % CYCLE;
  if (T < T_TO_HORIZON) return REST_HSE;
  if (T < T_HORIZON) return toHorizon((T - T_TO_HORIZON) / MORPH);
  if (T < T_TO_HSE) return REST_HORIZON;
  return toHse((T - T_TO_HSE) / MORPH);
}

/** Идёт ли сейчас переход — в паузах кадры не пересчитываются. */
export function isMoving(t: number): boolean {
  const T = ((t % CYCLE) + CYCLE) % CYCLE;
  return (T >= T_TO_HORIZON && T < T_HORIZON) || T >= T_TO_HSE;
}

/** Сколько ждать до начала следующего перехода. */
export function untilNextMove(t: number): number {
  const T = ((t % CYCLE) + CYCLE) % CYCLE;
  if (T < T_TO_HORIZON) return T_TO_HORIZON - T;
  if (T < T_HORIZON) return 0;
  if (T < T_TO_HSE) return T_TO_HSE - T;
  return 0;
}

/* ------------------------------------------------------------------ *
 * Кадр → атрибуты                                                     *
 * ------------------------------------------------------------------ */

export interface TrianglePaint {
  brackets: string;
  solid: string;
  solidOpacity: number;
  ghosts: { d: string; opacity: number }[];
}

export function paintTriangle(f: Frame): TrianglePaint {
  const ga = inOutCubic(seg(f.g, 0, 0.6));
  const gt = inOutCubic(seg(f.g, 0.3, 1));
  const V = triangleAt(f.fT, f.fR, f.fS);
  const scaleNow = Math.pow(FIT.s, f.fS);
  const burst = 1.6 * Math.sin(Math.PI * ga) * scaleNow;

  // Шлейф — два призрака позади, только пока треугольник летит
  const trail = Math.sin(Math.PI * f.fl);
  const ghosts = [0.07, 0.14].map((lag, i) => {
    const q = clamp01(f.fl - lag);
    const fT = f.dir === 1 ? inOutCubic(q) : 1 - inOutCubic(q);
    const fR = f.dir === 1 ? inOutBack(q) : 1 - inOutBack(q);
    return {
      d: f.dir ? solidPath(triangleAt(fT, fR, fT)) : '',
      opacity: f.dir ? (i ? 0.07 : 0.14) * trail : 0,
    };
  });

  return {
    brackets: bracketsPath(V, lerp(ALPHA_H, 0.5, ga), lerp(TAU_H, 0.995, gt), burst),
    solid: solidPath(V),
    // Сплошная заливка держится, пока отверстие в центре не станет заметным:
    // иначе оно проступает точкой и выглядит как дефект, а не как раскрытие.
    solidOpacity: seg(f.g, 0.72, 0.80),
    ghosts,
  };
}

export interface LetterPaint {
  caps: { transform: string; opacity: number };
  lower: { transform: string; opacity: number };
}

/**
 * Одна буква слова на ходу. Слово едет целиком (move — общий для всех
 * букв), а по нему волной идёт переворот (q — у каждой буквы свой): через
 * середину строки заглавная сжимается в линию, строчная из неё раскрывается.
 * Если бы каждая буква и ехала в своё время, передние успевали бы доехать,
 * пока задние стоят, и слово растягивалось бы на ходу.
 *
 * capsX и lowerX — середины букв по горизонтали в своих логотипах.
 */
export function paintLetter(q: number, move: number, capsX: number, lowerX: number): LetterPaint {
  const dx = lowerX - capsX;
  const capsY = 1 - inOutCubic(seg(q, 0, 0.5));
  const lowerY = inOutCubic(seg(q, 0.5, 1));
  const flip = (x: number, sy: number) =>
    `translate(${x.toFixed(3)} ${FLIP_Y}) scale(1 ${sy.toFixed(3)}) translate(${(-x).toFixed(3)} ${-FLIP_Y})`;
  return {
    caps: {
      transform: `translate(${(dx * move).toFixed(3)} 0) ${flip(capsX, capsY)}`,
      opacity: capsY > 0.001 ? 1 : 0,
    },
    lower: {
      transform: `translate(${(-dx * (1 - move)).toFixed(3)} 0) ${flip(lowerX, lowerY)}`,
      opacity: lowerY > 0.001 ? 1 : 0,
    },
  };
}

/** Исходный кадр — тот, что уходит в разметку с сервера. */
export const INITIAL = paintTriangle(REST_HSE);
