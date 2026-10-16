import { useEffect, useRef } from 'react';
import RunnerFigure from './RunnerFigure';

/**
 * Chạy trên MỌI slide: hai nhân vật đội nón lá khiêng một ổ bánh mì khổng lồ
 * băng ngang phía dưới màn hình một lượt, rồi biến mất.
 * Hướng chạy đổi luân phiên theo số slide. Bắt đầu sau khi hiệu ứng chuyển cảnh đã xong.
 */

const W = 76; // người khiêng
const H = 118;
const GAP = 76; // nửa khoảng cách giữa hai người
const LOAF_W = 250;
const LOAF_H = 72;
const DELAY = 4200; // chờ chuyển cảnh (dài nhất 3,8s) chạy xong
const RUN = 5600; // thời gian băng hết màn hình

export default function BanhMiCrew({ index }: { index: number }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 640px)').matches) return;

    const a = el.querySelector<HTMLElement>('.bm-a');
    const b = el.querySelector<HTMLElement>('.bm-b');
    const loaf = el.querySelector<HTMLElement>('.bm-loaf');
    if (!a || !b || !loaf) return;

    const dir = index % 2 ? -1 : 1; // chẵn: trái→phải, lẻ: phải→trái
    let raf = 0;
    const t0 = performance.now();
    const hide = () => {
      el.style.opacity = '0';
    };
    hide();

    const tick = (now: number) => {
      const t = now - t0;
      if (t >= DELAY && t <= DELAY + RUN) {
        const vw = window.innerWidth;
        const feet = window.innerHeight - 22;
        const span = vw + LOAF_W + 320;
        const k = (t - DELAY) / RUN;
        const cx = dir > 0 ? -LOAF_W / 2 - 160 + span * k : vw + LOAF_W / 2 + 160 - span * k;
        const bob = -Math.abs(Math.sin(t / 72)) * 5;
        el.style.opacity = '1';
        const place = (n: HTMLElement, x: number) => {
          n.style.transform = `translate(${(x - W / 2).toFixed(1)}px, ${(feet - H).toFixed(1)}px)`;
          const f = n.querySelector<HTMLElement>('.yr-flip');
          if (f) f.style.transform = dir > 0 ? 'none' : 'scaleX(-1)';
        };
        place(a, cx - GAP);
        place(b, cx + GAP);
        loaf.style.transform = `translate(${(cx - LOAF_W / 2).toFixed(1)}px, ${(feet - H * 0.81 - LOAF_H + bob).toFixed(1)}px) scaleX(${dir})`;
      } else hide();
      if (t < DELAY + RUN + 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      hide();
    };
  }, [index]);

  return (
    <div className="bmi-crew ctx" ref={root} aria-hidden="true">
      <div className="yy-runner show carry bm-a pusher" style={{ width: W, height: H }}>
        <RunnerFigure width={W} height={H} cargo={null} />
      </div>
      <div className="yy-runner show carry bm-b chaser" style={{ width: W, height: H }}>
        <RunnerFigure width={W} height={H} cargo={null} />
      </div>
      <div className="bm-loaf" style={{ width: LOAF_W, height: LOAF_H }}>
        <svg viewBox="0 0 250 72">
          <path className="crust" d="M16 40 Q8 14 50 10 L202 12 Q242 16 234 41 Q228 64 188 62 L54 62 Q20 62 16 40 Z" />
          <path className="score" d="M64 24 L80 38 M106 22 L122 36 M148 22 L164 36 M190 24 L204 36" />
          <path className="herb" d="M34 44 Q70 36 104 46 Q140 36 176 46 Q206 38 226 44" />
          <path className="chili" d="M84 50 Q96 46 108 52 M150 50 Q162 46 174 52" />
        </svg>
      </div>
    </div>
  );
}
