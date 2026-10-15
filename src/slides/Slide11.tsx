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
          <p className="map-note">Bản đồ minh họa · đường bay Hà Nội – Huế – TP.HCM</p>
        </div>
        <div className="copy">
          <h2 id="t10" data-a="fadeDown" style={{ "--d": ".5s" } as CSSProperties}>Ẩm thực ba miền, ba phong vị</h2>
          <div className="regions" data-st="slideR" style={{ "--base": "1.4s" } as CSSProperties}>
            <div className="region" style={{ "--i": "0" } as CSSProperties}>
              <b>Miền Bắc</b>
              <span>Thanh đạm, tinh tế và cân bằng</span>
              <img className="region-thumb" src="img/photos/pho.webp" alt="Tô phở bò" />
            </div>
            <div className="region" style={{ "--i": "1" } as CSSProperties}>
              <b>Miền Trung</b>
              <span>Đậm đà, cay nồng và sắc sảo</span>
              <img className="region-thumb" src="img/photos/bun-bo-hue.webp" alt="Tô bún bò Huế" />
            </div>
            <div className="region" style={{ "--i": "2" } as CSSProperties}>
              <b>Miền Nam</b>
              <span>Hảo ngọt, hào sảng và trù phú rau xanh</span>
              <img className="region-thumb" src="img/photos/banh-xeo.webp" alt="Đĩa bánh xèo" />
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
