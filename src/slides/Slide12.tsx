import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import VMap from '../components/VMap';

/** Slide 12: Delicate and balanced */
export default function Slide12() {
  return (
    <Slide index={11} className="band leaf" t="down" who={2} labelledBy="t11">
      <div className="wm-box" aria-hidden="true">
        <div className="watermark" aria-hidden="true" data-a="fadeUp" style={{ "--d": ".2s" } as CSSProperties}>Bắc</div>
      </div>
      <div className="inner map-wrap">
        <div><VMap region="n" /></div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".4s" } as CSSProperties}>01 · Northern cuisine</p>
          <h2 id="t11" data-a="slideL" style={{ "--d": ".5s" } as CSSProperties}>Delicate and balanced</h2>
          <ul className="dishes" data-st="fadeUp" style={{ "--base": "1s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>
              <b>Phở</b>
              <span>clear broth from slowly simmered bones</span>
            </li>
            <li style={{ "--i": "1" } as CSSProperties}>
              <b>Bún chả</b>
              <span>grilled pork with noodles</span>
            </li>
            <li style={{ "--i": "2" } as CSSProperties}>
              <b>Bánh cuốn</b>
              <span>steamed rice rolls</span>
            </li>
          </ul>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.6s" } as CSSProperties}>Cooks try to keep the natural taste of each ingredient.</p>
        </div>
      </div>
    </Slide>
  );
}
