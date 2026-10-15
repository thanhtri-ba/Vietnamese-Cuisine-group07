import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 23: The side dishes */
export default function Slide23() {
  return (
    <Slide index={22} className="band cream" t="zoom" who={4} labelledBy="t21b">
      <img className="sil" src="img/i4.webp" alt="" style={{ right: "2%", top: "20px" } as CSSProperties} />
      <div className="inner">
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".3s" } as CSSProperties}>Chi tiết nhỏ làm nên khác biệt lớn</p>
        <h2 id="t21b" data-a="skewIn" style={{ "--d": ".4s", marginTop: "8px" } as CSSProperties}>Các món ăn kèm đặc trưng</h2>
        <div className="sides" data-st="swing" style={{ "--base": ".9s" } as CSSProperties}>
          <article style={{ "--i": "0" } as CSSProperties}>
            <img className="side-photo" src="img/photos/do-chua.webp" alt="A glass jar of pickled carrot and white radish" />
            <h3>Đồ chua <span>Thanh mát & Giòn tan</span></h3>
            <ul>
              <li>Cà rốt và củ cải trắng bào sợi</li>
              <li>Ngâm giấm đường chua ngọt dịu</li>
              <li>Chua ngọt hài hòa, giòn rụm sảng khoái</li>
              <li>Giải ngấy tuyệt đối khi ăn cùng sườn nướng</li>
            </ul>
          </article>
          <article style={{ "--i": "1" } as CSSProperties}>
            <img className="side-photo" src="img/photos/bi.webp" alt="Bì heo trộn thính trong chén" />
            <h3>Bì heo <span>Thơm bùi & Dai giòn</span></h3>
            <ul>
              <li>Da heo luộc chín, lạng mỏng thái sợi đều tay</li>
              <li>Trộn đều cùng <i>thính gạo rang vàng</i> thơm nức</li>
              <li>Sần sật, bùi béo và dậy mùi thơm dân dã</li>
            </ul>
          </article>
        </div>
      </div>
    </Slide>
  );
}
