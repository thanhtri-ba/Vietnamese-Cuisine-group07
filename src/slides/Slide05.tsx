import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 5: What makes it special? */
export default function Slide05() {
  return (
    <Slide index={4} className="band leaf" t="circle" who={0} labelledBy="t5">
      <div className="inner split">
        <div className="copy">
          <h2 id="t5" data-a="dropIn" style={{ "--d": ".5s" } as CSSProperties}>Điều gì tạo nên sự đặc biệt?</h2>
          <div className="trio" data-st="flipX" style={{ "--base": "1s" } as CSSProperties}>
            <div style={{ "--i": "0" } as CSSProperties}>
              <b>Tươi ngon</b>
              <span>nguyên liệu tươi mới mỗi ngày từ chợ</span>
            </div>
            <div style={{ "--i": "1" } as CSSProperties}>
              <b>Đậm đà</b>
              <span>hòa quyện nhiều hương vị trong một bữa ăn</span>
            </div>
            <div style={{ "--i": "2" } as CSSProperties}>
              <b>Gắn kết</b>
              <span>văn hóa sum vầy quanh mâm cơm sẻ chia</span>
            </div>
          </div>
          <div className="chips" data-st="pop" style={{ "--base": "1.5s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Cơm</span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Rau xanh</span>
            <span className="chip" style={{ "--i": "2" } as CSSProperties}>Thịt / Cá</span>
            <span className="chip" style={{ "--i": "3" } as CSSProperties}>Canh nóng</span>
            <span className="chip" style={{ "--i": "4" } as CSSProperties}>Nước chấm</span>
          </div>
          <div data-a="zoomOut" style={{ "--d": "2.2s" } as CSSProperties}>
            <p className="eyebrow">Một triết lý xuyên suốt</p>
            <p className="big-word">Cân bằng</p>
          </div>
        </div>
        <div className="kb five-photos" data-a="circle" style={{ "--d": ".7s" } as CSSProperties}>
          <img src="img/i20.webp" alt="Người mua hàng đang chọn rau củ tươi tại một quầy sạp chợ truyền thống" />
        </div>
      </div>
    </Slide>
  );
}
