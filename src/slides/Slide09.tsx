import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 9: Fish sauce: the soul of Vietnamese cooking */
export default function Slide09() {
  return (
    <Slide index={8} className="band forest" t="zoom" who={1} labelledBy="t8">
      <div className="inner split">
        <svg className="bottle" viewBox="0 0 120 260" role="img" aria-label="A bottle of fish sauce filling up" data-a="fadeUp" style={{ "--d": ".3s" } as CSSProperties}>
          <defs>
            <clipPath id="bottle-clip">
              <path d="M46 8 h28 v40 c0 14 26 22 26 52 v140 c0 8 -6 12 -12 12 h-56 c-6 0 -12 -4 -12 -12 v-140 c0 -30 26 -38 26 -52z"></path>
            </clipPath>
          </defs>
          <path d="M46 8 h28 v40 c0 14 26 22 26 52 v140 c0 8 -6 12 -12 12 h-56 c-6 0 -12 -4 -12 -12 v-140 c0 -30 26 -38 26 -52z" fill="rgba(255,250,238,.12)" stroke="#FFFAEE" strokeWidth="3"></path>
          <g clipPath="url(#bottle-clip)">
            <rect className="liquid" x="0" y="80" width="120" height="180" fill="#C98A2B"></rect>
          </g>
          <rect x="42" y="0" width="36" height="14" rx="3" fill="#ED7843"></rect>
          <rect x="26" y="140" width="68" height="56" fill="#FFFAEE"></rect>
          <text x="60" y="164" textAnchor="middle" fontFamily="Anton,Impact,sans-serif" fontSize="16" fill="#165D3A">NƯỚC</text>
          <text x="60" y="186" textAnchor="middle" fontFamily="Anton,Impact,sans-serif" fontSize="16" fill="#165D3A">MẮM</text>
        </svg>
        <div className="copy">
          <h2 id="t8" data-a="slideR" style={{ "--d": ".5s" } as CSSProperties}>Fish sauce: the soul of Vietnamese cooking</h2>
          <div className="chips" data-st="pop" style={{ "--base": "1s" } as CSSProperties}>
            <span className="chip" style={{ "--i": "0" } as CSSProperties}>Marinate<small>ướp</small></span>
            <span className="chip" style={{ "--i": "1" } as CSSProperties}>Season<small>nêm</small></span>
            <span className="chip" style={{ "--i": "2" } as CSSProperties}>Dip<small>chấm</small></span>
          </div>
          <div data-a="fadeUp" style={{ "--d": "1.5s" } as CSSProperties}>
            <p className="year">2012</p>
            <p className="lede">Phú Quốc fish sauce became the first Vietnamese product with geographical indication protection in the European Union.</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}
