import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 8: Yin and yang on the plate */
export default function Slide08() {
  return (
    <Slide index={7} className="band leaf" t="wipe" who={1} labelledBy="t7b">
      <div className="inner split">
        <div className="yy-wrap" data-a="spinIn" style={{ "--d": ".5s" } as CSSProperties}>
          <svg className="yy" viewBox="0 0 200 200" role="img" aria-label="Yin and yang symbol: cooling and warming foods in balance">
            <circle cx="100" cy="100" r="98" fill="var(--cream)" stroke="var(--forest)" strokeWidth="4"></circle>
            <path d="M100 2 A98 98 0 0 1 100 198 A49 49 0 0 1 100 100 A49 49 0 0 0 100 2Z" fill="var(--forest)"></path>
            <circle cx="100" cy="51" r="13" fill="var(--forest)"></circle>
            <circle cx="100" cy="149" r="13" fill="var(--cream)"></circle>
          </svg>
          <span className="yy-l">Cooling<small>âm</small></span>
          <span className="yy-r">Warming<small>dương</small></span>
        </div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".7s" } as CSSProperties}>Balance for the body</p>
          <h2 id="t7b" data-a="slideR" style={{ "--d": ".8s" } as CSSProperties}>Yin and yang on the plate</h2>
          <div className="pairs yy-pairs">
            <div className="pair" style={{ "--i": "0" } as CSSProperties}>
              <span className="l">Duck<small>cooling</small></span>
              <span className="plus" aria-hidden="true">+</span>
              <span className="r">Ginger dipping sauce<small>warming</small></span>
            </div>
            <div className="pair" style={{ "--i": "1" } as CSSProperties}>
              <span className="l">Hot summer day</span>
              <span className="plus" aria-hidden="true">+</span>
              <span className="r">Bitter melon soup<small>believed to cool the body</small></span>
            </div>
          </div>
          <p className="lede" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}>Traditional wisdom, not science, but it shows how carefully Vietnamese people think about food.</p>
        </div>
      </div>
    </Slide>
  );
}
