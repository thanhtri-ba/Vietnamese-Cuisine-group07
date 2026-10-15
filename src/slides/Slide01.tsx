import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import SplitText from '../components/SplitText';
import IntroRunner from '../components/IntroRunner';

/** Slide 1: Vietnamese Cuisine: Cơm tấm Sài Gòn */
export default function Slide01() {
  return (
    <Slide index={0} className="band cream cover" t="fade" who={0} label="Ẩm thực Việt Nam: Cơm tấm Sài Gòn">
      <div className="cover-bg" aria-hidden="true">
        <img src="img/comtam-layers.webp" alt="" />
      </div>
      <div className="inner">
        <div className="cover-text">
          <p className="eyebrow" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties} aria-label="Giới thiệu Việt Nam · Nhóm 7"><span><SplitText text="Giới thiệu Việt Nam · Nhóm 7" start={0} /></span></p>
          <h1 data-letters style={{ "--d": ".35s", marginTop: "14px" } as CSSProperties} aria-label="Ẩm Thực Việt Nam"><span><SplitText text="Ẩm Thực" start={0} /></span><span><SplitText text="Việt Nam" start={8} /></span></h1>
          <p className="sub" data-a="slideL" style={{ "--d": "1.1s" } as CSSProperties} aria-label="Cơm tấm Sài Gòn"><SplitText text="Cơm tấm Sài Gòn" start={0} /></p>
          <ul className="members" data-st="pop" style={{ "--base": "1.4s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>Nhóm 7</li>
            <li style={{ "--i": "1" } as CSSProperties}>Hòa</li>
            <li style={{ "--i": "2" } as CSSProperties}>Hải</li>
            <li style={{ "--i": "3" } as CSSProperties}>Trung</li>
            <li style={{ "--i": "4" } as CSSProperties}>Khoa</li>
            <li style={{ "--i": "5" } as CSSProperties}>Liên</li>
            <li style={{ "--i": "6" } as CSSProperties}>Trí</li>
            <li style={{ "--i": "7" } as CSSProperties}>Đức</li>
          </ul>
          <p className="keys" data-a="fadeUp" style={{ "--d": "2.2s" } as CSSProperties}><kbd>←</kbd><kbd>→</kbd> chuyển slide · <kbd>N</kbd> ghi chú · <kbd>F</kbd> toàn màn hình</p>
        </div>
      </div>
      <IntroRunner />
    </Slide>
  );
}
