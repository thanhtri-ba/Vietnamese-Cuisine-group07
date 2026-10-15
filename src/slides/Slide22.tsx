import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 22: Balance on one plate */
export default function Slide22() {
  return (
    <Slide index={21} className="band cream" t="slide" who={4} labelledBy="t21">
      <div className="inner">
        <h2 id="t21" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Balance on one plate</h2>
        <div className="pairs">
          <div className="pair" style={{ "--i": "0" } as CSSProperties}>
            <span className="l">Sweet and salty grilled pork</span>
            <span className="plus" aria-hidden="true">+</span>
            <span className="r">Crunchy, sour pickled vegetables</span>
          </div>
          <div className="pair" style={{ "--i": "1" } as CSSProperties}>
            <span className="l">Rich scallion oil</span>
            <span className="plus" aria-hidden="true">+</span>
            <span className="r">Fresh cucumber and tomato</span>
          </div>
          <div className="pair" style={{ "--i": "2" } as CSSProperties}>
            <span className="l">Plain broken rice</span>
            <span className="plus" aria-hidden="true">+</span>
            <span className="r">Sweet, salty, sour dipping sauce</span>
          </div>
        </div>
        <p className="purpose" data-a="zoomIn" style={{ "--d": "1.8s" } as CSSProperties}>Every ingredient has a purpose.</p>
      </div>
    </Slide>
  );
}
