import type { CSSProperties } from 'react';

/** Hidden SVG with paint servers shared by several slides (rice-grain pattern). */
export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" } as CSSProperties} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="grain" width="16" height="12" patternUnits="userSpaceOnUse">
          <rect width="16" height="12" fill="#FFFDF7"></rect>
          <ellipse cx="4" cy="3" rx="3.2" ry="1.3" fill="#EFE7D2" transform="rotate(25 4 3)"></ellipse>
          <ellipse cx="12" cy="8" rx="3" ry="1.2" fill="#EFE7D2" transform="rotate(-30 12 8)"></ellipse>
          <ellipse cx="11" cy="2" rx="1.6" ry="1" fill="#F4EEDD"></ellipse>
        </pattern>
      </defs>
    </svg>
  );
}
