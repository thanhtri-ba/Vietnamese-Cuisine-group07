import Deck from './components/Deck';
import SvgDefs from './components/SvgDefs';
import { PickProvider } from './components/Poll';

export default function App() {
  return (
    <PickProvider>
      <SvgDefs />
      <Deck />
    </PickProvider>
  );
}
