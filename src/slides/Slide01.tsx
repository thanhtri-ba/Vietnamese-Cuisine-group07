import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import SplitText from '../components/SplitText';

/** Slide 1: Vietnamese Cuisine: Cơm tấm Sài Gòn */
export default function Slide01() {
  return (
    <Slide index={0} className="band cream cover" t="fade" who={0} label="Vietnamese Cuisine: Cơm tấm Sài Gòn">
      <div className="cover-bg" aria-hidden="true">
        <img src="img/comtam-layers.webp" alt="" />
      </div>
      <div className="inner">
        <div className="cover-text">
          <p className="eyebrow" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Introduce Vietnam · Group 7</p>
          <h1 data-letters style={{ "--d": ".35s", marginTop: "14px" } as CSSProperties} aria-label="Vietnamese Cuisine"><span><SplitText text="Vietnamese" start={0} /></span><span><SplitText text="Cuisine" start={10} /></span></h1>
          <p className="sub" data-a="slideL" style={{ "--d": "1.1s" } as CSSProperties}>Cơm tấm Sài Gòn · Broken rice</p>
          <ul className="members" data-st="pop" style={{ "--base": "1.4s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>Group 7</li>
            <li style={{ "--i": "1" } as CSSProperties}>Hòa</li>
            <li style={{ "--i": "2" } as CSSProperties}>Hải</li>
            <li style={{ "--i": "3" } as CSSProperties}>Trung</li>
            <li style={{ "--i": "4" } as CSSProperties}>Khoa</li>
            <li style={{ "--i": "5" } as CSSProperties}>Liên</li>
            <li style={{ "--i": "6" } as CSSProperties}>Trí</li>
            <li style={{ "--i": "7" } as CSSProperties}>Đức</li>
          </ul>
          <p className="keys" data-a="fadeUp" style={{ "--d": "2.2s" } as CSSProperties}><kbd>←</kbd><kbd>→</kbd> move · <kbd>N</kbd> speaker notes · <kbd>F</kbd> full screen</p>
        </div>
      </div>
    </Slide>
  );
}
