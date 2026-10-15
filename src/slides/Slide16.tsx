import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Plate from '../components/Plate';
import SplitText from '../components/SplitText';

/** Slide 16: Meet cơm tấm */
export default function Slide16() {
  return (
    <Slide index={15} className="band forest" t="circle" who={3} labelledBy="t15">
      <div className="inner split">
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".6s" } as CSSProperties}>Saigon’s most recognizable dish</p>
          <h2 id="t15" data-letters style={{ "--d": ".7s", fontSize: "clamp(3rem,min(9vw,16vh),8rem)" } as CSSProperties} aria-label="Meet cơm tấm"><SplitText text="Meet cơm tấm" start={0} /></h2>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.5s" } as CSSProperties}>Broken rice, grilled pork, vegetables and dipping fish sauce on one plate.</p>
          <div className="chips" data-st="pop" style={{ "--base": "1.9s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Breakfast</span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Lunch</span>
            <span className="chip" style={{ "--i": "2" } as CSSProperties}>Dinner</span>
          </div>
        </div>
        <div className="plate-wrap" style={{ maxWidth: "min(440px,62vh)", width: "100%", margin: "auto" } as CSSProperties}><Plate /></div>
      </div>
    </Slide>
  );
}
