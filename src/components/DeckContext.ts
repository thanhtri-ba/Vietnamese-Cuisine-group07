import { createContext, useContext } from 'react';

/** Index of the slide currently on screen. */
export const DeckContext = createContext<number>(0);
/** Index of the slide a component is rendered inside. */
export const SlideIndexContext = createContext<number>(-1);

/** True while the enclosing slide is the one on screen. */
export function useSlideActive(): boolean {
  const current = useContext(DeckContext);
  const index = useContext(SlideIndexContext);
  return index === current;
}
