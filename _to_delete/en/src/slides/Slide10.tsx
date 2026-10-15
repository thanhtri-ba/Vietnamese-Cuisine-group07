import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 10: Fresh herbs and vegetables */
export default function Slide10() {
  return (
    <Slide index={9} className="band leaf" t="slide" who={1} labelledBy="t9">
      <div className="inner split">
        <div className="kb" data-a="wipe" style={{ "--d": ".4s", height: "clamp(240px,62vh,560px)" } as CSSProperties}>
          <img src="img/i14.webp" alt="Fresh greens being placed carefully into a bamboo basket at the market" />
        </div>
        <div className="copy">
          <h2 id="t9" data-a="slideR" style={{ "--d": ".6s" } as CSSProperties}>Fresh herbs and vegetables</h2>
          <div className="chips" data-st="swing" style={{ "--base": "1s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Thai basil<small>a strong, distinctive aroma</small></span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Coriander<small>fresh and fragrant</small></span>
            <span className="chip" style={{ "--i": "2" } as CSSProperties}>Cucumber<small>crunchy, sweet and cooling</small></span>
            <span className="chip" style={{ "--i": "3" } as CSSProperties}>Bean sprouts<small>fresh and crisp</small></span>
            <span className="chip" style={{ "--i": "4" } as CSSProperties}>Fresh lime<small>a bright, zesty sourness</small></span>
          </div>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.8s" } as CSSProperties}>Fresh, fragrant and crunchy. Herbs perfectly balance the richness of grilled and fried dishes. With phở or bún, everyone can add herbs and squeeze in lime to suit their own taste.</p>
        </div>
      </div>
    </Slide>
  );
}
