import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import TypeWriter from '../components/TypeWriter';
import { PollNote, PollPicks } from '../components/Poll';

/** Slide 2: A question for everyone */
export default function Slide02() {
  return (
    <Slide index={1} className="band forest ask" t="zoom" who={0} labelledBy="t2">
      <div className="ask-bg" aria-hidden="true">
        <img src="img/street-shop.webp" alt="" />
      </div>
      <div className="inner">
        <h2 id="t2" className="sr">A question for everyone</h2>
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>A question for everyone</p>
        <p className="q" style={{ marginTop: "18px" } as CSSProperties}><TypeWriter text="If you could choose only one Vietnamese dish to introduce Vietnam to the world…" /></p>
        <PollPicks data-st="dropIn" style={{ "--base": "2.6s" } as CSSProperties} />
        <PollNote data-a="fadeUp" style={{ "--d": "3.4s" } as CSSProperties} />
      </div>
    </Slide>
  );
}
