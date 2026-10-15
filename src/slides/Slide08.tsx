import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import YinYang from '../components/YinYang';
import YYRunner from '../components/YYRunner';

/** Slide 8: Yin and yang on the plate */
export default function Slide08() {
  return (
    <Slide index={7} className="band leaf" t="wipe" who={1} labelledBy="t7b">
      <div className="inner split">
        <div className="yy-wrap" data-a="spinIn" style={{ "--d": ".5s" } as CSSProperties}>
          <YinYang />
          <span className="yy-l">Hàn<small>Âm</small></span>
          <span className="yy-r">Nhiệt<small>Dương</small></span>
        </div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".7s" } as CSSProperties}>Cân bằng cho cơ thể</p>
          <h2 id="t7b" data-a="slideR" style={{ "--d": ".8s" } as CSSProperties}>Âm dương trong món ăn</h2>
          <div className="pairs yy-pairs">
            <div className="pair" style={{ "--i": "0" } as CSSProperties}>
              <span className="l">Thịt vịt<small>tính hàn (lạnh)</small></span>
              <span className="plus" aria-hidden="true">+</span>
              <span className="r">Nước mắm gừng<small>tính nhiệt (ấm)</small></span>
            </div>
            <div className="pair" style={{ "--i": "1" } as CSSProperties}>
              <span className="l">Ngày hè oi bức</span>
              <span className="plus" aria-hidden="true">+</span>
              <span className="r">Canh khổ qua<small>thanh nhiệt, mát ruột</small></span>
            </div>
          </div>
          <div className="yy-row">
            <Photo src="kho-qua.webp" alt="Watercolor of bitter melon soup and braised pork" caption="Canh khổ qua" h="12vh" w="20vh" tilt="r" delay="1.7s" />
            <p className="lede" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}>Kinh nghiệm ẩm thực dân gian phản ánh sự tinh tế và chu đáo của người Việt đối với sức khỏe.</p>
          </div>
        </div>
      </div>
      <YYRunner />
    </Slide>
  );
}
