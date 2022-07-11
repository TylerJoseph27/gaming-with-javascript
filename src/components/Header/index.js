import { useSelector, useDispatch } from 'react-redux';
import { setMode } from 'components';

export const Header = () => {
  const mode = useSelector(state => state.app.mode);
  const battleSequence = useSelector(state => state.turnBasedGame.battleSequence);
  const dispatch = useDispatch();

  return (
    <header className="nav">
      {(!battleSequence || battleSequence === 'inactive') ? <menu>
        <li 
          className={`nav__item ${mode === 'home' && 'nav__item--active'}`}
          onClick={() => dispatch(setMode('home'))}
        >
          Home
        </li>
        <li
          className={`nav__item ${mode === 'memory' && 'nav__item--active'}`}
          onClick={() => dispatch(setMode('memory'))}
        >
          Memory
        </li>
        <li
          className={`nav__item ${mode === 'turn-based' && 'nav__item--active'}`}
          onClick={() => dispatch(setMode('turn-based'))}
        >
          Turn-Based
        </li>
      </menu> : <h2>Turn-Based Game</h2>}
      {mode === 'home' && <h1>Gaming with JavaScript</h1>}
      {mode === 'memory' && <h1>Memory Game</h1>}
      {mode === 'turn-based' && <h1>Turn-Based Game</h1>}
    </header>
  );
}
