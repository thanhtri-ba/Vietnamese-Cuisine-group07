import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 18: From humble meal to Saigon icon */
export default function Slide18() {
  return (
    <Slide index={17} className="band cream" t="slide" who={3} labelledBy="t17">
      <img className="sil" src="img/i25.webp" alt="" style={{ right: "2%", top: "20px" } as CSSProperties} />
      <div className="inner">
        <h2 id="t17" data-a="slideL" style={{ "--d": ".3s" } as CSSProperties}>Từ món ăn bình dân đến biểu tượng Sài Gòn</h2>
        <ol className="journey" data-st="pop" style={{ "--base": "1.1s" } as CSSProperties}>
          <li style={{ "--i": "0" } as CSSProperties}>
            <img className="journey-thumb" src="img/photos/gao-tam.webp" alt="Hạt gạo tấm" />
            <b>Gạo tấm</b>
            <span>Giá thành rẻ, no lâu và chắc dạ</span>
          </li>
          <li style={{ "--i": "1" } as CSSProperties}>
            <img className="journey-thumb" src="img/photos/com-tam-ve.webp" alt="Tranh quán cơm tấm vỉa hè" />
            <b>Quán vỉa hè</b>
            <span>Những gánh hàng rong đưa cơm tấm vào đời sống</span>
          </li>
          <li style={{ "--i": "2" } as CSSProperties}>
            <img className="journey-thumb" src="img/photos/com-sang.webp" alt="Bàn cơm tấm buổi sáng" />
            <b>Văn hóa phố phường</b>
            <span>Trở thành một phần không thể thiếu của người Sài Gòn</span>
          </li>
          <li style={{ "--i": "3" } as CSSProperties}>
            <img className="journey-thumb" src="img/photos/com-trua.webp" alt="Nhà hàng cơm tấm" />
            <b>Nhà hàng lớn</b>
            <span>Từ hè phố bước vào các nhà hàng sang trọng</span>
          </li>
        </ol>
        <div className="senses" data-st="flipX" style={{ "--base": "1.8s" } as CSSProperties}>
          <div style={{ "--i": "0" } as CSSProperties}><b>Khứu giác</b>Mùi sườn nướng than hoa thơm nức mũi</div>
          <div style={{ "--i": "1" } as CSSProperties}><b>Thính giác</b>Tiếng mỡ xèo xèo tí tách trên vỉ than hồng</div>
          <div style={{ "--i": "2" } as CSSProperties}><b>Thị giác</b>Đĩa cơm tấm đủ sắc màu quen thuộc</div>
        </div>
      </div>
    </Slide>
  );
}
