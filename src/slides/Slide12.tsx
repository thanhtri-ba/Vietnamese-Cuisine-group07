import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import VMap from '../components/VMap';

/** Slide 12: Delicate and balanced */
export default function Slide12() {
  return (
    <Slide index={11} className="band leaf" t="down" who={2} labelledBy="t11">
      <div className="wm-box" aria-hidden="true">
        <div className="watermark" aria-hidden="true" data-a="fadeUp" style={{ "--d": ".2s" } as CSSProperties}>North</div>
      </div>
      <div className="inner map-wrap">
        <div className="region-media">
          <div className="mini-map corner" aria-hidden="true"><VMap region="n" /></div>
          <Photo src="pho.webp" alt="Steaming bowl of beef pho" caption="Hanoi pho" h="46vh" tilt="l" delay=".6s" />
        </div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".4s" } as CSSProperties}>01 · Northern cuisine</p>
          <h2 id="t11" data-a="slideL" style={{ "--d": ".5s" } as CSSProperties}>Light and delicate</h2>
          <ul className="dishes" data-st="fadeUp" style={{ "--base": "1s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>
              <b>Hanoi pho</b>
              <span>a clear broth, naturally sweet from slow-simmered bones</span>
            </li>
            <li style={{ "--i": "1" } as CSSProperties}>
              <b>Grilled pork noodles</b>
              <span>fragrant charcoal-grilled pork served with fresh rice noodles</span>
            </li>
            <li style={{ "--i": "2" } as CSSProperties}>
              <b>Steamed rice rolls</b>
              <span>thin, silky rice sheets rolled around pork and wood-ear mushrooms</span>
            </li>
          </ul>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.6s" } as CSSProperties}>Northern cooks focus on bringing out the natural, fresh taste of each ingredient.</p>
        </div>
      </div>
    </Slide>
  );
}
