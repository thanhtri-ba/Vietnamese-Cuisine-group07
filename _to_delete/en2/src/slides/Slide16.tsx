import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import SplitText from '../components/SplitText';

/** Slide 16: Meet broken rice */
export default function Slide16() {
  return (
    <Slide index={15} className="band forest" t="circle" who={3} labelledBy="t15">
      <div className="inner split">
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".6s" } as CSSProperties}>Saigon's signature dish</p>
          <h2 id="t15" data-letters style={{ "--d": ".7s", fontSize: "clamp(3rem,min(9vw,16vh),8rem)" } as CSSProperties} aria-label="Meet broken rice"><SplitText text="Meet broken rice" start={0} /></h2>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.5s" } as CSSProperties}>Soft broken rice, charcoal-grilled pork, sweet-and-sour pickles and rich, sticky fish sauce, all on one round plate.</p>
          <div className="chips" data-st="pop" style={{ "--base": "1.9s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Breakfast</span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Lunch</span>
            <span className="chip" style={{ "--i": "2" } as CSSProperties}>Dinner & late night</span>
          </div>
        </div>
        <Photo src="com-tam-suon-bi-cha.webp" alt="A plate of broken rice with grilled pork, shredded pork skin, egg meatloaf, fried egg and vegetables" caption="Broken rice combo plate" sub="the real thing" h="62vh" tilt="r" tape delay=".8s" />
      </div>
    </Slide>
  );
}
