import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 28: Choose your sườn */
export default function Slide28() {
  return (
    <Slide index={27} className="band cream" t="blinds" who={5} labelledBy="t24c">
      <img className="sil" src="img/i25.webp" alt="" style={{ right: "2%", top: "20px" } as CSSProperties} />
      <div className="inner">
        <h2 id="t24c" data-a="dropIn" style={{ "--d": ".4s" } as CSSProperties}>Lựa chọn phần sườn yêu thích</h2>
        <div className="kinds" data-st="flipX" style={{ "--base": "1s" } as CSSProperties}>
          <article style={{ "--i": "0" } as CSSProperties}>
            <strong>Sườn cốt lết</strong>
            <em>Phổ biến nhất</em>
            <span>Bản to, dính chút xương rìa, nướng thơm lừng chuẩn vị cơm tấm truyền thống.</span>
          </article>
          <article style={{ "--i": "1" } as CSSProperties}>
            <strong>Sườn non</strong>
            <em>Mềm mọng & Nạc giòn</em>
            <span>Dẻ sườn nhỏ nhiều thịt xen sụn non giòn sần sật, mọng nước và đậm đà.</span>
          </article>
          <article style={{ "--i": "2" } as CSSProperties}>
            <strong>Sườn cây</strong>
            <em>Dày thịt & Đậm vị</em>
            <span>Thanh sườn dài nướng than hồng thơm phức, cắn ngập chân răng đã miệng.</span>
          </article>
        </div>
        <p className="eyebrow" data-a="fadeUp" style={{ "--d": "1.7s", marginTop: "clamp(16px,3vh,28px)" } as CSSProperties}>Các món ăn kèm phong phú để đĩa cơm thêm trọn vị</p>
        <div className="chips" data-st="pop" style={{ "--base": "1.9s", marginTop: "10px" } as CSSProperties}>
          <span className="chip" style={{ "--i": "0" } as CSSProperties}>Lạp xưởng tươi<small>chiên vàng thơm ngọt</small></span>
          <span className="chip" style={{ "--i": "1" } as CSSProperties}>Gà nướng<small>đùi gà ướp nướng mật ong</small></span>
          <span className="chip" style={{ "--i": "2" } as CSSProperties}>Trứng ốp la<small>lòng đào béo ngậy</small></span>
          <span className="chip" style={{ "--i": "3" } as CSSProperties}>Chả trứng<small>hấp vàng óng thơm mềm</small></span>
        </div>
      </div>
    </Slide>
  );
}
