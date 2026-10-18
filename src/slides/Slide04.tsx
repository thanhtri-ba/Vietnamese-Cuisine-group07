import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import CountUp from '../components/CountUp';

/** Slide 4: Vietnamese food around the world */
export default function Slide04() {
  return (
    <Slide index={3} className="band forest viet viet-lam tiles flat" t="wipe" who={0} labelledBy="t4">
      <div className="inner">
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".5s" } as CSSProperties}>MICHELIN Guide · Hanoi & Ho Chi Minh City</p>
        <h2 id="t4" data-a="skewIn" style={{ "--d": ".6s", marginTop: "10px" } as CSSProperties}>Vietnamese cuisine on the world map</h2>
        <div className="stats" data-st="zoomIn" style={{ "--base": "1s" } as CSSProperties}>
          <div className="stat" style={{ "--i": "0" } as CSSProperties}>
            <span className="num"><CountUp to={103} /></span>
            <span className="unit">restaurants</span>
            <p>were recognized in the very first selection, from street stalls to fine dining</p>
          </div>
          <div className="stat" style={{ "--i": "1" } as CSSProperties}>
            <span className="num"><CountUp to={4} /></span>
            <span className="unit">Michelin stars</span>
            <p>were awarded to outstanding restaurants in Vietnam</p>
          </div>
          <div className="stat" style={{ "--i": "2" } as CSSProperties}>
            <span className="num"><CountUp to={2023} /></span>
            <span className="unit">June · first edition</span>
            <p>The MICHELIN Guide officially launched in Vietnam in June 2023</p>
          </div>
        </div>
        <p className="closing-q" data-a="fadeUp" style={{ "--d": "2.2s" } as CSSProperties}>So what makes Vietnamese food so special?</p>
        <div className="star-ex">
          <Photo src="tam-vi.webp" alt="The glowing round sign of Tam Vi restaurant in Hanoi at night" h="15vh" tilt="l" delay="1.9s" />
          <p data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}>One of the four restaurants awarded a Michelin star in 2023: <b>Tam Vi</b> (Hanoi).</p>
      </div>
      </div>
    </Slide>
  );
}
