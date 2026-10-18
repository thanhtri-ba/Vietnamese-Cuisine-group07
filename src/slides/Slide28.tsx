import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

/** Slide 28: Choose your ribs */
export default function Slide28() {
  return (
    <Slide index={27} className="band cream viet viet-giay tiles" t="blinds" who={5} labelledBy="t24c">
      <img className="sil" src="img/i25.webp" alt="" style={{ right: "2%", top: "20px" } as CSSProperties} />
      <div className="inner">
        <h2 id="t24c" data-a="dropIn" style={{ "--d": ".4s" } as CSSProperties}>Choose your favorite cut</h2>
        <div className="kinds" data-st="flipX" style={{ "--base": "1s" } as CSSProperties}>
          <article style={{ "--i": "0" } as CSSProperties}>
            <strong>Pork chop</strong>
            <em>The most popular</em>
            <span>A wide cut with a little bone on the edge, grilled for that classic broken rice flavor.</span>
          </article>
          <article style={{ "--i": "1" } as CSSProperties}>
            <strong>Baby ribs</strong>
            <em>Juicy & crunchy</em>
            <span>Small, meaty ribs with crunchy cartilage, juicy and full of flavor.</span>
          </article>
          <article style={{ "--i": "2" } as CSSProperties}>
            <strong>Whole rack</strong>
            <em>Thick & flavorful</em>
            <span>Long ribs grilled over hot coals, fragrant and satisfying to bite into.</span>
          </article>
        </div>
        <p className="eyebrow" data-a="fadeUp" style={{ "--d": "1.7s", marginTop: "clamp(16px,3vh,28px)" } as CSSProperties}>Extra toppings to complete your plate</p>
        <div className="chips" data-st="pop" style={{ "--base": "1.9s", marginTop: "10px" } as CSSProperties}>
          <span className="chip" style={{ "--i": "0" } as CSSProperties}>Chinese sausage<small>fried until golden, sweet and fragrant</small></span>
          <span className="chip" style={{ "--i": "1" } as CSSProperties}>Grilled chicken<small>honey-marinated grilled chicken thigh</small></span>
          <span className="chip" style={{ "--i": "2" } as CSSProperties}>Fried egg<small>with a rich, runny yolk</small></span>
          <span className="chip" style={{ "--i": "3" } as CSSProperties}>Egg meatloaf<small>steamed until golden, soft and fragrant</small></span>
          <span className="chip" style={{ "--i": "4" } as CSSProperties}>Shredded pork skin<small>thin strips with toasted rice powder</small></span>
        </div>
      </div>
    </Slide>
  );
}
