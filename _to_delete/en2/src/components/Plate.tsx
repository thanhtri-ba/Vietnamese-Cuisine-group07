import type { CSSProperties } from 'react';

/** Illustrated top-down plate of broken rice. Numbered badges show only inside a `.labeled` wrapper. */
export default function Plate() {
  return (
    <svg className="plate-art" viewBox="0 0 400 400" role="img" aria-label="Illustration of a plate of broken rice: broken rice, charcoal-grilled pork, a fried egg, egg meatloaf, shredded pork skin, cucumber, tomato, pickles and a bowl of sweet-and-sour fish sauce">
      <g className="part" style={{ "--i": "0" } as CSSProperties}>
        <circle cx="200" cy="200" r="184" fill="#FFFFFF" stroke="#E7DFCB" strokeWidth="8"></circle>
        <circle cx="200" cy="200" r="150" fill="#FBF7EE"></circle>
      </g>
      <g className="part" style={{ "--i": "1" } as CSSProperties}>
        <path d="M78 232 C68 170 120 128 176 134 C236 140 266 186 256 236 C246 292 190 312 144 302 C104 294 84 266 78 232Z" fill="url(#grain)" stroke="#E9E1CC" strokeWidth="2"></path>
        <g fill="#4E9A3A">
          <circle cx="128" cy="184" r="4"></circle>
          <circle cx="152" cy="204" r="3.5"></circle>
          <circle cx="172" cy="176" r="4"></circle>
          <circle cx="118" cy="218" r="3.5"></circle>
          <circle cx="162" cy="232" r="4"></circle>
          <circle cx="140" cy="252" r="3.5"></circle>
          <circle cx="190" cy="206" r="3.5"></circle>
          <circle cx="108" cy="246" r="4"></circle>
        </g>
        <g fill="#7CC05A">
          <circle cx="140" cy="194" r="2.6"></circle>
          <circle cx="182" cy="222" r="2.6"></circle>
          <circle cx="126" cy="236" r="2.6"></circle>
          <circle cx="160" cy="188" r="2.6"></circle>
        </g>
      </g>
      <g className="part" style={{ "--i": "2" } as CSSProperties}>
        <g transform="rotate(20 272 132)">
          <rect x="196" y="100" width="160" height="66" rx="30" fill="#7A3E1C"></rect>
          <rect x="201" y="105" width="150" height="56" rx="26" fill="#A55A2A"></rect>
          <path d="M226 106 L216 160 M256 106 L246 160 M286 106 L276 160 M316 106 L306 160 M342 110 L334 156" stroke="#4A2412" strokeWidth="7" strokeLinecap="round"></path>
          <ellipse cx="270" cy="116" rx="54" ry="5" fill="#FFFFFF" opacity=".2"></ellipse>
          <rect x="352" y="124" width="22" height="16" rx="7" fill="#F3E7CF"></rect>
        </g>
      </g>
      <g className="part" style={{ "--i": "3" } as CSSProperties}>
        <path d="M58 120 C58 86 98 70 124 80 C150 70 176 96 166 126 C160 156 124 162 98 156 C68 156 58 142 58 120Z" fill="#FFFFFF" stroke="#EFE6D3" strokeWidth="2"></path>
        <circle cx="112" cy="117" r="22" fill="#F2A51F"></circle>
        <circle cx="104" cy="109" r="6" fill="#FFD27A"></circle>
      </g>
      <g className="part" style={{ "--i": "4" } as CSSProperties}>
        <g transform="rotate(-8 282 246)">
          <rect x="242" y="212" width="80" height="66" rx="6" fill="#E3A548"></rect>
          <rect x="242" y="212" width="80" height="18" rx="6" fill="#F4C542"></rect>
          <g fill="#C27A2C">
            <circle cx="258" cy="250" r="3"></circle>
            <circle cx="286" cy="258" r="3"></circle>
            <circle cx="302" cy="242" r="3"></circle>
            <circle cx="270" cy="266" r="3"></circle>
            <circle cx="308" cy="266" r="2.5"></circle>
          </g>
        </g>
      </g>
      <g className="part" style={{ "--i": "5" } as CSSProperties}>
        <ellipse cx="168" cy="314" rx="38" ry="20" fill="#F5E9C4"></ellipse>
        <path d="M146 306 q10 -8 20 0 M160 318 q12 -6 22 2 M138 318 q10 -10 22 -2 M176 300 q8 -8 18 0 M170 326 q10 -6 20 0 M150 328 q12 -8 22 -1 M186 314 q9 -7 18 1 M156 296 q10 -6 18 0" stroke="#D9C38A" strokeWidth="2.6" fill="none" strokeLinecap="round"></path>
      </g>
      <g className="part" style={{ "--i": "6" } as CSSProperties}>
        <g>
          <circle cx="300" cy="302" r="17" fill="#5E9A3D"></circle>
          <circle cx="300" cy="302" r="13" fill="#DCEFC0"></circle>
          <circle cx="300" cy="302" r="5" fill="#C4E39E"></circle>
        </g>
        <g>
          <circle cx="326" cy="276" r="17" fill="#5E9A3D"></circle>
          <circle cx="326" cy="276" r="13" fill="#DCEFC0"></circle>
          <circle cx="326" cy="276" r="5" fill="#C4E39E"></circle>
        </g>
        <g>
          <circle cx="262" cy="322" r="17" fill="#D9452E"></circle>
          <circle cx="262" cy="322" r="12" fill="#EF7A5C"></circle>
          <circle cx="257" cy="318" r="2" fill="#FBE3B0"></circle>
          <circle cx="267" cy="326" r="2" fill="#FBE3B0"></circle>
        </g>
        <g transform="rotate(-25 338 222)">
          <rect x="318" y="210" width="40" height="7" rx="3" fill="#ED7843"></rect>
          <rect x="320" y="221" width="36" height="7" rx="3" fill="#FFF6E2" stroke="#EADFC6"></rect>
          <rect x="316" y="232" width="38" height="7" rx="3" fill="#ED7843"></rect>
        </g>
      </g>
      <g className="part" style={{ "--i": "7" } as CSSProperties}>
        <circle cx="336" cy="342" r="44" fill="#FFFFFF" stroke="#E7DFCB" strokeWidth="6"></circle>
        <circle cx="336" cy="342" r="34" fill="#C98A2B"></circle>
        <g fill="#D93A2B">
          <rect x="322" y="330" width="6" height="3" rx="1.5"></rect>
          <rect x="342" y="348" width="6" height="3" rx="1.5"></rect>
          <rect x="332" y="356" width="5" height="3" rx="1.5"></rect>
          <rect x="348" y="332" width="5" height="3" rx="1.5"></rect>
        </g>
        <g fill="#FFF3D6">
          <circle cx="330" cy="346" r="2.4"></circle>
          <circle cx="344" cy="338" r="2.4"></circle>
          <circle cx="338" cy="328" r="2"></circle>
        </g>
      </g>
      <path className="steam" style={{ "--i": "0" } as CSSProperties} d="M150 112 q-10 -14 0 -28 q10 -14 0 -28"></path>
      <path className="steam" style={{ "--i": "1" } as CSSProperties} d="M180 118 q-10 -14 0 -28 q10 -14 0 -28"></path>
      <g className="badge" style={{ "--i": "0" } as CSSProperties}>
        <circle cx="196" cy="262" r="15"></circle>
        <text x="196" y="262">1</text>
      </g>
      <g className="badge" style={{ "--i": "1" } as CSSProperties}>
        <circle cx="280" cy="118" r="15"></circle>
        <text x="280" y="118">2</text>
      </g>
      <g className="badge" style={{ "--i": "2" } as CSSProperties}>
        <circle cx="210" cy="320" r="15"></circle>
        <text x="210" y="320">3</text>
      </g>
      <g className="badge" style={{ "--i": "3" } as CSSProperties}>
        <circle cx="286" cy="246" r="15"></circle>
        <text x="286" y="246">4</text>
      </g>
      <g className="badge" style={{ "--i": "4" } as CSSProperties}>
        <circle cx="70" cy="96" r="15"></circle>
        <text x="70" y="96">5</text>
      </g>
      <g className="badge" style={{ "--i": "5" } as CSSProperties}>
        <circle cx="360" cy="200" r="15"></circle>
        <text x="360" y="200">6</text>
      </g>
      <g className="badge" style={{ "--i": "6" } as CSSProperties}>
        <circle cx="300" cy="302" r="15"></circle>
        <text x="300" y="302">7</text>
      </g>
      <g className="badge" style={{ "--i": "7" } as CSSProperties}>
        <circle cx="126" cy="196" r="15"></circle>
        <text x="126" y="196">8</text>
      </g>
      <g className="badge" style={{ "--i": "8" } as CSSProperties}>
        <circle cx="336" cy="342" r="15"></circle>
        <text x="336" y="342">9</text>
      </g>
    </svg>
  );
}
