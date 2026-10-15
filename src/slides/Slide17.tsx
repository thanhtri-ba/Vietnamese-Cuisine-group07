import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 17: What does “tấm” mean? */
export default function Slide17() {
  return (
    <Slide index={16} className="band forest" t="fade" who={3} labelledBy="t16">
      <div className="inner" style={{ textAlign: "center" } as CSSProperties}>
        <h2 id="t16" data-a="fadeDown" style={{ "--d": ".3s" } as CSSProperties}>“Tấm” có nghĩa là gì?</h2>
        <div className="rice-pair">
          <Photo src="gao-thuong.webp" alt="Whole rice grains spilling from a bamboo basket" caption="Gạo thường" sub="nguyên hạt" h="40vh" w="min(34vw,40vh)" tilt="l" delay=".6s" />
          <Photo src="gao-tam.webp" alt="Illustration of a pile of broken rice grains" caption="Gạo tấm" sub="hạt vỡ" h="40vh" w="min(34vw,40vh)" tilt="r" delay="1s" />
        </div>
        <div className="chips" data-st="fadeUp" style={{ "--base": "2.2s", justifyContent: "center", marginTop: "clamp(16px,3vh,28px)" } as CSSProperties}>
          <span className="chip" style={{ "--i": "0" } as CSSProperties}>Hạt gạo bị vỡ khi xay xát</span>
          <span className="chip" style={{ "--i": "1" } as CSSProperties}>Giá thành rẻ hơn gạo nguyên</span>
          <span className="chip" style={{ "--i": "2" } as CSSProperties}>Bữa ăn chắc dạ của người lao động</span>
          <span className="chip" style={{ "--i": "3" } as CSSProperties}>Từ món bình dân → đặc sản trứ danh</span>
        </div>
      </div>
    </Slide>
  );
}
