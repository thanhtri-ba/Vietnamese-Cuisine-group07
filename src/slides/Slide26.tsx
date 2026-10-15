import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 26: Grilled pork ribs in four steps */
export default function Slide26() {
  return (
    <Slide index={25} className="band forest" t="circle" who={5} labelledBy="t24">
      <div className="ask-bg" aria-hidden="true">
        <img src="img/photos/nuong-suon.webp" alt="" />
      </div>
      <div className="flames" aria-hidden="true">
        <span className="flame" style={{ "--i": "0" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "1" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "2" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "3" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "4" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "5" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "6" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "7" } as CSSProperties}></span>
        <span className="flame" style={{ "--i": "8" } as CSSProperties}></span>
      </div>
      <div className="inner">
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".6s" } as CSSProperties}>The star of broken rice</p>
        <h2 id="t24" data-a="zoomOut" style={{ "--d": ".7s", marginTop: "8px" } as CSSProperties}>4 steps to perfect grilled ribs</h2>
        <ol className="steps4" data-st="flipX" style={{ "--base": "1.2s" } as CSSProperties}>
          <li style={{ "--i": "0" } as CSSProperties}>
            <b>Tenderize</b>
            <span>Gently pound the pork so it becomes tender and absorbs the marinade.</span>
          </li>
          <li style={{ "--i": "1" } as CSSProperties}>
            <b>Marinate</b>
            <span>Garlic, shallots, lemongrass, fish sauce, honey and condensed milk. Overnight is best.</span>
          </li>
          <li style={{ "--i": "2" } as CSSProperties}>
            <b>Grill over charcoal</b>
            <span>Grill over medium-hot coals, turning often so the meat stays tender and juicy.</span>
          </li>
          <li style={{ "--i": "3" } as CSSProperties}>
            <b>Glaze</b>
            <span>Brush on the glaze for a shiny surface and fragrant, caramelized edges.</span>
          </li>
        </ol>
      </div>
    </Slide>
  );
}
