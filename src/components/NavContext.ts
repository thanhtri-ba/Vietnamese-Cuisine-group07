import { createContext } from 'react';

/** Slide vừa rời màn hình (-1 = không có) và hướng điều hướng, dùng cho hiệu ứng thoát. */
export interface Nav {
  prev: number;
  dir: 'fwd' | 'back';
}

export const NavContext = createContext<Nav>({ prev: -1, dir: 'fwd' });
