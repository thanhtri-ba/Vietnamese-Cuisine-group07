import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Plate from '../components/Plate';

/** Slide 19: What’s on a plate of cơm tấm? */
export default function Slide19() {
  return (
    <Slide index={18} className="band leaf" t="zoom" who={3} labelledBy="t18">
      <div className="inner">
        <h2 id="t18" data-a="fadeDown" style={{ "--d": ".2s", fontSize: "clamp(2rem,min(5vw,8.5vh),4rem)" } as CSSProperties}>What’s on a plate of cơm tấm?</h2>
        <div className="plate-split" style={{ marginTop: "clamp(12px,3vh,28px)" } as CSSProperties}>
          <div className="plate-wrap labeled"><Plate /></div>
          <div className="legend" data-st="slideR" style={{ "--base": "1.9s" } as CSSProperties}>
            <div style={{ "--i": "0" } as CSSProperties}>
              <h3>The main part</h3>
              <ol>
                <li><i>1</i>Broken rice · cơm tấm</li>
                <li><i>2</i>Grilled pork ribs · sườn nướng</li>
                <li><i>3</i>Shredded pork skin · bì</li>
                <li><i>4</i>Steamed egg meatloaf · chả trứng</li>
                <li><i>5</i>Fried egg (optional) · trứng ốp la</li>
              </ol>
            </div>
            <div style={{ "--i": "1" } as CSSProperties}>
              <h3>The fresh part</h3>
              <ol>
                <li><i>6</i>Pickled vegetables · đồ chua</li>
                <li><i>7</i>Cucumber and tomato · dưa leo, cà chua</li>
              </ol>
            </div>
            <div style={{ "--i": "2" } as CSSProperties}>
              <h3>The connectors</h3>
              <ol>
                <li><i>8</i>Scallion oil · mỡ hành</li>
                <li><i>9</i>Dipping fish sauce · nước mắm</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
