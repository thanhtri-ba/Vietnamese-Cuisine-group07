import type { CSSProperties } from 'react';

/** Stylized North–Central–South route. `region` highlights one stop: "n" | "c" | "s" | "". */
export default function VMap({ region = '' }: { region?: string }) {
  return (
    <svg className="vmap" viewBox="0 0 240 470" role="img" aria-label="Stylized route of Vietnam from North to South">
      <path className="route" pathLength="1" d="M120 40 C 60 70, 70 120, 130 160 C 190 200, 200 250, 170 300 C 140 350, 90 380, 100 430"></path>
      <g className={region === "n" ? "stop on" : "stop"} data-r="n" style={{ "--i": "0" } as CSSProperties}>
        <circle cx="120" cy="40" r="15"></circle>
        <text x="146" y="48">North</text>
      </g>
      <g className={region === "c" ? "stop on" : "stop"} data-r="c" style={{ "--i": "1" } as CSSProperties}>
        <circle cx="187" cy="240" r="15"></circle>
        <text x="160" y="248" textAnchor="end">Central</text>
      </g>
      <g className={region === "s" ? "stop on" : "stop"} data-r="s" style={{ "--i": "2" } as CSSProperties}>
        <circle cx="100" cy="430" r="15"></circle>
        <text x="126" y="438">South</text>
      </g>
    </svg>
  );
}
