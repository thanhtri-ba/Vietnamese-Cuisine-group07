import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import SplitText from '../components/SplitText';

/** Slide 6: The philosophy of balance */
export default function Slide06() {
  return (
    <Slide index={5} className="band cream viet viet-giay tiles" t="up" who={1} labelledBy="t6">
      <img className="sil" src="img/i12.webp" alt="" style={{ left: "2%", top: "40px" } as CSSProperties} />
      <div className="inner split split-photo">
        <Photo src="bun-cha.webp" alt="Grilled pork noodles: grilled pork in dipping sauce with rice noodles and herbs" caption="Hanoi grilled pork noodles" h="60vh" tilt="l" tape delay=".4s" />
        <div className="copy" style={{ textAlign: "center" } as CSSProperties}>
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Vietnamese food in one word</p>
        <h2 id="t6" data-letters style={{ "--d": ".3s", marginTop: "10px", fontSize: "clamp(2rem,min(4.4vw,8vh),3.8rem)" } as CSSProperties} aria-label="The philosophy of balance"><SplitText text="The philosophy of balance" start={0} /></h2>
        <div className="seesaw" data-a="fadeUp" style={{ "--d": ".4s" } as CSSProperties}>
          <div className="beam">
            <div className="pan l">
              <span>Rich, fatty dishes</span>
              <span>Hot, cooked dishes</span>
              <span>Strong sweetness</span>
            </div>
            <div className="pan r">
              <span>Fresh greens</span>
              <span>Raw herbs</span>
              <span>Light sourness, gentle saltiness</span>
            </div>
          </div>
          <div className="pivot"></div>
        </div>
        <p className="example" data-a="fadeUp" style={{ "--d": "2.6s" } as CSSProperties}>Example: <b>grilled pork noodles</b> · grilled pork + fresh herbs + pickles + dipping sauce</p>
        </div>
      </div>
    </Slide>
  );
}
