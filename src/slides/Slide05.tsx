import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 5: What makes it special? */
export default function Slide05() {
  return (
    <Slide index={4} className="band viet viet-giay tiles v5" t="circle" who={0} labelledBy="t5">
      <div className="inner">
        <div className="v5-copy">
          <h2 id="t5" data-a="fadeUp" style={{ "--d": ".4s" } as CSSProperties}>What makes it special?</h2>
          <ul className="v5-three" data-st="fadeUp" style={{ "--base": ".8s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>
              <b>Fresh</b>
              <span>Ingredients bought at the market every day</span>
            </li>
            <li style={{ "--i": "1" } as CSSProperties}>
              <b>Flavorful</b>
              <span>Many flavors blended in one meal</span>
            </li>
            <li style={{ "--i": "2" } as CSSProperties}>
              <b>Shared</b>
              <span>Meals are eaten together, family style</span>
            </li>
          </ul>
          <ul className="v5-mam" data-a="fadeUp" style={{ "--d": "1.4s" } as CSSProperties} aria-label="A typical Vietnamese meal">
            <li className="v5-mam-lbl">A typical meal:</li>
            <li>Rice</li>
            <li>Vegetables</li>
            <li>Meat or fish</li>
            <li>Hot soup</li>
            <li>Dipping sauce</li>
          </ul>
          <p className="v5-balance" data-a="zoomOut" style={{ "--d": "2s" } as CSSProperties}>
            <span className="bang">Balance</span>
          </p>
        </div>
        <figure className="v5-photo" data-a="fadeUp" style={{ "--d": ".6s" } as CSSProperties}>
          <img src="img/i20.webp" alt="A shopper choosing fresh vegetables at a traditional market stall" />
        </figure>
      </div>
    </Slide>
  );
}
