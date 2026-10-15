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
                <strong>Cơm tấm</strong>
                <em>Broken rice</em>
                <small>Tap or hover</small>
              </span>
              <span className="b"><b>The base</b>Soft rice that soaks up the sauce.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Sườn nướng</strong>
                <em>Grilled pork ribs</em>
                <small>Tap or hover</small>
              </span>
              <span className="b"><b>The star</b>Smoky, savory and slightly sweet.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Bì</strong>
                <em>Shredded pork skin</em>
                <small>Tap or hover</small>
              </span>
              <span className="b"><b>The texture</b>Chewy strands mixed with toasted rice powder.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Chả trứng</strong>
                <em>Steamed egg meatloaf</em>
                <small>Tap or hover</small>
              </span>
              <span className="b"><b>The comfort</b>Soft and savory.</span>
            </span>
          </FlipCard>
          <FlipCard>
            <span className="in">
              <span className="f">
                <strong>Trứng ốp la</strong>
                <em>Fried egg</em>
                <small>Tap or hover</small>
              </span>
              <span className="b"><b>The extra</b>Makes the meal richer.</span>
            </span>
          </FlipCard>
        </div>
        <p className="lede" data-a="fadeUp" style={{ "--d": "2s", marginTop: "clamp(16px,3vh,28px)", maxWidth: "none" } as CSSProperties}>Together they create different textures in every bite.</p>
      </div>
    </Slide>
  );
}
