import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StartMenu,
  Board,
  setGameMode,
  setAnnouncement,
  setBattleSequence,
  setEnemyStatus,
  setPlayerStatus
} from 'components';
import { enemyData, playerData } from 'helpers';

export const TurnBasedGame = () => {
  const gameMode = useSelector(state => state.turnBasedGame.gameMode);
  const dispatch = useDispatch();

  // reset game to initial state
  const resetGame = () => {
    dispatch(setGameMode(''));
    dispatch(setAnnouncement(''));
    dispatch(setBattleSequence('inactive'));
    dispatch(setEnemyStatus(enemyData));
    dispatch(setPlayerStatus(playerData));
  }

  useEffect(resetGame, [dispatch]);

  return (
    <div className="turn-based-game">
      {gameMode ? <Board resetBoard={resetGame} /> : <StartMenu />}
    </div>
  );
}

export * from './turnBasedGameSlice.js';
