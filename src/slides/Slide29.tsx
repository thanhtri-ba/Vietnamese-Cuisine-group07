import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 29: Order like a local */
export default function Slide29() {
  return (
    <Slide index={28} className="band leaf" t="circle" who={6} labelledBy="t24d">
      <div className="inner split">
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".6s" } as CSSProperties}>Tại quán cơm tấm</p>
          <h2 id="t24d" data-a="slideL" style={{ "--d": ".7s" } as CSSProperties}>Gọi món như người bản xứ</h2>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.1s" } as CSSProperties}>Những câu gọi món thân quen, rộn rã mỗi ngày tại khắp các nẻo đường quán xá Sài Gòn!</p>
          <Photo src="com-tam-ve.webp" alt="Illustration of a cơm tấm street stall with a customer on a plastic stool" h="28vh" tilt="l" delay="1.4s" />
        </div>
        <div className="bubbles" data-st="pop" style={{ "--base": "1.2s" } as CSSProperties}>
          <div className="bubble" style={{ "--i": "0" } as CSSProperties}>
            <b>“Cho em một dĩa sườn bì chả.”</b>
            <span>Đĩa cơm tấm kinh điển đầy đủ 3 món truyền thống</span>
          </div>
          <div className="bubble r" style={{ "--i": "1" } as CSSProperties}>
            <b>“Thêm trứng ốp la.”</b>
            <span>Gọi thêm một quả trứng ốp la lòng đào béo ngậy</span>
          </div>
          <div className="bubble" style={{ "--i": "2" } as CSSProperties}>
            <b>“Nhiều mỡ hành tóp mỡ!”</b>
            <span>Thêm mỡ hành thơm nức và tóp mỡ giòn rụm</span>
          </div>
          <div className="bubble r" style={{ "--i": "3" } as CSSProperties}>
            <b>“Cho dĩa cơm thêm nha!”</b>
            <span>Cơm tấm quá ngon và muốn ăn thêm một chén nữa</span>
          </div>
        </div>
      </div>
    </Slide>
  );
}
