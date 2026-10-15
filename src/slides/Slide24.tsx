import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import SplitText from '../components/SplitText';

/** Slide 24: How to prepare cơm tấm */
export default function Slide24() {
  return (
    <Slide index={23} className="band forest" t="up" who={4} labelledBy="t22">
      <div className="inner">
        <h2 id="t22" data-letters style={{ "--d": ".3s" } as CSSProperties} aria-label="How to prepare cơm tấm"><SplitText text="How to prepare cơm tấm" start={0} /></h2>
        <ol className="steps4" data-st="dropIn" style={{ "--base": "1.1s" } as CSSProperties}>
          <li style={{ "--i": "0" } as CSSProperties}>
            <b>Marinate</b>
            <span>Let the pork ribs absorb the seasonings.</span>
          </li>
          <li style={{ "--i": "1" } as CSSProperties}>
            <b>Grill</b>
            <span>Over charcoal until cooked and slightly caramelized.</span>
          </li>
          <li style={{ "--i": "2" } as CSSProperties}>
            <b>Prepare</b>
            <span>Cook the broken rice and get the vegetables ready.</span>
          </li>
          <li style={{ "--i": "3" } as CSSProperties}>
            <b>Plate</b>
            <span>Arrange everything, then add scallion oil and fish sauce.</span>
          </li>
        </ol>
        <p className="secret" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}><b>The secret:</b> prepare each ingredient carefully.</p>
      </div>
    </Slide>
  );
}
