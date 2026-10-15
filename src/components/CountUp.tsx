import { useEffect, useState } from 'react';
import { useSlideActive } from './DeckContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Counts up to `to` each time its slide comes on screen. */
export default function CountUp({ to, delay = 1100, duration = 1100 }: { to: number; delay?: number; duration?: number }) {
  const active = useSlideActive();
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!active || reduce) {
      setValue(to);
      return;
    }
    const from = to > 1000 ? to - 60 : 0;
    setValue(from);
    let raf = 0;
    const timer = window.setTimeout(() => {
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        setValue(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [active, reduce, to, delay, duration]);

  return <>{value}</>;
}
