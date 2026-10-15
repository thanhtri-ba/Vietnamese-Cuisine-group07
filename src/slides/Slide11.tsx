import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import VMap from '../components/VMap';

/** Slide 11: Three regions, three personalities */
export default function Slide11() {
  return (
    <Slide index={10} className="band cream" t="circle" who={2} labelledBy="t10">
      <div className="inner map-wrap">
        <div>
          <div><VMap region="" /></div>
          <p className="map-note">Stylized route, not to scale</p>
        </div>
        <div className="copy">
          <h2 id="t10" data-a="fadeDown" style={{ "--d": ".5s" } as CSSProperties}>Three regions, three personalities</h2>
          <div className="regions" data-st="slideR" style={{ "--base": "1.4s" } as CSSProperties}>
            <div className="region" style={{ "--i": "0" } as CSSProperties}>
              <b>North<small>miền Bắc</small></b>
              <span>Delicate and balanced</span>
            </div>
            <div className="region" style={{ "--i": "1" } as CSSProperties}>
              <b>Central<small>miền Trung</small></b>
              <span>Bold and spicy</span>
            </div>
            <div className="region" style={{ "--i": "2" } as CSSProperties}>
              <b>South<small>miền Nam</small></b>
              <span>Sweeter, generous with vegetables</span>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
