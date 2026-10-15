import { useEffect, useState } from 'react';
import { useSlideActive } from './DeckContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

/** Types `text` out letter by letter whenever its slide comes on screen. */
export default function TypeWriter({ text, delay = 700, speed = 30 }: { text: string; delay?: number; speed?: number }) {
  const active = useSlideActive();
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text.length);
  const typing = shown < text.length || (active && !reduce && shown === 0);

  useEffect(() => {
    if (!active || reduce) {
      setShown(text.length);
      return;
    }
    setShown(0);
    let interval = 0;
    const timer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setShown((n) => {
          if (n + 1 >= text.length) clearInterval(interval);
          return Math.min(text.length, n + 1);
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [active, reduce, text, delay, speed]);

  return (
    <span className={typing ? 'caret' : undefined} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, shown)}</span>
    </span>
  );
}
