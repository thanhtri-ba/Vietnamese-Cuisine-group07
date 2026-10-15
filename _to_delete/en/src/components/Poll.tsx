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
      {pick ? `Your choice: ${pick}. We will come back to this question at the end.` : 'Remember your answer. We will come back to it at the end.'}
    </p>
  );
}

export function PollRecall(props: Extra) {
  const [pick] = useContext(PickContext);
  return (
    <p className="recall" {...props}>
      {pick
        ? `On slide 2 you chose ${pick}. Would you still choose it now: phở, bánh mì or cơm tấm?`
        : 'Back to Hòa’s question: phở, bánh mì or cơm tấm?'}
    </p>
  );
}
