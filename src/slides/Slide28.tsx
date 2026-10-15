import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 28: Choose your sườn */
export default function Slide28() {
  return (
    <Slide index={27} className="band cream" t="blinds" who={5} labelledBy="t24c">
      <img className="sil" src="img/i25.webp" alt="" style={{ right: "2%", top: "20px" } as CSSProperties} />
      <div className="inner">
        <h2 id="t24c" data-a="dropIn" style={{ "--d": ".4s" } as CSSProperties}>Choose your sườn</h2>
        <div className="kinds" data-st="flipX" style={{ "--base": "1s" } as CSSProperties}>
          <article style={{ "--i": "0" } as CSSProperties}>
            <strong>Sườn cốt lết</strong>
            <em>Pork chop</em>
            <span>Thin, with a small piece of bone. The most common choice.</span>
          </article>
          <article style={{ "--i": "1" } as CSSProperties}>
            <strong>Sườn non</strong>
            <em>Baby ribs</em>
            <span>Smaller and juicier.</span>
          </article>
          <article style={{ "--i": "2" } as CSSProperties}>
            <strong>Sườn cây</strong>
            <em>Whole rack</em>
            <span>A full rack of ribs grilled together.</span>
          </article>
        </div>
        <p className="eyebrow" data-a="fadeUp" style={{ "--d": "1.7s", marginTop: "clamp(16px,3vh,28px)" } as CSSProperties}>Add-ons to build your own plate</p>
        <div className="chips" data-st="pop" style={{ "--base": "1.9s", marginTop: "10px" } as CSSProperties}>
          <span className="chip" style={{ "--i": "0" } as CSSProperties}>Lạp xưởng<small>Chinese sausage</small></span>
          <span className="chip" style={{ "--i": "1" } as CSSProperties}>Gà nướng<small>grilled chicken</small></span>
          <span className="chip" style={{ "--i": "2" } as CSSProperties}>Trứng ốp la<small>fried egg</small></span>
          <span className="chip" style={{ "--i": "3" } as CSSProperties}>Chả trứng<small>egg meatloaf</small></span>
        </div>
      </div>
    </Slide>
  );
}
