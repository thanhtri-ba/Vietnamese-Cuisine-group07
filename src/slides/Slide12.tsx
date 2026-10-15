import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import VMap from '../components/VMap';

/** Slide 12: Delicate and balanced */
export default function Slide12() {
  return (
    <Slide index={11} className="band leaf" t="down" who={2} labelledBy="t11">
      <div className="wm-box" aria-hidden="true">
        <div className="watermark" aria-hidden="true" data-a="fadeUp" style={{ "--d": ".2s" } as CSSProperties}>Bắc</div>
      </div>
      <div className="inner map-wrap">
        <div className="region-media">
          <div className="mini-map corner" aria-hidden="true"><VMap region="n" /></div>
          <Photo src="pho.webp" alt="Steaming bowl of beef phở" caption="Phở Hà Nội" h="46vh" tilt="l" delay=".6s" />
        </div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".4s" } as CSSProperties}>01 · Ẩm thực miền Bắc</p>
          <h2 id="t11" data-a="slideL" style={{ "--d": ".5s" } as CSSProperties}>Thanh đạm và tinh tế</h2>
          <ul className="dishes" data-st="fadeUp" style={{ "--base": "1s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>
              <b>Phở Hà Nội</b>
              <span>nước dùng trong thanh, ngọt tự nhiên từ xương hầm</span>
            </li>
            <li style={{ "--i": "1" } as CSSProperties}>
              <b>Bún chả</b>
              <span>thịt nướng than hoa thơm lừng ăn kèm bún tươi</span>
            </li>
            <li style={{ "--i": "2" } as CSSProperties}>
              <b>Bánh cuốn</b>
              <span>bánh tráng mỏng mềm mượt cuốn nhân thịt mộc nhĩ</span>
            </li>
          </ul>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.6s" } as CSSProperties}>Người nấu luôn đề cao việc tôn vinh hương vị tươi ngon nguyên bản của từng nguyên liệu.</p>
        </div>
      </div>
    </Slide>
  );
}
