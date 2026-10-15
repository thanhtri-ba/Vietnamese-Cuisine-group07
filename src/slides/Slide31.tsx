import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Quiz from '../components/Quiz';

/** Slide 31: Quick quiz */
export default function Slide31() {
  return (
    <Slide index={30} className="band cream quiz-slide" t="up" who={6} labelledBy="t24f">
      <img className="sil" src="img/i12.webp" alt="" style={{ right: "2%", top: "10px" } as CSSProperties} />
      <div className="inner">
        <h2 id="t24f" data-a="pop" style={{ "--d": ".4s" } as CSSProperties}>Câu đố vui ôn bài</h2>
        <Quiz data-st="dropIn" style={{ "--base": ".8s" } as CSSProperties} />
      </div>
    </Slide>
  );
}
