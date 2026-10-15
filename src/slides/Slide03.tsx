import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 3: Presentation roadmap */
export default function Slide03() {
  return (
    <Slide index={2} className="band cream" t="slide" who={0} labelledBy="t3">
      <div className="inner road-split">
        <div>
          <h2 id="t3" data-a="slideL" style={{ "--d": ".3s", fontSize: "clamp(2rem,min(5vw,8.5vh),4rem)" } as CSSProperties}>Presentation roadmap</h2>
          <ol className="road v" data-st="pop" style={{ "--base": ".9s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>
              <em>Hải</em>
              <b>Philosophy</b>
              <span>Balance, fish sauce, herbs</span>
            </li>
            <li style={{ "--i": "1" } as CSSProperties}>
              <em>Trung</em>
              <b>Three regions</b>
              <span>North, Central, South</span>
            </li>
            <li style={{ "--i": "2" } as CSSProperties}>
              <em>Khoa</em>
              <b>Story of cơm tấm</b>
              <span>Origin and ingredients</span>
            </li>
            <li style={{ "--i": "3" } as CSSProperties}>
              <em>Liên</em>
              <b>Balance of flavors</b>
              <span>How to prepare it</span>
            </li>
            <li style={{ "--i": "4" } as CSSProperties}>
              <em>Trí</em>
              <b>Grilled pork ribs</b>
              <span>Marinade, grill, kinds of sườn</span>
            </li>
            <li style={{ "--i": "5" } as CSSProperties}>
              <em>Đức</em>
              <b>Eat like a local</b>
              <span>Ordering, quiz, conclusion</span>
            </li>
          </ol>
        </div>
        <figure className="frame">
          <span className="tape l" aria-hidden="true"></span>
          <span className="tape r" aria-hidden="true"></span>
          <img src="img/comtam-plate.webp" alt="Illustration of a plate of cơm tấm: grilled pork chop, fried egg, steamed egg meatloaf, shredded pork skin, cucumber, tomato, pickles and a bowl of dipping fish sauce" />
          <figcaption>Cơm tấm Sài Gòn</figcaption>
        </figure>
      </div>
    </Slide>
  );
}
