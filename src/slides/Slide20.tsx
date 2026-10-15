import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import FlipCard from '../components/FlipCard';

/** Slide 20: The main ingredients */
export default function Slide20() {
  return (
    <Slide index={19} className="band forest" t="blinds" who={3} labelledBy="t19">
      <div className="inner">
        <h2 id="t19" data-a="wipe" style={{ "--d": ".6s" } as CSSProperties}>Các thành phần chính</h2>
        <div className="flips" data-st="flipY" style={{ "--base": "1s" } as CSSProperties}>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Cơm tấm</strong>
                <img className="card-photo" src="img/photos/com-nau.webp" alt="Cơm tấm rắc mỡ hành" />
                <em>Hạt tấm dẻo bùi</em>
                <small>Chạm hoặc rê chuột</small>
              </span>
              <span className="b"><b>Nền tảng</b>Hạt cơm nhỏ xốp, ngấm trọn vẹn nước mắm và mỡ hành.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Sườn nướng</strong>
                <img className="card-photo" src="img/photos/suon-cay.webp" alt="Miếng sườn nướng" />
                <em>Thơm lừng đậm vị</em>
                <small>Chạm hoặc rê chuột</small>
              </span>
              <span className="b"><b>Ngôi sao của đĩa cơm</b>Mềm mọng, đậm đà vị ngọt mặn và thơm khói than hoa.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Bì</strong>
                <img className="card-photo" src="img/photos/bi.webp" alt="Bì heo trộn thính" />
                <em>Bì heo trộn thính</em>
                <small>Chạm hoặc rê chuột</small>
              </span>
              <span className="b"><b>Độ dai giòn</b>Sợi da heo dai giòn trộn thính gạo rang vàng thơm phức.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Chả trứng</strong>
                <img className="card-photo" src="img/photos/cha-trung.webp" alt="Lát chả trứng" />
                <em>Chả trứng thịt hấp</em>
                <small>Chạm hoặc rê chuột</small>
              </span>
              <span className="b"><b>Đậm đà béo ngậy</b>Trứng, thịt băm, nấm mèo và miến hấp mềm thơm.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Trứng ốp la</strong>
                <img className="card-photo" src="img/photos/op-la.webp" alt="Trứng ốp la" />
                <em>Lòng đào sóng sánh</em>
                <small>Chạm hoặc rê chuột</small>
              </span>
              <span className="b"><b>Mảnh ghép trọn vẹn</b>Lòng đỏ béo ngậy hòa quyện cùng hạt cơm nóng hổi.</span>
            </span>
          </FlipCard>
        </div>
        <p className="lede" data-a="fadeUp" style={{ "--d": "2s", marginTop: "clamp(16px,3vh,28px)", maxWidth: "none" } as CSSProperties}>Mỗi thành phần mang lại một tầng hương vị và cảm giác thích thú trong từng miếng ăn.</p>
      </div>
    </Slide>
  );
}
