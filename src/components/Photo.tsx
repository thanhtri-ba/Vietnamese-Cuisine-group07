import type { CSSProperties } from 'react';

interface PhotoProps {
  /** file name inside public/img/photos */
  src: string;
  alt: string;
  caption?: string;
  /** small second line under the caption, e.g. the English name */
  sub?: string;
  /** image height (CSS length). Width follows the photo's own ratio. */
  h?: string;
  /** optional fixed width; the photo is cropped to fill it */
  w?: string;
  tilt?: 'l' | 'r' | 'none';
  tape?: boolean;
  /** entrance delay, e.g. ".6s" */
  delay?: string;
  className?: string;
}

/** Framed photo (white border, green outline, orange shadow) that drops in when its slide appears. */
export default function Photo({ src, alt, caption, sub, h = '44vh', w, tilt = 'r', tape = false, delay = '.5s', className = '' }: PhotoProps) {
  const cls = ['ph', `ph-${tilt}`, caption ? '' : 'nocap', className].filter(Boolean).join(' ');
  return (
    <figure className={cls} style={{ '--h': h, '--w': w ?? 'auto', '--d': delay } as CSSProperties}>
      {tape && (
        <>
          <span className="tape l" aria-hidden="true" />
          <span className="tape r" aria-hidden="true" />
        </>
      )}
      <span className="ph-img">
        <img src={`img/photos/${src}`} alt={alt} />
      </span>
      {caption && (
        <figcaption>
          {caption}
          {sub && <small>{sub}</small>}
        </figcaption>
      )}
    </figure>
  );
}
