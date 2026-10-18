import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DISHES = ['Pho', 'Banh mi', 'Broken rice'] as const;
/** ảnh & tên tiếng Việt có dấu cho từng món (chỉ để trình bày, giá trị lưu vẫn là tên tiếng Anh) */
const LOOK: Record<(typeof DISHES)[number], { img: string; vi: string }> = {
  Pho: { img: 'img/photos/pho.webp', vi: 'Phở' },
  'Banh mi': { img: 'img/photos/banh-mi.webp', vi: 'Bánh mì' },
  'Broken rice': { img: 'img/photos/com-tam.webp', vi: 'Cơm tấm' },
};

type PickState = [string | null, (v: string | null) => void];
const PickContext = createContext<PickState>([null, () => {}]);

/** Holds the dish picked on slide 2 so the final slide can recall it. */
export function PickProvider({ children }: { children: ReactNode }) {
  const state = useLocalStorage<string | null>('comtam-pick', null);
  return <PickContext.Provider value={state}>{children}</PickContext.Provider>;
}

type Extra = { style?: CSSProperties; 'data-st'?: string; 'data-a'?: string };

export function PollPicks(props: Extra) {
  const [pick, setPick] = useContext(PickContext);
  return (
    <div className="picks" role="group" aria-label="Choose one dish" {...props}>
      {DISHES.map((dish, i) => (
        <button
          key={dish}
          type="button"
          className="pick"
          aria-pressed={pick === dish}
          style={{ '--i': i } as CSSProperties}
          onClick={() => setPick(dish)}
        >
          <span className="pick-dia" aria-hidden="true">
            <img src={LOOK[dish].img} alt="" />
          </span>
          <span className="pick-en">{dish}</span>
          <span className="pick-vi" lang="vi">{LOOK[dish].vi}</span>
          <span className="pick-seal" aria-hidden="true">Chọn</span>
        </button>
      ))}
    </div>
  );
}

export function PollNote(props: Extra) {
  const [pick] = useContext(PickContext);
  return (
    <p className="note" {...props}>
      {pick ? `Your choice: ${pick}. We will come back to this question at the end.` : 'Remember your answer. We will come back to it at the end.'}
    </p>
  );
}

export function PollRecall(props: Extra) {
  const [pick] = useContext(PickContext);
  return (
    <p className="recall" {...props}>
      {pick
        ? `On slide 2 you chose ${pick}. Would you still choose it now: pho, banh mi or broken rice?`
        : 'Back to Hòa’s question: pho, banh mi or broken rice?'}
    </p>
  );
}
