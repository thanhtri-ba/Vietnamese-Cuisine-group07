import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import SplitText from '../components/SplitText';
import IntroRunner from '../components/IntroRunner';

/** Slide 1: Vietnamese Cuisine: Saigon Broken Rice */
export default function Slide01() {
  return (
    <Slide index={0} className="band viet viet-giay tiles cover vcover" t="fade" who={0} label="Vietnamese Cuisine: Saigon Broken Rice">
      <div className="inner">
        <div className="cover-text">
          <p className="vc-kicker" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Introducing Vietnam, by Group 7</p>
          <h1 data-letters style={{ "--d": ".35s", marginTop: "14px" } as CSSProperties} aria-label="Vietnamese Cuisine"><span><SplitText text="Vietnamese" start={0} /></span><span><SplitText text="Cuisine" start={11} /></span></h1>
          <p className="bang" data-a="slideL" style={{ "--d": "1.1s" } as CSSProperties} >Saigon Broken Rice</p>
          <ul className="members" data-st="pop" style={{ "--base": "1.4s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>Group 7</li>
            <li style={{ "--i": "1" } as CSSProperties}>Hòa</li>
            <li style={{ "--i": "2" } as CSSProperties}>Hải</li>
            <li style={{ "--i": "3" } as CSSProperties}>Trung</li>
            <li style={{ "--i": "4" } as CSSProperties}>Khoa</li>
            <li style={{ "--i": "5" } as CSSProperties}>Liên</li>
            <li style={{ "--i": "6" } as CSSProperties}>Trí</li>
            <li style={{ "--i": "7" } as CSSProperties}>Đức</li>
          </ul>
        </div>
        <div className="dia vc-plate">
          <img src="img/photos/com-tam-suon-bi-cha.webp" alt="A plate of Saigon broken rice with grilled pork chop, egg meatloaf, fried egg and fresh vegetables" />
        </div>
      </div>
      <IntroRunner />
    </Slide>
  );
}
