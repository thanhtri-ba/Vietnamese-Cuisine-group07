import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 23: The side dishes */
export default function Slide23() {
  return (
    <Slide index={22} className="band cream" t="zoom" who={4} labelledBy="t21b">
      <img className="sil" src="img/i4.webp" alt="" style={{ right: "2%", top: "20px" } as CSSProperties} />
      <div className="inner">
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".3s" } as CSSProperties}>Small details, big difference</p>
        <h2 id="t21b" data-a="skewIn" style={{ "--d": ".4s", marginTop: "8px" } as CSSProperties}>The signature side dishes</h2>
        <div className="sides" data-st="swing" style={{ "--base": ".9s" } as CSSProperties}>
          <article style={{ "--i": "0" } as CSSProperties}>
            <img className="side-photo" src="img/photos/do-chua.webp" alt="A glass jar of pickled carrot and white radish" />
            <h3>Pickles <span>Fresh & crunchy</span></h3>
            <ul>
              <li>Shredded carrot and daikon</li>
              <li>Soaked in a mild sweet-and-sour vinegar</li>
              <li>Balanced, sweet, sour and refreshingly crunchy</li>
              <li>Cuts through the richness of the grilled pork</li>
            </ul>
          </article>
          <article style={{ "--i": "1" } as CSSProperties}>
            <img className="side-photo" src="img/photos/bi.webp" alt="A bowl of shredded pork skin with toasted rice powder" />
            <h3>Pork skin <span>Nutty & chewy</span></h3>
            <ul>
              <li>Boiled pork skin, sliced into thin, even strips</li>
              <li>Mixed with fragrant, golden toasted rice powder</li>
              <li>Chewy, rich and full of rustic aroma</li>
            </ul>
          </article>
        </div>
      </div>
    </Slide>
  );
}
