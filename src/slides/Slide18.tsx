import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 18: From humble meal to Saigon icon */
export default function Slide18() {
  return (
    <Slide index={17} className="band cream" t="slide" who={3} labelledBy="t17">
      <img className="sil" src="img/i25.webp" alt="" style={{ right: "2%", top: "20px" } as CSSProperties} />
      <div className="inner">
        <h2 id="t17" data-a="slideL" style={{ "--d": ".3s" } as CSSProperties}>From humble meal to Saigon icon</h2>
        <ol className="journey" data-st="pop" style={{ "--base": "1.1s" } as CSSProperties}>
          <li style={{ "--i": "0" } as CSSProperties}>
            <b>Broken rice</b>
            <span>Affordable and filling</span>
          </li>
          <li style={{ "--i": "1" } as CSSProperties}>
            <b>Street stalls</b>
            <span>Vendors brought it into daily life</span>
          </li>
          <li style={{ "--i": "2" } as CSSProperties}>
            <b>City culture</b>
            <span>A part of everyday Saigon</span>
          </li>
          <li style={{ "--i": "3" } as CSSProperties}>
            <b>Restaurants</b>
            <span>From sidewalks to established restaurants</span>
          </li>
        </ol>
        <div className="senses" data-st="flipX" style={{ "--base": "1.8s" } as CSSProperties}>
          <div style={{ "--i": "0" } as CSSProperties}><b>Smell</b>Pork grilling over charcoal</div>
          <div style={{ "--i": "1" } as CSSProperties}><b>Sound</b>Food sizzling on the grill</div>
          <div style={{ "--i": "2" } as CSSProperties}><b>Sight</b>The familiar plate of rice</div>
        </div>
      </div>
    </Slide>
  );
}
