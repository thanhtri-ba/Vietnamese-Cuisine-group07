import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 25: Dipping fish sauce & scallion oil */
export default function Slide25() {
  return (
    <Slide index={24} className="band cream viet viet-giay tiles" t="wipe" who={4} labelledBy="t23">
      <div className="inner">
        <h2 id="t23" data-a="slideL" style={{ "--d": ".5s" } as CSSProperties}>Dipping fish sauce & scallion oil</h2>
        <div className="recipe">
          <svg className="glass" viewBox="0 0 120 170" role="img" aria-label="Sauce ratio: 6 parts warm water, 3 sugar, 3 fish sauce, 1 lime juice" data-a="fadeUp" style={{ "--d": ".5s" } as CSSProperties}>
            <defs>
              <clipPath id="glass-clip">
                <path d="M14 10 h92 l-10 150 h-72z"></path>
              </clipPath>
            </defs>
            <g clipPath="url(#glass-clip)">
              <rect className="layer" style={{ "--i": "0" } as CSSProperties} x="0" y="94" width="120" height="66" fill="#E8F1F2"></rect>
              <rect className="layer" style={{ "--i": "1" } as CSSProperties} x="0" y="61" width="120" height="33" fill="#FFF6E2"></rect>
              <rect className="layer" style={{ "--i": "2" } as CSSProperties} x="0" y="28" width="120" height="33" fill="#C98A2B"></rect>
              <rect className="layer" style={{ "--i": "3" } as CSSProperties} x="0" y="17" width="120" height="11" fill="#A1CB47"></rect>
            </g>
            <path d="M14 10 h92 l-10 150 h-72z" fill="none" stroke="#165D3A" strokeWidth="3"></path>
          </svg>
          <div>
            <p className="eyebrow">The classic sweet-and-sour fish sauce recipe</p>
            <ul className="measure" data-st="slideR" style={{ "--base": ".9s", marginTop: "10px" } as CSSProperties}>
              <li style={{ "--i": "0" } as CSSProperties}><i style={{ background: "#E8F1F2", outline: "1px solid #165D3A" } as CSSProperties}></i><b>6 tbsp</b>warm water</li>
              <li style={{ "--i": "1" } as CSSProperties}><i style={{ background: "#FFF6E2", outline: "1px solid #165D3A" } as CSSProperties}></i><b>3 tbsp</b>sugar</li>
              <li style={{ "--i": "2" } as CSSProperties}><i style={{ background: "#C98A2B" } as CSSProperties}></i><b>3 tbsp</b>good fish sauce</li>
              <li style={{ "--i": "3" } as CSSProperties}><i style={{ background: "#A1CB47" } as CSSProperties}></i><b>1 tbsp</b>lime juice</li>
              <li style={{ "--i": "4" } as CSSProperties}><i style={{ background: "#D93A2B" } as CSSProperties}></i><b>To taste</b>finely minced garlic and chili</li>
            </ul>
          </div>
          <div className="oil" data-a="flipY" style={{ "--d": "1.6s" } as CSSProperties}>
            <img className="oil-photo" src="img/photos/nuoc-mam-hanh-phi.webp" alt="A bowl of fish sauce with chili next to a bowl of scallion oil" />
            <h3>Rich scallion oil</h3>
            <ol>
              <li>Heat cooking oil (or pork fat).</li>
              <li>Turn off the heat once the oil is very hot.</li>
              <li>Pour it over chopped spring onions with a pinch of salt to keep them green.</li>
            </ol>
            <p style={{ fontSize: ".9rem", color: "var(--sage)" } as CSSProperties}>These two essential toppings tie together every flavor on the plate.</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
