import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 15: Vietnamese food goes global */
export default function Slide15() {
  return (
    <Slide index={14} className="band leaf" t="wipe" who={2} labelledBy="t14">
      <Photo src="banh-mi.webp" alt="A Vietnamese bánh mì filled with pork, pickles and herbs" caption="Bánh mì" h="25vh" tilt="r" tape delay="1.1s" className="float-tr" />
      <div className="inner">
        <h2 id="t14" data-a="skewIn" style={{ "--d": ".6s" } as CSSProperties}>Ẩm thực Việt vươn tầm thế giới</h2>
        <div className="marquee" aria-hidden="true" data-a="blurIn" style={{ "--d": ".9s" } as CSSProperties}>
          <div className="row">
            <span className="track">Phở · Bánh mì · Cơm tấm · Phở · Bánh mì · Cơm tấm ·</span>
            <span className="track">Phở · Bánh mì · Cơm tấm · Phở · Bánh mì · Cơm tấm ·</span>
          </div>
          <div className="row">
            <span className="track">Bún chả · Bánh xèo · Gỏi cuốn · Bún chả · Bánh xèo · Gỏi cuốn ·</span>
            <span className="track">Bún chả · Bánh xèo · Gỏi cuốn · Bún chả · Bánh xèo · Gỏi cuốn ·</span>
          </div>
        </div>
        <div className="facts" data-st="flipY" style={{ "--base": "1.3s" } as CSSProperties}>
          <div style={{ "--i": "0" } as CSSProperties}>
            <b>Phủ sóng toàn cầu</b>
            <span>Phở, bánh mì và cơm tấm hiện diện ở hầu khắp các thủ phủ ẩm thực trên thế giới.</span>
          </div>
          <div style={{ "--i": "1" } as CSSProperties}>
            <b>Vào từ điển quốc tế</b>
            <span>Từ “Bánh mì” chính thức được đưa vào các từ điển tiếng Anh uy tín như Oxford.</span>
          </div>
          <div style={{ "--i": "2" } as CSSProperties}>
            <b>24.03.2020</b>
            <span>Google Doodle tôn vinh Bánh mì Việt Nam trên trang tìm kiếm toàn cầu.</span>
          </div>
        </div>
      </div>
    </Slide>
  );
}
