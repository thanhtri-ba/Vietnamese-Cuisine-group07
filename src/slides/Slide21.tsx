import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 21: Cơm Tấm Ba Ghiền */
export default function Slide21() {
  return (
    <Slide index={20} className="band forest" t="zoom" who={3} labelledBy="t20">
      <div className="inner split">
        <div className="badge-big" data-a="spinIn" style={{ "--d": ".5s" } as CSSProperties}>
          <span className="ring"></span>
          <span className="disc"></span>
          <span className="txt">Bib<br />Gourmand<small>MICHELIN Guide</small></span>
        </div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".8s" } as CSSProperties}>From street food to MICHELIN Guide</p>
          <h2 id="t20" data-a="slideR" style={{ "--d": ".9s" } as CSSProperties}>Cơm Tấm Ba Ghiền</h2>
          <div className="chips" data-st="pop" style={{ "--base": "1.3s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Phú Nhuận District</span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Bib Gourmand since the first Vietnam edition, 2023</span>
          </div>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.8s" } as CSSProperties}>Bib Gourmand highlights places with good food at reasonable prices. A familiar local dish can win wide attention and keep its everyday appeal.</p>
          <p className="lede accent" data-a="fadeUp" style={{ "--d": "2.2s" } as CSSProperties}>
            <i>But why doesn’t such a rich plate feel too heavy?</i>
          </p>
        </div>
      </div>
    </Slide>
  );
}
