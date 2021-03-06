import { useSelector } from 'react-redux';
import { Bar } from 'components';

export const Enemy = ({ spriteActions }) => {
  const enemyStatus = useSelector(state => state.turnBasedGame.enemyStatus);

  return (
    <div className="character bringer-of-death">
      <div className={`enemy enemy--${enemyStatus.action}`}>
        <img
          className={`enemy__sprite enemy__sprite--${enemyStatus.action} pixel-art ${enemyStatus.playState}`}
          src={spriteActions[enemyStatus.action]}
          alt="enemy character"
        />
      </div>
      <Bar
        name="Bringer of Death"
        value={enemyStatus.health}
        maxValue={enemyStatus.maxHealth}
      />
    </div>
  );
}
