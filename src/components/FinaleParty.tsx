import { useEffect, useRef } from 'react';
import { useSlideActive } from './DeckContext';
import RunnerFigure from './RunnerFigure';

/**
 * Slide 32 (Thank you!) — màn kịch "quán vỉa hè bị công an dí":
 *  1. Hai người đội nón lá chạy xuống từ mép trên: một người gỡ chip tên người nói (góc trên trái),
 *     một người nhấc thanh điều khiển (góc dưới phải), vác về đặt xuống đất làm ghế dài rồi ngồi lên.
 *  2. Mười hai người khác tự vác ghế nhựa trên đầu chạy vào, bày ghế hai bên slide rồi ngồi đung đưa chân.
 *  3. Công an thổi còi chạy tới → ai nấy bật dậy, giơ ghế lên đầu, chạy tới đỡ chữ / ảnh / THANK YOU!
 *     lên trên ghế rồi chạy tán loạn khỏi màn hình. Hai người kia vác luôn "ghế" của mình (chip tên,
 *     thanh điều khiển). Không bỏ lại cái ghế nào.
 *  4. Slide trống trơn; công an đứng ngơ ngác ("Huh? Where did everyone go?!") rồi bỏ đi.
 * Rời slide thì mọi thứ trở lại như cũ.
 */

const W = 70; // người bày ghế
const H = 109;
const UW = 84; // 2 người gỡ giao diện
const UH = 131;
const PW = 104; // công an
const PH = 162;
const SW = 56; // ghế nhựa
const SH = 52;
const N = 12; // số ghế = số người ngồi ghế

const T_UI = 900; // gỡ chip + thanh điều khiển
const T_STOOL = 2000; // vác ghế vào
const T_CHASE = 7600; // công an tới
const SPEED = 820; // px/giây khi chạy tới món đồ

const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const easeIn = (t: number) => t * t;
const inOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const bell = (t: number, a: number, b: number) => Math.sin(Math.PI * seg(t, a, b));
const bounce = (t: number) => {
  if (t < 0.7) return (t / 0.7) * (t / 0.7);
  return 1 - Math.sin(Math.PI * ((t - 0.7) / 0.3)) * 0.12;
};
const HANDS = 0.85; // tay giơ cao = 85% chiều cao người
const HIP = 0.34; // hông cách chân 34% chiều cao người

interface Load {
  el: HTMLElement;
  at: number[]; // vị trí ngang của từng người vác (tỉ lệ bề rộng món đồ)
  who: number[]; // chỉ số người ngồi ghế
  delay: number;
}
type Box = { l: number; r: number; t: number; b: number; cx: number; w: number; h: number };

export default function FinaleParty() {
  const active = useSlideActive();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const band = el?.closest('.band') as HTMLElement | null;
    if (!el || !band || !active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 640px)').matches) return;

    const people = Array.from(el.querySelectorAll<HTMLElement>('.fp-sit'));
    const stools = Array.from(el.querySelectorAll<HTMLElement>('.fp-stool'));
    const uiGuys = Array.from(el.querySelectorAll<HTMLElement>('.fp-ui'));
    const cops = Array.from(el.querySelectorAll<HTMLElement>('.fp-cop'));
    const bubble = el.querySelector<HTMLElement>('.fp-bubble');
    const tweet = el.querySelector<HTMLElement>('.fp-tweet');
    const q = (s: string) => band.querySelector<HTMLElement>(s);
    const uiEls = [document.querySelector<HTMLElement>('.who'), document.querySelector<HTMLElement>('.controls')];
    const photos = Array.from(band.querySelectorAll<HTMLElement>('.trio-photos .ph'));
    const chips = Array.from(band.querySelectorAll<HTMLElement>('.chips .chip'));
    if (!bubble || !tweet) return;

    // toạ độ gốc của slide KHÔNG tính transform (lúc mới vào slide đang có hiệu ứng zoom/trượt)
    const deckR = (band.parentElement ?? band).getBoundingClientRect();
    const ox = deckR.left + band.offsetLeft;
    const oy = deckR.top + band.offsetTop;
    const vw = band.clientWidth;
    const vh = band.clientHeight;
    const floor = vh - 16;
    const rel = (r: DOMRect): Box => ({ l: r.left - ox, r: r.right - ox, t: r.top - oy, b: r.bottom - oy, cx: (r.left + r.right) / 2 - ox, w: r.width, h: r.height });

    // món đồ trên slide → ai vác (12 người ngồi ghế)
    const loads: Load[] = [];
    const add = (node: HTMLElement | null | undefined, at: number[], who: number[], delay: number) => {
      if (node) loads.push({ el: node, at, who, delay });
    };
    add(q('.lead'), [0.22, 0.78], [0, 6], 520);
    chips.forEach((ch, i) => add(ch, [0.5], [[1, 7, 2][i]], [0, 330, 150][i]));
    add(q('.recall'), [0.5], [8], 240);
    photos.forEach((p, i) => add(p, [0.5], [[3, 9, 4][i]], [260, 0, 420][i]));
    add(q('h2'), [0.25, 0.75], [5, 10], 600);
    add(q('.qa'), [0.5], [11], 820);
    const job = new Map<number, { load: Load; j: number }>();
    loads.forEach((l) => l.who.forEach((p, j) => job.set(p, { load: l, j })));

    // giữ biến đổi bằng Web Animations (đè lên animation CSS sẵn có)
    const holds = new Map<HTMLElement, Animation>();
    const setTf = (n: HTMLElement, tf: string) => {
      let a = holds.get(n);
      if (!a) {
        a = n.animate([{ transform: 'none' }, { transform: 'none' }], { duration: 120000, fill: 'forwards' });
        holds.set(n, a);
      }
      const k = { transform: tf };
      (a.effect as KeyframeEffect).setKeyframes([k, k]);
    };
    const put = (n: HTMLElement, x: number, feet: number, w: number, h: number, face: 1 | -1, pose: string, op = 1) => {
      n.style.opacity = String(op);
      n.style.transform = `translate(${(x - w / 2).toFixed(1)}px, ${(feet - h).toFixed(1)}px)`;
      const f = n.querySelector<HTMLElement>('.yr-flip');
      if (f) f.style.transform = face < 0 ? 'scaleX(-1)' : 'none';
      ['run', 'sit', 'cheer', 'stand', 'lift', 'carry'].forEach((cl) => n.classList.toggle(cl, cl === pose));
    };
    const putStool = (i: number, cx: number, bottom: number, op = 1) => {
      const s = stools[i];
      if (!s) return;
      s.style.opacity = String(op);
      s.style.transform = `translate(${(cx - SW / 2).toFixed(1)}px, ${(bottom - SH).toFixed(1)}px)`;
    };

    // chỗ đặt ghế: 3 hàng × 2 cột mỗi bên
    const spots = [0.4, 0.62, 0.84].flatMap((fy) => [0.06, 0.16].map((fx) => ({ fx, fy })));
    const stoolPos = [...spots.map((s) => ({ x: s.fx * vw, y: s.fy * vh })), ...spots.map((s) => ({ x: (1 - s.fx) * vw, y: s.fy * vh }))];
    const seat = (i: number) => stoolPos[i].y - SH + 8; // mặt ghế

    // 2 "ghế dài" làm từ chip tên & thanh điều khiển
    const uiHome = uiEls.map((u) => (u ? rel(u.getBoundingClientRect()) : null));
    const benchX = [vw * 0.31, vw * 0.69];

    let home: Map<HTMLElement, Box> | null = null;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = now - t0;
      if (!home && t >= T_CHASE) home = new Map(loads.map((l) => [l.el, rel(l.el.getBoundingClientRect())]));

      const target = (p: number) => {
        const jb = job.get(p);
        if (!jb || !home) return null;
        const r = home.get(jb.load.el)!;
        // ghế giơ trên đầu, món đồ nằm trên mặt ghế → đứng sao cho món đồ giữ nguyên độ cao
        return { x: r.l + r.w * jb.load.at[jb.j], feet: r.b + SH - 6 + H * HANDS, load: jb.load };
      };
      const arrive = (p: number) => {
        const tg = target(p);
        if (!tg) return T_CHASE + 600;
        return T_CHASE + 550 + (Math.hypot(tg.x - stoolPos[p].x, tg.feet - stoolPos[p].y) / SPEED) * 1000;
      };
      const fleeStart = (l: Load) => Math.max(...l.who.map(arrive)) + 200 + l.delay;
      const flee = (start: number, fromX: number) => {
        const u = seg(t, start, start + 2100);
        return { d: (vw - fromX + 340) * easeIn(u), u, on: t >= start };
      };
      const bob = (k: number) => -Math.abs(Math.sin(t / 75 + k)) * 9;

      // ---------- 1. gỡ chip tên + thanh điều khiển → làm ghế dài → ngồi → bị dí thì vác chạy
      uiGuys.forEach((g, i) => {
        const u = uiEls[i];
        const r = uiHome[i];
        if (!u || !r) return void (g.style.opacity = '0');
        const s = T_UI + i * 300;
        const bx = benchX[i];
        const hands = (feet: number) => feet - UH * HANDS;
        // chip ở trên: đứng ngay dưới chip; thanh điều khiển ở dưới: đứng cạnh rồi nhấc lên
        const stand = i === 0 ? r.b + UH * HANDS : floor;
        const gx = i === 0 ? r.cx : r.l - 30;
        if (t < s) return void (g.style.opacity = '0');
        if (t < s + 600) return put(g, gx, lerp(-20, stand, bounce(seg(t, s, s + 600))), UW, UH, 1, 'cheer');
        const benchTop = floor - r.h;
        if (t < T_CHASE) {
          const lift = inOut(seg(t, s + 600, s + 900)); // nhấc lên đầu
          const walk = inOut(seg(t, s + 950, s + 2100)); // vác tới chỗ đặt
          const down = inOut(seg(t, s + 2150, s + 2450)); // đặt xuống đất
          const x = lerp(gx, bx, walk);
          const feet = lerp(stand, floor, walk);
          let itemCx: number;
          let itemB: number;
          if (t < s + 950) {
            itemCx = i === 0 ? r.cx : lerp(r.cx, gx, lift);
            itemB = i === 0 ? r.b : lerp(r.b, hands(floor), lift);
          } else {
            itemCx = x;
            itemB = lerp(hands(feet), floor, down);
          }
          setTf(u, `translate(${(itemCx - r.cx).toFixed(1)}px, ${(itemB - r.b).toFixed(1)}px)`);
          if (t < s + 2450) return put(g, x, feet, UW, UH, walk > 0 && walk < 1 ? (bx < gx ? -1 : 1) : 1, walk > 0 && walk < 1 ? 'carry' : 'lift');
          const sitK = inOut(seg(t, s + 2450, s + 2700));
          return put(g, lerp(bx + r.w * 0.5 + 20, bx - r.w * 0.2, sitK), lerp(floor, benchTop + UH * HIP, sitK), UW, UH, i ? -1 : 1, sitK < 1 ? 'cheer' : 'sit');
        }
        // công an tới: bật dậy, giơ "ghế" lên đầu rồi chạy
        const up = inOut(seg(t, T_CHASE + 200, T_CHASE + 550));
        const st = T_CHASE + 750 + i * 200;
        const fl = flee(st, bx - r.w / 2);
        const b = fl.on ? bob(i) : 0;
        const itemB = lerp(floor, hands(floor), up) + b;
        setTf(u, `translate(${(bx + fl.d - r.cx).toFixed(1)}px, ${(itemB - r.b).toFixed(1)}px) rotate(${(fl.on ? Math.sin(t / 105 + i) * 5 : 0).toFixed(1)}deg)`);
        put(g, bx + fl.d, floor + b, UW, UH, 1, t < T_CHASE + 200 ? 'cheer' : fl.on ? 'carry' : 'lift', fl.u < 1 ? 1 : 0);
      });

      // ---------- 2 & 3. mười hai người vác ghế vào, ngồi, rồi vác ghế + đồ chạy trốn
      people.forEach((n, p) => {
        const sp = stoolPos[p];
        if (!sp) return void (n.style.opacity = '0');
        const left = sp.x < vw / 2;
        const face: 1 | -1 = left ? 1 : -1;
        const s = T_STOOL + (p % 6) * 140 + (left ? 0 : 70);
        if (t < s) {
          n.style.opacity = '0';
          return putStool(p, 0, 0, 0);
        }
        if (t < T_CHASE) {
          const k = inOut(seg(t, s, s + 1300));
          const x = lerp(left ? -W : vw + W, sp.x, k);
          const down = inOut(seg(t, s + 1350, s + 1650));
          if (t < s + 1650) {
            // ghế trên đầu → tới chỗ → hạ ghế xuống đất
            put(n, k < 1 ? x : sp.x - face * 34 * down, sp.y, W, H, face, k < 1 ? 'carry' : 'lift');
            return putStool(p, k < 1 ? x : sp.x, lerp(sp.y - H * HANDS, sp.y, down));
          }
          const sitK = inOut(seg(t, s + 1650, s + 1900));
          putStool(p, sp.x, sp.y);
          return put(n, lerp(sp.x - face * 34, sp.x, sitK), lerp(sp.y, seat(p) + H * HIP, sitK) - bell(t, s + 1650, s + 1900) * 20, W, H, face, sitK < 1 ? 'cheer' : 'sit');
        }
        const tg = target(p);
        const a = arrive(p);
        if (t < T_CHASE + 550) {
          // giật mình bật dậy, nhấc ghế lên đầu
          const lift = inOut(seg(t, T_CHASE + 250, T_CHASE + 550));
          const feet = t < T_CHASE + 250 ? seat(p) + H * HIP - bell(t, T_CHASE, T_CHASE + 250) * 40 : sp.y;
          put(n, sp.x, feet, W, H, face, t < T_CHASE + 250 ? 'cheer' : 'lift');
          return putStool(p, sp.x, lerp(sp.y, sp.y - H * HANDS, lift));
        }
        if (!tg) {
          const fl = flee(T_CHASE + 600, sp.x);
          put(n, sp.x + fl.d, sp.y + bob(p), W, H, 1, 'carry', fl.u < 1 ? 1 : 0);
          return putStool(p, sp.x + fl.d, sp.y - H * HANDS + bob(p), fl.u < 1 ? 1 : 0);
        }
        if (t < a) {
          // chạy tới dưới món đồ, ghế vẫn trên đầu
          const k = seg(t, T_CHASE + 550, a);
          const x = lerp(sp.x, tg.x, k);
          const feet = lerp(sp.y, tg.feet, k);
          put(n, x, feet, W, H, tg.x >= sp.x ? 1 : -1, 'carry');
          return putStool(p, x, feet - H * HANDS);
        }
        const fl = flee(fleeStart(tg.load), tg.x);
        const b = fl.on ? bob(p) : 0;
        put(n, tg.x + fl.d, tg.feet + b, W, H, 1, fl.on ? 'carry' : 'lift', fl.u < 1 ? 1 : 0);
        putStool(p, tg.x + fl.d, tg.feet - H * HANDS + b, fl.u < 1 ? 1 : 0);
      });

      // món đồ nằm trên ghế, chạy theo người vác
      if (home)
        loads.forEach((l) => {
          const r = home!.get(l.el)!;
          const st = fleeStart(l);
          const fl = flee(st, r.l);
          const shake = t < st ? Math.sin(t / 18 + l.delay) * 3 : 0;
          const b = fl.on ? bob(l.who[0]) : 0;
          const tilt = fl.on ? Math.sin(t / 110 + l.delay) * 4 : 0;
          setTf(l.el, `translate(${(fl.d + shake).toFixed(1)}px, ${b.toFixed(1)}px) rotate(${tilt.toFixed(1)}deg)`);
        });

      // ---------- 4. công an: đuổi theo, ngơ ngác giữa slide trống, rồi bỏ đi
      const copFloor = Math.min(vh - 30, vh * 0.8);
      const stops = [vw * 0.55, vw * 0.4];
      cops.forEach((cp, i) => {
        const s = T_CHASE + i * 300;
        const run = inOut(seg(t, s, s + 3400));
        const leave = easeIn(seg(t, T_CHASE + 7200 + i * 250, T_CHASE + 8600 + i * 250));
        const x = -PW + (stops[i] + PW) * run + leave * (vw - stops[i] + PW * 2);
        const looking = run >= 1 && leave === 0;
        const face: 1 | -1 = looking ? (Math.floor((t - s) / 650) % 2 ? -1 : 1) : 1;
        put(cp, x, copFloor - (looking ? 0 : Math.abs(Math.sin(t / 70)) * 6), PW, PH, face, looking ? 'stand' : 'run', t >= s && leave < 1 ? 1 : 0);
        if (i === 0) {
          const chase = t > s + 250 && t < s + 2600;
          const huh = t > T_CHASE + 4600 && t < T_CHASE + 7100;
          bubble.classList.toggle('on', chase || huh);
          const txt = huh ? 'Huh? Where did everyone go?!' : 'STOP RIGHT THERE!';
          if (bubble.textContent !== txt) bubble.textContent = txt;
          bubble.style.transform = `translate(${(x - 20).toFixed(1)}px, ${(copFloor - PH - 44).toFixed(1)}px)`;
        }
        if (i === 1) {
          const on = (t > s + 150 && t < s + 650) || (t > s + 1250 && t < s + 1750);
          tweet.classList.toggle('on', on);
          tweet.style.transform = `translate(${(x + 30).toFixed(1)}px, ${(copFloor - PH * 0.8).toFixed(1)}px) rotate(-10deg)`;
        }
      });

      if (t < T_CHASE + 9200) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      holds.forEach((a) => a.cancel());
      [...people, ...uiGuys, ...cops, ...stools].forEach((n) => (n.style.opacity = '0'));
      bubble.classList.remove('on');
      tweet.classList.remove('on');
    };
  }, [active]);

  const fig = (key: string, cls: string, w: number, h: number, hat: 'nonla' | 'police' = 'nonla') => (
    <div key={key} className={`yy-runner show ${cls}`} style={{ width: w, height: h, opacity: 0 }}>
      <RunnerFigure width={w} height={h} cargo={null} hat={hat} />
    </div>
  );

  return (
    <div className="finale-party ctx" ref={root} aria-hidden="true">
      {Array.from({ length: N }, (_, i) => (
        <div key={`st${i}`} className={`fp-stool ${i % 3 === 1 ? 'blue' : 'red'}`} style={{ width: SW, height: SH, opacity: 0 }}>
          <svg viewBox="0 0 56 52">
            <path className="seat" d="M4 8 Q28 0 52 8 L50 14 Q28 8 6 14 Z" />
            <path className="leg" d="M9 13 L5 51 M47 13 L51 51 M17 13 L15 47 M39 13 L41 47" />
            <path className="rim" d="M9 32 L47 32" />
          </svg>
        </div>
      ))}
      {Array.from({ length: N }, (_, i) => fig(`s${i}`, `fp-sit ${i % 2 ? 'chaser' : 'pusher'}`, W, H))}
      {[0, 1].map((i) => fig(`u${i}`, `fp-ui ${i ? 'chaser' : 'pusher'}`, UW, UH))}
      {[0, 1].map((i) => fig(`c${i}`, 'fp-cop police', PW, PH, 'police'))}
      <div className="cp cp-bubble fp-bubble">STOP RIGHT THERE!</div>
      <div className="cp cp-burst fp-tweet">TWEET! TWEET!</div>
    </div>
  );
}
