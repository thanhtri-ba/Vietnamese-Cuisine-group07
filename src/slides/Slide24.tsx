import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import SplitText from '../components/SplitText';

/** Slide 24: How to prepare cơm tấm */
export default function Slide24() {
  return (
    <Slide index={23} className="band forest" t="up" who={4} labelledBy="t22">
      <div className="inner">
        <h2 id="t22" data-letters style={{ "--d": ".3s" } as CSSProperties} aria-label="How to prepare cơm tấm"><SplitText text="How to prepare cơm tấm" start={0} /></h2>
        <ol className="steps4" data-st="dropIn" style={{ "--base": "1.1s" } as CSSProperties}>
          <li style={{ "--i": "0" } as CSSProperties}>
            <img className="step-thumb" src="img/photos/uop-suon.webp" alt="Pork ribs marinating with garlic, lemongrass and spices" />
            <b>Marinate</b>
            <span>Let the ribs soak up every layer of flavor.</span>
          </li>
          <li style={{ "--i": "1" } as CSSProperties}>
            <img className="step-thumb" src="img/photos/nuong-suon.webp" alt="Ribs on a charcoal grill" />
            <b>Grill</b>
            <span>Grill over glowing coals until golden and charred at the edges.</span>
          </li>
          <li style={{ "--i": "2" } as CSSProperties}>
            <img className="step-thumb" src="img/photos/com-nau.webp" alt="A bowl of freshly cooked rice" />
            <b>Cook the rice</b>
            <span>Steam the broken rice until fluffy, and prepare the vegetables and pickles.</span>
          </li>
          <li style={{ "--i": "3" } as CSSProperties}>
            <img className="step-thumb" src="img/photos/com-tam-suon-bi-cha.webp" alt="A finished plate of cơm tấm" />
            <b>Plate up</b>
            <span>Arrange the plate, drizzle with glossy scallion oil and serve with sticky fish sauce.</span>
          </li>
        </ol>
        <p className="secret" data-a="fadeUp" style={{ "--d": "2s" } as CSSProperties}><b>The secret:</b> take great care with every ingredient on the plate.</p>
      </div>
    </Slide>
  );
}
