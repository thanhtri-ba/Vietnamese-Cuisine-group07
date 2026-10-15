import { useEffect, useRef } from 'react';
import { useSlideActive } from './DeckContext';
import RunnerFigure from './RunnerFigure';

/**
 * Slide 1: mọi chữ (dòng nhỏ, tiêu đề, phụ đề) bay tán loạn khắp slide rồi ghép lại đúng chỗ;
 * tên các thành viên rơi lộn xộn; một người nhỏ đội đĩa broken rice chạy vào,
 * đẩy từng tên về đúng hàng (theo thứ tự thuyết trình), rồi tung đĩa ăn mừng và chạy đi.
 */

const SPEED = 600;
const W = 84;
const H = 131;

const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

export default function IntroRunner() {
  const active = useSlideActive();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runner = ref.current;
    const band = runner?.closest('.band') as HTMLElement | null;
    if (!runner || !band || !active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 640px)').matches) return;

    const flip = runner.querySelector<HTMLElement>('.yr-flip');
    const chips = Array.from(band.querySelectorAll<HTMLElement>('.members li')).slice(1); // bỏ "Nhóm 7"
    if (!flip || chips.length === 0) return;

    let dead = false;
    const anims: Animation[] = [];
    const keep = (a: Animation) => {
      anims.push(a);
      return a;
    };
    band.classList.add('intro-run');

    const br = band.getBoundingClientRect();
    const rel = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { l: r.left - br.left, r: r.right - br.left, t: r.top - br.top + band.scrollTop, b: r.bottom - br.top + band.scrollTop };
    };
    const finals = chips.map(rel);
    // tên rơi xuống bên dưới hàng, nghiêng ngả
    const scatter = chips.map((_, i) => [-26 - (i % 3) * 14, 46 + ((i * 37) % 5) * 12, (i % 2 ? 1 : -1) * (8 + ((i * 13) % 4) * 4)] as const);
    const disp = (i: number) => `translate(${scatter[i][0]}px, ${scatter[i][1]}px) rotate(${scatter[i][2]}deg)`;
    chips.forEach((c, i) =>
      keep(c.animate([{ opacity: 0, transform: `translate(${scatter[i][0]}px, -60px) rotate(0deg)` }, { opacity: 1, transform: disp(i), offset: 0.75 }, { opacity: 1, transform: disp(i) }], { duration: 650, delay: 400 + i * 110, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'both' })),
    );

    // ---- chữ bay tán loạn rồi ghép lại ----
    const letters = Array.from(band.querySelectorAll<HTMLElement>('.cover-text .ch'));
    const keys = band.querySelector<HTMLElement>('.cover-text .keys');
    const bw = band.clientWidth;
    const bh = band.clientHeight;
    // số giả ngẫu nhiên ổn định, mỗi lần mở slide một kiểu khác
    let seed = Math.floor(Math.random() * 1e9);
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const SCATTER_IN = 450;
    const HOLD = 650;
    const FLY = 900;
    const STAG = Math.min(28, 1400 / Math.max(1, letters.length));
    letters.forEach((el, i) => {
      const f = rel(el);
      const cx = (f.l + f.r) / 2;
      const cy = (f.t + f.b) / 2;
      const tx = bw * (0.04 + rnd() * 0.92) - cx;
      const ty = bh * (0.06 + rnd() * 0.86) - cy;
      const rot = (rnd() - 0.5) * 300;
      const sc = 0.5 + rnd() * 0.9;
      const off = `translate(${tx.toFixed(0)}px, ${ty.toFixed(0)}px) rotate(${rot.toFixed(0)}deg) scale(${sc.toFixed(2)})`;
      keep(
        el.animate(
          [
            { opacity: 0, transform: `${off} scale(.2)` },
            { opacity: 1, transform: off, offset: SCATTER_IN / (SCATTER_IN + HOLD + FLY) },
            { opacity: 1, transform: off, offset: (SCATTER_IN + HOLD) / (SCATTER_IN + HOLD + FLY) },
            { opacity: 1, transform: 'none' },
          ],
          { duration: SCATTER_IN + HOLD + FLY, delay: rnd() * 200 + i * STAG, easing: 'cubic-bezier(.25,.8,.3,1.15)', fill: 'both' },
        ),
      );
    });
    const lettersDone = 200 + letters.length * STAG + SCATTER_IN + HOLD + FLY;
    if (keys) keep(keys.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 500, delay: lettersDone, easing: 'ease-out', fill: 'both' }));

    const rowY = Math.max(...finals.map((f) => f.b));
    let px = -60;
    let py = rowY;
    const place = () => `translate(${(px - W / 2).toFixed(1)}px, ${(py - H).toFixed(1)}px)`;
    runner.style.transform = place();
    const face = (d: number) => {
      if (d !== 0) flip.style.transform = d < 0 ? 'scaleX(-1)' : 'none';
    };
    const moveTo = async (x: number, y: number, speed = SPEED) => {
      if (dead) return;
      const from = place();
      face(Math.sign(x - px));
      const dist = Math.hypot(x - px, y - py);
      px = x;
      py = y;
      runner.classList.add('run');
      const a = keep(runner.animate([{ transform: from }, { transform: place() }], { duration: Math.max(120, (dist / speed) * 1000), easing: 'linear', fill: 'forwards' }));
      await a.finished.catch(() => undefined);
      runner.style.transform = place();
    };
    const jump = async (h = 30, ms = 420) => {
      if (dead) return;
      runner.classList.remove('run');
      const base = place();
      const up = `translate(${(px - W / 2).toFixed(1)}px, ${(py - H - h).toFixed(1)}px)`;
      const a = keep(runner.animate([{ transform: base }, { transform: up, offset: 0.45 }, { transform: base }], { duration: ms, easing: 'ease-in-out', fill: 'forwards' }));
      await a.finished.catch(() => undefined);
    };

    (async () => {
      await sleep(Math.max(1900, lettersDone - 300)); // chờ chữ ghép xong
      if (dead) return;
      runner.classList.add('show', 'carry');
      for (let i = 0; i < chips.length && !dead; i++) {
        const f = finals[i];
        const [dx, dy] = scatter[i];
        const gap = 3;
        await moveTo(f.l + dx - gap - W * 0.3, f.b + dy);
        if (dead) return;
        face(1);
        runner.classList.add('push');
        const dur = 420;
        keep(chips[i].animate([{ transform: disp(i) }, { transform: 'none' }], { duration: dur, easing: 'cubic-bezier(.45,0,.3,1)', fill: 'forwards' }));
        await moveTo(f.l - gap - W * 0.3, f.b, Math.hypot(dx, dy) / (dur / 1000));
        runner.classList.remove('push');
        keep(chips[i].animate([{ transform: 'scale(1.15)' }, { transform: 'none' }], { duration: 240, easing: 'ease-out' }));
      }
      if (dead) return;
      // ăn mừng: nhảy cao tung đĩa broken rice
      const last = finals[finals.length - 1];
      await moveTo(last.r + 40, rowY);
      runner.classList.add('cheer');
      await jump(46, 520);
      await jump(30, 420);
      runner.classList.remove('cheer');
      await moveTo(band.clientWidth + 80, rowY, SPEED * 1.2);
      runner.classList.remove('run', 'show', 'carry');
    })();

    return () => {
      dead = true;
      anims.forEach((a) => a.cancel());
      runner.classList.remove('carry', 'run', 'push', 'show', 'cheer');
      runner.style.transform = '';
      flip.style.transform = '';
      band.classList.remove('intro-run');
    };
  }, [active]);

  return (
    <div className="yy-runner intro-runner" ref={ref} aria-hidden="true">
      <RunnerFigure
        width={W}
        height={H}
        cargo={
          <>
            {/* đĩa broken rice */}
            <ellipse cx="32" cy="17" rx="17" ry="5.5" fill="var(--cream)" stroke="var(--forest)" strokeWidth="1.8" />
            <ellipse cx="29" cy="13.5" rx="8" ry="4.5" fill="#fff" stroke="var(--forest)" strokeWidth="1" />
            <path d="M34 11 C 40 8, 47 10, 46 14 C 44 17, 37 17, 34 15 Z" fill="#8a3b1d" stroke="var(--forest)" strokeWidth="1" />
            <circle cx="22" cy="14" r="3.4" fill="#fff" stroke="var(--forest)" strokeWidth=".8" />
            <circle cx="22" cy="14" r="1.6" fill="#f2b632" />
            <circle cx="41" cy="17.5" r="1.8" fill="#e5533d" />
            <circle cx="24.5" cy="18" r="1.7" fill="#7fb24a" />
            <path d="M30 7 C 29 4, 31 3, 30 0 M34 7 C 33 4, 35 3, 34 0" stroke="var(--sage)" strokeWidth="1" fill="none" className="yr-steam" />
          </>
        }
      />
    </div>
  );
}
