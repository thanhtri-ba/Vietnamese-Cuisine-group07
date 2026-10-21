import type { CSSProperties } from 'react';
import Slide from '../components/Slide';

const items = [
  { en: 'Broken rice', img: 'img/photos/com-nau.webp', alt: 'Broken rice topped with scallion oil', text: 'Small, fluffy grains that soak up fish sauce and scallion oil.' },
  { en: 'Grilled ribs', img: 'img/photos/suon-cay.webp', alt: 'A grilled pork chop', text: 'The star: sweet, salty and smoky from the charcoal.' },
  { en: 'Pork skin', img: 'img/photos/bi.webp', alt: 'Shredded pork skin with toasted rice powder', text: 'Chewy strands mixed with golden toasted rice powder.' },
  { en: 'Egg meatloaf', img: 'img/photos/cha-trung.webp', alt: 'A slice of egg meatloaf', text: 'Egg, minced pork and glass noodles, steamed until soft.' },
  { en: 'Fried egg', img: 'img/photos/op-la.webp', alt: 'Fried egg', text: 'A runny yolk that blends into the hot rice.' },
];

/** Slide 20: The main ingredients */
export default function Slide20() {
  return (
    <Slide index={19} className="band viet viet-lam tiles v20" t="blinds" who={3} labelledBy="t19">
      <div className="inner">
        <div className="v20-head">
          <h2 id="t19" data-a="fadeUp" style={{ "--d": ".4s" } as CSSProperties}>The main ingredients</h2>
          <span className="vi-word" data-a="fadeUp" style={{ "--d": ".6s" } as CSSProperties}>on a plate of broken rice</span>
        </div>
        <ul className="v20-list" data-st="fadeUp" style={{ "--base": ".9s" } as CSSProperties}>
          {items.map((it, i) => (
            <li key={it.en} style={{ "--i": String(i) } as CSSProperties}>
              <div className="dia">
                <img src={it.img} alt={it.alt} />
              </div>
              <b>{it.en}</b>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Slide>
  );
}
