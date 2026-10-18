import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { DeckContext } from './DeckContext';
import { NavContext, type Nav } from './NavContext';
import { transitions } from '../data/transitions';
import Embers from './Embers';
import CharTransition, { CHAR_TOTAL, charKindFor, type CharKind } from './CharTransition';
import FlightOverlay, { FLIGHTS, FLIGHT_COMMIT, FLIGHT_TOTAL, type Flight } from './FlightOverlay';
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
  /** giao diện nâng cấp (phím U để bật/tắt so sánh) */
  const [ui2, setUi2] = useState(false);
  const whoRef = useRef<HTMLDivElement>(null);
  const prevWho = useRef(owner[current]);
  const lastIndex = useRef(current);
  const [nav, setNav] = useState<Nav>({ prev: -1, dir: 'fwd' });
  const [stinger, setStinger] = useState<{ key: number; who: number } | null>(null);
  const total = slides.length;

  // ---- điều hướng (có chuyển cảnh "chuyến bay" giữa các slide vùng miền) ----
  const curRef = useRef(current);
  curRef.current = current;
  const pending = useRef<number | null>(null);
  const timers = useRef<number[]>([]);
  const [flight, setFlight] = useState<(Flight & { key: number }) | null>(null);
  /** chuyển cảnh có người (đẩy / nâng / giậm / đá) — phím T để bật/tắt */
  const [charT, setCharT] = useState<{ key: number; from: number; to: number; kind: CharKind } | null>(null);
  const charOn = useRef(true);

  const go = useCallback(
    (i: number) => {
      const to = Math.max(0, Math.min(total - 1, i));
      const busy = pending.current !== null;
      // bấm tiếp khi đang bay: bỏ chuyến bay, sang slide ngay
      (timers.current ?? []).forEach((t) => window.clearTimeout(t));
      timers.current = [];
      pending.current = null;
      const from = curRef.current ?? 0;
      const f = FLIGHTS[`${from}-${to}`];
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setCharT(null);
      const kind = charKindFor(from, to);
      if (!busy && !reduce && charOn.current && kind && !f) {
        setFlight(null);
        setCharT({ key: Date.now(), from, to, kind });
        setCurrent(to);
        timers.current = [window.setTimeout(() => setCharT(null), CHAR_TOTAL[kind])];
        return;
      }
      if (busy || !f || reduce || to === from) {
        setFlight(null);
        setCurrent(to);
        return;
      }
      pending.current = to;
      setFlight({ ...f, key: Date.now() });
      timers.current = [
        window.setTimeout(() => {
          pending.current = null;
          setCurrent(to);
        }, FLIGHT_COMMIT),
        window.setTimeout(() => setFlight(null), FLIGHT_TOTAL),
      ];
    },
    [total],
  );
  /** bước tương đối, tính từ slide đang bay tới (nếu có) */
  const step = useCallback((dlt: number) => go((pending.current ?? curRef.current ?? 0) + dlt), [go]);
  useEffect(() => () => (timers.current ?? []).forEach((t) => window.clearTimeout(t)), []);

  // keep the URL hash in sync so a refresh stays on the same slide
  useEffect(() => {
    try {
      history.replaceState(null, '', `#${current + 1}`);
    } catch {
      /* ignore */
    }
  }, [current]);

  // pop the presenter chip + show the "next presenter" stinger when the speaker changes
  useEffect(() => {
    const who = owner[current];
    if (who !== prevWho.current) {
      if (whoRef.current) {
        const el = whoRef.current;
        el.classList.remove('pop');
        void el.offsetWidth;
        el.classList.add('pop');
      }
      setStinger({ key: Date.now(), who });
      const id = window.setTimeout(() => setStinger(null), 2400);
      prevWho.current = who;
      return () => window.clearTimeout(id);
    }
    prevWho.current = who;
  }, [current]);

  useEffect(() => {
    document.documentElement.classList.toggle('ui2', ui2);
  }, [ui2]);

  // mouse parallax: photo frames drift slightly with the pointer (CSS reads --mx/--my)
  useEffect(() => {
    let raf = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const s = document.documentElement.style;
        s.setProperty('--mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        s.setProperty('--my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
      });
    };
    window.addEventListener('pointermove', move);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  // remember the slide we just left so it can play an exit animation underneath the new one
  useEffect(() => {
    const prev = lastIndex.current ?? current;
    if (prev === current) return;
    lastIndex.current = current;
    setNav({ prev, dir: current > prev ? 'fwd' : 'back' });
    const id = window.setTimeout(() => setNav((n) => ({ ...n, prev: -1 })), 1100);
    return () => window.clearTimeout(id);
  }, [current]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !/BUTTON|A|VIDEO/.test(t.tagName))) {
        e.preventDefault();
        step(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        step(-1);
      } else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(total - 1);
      else if (e.key === 'n' || e.key === 'N') setNotesOpen((o) => !o);
      else if (e.key === 'u' || e.key === 'U') setUi2((v) => !v);
      else if (e.key === 't' || e.key === 'T') charOn.current = !charOn.current;
      else if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen?.().catch(() => {});
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total, go, step]);

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
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
      sx = null;
    };
    document.addEventListener('touchstart', start, { passive: true });
    document.addEventListener('touchend', end, { passive: true });
    return () => {
      document.removeEventListener('touchstart', start);
      document.removeEventListener('touchend', end);
    };
  }, [step]);

  const who = people[owner[current]];
  let before = 0;

  return (
    <DeckContext.Provider value={current}>
    <NavContext.Provider value={nav}>
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

      <main className="deck" data-dir={nav.dir} data-exit={transitions[current] ?? ''}>
        {slides.map((SlideComponent, i) => (
          <SlideComponent key={i} />
        ))}
      </main>

      <Embers on={people[owner[current]]?.name === 'Trí'} />

      {flight && <FlightOverlay key={flight.key} flight={flight} />}
      {charT && <CharTransition key={charT.key} kind={charT.kind} fromIndex={charT.from} toIndex={charT.to} />}

      {stinger && (
        <div key={stinger.key} className="stinger" aria-hidden="true">
          <i className="s1" />
          <i className="s2" />
          <div className="card">
            <small>Part {stinger.who + 1} / {people.length}</small>
            <b>{people[stinger.who].name}</b>
            <span>{people[stinger.who].part}</span>
          </div>
        </div>
      )}

      <aside className={notesOpen ? 'notes open' : 'notes'} aria-label="Speaker notes" aria-hidden={!notesOpen}>
        <div className="wrap">
          <p className="hd">
            Slide {current + 1} · {who.name} · {who.part}
          </p>
          <p className="en">{notes[current]}</p>
        </div>
      </aside>

      <div className="controls" role="group" aria-label="Slide navigation">
        <button type="button" aria-label="Previous slide" disabled={current === 0} onClick={() => step(-1)}>
          ←
        </button>
        <span id="count" aria-live="polite">
          {current + 1} / {total}
        </span>
        <button type="button" aria-label="Next slide" disabled={current === total - 1} onClick={() => step(1)}>
          →
        </button>
        <button type="button" className="txt" aria-pressed={notesOpen} onClick={() => setNotesOpen((o) => !o)}>
          Notes
        </button>
      </div>
    </NavContext.Provider>
    </DeckContext.Provider>
  );
}
