import { useContext, useEffect, useRef, type PointerEvent as RPointerEvent, type ReactNode } from 'react';
import { DeckContext, SlideIndexContext } from './DeckContext';
import { NavContext } from './NavContext';
import { transitions } from '../data/transitions';
import { scenes } from '../data/scenes';
import FxCanvas from './FxCanvas';

interface SlideProps {
  index: number;
  className: string;
  /** transition name used by CSS (overridden by data/transitions.ts when set there) */
  t: string;
  /** index into data/people.ts */
  who: number;
  labelledBy?: string;
  label?: string;
  children: ReactNode;
}

/** One full-screen slide. Adding `active` restarts every CSS entrance animation inside it. */
export default function Slide({ index, className, t, who, labelledBy, label, children }: SlideProps) {
  const current = useContext(DeckContext);
  const active = current === index;
  const nav = useContext(NavContext);
  const leaving = !active && nav.prev === index;
  const cls = active ? `${className} active` : leaving ? `${className} leaving` : className;
  const ref = useRef<HTMLElement>(null);
  const sc = scenes[index];

  // parallax theo chuột: cảnh quan và biểu tượng nghiêng nhẹ ngược hướng con trỏ
  const raf = useRef(0);
  const onMove = (e: RPointerEvent<HTMLElement>) => {
    if (!active || e.pointerType === 'touch') return;
    const el = e.currentTarget;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--cx', e.clientX + 'px');
      el.style.setProperty('--cy', e.clientY + 'px');
      el.style.setProperty('--mx', (x * 2).toFixed(3));
      el.style.setProperty('--my', (y * 2).toFixed(3));
    });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // `inert` keeps hidden slides out of the tab order (set directly for React 18 compatibility)
    (el as HTMLElement & { inert: boolean }).inert = !active;
    if (active) el.scrollTop = 0;
  }, [active]);

  return (
    <SlideIndexContext.Provider value={index}>
      <section
        ref={ref}
        onPointerMove={onMove}
        className={cls}
        data-t={transitions[index] ?? t}
        data-who={who}
        aria-labelledby={labelledBy}
        aria-label={label}
        aria-hidden={!active}
      >
        {sc?.s && <div className={`vscene${sc.pos === 't' ? ' t' : sc.pos === 'tall' ? ' tall' : ''}`} data-s={sc.s} aria-hidden="true" />}
        {sc?.top && <div className="vscene t" data-s={sc.top} aria-hidden="true" />}
        {sc?.e && <div className={`vemb ${sc.ep ?? 'tr'}${sc.e === 'drum' ? ' rot' : ''}`} data-s={sc.e} aria-hidden="true" />}
        {active && sc?.fx && <FxCanvas kind={sc.fx} light={/viet-(giay|nghe)/.test(className)} />}
        <div className="vglow" aria-hidden="true" />
        {children}
      </section>
    </SlideIndexContext.Provider>
  );
}
