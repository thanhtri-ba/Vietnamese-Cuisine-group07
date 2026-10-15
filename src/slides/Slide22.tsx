import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 22: Balance on one plate */
export default function Slide22() {
  return (
    <Slide index={21} className="band cream" t="slide" who={4} labelledBy="t21">
      <div className="inner">
        <h2 id="t21" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Sự cân bằng trên đĩa cơm tấm</h2>
        <div className="balance-grid">
        <div>
        <div className="pairs">
          <div className="pair" style={{ "--i": "0" } as CSSProperties}>
            <span className="l">Sườn nướng đậm đà, thơm ngọt</span>
            <span className="plus" aria-hidden="true">+</span>
            <span className="r">Đồ chua thanh mát, giòn sần sật</span>
          </div>
          <div className="pair" style={{ "--i": "1" } as CSSProperties}>
            <span className="l">Mỡ hành béo ngậy, dậy mùi</span>
            <span className="plus" aria-hidden="true">+</span>
            <span className="r">Dưa leo và cà chua tươi giòn</span>
          </div>
          <div className="pair" style={{ "--i": "2" } as CSSProperties}>
            <span className="l">Hạt cơm tấm trắng xốp, thanh vị</span>
            <span className="plus" aria-hidden="true">+</span>
            <span className="r">Nước mắm kẹo chua ngọt mặn mà</span>
          </div>
        </div>
        <p className="purpose" data-a="zoomIn" style={{ "--d": "1.8s" } as CSSProperties}>Mỗi thành phần đều giữ một vai trò hoàn hảo.</p>
        </div>
        <Photo src="com-tam.webp" alt="Fish sauce being poured over a plate of cơm tấm with grilled pork and egg" h="46vh" tilt="r" tape delay=".6s" />
        </div>
      </div>
    </Slide>
  );
}
