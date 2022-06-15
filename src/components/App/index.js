import { useSelector } from 'react-redux';
import {
  Header,
  Footer,
  HomeScreen,
  MemoryGame,
  TurnBasedGame
} from 'components';

export const App = () => {
  const mode = useSelector(state => state.app.mode);

  return (
    <>
      <Header />
        <main>
          {mode === 'home' && <HomeScreen />}
          {mode === 'memory' && <MemoryGame />}
          {mode === 'turn-based' && <TurnBasedGame />}
        </main>
      <Footer />
    </>
  );
}

export * from './appSlice.js';
