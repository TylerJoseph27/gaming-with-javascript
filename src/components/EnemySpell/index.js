export const EnemySpell = ({ spriteAction }) => {
  return (
    <div className="character bringer-of-death bringer-of-death--spell">
      <div className="enemy enemy--spell">
        <img
          className="enemy__sprite enemy__sprite--spell pixel-art paused"
          src={spriteAction}
          alt="enemy character"
        />
      </div>
    </div>
  );
}
