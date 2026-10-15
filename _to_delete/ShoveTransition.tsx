import { useEffect, useRef } from 'react';
import RunnerFigure from './RunnerFigure';

/**
 * Chuyển cảnh slide 1 → 2: một người dùng hai tay đẩy slide cũ trượt sang trái,
 * một người khác chạy theo sau ("Đợi tớ với!"), lộ ra slide mới bên dưới.
 * `fromIndex` = slide bị đẩy đi (lấy theo thứ tự .band trong .deck).
 */
export const SHOVE_TOTAL = 3300;
const T_PUSH0 = 380;
const T_PUSH1 = 2700;
const W = 120;
const H = 187;

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

export default function ShoveTransition({ fromIndex }: { fromIndex: number }) {
  const pusher = useRef<HTMLDivElement>(null);
  const chaser = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const a = pusher.current;
    const b = chaser.current;
    const bub = bubble.current;
    const slide = document.querySelectorAll<HTMLElement>('.deck > .band')[fromIndex];
    if (!a || !b || !bub || !slide) return;
    const vw = window.innerWidth;
    const floor = window.innerHeight - 26;

    // slide cũ: giữ hiện, nằm trên slide mới, trượt sang trái theo tay người đẩy
    const pushDur = T_PUSH1 - T_PUSH0;
    const slideAnim = slide.animate(
      [
        { transform: 'none', opacity: 1, visibility: 'visible', zIndex: 3, boxShadow: '30px 0 50px rgba(0,0,0,0)' },
        { transform: 'none', opacity: 1, visibility: 'visible', zIndex: 3, boxShadow: '30px 0 50px rgba(0,0,0,.28)', offset: T_PUSH0 / T_PUSH1 },
        { transform: 'translateX(-104%)', opacity: 1, visibility: 'visible', zIndex: 3, boxShadow: '30px 0 50px rgba(0,0,0,.28)' },
      ],
      { duration: T_PUSH1, easing: 'linear', fill: 'forwards' },
    );
    // easing riêng cho đoạn đẩy (chậm → nhanh → chậm) làm bằng rAF để tay người khớp mép slide
    slideAnim.pause();

    let raf = 0;
    const t0 = performance.now();
    const put = (el: HTMLElement, x: number, y: number, faceLeft: boolean) => {
      el.style.transform = `translate(${(x - W / 2).toFixed(1)}px, ${(y - H).toFixed(1)}px)`;
      const f = el.querySelector<HTMLElement>('.yr-flip');
      if (f) f.style.transform = faceLeft ? 'scaleX(-1)' : 'none';
    };
    const tick = (now: number) => {
      const t = now - t0;
      const k = ease(clamp01((t - T_PUSH0) / pushDur));
      const edge = vw * (1 - k * 1.04); // mép phải của slide cũ
      slideAnim.currentTime = t < T_PUSH0 ? t : T_PUSH0 + k * pushDur;

      // người đẩy: chạy vào từ phải, rồi tì tay vào mép slide
      let ax: number;
      if (t < T_PUSH0) ax = vw + W - (t / T_PUSH0) * (W * 0.85);
      else if (t < T_PUSH1) ax = edge + W * 0.36;
      else ax = W * 0.36 - ((t - T_PUSH1) / 600) * (W * 2.2); // đẩy xong, lao theo ra ngoài
      a.classList.toggle('push', t >= T_PUSH0 - 60 && t < T_PUSH1);
      put(a, ax, floor, true);

      // người chạy theo: trễ hơn, nhún nhảy, cố đuổi kịp
      const lagT = t - 380;
      let bx: number;
      if (lagT < 0) bx = vw + W * 1.5;
      else if (t < T_PUSH1 + 150) bx = Math.max(ax + W * 1.2, vw + W - lagT * 0.9 - Math.sin(lagT / 120) * 6);
      else bx = ax + W * 1.25;
      bx = Math.max(bx, ax + W * 1.05);
      put(b, bx, floor, true);
      bub.style.transform = `translate(${(bx - 40).toFixed(1)}px, ${(floor - H - 46).toFixed(1)}px)`;
      bub.classList.toggle('on', t > 700 && t < 2500);

      if (t < SHOVE_TOTAL) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      slideAnim.cancel();
    };
  }, [fromIndex]);

  return (
    <div className="shove" aria-hidden="true">
      <div className="yy-runner show run shove-runner pusher" ref={pusher}>
        <RunnerFigure width={W} height={H} cargo={null} />
      </div>
      <div className="yy-runner show run shove-runner chaser" ref={chaser}>
        <RunnerFigure width={W} height={H} cargo={null} />
      </div>
      <div className="shove-bubble" ref={bubble}>
        Đợi tớ với!
      </div>
    </div>
  );
}
