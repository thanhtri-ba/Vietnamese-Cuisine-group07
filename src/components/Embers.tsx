import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  max: number;
  smoke: boolean;
}

/**
 * Tàn lửa + khói than bay lên từ đáy màn hình (dùng cho phần "Sườn nướng than hoa").
 * Chỉ chạy requestAnimationFrame khi `on` = true; tắt hẳn nếu người dùng bật giảm chuyển động.
 */
export default function Embers({ on }: { on: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !on) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const ps: Particle[] = [];
    const spawn = (smoke: boolean): Particle => ({
      x: Math.random() * w,
      y: h + 10,
      vx: (Math.random() - 0.5) * (smoke ? 0.25 : 0.6),
      vy: -(smoke ? 0.35 + Math.random() * 0.4 : 0.8 + Math.random() * 1.4),
      r: smoke ? 40 + Math.random() * 60 : 1 + Math.random() * 2.2,
      life: 0,
      max: smoke ? 420 + Math.random() * 200 : 180 + Math.random() * 160,
      smoke,
    });

    let raf = 0;
    let t = 0;
    const tick = () => {
      t++;
      if (t % 4 === 0 && ps.filter((p) => !p.smoke).length < 60) ps.push(spawn(false));
      if (t % 30 === 0 && ps.filter((p) => p.smoke).length < 10) ps.push(spawn(true));
      ctx.clearRect(0, 0, w, h);
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.life++;
        p.x += p.vx + Math.sin((p.life + i * 7) / 25) * (p.smoke ? 0.3 : 0.5);
        p.y += p.vy;
        const k = p.life / p.max;
        if (k >= 1) {
          ps.splice(i, 1);
          continue;
        }
        const fade = Math.sin(Math.PI * k);
        if (p.smoke) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * (1 + k));
          g.addColorStop(0, `rgba(235,228,215,${0.07 * fade})`);
          g.addColorStop(1, 'rgba(235,228,215,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (1 + k), 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255,${140 + Math.round(80 * (1 - k))},60,${0.9 * fade})`;
          ctx.shadowColor = 'rgba(255,120,40,.9)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (1 - k * 0.5), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      ctx.clearRect(0, 0, w, h);
    };
  }, [on]);

  return <canvas ref={ref} className={on ? 'embers on' : 'embers'} aria-hidden="true" />;
}
