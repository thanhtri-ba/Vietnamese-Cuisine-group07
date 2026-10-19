import { useEffect, useRef } from 'react';
import { CITY, MAINLAND, PLANE, arc } from './VMap';

export type Spot = 'hn' | 'hue' | 'hcm' | 'sea' | 'world';

const SPOT: Record<Spot, { x: number; y: number; name: string }> = {
  hn: CITY.hn,
  hue: CITY.hue,
  hcm: CITY.hcm,
  sea: { x: 330, y: 40, name: 'East Sea' },
  world: { x: 470, y: 300, name: 'The world' },
};

export interface Flight {
  from: Spot;
  to: Spot;
  /** dòng lớn: tên miền sắp tới */
  title: string;
  /** tên tiếng Việt, hiện nhỏ bên dưới */
  vi: string;
}

/** Chuyển cảnh giữa các slide vùng miền: from-to = chỉ số slide (0-based). */
export const FLIGHTS: Record<string, Flight> = {
  '10-11': { from: 'sea', to: 'hn', title: 'The North', vi: 'Miền Bắc' },
  '11-12': { from: 'hn', to: 'hue', title: 'The Center', vi: 'Miền Trung' },
  '12-13': { from: 'hue', to: 'hcm', title: 'The South', vi: 'Miền Nam' },
  '13-14': { from: 'hcm', to: 'world', title: 'To the world', vi: 'Ra thế giới' },
  '12-11': { from: 'hue', to: 'hn', title: 'The North', vi: 'Miền Bắc' },
  '13-12': { from: 'hcm', to: 'hue', title: 'The Center', vi: 'Miền Trung' },
  '14-13': { from: 'world', to: 'hcm', title: 'The South', vi: 'Miền Nam' },
};

/** Tổng thời gian & thời điểm đổi slide bên dưới (ms) — Deck dùng 2 số này. */
export const FLIGHT_TOTAL = 3600;
export const FLIGHT_COMMIT = 2900;

const T_FLY0 = 450;
const T_FLY1 = 2300;
const T_ZOOM0 = 2150;
/** dải miền (theo trục y bản đồ) để tô sáng khi máy bay hạ cánh */
const BAND: Record<Spot, [number, number]> = { hn: [0, 150], hue: [150, 300], hcm: [300, 475], sea: [0, 150], world: [300, 475] };
const VB = { w: 390, h: 475 };

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

/** Lớp phủ toàn màn hình: bản đồ, máy bay bay từ điểm A tới B, rồi zoom vào điểm đến. */
export default function FlightOverlay({ flight }: { flight: Flight }) {
  const cam = useRef<SVGGElement>(null);
  const plane = useRef<SVGGElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const glow = useRef<SVGPathElement>(null);
  const comet = useRef<SVGPathElement>(null);
  const dest = useRef<SVGGElement>(null);
  const shadow = useRef<SVGGElement>(null);
  const region = useRef<SVGRectElement>(null);
  const a = SPOT[flight.from];
  const b = SPOT[flight.to];
  const d = arc(a, b, flight.from === 'sea' || flight.to === 'world' || flight.from === 'world' ? 0.18 : 0.35);
  const zoomIn = flight.to !== 'world';

  useEffect(() => {
    const g = plane.current;
    const p = trail.current;
    const c = cam.current;
    const sh = shadow.current;
    const gl = glow.current;
    const cm = comet.current;
    const ds = dest.current;
    const rg = region.current;
    if (!g || !p || !c || !sh || !gl || !rg) return;
    const len = p.getTotalLength();
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = now - t0;
      // máy bay
      const k = ease(clamp01((t - T_FLY0) / (T_FLY1 - T_FLY0)));
      const dist = k * len;
      p.style.strokeDasharray = `${dist} ${len + 1}`;
      // đuôi sao chổi: đoạn ngắn sau máy bay dày và sáng hơn
      const tail = Math.min(dist, 70);
      gl.style.strokeDasharray = `0 ${(dist - tail).toFixed(1)} ${tail.toFixed(1)} ${len + 1}`;
      if (cm) { const t2 = Math.min(dist, 26); cm.style.strokeDasharray = `0 ${(dist - t2).toFixed(1)} ${t2.toFixed(1)} ${len + 1}`; }
      if (ds && k > 0.94) ds.classList.add('arrived');
      const pt = p.getPointAtLength(dist);
      const p2 = p.getPointAtLength(Math.min(len, dist + 1));
      const p1 = p.getPointAtLength(Math.max(0, dist - 1));
      const ang = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI + 90;
      const s = 1.25 + Math.sin(Math.PI * k) * 0.55;
      g.setAttribute('transform', `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)}) rotate(${ang.toFixed(1)}) scale(${s.toFixed(3)})`);
      // bóng máy bay trượt trên mặt đất, xa dần khi bay cao
      const off = 4 + Math.sin(Math.PI * k) * 16;
      sh.setAttribute('transform', `translate(${(pt.x + off).toFixed(2)} ${(pt.y + off * 1.4).toFixed(2)}) rotate(${ang.toFixed(1)}) scale(${(s * 0.9).toFixed(3)})`);
      sh.style.opacity = String(0.35 * (1 - k * 0.3));
      // dải miền sáng lên khi sắp hạ cánh
      rg.style.opacity = String(clamp01((k - 0.78) / 0.22) * 0.38);
      // camera: hơi bám theo máy bay, cuối cùng lao vào điểm đến
      const follow = 0.25 * k;
      let cx = VB.w / 2 + (pt.x - VB.w / 2) * follow;
      let cy = VB.h / 2 + (pt.y - VB.h / 2) * follow;
      let sc = 1 + 0.12 * k;
      if (zoomIn) {
        const z = ease(clamp01((t - T_ZOOM0) / (FLIGHT_TOTAL - T_ZOOM0)));
        cx += (b.x - cx) * z;
        cy += (b.y - cy) * z;
        sc += z * 7;
        g.style.opacity = String(1 - z);
      }
      c.setAttribute('transform', `translate(${VB.w / 2} ${VB.h / 2}) scale(${sc.toFixed(3)}) translate(${(-cx).toFixed(2)} ${(-cy).toFixed(2)})`);
      if (t < FLIGHT_TOTAL) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [d, b.x, b.y, zoomIn]);

  const [y0, y1] = BAND[flight.to];
  return (
    <div className="flight" aria-hidden="true" style={{ animationDuration: `${FLIGHT_TOTAL}ms`, ['--ft' as string]: `${FLIGHT_TOTAL}ms` }}>
      <div className="vemb fl-drum" data-s="drum" />
      <div className="fl-head-wrap flight-head">
        <small>
          {a.name} <span>✈</span> {b.name}
        </small>
        <b className="bang">{flight.title}</b>
        <i lang="vi">{flight.vi}</i>
      </div>
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="flight-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" className="fl-grid" />
          </pattern>
          <pattern id="flight-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" className="fl-hatch" />
          </pattern>
          <pattern id="flight-waves" width="30" height="18" patternUnits="userSpaceOnUse">
            <path d="M0 9 q7.5 -8 15 0 t15 0" className="fl-wv" />
          </pattern>
          <linearGradient id="flight-landg" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#FCF5E3" />
            <stop offset="1" stopColor="#E9D9B4" />
          </linearGradient>
          <clipPath id="flight-clip"><path d={MAINLAND} /></clipPath>
          <linearGradient id="flight-band" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#EFAE2B" stopOpacity="0" />
            <stop offset="0.5" stopColor="#EFAE2B" stopOpacity="1" />
            <stop offset="1" stopColor="#EFAE2B" stopOpacity="0" />
          </linearGradient>
          <filter id="flight-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.2" /></filter>
        </defs>
        <g ref={cam}>
          <path className="fl-land" d={MAINLAND} fill="url(#flight-landg)" />
          <g clipPath="url(#flight-clip)" className="fl-divide">
            <line x1="0" y1="150" x2="390" y2="150" />
            <line x1="0" y1="300" x2="390" y2="300" />
          </g>
          <rect ref={region} className="fl-region" x="0" y={y0} width="390" height={y1 - y0} fill="url(#flight-band)" clipPath="url(#flight-clip)" style={{ opacity: 0 }} />
          <ellipse className="fl-land" cx="66" cy="408" rx="5" ry="9" />
          <g className="fl-isles">
            <circle cx="291" cy="217" r="2.2" />
            <circle cx="299" cy="223" r="1.8" />
            <circle cx="304" cy="215" r="2" />
            <circle cx="350" cy="405" r="1.8" />
            <circle cx="360" cy="412" r="2.2" />
            <circle cx="355" cy="422" r="1.6" />
          </g>
          <path className="fl-route" fill="none" d={d} />
          <path ref={glow} className="fl-glow" fill="none" d={d} />
          <path ref={trail} className="fl-trail" fill="none" d={d} />
          <path ref={comet} className="fl-comet" fill="none" d={d} />
          {(['hn', 'hue', 'hcm'] as const).map((c) => (
            <g key={c} ref={c === flight.to ? dest : undefined} className={c === flight.to ? 'fl-city to' : c === flight.from ? 'fl-city from' : 'fl-city'}>
              <circle className="ring" cx={CITY[c].x} cy={CITY[c].y} r="9" />
              <circle className="ring r2" cx={CITY[c].x} cy={CITY[c].y} r="9" />
              <circle className="dot" cx={CITY[c].x} cy={CITY[c].y} r="4.5" />
              <text x={CITY[c].x - 11} y={CITY[c].y + 4} textAnchor="end">
                {CITY[c].name}
              </text>
            </g>
          ))}
          <g ref={shadow} className="fl-shadow" style={{ opacity: 0 }}>
            <path d={PLANE} />
          </g>
          <g ref={plane} className="fl-plane">
            <path d={PLANE} />
          </g>
        </g>
      </svg>
      <div className="fl-drift d1" />
      <div className="fl-drift d2" />
      <div className="fl-cloud c1" />
      <div className="fl-cloud c2" />
      <div className="fl-cloud c3" />
      <div className="fl-cloud c4" />
      <div className="fl-flash" />
    </div>
  );
}
