import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DISHES = ['Phở', 'Bánh mì', 'Cơm tấm'] as const;

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
    <div className="picks" role="group" aria-label="Chọn một món ăn" {...props}>
      {DISHES.map((dish, i) => (
        <button
          key={dish}
          type="button"
          className="pick"
          aria-pressed={pick === dish}
          style={{ '--i': i } as CSSProperties}
          onClick={() => setPick(dish)}
        >
          {dish}
        </button>
      ))}
    </div>
  );
}

export function PollNote(props: Extra) {
  const [pick] = useContext(PickContext);
  return (
    <p className="note" {...props}>
      {pick ? `Lựa chọn của bạn: ${pick}. Chúng ta sẽ quay lại câu hỏi này ở phần cuối.` : 'Hãy ghi nhớ câu trả lời của bạn. Chúng ta sẽ quay lại ở phần cuối.'}
    </p>
  );
}

export function PollRecall(props: Extra) {
  const [pick] = useContext(PickContext);
  return (
    <p className="recall" {...props}>
      {pick
        ? `Ở slide 2 bạn đã chọn ${pick}. Bây giờ bạn vẫn sẽ chọn món này: phở, bánh mì hay cơm tấm?`
        : 'Quay lại câu hỏi của Hòa: phở, bánh mì hay cơm tấm?'}
    </p>
  );
}
