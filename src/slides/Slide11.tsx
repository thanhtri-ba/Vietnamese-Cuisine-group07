import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import VMap from '../components/VMap';

/** Slide 11: Three regions, three personalities */
export default function Slide11() {
  return (
    <Slide index={10} className="band cream viet viet-giay tiles" t="circle" who={2} labelledBy="t10">
      <div className="inner map-wrap">
        <div>
          <div><VMap region="" /></div>
          <p className="map-note">Illustrative map · flight route Hanoi – Hue – HCMC</p>
        </div>
        <div className="copy">
          <h2 id="t10" data-a="fadeDown" style={{ "--d": ".5s" } as CSSProperties}>Three regions, three personalities</h2>
          <div className="regions" data-st="slideR" style={{ "--base": "1.4s" } as CSSProperties}>
            <div className="region" style={{ "--i": "0" } as CSSProperties}>
              <b>The North</b>
              <span>Light, delicate and balanced</span>
              <img className="region-thumb" src="img/photos/pho.webp" alt="A bowl of beef noodle soup" />
            </div>
            <div className="region" style={{ "--i": "1" } as CSSProperties}>
              <b>The Center</b>
              <span>Bold, spicy and intense</span>
              <img className="region-thumb" src="img/photos/bun-bo-hue.webp" alt="A bowl of Hue spicy beef noodle soup" />
            </div>
            <div className="region" style={{ "--i": "2" } as CSSProperties}>
              <b>The South</b>
              <span>Sweeter, generous and full of fresh greens</span>
              <img className="region-thumb" src="img/photos/banh-xeo.webp" alt="A plate of sizzling pancakes" />
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
