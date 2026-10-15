import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 10: Fresh herbs and vegetables */
export default function Slide10() {
  return (
    <Slide index={9} className="band leaf" t="slide" who={1} labelledBy="t9">
      <div className="inner split">
        <div className="kb" data-a="wipe" style={{ "--d": ".4s", height: "clamp(240px,62vh,560px)" } as CSSProperties}>
          <img src="img/i14.webp" alt="Leafy greens being placed into a wicker basket at a market" />
        </div>
        <div className="copy">
          <h2 id="t9" data-a="slideR" style={{ "--d": ".6s" } as CSSProperties}>Fresh herbs and vegetables</h2>
          <div className="chips" data-st="swing" style={{ "--base": "1s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Basil<small>húng quế</small></span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Coriander<small>ngò</small></span>
            <span className="chip" style={{ "--i": "2" } as CSSProperties}>Cucumber<small>dưa leo</small></span>
            <span className="chip" style={{ "--i": "3" } as CSSProperties}>Bean sprouts<small>giá</small></span>
            <span className="chip" style={{ "--i": "4" } as CSSProperties}>Lime<small>chanh</small></span>
          </div>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.8s" } as CSSProperties}>Freshness, fragrance and crunch. They balance grilled and fried food. With phở, everyone adds herbs and lime to their own taste.</p>
        </div>
      </div>
    </Slide>
  );
}
