import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import VMap from '../components/VMap';

/** Slide 14: Sweet and generous */
export default function Slide14() {
  return (
    <Slide index={13} className="band cream" t="up" who={2} labelledBy="t13">
      <div className="wm-box" aria-hidden="true">
        <div className="watermark" aria-hidden="true" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Nam</div>
      </div>
      <div className="inner map-wrap">
        <div><VMap region="s" /></div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".4s" } as CSSProperties}>03 · Southern cuisine</p>
          <h2 id="t13" data-a="slideR" style={{ "--d": ".5s" } as CSSProperties}>Sweet and generous</h2>
          <ul className="dishes" data-st="slideR" style={{ "--base": "1s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>
              <b>Hủ tiếu</b>
              <span>noodle soup</span>
            </li>
            <li style={{ "--i": "1" } as CSSProperties}>
              <b>Bánh xèo</b>
              <span>crispy sizzling pancake</span>
            </li>
            <li style={{ "--i": "2" } as CSSProperties}>
              <b className="accent">Cơm tấm</b>
              <span>broken rice, our dish today</span>
            </li>
          </ul>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.6s" } as CSSProperties}>A tropical climate brings many fruits, herbs and vegetables to the table.</p>
        </div>
      </div>
    </Slide>
  );
}
