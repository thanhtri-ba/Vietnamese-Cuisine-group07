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
}

/** Chuyển cảnh giữa các slide vùng miền: from-to = chỉ số slide (0-based). */
export const FLIGHTS: Record<string, Flight> = {
  '10-11': { from: 'sea', to: 'hn', title: 'The North' },
  '11-12': { from: 'hn', to: 'hue', title: 'The Center' },
  '12-13': { from: 'hue', to: 'hcm', title: 'The South' },
  '13-14': { from: 'hcm', to: 'world', title: 'To the world' },
  '12-11': { from: 'hue', to: 'hn', title: 'The North' },
  '13-12': { from: 'hcm', to: 'hue', title: 'The Center' },
  '14-13': { from: 'world', to: 'hcm', title: 'The South' },
};

/** Tổng thời gian & thời điểm đổi slide bên dưới (ms) — Deck dùng 2 số này. */
export const FLIGHT_TOTAL = 2700;
export const FLIGHT_COMMIT = 2100;

const T_FLY0 = 350;
const T_FLY1 = 1800;
const T_ZOOM0 = 1750;
const VB = { w: 390, h: 475 };

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

/** Lớp phủ toàn màn hình: bản đồ, máy bay bay từ điểm A tới B, rồi zoom vào điểm đến. */
export default function FlightOverlay({ flight }: { flight: Flight }) {
  const cam = useRef<SVGGElement>(null);
  const plane = useRef<SVGGElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const a = SPOT[flight.from];
  const b = SPOT[flight.to];
  const d = arc(a, b, flight.from === 'sea' || flight.to === 'world' || flight.from === 'world' ? 0.18 : 0.35);
  const zoomIn = flight.to !== 'world';

  useEffect(() => {
    const g = plane.current;
    const p = trail.current;
    const c = cam.current;
    if (!g || !p || !c) return;
    const len = p.getTotalLength();
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = now - t0;
      // máy bay
      const k = ease(clamp01((t - T_FLY0) / (T_FLY1 - T_FLY0)));
      const dist = k * len;
      p.style.strokeDasharray = `${dist} ${len + 1}`;
      const pt = p.getPointAtLength(dist);
      const p2 = p.getPointAtLength(Math.min(len, dist + 1));
      const p1 = p.getPointAtLength(Math.max(0, dist - 1));
      const ang = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI + 90;
      const s = 1.6 + Math.sin(Math.PI * k) * 1.1;
      g.setAttribute('transform', `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)}) rotate(${ang.toFixed(1)}) scale(${s.toFixed(3)})`);
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

  return (
    <div className="flight" aria-hidden="true" style={{ animationDuration: `${FLIGHT_TOTAL}ms` }}>
      <div className="flight-head">
        <small>
          {a.name} <span>✈</span> {b.name}
        </small>
        <b>{flight.title}</b>
      </div>
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="flight-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" className="fl-grid" />
          </pattern>
        </defs>
        <g ref={cam}>
          <rect x="-400" y="-400" width="1200" height="1300" fill="url(#flight-grid)" />
          <path className="fl-land" d={MAINLAND} />
          <ellipse className="fl-land" cx="66" cy="408" rx="5" ry="9" />
          <g className="fl-isles">
            <circle cx="291" cy="217" r="2.2" />
            <circle cx="299" cy="223" r="1.8" />
            <circle cx="304" cy="215" r="2" />
            <circle cx="350" cy="405" r="1.8" />
            <circle cx="360" cy="412" r="2.2" />
            <circle cx="355" cy="422" r="1.6" />
          </g>
          <path className="fl-route" d={d} />
          <path ref={trail} className="fl-trail" d={d} />
          {(['hn', 'hue', 'hcm'] as const).map((c) => (
            <g key={c} className={c === flight.to ? 'fl-city to' : c === flight.from ? 'fl-city from' : 'fl-city'}>
              <circle className="ring" cx={CITY[c].x} cy={CITY[c].y} r="9" />
              <circle className="dot" cx={CITY[c].x} cy={CITY[c].y} r="4.5" />
              <text x={CITY[c].x + 10} y={CITY[c].y + 4}>
                {CITY[c].name}
              </text>
            </g>
          ))}
          <g ref={plane} className="fl-plane">
            <path d={PLANE} />
          </g>
        </g>
      </svg>
    </div>
  );
}
