import { useEffect, useRef } from 'react';

export type FxKind = 'petal' | 'leaf' | 'firefly' | 'steam' | 'ember' | 'bubble' | 'rice';

interface P {
  x: number; y: number; vx: number; vy: number;
  r: number; rot: number; vr: number; ph: number; a: number; life: number; max: number; c: number;
}

/** Hạt chuyển động bằng canvas: cánh hoa, lá tre, đom đóm, khói bếp, tàn lửa, bọt nước, hạt gạo.
 *  Phản ứng với con trỏ (hạt né ra), bắn một đợt hạt khi vào slide, tự tắt khi bật "giảm chuyển động". */
const PALETTE: Record<FxKind, { dark: string[]; light: string[] }> = {
  petal: { dark: ['#F6B8B8', '#FFD76A', '#FFE9B8', '#F29BA0'], light: ['#C2362B', '#D9822B', '#B8284A', '#E0A030'] },
  leaf: { dark: ['#9BC58A', '#C8DDA0', '#7FB37A'], light: ['#4F7A3A', '#6B8E3A', '#3E6B3E'] },
  firefly: { dark: ['#FFE08A', '#FFF3B8', '#FFD25A'], light: ['#C98A10', '#B8741A', '#D9A024'] },
  steam: { dark: ['#FFF3DC'], light: ['#8A7A6A'] },
  ember: { dark: ['#FFB347', '#FF7A2F', '#FFD36B', '#FF5A2A'], light: ['#D9531E', '#C2362B', '#E0842B'] },
  bubble: { dark: ['#CFE3FF'], light: ['#1B3E78'] },
  rice: { dark: ['#FFF8E6', '#F4E7C8'], light: ['#8A6A3A', '#B08A4A'] },
};
const COUNT: Record<FxKind, number> = { petal: 38, leaf: 30, firefly: 46, steam: 14, ember: 70, bubble: 34, rice: 60 };

export default function FxCanvas({ kind, light }: { kind: FxKind; light: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const pal = (light ? PALETTE[kind].light : PALETTE[kind].dark);
    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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
    const make = (burst = false): P => {
      const p: P = { x: rnd(0, W), y: 0, vx: 0, vy: 0, r: 1, rot: rnd(0, 6.28), vr: rnd(-0.03, 0.03), ph: rnd(0, 6.28), a: 1, life: 0, max: rnd(5, 12), c: Math.floor(rnd(0, pal.length)) };
      switch (kind) {
        case 'petal': p.r = rnd(5, 11); p.y = burst ? rnd(-40, H * 0.3) : rnd(-H * 0.1, H); p.vy = rnd(0.5, 1.2); p.vx = rnd(-0.2, 0.5); if (burst) { p.vy *= 2.2; p.x = rnd(-60, W + 60); } break;
        case 'leaf': p.r = rnd(7, 14); p.y = burst ? rnd(-40, H * 0.2) : rnd(-H * 0.1, H); p.vy = rnd(0.4, 0.9); p.vx = rnd(0.2, 0.9); p.vr = rnd(-0.02, 0.02); if (burst) p.vy *= 2; break;
        case 'firefly': p.r = rnd(2, 4.5); p.y = rnd(0, H); p.vx = rnd(-0.3, 0.3); p.vy = rnd(-0.3, 0.3); break;
        case 'steam': p.r = rnd(40, 90); p.x = rnd(0, W); p.y = H + p.r * 0.4; p.vy = -rnd(0.25, 0.6); p.vx = rnd(-0.15, 0.15); p.max = rnd(7, 12); p.life = burst ? rnd(0, p.max * 0.6) : rnd(0, p.max); p.y = H - (burst || true ? p.life * 40 : 0); break;
        case 'ember': p.r = rnd(1.2, 3.2); p.x = burst ? rnd(0, W) : rnd(0, W); p.y = burst ? H + 10 : rnd(H * 0.3, H + 10); p.vy = -rnd(0.8, 2.2); p.vx = rnd(-0.4, 0.4); p.max = rnd(3, 7); p.life = rnd(0, p.max * 0.7); break;
        case 'bubble': p.r = rnd(3, 11); p.y = burst ? H + 10 : rnd(0, H); p.vy = -rnd(0.4, 1.1); p.vx = 0; break;
        case 'rice': p.r = rnd(2.5, 4.2); p.y = burst ? rnd(-60, 0) : rnd(-H * 0.1, H); p.vy = rnd(0.8, 1.9); p.vx = rnd(-0.15, 0.15); if (burst) p.vy *= 2; break;
      }
      return p;
    };
    const n = Math.round(COUNT[kind] * Math.min(1.4, Math.max(0.6, (window.innerWidth * window.innerHeight) / 1000000)));
    const ps: P[] = Array.from({ length: n }, () => make(false));
    // đợt hạt đầu tiên khi vào slide
    const extra = Math.round(n * 0.7);
    for (let i = 0; i < extra; i++) ps.push(make(true));
    let limit = n;

    const mouse = { x: -999, y: -999 };
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0, last = performance.now(), t0 = last;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) { last = now; return; }
      const dt = Math.min(2.5, (now - last) / 16.67); last = now;
      const el = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      if (el > 3.5 && ps.length > limit) ps.length = limit; // đợt hạt thêm tự hết
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        // né con trỏ
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 22000 && d2 > 1) { const f = (1 - d2 / 22000) * 2.2 * dt; const d = Math.sqrt(d2); p.vx += (dx / d) * f; p.vy += (dy / d) * f * 0.6; }
        p.life += dt / 60;
        const col = pal[p.c];
        ctx.save();
        switch (kind) {
          case 'petal': {
            p.x += (p.vx + Math.sin(el * 1.3 + p.ph) * 0.7) * dt; p.y += p.vy * dt; p.rot += p.vr * dt; p.vx *= 0.985;
            ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(1, 0.55 + 0.45 * Math.cos(el * 2 + p.ph));
            ctx.fillStyle = col; ctx.globalAlpha = light ? 0.55 : 0.8;
            ctx.beginPath(); ctx.moveTo(0, -p.r); ctx.bezierCurveTo(p.r, -p.r * 0.5, p.r * 0.8, p.r * 0.8, 0, p.r); ctx.bezierCurveTo(-p.r * 0.8, p.r * 0.8, -p.r, -p.r * 0.5, 0, -p.r); ctx.fill();
            if (p.y > H + 20 || p.x > W + 40 || p.x < -80) Object.assign(p, make(false), { y: -20 });
            break; }
          case 'leaf': {
            p.x += (p.vx + Math.sin(el + p.ph) * 0.5) * dt; p.y += p.vy * dt; p.rot += p.vr * dt + Math.sin(el * 1.6 + p.ph) * 0.01; p.vx *= 0.99;
            ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = col; ctx.globalAlpha = light ? 0.5 : 0.7;
            ctx.beginPath(); ctx.moveTo(-p.r * 1.6, 0); ctx.quadraticCurveTo(0, -p.r * 0.7, p.r * 1.6, 0); ctx.quadraticCurveTo(0, p.r * 0.7, -p.r * 1.6, 0); ctx.fill();
            if (p.y > H + 20 || p.x > W + 40) Object.assign(p, make(false), { y: -20, x: rnd(-60, W) });
            break; }
          case 'firefly': {
            p.vx += Math.sin(el * 0.7 + p.ph) * 0.004 * dt; p.vy += Math.cos(el * 0.6 + p.ph * 1.3) * 0.004 * dt;
            p.vx *= 0.995; p.vy *= 0.995; p.x += p.vx * dt * 1.4; p.y += p.vy * dt * 1.4;
            if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20; if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
            const al = (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(el * 1.8 + p.ph))) * (light ? 0.7 : 1);
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
            g.addColorStop(0, col); g.addColorStop(0.25, col); g.addColorStop(1, 'rgba(255,220,120,0)');
            ctx.globalAlpha = al * 0.9; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, 6.28); ctx.fill();
            break; }
          case 'steam': {
            p.y += p.vy * dt; p.x += (p.vx + Math.sin(el * 0.5 + p.ph) * 0.2) * dt; p.r += 0.08 * dt;
            const k = p.life / p.max; const al = Math.sin(Math.min(1, k) * Math.PI) * (light ? 0.1 : 0.12);
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
            g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.globalAlpha = Math.max(0, al); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
            if (k >= 1) Object.assign(p, make(false), { life: 0, y: H + 30 });
            break; }
          case 'ember': {
            p.x += (p.vx + Math.sin(el * 3 + p.ph) * 0.35) * dt; p.y += p.vy * dt; p.vy *= 0.998;
            const k = p.life / p.max; const al = (1 - k) * (0.6 + 0.4 * Math.sin(el * 14 + p.ph));
            ctx.globalAlpha = Math.max(0, al) * (light ? 0.8 : 1); ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = light ? 0 : 8;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 - k * 0.5), 0, 6.28); ctx.fill();
            if (k >= 1 || p.y < -10) Object.assign(p, make(false), { life: 0, y: H + 10 });
            break; }
          case 'bubble': {
            p.y += p.vy * dt; p.x += Math.sin(el * 1.4 + p.ph) * 0.45 * dt;
            ctx.strokeStyle = col; ctx.lineWidth = 1.3; ctx.globalAlpha = light ? 0.35 : 0.5;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.stroke();
            ctx.globalAlpha *= 0.7; ctx.beginPath(); ctx.arc(p.x - p.r * 0.35, p.y - p.r * 0.35, p.r * 0.22, 0, 6.28); ctx.fillStyle = col; ctx.fill();
            if (p.y < -20) Object.assign(p, make(false), { y: H + 20 });
            break; }
          case 'rice': {
            p.x += (p.vx + Math.sin(el + p.ph) * 0.15) * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
            ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = col; ctx.globalAlpha = light ? 0.55 : 0.75;
            ctx.beginPath(); ctx.ellipse(0, 0, p.r * 1.9, p.r * 0.8, 0, 0, 6.28); ctx.fill();
            if (p.y > H + 10) Object.assign(p, make(false), { y: -10 });
            break; }
        }
        ctx.restore();
      }
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('pointermove', onMove); };
  }, [kind, light]);

  return <canvas ref={ref} className="vfx" aria-hidden="true" />;
}
