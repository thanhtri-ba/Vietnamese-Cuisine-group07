import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 9: Fish sauce: the soul of Vietnamese cooking */
export default function Slide09() {
  return (
    <Slide index={8} className="band forest" t="zoom" who={1} labelledBy="t8">
      <div className="inner split">
        <Photo src="nuoc-mam-phu-quoc.webp" alt="A bottle of Phú Quốc fish sauce with anchovies and chili by the sea" caption="Nước mắm Phú Quốc" h="58vh" tilt="l" tape delay=".3s" />
        <div className="copy">
          <h2 id="t8" data-a="slideR" style={{ "--d": ".5s" } as CSSProperties}>Nước mắm: linh hồn ẩm thực Việt</h2>
          <div className="chips" data-st="pop" style={{ "--base": "1s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Ướp thịt<small>ngấm sâu vị ngọt</small></span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Nêm nếm<small>đậm đà nước dùng</small></span>
            <span className="chip" style={{ "--i": "2" } as CSSProperties}>Nước chấm<small>pha chua ngọt hài hòa</small></span>
          </div>
          <div data-a="fadeUp" style={{ "--d": "1.5s" } as CSSProperties}>
            <p className="year">2012</p>
            <p className="lede">Nước mắm Phú Quốc trở thành sản phẩm đầu tiên của Việt Nam được Liên minh Châu Âu (EU) công nhận và bảo hộ chỉ dẫn địa lý.</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
