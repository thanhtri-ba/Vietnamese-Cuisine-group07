import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 9: Fish sauce: the soul of Vietnamese cooking */
export default function Slide09() {
  return (
    <Slide index={8} className="band forest" t="zoom" who={1} labelledBy="t8">
      <div className="inner split">
        <Photo src="nuoc-mam-phu-quoc.webp" alt="A bottle of Phu Quoc fish sauce with anchovies and chili by the sea" caption="Phu Quoc fish sauce" h="58vh" tilt="l" tape delay=".3s" />
        <div className="copy">
          <h2 id="t8" data-a="slideR" style={{ "--d": ".5s" } as CSSProperties}>Fish sauce: the soul of Vietnamese cooking</h2>
          <div className="chips" data-st="pop" style={{ "--base": "1s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Marinating<small>deep, savory sweetness</small></span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Seasoning<small>richer broths</small></span>
            <span className="chip" style={{ "--i": "2" } as CSSProperties}>Dipping<small>a balanced sweet-and-sour dip</small></span>
          </div>
          <div data-a="fadeUp" style={{ "--d": "1.5s" } as CSSProperties}>
            <p className="year">2012</p>
            <p className="lede">Phu Quoc fish sauce was the first Vietnamese product to receive geographical indication protection from the European Union (EU).</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
