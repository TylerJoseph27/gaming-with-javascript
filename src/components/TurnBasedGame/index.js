import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StartMenu,
  Board,
  setGameMode,
  setAnnouncement,
  setBattleSequence,
  setPlayerStatus,
  setEnemyStatus
} from 'components';
import { playerData, enemyData } from 'helpers';

export const TurnBasedGame = () => {
  const gameMode = useSelector(state => state.turnBasedGame.gameMode);
  const dispatch = useDispatch();

  // set game initial state
  const resetGame = () => {
    dispatch(setGameMode(''));
    dispatch(setAnnouncement(''));
    dispatch(setBattleSequence(''));
    dispatch(setPlayerStatus(playerData));
    dispatch(setEnemyStatus(enemyData));
  }

  useEffect(resetGame, [dispatch]);

  return (
    <div className="turn-based-game">
      {gameMode ? <Board resetBoard={resetGame} /> : <StartMenu />}
    </div>
  );
}

export * from './turnBasedGameSlice.js';
