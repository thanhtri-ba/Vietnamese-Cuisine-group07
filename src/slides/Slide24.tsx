import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import SplitText from '../components/SplitText';

/** Slide 24: How to prepare cơm tấm */
export default function Slide24() {
  return (
    <Slide index={23} className="band forest" t="up" who={4} labelledBy="t22">
      <div className="inner">
        <h2 id="t22" data-letters style={{ "--d": ".3s" } as CSSProperties} aria-label="Quy trình chế biến cơm tấm"><SplitText text="Quy trình chế biến cơm tấm" start={0} /></h2>
        <ol className="steps4" data-st="dropIn" style={{ "--base": "1.1s" } as CSSProperties}>
          <li style={{ "--i": "0" } as CSSProperties}>
            <img className="step-thumb" src="img/photos/uop-suon.webp" alt="Sườn đang ướp với tỏi, sả và gia vị" />
            <b>Ướp sườn</b>
            <span>Để sườn ngấm đẫm các tầng gia vị thơm ngon.</span>
          </li>
          <li style={{ "--i": "1" } as CSSProperties}>
            <img className="step-thumb" src="img/photos/nuong-suon.webp" alt="Sườn trên bếp than" />
            <b>Nướng than</b>
            <span>Nướng trên than hồng cho đến khi vàng óng xém cạnh.</span>
          </li>
          <li style={{ "--i": "2" } as CSSProperties}>
            <img className="step-thumb" src="img/photos/com-nau.webp" alt="Chén cơm nóng vừa nấu" />
            <b>Nấu cơm</b>
            <span>Hấp chín cơm tấm hạt xốp mềm, chuẩn bị rau củ và đồ chua.</span>
          </li>
          <li style={{ "--i": "3" } as CSSProperties}>
            <img className="step-thumb" src="img/photos/com-tam-suon-bi-cha.webp" alt="Đĩa cơm tấm hoàn chỉnh" />
            <b>Bày đĩa</b>
            <span>Xếp đĩa cơm tròn trịa, rưới mỡ hành bóng bẩy và dọn kèm nước mắm kẹo.</span>
          </li>
        </ol>
        <p className="secret" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}><b>Bí quyết:</b> chăm chút tỉ mỉ cho từng thành phần trên đĩa cơm.</p>
      </div>
    </Slide>
  );
}
