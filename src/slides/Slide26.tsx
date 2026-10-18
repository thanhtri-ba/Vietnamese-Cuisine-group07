import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 26: Grilled pork ribs in four steps */
export default function Slide26() {
  return (
    <Slide index={25} className="band viet viet-son v26" t="circle" who={5} labelledBy="t24">
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
        <div className="v26-head">
          <h2 id="t24" data-a="fadeUp" style={{ "--d": ".5s" } as CSSProperties}>4 steps to perfect grilled ribs</h2>
          <span className="vi-word" lang="vi" data-a="fadeUp" style={{ "--d": ".7s" } as CSSProperties}>Sườn nướng than hồng, linh hồn của dĩa cơm tấm</span>
        </div>
        <ol className="v26-steps" data-st="fadeUp" style={{ "--base": "1s" } as CSSProperties}>
          <li style={{ "--i": "0" } as CSSProperties}>
            <span className="vi-word" lang="vi">Dần thịt</span>
            <b>Tenderize</b>
            <span>Pound the pork gently so it stays tender and absorbs the marinade.</span>
          </li>
          <li style={{ "--i": "1" } as CSSProperties}>
            <span className="vi-word" lang="vi">Ướp</span>
            <b>Marinate</b>
            <span>Garlic, shallots, lemongrass, fish sauce, sugar, honey and condensed milk. Rest a few hours or overnight.</span>
          </li>
          <li style={{ "--i": "2" } as CSSProperties}>
            <span className="vi-word" lang="vi">Nướng than</span>
            <b>Grill over charcoal</b>
            <span>Turn often until cooked through, golden brown and slightly charred at the edges.</span>
          </li>
          <li style={{ "--i": "3" } as CSSProperties}>
            <span className="vi-word" lang="vi">Phết sốt</span>
            <b>Glaze</b>
            <span>Brush on the glaze for a shiny surface and caramelized edges.</span>
          </li>
        </ol>
      </div>
    </Slide>
  );
}
