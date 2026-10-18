import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 7: Five flavors in one cuisine */
export default function Slide07() {
  return (
    <Slide index={6} className="band forest viet viet-son tiles" t="blinds" who={1} labelledBy="t7">
      <div className="inner">
        <h2 id="t7" data-a="blurIn" style={{ "--d": ".5s" } as CSSProperties}>Five flavors in Vietnamese cuisine</h2>
        <div className="flavors" data-st="dropIn" style={{ "--base": ".9s" } as CSSProperties}>
          <div className="flavor f1" style={{ "--i": "0" } as CSSProperties}>
            <div>
              <b>Sour</b>
              <small>Lime / Tamarind</small>
              <i>wood element</i>
            </div>
          </div>
          <div className="flavor f2" style={{ "--i": "1" } as CSSProperties}>
            <div>
              <b>Spicy</b>
              <small>Chili / Pepper</small>
              <i>metal element</i>
            </div>
          </div>
          <div className="flavor f3" style={{ "--i": "2" } as CSSProperties}>
            <div>
              <b>Salty</b>
              <small>Fish sauce</small>
              <i>water element</i>
            </div>
          </div>
          <div className="flavor f4" style={{ "--i": "3" } as CSSProperties}>
            <div>
              <b>Sweet</b>
              <small>Sugar / Sugarcane</small>
              <i>earth element</i>
            </div>
          </div>
          <div className="flavor f5" style={{ "--i": "4" } as CSSProperties}>
            <div>
              <b>Bitter</b>
              <small>Bitter melon / Bitter herbs</small>
              <i>fire element</i>
            </div>
          </div>
        </div>
        <div className="harmony-row">
          <Photo src="nuoc-mam-hanh-phi.webp" alt="A bowl of fish sauce with garlic and chili next to a bowl of scallion oil" caption="Sour · spicy · salty · sweet" h="15vh" tilt="l" delay="1.6s" />
          <p className="harmony" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}>Not every dish has all five flavors. Cooks skillfully combine them to create a <b className="accent">harmonious</b> taste: rich but delicate, and never too heavy.</p>
        </div>
      </div>
    </Slide>
  );
}
