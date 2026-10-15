import { useEffect, useRef } from 'react';
import RunnerFigure from './RunnerFigure';

/**
 * Chuyển cảnh có 2 nhân vật đội nón lá (A = quai cam, B = quai xanh).
 * Deck đổi slide ngay; slide cũ được giữ hiện phía trên (Web Animations API) để nhân vật
 * đẩy / nâng / xé / cuộn / đánh... Slide mới nằm sẵn bên dưới.
 *
 * Mỗi cảnh là một hàm thuần `(t, ctx) => Frame` mô tả trạng thái tại thời điểm t (ms):
 *   old / neu : biến đổi của slide cũ / mới thật
 *   pieces    : các bản sao (clone) của slide cũ/mới, cắt bằng clip-path (xé, khoá kéo, vỡ vụn…)
 *   a / b     : tư thế 2 nhân vật
 *   props     : đồ vật phụ (dây, rèm, chảo, kéo, khói, chữ BỐP!…)
 */

export type CharKind =
  | 'shove-left'
  | 'shove-right'
  | 'lift'
  | 'kick'
  | 'stomp'
  | 'tug'
  | 'tear'
  | 'tape'
  | 'roll'
  | 'crumple'
  | 'curtain'
  | 'carry'
  | 'pancake'
  | 'wipe'
  | 'zipper'
  | 'blow'
  | 'scissors'
  | 'smoke'
  | 'plate'
  | 'dust'
  | 'hp'
  | 'food';

export const CHAR_TOTAL: Record<CharKind, number> = {
  'shove-left': 2500,
  'shove-right': 2500,
  lift: 2500,
  kick: 2300,
  stomp: 2700,
  tug: 2900,
  tear: 2200,
  tape: 2900,
  roll: 2700,
  crumple: 3000,
  curtain: 2500,
  carry: 2800,
  pancake: 2500,
  wipe: 2500,
  zipper: 2400,
  blow: 2500,
  scissors: 2600,
  smoke: 2700,
  plate: 2500,
  dust: 3000,
  hp: 3700,
  food: 3100,
};

/**
 * Hiệu ứng cho bước đi tới từ slide (index) i → i+1. Các bước 10→14 dùng chuyến bay bản đồ.
 * Chỗ đổi người thuyết trình dùng "hp" (đối kháng có thanh máu).
 */
const FORWARD: (CharKind | null)[] = [
  'shove-left', // 1→2
  'lift', // 2→3
  'kick', // 3→4
  'stomp', // 4→5
  'hp', // 5→6  Hòa → Hải
  'tug', // 6→7
  'tear', // 7→8
  'tape', // 8→9
  'roll', // 9→10
  'hp', // 10→11 Hải → Trung
  null, // 11→12 bay
  null, // 12→13 bay
  null, // 13→14 bay
  null, // 14→15 bay
  'hp', // 15→16 Trung → Khoa
  'crumple', // 16→17
  'curtain', // 17→18
  'carry', // 18→19
  'pancake', // 19→20
  'wipe', // 20→21
  'hp', // 21→22 Khoa → Liên
  'zipper', // 22→23
  'blow', // 23→24
  'scissors', // 24→25
  'hp', // 25→26 Liên → Trí
  'smoke', // 26→27 (sườn nướng)
  'dust', // 27→28
  'hp', // 28→29 Trí → Đức
  'food', // 29→30
  'plate', // 30→31
  'curtain', // 31→32 (kết thúc)
];
export function charKindFor(from: number, to: number): CharKind | null {
  if (to === from + 1) return FORWARD[from] ?? 'shove-left';
  if (to === from - 1) return 'shove-right';
  return null;
}

// ---------------------------------------------------------------- helpers
const W = 120;
const H = 187;
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const inOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeIn = (t: number) => t * t * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const backOut = (t: number) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);
const bell = (t: number, a: number, b: number) => Math.sin(Math.PI * seg(t, a, b));
const on = (t: number, a: number, b: number) => t >= a && t < b;

interface Pose {
  x: number;
  y: number;
  face: 1 | -1;
  pose: string;
  op?: number;
}
interface SlideFx {
  tf?: string;
  clip?: string;
  op?: number;
  radius?: string;
  filter?: string;
  origin?: string;
  shadow?: string;
}
interface Piece {
  src: 'old' | 'new';
  clip: string;
  tf: string;
  op?: number;
}
interface Prop {
  id: string;
  type: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  rot?: number;
  sc?: number;
  op?: number;
  text?: string;
  val?: number;
}
interface Frame {
  old: SlideFx;
  neu?: SlideFx;
  pieces?: Piece[];
  a?: Pose;
  b?: Pose;
  props?: Prop[];
}
interface Ctx {
  vw: number;
  vh: number;
  F: number; // mặt đất (chân nhân vật)
  R: number[]; // số ngẫu nhiên cố định cho mỗi lần chuyển
  from: number;
  to: number;
}

const burst = (id: string, text: string, x: number, y: number, t: number, a: number, b: number): Prop[] =>
  on(t, a, b) ? [{ id, type: 'burst', x, y, text, sc: backOut(seg(t, a, a + 160)) }] : [];
const bubble = (id: string, text: string, x: number, y: number, t: number, a: number, b: number): Prop[] =>
  on(t, a, b) ? [{ id, type: 'bubble', x, y, text, sc: backOut(seg(t, a, a + 200)) }] : [];
const line = (id: string, type: string, x1: number, y1: number, x2: number, y2: number, h = 5): Prop => ({
  id,
  type,
  x: x1,
  y: y1,
  w: Math.hypot(x2 - x1, y2 - y1),
  h,
  rot: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
});
const stars = (id: string, cx: number, cy: number, t: number): Prop[] =>
  [0, 1, 2].map((i) => ({
    id: `${id}${i}`,
    type: 'star',
    x: cx + Math.cos(t / 160 + (i * Math.PI * 2) / 3) * 34,
    y: cy + Math.sin(t / 160 + (i * Math.PI * 2) / 3) * 10,
    w: 22,
    h: 22,
  }));
/** lưới 4×3 mảnh vỡ của một slide */
const grid = (src: 'old' | 'new', fx: (c: number, r: number, i: number) => { tf: string; op: number }): Piece[] => {
  const out: Piece[] = [];
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 4; c++) {
      const i = r * 4 + c;
      const f = fx(c, r, i);
      out.push({ src, clip: `inset(${(r * 33.34).toFixed(2)}% ${(100 - (c + 1) * 25).toFixed(2)}% ${(100 - (r + 1) * 33.34).toFixed(2)}% ${(c * 25).toFixed(2)}%)`, tf: f.tf, op: f.op });
    }
  return out;
};
const scaleTo = (vw: number, vh: number, cx: number, cy: number, sx: number, sy = sx, extra = '') =>
  `translate(${(cx - vw / 2).toFixed(1)}px, ${(cy - vh / 2).toFixed(1)}px) ${extra} scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;

// ---------------------------------------------------------------- các cảnh
type Scene = (t: number, c: Ctx) => Frame;

const shove =
  (left: boolean): Scene =>
  (t, { vw, F }) => {
    const T0 = 300;
    const T1 = 1900;
    const k = inOut(seg(t, T0, T1));
    const edge = vw * (1 - k * 1.04);
    let ax: number;
    if (t < T0) ax = vw + W - (t / T0) * (W * 0.85);
    else if (t < T1) ax = edge + W * 0.36;
    else ax = W * 0.36 - ((t - T1) / 600) * (W * 2.2);
    const lag = t - 320;
    let bx = lag < 0 ? vw + W * 1.5 : Math.max(ax + W * 1.2, vw + W - lag * 0.95 - Math.sin(lag / 120) * 6);
    if (t >= T1) bx = ax + W * 1.25;
    bx = Math.max(bx, ax + W * 1.05);
    const m = (x: number) => (left ? x : vw - x);
    const face = left ? -1 : 1;
    return {
      old: { tf: `translateX(${left ? -k * 104 : k * 104}%)`, shadow: '0 20px 60px rgba(0,0,0,.3)' },
      a: { x: m(ax), y: F, face, pose: t >= T0 - 60 && t < T1 ? 'push' : 'run' },
      b: { x: m(bx), y: F, face, pose: 'run' },
      props: bubble('bb', 'Đợi tớ với!', m(bx), F - H - 30, t, 650, 1800),
    };
  };

const lift: Scene = (t, { vw, vh, F }) => {
  const hand = F - H * 0.86;
  const xa = vw * 0.32;
  const xb = vw * 0.68;
  const inK = easeOut(seg(t, 0, 450));
  let ty = 0;
  if (t >= 450) ty = lerp(0, hand - vh, easeOut(seg(t, 450, 1150)));
  if (t >= 1350) ty = lerp(hand - vh, -vh * 1.08, easeIn(seg(t, 1350, 1850)));
  const jump = on(t, 1350, 1900) ? bell(t, 1350, 1900) * 70 : 0;
  const squat = on(t, 1150, 1350) ? -bell(t, 1150, 1350) * 8 : 0;
  const outK = easeIn(seg(t, 1950, 2500));
  const pose = t < 450 ? 'run' : t < 1950 ? 'lift' : 'run';
  return {
    old: { tf: `translateY(${ty.toFixed(1)}px)`, shadow: '0 20px 60px rgba(0,0,0,.3)' },
    a: { x: lerp(lerp(-W, xa, inK), -W * 1.5, outK), y: F - jump - squat, face: t < 1950 ? 1 : -1, pose },
    b: { x: lerp(lerp(vw + W, xb, inK), vw + W * 1.5, outK), y: F - jump - squat, face: t < 1950 ? -1 : 1, pose },
    props: bubble('bb', t < 1150 ? 'Một, hai, ba…' : 'Lên!', xa, F - H - 36, t, 300, 1400),
  };
};

const kick: Scene = (t, { vw, F }) => {
  const xk = vw * 0.2;
  let ax = lerp(-W, xk, easeOut(seg(t, 0, 550)));
  let ay = F;
  let pose = 'run';
  if (t >= 550) {
    const u = seg(t, 550, 820);
    ax = xk + 70 * u;
    ay = F - Math.sin(Math.PI * u) * 95;
    pose = on(t, 600, 900) ? 'kick' : 'cheer';
  }
  if (t >= 900) {
    pose = 'cheer';
    ax = xk + 70;
  }
  if (t >= 1600) {
    ax = lerp(xk + 70, vw + W * 1.5, easeIn(seg(t, 1600, 2300)));
    pose = 'run';
  }
  let tf = 'none';
  if (on(t, 720, 820)) tf = `translateX(${(Math.sin((t - 720) / 12) * 14).toFixed(1)}px)`;
  if (t >= 820) {
    const k = easeIn(seg(t, 820, 1500));
    tf = `translate(${(k * 118).toFixed(2)}vw, ${(-k * 38).toFixed(2)}vh) rotate(${(k * 40).toFixed(1)}deg) scale(${(1 - k * 0.35).toFixed(3)})`;
  }
  return {
    old: { tf, shadow: '0 20px 60px rgba(0,0,0,.3)' },
    a: { x: ax, y: ay, face: 1, pose },
    props: burst('k', 'BỐP!', xk + 70 + W * 0.55, F - 95 - H * 0.35, t, 700, 1100),
  };
};

const stomp: Scene = (t, { vw, vh, F }) => {
  const x = vw * 0.5;
  const level = (i: number) => vh * (0.2 + 0.2 * i);
  let ty = lerp(0, level(0), easeOut(seg(t, 0, 350)));
  let y = lerp(-60, level(0), easeIn(seg(t, 150, 500)));
  let pose = 'cheer';
  let props: Prop[] = [];
  for (let i = 0; i < 3; i++) {
    const s = 500 + i * 400;
    if (t >= s) {
      const land = s + 400;
      ty = lerp(level(i), level(i + 1), backOut(seg(t, land, land + 180)));
      y = t < land ? level(i) - bell(t, s, land) * 75 : ty;
      pose = t < land ? 'cheer' : 'stand';
      if (on(t, land, land + 260)) props = burst('r', 'RẦM!', x + 80, ty - 20, t, land, land + 260);
    }
  }
  if (t >= 1700) {
    ty = lerp(level(3), vh * 1.06, easeIn(seg(t, 1700, 2150)));
    y = Math.min(ty, F);
    pose = y >= F - 1 ? 'stand' : 'cheer';
  }
  let px = x;
  if (t >= 2200) {
    px = lerp(x, vw + W * 1.5, easeIn(seg(t, 2200, 2700)));
    pose = 'run';
  }
  return { old: { tf: `translateY(${ty.toFixed(1)}px)`, shadow: '0 -10px 50px rgba(0,0,0,.3)' }, a: { x: px, y, face: 1, pose }, props };
};

// 1. kéo co
const tug: Scene = (t, { vw, F }) => {
  const hy = F - H * 0.5;
  const k = easeOut(seg(t, 0, 400));
  const off = on(t, 400, 1700) ? Math.sin((t - 400) / 170) * 45 * Math.min(1, seg(t, 400, 800)) : 0;
  const win = easeIn(seg(t, 1700, 2300));
  const slideX = off * 1.4 - win * vw * 1.15;
  const knot = { x: vw / 2 + slideX, y: hy };
  const ax = t < 1700 ? lerp(-W, vw * 0.2, k) + off * 0.9 : vw * 0.2 - win * vw * 0.6;
  const a: Pose = { x: ax, y: F, face: t < 1700 ? 1 : -1, pose: t < 400 ? 'run' : t < 1700 ? 'pull' : 'run' };
  let b: Pose;
  if (t < 1700) b = { x: lerp(vw + W, vw * 0.8, k) + off * 0.9, y: F, face: -1, pose: t < 400 ? 'run' : 'pull' };
  else if (t < 1900) b = { x: vw * 0.8 - seg(t, 1700, 1900) * 80, y: F, face: -1, pose: 'run' };
  else if (t < 2400) b = { x: vw * 0.8 - 80, y: F, face: -1, pose: 'fall' };
  else b = { x: lerp(vw * 0.8 - 80, vw + W * 1.5, easeIn(seg(t, 2400, 2900))), y: F, face: 1, pose: 'run' };
  const props: Prop[] = [line('r1', 'rope', a.x + 26 * a.face, hy, knot.x, knot.y)];
  if (t < 1700) props.push(line('r2', 'rope', knot.x, knot.y, b.x - 26, hy));
  props.push({ id: 'kn', type: 'knot', x: knot.x, y: knot.y, w: 26, h: 26 });
  props.push(...burst('h1', 'HỰ!', a.x, F - H - 20, t, 700, 950), ...burst('h2', 'HỰ!', b.x, F - H - 20, t, 1100, 1350), ...burst('h3', 'HỰ!', a.x, F - H - 20, t, 1500, 1750));
  if (on(t, 1950, 2400)) props.push(...stars('st', b.x + 55, F - 22, t));
  return { old: { tf: `translateX(${slideX.toFixed(1)}px)`, shadow: '0 20px 60px rgba(0,0,0,.3)' }, a, b, props };
};

// 2. xé slide
const tear: Scene = (t, { vw, vh, F, R }) => {
  const k = easeIn(seg(t, 900, 1700));
  const inK = easeOut(seg(t, 0, 400));
  const ax = lerp(-W, W * 0.32, inK) - k * vw * 0.65;
  const bx = lerp(vw + W, vw - W * 0.32, inK) + k * vw * 0.65;
  const zig = (side: 'l' | 'r') => {
    const pts: string[] = [];
    for (let j = 0; j <= 10; j++) pts.push(`${50 + (j % 2 ? 2.4 : -2.4)}% ${j * 10}%`);
    return side === 'l' ? `polygon(0 0, ${pts.join(', ')}, 0 100%)` : `polygon(100% 0, ${pts.join(', ')}, 100% 100%)`;
  };
  const shaking = on(t, 400, 900);
  const props: Prop[] = [...burst('x', 'XOẸT!', vw / 2, vh * 0.4, t, 900, 1300), ...bubble('ug', 'Ư… Ư…!', W * 0.6, F - H - 30, t, 450, 900)];
  if (on(t, 900, 1900))
    for (let i = 0; i < 12; i++) {
      const u = seg(t, 900, 1700);
      props.push({ id: `bit${i}`, type: 'bit', x: vw / 2 + (R[i] - 0.5) * 520 * u, y: R[i + 12] * vh - 260 * u + 520 * u * u, w: 14, h: 10, rot: u * 400 * (R[i + 24] - 0.5), op: 1 - u });
    }
  return {
    old: t < 900 ? { tf: shaking ? `translateX(${(Math.sin(t / 22) * 4).toFixed(1)}px) scaleX(${(1 + Math.sin(t / 40) * 0.006).toFixed(4)})` : 'none' } : { op: 0 },
    pieces:
      t >= 900
        ? [
            { src: 'old', clip: zig('l'), tf: `translateX(${(-k * 65).toFixed(2)}vw) rotate(${(-k * 12).toFixed(2)}deg)` },
            { src: 'old', clip: zig('r'), tf: `translateX(${(k * 65).toFixed(2)}vw) rotate(${(k * 12).toFixed(2)}deg)` },
          ]
        : [],
    a: { x: ax, y: F, face: 1, pose: t < 400 ? 'run' : 'pull' },
    b: { x: bx, y: F, face: -1, pose: t < 400 ? 'run' : 'pull' },
    props,
  };
};

// 3. dán lại slide mới
const tape: Scene = (t, { vw, vh, F }) => {
  const fly = easeOut(seg(t, 0, 500));
  const pull = inOut(seg(t, 800, 1400));
  const drop = backOut(seg(t, 1400, 1700));
  const dx0 = lerp(lerp(-60, -9, fly), 0, pull);
  const dy0 = lerp(lerp(10, 4, fly), 0, pull);
  const r0 = lerp(-6, 0, pull);
  const dx2 = lerp(lerp(60, 9, fly), 0, pull);
  const dy2 = lerp(lerp(10, -4, fly), 0, pull);
  const r2 = lerp(5, 0, pull);
  const dy1 = t < 1400 ? lerp(-100, -14, fly) : lerp(-14, 0, drop);
  const r1 = t < 1400 ? 4 : lerp(4, 0, drop);
  const op = t < 2550 ? 1 : 0;
  const pieces: Piece[] = [
    { src: 'new', clip: 'inset(0 66.66% 0 0)', tf: `translate(${dx0}vw, ${dy0}vh) rotate(${r0}deg)`, op },
    { src: 'new', clip: 'inset(0 33.33% 0 33.33%)', tf: `translate(0, ${dy1}vh) rotate(${r1}deg)`, op },
    { src: 'new', clip: 'inset(0 0 0 66.66%)', tf: `translate(${dx2}vw, ${dy2}vh) rotate(${r2}deg)`, op },
  ];
  const enter = easeOut(seg(t, 500, 800));
  const out = easeIn(seg(t, 2300, 2900));
  const jump = on(t, 1700, 2300) ? Math.abs(Math.sin((t - 1700) / 95)) * 24 : 0;
  const ax = t < 800 ? lerp(-W, vw / 3 + (dx0 / 100) * vw + W * 0.28, enter) : lerp(vw / 3 + (dx0 / 100) * vw + W * 0.28, -W * 1.5, out);
  const bx = t < 800 ? lerp(vw + W, (2 * vw) / 3 + (dx2 / 100) * vw - W * 0.28, enter) : lerp((2 * vw) / 3 + (dx2 / 100) * vw - W * 0.28, vw + W * 1.5, out);
  const pose = (pullPose: string) => (t < 800 ? 'run' : t < 1400 ? pullPose : t < 1700 ? 'stand' : t < 2300 ? 'cheer' : 'run');
  const props: Prop[] = [...burst('c', 'CỘP!', vw / 2, vh * 0.62, t, 1600, 1900)];
  const tapes: [number, number, number][] = [
    [vw / 3, vh * 0.3, -35],
    [vw / 3, vh * 0.72, 30],
    [(2 * vw) / 3, vh * 0.3, 35],
    [(2 * vw) / 3, vh * 0.72, -30],
  ];
  tapes.forEach(([x, y, rot], i) => {
    const s = 1700 + i * 120;
    if (on(t, s, 2650)) props.push({ id: `tp${i}`, type: 'tape', x, y, w: 170, h: 38, rot, sc: backOut(seg(t, s, s + 200)), op: 1 - seg(t, 2350, 2650) });
  });
  return {
    old: { filter: `brightness(${lerp(1, 0.5, seg(t, 0, 400)).toFixed(3)})`, op: t < 2550 ? 1 : 0 },
    neu: { op: t < 2550 ? 0 : 1 },
    pieces,
    a: { x: ax, y: F - jump, face: t < 2300 ? -1 : -1, pose: pose('pull') },
    b: { x: bx, y: F - jump, face: 1, pose: pose('pull') },
    props,
  };
};

// 4. cuộn tranh
const roll: Scene = (t, { vw, vh, F }) => {
  const R = inOut(seg(t, 300, 1800)) * vw * 0.96;
  const edge = vw - R;
  const enter = easeOut(seg(t, 0, 300));
  const hand = F - H * 0.86;
  let rx = edge;
  let ry = vh / 2;
  let rh = vh;
  let rot = 0;
  let ax = lerp(vw + W, edge + 70, enter);
  let bx = lerp(vw + W * 2, edge + 190, enter);
  let pose = t < 300 ? 'run' : 'push';
  if (t >= 1800) {
    const u = inOut(seg(t, 1800, 2100));
    const go = easeIn(seg(t, 2100, 2700)) * (vw * 0.3 + 500);
    rx = lerp(edge, 200, u) - go;
    ry = lerp(vh / 2, hand - 22, u);
    rh = lerp(vh, 330, u);
    rot = 90 * u;
    ax = lerp(edge + 70, 200 - 80, u) - go;
    bx = lerp(edge + 190, 200 + 80, u) - go;
    pose = t < 2100 ? 'lift' : 'carry';
  }
  return {
    old: { clip: `inset(0 ${R.toFixed(1)}px 0 0)`, op: t < 1800 ? 1 : 0 },
    a: { x: ax, y: F, face: -1, pose },
    b: { x: bx, y: F, face: -1, pose },
    props: [{ id: 'roll', type: 'roll', x: rx, y: ry, w: 58, h: rh, rot }],
  };
};

// 5. vò giấy ném sọt rác
const crumple: Scene = (t, { vw, vh, F }) => {
  const hand = F - H * 0.86;
  const s1 = inOut(seg(t, 0, 500));
  const s2 = inOut(seg(t, 500, 900));
  const s3 = inOut(seg(t, 900, 1400));
  const ball = 130;
  let sx = lerp(lerp(1, 0.5, s1), ball / vw, s3);
  let sy = lerp(lerp(1, 0.5, s2), ball / vh, s3);
  let rot = 210 * s3;
  let cx = vw / 2;
  let cy = vh / 2;
  const ax = vw / 2 - 160;
  const binX = vw * 0.84;
  const binY = F - 58;
  // A, B đẩy hai mép vào trong
  const edgeL = cx - (vw * sx) / 2;
  const edgeR = cx + (vw * sx) / 2;
  const enter = easeOut(seg(t, 0, 300));
  let a: Pose = { x: lerp(-W, edgeL - W * 0.3, enter), y: F, face: 1, pose: t < 300 ? 'run' : 'push' };
  let b: Pose = { x: lerp(vw + W, edgeR + W * 0.3, enter), y: F, face: -1, pose: t < 300 ? 'run' : 'push' };
  if (t >= 1400) {
    a = { x: ax, y: F, face: 1, pose: 'lift' };
    b = { x: edgeR + W * 0.3 + seg(t, 1400, 1700) * 120, y: F, face: -1, pose: 'stand' };
    const u = inOut(seg(t, 1400, 1650));
    cx = lerp(vw / 2, ax, u);
    cy = lerp(vh / 2, hand - ball / 2, u);
  }
  if (t >= 1800) {
    const u = seg(t, 1800, 2300);
    cx = lerp(ax, binX, u);
    cy = lerp(hand - ball / 2, binY - 20, u) - Math.sin(Math.PI * u) * 260;
    rot = 210 + u * 540;
    a = { x: ax, y: F, face: 1, pose: u < 0.4 ? 'punch' : 'cheer' };
    sx = lerp(ball / vw, 70 / vw, u);
    sy = lerp(ball / vh, 70 / vh, u);
  }
  if (t >= 2500) {
    const u = easeIn(seg(t, 2500, 3000));
    a = { x: lerp(ax, -W * 1.5, u), y: F, face: -1, pose: 'run' };
    b = { ...b, x: lerp(b.x, vw + W * 1.5, u), face: 1, pose: 'run' };
  }
  const props: Prop[] = [];
  if (on(t, 1300, 3000)) props.push({ id: 'bin', type: 'bin', x: binX, y: binY, w: 96, h: 116, sc: backOut(seg(t, 1300, 1550)), rot: on(t, 2300, 2600) ? Math.sin((t - 2300) / 30) * 8 : 0, op: 1 - seg(t, 2700, 3000) });
  props.push(...bubble('v', 'Vào!', binX - 30, F - H - 30, t, 2300, 2800));
  return {
    old: { tf: scaleTo(vw, vh, cx, cy, sx, sy, `rotate(${rot.toFixed(1)}deg)`), radius: `${(50 * s3).toFixed(1)}%`, filter: s3 > 0 ? `contrast(${(1 + s3 * 0.25).toFixed(2)}) saturate(${(1 - s3 * 0.3).toFixed(2)})` : 'none', op: t < 2300 ? 1 : 0, shadow: '0 10px 30px rgba(0,0,0,.3)' },
    a,
    b,
    props,
  };
};

// 6. kéo rèm sân khấu
const curtain: Scene = (t, { vw, vh, F, to }) => {
  const k = t < 1500 ? inOut(seg(t, 0, 900)) : 1 - inOut(seg(t, 1500, 2400));
  const wc = (vw / 2 + 24) * k;
  const closed = on(t, 900, 1500);
  const a: Pose = closed ? { x: vw / 2 - 80, y: F, face: 1, pose: on(t, 1050, 1350) ? 'bow' : 'stand' } : { x: wc + W * 0.2, y: F, face: t < 900 ? 1 : -1, pose: 'run' };
  const b: Pose = closed ? { x: vw / 2 + 80, y: F, face: -1, pose: on(t, 1050, 1350) ? 'bow' : 'stand' } : { x: vw - wc - W * 0.2, y: F, face: t < 900 ? -1 : 1, pose: 'run' };
  return {
    old: { op: t < 900 ? 1 : 0 },
    a,
    b,
    props: [
      { id: 'cl', type: 'curtain', x: wc / 2, y: vh / 2, w: Math.max(1, wc), h: vh },
      { id: 'cr', type: 'curtain', x: vw - wc / 2, y: vh / 2, w: Math.max(1, wc), h: vh },
      ...bubble('cb', to === 31 ? 'Màn cuối!' : 'Mời xem tiếp!', vw / 2, F - H - 34, t, 950, 1450),
    ],
  };
};

// 7. khiêng slide ra, khiêng slide mới vào
const carry: Scene = (t, { vw, vh, F }) => {
  const s = 0.55;
  const hand = F - H * 0.86;
  const wS = vw * s;
  const cyS = hand - (vh * s) / 2;
  const off = vw / 2 + wS / 2 + 160;
  const wob = Math.sin(t / 90) * 3;
  // slide cũ
  const k0 = inOut(seg(t, 0, 400));
  const out = easeIn(seg(t, 400, 1300));
  const oldTf = scaleTo(vw, vh, vw / 2 - out * off, lerp(vh / 2, cyS, k0), lerp(1, s, k0), lerp(1, s, k0), `rotate(${(out > 0 ? wob : 0).toFixed(2)}deg)`);
  // slide mới
  const inn = easeOut(seg(t, 1300, 2200));
  const down = inOut(seg(t, 2200, 2600));
  const ncx = vw / 2 + (1 - inn) * off;
  const ncy = lerp(cyS, vh / 2, down);
  const ns = lerp(s, 1, down);
  const neuTf = scaleTo(vw, vh, ncx, ncy, ns, ns, `rotate(${(inn < 1 ? wob : 0).toFixed(2)}deg)`);
  let a: Pose;
  let b: Pose;
  if (t < 1300) {
    const cx = vw / 2 - out * off;
    a = { x: lerp(-W, cx - wS / 2 + 40, k0), y: F, face: out > 0 ? -1 : 1, pose: t < 400 ? 'run' : 'carry' };
    b = { x: lerp(vw + W, cx + wS / 2 - 40, k0), y: F, face: out > 0 ? -1 : -1, pose: t < 400 ? 'run' : 'carry' };
  } else if (t < 2200) {
    a = { x: ncx - wS / 2 + 40, y: F, face: -1, pose: 'carry' };
    b = { x: ncx + wS / 2 - 40, y: F, face: -1, pose: 'carry' };
  } else {
    const u = easeIn(seg(t, 2300, 2800));
    a = { x: lerp(vw / 2 - wS / 2 + 40, -W * 1.5, u), y: F, face: -1, pose: t < 2300 ? 'lift' : 'run' };
    b = { x: lerp(vw / 2 + wS / 2 - 40, vw + W * 1.5, u), y: F, face: 1, pose: t < 2300 ? 'lift' : 'run' };
  }
  return {
    old: { tf: oldTf, op: t < 1300 ? 1 : 0, shadow: '0 18px 40px rgba(0,0,0,.3)' },
    neu: { tf: neuTf, shadow: t < 2600 ? '0 18px 40px rgba(0,0,0,.3)' : 'none' },
    a,
    b,
    props: bubble('hz', 'Dô ta!', vw * 0.3, F - H - 30, t, 500, 1100),
  };
};

// 8. lật bánh tráng bằng chảo
const pancake: Scene = (t, { vw, vh, F }) => {
  const s = 0.42;
  const enter = easeOut(seg(t, 0, 400));
  const leave = easeIn(seg(t, 1900, 2400));
  const ax = lerp(-W - 260, vw / 2 - 250, enter) - leave * (vw / 2 + 300);
  const panX = ax + 250;
  const panY = F - H * 0.5 - (on(t, 700, 860) ? bell(t, 700, 860) * 34 : 0);
  const inPan = panY - (vh * s) / 2 + 4;
  const k0 = inOut(seg(t, 300, 700));
  let cx = lerp(vw / 2, vw / 2, k0);
  let cy = lerp(vh / 2, inPan, k0);
  let sc = lerp(1, s, k0);
  let rx = 0;
  if (t >= 700) {
    const u = seg(t, 700, 1600);
    cy = inPan - Math.sin(Math.PI * u) * (inPan - vh * 0.22);
    rx = u * 540;
    sc = s;
  }
  const swapped = rx > 270;
  let ns = s;
  let ncx = cx;
  let ncy = cy;
  if (t >= 1600) {
    const u = inOut(seg(t, 1600, 2200));
    ns = lerp(s, 1, u);
    ncx = lerp(vw / 2, vw / 2, u);
    ncy = lerp(inPan, vh / 2, u);
  }
  const persp = (r: number) => `perspective(1400px) rotateX(${r.toFixed(1)}deg)`;
  return {
    old: { tf: scaleTo(vw, vh, cx, cy, sc, sc, persp(rx)), op: swapped ? 0 : 1, shadow: '0 14px 30px rgba(0,0,0,.3)' },
    neu: { tf: t >= 1600 ? scaleTo(vw, vh, ncx, ncy, ns, ns) : scaleTo(vw, vh, cx, cy, s, s, persp(rx - 540)), op: swapped ? 1 : 0, shadow: t < 2200 ? '0 14px 30px rgba(0,0,0,.3)' : 'none' },
    a: { x: ax, y: F, face: leave > 0 ? -1 : 1, pose: enter < 1 || leave > 0 ? 'run' : on(t, 650, 900) ? 'punch' : 'push' },
    props: [{ id: 'pan', type: 'pan', x: panX - 40, y: panY, w: 400, h: 90 }, ...burst('xe', 'XÈO!', panX + 120, panY - 90, t, 1580, 1900)],
  };
};

// 9. lau kính
const wipe: Scene = (t, { vw, vh, F, R }) => {
  const X = inOut(seg(t, 200, 2000)) * vw;
  const props: Prop[] = [{ id: 'sq', type: 'squeegee', x: X, y: vh / 2, w: 26, h: vh }];
  if (t < 2100)
    for (let j = 0; j < 8; j++) props.push({ id: `fm${j}`, type: 'foam', x: X - 14 - (j % 3) * 12, y: ((j * 0.125 + R[j] * 0.1 + t / 4000) % 1) * vh, w: 18 + R[j + 8] * 22, h: 18 + R[j + 8] * 22 });
  props.push(...bubble('sb', 'Sạch bong!', Math.min(vw - 120, X - 40), F - H - 30, t, 1900, 2400));
  const run = easeIn(seg(t, 2000, 2500));
  return {
    old: { clip: `inset(0 0 0 ${X.toFixed(1)}px)`, op: t < 2000 ? 1 : 0 },
    a: { x: Math.max(-W, X - 50) + run * 600, y: F, face: 1, pose: run > 0 ? 'run' : 'lift' },
    props,
  };
};

// 10. kéo khoá kéo
const zipper: Scene = (t, { vw, vh, F }) => {
  const zip = lerp(40, vh + 60, inOut(seg(t, 450, 1700)));
  const w = 9 * seg(t, 450, 1700);
  const open = easeIn(seg(t, 1700, 2250));
  const run = easeIn(seg(t, 1800, 2400));
  let a: Pose;
  if (t < 300) a = { x: lerp(-W, vw / 2, easeOut(seg(t, 0, 300))), y: F, face: 1, pose: 'run' };
  else if (t < 450) a = { x: vw / 2, y: lerp(F, 40 + H * 0.92, easeOut(seg(t, 300, 450))), face: 1, pose: 'lift' };
  else if (t < 1700) a = { x: vw / 2, y: Math.min(zip + H * 0.92, F + 400), face: 1, pose: 'lift' };
  else a = { x: vw / 2 + run * (vw / 2 + 200), y: F, face: 1, pose: 'run' };
  const zipShow = Math.min(zip, vh - 30);
  return {
    old: { op: t < 450 ? 1 : 0 },
    pieces:
      t >= 450
        ? [
            { src: 'old', clip: `polygon(0 0, ${50 - w}% 0, 50% ${zip}px, 50% 100%, 0 100%)`, tf: `translateX(${(-open * 62).toFixed(2)}vw) rotate(${(-open * 10).toFixed(2)}deg)` },
            { src: 'old', clip: `polygon(100% 0, ${50 + w}% 0, 50% ${zip}px, 50% 100%, 100% 100%)`, tf: `translateX(${(open * 62).toFixed(2)}vw) rotate(${(open * 10).toFixed(2)}deg)` },
          ]
        : [],
    a,
    props: t < 1750 ? [{ id: 'zp', type: 'zip', x: vw / 2, y: zipShow, w: 44, h: 68 }, ...bubble('zb', 'Rẹẹẹt!', vw / 2 + 110, Math.min(zipShow, vh - 200), t, 600, 1400)] : [],
  };
};

// 11. thổi bay
const blow: Scene = (t, { vw, F, R }) => {
  const enter = easeOut(seg(t, 0, 400));
  const run = easeIn(seg(t, 2000, 2500));
  const ax = lerp(-W, vw * 0.12, enter) + run * (vw + 300);
  const pose = t < 400 ? 'run' : t < 900 ? 'inhale' : t < 1400 ? 'blow' : t < 2000 ? 'cheer' : 'run';
  const props: Prop[] = [...burst('ph', 'PHÙ!', ax + 110, F - H * 0.8, t, 900, 1300)];
  if (on(t, 900, 1600))
    for (let j = 0; j < 4; j++) {
      const u = seg(t, 900 + j * 80, 1500 + j * 80);
      props.push({ id: `wd${j}`, type: 'wind', x: ax + 80 + u * vw * 0.8, y: F - H * 0.8 - 60 + j * 40, w: 160, h: 4, op: Math.sin(Math.PI * u) });
    }
  return {
    old: { op: t < 900 ? 1 : 0 },
    pieces:
      t >= 900
        ? grid('old', (c, _r, i) => {
            const s = 900 + c * 110 + R[i] * 80;
            const u = easeIn(seg(t, s, s + 800));
            return { tf: `translate(${(u * (45 + R[i + 12] * 40)).toFixed(2)}vw, ${(u * (R[i + 24] - 0.5) * 50).toFixed(2)}vh) rotate(${(u * (R[i + 36] - 0.5) * 400).toFixed(1)}deg) scale(${(1 - u * 0.6).toFixed(3)})`, op: 1 - u };
          })
        : [],
    a: { x: ax, y: F, face: 1, pose },
    props,
  };
};

// 12. cắt bằng kéo
const scissors: Scene = (t, { vw, vh, F }) => {
  const u = inOut(seg(t, 200, 1500));
  const px = lerp(-40, vw + 40, u);
  const py = lerp(-40, vh + 40, u);
  const ang = (Math.atan2(vh, vw) * 180) / Math.PI;
  const l = easeIn(seg(t, 1500, 2200));
  const r = easeIn(seg(t, 1650, 2350));
  const run = easeIn(seg(t, 2100, 2600));
  const ax = t < 1500 ? Math.max(-W, px - 60) : Math.min(vw - 160, px - 60) + run * 500;
  const props: Prop[] = [];
  if (t < 1500) props.push(line('ct', 'cut', 0, 0, px, py, 4), { id: 'sc', type: 'scissors', x: px, y: py, w: 190, h: 110, rot: ang });
  props.push(...burst('xo', 'XOẸT!', vw / 2, vh * 0.45, t, 1500, 1850));
  return {
    old: { op: t < 1500 ? 1 : 0 },
    pieces:
      t >= 1500
        ? [
            { src: 'old', clip: 'polygon(0 0, 100% 100%, 0 100%)', tf: `translate(${(-l * 15).toFixed(2)}vw, ${(l * 110).toFixed(2)}vh) rotate(${(-l * 18).toFixed(2)}deg)` },
            { src: 'old', clip: 'polygon(0 0, 100% 0, 100% 100%)', tf: `translate(${(r * 15).toFixed(2)}vw, ${(r * 110).toFixed(2)}vh) rotate(${(r * 22).toFixed(2)}deg)` },
          ]
        : [],
    a: { x: ax, y: F, face: 1, pose: on(t, 1600, 2100) ? 'cheer' : 'run' },
    props,
  };
};

// 13. quạt than — khói phủ kín
const smoke: Scene = (t, { vw, vh, F, R }) => {
  const enter = easeOut(seg(t, 0, 400));
  const out = easeIn(seg(t, 2200, 2700));
  const ax = lerp(-W, vw / 2 - 230, enter) - out * (vw / 2 + 200);
  const bx = lerp(vw + W, vw / 2 + 230, enter) + out * (vw / 2 + 200);
  const fade = 1 - seg(t, 1700, 2600);
  const props: Prop[] = [{ id: 'gr', type: 'grill', x: vw / 2, y: F - 34, w: 240, h: 76, op: 1 - seg(t, 2300, 2700) }];
  for (let j = 0; j < 16; j++) {
    const s = 150 + j * 70;
    const u = easeOut(seg(t, s, s + 1300));
    if (t < s) continue;
    const size = lerp(60, 700 + R[j] * 450, u);
    props.push({ id: `pf${j}`, type: 'puff', x: lerp(vw / 2 + (R[j + 16] - 0.5) * 120, R[j + 32] * vw, u), y: lerp(F - 60, R[j + 48] * vh * 0.9, u) - seg(t, 1700, 2600) * 200, w: size, h: size, op: Math.min(0.95, u * 2) * fade });
  }
  if (t < 2200) {
    props.push({ id: 'fa', type: 'fan', x: ax + 52, y: F - H * 0.56, w: 50, h: 50, rot: Math.sin(t / 60) * 28 });
    props.push({ id: 'fb', type: 'fan', x: bx - 52, y: F - H * 0.56, w: 50, h: 50, rot: -Math.sin(t / 60) * 28 });
  }
  props.push(...bubble('sm', 'Thơm quá!', bx, F - H - 30, t, 500, 1200));
  return {
    old: { op: t < 1500 ? 1 : 0 },
    a: { x: ax, y: F, face: out > 0 ? -1 : 1, pose: enter < 1 || out > 0 ? 'run' : 'fan' },
    b: { x: bx, y: F, face: out > 0 ? 1 : -1, pose: enter < 1 || out > 0 ? 'run' : 'fan' },
    props,
  };
};

// 14. chuyền đĩa cơm
const plate: Scene = (t, { vw, vh, F }) => {
  const hand = F - H * 0.86;
  const D = 220;
  const xa = vw * 0.22;
  const enter = easeOut(seg(t, 0, 400));
  const bRun = easeIn(seg(t, 1800, 2500));
  const bx = lerp(vw + W, vw * 0.78, enter) + bRun * (vw * 0.22 + 300);
  const aOut = easeIn(seg(t, 2000, 2500));
  const ax = lerp(-W, xa, enter) - aOut * (xa + 300);
  const k = inOut(seg(t, 0, 700));
  let cx = lerp(vw / 2, xa, k);
  let cy = lerp(vh / 2, hand - D / 2, k);
  let rot = 0;
  if (t >= 700) cx = xa - bell(t, 700, 1000) * 20;
  if (t >= 1000) {
    const u = seg(t, 1000, 1700);
    cx = lerp(xa, vw * 0.78, u);
    cy = hand - D / 2 - Math.sin(Math.PI * u) * 220;
    rot = u * 720;
  }
  if (t >= 1700) {
    cx = bx;
    cy = hand - D / 2;
    rot = 0;
  }
  const sx = lerp(1, D / vw, k);
  const sy = lerp(1, D / vh, k);
  return {
    old: { tf: scaleTo(vw, vh, cx, cy, sx, sy, `rotate(${rot.toFixed(1)}deg)`), radius: `${(50 * k).toFixed(1)}%`, shadow: k > 0.5 ? '0 0 0 14px #fff, 0 0 0 17px #165D3A, 0 12px 26px 17px rgba(0,0,0,.25)' : 'none' },
    a: { x: ax, y: F, face: aOut > 0 ? -1 : 1, pose: t < 400 ? 'run' : t < 1000 ? 'lift' : t < 1300 ? 'punch' : aOut > 0 ? 'run' : 'cheer' },
    b: { x: bx, y: F, face: 1 as const, pose: t < 400 ? 'run' : t < 1500 ? 'stand' : t < 1800 ? 'lift' : 'carry' },
    props: [...bubble('cv', 'Đỡ nè!', xa, F - H - 30, t, 900, 1400), ...bubble('bt', 'Bắt được!', vw * 0.78, F - H - 30, t, 1700, 2150)],
  };
};

// 15. đánh nhau trong đám bụi
const dust: Scene = (t, { vw, vh, F, R }) => {
  const hand = F - H * 0.86;
  const enter = easeOut(seg(t, 0, 500));
  const inCloud = on(t, 500, 2000);
  const ax0 = vw / 2 - 60;
  const run = easeIn(seg(t, 2200, 2900));
  const ax = t < 500 ? lerp(-W, ax0, enter) : ax0 - run * (ax0 + 400);
  const s = 0.22;
  const k = inOut(seg(t, 2000, 2300));
  const words = ['BỐP!', 'CHÁT!', 'HỰ!', 'BỐP!', 'ÁI!', 'CHÁT!'];
  const props: Prop[] = [];
  if (on(t, 450, 2250)) props.push({ id: 'cloud', type: 'cloud', x: vw / 2, y: F - 120, w: 460, h: 320, sc: t < 2000 ? backOut(seg(t, 450, 650)) * (1 + Math.sin(t / 60) * 0.05) : 1 - seg(t, 2000, 2250) });
  words.forEach((w, i) => props.push(...burst(`w${i}`, w, vw / 2 + (R[i] - 0.5) * 420, F - 120 + (R[i + 6] - 0.5) * 260, t, 600 + i * 230, 850 + i * 230)));
  if (inCloud)
    for (let i = 0; i < 3; i++) {
      const u = ((t - 500) / 600 + i / 3) % 1;
      props.push({ id: `lm${i}`, type: 'limb', x: vw / 2 + Math.cos(i * 2.1 + t / 90) * 170 * u, y: F - 130 + Math.sin(i * 1.7 + t / 70) * 110 * u, w: 46, h: 10, rot: t / 3 + i * 60, op: 1 - u });
    }
  if (on(t, 2100, 2650)) props.push(...stars('ds', vw / 2 + 60 + 55, F - 22, t));
  const shake = inCloud ? `translateX(${(Math.sin(t / 28) * 6).toFixed(1)}px)` : 'none';
  return {
    old: { tf: t < 2000 ? shake : scaleTo(vw, vh, lerp(vw / 2, ax, k), lerp(vh / 2, hand - (vh * s) / 2, k), lerp(1, s, k)), shadow: '0 14px 30px rgba(0,0,0,.3)' },
    a: { x: ax, y: F, face: t < 2000 ? 1 : -1, pose: t < 500 ? 'run' : t < 2200 ? 'lift' : 'carry', op: inCloud ? 0 : 1 },
    b: t < 2000 ? { x: lerp(vw + W, vw / 2 + 60, enter), y: F, face: -1, pose: 'run', op: inCloud ? 0 : 1 } : { x: t < 2600 ? vw / 2 + 60 : lerp(vw / 2 + 60, vw + W * 1.5, easeIn(seg(t, 2600, 3000))), y: F, face: 1, pose: t < 2600 ? 'fall' : 'run' },
    props,
  };
};

// 16. đối kháng có thanh máu
const hp: Scene = (t, { vw, vh, F, R, from, to }) => {
  const xa0 = vw * 0.36;
  const xb0 = vw * 0.64;
  const enter = easeOut(seg(t, 0, 500));
  const hits = [
    { t: 1000, by: 'b', dmgA: 30 },
    { t: 1400, by: 'a', dmgB: 20 },
    { t: 1800, by: 'b', dmgA: 25 },
    { t: 2200, by: 'b', dmgA: 25 },
  ];
  let hpA = 100;
  let hpB = 100;
  let ax = lerp(-W, xa0, enter);
  let bx = lerp(vw + W, xb0, enter);
  let aPose = t < 500 ? 'run' : 'stand';
  let bPose = t < 500 ? 'run' : 'stand';
  let shake = 0;
  const props: Prop[] = [];
  hits.forEach((h, i) => {
    const p = seg(t, h.t, h.t + 300);
    if (h.dmgA) hpA -= h.dmgA * p;
    if (h.dmgB) hpB -= h.dmgB * p;
    if (on(t, h.t - 150, h.t + 150)) {
      const lunge = Math.sin(Math.PI * seg(t, h.t - 150, h.t + 150)) * 40;
      if (h.by === 'b') {
        bx -= lunge;
        bPose = 'punch';
      } else {
        ax += lunge;
        aPose = 'punch';
      }
    }
    if (on(t, h.t, h.t + 260)) {
      const kb = Math.sin(Math.PI * seg(t, h.t, h.t + 260)) * 26;
      if (h.by === 'b') {
        ax -= kb;
        aPose = 'pull';
        shake = Math.sin((t - h.t) / 14) * 12 * (1 - seg(t, h.t, h.t + 200));
      } else {
        bx += kb;
        bPose = 'pull';
      }
    }
    props.push(...burst(`hb${i}`, i === 1 ? 'CHÁT!' : 'BỐP!', (ax + bx) / 2, F - H * 0.62, t, h.t, h.t + 260));
  });
  // đòn kết liễu
  let ay = F;
  let by = F;
  if (t >= 2450) {
    const j = bell(t, 2450, 2750);
    by = F - j * 70;
    bx = xb0 - seg(t, 2450, 2650) * 50;
    bPose = on(t, 2500, 2750) ? 'kick' : 'cheer';
  }
  if (t >= 2600) {
    hpA -= hpA * seg(t, 2600, 2800);
    const u = easeOut(seg(t, 2600, 3000));
    ax = xa0 - u * vw * 0.3;
    ay = F - Math.sin(Math.PI * u) * 120;
    aPose = 'fall';
  }
  const fadeAll = 1 - seg(t, 3300, 3700);
  const drop = easeOut(seg(t, 0, 400));
  const barY = lerp(-80, 104, drop);
  props.push(
    { id: 'hpa', type: 'hp', x: vw * 0.27, y: barY, w: vw * 0.38, h: 56, val: Math.max(0, hpA), text: `SLIDE ${from + 1}`, op: fadeAll },
    { id: 'hpb', type: 'hp hp-r', x: vw * 0.73, y: barY, w: vw * 0.38, h: 56, val: Math.max(0, hpB), text: `SLIDE ${to + 1}`, op: fadeAll },
    { id: 'vs', type: 'vs', x: vw / 2, y: barY, w: 70, h: 50, op: fadeAll, text: 'VS' },
  );
  if (on(t, 400, 950)) props.push({ id: 'fight', type: 'big', x: vw / 2, y: vh * 0.36, text: t < 700 ? 'ROUND 1' : 'FIGHT!', sc: backOut(seg(t, t < 700 ? 400 : 700, (t < 700 ? 400 : 700) + 200)) });
  if (on(t, 2650, 3400)) props.push({ id: 'ko', type: 'big ko', x: vw / 2, y: vh * 0.36, text: 'K.O.!', sc: backOut(seg(t, 2650, 2900)) });
  if (on(t, 2900, 3400)) props.push(...stars('ks', ax + 55, F - 22, t));
  return {
    old: { tf: `translateX(${shake.toFixed(1)}px)`, op: t < 2650 ? 1 : 0 },
    pieces:
      t >= 2650
        ? grid('old', (c, r, i) => {
            const u = easeOut(seg(t, 2650, 3350));
            const dx = (c - 1.5) / 1.5;
            const dy = (r - 1) / 1;
            return { tf: `translate(${(u * dx * (40 + R[i] * 20)).toFixed(2)}vw, ${(u * (dy * 40 + 30 * u)).toFixed(2)}vh) rotate(${(u * (R[i + 12] - 0.5) * 300).toFixed(1)}deg) scale(${(1 - u * 0.4).toFixed(3)})`, op: 1 - seg(t, 2900, 3350) };
          })
        : [],
    a: { x: ax, y: ay, face: 1, pose: aPose, op: fadeAll },
    b: { x: bx, y: by, face: -1, pose: t >= 2800 && t < 3300 ? 'cheer' : bPose, op: fadeAll },
    props,
  };
};

// 17. ném đồ ăn
const food: Scene = (t, { vw, vh, F }) => {
  const xa = vw * 0.14;
  const xb = vw * 0.86;
  const enter = easeOut(seg(t, 0, 300));
  const out = easeIn(seg(t, 2700, 3100));
  const ax = lerp(-W, xa, enter) - out * (xa + 300);
  const bx = lerp(vw + W, xb, enter) + out * (vw - xb + 300);
  const throws: { t: number; by: 'a' | 'b'; f: string; tx: number; ty: number }[] = [
    { t: 300, by: 'a', f: 'egg', tx: 0.46, ty: 0.34 },
    { t: 650, by: 'b', f: 'rib', tx: 0.6, ty: 0.52 },
    { t: 1000, by: 'a', f: 'tomato', tx: 0.34, ty: 0.6 },
    { t: 1350, by: 'b', f: 'egg', tx: 0.56, ty: 0.26 },
    { t: 1700, by: 'a', f: 'rib', tx: 0.42, ty: 0.46 },
    { t: 2050, by: 'b', f: 'plate', tx: 0.5, ty: 0.42 },
  ];
  const fall = easeIn(seg(t, 2450, 2900));
  const props: Prop[] = [];
  let aPose = t < 300 ? 'run' : 'stand';
  let bPose = t < 300 ? 'run' : 'stand';
  throws.forEach((th, i) => {
    const x0 = th.by === 'a' ? xa + 30 : xb - 30;
    const y0 = F - H * 0.8;
    const x1 = th.tx * vw;
    const y1 = th.ty * vh;
    const dur = th.f === 'plate' ? 400 : 420;
    if (on(t, th.t, th.t + 200)) {
      if (th.by === 'a') aPose = 'punch';
      else bPose = 'punch';
    }
    if (on(t, th.t, th.t + dur)) {
      const u = seg(t, th.t, th.t + dur);
      props.push({ id: `fd${i}`, type: `food food-${th.f}`, x: lerp(x0, x1, u), y: lerp(y0, y1, u) - Math.sin(Math.PI * u) * 180, w: th.f === 'plate' ? 90 : 46, h: th.f === 'plate' ? 90 : 46, rot: u * 720 });
    }
    if (t >= th.t + dur && th.f !== 'plate') props.push({ id: `sp${i}`, type: `splat splat-${th.f}`, x: x1, y: y1 + fall * vh * 0.5, w: 120, h: 120, sc: backOut(seg(t, th.t + dur, th.t + dur + 150)) * (1 - fall * 0.6), op: 1 - fall });
    const bt = th.f === 'plate' ? 'XOẢNG!' : 'BẸP!';
    props.push(...burst(`bb${i}`, bt, x1 + 40, y1 - 50, t, th.t + dur, th.t + dur + 260));
  });
  if (t >= 2600) {
    aPose = out > 0 ? 'run' : 'cheer';
    bPose = out > 0 ? 'run' : 'cheer';
  }
  return {
    old: { tf: `perspective(1200px) rotateX(${(fall * 88).toFixed(1)}deg)`, origin: '50% 100%', op: 1 - fall, shadow: '0 20px 60px rgba(0,0,0,.3)' },
    a: { x: ax, y: F, face: out > 0 ? -1 : 1, pose: aPose },
    b: { x: bx, y: F, face: out > 0 ? 1 : -1, pose: bPose },
    props,
  };
};

const SCENES: Record<CharKind, Scene> = {
  'shove-left': shove(true),
  'shove-right': shove(false),
  lift,
  kick,
  stomp,
  tug,
  tear,
  tape,
  roll,
  crumple,
  curtain,
  carry,
  pancake,
  wipe,
  zipper,
  blow,
  scissors,
  smoke,
  plate,
  dust,
  hp,
  food,
};

// ---------------------------------------------------------------- đồ vật (HTML tĩnh, không chứa dữ liệu người dùng)
const PROP_HTML: Record<string, string> = {
  burst: '<span class="t"></span>',
  bubble: '<span class="t"></span>',
  big: '<span class="t"></span>',
  vs: '<span class="t"></span>',
  hp: '<span class="t"></span><b><i></i></b>',
  bin: '<svg viewBox="0 0 96 116"><path d="M10 26 L18 112 L78 112 L86 26 Z" fill="#6f927d" stroke="#165D3A" stroke-width="4"/><path d="M4 16 H92 V28 H4 Z" fill="#165D3A"/><path d="M36 8 H60 V16 H36 Z" fill="#165D3A"/><path d="M34 40 L38 100 M48 40 V100 M62 40 L58 100" stroke="#165D3A" stroke-width="4" opacity=".5"/></svg>',
  pan: '<svg viewBox="0 0 400 90"><path d="M0 46 H170" stroke="#3b2a1e" stroke-width="16" stroke-linecap="round"/><ellipse cx="290" cy="46" rx="108" ry="30" fill="#2b2b2b" stroke="#111" stroke-width="5"/><ellipse cx="290" cy="40" rx="92" ry="20" fill="#444"/></svg>',
  scissors:
    '<svg viewBox="0 0 190 110"><g class="bl a"><path d="M95 55 L188 46 L95 62 Z" fill="#cfd8dc" stroke="#37474f" stroke-width="3"/><circle cx="40" cy="30" r="24" fill="none" stroke="#ED7843" stroke-width="10"/><path d="M58 42 L95 55" stroke="#ED7843" stroke-width="10"/></g><g class="bl b"><path d="M95 55 L188 64 L95 48 Z" fill="#b0bec5" stroke="#37474f" stroke-width="3"/><circle cx="40" cy="80" r="24" fill="none" stroke="#ED7843" stroke-width="10"/><path d="M58 68 L95 55" stroke="#ED7843" stroke-width="10"/></g><circle cx="95" cy="55" r="6" fill="#37474f"/></svg>',
  zip: '<svg viewBox="0 0 44 68"><rect x="8" y="0" width="28" height="22" rx="4" fill="#cfd8dc" stroke="#37474f" stroke-width="3"/><path d="M14 22 L12 60 Q22 70 32 60 L30 22" fill="#ED7843" stroke="#37474f" stroke-width="3"/><circle cx="22" cy="54" r="5" fill="#FFFAEE" stroke="#37474f" stroke-width="2"/></svg>',
  grill:
    '<svg viewBox="0 0 240 76"><rect x="10" y="10" width="220" height="36" rx="6" fill="#2b2b2b" stroke="#111" stroke-width="4"/><g fill="#ff7a2f"><circle cx="40" cy="28" r="9"/><circle cx="80" cy="30" r="8"/><circle cx="120" cy="26" r="10"/><circle cx="160" cy="30" r="8"/><circle cx="200" cy="28" r="9"/></g><path d="M20 12 V46 M60 12 V46 M100 12 V46 M140 12 V46 M180 12 V46 M220 12 V46" stroke="#777" stroke-width="3"/><path d="M40 46 L30 76 M200 46 L210 76" stroke="#2b2b2b" stroke-width="6"/></svg>',
  fan: '<svg viewBox="0 0 50 50"><path d="M25 48 L4 10 Q25 -4 46 10 Z" fill="#E9D59A" stroke="#165D3A" stroke-width="2.5"/><path d="M25 48 L15 6 M25 48 L25 3 M25 48 L35 6" stroke="#165D3A" stroke-width="1.5"/></svg>',
  'food-egg': '<svg viewBox="0 0 46 46"><path d="M8 24 Q4 8 22 6 Q42 4 40 22 Q42 40 22 40 Q4 42 8 24Z" fill="#fff" stroke="#165D3A" stroke-width="2"/><circle cx="23" cy="23" r="8" fill="#f2b632"/></svg>',
  'food-rib': '<svg viewBox="0 0 46 46"><path d="M6 28 Q4 12 24 10 Q44 10 40 26 Q36 38 20 38 Q8 38 6 28Z" fill="#8a3b1d" stroke="#4a1d0c" stroke-width="2"/><path d="M14 22 L32 18 M14 30 L32 26" stroke="#c9692f" stroke-width="3"/></svg>',
  'food-tomato': '<svg viewBox="0 0 46 46"><circle cx="23" cy="23" r="18" fill="#e5533d" stroke="#8c2a1c" stroke-width="2"/><circle cx="23" cy="23" r="11" fill="#f08a76"/><path d="M23 12 V34 M12 23 H34" stroke="#e5533d" stroke-width="2"/></svg>',
  'food-plate': '<svg viewBox="0 0 90 90"><circle cx="45" cy="45" r="42" fill="#fff" stroke="#165D3A" stroke-width="3"/><circle cx="40" cy="44" r="18" fill="#fffaf0" stroke="#ccc"/><path d="M52 34 Q70 30 72 44 Q70 56 54 54Z" fill="#8a3b1d"/><circle cx="30" cy="62" r="7" fill="#fff" stroke="#ddd"/><circle cx="30" cy="62" r="3.5" fill="#f2b632"/></svg>',
};

export default function CharTransition({ kind, fromIndex, toIndex }: { kind: CharKind; fromIndex: number; toIndex: number }) {
  const ra = useRef<HTMLDivElement>(null);
  const rb = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const propLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bands = document.querySelectorAll<HTMLElement>('.deck > .band');
    const oldEl = bands[fromIndex];
    const newEl = bands[toIndex];
    const a = ra.current;
    const b = rb.current;
    const pl = layer.current;
    const pp = propLayer.current;
    if (!oldEl || !newEl || !a || !b || !pl || !pp) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const ctx: Ctx = { vw, vh, F: vh - 26, R: Array.from({ length: 80 }, () => Math.random()), from: fromIndex, to: toIndex };
    const scene = SCENES[kind];
    const total = CHAR_TOTAL[kind];

    const fxKf = (fx: SlideFx, z: number) => ({
      opacity: fx.op ?? 1,
      visibility: 'visible',
      zIndex: z,
      transform: fx.tf ?? 'none',
      clipPath: fx.clip ?? 'none',
      borderRadius: fx.radius ?? '0px',
      filter: fx.filter ?? 'none',
      transformOrigin: fx.origin ?? '50% 50%',
      boxShadow: fx.shadow ?? 'none',
    });
    // 2 keyframe giống nhau = giữ nguyên giá trị (1 keyframe sẽ bị nội suy từ giá trị gốc)
    const oldAnim = oldEl.animate([fxKf({}, 3), fxKf({}, 3)], { duration: total + 1000, fill: 'forwards' });
    let newAnim: Animation | null = null;

    // bản sao slide (cho xé / khoá kéo / vỡ vụn / dán)
    const clones: HTMLElement[] = [];
    const makeClone = (src: 'old' | 'new') => {
      const el = (src === 'old' ? oldEl : newEl).cloneNode(true) as HTMLElement;
      el.removeAttribute('id');
      el.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
      el.classList.remove('leaving');
      if (src === 'old') el.classList.remove('active');
      else el.classList.add('active');
      el.setAttribute('aria-hidden', 'true');
      el.style.cssText = 'position:absolute;inset:0;visibility:visible;opacity:1;transition:none;animation:none;z-index:auto;pointer-events:none;will-change:transform,clip-path';
      pl.appendChild(el);
      return el;
    };

    const props = new Map<string, HTMLElement>();
    const getProp = (p: Prop) => {
      let el = props.get(p.id);
      if (!el) {
        el = document.createElement('div');
        el.className = `cp ${p.type.split(' ').map((c) => `cp-${c}`).join(' ')}`;
        // mẫu HTML tĩnh: ưu tiên class cụ thể nhất (vd "food food-egg" → food-egg)
        el.innerHTML = p.type.split(' ').reverse().map((c) => PROP_HTML[c]).find(Boolean) ?? '';
        pp.appendChild(el);
        props.set(p.id, el);
      }
      return el;
    };

    const put = (el: HTMLElement, p: Pose | undefined) => {
      if (!p) {
        el.style.display = 'none';
        return;
      }
      el.style.display = '';
      el.style.opacity = String(p.op ?? 1);
      el.style.transform = `translate(${(p.x - W / 2).toFixed(1)}px, ${(p.y - H).toFixed(1)}px)`;
      const f = el.querySelector<HTMLElement>('.yr-flip');
      if (f) f.style.transform = p.face < 0 ? 'scaleX(-1)' : 'none';
      el.className = `yy-runner show shove-runner ${el === a ? 'pusher' : 'chaser'} ${p.pose}`;
    };

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(now - t0, total);
      const fr = scene(t, ctx);
      const ok = fxKf(fr.old, 3);
      (oldAnim.effect as KeyframeEffect).setKeyframes([ok, ok]);
      if (fr.neu) {
        const nk = fxKf(fr.neu, 2);
        if (!newAnim) newAnim = newEl.animate([nk, nk], { duration: total + 1000, fill: 'forwards' });
        else (newAnim.effect as KeyframeEffect).setKeyframes([nk, nk]);
      }
      const pcs = fr.pieces ?? [];
      pcs.forEach((pc, i) => {
        if (!clones[i]) clones[i] = makeClone(pc.src);
        const el = clones[i];
        el.style.display = '';
        el.style.clipPath = pc.clip;
        el.style.transform = pc.tf;
        el.style.opacity = String(pc.op ?? 1);
      });
      for (let i = pcs.length; i < clones.length; i++) clones[i].style.display = 'none';
      put(a, fr.a);
      put(b, fr.b);
      const seen = new Set<string>();
      (fr.props ?? []).forEach((p) => {
        seen.add(p.id);
        const el = getProp(p);
        el.style.display = '';
        el.style.opacity = String(p.op ?? 1);
        const isLine = /\b(rope|cut)\b/.test(p.type);
        if (p.w !== undefined) el.style.width = `${p.w}px`;
        if (p.h !== undefined) el.style.height = `${p.h}px`;
        const w = p.w ?? 0;
        const h = p.h ?? 0;
        el.style.transform = isLine
          ? `translate(${p.x.toFixed(1)}px, ${(p.y - h / 2).toFixed(1)}px) rotate(${(p.rot ?? 0).toFixed(2)}deg)`
          : `translate(${(p.x - w / 2).toFixed(1)}px, ${(p.y - h / 2).toFixed(1)}px) translate(${w ? 0 : -50}%, ${h ? 0 : -50}%) rotate(${(p.rot ?? 0).toFixed(2)}deg) scale(${(p.sc ?? 1).toFixed(3)})`;
        if (p.text !== undefined) {
          const tEl = el.querySelector<HTMLElement>('.t');
          if (tEl && tEl.textContent !== p.text) tEl.textContent = p.text;
        }
        if (p.val !== undefined) el.style.setProperty('--v', `${p.val.toFixed(1)}%`);
      });
      props.forEach((el, id) => {
        if (!seen.has(id)) el.style.display = 'none';
      });
      if (now - t0 < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      oldAnim.cancel();
      newAnim?.cancel();
      clones.forEach((c) => c.remove());
      props.forEach((p) => p.remove());
    };
  }, [kind, fromIndex, toIndex]);

  return (
    <div className="shove ctx" aria-hidden="true">
      <div className="ctx-pieces" ref={layer} />
      <div className="yy-runner show shove-runner pusher" ref={ra}>
        <RunnerFigure width={W} height={H} cargo={null} />
      </div>
      <div className="yy-runner show shove-runner chaser" ref={rb}>
        <RunnerFigure width={W} height={H} cargo={null} />
      </div>
      <div className="ctx-props" ref={propLayer} />
    </div>
  );
}
