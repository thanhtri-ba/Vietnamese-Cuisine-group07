import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 26: Grilled pork ribs in four steps */
export default function Slide26() {
  return (
    <Slide index={25} className="band forest" t="circle" who={5} labelledBy="t24">
      <div className="ask-bg" aria-hidden="true">
        <img src="img/photos/nuong-suon.webp" alt="" />
      </div>
      <div className="flames" aria-hidden="true">
        <span className="flame" style={{ "--i": "0" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "1" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "2" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "3" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "4" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "5" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "6" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "7" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "8" } as CSSProperties}></span>
      </div>
      <div className="inner">
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".6s" } as CSSProperties}>Ngôi sao của đĩa cơm tấm</p>
        <h2 id="t24" data-a="zoomOut" style={{ "--d": ".7s", marginTop: "8px" } as CSSProperties}>4 bước nướng sườn hoàn hảo</h2>
        <ol className="steps4" data-st="flipX" style={{ "--base": "1.2s" } as CSSProperties}>
          <li style={{ "--i": "0" } as CSSProperties}>
            <b>Dần mềm thịt</b>
            <span>Dần nhẹ miếng thịt để thớ thịt mềm mại và dễ ngấm sốt.</span>
          </li>
          <li style={{ "--i": "1" } as CSSProperties}>
            <b>Ướp đậm vị</b>
            <span>Tỏi, hành tím, sả, nước mắm, mật ong, sữa đặc. Ướp qua đêm là ngon nhất.</span>
          </li>
          <li style={{ "--i": "2" } as CSSProperties}>
            <b>Nướng than hoa</b>
            <span>Nướng trên than hồng vừa phải, lật đều tay để thịt chín mềm mọng nước.</span>
          </li>
          <li style={{ "--i": "3" } as CSSProperties}>
            <b>Quét sốt óng</b>
            <span>Quét lớp mỡ sốt lên bề mặt để sườn bóng bẩy và xém cạnh thơm lừng.</span>
          </li>
        </ol>
      </div>
    </Slide>
  );
}
