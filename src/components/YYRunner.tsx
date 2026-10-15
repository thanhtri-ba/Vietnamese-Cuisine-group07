import { useEffect, useRef } from 'react';
import { useSlideActive } from './DeckContext';
import RunnerFigure from './RunnerFigure';

/**
 * Slide 8: một người nhỏ vác âm dương chạy một vòng, đẩy các thẻ chữ (đang nằm lộn xộn)
 * về đúng chỗ thành từng cặp hàn – nhiệt, rồi đặt âm dương lại lên thanh cân bằng.
 * Toàn bộ là Web Animations API, chạy lại mỗi lần mở slide, huỷ sạch khi rời slide.
 */

const SPEED = 560; // px/giây
const W = 84;
const H = 131;

// vị trí lộn xộn ban đầu của 4 thẻ: [dx, dy, độ xoay]
const SCATTER: [number, number, number][] = [
  [-130, 46, -9], // Thịt vịt
  [34, -58, 7], // Nước mắm gừng
  [-90, -40, 6], // Ngày hè oi bức
  [26, 70, -6], // Canh khổ qua
];

const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

export default function YYRunner() {
  const active = useSlideActive();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runner = ref.current;
    const band = runner?.closest('.band') as HTMLElement | null;
    if (!runner || !band || !active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 640px)').matches) return; // màn hình nhỏ: bỏ qua

    const flip = runner.querySelector<HTMLElement>('.yr-flip');
    const pairs = Array.from(band.querySelectorAll<HTMLElement>('.yy-pairs .pair'));
    const cards = pairs.flatMap((p) => [p.querySelector<HTMLElement>('.l'), p.querySelector<HTMLElement>('.r')]).filter((c): c is HTMLElement => !!c);
    const pluses = pairs.map((p) => p.querySelector<HTMLElement>('.plus')).filter((c): c is HTMLElement => !!c);
    const wheel = band.querySelector<SVGSVGElement>('.yy-roll');
    const beam = band.querySelector<HTMLElement>('.yy-beam');
    if (!flip || cards.length < 4 || !wheel || !beam) return;

    let dead = false;
    const anims: Animation[] = [];
    const keep = (a: Animation) => {
      anims.push(a);
      return a;
    };

    band.classList.add('yy-run', 'yy-hold');
    runner.classList.remove('carry', 'run', 'done');

    // đo vị trí (tương đối với slide) TRƯỚC khi xáo trộn
    const br = band.getBoundingClientRect();
    const rel = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { l: r.left - br.left, r: r.right - br.left, t: r.top - br.top + band.scrollTop, b: r.bottom - br.top + band.scrollTop, cx: (r.left + r.right) / 2 - br.left };
    };
    const finals = cards.map(rel);
    const wr = rel(wheel);
    const groundY = rel(beam).t;
    const floorY = Math.min(band.clientHeight - 18, Math.max(...finals.map((f) => f.b)) + 150);

    // xáo trộn thẻ, ẩn dấu +
    const disp = (i: number) => `translate(${SCATTER[i][0]}px, ${SCATTER[i][1]}px) rotate(${SCATTER[i][2]}deg)`;
    cards.forEach((c, i) =>
      keep(c.animate([{ opacity: 0, transform: `${disp(i)} scale(.6)` }, { opacity: 1, transform: disp(i) }], { duration: 500, delay: 200 + i * 90, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'both' })),
    );
    pluses.forEach((p) => keep(p.animate([{ opacity: 0, transform: 'scale(0)' }], { duration: 1, fill: 'forwards' })));

    let px = -60;
    let py = groundY;
    const place = () => `translate(${(px - W / 2).toFixed(1)}px, ${(py - H).toFixed(1)}px)`;
    runner.style.transform = place();

    const face = (dir: number) => {
      if (dir !== 0) flip.style.transform = dir < 0 ? 'scaleX(-1)' : 'none';
    };
    const moveTo = async (x: number, y: number, speed = SPEED, hop = 0) => {
      if (dead) return;
      const from = place();
      face(Math.sign(x - px));
      const dist = Math.hypot(x - px, y - py);
      const ox = px;
      const oy = py;
      px = x;
      py = y;
      const mid = `translate(${((ox + x) / 2 - W / 2).toFixed(1)}px, ${((oy + y) / 2 - H - hop).toFixed(1)}px)`;
      runner.classList.add('run');
      const a = keep(runner.animate(hop ? [{ transform: from }, { transform: mid }, { transform: place() }] : [{ transform: from }, { transform: place() }], { duration: Math.max(120, (dist / speed) * 1000), easing: 'linear', fill: 'forwards' }));
      await a.finished.catch(() => undefined);
      runner.style.transform = place();
    };
    const jump = async (h = 26) => {
      if (dead) return;
      const base = place();
      runner.classList.remove('run');
      const up = `translate(${(px - W / 2).toFixed(1)}px, ${(py - H - h).toFixed(1)}px)`;
      const a = keep(runner.animate([{ transform: base }, { transform: up, offset: 0.45 }, { transform: base }], { duration: 380, easing: 'ease-in-out', fill: 'forwards' }));
      await a.finished.catch(() => undefined);
    };
    const push = async (i: number) => {
      if (dead) return;
      const f = finals[i];
      const [dx, dy] = SCATTER[i];
      const isLeft = i % 2 === 0; // .l bị đẩy từ trái sang, .r bị đẩy từ phải sang
      const gap = 4;
      const sx = isLeft ? f.l + dx - gap - W * 0.35 : f.r + dx + gap + W * 0.35;
      await moveTo(sx, f.b + dy, SPEED, Math.abs(sx - px) > 120 ? 30 : 0);
      if (dead) return;
      face(isLeft ? 1 : -1);
      runner.classList.add('push');
      const dur = 650;
      keep(cards[i].animate([{ transform: disp(i) }, { transform: 'none' }], { duration: dur, easing: 'cubic-bezier(.45,0,.3,1)', fill: 'forwards' }));
      await moveTo(isLeft ? f.l - gap - W * 0.35 : f.r + gap + W * 0.35, f.b, Math.hypot(dx, dy) / (dur / 1000));
      runner.classList.remove('push');
      face(isLeft ? 1 : -1);
      // thẻ "cộp" vào chỗ
      keep(cards[i].animate([{ transform: 'scale(1.06)' }, { transform: 'none' }], { duration: 260, easing: 'ease-out' }));
      if (i % 2 === 1) {
        const p = pluses[(i - 1) / 2];
        if (p) keep(p.animate([{ opacity: 0, transform: 'scale(0) rotate(-180deg)' }, { opacity: 1, transform: 'scale(1.3) rotate(10deg)', offset: 0.7 }, { opacity: 1, transform: 'none' }], { duration: 520, easing: 'ease-out', fill: 'forwards' }));
      }
    };

    (async () => {
      await sleep(900);
      if (dead) return;
      runner.classList.add('show');
      // chạy vào, nhấc âm dương lên
      await moveTo(wr.cx - 4, groundY);
      if (dead) return;
      runner.classList.remove('run');
      await sleep(120);
      band.classList.add('yy-carried');
      runner.classList.add('carry');
      await jump(30);
      // đi đẩy từng thẻ
      for (let i = 0; i < 4 && !dead; i++) await push(i);
      if (dead) return;
      await jump(22);
      // một vòng: xuống đáy, chạy về bên trái, lên lại thanh cân bằng
      await moveTo(px + 40, floorY);
      await moveTo(wr.cx, floorY);
      await moveTo(wr.cx, groundY, SPEED, 40);
      if (dead) return;
      runner.classList.remove('run');
      // đặt âm dương xuống
      runner.classList.remove('carry');
      band.classList.remove('yy-carried', 'yy-hold');
      await jump(18);
      await moveTo(-80, groundY);
      runner.classList.add('done');
      runner.classList.remove('run', 'show');
    })();

    return () => {
      dead = true;
      anims.forEach((a) => a.cancel());
      runner.classList.remove('carry', 'run', 'push', 'show', 'done');
      runner.style.transform = '';
      if (flip) flip.style.transform = '';
      band.classList.remove('yy-run', 'yy-hold', 'yy-carried');
    };
  }, [active]);

  return (
    <div className="yy-runner" ref={ref} aria-hidden="true">
      <RunnerFigure
        width={W}
        height={H}
        cargo={
          <>
            <circle cx="32" cy="13" r="13" fill="var(--cream)" stroke="var(--forest)" strokeWidth="2" />
            <path d="M32 0 A13 13 0 0 1 32 26 A6.5 6.5 0 0 1 32 13 A6.5 6.5 0 0 0 32 0Z" fill="var(--forest)" />
            <circle cx="32" cy="6.5" r="1.8" fill="var(--forest)" />
            <circle cx="32" cy="19.5" r="1.8" fill="var(--cream)" />
          </>
        }
      />
    </div>
  );
}
