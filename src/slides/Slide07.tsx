import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 7: Five flavors in one cuisine */
export default function Slide07() {
  return (
    <Slide index={6} className="band forest" t="blinds" who={1} labelledBy="t7">
      <div className="inner">
        <h2 id="t7" data-a="blurIn" style={{ "--d": ".5s" } as CSSProperties}>Five flavors in one cuisine</h2>
        <div className="flavors" data-st="dropIn" style={{ "--base": ".9s" } as CSSProperties}>
          <div className="flavor f1" style={{ "--i": "0" } as CSSProperties}>
            <div>
              <b>Sour</b>
              <small>Lime</small>
              <i>chua</i>
            </div>
          </div>
          <div className="flavor f2" style={{ "--i": "1" } as CSSProperties}>
            <div>
              <b>Spicy</b>
              <small>Chili</small>
              <i>cay</i>
            </div>
          </div>
          <div className="flavor f3" style={{ "--i": "2" } as CSSProperties}>
            <div>
              <b>Salty</b>
              <small>Fish sauce</small>
              <i>mặn</i>
            </div>
          </div>
          <div className="flavor f4" style={{ "--i": "3" } as CSSProperties}>
            <div>
              <b>Sweet</b>
              <small>Sugar</small>
              <i>ngọt</i>
            </div>
          </div>
          <div className="flavor f5" style={{ "--i": "4" } as CSSProperties}>
            <div>
              <b>Bitter</b>
              <small>Bitter herbs</small>
              <i>đắng</i>
            </div>
          </div>
        </div>
        <p className="harmony" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}>Not every dish has all five. The cook adjusts them to create a <b className="accent">harmonious</b> taste: rich, but never overwhelming.</p>
      </div>
    </Slide>
  );
}
