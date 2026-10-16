import type { ReactNode } from 'react';

/**
 * Shared character used by slides 1 and 8 and by every transition scene.
 * The body is a pre-rendered 3D sprite (see styles/chars.css): the character set comes from the wrapper's
 * class (.chaser, .thief, .police, .v3, .v4; default = the kid) and the animation from the pose class
 * (run | carry | push | pull | lift | cheer | stand | sit | kick | punch | fall | bow | inhale | blow | fan | hang).
 * `cargo` = object carried overhead, drawn in a 64×100 coordinate system, centred around (32, 13).
 * `hat` is kept for API compatibility; the hat is baked into the sprite for each character set.
 */
export default function RunnerFigure({ cargo, width, height }: { cargo: ReactNode; width: number; height: number; hat?: 'nonla' | 'police' | 'thief' }) {
  return (
    <div className="yr-flip">
      <svg viewBox="0 0 64 100" width={width} height={height}>
        <ellipse className="yr-shadow" cx="32" cy="98" rx="16" ry="3" />
      </svg>
      <div className="yr-spr" />
      <svg viewBox="0 0 64 100" width={width} height={height}>
        <g className="yr-cargo">
          <g transform="translate(0 -13)">{cargo}</g>
        </g>
      </svg>
    </div>
  );
}
