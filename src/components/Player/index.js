import { useSelector } from 'react-redux';
import { Bar } from 'components';
import { archer, king, warrior } from 'assets';

export const Player = ({ type }) => {
  const playerStatus = useSelector(state => state.turnBasedGame.playerStatus);

  const player = {
    'archer': archer,
    'king': king,
    'warrior': warrior
  }

  return (
    <div className="character">
      <div className={`player player-${type} player-${type}--${playerStatus.action}`}>
        <img
          className={`player__sprite player__sprite-${type} player__sprite-${type}--${playerStatus.action} pixel-art ${playerStatus.playState}`}
          src={player[type][playerStatus.action]}
          alt="player character"
        />
      </div>
      <Bar
        name={playerStatus.name}
        value={playerStatus.health}
        maxValue={playerStatus.maxHealth}
      />
      <Bar
        type="magic"
        value={playerStatus.magic.amount}
        maxValue={playerStatus.maxMagic}
      />
    </div>
  );
}
