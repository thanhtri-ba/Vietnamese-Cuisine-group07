import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 21: Cơm Tấm Ba Ghiền */
export default function Slide21() {
  return (
    <Slide index={20} className="band forest" t="zoom" who={3} labelledBy="t20">
      <div className="inner split">
        <div className="ba-wrap">
          <Photo src="com-tam-ba-ghien.webp" alt="Storefront of Cơm Tấm Ba Ghiền with delivery drivers waiting outside" caption="Cơm Tấm Ba Ghiền" sub="Phú Nhuận, Sài Gòn" h="42vh" tilt="l" tape delay=".4s" />
          <div className="badge-big" data-a="spinIn" style={{ "--d": ".5s" } as CSSProperties}>
          <span className="ring"></span>
          <span className="disc"></span>
          <span className="txt">Bib<br />Gourmand<small>MICHELIN Guide</small></span>
        </div>
        </div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".8s" } as CSSProperties}>Từ quán ăn hè phố đến cẩm nang MICHELIN</p>
          <h2 id="t20" data-a="slideR" style={{ "--d": ".9s" } as CSSProperties}>Cơm Tấm Ba Ghiền</h2>
          <div className="chips" data-st="pop" style={{ "--base": "1.3s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Quận Phú Nhuận, TP.HCM</span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Danh hiệu Bib Gourmand liên tục từ năm 2023</span>
          </div>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.8s" } as CSSProperties}>Hạng mục Bib Gourmand vinh danh những quán ăn ngon với giá cả phải chăng. Một món ăn dân dã đường phố vẫn khẳng định sức hút quốc tế mà vẫn vẹn nguyên nét bình dị đời thường.</p>
          <p className="lede accent" data-a="fadeUp" style={{ "--d": "2.2s" } as CSSProperties}>
            <i>Nhưng vì sao một đĩa cơm đầy đặn như vậy lại không hề bị ngấy?</i>
          </p>
        </div>
      </div>
    </Slide>
  );
}
