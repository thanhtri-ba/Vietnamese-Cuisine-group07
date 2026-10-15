import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 22: Balance on one plate */
export default function Slide22() {
  return (
    <Slide index={21} className="band cream" t="slide" who={4} labelledBy="t21">
      <div className="inner">
        <h2 id="t21" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Balance on a plate of broken rice</h2>
        <div className="balance-grid">
        <div>
        <div className="pairs">
          <div className="pair" style={{ "--i": "0" } as CSSProperties}>
            <span className="l">Rich, sweet and fragrant grilled pork</span>
            <span className="plus" aria-hidden="true">+</span>
            <span className="r">Fresh, crunchy pickles</span>
          </div>
          <div className="pair" style={{ "--i": "1" } as CSSProperties}>
            <span className="l">Rich, aromatic scallion oil</span>
            <span className="plus" aria-hidden="true">+</span>
            <span className="r">Crisp cucumber and tomato</span>
          </div>
          <div className="pair" style={{ "--i": "2" } as CSSProperties}>
            <span className="l">Fluffy, mild white broken rice</span>
            <span className="plus" aria-hidden="true">+</span>
            <span className="r">Sweet, sour and salty sticky fish sauce</span>
          </div>
        </div>
        <p className="purpose" data-a="zoomIn" style={{ "--d": "1.8s" } as CSSProperties}>Every ingredient plays its part perfectly.</p>
        </div>
        <Photo src="com-tam.webp" alt="Fish sauce being poured over a plate of broken rice with grilled pork and egg" h="46vh" tilt="r" tape delay=".6s" />
        </div>
      </div>
    </Slide>
  );
}
