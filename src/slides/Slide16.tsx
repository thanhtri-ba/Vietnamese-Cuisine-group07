import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import SplitText from '../components/SplitText';

/** Slide 16: Meet cơm tấm */
export default function Slide16() {
  return (
    <Slide index={15} className="band forest" t="circle" who={3} labelledBy="t15">
      <div className="inner split">
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".6s" } as CSSProperties}>Món ngon biểu tượng Sài Gòn</p>
          <h2 id="t15" data-letters style={{ "--d": ".7s", fontSize: "clamp(3rem,min(9vw,16vh),8rem)" } as CSSProperties} aria-label="Gặp gỡ cơm tấm"><SplitText text="Gặp gỡ cơm tấm" start={0} /></h2>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.5s" } as CSSProperties}>Cơm tấm dẻo bùi, sườn nướng than hoa, rau củ chua ngọt và nước mắm kẹo đậm đà trên một đĩa cơm tròn.</p>
          <div className="chips" data-st="pop" style={{ "--base": "1.9s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Bữa sáng</span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Bữa trưa</span>
            <span className="chip" style={{ "--i": "2" } as CSSProperties}>Bữa tối & Đêm</span>
          </div>
        </div>
        <Photo src="com-tam-suon-bi-cha.webp" alt="A plate of cơm tấm with grilled pork, shredded pork skin, egg meatloaf, fried egg and vegetables" caption="Cơm tấm sườn bì chả" sub="ảnh thật" h="62vh" tilt="r" tape delay=".8s" />
      </div>
    </Slide>
  );
}
