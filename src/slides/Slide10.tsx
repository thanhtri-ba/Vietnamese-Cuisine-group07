import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 10: Fresh herbs and vegetables */
export default function Slide10() {
  return (
    <Slide index={9} className="band leaf" t="slide" who={1} labelledBy="t9">
      <div className="inner split">
        <div className="kb" data-a="wipe" style={{ "--d": ".4s", height: "clamp(240px,62vh,560px)" } as CSSProperties}>
          <img src="img/i14.webp" alt="Rau xanh tươi được xếp cẩn thận vào thúng tre tại chợ" />
        </div>
        <div className="copy">
          <h2 id="t9" data-a="slideR" style={{ "--d": ".6s" } as CSSProperties}>Rau thơm và rau củ tươi xanh</h2>
          <div className="chips" data-st="swing" style={{ "--base": "1s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Húng quế<small>thơm nồng đặc trưng</small></span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Rau ngò<small>thanh mát, dậy mùi</small></span>
            <span className="chip" style={{ "--i": "2" } as CSSProperties}>Dưa leo<small>giòn ngọt, giải nhiệt</small></span>
            <span className="chip" style={{ "--i": "3" } as CSSProperties}>Giá đỗ<small>tươi giòn mát lành</small></span>
            <span className="chip" style={{ "--i": "4" } as CSSProperties}>Chanh tươi<small>chua thanh kích thích</small></span>
          </div>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.8s" } as CSSProperties}>Tươi mát, ngát hương và giòn ngọt. Rau thơm giúp cân bằng hoàn hảo độ béo ngậy của các món chiên nướng. Khi thưởng thức phở hay bún, mỗi người có thể tự do gia giảm rau thơm và vắt thêm chanh theo đúng gu của mình.</p>
        </div>
      </div>
    </Slide>
  );
}
