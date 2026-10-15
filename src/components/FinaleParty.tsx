import { useEffect, useRef } from 'react';
import { useSlideActive } from './DeckContext';
import RunnerFigure from './RunnerFigure';

/**
 * Slide 32 (Thank you!):
 *  1. Các nhân vật đội nón lá nhảy xuống ngồi đung đưa chân trên 3 tấm ảnh và trên chữ THANK YOU!.
 *  2. Hai chú công an thổi còi chạy vào → MỌI THỨ trên slide (dòng tiêu đề, 3 hộp chữ, câu hỏi,
 *     3 tấm ảnh, chữ THANK YOU!, QUESTIONS & ANSWERS) đều được người đội nón lá vác lên đầu
 *     chạy tán loạn ra khỏi màn hình. Công an đuổi theo.
 *  3. Slide chỉ còn chỗ trống; công an đứng ngơ ngác ("Huh? Where did everyone go?!") rồi bỏ đi.
 * Rời slide thì mọi thứ trở lại như cũ.
 */

const SW = 70; // người ngồi (cũng vác ảnh / chữ THANK YOU)
const SH = 109;
const CW = 84; // người vác thêm
const CH = 131;
const PW = 104; // công an
const PH = 162;
const LETTERS = [0, 4, 6, 8]; // T, K, Y, ! trong "Thank you!"
const N_CARRY = 9;

const T_SIT = 2600;
const T_CHASE = 4400;
const T_FLEE = 4900; // bắt đầu chạy trốn

const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const easeIn = (t: number) => t * t;
const inOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const bounce = (t: number) => {
  if (t < 0.7) return (t / 0.7) * (t / 0.7);
  const u = (t - 0.7) / 0.3;
  return 1 - Math.sin(Math.PI * u) * 0.12;
};

interface Load {
  el: HTMLElement;
  /** vị trí ngang của từng người vác (tỉ lệ theo bề rộng món đồ) */
  at: number[];
  /** người vác: 's' = người đang ngồi (chỉ số), 'c' = người vác thêm (chỉ số) */
  who: ['s' | 'c', number][];
  start: number;
}

export default function FinaleParty() {
  const active = useSlideActive();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const band = el?.closest('.band') as HTMLElement | null;
    if (!el || !band || !active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 640px)').matches) return;

    const sitters = Array.from(el.querySelectorAll<HTMLElement>('.fp-sit'));
    const carriers = Array.from(el.querySelectorAll<HTMLElement>('.fp-carry'));
    const cops = Array.from(el.querySelectorAll<HTMLElement>('.fp-cop'));
    const bubble = el.querySelector<HTMLElement>('.fp-bubble');
    const tweet = el.querySelector<HTMLElement>('.fp-tweet');
    const q = <T extends HTMLElement>(s: string) => band.querySelector<T>(s);
    const lead = q('.lead');
    const chips = Array.from(band.querySelectorAll<HTMLElement>('.chips .chip'));
    const recall = q('.recall');
    const photos = Array.from(band.querySelectorAll<HTMLElement>('.trio-photos .ph'));
    const h2 = q('h2');
    const letters = Array.from(band.querySelectorAll<HTMLElement>('h2 .ch'));
    const qa = q('.qa');
    if (!bubble || !tweet) return;

    // chỗ ngồi: mép trên 3 ảnh + 4 chữ cái
    const seats: { el: HTMLElement; fx: number; dy: number }[] = [
      ...photos.map((p, i) => ({ el: p, fx: [0.3, 0.55, 0.7][i] ?? 0.5, dy: 0 })),
      ...LETTERS.map((i) => letters[i]).filter(Boolean).map((l) => ({ el: l, fx: 0.5, dy: 0.13 })),
    ].slice(0, sitters.length);

    // những món sẽ bị vác đi + ai vác (thứ tự xuất phát xen kẽ cho "tán loạn")
    const loads: Load[] = [];
    let c = 0;
    const add = (node: HTMLElement | null | undefined, at: number[], who: Load['who'], start: number) => {
      if (node) loads.push({ el: node, at, who, start });
    };
    chips.forEach((ch, i) => add(ch, [0.5], [['c', c++]], T_FLEE + [0, 380, 160][i]));
    add(lead, [0.25, 0.75], [['c', c++], ['c', c++]], T_FLEE + 620);
    add(recall, [0.5], [['c', c++]], T_FLEE + 260);
    photos.forEach((p, i) => add(p, [0.5], [['s', i]], T_FLEE + [520, 90, 720][i]));
    add(h2, [0.12, 0.38, 0.62, 0.88], [['s', 3], ['s', 4], ['s', 5], ['s', 6]], T_FLEE + 900);
    add(qa, [0.3, 0.7], [['c', c++], ['c', c++]], T_FLEE + 1150);

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

    const put = (n: HTMLElement, x: number, y: number, w: number, h: number, face: 1 | -1, pose: string, op = 1) => {
      n.style.opacity = String(op);
      n.style.transform = `translate(${(x - w / 2).toFixed(1)}px, ${(y - h).toFixed(1)}px)`;
      const f = n.querySelector<HTMLElement>('.yr-flip');
      if (f) f.style.transform = face < 0 ? 'scaleX(-1)' : 'none';
      ['run', 'sit', 'cheer', 'stand', 'lift', 'carry'].forEach((cl) => n.classList.toggle(cl, cl === pose));
    };

    let home: Map<HTMLElement, DOMRect> | null = null;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = now - t0;
      const br = band.getBoundingClientRect();
      const vw = br.width;
      const vh = br.height;

      // --- 1. người ngồi
      if (t < T_CHASE) {
        sitters.forEach((s, i) => {
          const seat = seats[i];
          if (!seat) return void (s.style.opacity = '0');
          const r = seat.el.getBoundingClientRect();
          const x = r.left - br.left + r.width * seat.fx;
          const hipY = r.top - br.top + r.height * seat.dy + SH * 0.34;
          const st = T_SIT + i * 170;
          const k = bounce(seg(t, st, st + 560));
          put(s, x, hipY - 260 * (1 - k), SW, SH, i % 2 ? -1 : 1, t < st + 560 ? 'cheer' : 'sit', t < st ? 0 : 1);
        });
      } else {
        // --- 2. vác hết mọi thứ chạy trốn
        if (!home) home = new Map(loads.map((l) => [l.el, l.el.getBoundingClientRect()]));
        loads.forEach((l) => {
          const r = home!.get(l.el)!;
          const left = r.left - br.left;
          const bottom = r.bottom - br.top;
          const u = seg(t, l.start, l.start + 2100);
          const dist = (vw - left + 320) * easeIn(u);
          const bob = t >= l.start ? -Math.abs(Math.sin(t / 75 + l.start)) * 10 : 0;
          const shake = t < l.start ? Math.sin(t / 18 + l.start) * 4 : 0;
          const tilt = t >= l.start ? Math.sin(t / 110 + l.start) * 5 : Math.sin(t / 25) * 2;
          setTf(l.el, `translate(${(dist + shake).toFixed(1)}px, ${bob.toFixed(1)}px) rotate(${tilt.toFixed(1)}deg)`);
          l.who.forEach(([kind, idx], j) => {
            const n = kind === 's' ? sitters[idx] : carriers[idx];
            if (!n) return;
            const w = kind === 's' ? SW : CW;
            const h = kind === 's' ? SH : CH;
            const hx = left + r.width * l.at[j];
            const feet = bottom + h * 0.85; // tay giơ cao chạm đáy món đồ
            // người ngồi nhảy từ chỗ ngồi xuống dưới món đồ; người vác thêm bật lên từ dưới
            const k = inOut(seg(t, T_CHASE + j * 60, T_CHASE + 420 + j * 60));
            let y = feet;
            if (kind === 's') {
              const seat = seats[idx];
              const sr = seat ? seat.el.getBoundingClientRect() : r;
              const sx = sr.left - br.left + sr.width * (seat?.fx ?? 0.5);
              const sy = sr.top - br.top + sr.height * (seat?.dy ?? 0) + SH * 0.34;
              const x0 = k < 1 ? sx + (hx - sx) * k : hx;
              y = k < 1 ? sy + (feet - sy) * k - Math.sin(Math.PI * k) * 60 : feet;
              put(n, x0 + dist, y + bob, w, h, 1, k < 1 ? 'cheer' : t < l.start ? 'lift' : 'carry', u < 1 ? 1 : 0);
            } else {
              y = feet + (1 - bounce(k)) * 140;
              put(n, hx + dist, y + bob, w, h, 1, t < l.start ? 'lift' : 'carry', k > 0 && u < 1 ? 1 : 0);
            }
          });
        });

        // --- công an: đuổi theo, rồi đứng ngơ ngác giữa slide trống, sau đó bỏ đi
        const floor = Math.min(vh - 30, vh * 0.78);
        const stops = [vw * 0.55, vw * 0.36];
        cops.forEach((cp, i) => {
          const s = T_CHASE + 150 + i * 300;
          const run = inOut(seg(t, s, s + 3000));
          const leave = easeIn(seg(t, 10600 + i * 250, 12000 + i * 250));
          const x = -PW + (stops[i] + PW) * run + leave * (vw - stops[i] + PW * 2);
          const looking = run >= 1 && leave === 0;
          const face: 1 | -1 = looking ? (Math.floor((t - s) / 650) % 2 ? -1 : 1) : 1;
          put(cp, x, floor - (looking ? 0 : Math.abs(Math.sin(t / 70)) * 6), PW, PH, face, looking ? 'stand' : 'run', t >= s && leave < 1 ? 1 : 0);
          if (i === 0) {
            const chase = t > s + 250 && t < s + 2200;
            const huh = t > 8200 && t < 10500;
            bubble.classList.toggle('on', chase || huh);
            const txt = huh ? 'Huh? Where did everyone go?!' : 'STOP RIGHT THERE!';
            if (bubble.textContent !== txt) bubble.textContent = txt;
            bubble.style.transform = `translate(${(x - 20).toFixed(1)}px, ${(floor - PH - 44).toFixed(1)}px)`;
          }
          if (i === 1) {
            const on = (t > s + 200 && t < s + 700) || (t > s + 1300 && t < s + 1800);
            tweet.classList.toggle('on', on);
            tweet.style.transform = `translate(${(x + 30).toFixed(1)}px, ${(floor - PH * 0.8).toFixed(1)}px) rotate(-10deg)`;
          }
        });
      }

      if (t < 12600) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      holds.forEach((a) => a.cancel());
      [...sitters, ...carriers, ...cops].forEach((n) => (n.style.opacity = '0'));
      bubble.classList.remove('on');
      tweet.classList.remove('on');
    };
  }, [active]);

  return (
    <div className="finale-party ctx" ref={root} aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => (
        <div key={`s${i}`} className={`yy-runner show fp-sit ${i % 2 ? 'chaser' : 'pusher'}`} style={{ width: SW, height: SH, opacity: 0 }}>
          <RunnerFigure width={SW} height={SH} cargo={null} />
        </div>
      ))}
      {Array.from({ length: N_CARRY }, (_, i) => (
        <div key={`k${i}`} className={`yy-runner show fp-carry ${i % 2 ? 'pusher' : 'chaser'}`} style={{ width: CW, height: CH, opacity: 0 }}>
          <RunnerFigure width={CW} height={CH} cargo={null} />
        </div>
      ))}
      {[0, 1].map((i) => (
        <div key={`c${i}`} className="yy-runner show fp-cop police" style={{ width: PW, height: PH, opacity: 0 }}>
          <RunnerFigure width={PW} height={PH} cargo={null} hat="police" />
        </div>
      ))}
      <div className="cp cp-bubble fp-bubble">STOP RIGHT THERE!</div>
      <div className="cp cp-burst fp-tweet">TWEET! TWEET!</div>
    </div>
  );
}
