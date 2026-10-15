import type { ReactNode } from 'react';

/**
 * Nhân vật nhỏ dùng chung (slide 1, slide 8): thân, tay, chân, khăn — chuyển động bằng CSS
 * qua các class trên phần tử cha .yy-runner (run | carry | push).
 * `cargo` = vật vác trên đầu, vẽ trong hệ toạ độ 64×100, tâm khoảng (32, 13) — được nâng lên trên chóp nón lá.
 * Nhân vật đội nón lá; màu quai nón theo class .pusher (cam) / .chaser (xanh).
 */
export default function RunnerFigure({ cargo, width, height }: { cargo: ReactNode; width: number; height: number }) {
  return (
    <div className="yr-flip">
      <svg viewBox="0 0 64 100" width={width} height={height}>
        <ellipse className="yr-shadow" cx="32" cy="98" rx="16" ry="3" />
        <g className="yr-cargo">
          <g transform="translate(0 -13)">{cargo}</g>
        </g>
        <g className="yr-body">
          <path className="yr-scarf" d="M29 45 C 20 44, 14 48, 6 46 C 12 50, 20 50, 28 48 Z" />
          <g className="yr-leg a">
            <path d="M32 66 L30 82 L34 96" />
          </g>
          <g className="yr-leg b">
            <path d="M32 66 L33 82 L30 96" />
          </g>
          <line className="yr-torso" x1="32" y1="45" x2="32" y2="67" />
          <g className="yr-arms-up">
            <path d="M32 49 L20 37 L21 15" />
            <path d="M32 49 L44 37 L43 15" />
          </g>
          <g className="yr-arms-push">
            <path d="M32 50 L42 54 L52 50" />
            <path d="M32 52 L41 58 L51 55" />
          </g>
          <g className="yr-arms-swing">
            <path className="sa" d="M32 49 L26 58 L30 66" />
            <path className="sb" d="M32 49 L38 58 L42 64" />
          </g>
          <circle className="yr-head" cx="32" cy="36" r="8" />
          <circle cx="35" cy="37" r="1.2" fill="var(--forest)" />
          <path className="yr-band" d="M25.5 31 Q32 48 38.5 31" />
          {/* nón lá */}
          <g className="yr-hat">
            <path className="cone" d="M13 31.5 L32 16 L51 31.5 Q32 35 13 31.5 Z" />
            <path className="weave" d="M19 27 Q32 25 45 27 M24.5 22.6 Q32 21.2 39.5 22.6 M32 16 L32 33" />
          </g>
        </g>
      </svg>
    </div>
  );
}
