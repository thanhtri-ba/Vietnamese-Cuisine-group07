import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 7: Five flavors in one cuisine */
export default function Slide07() {
  return (
    <Slide index={6} className="band forest" t="blinds" who={1} labelledBy="t7">
      <div className="inner">
        <h2 id="t7" data-a="blurIn" style={{ "--d": ".5s" } as CSSProperties}>Năm hương vị trong ẩm thực Việt</h2>
        <div className="flavors" data-st="dropIn" style={{ "--base": ".9s" } as CSSProperties}>
          <div className="flavor f1" style={{ "--i": "0" } as CSSProperties}>
            <div>
              <b>Chua</b>
              <small>Chanh / Me</small>
              <i>hành mộc</i>
            </div>
          </div>
          <div className="flavor f2" style={{ "--i": "1" } as CSSProperties}>
            <div>
              <b>Cay</b>
              <small>Ớt / Tiêu</small>
              <i>hành kim</i>
            </div>
          </div>
          <div className="flavor f3" style={{ "--i": "2" } as CSSProperties}>
            <div>
              <b>Mặn</b>
              <small>Nước mắm</small>
              <i>hành thủy</i>
            </div>
          </div>
          <div className="flavor f4" style={{ "--i": "3" } as CSSProperties}>
            <div>
              <b>Ngọt</b>
              <small>Đường / Mía</small>
              <i>hành thổ</i>
            </div>
          </div>
          <div className="flavor f5" style={{ "--i": "4" } as CSSProperties}>
            <div>
              <b>Đắng</b>
              <small>Khổ qua / Rau đắng</small>
              <i>hành hỏa</i>
            </div>
          </div>
        </div>
        <div className="harmony-row">
          <Photo src="nuoc-mam-hanh-phi.webp" alt="Chén nước mắm pha tỏi ớt và chén mỡ hành" caption="Chua · cay · mặn · ngọt" h="15vh" tilt="l" delay="1.6s" />
          <p className="harmony" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}>Không phải món ăn nào cũng có đủ cả năm vị. Người nấu khéo léo phối hợp để tạo nên hương vị <b className="accent">hài hòa</b>: đậm đà nhưng thanh tao, không bao giờ ngấy.</p>
        </div>
      </div>
    </Slide>
  );
}
