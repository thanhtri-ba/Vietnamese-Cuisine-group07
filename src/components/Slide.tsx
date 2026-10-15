import { useContext, useEffect, useRef, type ReactNode } from 'react';
import { DeckContext, SlideIndexContext } from './DeckContext';
import { NavContext } from './NavContext';
import { transitions } from '../data/transitions';

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
        className={cls}
        data-t={transitions[index] ?? t}
        data-who={who}
        aria-labelledby={labelledBy}
        aria-label={label}
        aria-hidden={!active}
      >
        {children}
      </section>
    </SlideIndexContext.Provider>
  );
}
