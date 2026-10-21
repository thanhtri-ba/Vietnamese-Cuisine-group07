import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';

/** Slide 15: Vietnamese food goes global */
export default function Slide15() {
  return (
    <Slide index={14} className="band forest viet viet-lam tiles" t="wipe" who={2} labelledBy="t14">
      <Photo src="banh-mi.webp" alt="A Vietnamese baguette sandwich filled with pork, pickles and herbs" caption="Baguette sandwich" h="25vh" tilt="r" tape delay="1.1s" className="float-tr" />
      <div className="inner">
        <h2 id="t14" data-a="skewIn" style={{ "--d": ".6s" } as CSSProperties}>Vietnamese food goes global</h2>
        <div className="marquee" aria-hidden="true" data-a="blurIn" style={{ "--d": ".9s" } as CSSProperties}>
          <div className="row">
            <span className="track">Beef noodle soup · Baguette sandwich · Broken rice · Beef noodle soup · Baguette sandwich · Broken rice ·</span>
            <span className="track">Beef noodle soup · Baguette sandwich · Broken rice · Beef noodle soup · Baguette sandwich · Broken rice ·</span>
          </div>
          <div className="row">
            <span className="track">Grilled pork noodles · Sizzling pancakes · Spring rolls · Grilled pork noodles · Sizzling pancakes · Spring rolls ·</span>
            <span className="track">Grilled pork noodles · Sizzling pancakes · Spring rolls · Grilled pork noodles · Sizzling pancakes · Spring rolls ·</span>
          </div>
        </div>
        <div className="facts" data-st="flipY" style={{ "--base": "1.3s" } as CSSProperties}>
          <div style={{ "--i": "0" } as CSSProperties}>
            <b>Found worldwide</b>
            <span>Beef noodle soup, baguette sandwiches and broken rice can be found in food capitals all over the world.</span>
          </div>
          <div style={{ "--i": "1" } as CSSProperties}>
            <b>In the dictionary</b>
            <span>The word “banh mi” has officially entered respected English dictionaries such as Oxford.</span>
          </div>
          <div style={{ "--i": "2" } as CSSProperties}>
            <b>24.03.2020</b>
            <span>A Google Doodle celebrated the Vietnamese baguette sandwich on its global search page.</span>
          </div>
        </div>
      </div>
    </Slide>
  );
}
