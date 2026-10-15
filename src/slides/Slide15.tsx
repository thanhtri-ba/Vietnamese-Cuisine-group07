import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 15: Vietnamese food goes global */
export default function Slide15() {
  return (
    <Slide index={14} className="band leaf" t="wipe" who={2} labelledBy="t14">
      <div className="inner">
        <h2 id="t14" data-a="skewIn" style={{ "--d": ".6s" } as CSSProperties}>Vietnamese food goes global</h2>
        <div className="marquee" aria-hidden="true" data-a="blurIn" style={{ "--d": ".9s" } as CSSProperties}>
          <div className="row">
            <span className="track">Phở · Bánh mì · Cơm tấm · Phở · Bánh mì · Cơm tấm ·</span>
            <span className="track">Phở · Bánh mì · Cơm tấm · Phở · Bánh mì · Cơm tấm ·</span>
          </div>
          <div className="row">
            <span className="track">Bún chả · Bánh xèo · Gỏi cuốn · Bún chả · Bánh xèo · Gỏi cuốn ·</span>
            <span className="track">Bún chả · Bánh xèo · Gỏi cuốn · Bún chả · Bánh xèo · Gỏi cuốn ·</span>
          </div>
        </div>
        <div className="facts" data-st="flipY" style={{ "--base": "1.3s" } as CSSProperties}>
          <div style={{ "--i": "0" } as CSSProperties}>
            <b>Worldwide</b>
            <span>Phở and bánh mì are found in many international cities.</span>
          </div>
          <div style={{ "--i": "1" } as CSSProperties}>
            <b>In the dictionary</b>
            <span>“Bánh mì” is recognized in English-language dictionaries.</span>
          </div>
          <div style={{ "--i": "2" } as CSSProperties}>
            <b>24.03.2020</b>
            <span>Google celebrated bánh mì with a Doodle.</span>
          </div>
        </div>
      </div>
    </Slide>
  );
}
