import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
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
        <div className="marinade-grid">
        <div className="roles" data-st="slideR" style={{ "--base": "1s" } as CSSProperties}>
          <div style={{ "--i": "0" } as CSSProperties}>
            <b>Lemongrass · garlic · shallots</b>
            <span>an irresistible aroma</span>
          </div>
          <div style={{ "--i": "1" } as CSSProperties}>
            <b>Good fish sauce</b>
            <span>a deep, savory taste with a natural sweet finish</span>
          </div>
          <div style={{ "--i": "2" } as CSSProperties}>
            <b>Sugar & honey</b>
            <span>gentle sweetness and a golden-brown color on the grill</span>
          </div>
          <div style={{ "--i": "3" } as CSSProperties}>
            <b>Sweetened condensed milk</b>
            <span>in some recipes, adds a mild creaminess and a glossy glaze</span>
          </div>
        </div>
        <Photo src="uop-suon.webp" alt="Pork ribs marinating in a bowl with garlic, lemongrass and spices" caption="Marinating the ribs" sub="left overnight to soak in" h="23vh" tilt="r" tape delay=".8s" />
        </div>
        <VideoLoader
          split
          data-a="fadeUp"
          style={{ "--d": "1.8s" } as CSSProperties}
          note="Every stall has its own recipe: honey and condensed milk add sweetness, richness and a glossy, golden-brown finish."
        />
      </div>
    </Slide>
  );
}
