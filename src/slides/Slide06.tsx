import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import SplitText from '../components/SplitText';

/** Slide 6: The philosophy of balance */
export default function Slide06() {
  return (
    <Slide index={5} className="band cream" t="up" who={1} labelledBy="t6">
      <img className="sil" src="img/i12.webp" alt="" style={{ left: "2%", top: "40px" } as CSSProperties} />
      <div className="inner split split-photo">
        <Photo src="bun-cha.webp" alt="Bún chả: grilled pork in dipping sauce with rice noodles and herbs" caption="Bún chả Hà Nội" h="60vh" tilt="l" tape delay=".4s" />
        <div className="copy" style={{ textAlign: "center" } as CSSProperties}>
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Ẩm thực Việt trong một từ</p>
        <h2 id="t6" data-letters style={{ "--d": ".3s", marginTop: "10px", fontSize: "clamp(2rem,min(4.4vw,8vh),3.8rem)" } as CSSProperties} aria-label="Triết lý của sự cân bằng"><SplitText text="Triết lý của sự cân bằng" start={0} /></h2>
        <div className="seesaw" data-a="fadeUp" style={{ "--d": ".4s" } as CSSProperties}>
          <div className="beam">
            <div className="pan l">
              <span>Món béo ngậy</span>
              <span>Món chín nóng</span>
              <span>Vị ngọt đậm</span>
            </div>
            <div className="pan r">
              <span>Rau xanh tươi</span>
              <span>Rau thơm sống</span>
              <span>Vị chua thanh, mặn dịu</span>
            </div>
          </div>
          <div className="pivot"></div>
        </div>
        <p className="example" data-a="fadeUp" style={{ "--d": "2.6s" } as CSSProperties}>Ví dụ: <b>bún chả</b> · thịt nướng + rau thơm + đồ chua + nước chấm</p>
        </div>
      </div>
    </Slide>
  );
}
