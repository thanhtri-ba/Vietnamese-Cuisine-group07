import { useState, type ReactNode } from 'react';

/** Card that flips on click/tap (and on hover where the device supports it, via CSS). */
export default function FlipCard({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false);
  return (
    <button type="button" className={on ? 'flip on' : 'flip'} aria-pressed={on} onClick={() => setOn((v) => !v)}>
      {children}
    </button>
  );
}
