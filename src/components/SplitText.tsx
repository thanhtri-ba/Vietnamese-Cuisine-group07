import type { CSSProperties } from 'react';

/** Splits text into per-letter spans (.ch) grouped by word (.w) for the letter-by-letter entrance. */
export default function SplitText({ text, start = 0 }: { text: string; start?: number }) {
  let i = start;
  return (
    <>
      {text.split(/(\s+)/).map((part, k) => {
        if (!part) return null;
        if (/^\s+$/.test(part)) return ' ';
        return (
          <span className="w" aria-hidden="true" key={k}>
            {Array.from(part).map((ch, j) => (
              <span className="ch" key={j} style={{ '--i': i++ } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}
