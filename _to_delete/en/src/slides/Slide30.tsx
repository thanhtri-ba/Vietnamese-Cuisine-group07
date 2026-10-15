import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 30: Cơm tấm, all day long */
export default function Slide30() {
  return (
    <Slide index={29} className="band forest scene" t="fade" who={6} labelledBy="t24e">
      <div className="ask-bg" aria-hidden="true">
        <img src="img/street-shop.webp" alt="" />
      </div>
      <div className="inner">
        <h2 id="t24e" data-a="blurIn" style={{ "--d": ".5s" } as CSSProperties}>Cơm tấm, all day long</h2>
        <div className="times" data-st="dropIn" style={{ "--base": ".9s" } as CSSProperties}>
          <article style={{ "--i": "0" } as CSSProperties}>
            <img className="time-photo" src="img/photos/com-sang.webp" alt="A street-side breakfast table with plates of cơm tấm" />
            <b>Morning</b>
            <span>A quick, energizing plate before school or work</span>
          </article>
          <article style={{ "--i": "1" } as CSSProperties}>
            <img className="time-photo" src="img/photos/com-trua.webp" alt="Diners inside a cơm tấm restaurant at lunchtime" />
            <b>Lunch</b>
            <span>A filling, affordable and tasty lunch</span>
          </article>
          <article style={{ "--i": "2" } as CSSProperties}>
            <img className="time-photo" src="img/photos/com-tam-dem.webp" alt="A vendor at her grilled-pork counter in the evening" />
            <b>Late night</b>
            <span>Glowing charcoal grills serve people finishing their night shifts</span>
          </article>
        </div>
        <div className="chips" data-st="pop" style={{ "--base": "1.7s", justifyContent: "center", marginTop: "clamp(16px,3vh,28px)" } as CSSProperties}>
          <span className="chip" style={{ "--i": "0" } as CSSProperties}>Little plastic stools on the familiar sidewalk</span>
          <span className="chip" style={{ "--i": "1" } as CSSProperties}>A warm, light bowl of soup</span>
          <span className="chip" style={{ "--i": "2" } as CSSProperties}>A refreshing glass of iced tea</span>
        </div>
      </div>
    </Slide>
  );
}
