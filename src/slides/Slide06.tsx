import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import SplitText from '../components/SplitText';

/** Slide 6: The philosophy of balance */
export default function Slide06() {
  return (
    <Slide index={5} className="band cream" t="up" who={1} labelledBy="t6">
      <img className="sil" src="img/i12.webp" alt="" style={{ left: "2%", top: "40px" } as CSSProperties} />
      <div className="inner" style={{ textAlign: "center" } as CSSProperties}>
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Vietnamese food in one word</p>
        <h2 id="t6" data-letters style={{ "--d": ".3s", marginTop: "10px" } as CSSProperties} aria-label="The philosophy of balance"><SplitText text="The philosophy of balance" start={0} /></h2>
        <div className="seesaw" data-a="fadeUp" style={{ "--d": ".4s" } as CSSProperties}>
          <div className="beam">
            <div className="pan l">
              <span>Rich food</span>
              <span>Cooked ingredients</span>
              <span>Sweet flavors</span>
            </div>
            <div className="pan r">
              <span>Fresh vegetables</span>
              <span>Raw herbs</span>
              <span>Sour or salty</span>
            </div>
          </div>
          <div className="pivot"></div>
        </div>
        <p className="example" data-a="fadeUp" style={{ "--d": "2.6s" } as CSSProperties}>Example: <b>bún chả</b> · grilled pork + fresh herbs + pickles + dipping sauce</p>
      </div>
    </Slide>
  );
}
