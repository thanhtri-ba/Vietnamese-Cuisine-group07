import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 21: Cơm Tấm Ba Ghiền */
export default function Slide21() {
  return (
    <Slide index={20} className="band forest" t="zoom" who={3} labelledBy="t20">
      <div className="inner split">
        <div className="ba-wrap">
          <Photo src="com-tam-ba-ghien.webp" alt="Storefront of Cơm Tấm Ba Ghiền with delivery drivers waiting outside" caption="Cơm Tấm Ba Ghiền" sub="Phú Nhuận, Saigon" h="42vh" tilt="l" tape delay=".4s" />
          <div className="badge-big" data-a="spinIn" style={{ "--d": ".5s" } as CSSProperties}>
          <span className="ring"></span>
          <span className="disc"></span>
          <span className="txt">Bib<br />Gourmand<small>MICHELIN Guide</small></span>
        </div>
        </div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".8s" } as CSSProperties}>From street food to the MICHELIN Guide</p>
          <h2 id="t20" data-a="slideR" style={{ "--d": ".9s" } as CSSProperties}>Cơm Tấm Ba Ghiền</h2>
          <div className="chips" data-st="pop" style={{ "--base": "1.3s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Phú Nhuận District, HCMC</span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Bib Gourmand every year since 2023</span>
          </div>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.8s" } as CSSProperties}>The Bib Gourmand recognizes great food at reasonable prices. A humble street dish has won international attention while keeping its everyday charm.</p>
          <p className="lede accent" data-a="fadeUp" style={{ "--d": "2.2s" } as CSSProperties}>
            <i>But why doesn't such a hearty plate ever feel too heavy?</i>
          </p>
        </div>
      </div>
    </Slide>
  );
}
