import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 3: Presentation roadmap */
export default function Slide03() {
  return (
    <Slide index={2} className="band cream" t="slide" who={0} labelledBy="t3">
      <div className="inner road-split">
        <div>
          <h2 id="t3" data-a="slideL" style={{ "--d": ".3s", fontSize: "clamp(2rem,min(5vw,8.5vh),4rem)" } as CSSProperties}>Lộ trình thuyết trình</h2>
          <ol className="road v" data-st="pop" style={{ "--base": ".9s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>
              <em>Hải</em>
              <b>Triết lý ẩm thực</b>
              <span>Sự cân bằng, nước mắm, rau thơm</span>
            </li>
            <li style={{ "--i": "1" } as CSSProperties}>
              <em>Trung</em>
              <b>Ẩm thực ba miền</b>
              <span>Miền Bắc, miền Trung, miền Nam</span>
            </li>
            <li style={{ "--i": "2" } as CSSProperties}>
              <em>Khoa</em>
              <b>Câu chuyện cơm tấm</b>
              <span>Nguồn gốc và các nguyên liệu</span>
            </li>
            <li style={{ "--i": "3" } as CSSProperties}>
              <em>Liên</em>
              <b>Cân bằng & Chế biến</b>
              <span>Cách nấu và các món ăn kèm</span>
            </li>
            <li style={{ "--i": "4" } as CSSProperties}>
              <em>Trí</em>
              <b>Sườn nướng than hoa</b>
              <span>Ướp vị, nướng than và các loại sườn</span>
            </li>
            <li style={{ "--i": "5" } as CSSProperties}>
              <em>Đức</em>
              <b>Thưởng thức đúng điệu</b>
              <span>Cách gọi món, câu đố và tổng kết</span>
            </li>
          </ol>
        </div>
        <figure className="frame">
          <span className="tape l" aria-hidden="true"></span>
          <span className="tape r" aria-hidden="true"></span>
          <img src="img/comtam-plate.webp" alt="Hình minh họa đĩa cơm tấm Sài Gòn đầy đủ sườn bì chả trứng" />
          <figcaption>Cơm tấm Sài Gòn</figcaption>
        </figure>
      </div>
    </Slide>
  );
}
