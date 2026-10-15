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
            <img className="journey-thumb" src="img/photos/gao-tam.webp" alt="Broken rice grains" />
            <b>Broken rice</b>
            <span>Cheap, filling and long-lasting</span>
          </li>
          <li style={{ "--i": "1" } as CSSProperties}>
            <img className="journey-thumb" src="img/photos/com-tam-ve.webp" alt="Painting of a sidewalk broken rice stall" />
            <b>Street stalls</b>
            <span>Street vendors brought broken rice into daily life</span>
          </li>
          <li style={{ "--i": "2" } as CSSProperties}>
            <img className="journey-thumb" src="img/photos/com-sang.webp" alt="A broken rice table in the morning" />
            <b>Street culture</b>
            <span>It became an essential part of Saigon life</span>
          </li>
          <li style={{ "--i": "3" } as CSSProperties}>
            <img className="journey-thumb" src="img/photos/com-trua.webp" alt="A broken rice restaurant" />
            <b>Restaurants</b>
            <span>From the sidewalk to upscale restaurants</span>
          </li>
        </ol>
        <div className="senses" data-st="flipX" style={{ "--base": "1.8s" } as CSSProperties}>
          <div style={{ "--i": "0" } as CSSProperties}><b>Smell</b>The irresistible smell of pork grilling over charcoal</div>
          <div style={{ "--i": "1" } as CSSProperties}><b>Sound</b>The sizzle of fat crackling over glowing coals</div>
          <div style={{ "--i": "2" } as CSSProperties}><b>Sight</b>The familiar, colorful plate of broken rice</div>
        </div>
      </div>
    </Slide>
  );
}
