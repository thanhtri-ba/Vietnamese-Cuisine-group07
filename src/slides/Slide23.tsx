import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 23: The side dishes */
export default function Slide23() {
  return (
    <Slide index={22} className="band cream" t="zoom" who={4} labelledBy="t21b">
      <img className="sil" src="img/i4.webp" alt="" style={{ right: "2%", top: "20px" } as CSSProperties} />
      <div className="inner">
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".3s" } as CSSProperties}>Small details, big difference</p>
        <h2 id="t21b" data-a="skewIn" style={{ "--d": ".4s", marginTop: "8px" } as CSSProperties}>The side dishes</h2>
        <div className="sides" data-st="swing" style={{ "--base": ".9s" } as CSSProperties}>
          <article style={{ "--i": "0" } as CSSProperties}>
            <svg viewBox="0 0 160 70" aria-hidden="true" className="side-art">
              <g transform="rotate(-12 80 35)">
                <rect x="18" y="16" width="70" height="9" rx="4" fill="#ED7843"></rect>
                <rect x="30" y="31" width="64" height="9" rx="4" fill="#FFF6E2" stroke="#E2D6BC"></rect>
                <rect x="56" y="46" width="72" height="9" rx="4" fill="#ED7843"></rect>
                <rect x="80" y="20" width="60" height="9" rx="4" fill="#FFF6E2" stroke="#E2D6BC"></rect>
              </g>
            </svg>
            <h3>Đồ chua <span>Pickled vegetables</span></h3>
            <ul>
              <li>Carrot and white radish</li>
              <li>Soaked in vinegar, sugar and salt</li>
              <li>Sweet, sour and crunchy</li>
              <li>Refreshes your mouth after rich pork</li>
            </ul>
          </article>
          <article style={{ "--i": "1" } as CSSProperties}>
            <svg viewBox="0 0 160 70" aria-hidden="true" className="side-art">
              <ellipse cx="80" cy="44" rx="62" ry="20" fill="#F5E9C4"></ellipse>
              <path d="M38 40 q10 -10 22 0 M58 48 q12 -8 24 2 M80 36 q10 -10 22 0 M96 50 q10 -8 22 0 M48 54 q10 -6 20 0 M70 30 q8 -8 18 0" stroke="#C9AE6E" strokeWidth="3" fill="none" strokeLinecap="round"></path>
              <g fill="#B98A4A">
                <circle cx="64" cy="40" r="1.6"></circle>
                <circle cx="90" cy="46" r="1.6"></circle>
                <circle cx="110" cy="40" r="1.6"></circle>
                <circle cx="52" cy="50" r="1.6"></circle>
              </g>
            </svg>
            <h3>Bì <span>Shredded pork skin</span></h3>
            <ul>
              <li>Pork skin, boiled and cut into thin strips</li>
              <li>Mixed with toasted rice powder, called <i>thính</i></li>
              <li>Chewy, with a nutty smell</li>
            </ul>
          </article>
        </div>
      </div>
    </Slide>
  );
}
