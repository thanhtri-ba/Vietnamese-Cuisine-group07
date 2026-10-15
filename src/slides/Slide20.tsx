import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import FlipCard from '../components/FlipCard';

/** Slide 20: The main ingredients */
export default function Slide20() {
  return (
    <Slide index={19} className="band forest" t="blinds" who={3} labelledBy="t19">
      <div className="inner">
        <h2 id="t19" data-a="wipe" style={{ "--d": ".6s" } as CSSProperties}>The main ingredients</h2>
        <div className="flips" data-st="flipY" style={{ "--base": "1s" } as CSSProperties}>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Broken rice</strong>
                <img className="card-photo" src="img/photos/com-nau.webp" alt="Broken rice topped with scallion oil" />
                <em>Soft, nutty broken rice</em>
                <small>Tap or hover</small>
              </span>
              <span className="b"><b>The base</b>Small, fluffy grains that soak up the fish sauce and scallion oil.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Grilled ribs</strong>
                <img className="card-photo" src="img/photos/suon-cay.webp" alt="A grilled pork chop" />
                <em>Fragrant and full of flavor</em>
                <small>Tap or hover</small>
              </span>
              <span className="b"><b>The star of the plate</b>Tender and juicy, sweet and salty, with a smoky charcoal aroma.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Pork skin</strong>
                <img className="card-photo" src="img/photos/bi.webp" alt="Shredded pork skin with toasted rice powder" />
                <em>Shredded pork skin with toasted rice powder</em>
                <small>Tap or hover</small>
              </span>
              <span className="b"><b>The texture</b>Chewy strands of pork skin mixed with fragrant golden toasted rice powder.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Egg meatloaf</strong>
                <img className="card-photo" src="img/photos/cha-trung.webp" alt="A slice of egg meatloaf" />
                <em>Steamed egg and pork meatloaf</em>
                <small>Tap or hover</small>
              </span>
              <span className="b"><b>Rich and savory</b>Egg, minced pork, wood-ear mushrooms and glass noodles, steamed until soft.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Fried egg</strong>
                <img className="card-photo" src="img/photos/op-la.webp" alt="Fried egg" />
                <em>A runny, golden yolk</em>
                <small>Tap or hover</small>
              </span>
              <span className="b"><b>The finishing touch</b>The creamy yolk blends with the hot rice.</span>
            </span>
          </FlipCard>
        </div>
        <p className="lede" data-a="fadeUp" style={{ "--d": "2s", marginTop: "clamp(16px,3vh,28px)", maxWidth: "none" } as CSSProperties}>Each ingredient adds its own layer of flavor and makes every bite enjoyable.</p>
      </div>
    </Slide>
  );
}
