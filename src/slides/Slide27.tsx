import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import SplitText from '../components/SplitText';
import VideoLoader from '../components/VideoLoader';

/** Slide 27: Secrets of the marinade */
export default function Slide27() {
  return (
    <Slide index={26} className="band forest" t="slide" who={5} labelledBy="t24b">
      <div className="flames" aria-hidden="true">
        <span className="flame" style={{ "--i": "0" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "1" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "2" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "3" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "4" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "5" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "6" } as CSSProperties}></span>
      </div>
      <div className="inner">
        <h2 id="t24b" data-letters style={{ "--d": ".3s" } as CSSProperties} aria-label="Bí quyết nước sốt ướp sườn"><SplitText text="Bí quyết nước sốt ướp sườn" start={0} /></h2>
        <div className="marinade-grid">
        <div className="roles" data-st="slideR" style={{ "--base": "1s" } as CSSProperties}>
          <div style={{ "--i": "0" } as CSSProperties}>
            <b>Sả · tỏi · hành tím</b>
            <span>dậy mùi thơm lừng quyến rũ</span>
          </div>
          <div style={{ "--i": "1" } as CSSProperties}>
            <b>Nước mắm ngon</b>
            <span>vị đậm đà, hậu ngọt tự nhiên</span>
          </div>
          <div style={{ "--i": "2" } as CSSProperties}>
            <b>Đường & mật ong</b>
            <span>vị ngọt thanh và caramel hóa vàng óng khi nướng</span>
          </div>
          <div style={{ "--i": "3" } as CSSProperties}>
            <b>Sữa đặc có đường</b>
            <span>giúp thớ thịt mềm ngọt mọng nước và lên màu nâu cánh gián</span>
          </div>
        </div>
        <Photo src="uop-suon.webp" alt="Sườn đang ướp với tỏi, sả và gia vị trong thau" caption="Ướp sườn" sub="để qua đêm cho thấm" h="30vh" tilt="r" tape delay=".8s" />
        </div>
        <VideoLoader data-a="fadeUp" style={{ "--d": "1.8s" } as CSSProperties} note="Mật ong và sữa đặc chính là bí quyết giúp sườn mềm ngọt, lên màu nâu óng chuẩn vị Sài Gòn." />
      </div>
    </Slide>
  );
}
