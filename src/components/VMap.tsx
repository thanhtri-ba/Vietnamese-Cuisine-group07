import { useEffect, useRef } from 'react';
import { useSlideActive } from './DeckContext';

/** Đường viền Việt Nam (vẽ tay từ toạ độ kinh/vĩ độ chính, phép chiếu đơn giản — mang tính minh hoạ). */
export const MAINLAND =
  'M15.6 42.0C16.3 40.5 23.8 31.5 25.3 30.9C26.9 30.4 33.2 34.6 34.6 35.4C35.9 36.2 39.9 41.2 41.2 40.8C42.5 40.3 48.3 30.9 49.8 30.0C51.3 29.1 57.5 29.8 59.0 30.6C60.6 31.3 66.5 38.8 68.3 39.0C70.0 39.2 77.8 33.9 79.8 33.0C81.8 32.1 90.5 29.5 92.2 28.5C93.8 27.5 98.1 22.3 99.4 21.0C100.6 19.7 106.1 12.7 107.4 12.6C108.7 12.6 113.8 19.3 115.2 20.4C116.6 21.5 122.3 25.1 123.8 25.5C125.4 25.9 132.0 25.3 133.9 25.5C135.8 25.8 146.0 27.0 146.9 28.5C147.8 30.0 144.4 41.5 144.6 43.5C144.8 45.5 147.4 51.0 149.2 52.5C150.9 54.0 162.7 60.3 165.6 61.5C168.5 62.8 182.8 66.3 183.5 67.5C184.1 68.7 175.5 74.2 173.4 75.6C171.3 77.0 160.4 83.2 158.4 84.6C156.4 86.0 150.5 90.7 149.2 92.4C147.9 94.1 144.1 103.1 142.6 105.0C141.0 106.9 132.6 113.1 131.0 114.9C129.4 116.7 124.2 124.4 123.3 126.6C122.4 128.8 120.9 139.6 120.4 141.6C119.9 143.6 116.3 148.7 116.9 150.6C117.6 152.5 126.3 162.4 128.2 164.4C130.1 166.4 138.2 172.8 139.7 174.9C141.1 177.0 143.9 187.2 145.4 189.6C147.0 192.0 156.1 201.8 158.4 204.0C160.7 206.2 170.2 213.7 172.8 216.0C175.4 218.2 188.1 228.9 190.1 231.0C192.0 233.1 194.9 239.6 196.4 241.5C198.0 243.4 207.3 250.6 208.8 253.5C210.3 256.4 213.6 272.1 214.6 276.0C215.5 279.9 219.4 295.8 220.3 300.0C221.3 304.2 226.2 323.2 226.1 327.0C226.0 330.8 220.1 342.2 219.5 345.0C218.9 347.8 219.4 357.6 218.9 360.0C218.4 362.4 214.6 371.9 213.1 373.5C211.7 375.1 203.8 378.4 201.6 379.5C199.4 380.6 189.6 385.5 187.2 387.0C184.8 388.5 175.0 396.2 172.8 397.5C170.6 398.8 163.2 402.0 161.3 402.6C159.4 403.2 151.2 403.8 149.8 405.0C148.4 406.2 145.7 415.7 144.6 417.6C143.5 419.6 138.6 426.6 136.8 428.4C135.0 430.2 124.7 437.6 122.4 439.5C120.1 441.4 112.1 449.2 109.4 450.6C106.8 452.0 92.0 457.4 90.7 456.6C89.4 455.8 93.1 443.9 93.6 441.0C94.1 438.2 96.0 424.8 96.5 422.4C97.0 420.0 100.0 413.8 99.4 412.5C98.8 411.2 90.7 407.4 89.3 406.5C87.8 405.6 81.8 402.3 82.1 401.4C82.3 400.5 90.7 396.7 92.2 395.4C93.6 394.2 97.7 387.2 99.4 386.4C101.0 385.6 110.4 385.7 112.3 385.5C114.2 385.3 121.0 384.6 122.4 384.0C123.8 383.4 129.5 379.6 129.6 378.0C129.7 376.5 122.4 366.8 123.3 365.4C124.1 364.0 137.5 362.6 139.7 361.5C141.9 360.4 147.1 353.9 149.8 352.5C152.4 351.1 169.7 347.0 171.4 345.0C173.0 343.0 169.6 331.8 169.3 328.5C169.1 325.3 168.3 309.9 168.5 306.0C168.6 302.1 171.1 284.8 171.4 282.0C171.6 279.2 171.7 274.8 171.4 273.0C171.0 271.3 167.3 262.9 167.0 261.0C166.8 259.1 168.8 252.5 168.5 250.5C168.1 248.5 163.8 239.0 162.7 237.0C161.6 235.0 157.1 228.1 155.5 226.5C154.0 224.9 146.2 220.1 144.0 217.5C141.8 214.9 132.0 198.6 129.6 195.0C127.2 191.4 117.5 177.4 115.2 174.0C112.9 170.6 104.9 157.0 102.2 154.5C99.6 152.0 86.4 145.6 83.5 144.0C80.6 142.4 68.3 137.3 67.7 135.6C67.1 133.9 74.7 125.0 76.3 123.6C77.9 122.2 86.6 119.7 87.0 118.5C87.3 117.3 82.1 111.6 80.6 109.5C79.2 107.4 71.2 94.4 69.1 93.0C67.1 91.6 58.2 92.8 56.2 92.4C54.1 92.0 46.2 89.9 44.6 88.5C43.1 87.0 38.6 77.0 37.4 75.0C36.2 73.0 32.0 66.6 30.2 64.5C28.4 62.4 17.1 51.4 15.8 49.5C14.6 47.6 14.8 43.6 15.6 42.0Z';

export type City = 'hn' | 'hue' | 'hcm';
export const CITY: Record<City | 'sea', { x: number; y: number; name: string }> = {
  hn: { x: 122.4, y: 83.1, name: 'Hà Nội' },
  hue: { x: 172.2, y: 220.2, name: 'Huế' },
  hcm: { x: 146.9, y: 390.6, name: 'TP.HCM' },
  sea: { x: 250, y: 150, name: '' },
};

/** Đường bay cong ra phía biển giữa hai điểm. */
export function arc(a: { x: number; y: number }, b: { x: number; y: number }, bend = 0.35): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  // pháp tuyến hướng ra biển (sang phải)
  let nx = -dy;
  let ny = dx;
  if (nx < 0) {
    nx = -nx;
    ny = -ny;
  }
  return `M${a.x} ${a.y} Q${(mx + nx * bend).toFixed(1)} ${(my + ny * bend).toFixed(1)} ${b.x} ${b.y}`;
}

/** Các chặng bay theo từng slide: "" = toàn tuyến Bắc → Trung → Nam; n/c/s = bay tới miền tương ứng. */
const LEGS: Record<string, [keyof typeof CITY, keyof typeof CITY][]> = {
  '': [
    ['hn', 'hue'],
    ['hue', 'hcm'],
  ],
  n: [['sea', 'hn']],
  c: [['hn', 'hue']],
  s: [['hue', 'hcm']],
};
const TARGET: Record<string, City[]> = { '': ['hn', 'hue', 'hcm'], n: ['hn'], c: ['hue'], s: ['hcm'] };

export const PLANE = 'M0 -11 C1.6 -11 2 -9 2 -6 L2 -2 L11 3.5 L11 6 L2 3 L1.6 8 L4.5 10.5 L4.5 12 L0 10.8 L-4.5 12 L-4.5 10.5 L-1.6 8 L-2 3 L-11 6 L-11 3.5 L-2 -2 L-2 -6 C-2 -9 -1.6 -11 0 -11 Z';

/**
 * Bản đồ Việt Nam có máy bay bay giữa các miền. Giữ nguyên API cũ: `region` = "n" | "c" | "s" | "".
 * Máy bay chạy bằng requestAnimationFrame mỗi khi slide được mở, tắt khi rời slide.
 */
export default function VMap({ region = '' }: { region?: string }) {
  const active = useSlideActive();
  const legs = LEGS[region] ?? LEGS[''];
  const targets = TARGET[region] ?? TARGET[''];
  const plane = useRef<SVGGElement>(null);
  const trails = useRef<(SVGPathElement | null)[]>([]);
  const cities = useRef<SVGGElement>(null);

  useEffect(() => {
    const g = plane.current;
    const paths = (trails.current ?? []).slice(0, legs.length).filter((p): p is SVGPathElement => !!p);
    if (!g || paths.length !== legs.length) return;
    const lens = paths.map((p) => p.getTotalLength());
    const reset = () => {
      paths.forEach((p, i) => {
        p.style.strokeDasharray = `0 ${lens[i] + 1}`;
      });
      g.style.opacity = '0';
      cities.current?.querySelectorAll('.vn-city').forEach((c) => c.classList.remove('lit'));
    };
    reset();
    if (!active) return;

    // bản đồ nhỏ (n/c/s): hiệu ứng chuyển cảnh đã bay rồi, ở đây chỉ hiện kết quả
    const reduce = region !== '' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const START = 900; // chờ tiêu đề xuất hiện
    const FLY = region === '' ? 2000 : 2400;
    const STOP = 600;
    const light = (c: string) => cities.current?.querySelector(`[data-c="${c}"]`)?.classList.add('lit');

    if (reduce) {
      paths.forEach((p, i) => (p.style.strokeDasharray = `${lens[i]} 0`));
      targets.forEach(light);
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const tick = (now: number) => {
      const t = now - t0 - START;
      if (t >= 0) {
        const per = FLY + STOP;
        const i = Math.min(legs.length - 1, Math.floor(t / per));
        const local = Math.min(1, (t - i * per) / FLY);
        if (legs[0][0] !== 'sea') light(legs[0][0]);
        for (let k = 0; k < i; k++) {
          paths[k].style.strokeDasharray = `${lens[k]} 0`;
          light(legs[k][1]);
        }
        const p = paths[i];
        const d = ease(local) * lens[i];
        p.style.strokeDasharray = `${d} ${lens[i] + 1}`;
        const a = p.getPointAtLength(d);
        const b = p.getPointAtLength(Math.min(lens[i], d + 1));
        const c = p.getPointAtLength(Math.max(0, d - 1));
        const ang = (Math.atan2(b.y - c.y, b.x - c.x) * 180) / Math.PI + 90;
        // lớn dần khi cất cánh, nhỏ lại khi hạ cánh
        const s = (region ? 2.2 : 1.8) * (0.75 + Math.sin(Math.PI * local) * 0.45);
        g.setAttribute('transform', `translate(${a.x.toFixed(2)} ${a.y.toFixed(2)}) rotate(${ang.toFixed(1)}) scale(${s.toFixed(3)})`);
        g.style.opacity = local >= 1 && i === legs.length - 1 ? '0' : '1';
        if (local >= 1) light(legs[i][1]);
        if (local >= 1 && i === legs.length - 1) return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, region, legs, targets]);

  return (
    <svg className={`vmap vn${region ? ' vn-mini' : ''}`} viewBox="0 0 390 475" role="img" aria-label="Bản đồ Việt Nam với đường bay Hà Nội – Huế – TP.HCM">
      <defs>
        <pattern id={`vn-hatch-${region || 'all'}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="vn-hatch" />
        </pattern>
      </defs>
      <path className="vn-land" d={MAINLAND} />
      <path className="vn-land-hatch" d={MAINLAND} fill={`url(#vn-hatch-${region || 'all'})`} />
      {/* đảo */}
      <ellipse className="vn-land" cx="66" cy="408" rx="5" ry="9" />
      <circle className="vn-land" cx="144" cy="453" r="3" />
      <g className="vn-isles">
        <circle cx="291" cy="217" r="2.4" />
        <circle cx="299" cy="223" r="2" />
        <circle cx="304" cy="215" r="2.2" />
        <circle cx="296" cy="229" r="1.8" />
        <text x="298" y="250" textAnchor="middle">Q.đ Hoàng Sa</text>
        <circle cx="350" cy="405" r="2" />
        <circle cx="360" cy="412" r="2.4" />
        <circle cx="355" cy="422" r="1.8" />
        <circle cx="368" cy="420" r="2" />
        <circle cx="346" cy="417" r="1.6" />
        <text x="357" y="444" textAnchor="middle">Q.đ Trường Sa</text>
      </g>
      <text className="vn-sea" x="268" y="330" textAnchor="middle">Biển Đông</text>

      {legs.map(([a, b], i) => (
        <path
          key={`${a}-${b}`}
          ref={(el: SVGPathElement | null) => {
            if (trails.current) trails.current[i] = el;
          }}
          className="vn-trail"
          d={arc(CITY[a], CITY[b], a === 'sea' ? 0.15 : 0.35)}
        />
      ))}

      <g ref={cities}>
        {(['hn', 'hue', 'hcm'] as City[]).map((c) => (
          <g key={c} className={targets.includes(c) ? 'vn-city target' : 'vn-city'} data-c={c}>
            <circle className="ring" cx={CITY[c].x} cy={CITY[c].y} r="11" />
            <circle className="dot" cx={CITY[c].x} cy={CITY[c].y} r="6" />
            <text x={CITY[c].x - 14} y={CITY[c].y + 6} textAnchor="end">
              {CITY[c].name}
            </text>
          </g>
        ))}
      </g>

      <g ref={plane} className="vn-plane" style={{ opacity: 0 }}>
        <path d={PLANE} />
      </g>
    </svg>
  );
}
