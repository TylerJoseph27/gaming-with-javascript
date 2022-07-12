import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  setGameMode,
  setPlayerName,
  setPlayerMagic,
  setPlayerResist,
  setPlayerEvade,
  setPlayerTaunt,
  setPlayerCrit
} from 'components';

export const StartMenu = () => {
  const dispatch = useDispatch();

  // change game difficulty and player name
  const setDifficulty = (difficulty = '', playerName = '') => {
    dispatch(setGameMode(difficulty));
    dispatch(setPlayerName(playerName));

    // change player stats according to game difficulty
    if (difficulty === 'easy') {
      dispatch(setPlayerMagic(14));
      dispatch(setPlayerResist(20));
      dispatch(setPlayerEvade(30));
      dispatch(setPlayerTaunt(0));
      dispatch(setPlayerCrit(0));
    } else if (difficulty === 'normal') {
      dispatch(setPlayerMagic(12));
      dispatch(setPlayerResist(0));
      dispatch(setPlayerEvade(20));
      dispatch(setPlayerTaunt(0));
      dispatch(setPlayerCrit(0));
    } else if (difficulty === 'hard') {
      dispatch(setPlayerMagic(10));
      dispatch(setPlayerResist(-20));
      dispatch(setPlayerEvade(10));
      dispatch(setPlayerTaunt(50));
      dispatch(setPlayerCrit(10));
    }
  }

  // call function on initial render with no arguments to ensure
  // gameMode only changes with correct difficuly parameters
  // mainly for test coverage
  useEffect(setDifficulty, [dispatch]);

  return (
    <div className="turn-based-game__start-menu">
      <h2>Select Difficulty</h2>
      <div className="turn-based-game__buttons">
        <Button label="Easy" callback={() => setDifficulty('easy', 'Archer')} />
        <Button label="Normal" callback={() => setDifficulty('normal', 'King')} />
        <Button label="Hard" callback={() => setDifficulty('hard', 'Warrior')} />
      </div>
    </div>
  );
}
