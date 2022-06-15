import { useDispatch } from 'react-redux';
import {
  Button,
  setGameMode,
  setPlayerName,
  setPlayerResist
} from 'components';

export const StartMenu = () => {
  const dispatch = useDispatch();

  // change game difficulty and player name
  const handleClick = (gameMode, playerName) => {
    dispatch(setGameMode(gameMode));
    dispatch(setPlayerName(playerName));

    if (gameMode === 'easy') {
      dispatch(setPlayerResist(50));
    } else if (gameMode === 'normal') {
      dispatch(setPlayerResist(0));
    } else if (gameMode === 'hard') {
      dispatch(setPlayerResist(-50));
    }
  }

  return (
    <div className="turn-based-game__start-menu">
      <h2>Select Difficulty</h2>
      <div className="turn-based-game__buttons">
        <Button label="Easy" callback={() => handleClick('easy', 'Archer')} />
        <Button label="Normal" callback={() => handleClick('normal', 'King')} />
        <Button label="Hard" callback={() => handleClick('hard', 'Warrior')} />
      </div>
    </div>
  );
}
