import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { DeckContext } from './DeckContext';
import { slides } from '../slides';
import { people } from '../data/people';
import { notes } from '../data/notes';

/** Which presenter owns each slide, derived from the slide counts in data/people.ts. */
const owner: number[] = people.flatMap((p, i) => Array<number>(p.slides).fill(i));

function slideFromHash(): number {
  const h = window.location.hash.slice(1);
  return /^\d+$/.test(h) ? Math.min(slides.length - 1, Math.max(0, parseInt(h, 10) - 1)) : 0;
}

export default function Deck() {
  const [current, setCurrent] = useState(slideFromHash);
  const [notesOpen, setNotesOpen] = useState(false);
  const whoRef = useRef<HTMLDivElement>(null);
  const prevWho = useRef(owner[current]);
  const total = slides.length;

  const go = useCallback((i: number) => setCurrent(Math.max(0, Math.min(total - 1, i))), [total]);

  // keep the URL hash in sync so a refresh stays on the same slide
  useEffect(() => {
    try {
      history.replaceState(null, '', `#${current + 1}`);
    } catch {
      /* ignore */
    }
  }, [current]);

  // pop the presenter chip when the speaker changes
  useEffect(() => {
    const who = owner[current];
    if (who !== prevWho.current && whoRef.current) {
      const el = whoRef.current;
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
    }
    prevWho.current = who;
  }, [current]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !/BUTTON|A|VIDEO/.test(t.tagName))) {
        e.preventDefault();
        setCurrent((c) => Math.min(total - 1, c + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrent((c) => Math.max(0, c - 1));
      } else if (e.key === 'Home') setCurrent(0);
      else if (e.key === 'End') setCurrent(total - 1);
      else if (e.key === 'n' || e.key === 'N') setNotesOpen((o) => !o);
      else if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen?.().catch(() => {});
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  // swipe on touch screens
  useEffect(() => {
    let sx: number | null = null;
    let sy = 0;
    const start = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('.notes, video')) { sx = null; return; }
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    const end = (e: TouchEvent) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) setCurrent((c) => Math.max(0, Math.min(total - 1, c + (dx < 0 ? 1 : -1))));
      sx = null;
    };
    document.addEventListener('touchstart', start, { passive: true });
    document.addEventListener('touchend', end, { passive: true });
    return () => {
      document.removeEventListener('touchstart', start);
      document.removeEventListener('touchend', end);
    };
  }, [total]);

  const who = people[owner[current]];
  let before = 0;

  return (
    <DeckContext.Provider value={current}>
      <div className="progress" aria-hidden="true">
        {people.map((p) => {
          const done = Math.max(0, Math.min(p.slides, current + 1 - before));
          before += p.slides;
          return (
            <div key={p.name} className="seg" style={{ '--n': p.slides } as CSSProperties} title={p.name}>
              <span style={{ width: `${(done / p.slides) * 100}%` }} />
            </div>
          );
        })}
      </div>

      <div className="who" ref={whoRef} aria-live="polite">
        <b>{who.name.toUpperCase()}</b>
        <span>{who.part}</span>
      </div>

      <main className="deck">
        {slides.map((SlideComponent, i) => (
          <SlideComponent key={i} />
        ))}
      </main>

      <aside className={notesOpen ? 'notes open' : 'notes'} aria-label="Speaker notes" aria-hidden={!notesOpen}>
        <div className="wrap">
          <p className="hd">
            Slide {current + 1} · {who.name} · {who.part}
          </p>
          <p className="en">{notes[current]?.[0]}</p>
          <p className="vi">Dịch: {notes[current]?.[1]}</p>
        </div>
      </aside>

      <div className="controls" role="group" aria-label="Slide navigation">
        <button type="button" aria-label="Previous slide" disabled={current === 0} onClick={() => go(current - 1)}>
          ←
        </button>
        <span id="count" aria-live="polite">
          {current + 1} / {total}
        </span>
        <button type="button" aria-label="Next slide" disabled={current === total - 1} onClick={() => go(current + 1)}>
          →
        </button>
        <button type="button" className="txt" aria-pressed={notesOpen} onClick={() => setNotesOpen((o) => !o)}>
          Notes
        </button>
      </div>
    </DeckContext.Provider>
  );
}
