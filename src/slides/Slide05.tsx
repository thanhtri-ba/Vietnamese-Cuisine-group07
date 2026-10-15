import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 5: What makes it special? */
export default function Slide05() {
  return (
    <Slide index={4} className="band leaf" t="circle" who={0} labelledBy="t5">
      <div className="inner split">
        <div className="copy">
          <h2 id="t5" data-a="dropIn" style={{ "--d": ".5s" } as CSSProperties}>What makes it special?</h2>
          <div className="trio" data-st="flipX" style={{ "--base": "1s" } as CSSProperties}>
            <div style={{ "--i": "0" } as CSSProperties}>
              <b>Fresh</b>
              <span>ingredients from markets every day</span>
            </div>
            <div style={{ "--i": "1" } as CSSProperties}>
              <b>Flavorful</b>
              <span>many tastes in one meal</span>
            </div>
            <div style={{ "--i": "2" } as CSSProperties}>
              <b>Shared</b>
              <span>a culture of eating together</span>
            </div>
          </div>
          <div className="chips" data-st="pop" style={{ "--base": "1.5s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Rice</span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Vegetables</span>
            <span className="chip" style={{ "--i": "2" } as CSSProperties}>Meat or fish</span>
            <span className="chip" style={{ "--i": "3" } as CSSProperties}>Soup</span>
            <span className="chip" style={{ "--i": "4" } as CSSProperties}>Dipping sauce</span>
          </div>
          <div data-a="zoomOut" style={{ "--d": "2.2s" } as CSSProperties}>
            <p className="eyebrow">One idea connects them</p>
            <p className="big-word">Balance</p>
          </div>
        </div>
        <div className="kb five-photos" data-a="circle" style={{ "--d": ".7s" } as CSSProperties}>
          <img src="img/i20.webp" alt="A shopper choosing fresh vegetables at a market stall" />
        </div>
      </div>
    </Slide>
  );
}
