import { useEffect, useRef } from 'react';
import { useSlideActive } from './DeckContext';

/** Pháo hoa đêm giao thừa cho slide kết: pháo bay lên, nổ thành hoa cúc / vòng tròn / liễu rủ.
 *  Bấm chuột vào chỗ trống trên slide để bắn thêm một quả. Tự tắt khi bật "giảm chuyển động". */
const COLORS = ['#EFAE2B', '#FFD36B', '#F6E9CC', '#E8473A', '#F29BA0', '#FFB347'];

interface Rocket { x: number; y: number; vx: number; vy: number; ty: number; c: string }
interface Spark { x: number; y: number; px: number; py: number; vx: number; vy: number; life: number; max: number; c: string; s: number; g: number; tw: boolean }

export default function Fireworks() {
  const active = useSlideActive();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || !active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0, H = 0;
    const fit = () => {
      // kích thước layout (không bị ảnh hưởng bởi transform của hiệu ứng chuyển cảnh)
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(cv);

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];

    const launch = (x = rnd(W * 0.12, W * 0.88), ty = rnd(H * 0.12, H * 0.42)) => {
      rockets.push({ x, y: H + 10, vx: rnd(-0.6, 0.6), vy: -Math.sqrt(2 * 0.06 * (H - ty)) * rnd(0.98, 1.04), ty, c: pick(COLORS) });
    };
    const burst = (x: number, y: number, c: string) => {
      const type = pick(['peony', 'peony', 'ring', 'willow', 'chrys']);
      const n = type === 'ring' ? 46 : type === 'willow' ? 70 : 90;
      const c2 = pick(COLORS);
      for (let i = 0; i < n; i++) {
        const a = type === 'ring' ? (i / n) * Math.PI * 2 : rnd(0, Math.PI * 2);
        const sp = type === 'ring' ? 3.4 : type === 'willow' ? rnd(1, 3) : rnd(1, 4.6);
        sparks.push({
          x, y, px: x, py: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          life: 0, max: type === 'willow' ? rnd(2.2, 3.2) : rnd(1.1, 1.9),
          c: type === 'willow' ? '#FFD36B' : type === 'chrys' && i % 2 ? c2 : c,
          s: type === 'willow' ? 1.4 : rnd(1.4, 2.4), g: type === 'willow' ? 0.035 : 0.05, tw: type === 'chrys' || Math.random() < 0.3,
        });
      }
      // chớp sáng tâm nổ
      sparks.push({ x, y, px: x, py: y, vx: 0, vy: 0, life: 0, max: 0.25, c: '#FFFBF0', s: 26, g: 0, tw: false });
    };

    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('button, a, .controls, .notes')) return;
      const r = cv.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > W || y > H) return;
      launch(x, Math.max(H * 0.08, y));
    };
    window.addEventListener('pointerdown', onDown);

    let raf = 0, last = performance.now(), next = last + 300, salvo = 3;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) { last = now; return; }
      const dt = Math.min(2.5, (now - last) / 16.67); last = now;
      if (now >= next) {
        launch();
        if (salvo > 0) { salvo--; next = now + 220; } else next = now + rnd(650, 1300);
      }
      // vệt mờ dần thay vì xoá sạch: đuôi pháo hoa
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        const px = r.x, py = r.y;
        r.vy += 0.06 * dt; r.x += r.vx * dt; r.y += r.vy * dt;
        ctx.strokeStyle = r.c; ctx.globalAlpha = 0.9; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(r.x, r.y); ctx.stroke();
        if (Math.random() < 0.5) sparks.push({ x: r.x, y: r.y, px: r.x, py: r.y, vx: rnd(-0.3, 0.3), vy: rnd(0.2, 0.8), life: 0, max: rnd(0.3, 0.6), c: '#FFD36B', s: 1, g: 0.02, tw: false });
        if (r.vy >= -0.4 || r.y <= r.ty) { burst(r.x, r.y, r.c); rockets.splice(i, 1); }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.life += dt / 60;
        const k = p.life / p.max;
        if (k >= 1) { sparks.splice(i, 1); continue; }
        p.px = p.x; p.py = p.y;
        p.vx *= Math.pow(0.975, dt); p.vy = p.vy * Math.pow(0.975, dt) + p.g * dt;
        p.x += p.vx * dt; p.y += p.vy * dt;
        let al = 1 - k;
        if (p.tw && k > 0.55) al *= Math.random() < 0.5 ? 0.2 : 1;
        ctx.globalAlpha = al;
        if (p.s > 10) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.s * (1 + k * 2));
          g.addColorStop(0, 'rgba(255,251,240,.9)'); g.addColorStop(1, 'rgba(255,214,120,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.s * (1 + k * 2), 0, 6.28); ctx.fill();
        } else {
          ctx.strokeStyle = p.c; ctx.lineWidth = p.s * (1 - k * 0.5); ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
        }
      }
      if (sparks.length > 1400) sparks.splice(0, sparks.length - 1400);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('pointerdown', onDown); ctx.clearRect(0, 0, W, H); };
  }, [active]);

  return <canvas ref={ref} className="fireworks" aria-hidden="true" />;
}
