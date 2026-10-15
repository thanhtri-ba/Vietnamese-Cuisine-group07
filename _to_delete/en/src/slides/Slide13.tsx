import type { CSSProperties } from 'react';
import Slide from '../components/Slide';
import Photo from '../components/Photo';
import VMap from '../components/VMap';

/** Slide 13: Bold and spicy */
export default function Slide13() {
  return (
    <Slide index={12} className="band forest" t="up" who={2} labelledBy="t12">
      <div className="wm-box" aria-hidden="true">
        <div className="watermark" aria-hidden="true" data-a="zoomOut" style={{ "--d": ".2s", color: "var(--leaf)" } as CSSProperties}>Huế</div>
      </div>
      <div className="inner map-wrap">
        <div className="region-media">
          <div className="mini-map corner" aria-hidden="true"><VMap region="c" /></div>
          <Photo src="bun-bo-hue.webp" alt="Bowl of bún bò Huế with herbs and lime" caption="Bún bò Huế" h="46vh" tilt="r" delay=".6s" />
        </div>
        <div className="copy">
          <p className="eyebrow accent" data-a="fadeDown" style={{ "--d": ".4s" } as CSSProperties}>02 · Central cuisine</p>
          <h2 id="t12" data-a="zoomIn" style={{ "--d": ".5s" } as CSSProperties}>Bold and spicy</h2>
          <ul className="dishes" data-st="flipX" style={{ "--base": "1s" } as CSSProperties}>
            <li style={{ "--i": "0" } as CSSProperties}>
              <b>Bún bò Huế</b>
              <span>a rich broth fragrant with lemongrass and shrimp paste</span>
            </li>
            <li style={{ "--i": "1" } as CSSProperties}>
              <b>Mì Quảng</b>
              <span>golden noodles with savory shrimp, pork and crispy rice crackers</span>
            </li>
            <li style={{ "--i": "2" } as CSSProperties}>
              <b>Cơm hến</b>
              <span>a humble dish of rice and baby clams that is spicy, salty, sweet and nutty</span>
            </li>
          </ul>
          <p className="lede" data-a="fadeUp" style={{ "--d": "1.6s" } as CSSProperties}>Huế, the former imperial capital, preserves a rich royal and folk food culture full of chili, herbs and special fermented sauces.</p>
        </div>
      </div>
    </Slide>
  );
}
