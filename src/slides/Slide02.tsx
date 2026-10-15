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
        <h2 id="t2" className="sr">Câu hỏi dành cho mọi người</h2>
        <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".2s" } as CSSProperties}>Câu hỏi dành cho mọi người</p>
        <p className="q" style={{ marginTop: "18px" } as CSSProperties}><TypeWriter text="Nếu chỉ được chọn một món ăn để giới thiệu Việt Nam với thế giới, bạn sẽ chọn…" /></p>
        <PollPicks data-st="dropIn" style={{ "--base": "2.6s" } as CSSProperties} />
        <PollNote data-a="fadeUp" style={{ "--d": "3.4s" } as CSSProperties} />
      </div>
    </Slide>
  );
}
