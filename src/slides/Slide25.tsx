import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 25: Dipping fish sauce & scallion oil */
export default function Slide25() {
  return (
    <Slide index={24} className="band leaf" t="wipe" who={4} labelledBy="t23">
      <div className="inner">
        <h2 id="t23" data-a="slideL" style={{ "--d": ".5s" } as CSSProperties}>Nước mắm pha & mỡ hành</h2>
        <div className="recipe">
          <svg className="glass" viewBox="0 0 120 170" role="img" aria-label="Tỷ lệ pha nước mắm: 6 nước ấm, 3 đường, 3 nước mắm, 1 nước cốt chanh" data-a="fadeUp" style={{ "--d": ".5s" } as CSSProperties}>
            <defs>
              <clipPath id="glass-clip">
                <path d="M14 10 h92 l-10 150 h-72z"></path>
              </clipPath>
            </defs>
            <g clipPath="url(#glass-clip)">
              <rect className="layer" style={{ "--i": "0" } as CSSProperties} x="0" y="94" width="120" height="66" fill="#E8F1F2"></rect>
              <rect className="layer" style={{ "--i": "1" } as CSSProperties} x="0" y="61" width="120" height="33" fill="#FFF6E2"></rect>
              <rect className="layer" style={{ "--i": "2" } as CSSProperties} x="0" y="28" width="120" height="33" fill="#C98A2B"></rect>
              <rect className="layer" style={{ "--i": "3" } as CSSProperties} x="0" y="17" width="120" height="11" fill="#A1CB47"></rect>
            </g>
            <path d="M14 10 h92 l-10 150 h-72z" fill="none" stroke="#165D3A" strokeWidth="3"></path>
          </svg>
          <div>
            <p className="eyebrow">Công thức nước mắm chua ngọt chuẩn vị</p>
            <ul className="measure" data-st="slideR" style={{ "--base": ".9s", marginTop: "10px" } as CSSProperties}>
              <li style={{ "--i": "0" } as CSSProperties}><i style={{ background: "#E8F1F2", outline: "1px solid #165D3A" } as CSSProperties}></i><b>6 muỗng</b>nước ấm</li>
              <li style={{ "--i": "1" } as CSSProperties}><i style={{ background: "#FFF6E2", outline: "1px solid #165D3A" } as CSSProperties}></i><b>3 muỗng</b>đường</li>
              <li style={{ "--i": "2" } as CSSProperties}><i style={{ background: "#C98A2B" } as CSSProperties}></i><b>3 muỗng</b>nước mắm ngon</li>
              <li style={{ "--i": "3" } as CSSProperties}><i style={{ background: "#A1CB47" } as CSSProperties}></i><b>1 muỗng</b>nước cốt chanh</li>
              <li style={{ "--i": "4" } as CSSProperties}><i style={{ background: "#D93A2B" } as CSSProperties}></i><b>Tùy khẩu vị</b>tỏi và ớt băm nhuyễn</li>
            </ul>
          </div>
          <div className="oil" data-a="flipY" style={{ "--d": "1.6s" } as CSSProperties}>
            <img className="oil-photo" src="img/photos/nuoc-mam-hanh-phi.webp" alt="A bowl of fish sauce with chili next to a bowl of scallion oil" />
            <h3>Mỡ hành béo ngậy</h3>
            <ol>
              <li>Đun sôi dầu ăn (hoặc mỡ heo).</li>
              <li>Tắt bếp khi dầu vừa nóng già.</li>
              <li>Đổ vào chén hành lá thái nhỏ cùng chút xíu muối để giữ sắc xanh.</li>
            </ol>
            <p style={{ fontSize: ".9rem", color: "var(--sage)" } as CSSProperties}>Hai loại gia vị linh hồn này kết nối trọn vẹn mọi hương vị của đĩa cơm.</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
