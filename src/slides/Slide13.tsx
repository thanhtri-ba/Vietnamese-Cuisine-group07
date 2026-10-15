import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import VMap from '../components/VMap';

/** Slide 13: Bold and spicy */
export default function Slide13() {
  return (
    <Slide index={12} className="band forest" t="up" who={2} labelledBy="t12">
      <div className="wm-box" aria-hidden="true">
        <div className="watermark" aria-hidden="true" data-a="zoomOut" style={{ "--d": ".2s", color: "var(--leaf)" } as CSSProperties}>Huế</div>
      </div>
      <div className="inner map-wrap">
        <div style={{ filter: "invert(0)" } as CSSProperties}><VMap region="c" /></div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".4s" } as CSSProperties}>02 · Central cuisine</p>
          <h2 id="t12" data-a="zoomIn" style={{ "--d": ".5s" } as CSSProperties}>Bold and spicy</h2>
          <ul className="dishes" data-st="flipX" style={{ "--base": "1s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>
              <b>Bún bò Huế</b>
              <span>spicy beef noodle soup</span>
            </li>
            <li style={{ "--i": "1" } as CSSProperties}>
              <b>Mì Quảng</b>
              <span>turmeric noodles</span>
            </li>
            <li style={{ "--i": "2" } as CSSProperties}>
              <b>Cơm hến</b>
              <span>rice with baby clams</span>
            </li>
          </ul>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.6s" } as CSSProperties}>Huế, the former imperial capital, has a rich culinary tradition of chili, herbs and flavorful sauces.</p>
        </div>
      </div>
    </Slide>
  );
}
