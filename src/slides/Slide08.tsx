import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import YinYang from '../components/YinYang';
import YYRunner from '../components/YYRunner';

/** Slide 8: Yin and yang on the plate */
export default function Slide08() {
  return (
    <Slide index={7} className="band leaf" t="wipe" who={1} labelledBy="t7b">
      <div className="inner split">
        <div className="yy-wrap" data-a="spinIn" style={{ "--d": ".5s" } as CSSProperties}>
          <YinYang />
          <span className="yy-l">Cooling<small>Yin</small></span>
          <span className="yy-r">Warming<small>Yang</small></span>
        </div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".7s" } as CSSProperties}>Balance for the body</p>
          <h2 id="t7b" data-a="slideR" style={{ "--d": ".8s" } as CSSProperties}>Yin and yang on the plate</h2>
          <div className="pairs yy-pairs">
            <div className="pair" style={{ "--i": "0" } as CSSProperties}>
              <span className="l">Duck<small>a "cooling" food</small></span>
              <span className="plus" aria-hidden="true">+</span>
              <span className="r">Ginger fish sauce<small>a "warming" sauce</small></span>
            </div>
            <div className="pair" style={{ "--i": "1" } as CSSProperties}>
              <span className="l">A hot, humid summer day</span>
              <span className="plus" aria-hidden="true">+</span>
              <span className="r">Bitter melon soup<small>cools the body down</small></span>
            </div>
          </div>
          <div className="yy-row">
            <Photo src="kho-qua.webp" alt="Watercolor of bitter melon soup and braised pork" caption="Canh khổ qua" h="12vh" w="20vh" tilt="r" delay="1.7s" />
            <p className="lede" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}>This folk wisdom shows how thoughtfully Vietnamese people care for their health through food.</p>
          </div>
        </div>
      </div>
      <YYRunner />
    </Slide>
  );
}
