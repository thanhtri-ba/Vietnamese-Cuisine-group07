import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 30: Cơm tấm, all day long */
export default function Slide30() {
  return (
    <Slide index={29} className="band forest scene" t="fade" who={6} labelledBy="t24e">
      <div className="ask-bg" aria-hidden="true">
        <img src="img/street-shop.webp" alt="" />
      </div>
      <div className="inner">
        <h2 id="t24e" data-a="blurIn" style={{ "--d": ".5s" } as CSSProperties}>Cơm tấm, all day long</h2>
        <div className="times" data-st="dropIn" style={{ "--base": ".9s" } as CSSProperties}>
          <article style={{ "--i": "0" } as CSSProperties}>
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="30" r="10" fill="#E2B44C"></circle>
              <path d="M4 40 H44" stroke="#CBE691" strokeWidth="3"></path>
              <path d="M24 8 v6 M10 16 l4 4 M38 16 l-4 4" stroke="#E2B44C" strokeWidth="3" strokeLinecap="round"></path>
            </svg>
            <b>Morning</b>
            <span>A quick plate before school or work</span>
          </article>
          <article style={{ "--i": "1" } as CSSProperties}>
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="11" fill="#ED7843"></circle>
              <path d="M24 4 v6 M24 38 v6 M4 24 h6 M38 24 h6 M10 10 l4 4 M34 34 l4 4 M38 10 l-4 4 M10 38 l4 -4" stroke="#ED7843" strokeWidth="3" strokeLinecap="round"></path>
            </svg>
            <b>Lunch</b>
            <span>Cheap, filling and fast</span>
          </article>
          <article style={{ "--i": "2" } as CSSProperties}>
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path d="M30 6 A18 18 0 1 0 42 32 A14 14 0 1 1 30 6Z" fill="#CBE691"></path>
              <circle cx="12" cy="10" r="1.6" fill="#FFFAEE"></circle>
              <circle cx="40" cy="12" r="1.4" fill="#FFFAEE"></circle>
            </svg>
            <b>Late night</b>
            <span>Stalls stay open for night workers</span>
          </article>
        </div>
        <div className="chips" data-st="pop" style={{ "--base": "1.7s", justifyContent: "center", marginTop: "clamp(16px,3vh,28px)" } as CSSProperties}>
          <span className="chip" style={{ "--i": "0" } as CSSProperties}>Plastic stools on the sidewalk</span>
          <span className="chip" style={{ "--i": "1" } as CSSProperties}>A small bowl of soup<small>canh</small></span>
          <span className="chip" style={{ "--i": "2" } as CSSProperties}>Iced tea<small>trà đá</small></span>
        </div>
      </div>
    </Slide>
  );
}
