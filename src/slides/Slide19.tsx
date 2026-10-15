import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Plate from '../components/Plate';

/** Slide 19: What’s on a plate of cơm tấm? */
export default function Slide19() {
  return (
    <Slide index={18} className="band leaf" t="zoom" who={3} labelledBy="t18">
      <div className="inner">
        <h2 id="t18" data-a="fadeDown" style={{ "--d": ".2s", fontSize: "clamp(2rem,min(5vw,8.5vh),4rem)" } as CSSProperties}>Một đĩa cơm tấm gồm có những gì?</h2>
        <div className="plate-split" style={{ marginTop: "clamp(12px,3vh,28px)" } as CSSProperties}>
          <div className="plate-wrap labeled"><Plate /></div>
          <div className="legend" data-st="slideR" style={{ "--base": "1.9s" } as CSSProperties}>
            <div style={{ "--i": "0" } as CSSProperties}>
              <h3>Thành phần chính</h3>
              <ol>
                <li><i>1</i>Cơm tấm dẻo bùi</li>
                <li><i>2</i>Sườn nướng than hoa</li>
                <li><i>3</i>Bì heo trộn thính</li>
                <li><i>4</i>Chả trứng hấp thịt</li>
                <li><i>5</i>Trứng ốp la lòng đào</li>
              </ol>
            </div>
            <div style={{ "--i": "1" } as CSSProperties}>
              <h3>Rau củ thanh mát</h3>
              <ol>
                <li><i>6</i>Đồ chua (cà rốt, củ cải)</li>
                <li><i>7</i>Dưa leo, cà chua tươi giòn</li>
              </ol>
            </div>
            <div style={{ "--i": "2" } as CSSProperties}>
              <h3>Gia vị gắn kết</h3>
              <ol>
                <li><i>8</i>Mỡ hành tóp mỡ béo thơm</li>
                <li><i>9</i>Nước mắm kẹo chua ngọt</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
