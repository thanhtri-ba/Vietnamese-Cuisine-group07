import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import SplitText from '../components/SplitText';
import VideoLoader from '../components/VideoLoader';

/** Slide 27: Secrets of the marinade */
export default function Slide27() {
  return (
    <Slide index={26} className="band forest" t="slide" who={5} labelledBy="t24b">
      <div className="flames" aria-hidden="true">
        <span className="flame" style={{ "--i": "0" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "1" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "2" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "3" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "4" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "5" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "6" } as CSSProperties}></span>
      </div>
      <div className="inner">
        <h2 id="t24b" data-letters style={{ "--d": ".3s" } as CSSProperties} aria-label="Secrets of the marinade"><SplitText text="Secrets of the marinade" start={0} /></h2>
        <div className="roles" data-st="slideR" style={{ "--base": "1s" } as CSSProperties}>
          <div style={{ "--i": "0" } as CSSProperties}>
            <b>Lemongrass · garlic · shallots</b>
            <span>a wonderful smell</span>
          </div>
          <div style={{ "--i": "1" } as CSSProperties}>
            <b>Fish sauce</b>
            <span>a deep, savory taste</span>
          </div>
          <div style={{ "--i": "2" } as CSSProperties}>
            <b>Sugar · honey</b>
            <span>sweetness that caramelizes on the grill</span>
          </div>
          <div style={{ "--i": "3" } as CSSProperties}>
            <b>Condensed milk</b>
            <span>softer meat and a golden-brown color</span>
          </div>
        </div>
        <VideoLoader data-a="fadeUp" style={{ "--d": "1.8s" } as CSSProperties} note="Honey and condensed milk give the ribs their color and sweet Saigon-style flavor." />
      </div>
    </Slide>
  );
}
