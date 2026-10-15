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
              <b>Food philosophy</b>
              <span>Balance, fish sauce and fresh herbs</span>
            </li>
            <li style={{ "--i": "1" } as CSSProperties}>
              <em>Trung</em>
              <b>Three regional cuisines</b>
              <span>The North, the Center and the South</span>
            </li>
            <li style={{ "--i": "2" } as CSSProperties}>
              <em>Khoa</em>
              <b>The story of broken rice</b>
              <span>Its origins and ingredients</span>
            </li>
            <li style={{ "--i": "3" } as CSSProperties}>
              <em>Liên</em>
              <b>Balance & preparation</b>
              <span>How it is cooked and what comes with it</span>
            </li>
            <li style={{ "--i": "4" } as CSSProperties}>
              <em>Trí</em>
              <b>Charcoal-grilled pork ribs</b>
              <span>The marinade, the grill and the cuts of pork</span>
            </li>
            <li style={{ "--i": "5" } as CSSProperties}>
              <em>Đức</em>
              <b>Eat like a local</b>
              <span>Ordering, a quiz and the conclusion</span>
            </li>
          </ol>
        </div>
        <figure className="frame">
          <span className="tape l" aria-hidden="true"></span>
          <span className="tape r" aria-hidden="true"></span>
          <img src="img/comtam-plate.webp" alt="Illustration of a full plate of broken rice with grilled pork, shredded pork skin, egg meatloaf and a fried egg" />
          <figcaption>Saigon broken rice</figcaption>
        </figure>
      </div>
    </Slide>
  );
}
