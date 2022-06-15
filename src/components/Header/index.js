import { useSelector, useDispatch } from 'react-redux';
import { changeMode } from 'components';

export const Header = () => {
  const mode = useSelector(state => state.app.mode);
  const dispatch = useDispatch();

  return (
    <header className="nav">
      <menu>
        <li 
          className={`nav__item ${mode === 'home' && 'nav__item--active'}`}
          onClick={() => dispatch(changeMode('home'))}
        >
          Home
        </li>
        <li
          className={`nav__item ${mode === 'memory' && 'nav__item--active'}`}
          onClick={() => dispatch(changeMode('memory'))}
        >
          Memory
        </li>
        <li
          className={`nav__item ${mode === 'turn-based' && 'nav__item--active'}`}
          onClick={() => dispatch(changeMode('turn-based'))}
        >
          Turn-Based
        </li>
      </menu>
      <h1>
        {mode === 'home' && 'Gaming with JavaScript'}
        {mode === 'memory' && 'Memory Game'}
        {mode === 'turn-based' && 'Turn-Based Game'}
      </h1>
    </header>
  );
}
