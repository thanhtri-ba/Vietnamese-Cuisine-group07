import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/deck.css';
import './styles/chars.css';
import './styles/viet.css';
import './styles/viet-scene.css';
import './styles/viet-trans.css';
import './styles/viet-flight.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
