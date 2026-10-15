import { useEffect, useRef } from 'react';
import { useSlideActive } from './DeckContext';

/**
 * Âm dương lăn qua lại trên một thanh cân bằng.
 * - Tự lăn đi lăn lại giữa phía Hàn và phía Nhiệt (lò xo + dao động).
 * - Có thể cầm kéo / ném bằng chuột hoặc tay; thả ra nó lăn tiếp rồi tự về nhịp.
 * - Lăn về phía nào thì nhãn + các món cùng tính bên đó sáng lên (class trên .band).
 */
export default function YinYang() {
  const active = useSlideActive();
  const stage = useRef<HTMLDivElement>(null);
  const wheel = useRef<SVGSVGElement>(null);
  const beam = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = stage.current;
    const wh = wheel.current;
    const bm = beam.current;
    if (!st || !wh || !bm) return;
    const band = st.closest('.band');
    const setSide = (side: 'cold' | 'hot' | 'mid') => {
      band?.classList.toggle('yy-cold', side === 'cold');
      band?.classList.toggle('yy-hot', side === 'hot');
      band?.classList.toggle('yy-mid', side === 'mid');
    };
    const render = (x: number, max: number, r: number) => {
      const tilt = (x / max) * 7; // độ nghiêng thanh
      const ang = (x / r) * (180 / Math.PI); // lăn không trượt
      const y = x * Math.tan((tilt * Math.PI) / 180);
      bm.style.transform = `rotate(${tilt.toFixed(2)}deg)`;
      wh.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${ang.toFixed(1)}deg)`;
      const k = x / max;
      setSide(k < -0.45 ? 'cold' : k > 0.45 ? 'hot' : 'mid');
    };

    if (!active) {
      render(0, 1, 1);
      band?.classList.remove('yy-cold', 'yy-hot', 'yy-mid');
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render(0, 1, 1);
      return;
    }

    let x = 0;
    let v = 0;
    let drag: { id: number; dx: number; lastX: number; lastT: number; vel: number } | null = null;
    let raf = 0;
    let last = performance.now();
    let t0 = last;
    // YYRunner đặt class này lên .band khi đang vác âm dương đi: đứng yên / ẩn
    const held = () => !!band && (band.classList.contains('yy-hold') || band.classList.contains('yy-carried'));

    const dims = () => {
      const w = st.clientWidth;
      const r = wh.clientWidth / 2;
      return { max: Math.max(20, w / 2 - r), r: Math.max(10, r) };
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const { max, r } = dims();
      if (held()) {
        x = 0;
        v = 0;
        t0 = now - 1000; // thả xuống xong thì bắt đầu lăn sau ~0.8s
      } else if (!drag) {
        // mục tiêu dao động qua lại; chờ 1.8s cho hiệu ứng xuất hiện xong
        const t = (now - t0) / 1000;
        const amp = t < 1.8 ? 0 : Math.min(1, (t - 1.8) / 1.5) * max * 0.85;
        const target = Math.sin((t - 1.8) * 1.15) * amp;
        const a = (target - x) * 9 - v * 2.4;
        v += a * dt;
        x += v * dt;
        if (x > max) {
          x = max;
          v = -Math.abs(v) * 0.5;
        } else if (x < -max) {
          x = -max;
          v = Math.abs(v) * 0.5;
        }
      }
      render(x, max, r);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      if (held()) return;
      e.preventDefault();
      wh.setPointerCapture(e.pointerId);
      drag = { id: e.pointerId, dx: e.clientX - x, lastX: e.clientX, lastT: performance.now(), vel: 0 };
      st.classList.add('grab');
    };
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const { max } = dims();
      x = Math.max(-max, Math.min(max, e.clientX - drag.dx));
      const now = performance.now();
      const dt = Math.max(1, now - drag.lastT) / 1000;
      drag.vel = drag.vel * 0.6 + ((e.clientX - drag.lastX) / dt) * 0.4;
      drag.lastX = e.clientX;
      drag.lastT = now;
    };
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      v = Math.max(-2500, Math.min(2500, drag.vel));
      drag = null;
      st.classList.remove('grab');
    };
    wh.addEventListener('pointerdown', down);
    wh.addEventListener('pointermove', move);
    wh.addEventListener('pointerup', up);
    wh.addEventListener('pointercancel', up);
    return () => {
      cancelAnimationFrame(raf);
      wh.removeEventListener('pointerdown', down);
      wh.removeEventListener('pointermove', move);
      wh.removeEventListener('pointerup', up);
      wh.removeEventListener('pointercancel', up);
    };
  }, [active]);

  return (
    <div className="yy-stage" ref={stage}>
      <svg ref={wheel} className="yy yy-roll" viewBox="0 0 200 200" role="img" aria-label="Biểu tượng âm dương lăn qua lại giữa hàn và nhiệt — có thể kéo bằng chuột">
        <circle cx="100" cy="100" r="98" fill="var(--cream)" stroke="var(--forest)" strokeWidth="4"></circle>
        <path d="M100 2 A98 98 0 0 1 100 198 A49 49 0 0 1 100 100 A49 49 0 0 0 100 2Z" fill="var(--forest)"></path>
        <circle cx="100" cy="51" r="13" fill="var(--forest)"></circle>
        <circle cx="100" cy="149" r="13" fill="var(--cream)"></circle>
      </svg>
      <div className="yy-beam" ref={beam} aria-hidden="true">
        <i className="c" />
        <i className="h" />
      </div>
      <div className="yy-fulcrum" aria-hidden="true" />
      <p className="yy-hint" aria-hidden="true">kéo thử ⇆</p>
    </div>
  );
}
