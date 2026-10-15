import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 29: Order like a local */
export default function Slide29() {
  return (
    <Slide index={28} className="band leaf" t="circle" who={6} labelledBy="t24d">
      <div className="inner split">
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".6s" } as CSSProperties}>At the broken rice stall</p>
          <h2 id="t24d" data-a="slideL" style={{ "--d": ".7s" } as CSSProperties}>Order like a local</h2>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.1s" } as CSSProperties}>Familiar phrases you will hear every day at food stalls all over Saigon!</p>
          <Photo src="com-tam-ve.webp" alt="Illustration of a broken rice street stall with a customer on a plastic stool" h="28vh" tilt="l" delay="1.4s" />
        </div>
        <div className="bubbles" data-st="pop" style={{ "--base": "1.2s" } as CSSProperties}>
          <div className="bubble" style={{ "--i": "0" } as CSSProperties}>
            <b>“Cho em một dĩa sườn bì chả.”</b>
            <span>One plate with ribs, pork skin and egg meatloaf, please.</span>
          </div>
          <div className="bubble r" style={{ "--i": "1" } as CSSProperties}>
            <b>“Thêm trứng ốp la.”</b>
            <span>Add a fried egg with a runny yolk.</span>
          </div>
          <div className="bubble" style={{ "--i": "2" } as CSSProperties}>
            <b>“Nhiều mỡ hành tóp mỡ!”</b>
            <span>Extra scallion oil and crispy pork crackling.</span>
          </div>
          <div className="bubble r" style={{ "--i": "3" } as CSSProperties}>
            <b>“Cho dĩa cơm thêm nha!”</b>
            <span>It is so good, I want another serving of rice!</span>
          </div>
        </div>
      </div>
    </Slide>
  );
}
