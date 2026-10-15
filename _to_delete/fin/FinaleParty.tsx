import { useEffect, useRef } from 'react';
import { useSlideActive } from './DeckContext';
import RunnerFigure from './RunnerFigure';

/**
 * Slide 32 (Thank you!): các nhân vật đội nón lá nhảy xuống ngồi đung đưa chân trên 3 tấm ảnh
 * và trên các chữ THANK YOU!; sau đó 3 hộp chữ mọc chân, bị 2 chú công an thổi còi đuổi chạy
 * tán loạn ra khỏi màn hình — mỗi hộp chữ được một người đội nón lá vác trên đầu chạy trốn;
 * một lúc sau các hộp chữ mới quay lại chỗ cũ.
 */

const SW = 70; // kích thước người ngồi
const SH = 109;
const PW = 104; // kích thước công an
const PH = 162;
const CW = 84; // người vác hộp chữ
const CH = 131;
const LETTERS = [0, 4, 6, 8]; // T, K, Y, ! trong "Thank you!"

const T_SIT = 2600;
const T_CHASE = 4400;
const T_BACK = 9200;

const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const easeIn = (t: number) => t * t;
const bounce = (t: number) => {
  // rơi xuống rồi nảy nhẹ
  if (t < 0.7) return (t / 0.7) * (t / 0.7);
  const u = (t - 0.7) / 0.3;
  return 1 - Math.sin(Math.PI * u) * 0.12;
};

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
    const cops = Array.from(el.querySelectorAll<HTMLElement>('.fp-cop'));
    const carriers = Array.from(el.querySelectorAll<HTMLElement>('.fp-carry'));
    const bubble = el.querySelector<HTMLElement>('.fp-bubble');
    const tweet = el.querySelector<HTMLElement>('.fp-tweet');
    const chips = Array.from(band.querySelectorAll<HTMLElement>('.chips .chip'));
    const photos = Array.from(band.querySelectorAll<HTMLElement>('.trio-photos .ph'));
    const letters = Array.from(band.querySelectorAll<HTMLElement>('h2 .ch'));
    if (!bubble || !tweet) return;

    // chỗ ngồi: mép trên 3 ảnh + 4 chữ cái
    const seats: { el: HTMLElement; fx: number; dy: number }[] = [
      ...photos.map((p, i) => ({ el: p, fx: [0.3, 0.55, 0.7][i] ?? 0.5, dy: 0 })),
      ...LETTERS.map((i) => letters[i]).filter(Boolean).map((l) => ({ el: l, fx: 0.5, dy: 0.13 })),
    ].slice(0, sitters.length);

    const hold = (c: HTMLElement) => c.animate([{ transform: 'none', opacity: 1 }, { transform: 'none', opacity: 1 }], { duration: 60000, fill: 'forwards' });
    // chỉ "giữ" hộp chữ khi bắt đầu đuổi, để hiệu ứng xuất hiện ban đầu của chúng vẫn chạy
    const chipAnims: Animation[] = [];
    const setChip = (i: number, tf: string, op = 1) => {
      if (!chipAnims[i]) chipAnims[i] = hold(chips[i]);
      const k = { transform: tf, opacity: op };
      (chipAnims[i].effect as KeyframeEffect).setKeyframes([k, k]);
    };

    const put = (n: HTMLElement, x: number, y: number, w: number, h: number, face: 1 | -1, pose: string, op = 1) => {
      n.style.opacity = String(op);
      n.style.transform = `translate(${(x - w / 2).toFixed(1)}px, ${(y - h).toFixed(1)}px)`;
      const f = n.querySelector<HTMLElement>('.yr-flip');
      if (f) f.style.transform = face < 0 ? 'scaleX(-1)' : 'none';
      ['run', 'sit', 'cheer', 'stand', 'lift', 'carry'].forEach((c) => n.classList.toggle(c, c === pose));
    };

    let chipHome: DOMRect[] | null = null;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = now - t0;
      const br = band.getBoundingClientRect();
      const vw = br.width;

      // --- người ngồi
      sitters.forEach((s, i) => {
        const seat = seats[i];
        if (!seat) {
          s.style.opacity = '0';
          return;
        }
        const r = seat.el.getBoundingClientRect();
        const x = r.left - br.left + r.width * seat.fx;
        const top = r.top - br.top + r.height * seat.dy;
        const hipY = top + SH * 0.34; // hông (y=66/100) chạm mép
        const start = T_SIT + i * 170;
        const k = bounce(seg(t, start, start + 560));
        const y = hipY - 260 * (1 - k);
        put(s, x, y, SW, SH, i % 2 ? -1 : 1, t < start + 560 ? 'cheer' : 'sit', t < start ? 0 : 1);
      });

      // --- hộp chữ chạy trốn
      // vị trí gốc của hộp chữ: đo một lần ngay trước khi bắt đầu đuổi (sau đó chúng đã bị dịch đi)
      if (!chipHome && t >= T_CHASE) chipHome = chips.map((c) => c.getBoundingClientRect());
      const chipRects = chipHome ?? chips.map((c) => c.getBoundingClientRect());
      const rowBottom = chipRects.length ? Math.max(...chipRects.map((r) => r.bottom)) - br.top : 0;
      chips.forEach((_, i) => {
        if (t < T_CHASE) return;
        const r0 = chipRects[i];
        const homeX = (r0.left + r0.right) / 2 - br.left;
        const feet = r0.bottom - br.top + CH * 0.85; // tay giơ cao chạm đáy hộp chữ
        const car = carriers[i];
        if (t < T_CHASE + 500) {
          // người vác bật lên từ phía dưới, hộp chữ run rẩy
          const k = bounce(seg(t, T_CHASE + i * 90, T_CHASE + 420 + i * 90));
          if (car) put(car, homeX, feet + (1 - k) * 120, CW, CH, 1, 'lift', k > 0 ? 1 : 0);
          return setChip(i, `translateX(${(Math.sin(t / 18 + i) * 4).toFixed(1)}px) rotate(${(Math.sin(t / 25 + i) * 3).toFixed(1)}deg)`);
        }
        if (t < T_BACK) {
          const s = T_CHASE + 500 + i * 160;
          const u = seg(t, s, s + 1900 - i * 150);
          const dist = (vw - (r0.left - br.left) + 260) * easeIn(u);
          const bob = -Math.abs(Math.sin(t / 75 + i)) * 10;
          const tilt = Math.sin(t / 110 + i * 2) * 6;
          if (car) put(car, homeX + dist, feet + bob, CW, CH, 1, 'carry', u < 1 ? 1 : 0);
          return setChip(i, `translate(${dist.toFixed(1)}px, ${bob.toFixed(1)}px) rotate(${tilt.toFixed(1)}deg)`);
        }
        if (car) car.style.opacity = '0';
        // quay lại chỗ cũ
        const s = T_BACK + i * 180;
        const k = bounce(seg(t, s, s + 600));
        return setChip(i, `translateY(${(-(1 - k) * 260).toFixed(1)}px)`, t < s ? 0 : 1);
      });

      // --- công an đuổi theo
      const copY = rowBottom + 70;
      cops.forEach((c, i) => {
        const s = T_CHASE + 150 + i * 260;
        const u = seg(t, s, s + 3200);
        const x = -PW + (vw + PW * 2.5) * (u < 0.15 ? u * 1.6 : 0.24 + (u - 0.15) * 0.894);
        put(c, x, copY + Math.abs(Math.sin(t / 70)) * -6, PW, PH, 1, 'run', t >= s && u < 1 ? 1 : 0);
        if (i === 0) {
          const on = t > s + 250 && t < s + 2000;
          bubble.classList.toggle('on', on);
          bubble.style.transform = `translate(${(x - 10).toFixed(1)}px, ${(copY - PH - 40).toFixed(1)}px)`;
        }
        if (i === 1) {
          const on = (t > s + 200 && t < s + 700) || (t > s + 1300 && t < s + 1800);
          tweet.classList.toggle('on', on);
          tweet.style.transform = `translate(${(x + 30).toFixed(1)}px, ${(copY - PH * 0.75).toFixed(1)}px) rotate(-10deg)`;
        }
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      chipAnims.forEach((a) => a.cancel());
      band.classList.remove('finale-run');
      sitters.forEach((s) => (s.style.opacity = '0'));
      carriers.forEach((c) => (c.style.opacity = '0'));
      cops.forEach((c) => (c.style.opacity = '0'));
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
      {[0, 1, 2].map((i) => (
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
