import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 17: What does “tấm” mean? */
export default function Slide17() {
  return (
    <Slide index={16} className="band forest" t="fade" who={3} labelledBy="t16">
      <div className="inner" style={{ textAlign: "center" } as CSSProperties}>
        <h2 id="t16" data-a="fadeDown" style={{ "--d": ".3s" } as CSSProperties}>What does “tấm” mean?</h2>
        <svg className="grains" viewBox="0 0 560 200" role="img" aria-label="Whole rice grains next to grains that break into pieces" data-a="fadeUp" style={{ "--d": ".6s", marginTop: "clamp(18px,4vh,36px)" } as CSSProperties}>
          <g>
            <ellipse className="grain" cx="60" cy="70" rx="30" ry="10" transform="rotate(-20 60 70)"></ellipse>
            <ellipse className="grain" cx="120" cy="96" rx="30" ry="10" transform="rotate(15 120 96)"></ellipse>
            <ellipse className="grain" cx="80" cy="124" rx="30" ry="10" transform="rotate(5 80 124)"></ellipse>
            <ellipse className="grain" cx="170" cy="62" rx="30" ry="10" transform="rotate(-35 170 62)"></ellipse>
            <ellipse className="grain" cx="180" cy="128" rx="30" ry="10" transform="rotate(-10 180 128)"></ellipse>
            <text x="120" y="186">Whole rice</text>
          </g>
          <g>
            <path className="grain half l" d="M340 70 a30 10 0 0 1 28 -9 l-4 10 l5 8 a30 10 0 0 1 -29 -9z"></path>
            <path className="grain half r" d="M368 61 a30 10 0 0 1 2 19 l-5 -9 z"></path>
            <ellipse className="grain half l" cx="400" cy="110" rx="14" ry="9" transform="rotate(12 400 110)"></ellipse>
            <ellipse className="grain half r" cx="428" cy="114" rx="13" ry="9" transform="rotate(-8 428 114)"></ellipse>
            <ellipse className="grain half l" cx="460" cy="66" rx="15" ry="9" transform="rotate(-25 460 66)"></ellipse>
            <ellipse className="grain half r" cx="487" cy="58" rx="12" ry="8" transform="rotate(-25 487 58)"></ellipse>
            <ellipse className="grain half l" cx="356" cy="136" rx="13" ry="8"></ellipse>
            <ellipse className="grain half r" cx="382" cy="140" rx="11" ry="8"></ellipse>
            <ellipse className="grain half l" cx="470" cy="132" rx="14" ry="9" transform="rotate(20 470 132)"></ellipse>
            <ellipse className="grain half r" cx="497" cy="141" rx="12" ry="8" transform="rotate(20 497 141)"></ellipse>
            <text x="420" y="186">Tấm · broken rice</text>
          </g>
        </svg>
        <div className="chips" data-st="fadeUp" style={{ "--base": "2.2s", justifyContent: "center", marginTop: "clamp(16px,3vh,28px)" } as CSSProperties}>
          <span className="chip" style={{ "--i": "0" } as CSSProperties}>Broken during milling</span>
          <span className="chip" style={{ "--i": "1" } as CSSProperties}>Cheaper than whole rice</span>
          <span className="chip" style={{ "--i": "2" } as CSSProperties}>Filling meal for working people</span>
          <span className="chip" style={{ "--i": "3" } as CSSProperties}>Humble ingredient → local specialty</span>
        </div>
      </div>
    </Slide>
  );
}
