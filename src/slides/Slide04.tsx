import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import CountUp from '../components/CountUp';

/** Slide 4: Vietnamese food around the world */
export default function Slide04() {
  return (
    <Slide index={3} className="band forest flat" t="wipe" who={0} labelledBy="t4">
      <svg className="flatlay" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="fl-vig" cx="50%" cy="50%" r="72%">
            <stop offset="45%" stopColor="#000" stopOpacity="0"></stop>
            <stop offset="100%" stopColor="#000" stopOpacity=".55"></stop>
          </radialGradient>
          <radialGradient id="fl-center" cx="50%" cy="50%" r="40%">
            <stop offset="0" stopColor="#0f3328" stopOpacity=".55"></stop>
            <stop offset="100%" stopColor="#0f3328" stopOpacity="0"></stop>
          </radialGradient>
          <radialGradient id="fl-bowl" cx="45%" cy="40%" r="60%">
            <stop offset="0" stopColor="#FBF7EE"></stop>
            <stop offset="1" stopColor="#CFC5B0"></stop>
          </radialGradient>
          <radialGradient id="fl-broth" cx="45%" cy="40%" r="65%">
            <stop offset="0" stopColor="#E2AE62"></stop>
            <stop offset=".7" stopColor="#B9772F"></stop>
            <stop offset="1" stopColor="#8A4E1D"></stop>
          </radialGradient>
          <linearGradient id="fl-bread" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F0B866"></stop>
            <stop offset=".6" stopColor="#C9792F"></stop>
            <stop offset="1" stopColor="#9A5522"></stop>
          </linearGradient>
          <radialGradient id="fl-plate" cx="45%" cy="40%" r="60%">
            <stop offset="0" stopColor="#F6F1E6"></stop>
            <stop offset="1" stopColor="#D3CAB6"></stop>
          </radialGradient>
          <linearGradient id="fl-chili" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F0563F"></stop>
            <stop offset="1" stopColor="#A81E14"></stop>
          </linearGradient>
          <symbol id="fl-leaf" viewBox="0 -22 84 44" overflow="visible">
            <path d="M0 0 C18 -20 60 -22 84 0 C60 22 18 20 0 0Z" fill="#3F8A3A"></path>
            <path d="M3 0 L78 0 M22 0 L32 -9 M38 0 L48 -10 M54 0 L62 -8 M22 0 L32 9 M38 0 L48 10 M54 0 L62 8" stroke="#2C6A28" strokeWidth="1.6" fill="none"></path>
          </symbol>
          <symbol id="fl-herb" viewBox="0 -14 52 28" overflow="visible">
            <path d="M0 0 C12 -14 36 -14 52 0 C36 14 12 14 0 0Z" fill="#6DB14E"></path>
            <path d="M2 0 L48 0" stroke="#4A8A35" strokeWidth="1.2"></path>
          </symbol>
          <symbol id="fl-chilis" viewBox="0 0 130 34" overflow="visible">
            <path d="M14 17 C34 2 96 3 124 15 C98 27 36 32 14 17Z" fill="url(#fl-chili)"></path>
            <path d="M30 12 C60 6 96 8 116 13" stroke="#FF9C86" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"></path>
            <path d="M14 17 C6 15 2 9 4 3" stroke="#4E8A2E" strokeWidth="5" fill="none" strokeLinecap="round"></path>
          </symbol>
          <symbol id="fl-lime" viewBox="-46 -46 92 92" overflow="visible">
            <circle r="44" fill="#4E8A2E"></circle>
            <circle r="38" fill="#B7D96A"></circle>
            <circle r="34" fill="#D7EA8A"></circle>
            <g stroke="#F4FAD8" strokeWidth="2.4">
              <path d="M0 -33 V33 M-33 0 H33 M-23 -23 L23 23 M23 -23 L-23 23"></path>
            </g>
            <circle r="4" fill="#F4FAD8"></circle>
          </symbol>
          <symbol id="fl-anise" viewBox="-40 -40 80 80" overflow="visible">
            <g fill="#7A3E1C">
              <ellipse rx="9" ry="30" transform="rotate(0)" cy="-12"></ellipse>
              <ellipse rx="9" ry="30" cy="-12" transform="rotate(45)"></ellipse>
              <ellipse rx="9" ry="30" cy="-12" transform="rotate(90)"></ellipse>
              <ellipse rx="9" ry="30" cy="-12" transform="rotate(135)"></ellipse>
              <ellipse rx="9" ry="30" cy="-12" transform="rotate(180)"></ellipse>
              <ellipse rx="9" ry="30" cy="-12" transform="rotate(225)"></ellipse>
              <ellipse rx="9" ry="30" cy="-12" transform="rotate(270)"></ellipse>
              <ellipse rx="9" ry="30" cy="-12" transform="rotate(315)"></ellipse>
            </g>
            <g fill="#C98A4B">
              <ellipse rx="3.5" ry="6" cy="-26"></ellipse>
              <ellipse rx="3.5" ry="6" cy="-26" transform="rotate(90)"></ellipse>
              <ellipse rx="3.5" ry="6" cy="-26" transform="rotate(180)"></ellipse>
              <ellipse rx="3.5" ry="6" cy="-26" transform="rotate(270)"></ellipse>
            </g>
            <circle r="7" fill="#5A2C12"></circle>
          </symbol>
        </defs>
        <rect width="1600" height="900" fill="#1b4d3e"></rect>
        <g stroke="#143c30" strokeWidth="3" opacity=".9">
          <path d="M0 150 H1600 M0 312 H1600 M0 468 H1600 M0 630 H1600 M0 790 H1600"></path>
        </g>
        <g fill="none" stroke="#24604d" strokeWidth="2" opacity=".55">
          <path d="M0 70 C200 60 420 86 700 72 S1200 58 1600 80"></path>
          <path d="M0 230 C260 220 520 246 820 232 S1300 220 1600 238"></path>
          <path d="M0 395 C240 382 560 404 860 392 S1320 380 1600 398"></path>
          <path d="M0 550 C300 540 600 562 900 548 S1360 536 1600 556"></path>
          <path d="M0 712 C220 702 520 724 800 710 S1280 698 1600 716"></path>
          <path d="M0 850 C260 842 560 860 880 848 S1320 838 1600 856"></path>
        </g>
        <rect width="1600" height="900" fill="url(#fl-center)"></rect>
        <g className="fl-g fl-tl">
          <g transform="translate(150 150)">
            <circle r="186" fill="#0d2e24" opacity=".45" transform="translate(14 16)"></circle>
            <circle r="180" fill="url(#fl-bowl)"></circle>
            <circle r="164" fill="none" stroke="#2F5D8A" strokeWidth="7" strokeDasharray="22 12"></circle>
            <circle r="146" fill="url(#fl-broth)"></circle>
            <g fill="none" stroke="#F7EBD0" strokeWidth="6" strokeLinecap="round" opacity=".9">
              <path d="M-110 30 C-60 -10 -20 60 30 20 S110 -10 120 40"></path>
              <path d="M-100 70 C-50 40 0 100 60 60"></path>
              <path d="M-120 -10 C-80 -40 -40 10 0 -20"></path>
            </g>
            <g>
              <ellipse cx="-30" cy="-60" rx="52" ry="26" fill="#8C4A3A" transform="rotate(-15 -30 -60)"></ellipse>
              <ellipse cx="-30" cy="-60" rx="38" ry="15" fill="#B0705E" transform="rotate(-15 -30 -60)"></ellipse>
              <ellipse cx="40" cy="-30" rx="50" ry="25" fill="#7E4032" transform="rotate(20 40 -30)"></ellipse>
              <ellipse cx="40" cy="-30" rx="36" ry="14" fill="#A8685A" transform="rotate(20 40 -30)"></ellipse>
              <ellipse cx="-60" cy="40" rx="44" ry="22" fill="#8C4A3A" transform="rotate(35 -60 40)"></ellipse>
            </g>
            <g fill="none" stroke="#7CC05A" strokeWidth="4">
              <circle cx="10" cy="20" r="7"></circle>
              <circle cx="34" cy="44" r="6"></circle>
              <circle cx="-14" cy="0" r="6"></circle>
              <circle cx="70" cy="20" r="7"></circle>
              <circle cx="-40" cy="-10" r="5"></circle>
            </g>
            <use href="#fl-leaf" x="50" y="70" width="80" height="40" transform="rotate(-30 90 90)"></use>
            <use href="#fl-leaf" x="-10" y="80" width="70" height="36" transform="rotate(20 25 98)"></use>
            <g fill="#D93A2B">
              <circle cx="92" cy="-70" r="9"></circle>
              <circle cx="110" cy="-46" r="8"></circle>
            </g>
            <g fill="#FCE3B0">
              <circle cx="92" cy="-70" r="2.5"></circle>
              <circle cx="110" cy="-46" r="2.5"></circle>
            </g>
            <g className="fl-steam" fill="none" stroke="#FFFAEE" strokeWidth="5" strokeLinecap="round">
              <path style={{ "--i": "0" } as CSSProperties} d="M-40 -40 q-18 -26 0 -52 q18 -26 0 -52"></path>
              <path style={{ "--i": "1" } as CSSProperties} d="M10 -30 q-18 -26 0 -52 q18 -26 0 -52"></path>
              <path style={{ "--i": "2" } as CSSProperties} d="M60 -50 q-18 -26 0 -52 q18 -26 0 -52"></path>
            </g>
          </g>
          <use href="#fl-lime" x="300" y="300" width="92" height="92" transform="rotate(20 346 346)"></use>
          <use href="#fl-anise" x="370" y="40" width="70" height="70"></use>
          <use href="#fl-chilis" x="20" y="360" width="120" height="32" transform="rotate(-25 80 376)"></use>
        </g>
        <g className="fl-g fl-tr">
          <g transform="translate(1470 110) rotate(-16)">
            <ellipse rx="250" ry="78" fill="#0d2e24" opacity=".45" transform="translate(14 18)"></ellipse>
            <path d="M-236 18 C-200 70 200 74 240 16 L236 34 C190 92 -190 92 -232 36Z" fill="#E8DCC0"></path>
            <g>
              <path d="M-200 30 L-150 52 L-110 30 L-60 54 L-20 30 L30 54 L70 30 L120 52 L170 30" stroke="#ED7843" strokeWidth="9" fill="none" strokeLinejoin="round"></path>
              <path d="M-210 40 H190" stroke="#6FAE4A" strokeWidth="11" strokeLinecap="round"></path>
            </g>
            <use href="#fl-herb" x="-150" y="38" width="52" height="28" transform="rotate(30 -124 52)"></use>
            <use href="#fl-herb" x="40" y="42" width="52" height="28" transform="rotate(-25 66 56)"></use>
            <use href="#fl-herb" x="150" y="30" width="48" height="26" transform="rotate(15 174 43)"></use>
            <path d="M-246 6 C-246 -70 246 -70 246 6 C200 40 -200 40 -246 6Z" fill="url(#fl-bread)"></path>
            <g fill="#F6D598" opacity=".9">
              <ellipse cx="-150" cy="-22" rx="44" ry="9" transform="rotate(-18 -150 -22)"></ellipse>
              <ellipse cx="-50" cy="-28" rx="46" ry="9" transform="rotate(-18 -50 -28)"></ellipse>
              <ellipse cx="50" cy="-28" rx="46" ry="9" transform="rotate(-18 50 -28)"></ellipse>
              <ellipse cx="150" cy="-22" rx="44" ry="9" transform="rotate(-18 150 -22)"></ellipse>
            </g>
          </g>
          <use href="#fl-chilis" x="1150" y="290" width="130" height="34" transform="rotate(12 1215 307)"></use>
          <use href="#fl-anise" x="1520" y="300" width="74" height="74" transform="rotate(20 1557 337)"></use>
          <use href="#fl-leaf" x="1100" y="40" width="84" height="44" transform="rotate(-40 1142 62)"></use>
        </g>
        <g className="fl-g fl-bl">
          <g transform="translate(230 770)">
            <circle r="196" fill="#0d2e24" opacity=".45" transform="translate(14 16)"></circle>
            <circle r="190" fill="url(#fl-plate)"></circle>
            <g transform="rotate(-20)">
              <g transform="translate(-10 -70)">
                <rect x="-120" y="-38" width="240" height="76" rx="38" fill="#F1F6E6"></rect>
                <path d="M-100 -10 C-60 -30 -20 10 20 -12 S80 -24 100 -6" stroke="#79B957" strokeWidth="16" fill="none" strokeLinecap="round" opacity=".85"></path>
                <path d="M-80 10 c12 -18 34 -18 40 0 M-10 12 c12 -18 34 -18 40 0 M60 8 c12 -18 34 -18 40 0" stroke="#F08A6B" strokeWidth="9" fill="none" strokeLinecap="round"></path>
                <rect x="-120" y="-38" width="240" height="76" rx="38" fill="#FFFFFF" opacity=".35"></rect>
              </g>
              <g transform="translate(0 20)">
                <rect x="-120" y="-38" width="240" height="76" rx="38" fill="#F1F6E6"></rect>
                <path d="M-100 -8 C-60 -28 -20 12 20 -10 S80 -22 100 -4" stroke="#79B957" strokeWidth="16" fill="none" strokeLinecap="round" opacity=".85"></path>
                <path d="M-84 12 c12 -18 34 -18 40 0 M-14 14 c12 -18 34 -18 40 0 M56 10 c12 -18 34 -18 40 0" stroke="#F08A6B" strokeWidth="9" fill="none" strokeLinecap="round"></path>
                <rect x="-120" y="-38" width="240" height="76" rx="38" fill="#FFFFFF" opacity=".35"></rect>
              </g>
            </g>
            <g transform="translate(110 110)">
              <circle r="56" fill="#F6F1E6" stroke="#CFC5B0" strokeWidth="4"></circle>
              <circle r="44" fill="#6B3A1E"></circle>
              <g fill="#E2B44C">
                <circle cx="-12" cy="-8" r="4"></circle>
                <circle cx="10" cy="4" r="4"></circle>
                <circle cx="2" cy="-18" r="3.5"></circle>
                <circle cx="-6" cy="14" r="3.5"></circle>
                <circle cx="18" cy="-12" r="3"></circle>
              </g>
              <circle cx="12" cy="20" r="4" fill="#D93A2B"></circle>
            </g>
          </g>
          <use href="#fl-herb" x="420" y="760" width="60" height="32" transform="rotate(-30 450 776)"></use>
          <use href="#fl-anise" x="450" y="830" width="64" height="64"></use>
        </g>
        <g className="fl-g fl-br">
          <g className="fl-sway">
            <use href="#fl-leaf" x="1300" y="660" width="110" height="56" transform="rotate(-150 1355 688)"></use>
            <use href="#fl-leaf" x="1360" y="700" width="120" height="60" transform="rotate(-120 1420 730)"></use>
            <use href="#fl-leaf" x="1420" y="640" width="110" height="56" transform="rotate(-170 1475 668)"></use>
            <use href="#fl-leaf" x="1460" y="740" width="120" height="60" transform="rotate(-100 1520 770)"></use>
            <use href="#fl-leaf" x="1250" y="760" width="100" height="50" transform="rotate(-200 1300 785)"></use>
            <use href="#fl-herb" x="1180" y="820" width="70" height="36" transform="rotate(-10 1215 838)"></use>
          </g>
          <use href="#fl-lime" x="1440" y="790" width="120" height="120"></use>
          <use href="#fl-lime" x="1500" y="400" width="90" height="90" transform="rotate(30 1545 445)"></use>
          <use href="#fl-chilis" x="1100" y="700" width="140" height="36" transform="rotate(-30 1170 718)"></use>
          <use href="#fl-chilis" x="1140" y="760" width="120" height="32" transform="rotate(-50 1200 776)"></use>
          <use href="#fl-anise" x="1520" y="560" width="80" height="80"></use>
          <use href="#fl-anise" x="1040" y="830" width="66" height="66" transform="rotate(25 1073 863)"></use>
        </g>
        <g className="fl-g fl-edge">
          <use href="#fl-anise" x="760" y="16" width="56" height="56"></use>
          <use href="#fl-herb" x="880" y="22" width="60" height="32" transform="rotate(25 910 38)"></use>
          <use href="#fl-chilis" x="640" y="846" width="110" height="30" transform="rotate(8 695 861)"></use>
          <use href="#fl-herb" x="860" y="850" width="60" height="32" transform="rotate(-20 890 866)"></use>
        </g>
        <rect width="1600" height="900" fill="url(#fl-vig)"></rect>
      </svg>
      <div className="inner">
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".5s" } as CSSProperties}>MICHELIN Guide · Hanoi & Ho Chi Minh City</p>
        <h2 id="t4" data-a="skewIn" style={{ "--d": ".6s", marginTop: "10px" } as CSSProperties}>Vietnamese food around the world</h2>
        <div className="stats" data-st="zoomIn" style={{ "--base": "1s" } as CSSProperties}>
          <div className="stat" style={{ "--i": "0" } as CSSProperties}>
            <span className="num"><CountUp to={103} /></span>
            <span className="unit">restaurants</span>
            <p>in the first selection, from street food to fine dining</p>
          </div>
          <div className="stat" style={{ "--i": "1" } as CSSProperties}>
            <span className="num"><CountUp to={4} /></span>
            <span className="unit">Michelin stars</span>
            <p>awarded in the very first edition</p>
          </div>
          <div className="stat" style={{ "--i": "2" } as CSSProperties}>
            <span className="num"><CountUp to={2023} /></span>
            <span className="unit">June · first edition</span>
            <p>Vietnam’s first MICHELIN Guide, launched in June 2023</p>
          </div>
        </div>
        <p className="closing-q" data-a="fadeUp" style={{ "--d": "2.2s" } as CSSProperties}>So what makes Vietnamese food so special?</p>
      </div>
    </Slide>
  );
}
