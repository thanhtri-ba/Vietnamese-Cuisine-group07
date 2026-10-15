import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import SplitText from '../components/SplitText';
import { PollRecall } from '../components/Poll';

/** Slide 32: Thank you! */
export default function Slide32() {
  return (
    <Slide index={31} className="band forest finale" t="zoom" who={6} labelledBy="t25">
      <div className="inner">
        <p className="lead" data-a="blurIn" style={{ "--d": ".4s" } as CSSProperties}>Từ những hạt gạo tấm vỡ vụn đến món ăn biểu tượng làm say lòng người của Sài Gòn</p>
        <div className="chips" data-st="pop" style={{ "--base": "1.1s" } as CSSProperties}>
          <span className="chip" style={{ "--i": "0" } as CSSProperties}>Cân bằng hương vị</span>
          <span className="chip" style={{ "--i": "1" } as CSSProperties}>Ẩm thực ba miền</span>
          <span className="chip" style={{ "--i": "2" } as CSSProperties}>Câu chuyện cơm tấm</span>
        </div>
        <PollRecall data-a="fadeUp" style={{ "--d": "1.6s" } as CSSProperties} />
        <div className="trio-photos">
          <Photo src="pho.webp" alt="Tô phở bò" caption="Phở" h="13vh" w="13vh" tilt="l" delay="1.8s" />
          <Photo src="banh-mi.webp" alt="Ổ bánh mì" caption="Bánh mì" h="13vh" w="13vh" tilt="none" delay="2s" />
          <Photo src="com-tam-suon-bi-cha.webp" alt="Đĩa cơm tấm" caption="Cơm tấm" h="13vh" w="13vh" tilt="r" delay="2.2s" />
        </div>
        <h2 id="t25" className="wave" data-letters aria-label="Cảm ơn các bạn!"><SplitText text="Cảm ơn các bạn!" start={0} /></h2>
        <p className="qa" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}>Hỏi & Đáp (Q&A)</p>
      </div>
    </Slide>
  );
}
