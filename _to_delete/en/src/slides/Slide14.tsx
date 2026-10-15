import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import VMap from '../components/VMap';

/** Slide 14: Sweet and generous */
export default function Slide14() {
  return (
    <Slide index={13} className="band cream" t="up" who={2} labelledBy="t13">
      <div className="wm-box" aria-hidden="true">
        <div className="watermark" aria-hidden="true" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Nam</div>
      </div>
      <div className="inner map-wrap">
        <div className="region-media">
          <div className="mini-map corner" aria-hidden="true"><VMap region="s" /></div>
          <Photo src="banh-xeo.webp" alt="Crispy bánh xèo with shrimp and herbs" caption="Bánh xèo miền Tây" h="46vh" tilt="l" delay=".6s" />
        </div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".4s" } as CSSProperties}>03 · Southern cuisine</p>
          <h2 id="t13" data-a="slideR" style={{ "--d": ".5s" } as CSSProperties}>Sweet and generous</h2>
          <ul className="dishes" data-st="slideR" style={{ "--base": "1s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>
              <b>Hủ tiếu Nam Vang</b>
              <span>a light, sweet broth made from bones, shrimp and dried squid</span>
            </li>
            <li style={{ "--i": "1" } as CSSProperties}>
              <b>Bánh xèo miền Tây</b>
              <span>a crispy pancake wrapped in plenty of wild greens</span>
            </li>
            <li style={{ "--i": "2" } as CSSProperties}>
              <b className="accent">Cơm tấm Sài Gòn</b>
              <span>a much-loved dish and today's main character</span>
            </li>
          </ul>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.6s" } as CSSProperties}>Blessed by nature, southern cuisine is rich in the sweetness of coconut milk and fresh fruit and vegetables all year round.</p>
        </div>
      </div>
    </Slide>
  );
}
