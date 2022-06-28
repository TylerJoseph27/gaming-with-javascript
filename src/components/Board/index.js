import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Player,
  Enemy,
  EnemySpell,
  BattleMenu,
  setAnnouncement,
  setPlayerPlayState,
  setEnemyPlayState
} from 'components';
import { bringerOfDeath } from 'assets';
import { typeMessage } from 'helpers';

export const Board = ({ resetBoard }) => {
  const gameMode = useSelector(state => state.turnBasedGame.gameMode);
  const announcement = useSelector(state => state.turnBasedGame.announcement);
  const battleSequence = useSelector(state => state.turnBasedGame.battleSequence);
  const playerStatus = useSelector(state => state.turnBasedGame.playerStatus);
  const enemyStatus = useSelector(state => state.turnBasedGame.enemyStatus);
  
  const dispatch = useDispatch();

  // change announcement state and display message like it's being typed
  const typeAnnouncement = useCallback(message => {
    typeMessage(message, setAnnouncement, dispatch);
  }, [dispatch]);

  // change announcement to display winner
  const displayWinner = () => {
    if (battleSequence === 'inactive') {
      if (enemyStatus.health === 0 && playerStatus.health > 0) {
        typeAnnouncement(`The ${playerStatus.name} Wins!`);
      } else if (playerStatus.health === 0 && enemyStatus.health > 0) {
        typeAnnouncement(`The Bringer of Death Wins!`);
      }
    }
  }

  useEffect(() => {
    dispatch(setPlayerPlayState(''));
    dispatch(setEnemyPlayState(''));
  }, [dispatch]);

  useEffect(() => {
    typeAnnouncement(`What will the ${playerStatus.name} do?`);
  }, [playerStatus.name, typeAnnouncement]);

  useEffect(displayWinner, [
    battleSequence,
    enemyStatus.health,
    playerStatus.health,
    playerStatus.name,
    typeAnnouncement
  ]);

  return (
    <>
      {(!battleSequence || battleSequence === 'inactive') && <div className="turn-based-game__buttons">
        <Button label="New Game" callback={resetBoard} />
      </div>}
      <div className="turn-based-game__board">
        {gameMode === 'easy' && <Player type="archer" />}
        {gameMode === 'normal' && <Player type="king" />}
        {gameMode === 'hard' && <Player type="warrior" />}
        <Enemy spriteActions={bringerOfDeath} />
        <EnemySpell spriteAction={bringerOfDeath['spell']} />
      </div>
      <p className="turn-based-game__announcement">{announcement}</p>
      {!battleSequence && <BattleMenu typeAnnouncement={typeAnnouncement} />}
    </>
  );
}
