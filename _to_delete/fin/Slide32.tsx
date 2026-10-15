import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import SplitText from '../components/SplitText';
import { PollRecall } from '../components/Poll';
import FinaleParty from '../components/FinaleParty';

/** Slide 32: Thank you! */
export default function Slide32() {
  return (
    <Slide index={31} className="band forest finale" t="zoom" who={6} labelledBy="t25">
      <div className="inner">
        <p className="lead" data-a="blurIn" style={{ "--d": ".4s" } as CSSProperties}>From broken rice grains to Saigon's most beloved signature dish</p>
        <div className="chips" data-st="pop" style={{ "--base": "1.1s" } as CSSProperties}>
          <span className="chip" style={{ "--i": "0" } as CSSProperties}>Balance of flavors</span>
          <span className="chip" style={{ "--i": "1" } as CSSProperties}>Three regional cuisines</span>
          <span className="chip" style={{ "--i": "2" } as CSSProperties}>The story of broken rice</span>
        </div>
        <PollRecall data-a="fadeUp" style={{ "--d": "1.6s" } as CSSProperties} />
        <div className="trio-photos">
          <Photo src="pho.webp" alt="A bowl of beef pho" caption="Pho" h="13vh" w="13vh" tilt="l" delay="1.8s" />
          <Photo src="banh-mi.webp" alt="A banh mi sandwich" caption="Banh mi" h="13vh" w="13vh" tilt="none" delay="2s" />
          <Photo src="com-tam-suon-bi-cha.webp" alt="A plate of broken rice" caption="Broken rice" h="13vh" w="13vh" tilt="r" delay="2.2s" />
        </div>
        <h2 id="t25" className="wave" data-letters aria-label="Thank you!"><SplitText text="Thank you!" start={0} /></h2>
        <p className="qa" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}>Questions & answers</p>
      </div>
      <FinaleParty />
    </Slide>
  );
}
