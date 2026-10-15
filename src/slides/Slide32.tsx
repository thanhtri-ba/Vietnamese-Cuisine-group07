import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import SplitText from '../components/SplitText';
import { PollRecall } from '../components/Poll';

/** Slide 32: Thank you! */
export default function Slide32() {
  return (
    <Slide index={31} className="band forest finale" t="zoom" who={6} labelledBy="t25">
      <div className="inner">
        <p className="lead" data-a="blurIn" style={{ "--d": ".4s" } as CSSProperties}>From broken grains to one of Saigon’s most beloved dishes</p>
        <div className="chips" data-st="pop" style={{ "--base": "1.1s" } as CSSProperties}>
          <span className="chip" style={{ "--i": "0" } as CSSProperties}>Balance of flavors</span>
          <span className="chip" style={{ "--i": "1" } as CSSProperties}>Three regions</span>
          <span className="chip" style={{ "--i": "2" } as CSSProperties}>The story of cơm tấm</span>
        </div>
        <PollRecall data-a="fadeUp" style={{ "--d": "1.6s" } as CSSProperties} />
        <h2 id="t25" className="wave" data-letters aria-label="Thank you!"><SplitText text="Thank you!" start={0} /></h2>
        <p className="qa" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}>Questions & answers</p>
      </div>
    </Slide>
  );
}
