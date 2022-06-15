import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  setBattleSequence,
  setPlayerAction,
  setPlayerPlayState,
  incPlayerAccuracy,
  decPlayerAccuracy,
  resetPlayerAccuracy,
  setPlayerHealth,
  incPlayerMagic,
  decPlayerMagic,
  setEnemyAction,
  setEnemyPlayState,
  setEnemyHealth
} from 'components';
import {
  attack,
  heal,
  enemyActions,
  enemyActionsNoHeal,
  genRanNum
} from 'helpers';

export const BattleMenu = ({ typeAnnouncement }) => {
  const playerStatus = useSelector(state => state.turnBasedGame.playerStatus);
  const enemyStatus = useSelector(state => state.turnBasedGame.enemyStatus);
  const dispatch = useDispatch();

  // boolean to check accuracy of player actions
  const checkAccuracy = playerStatus.lightAttack.accuracy < 100 ||
                        playerStatus.heavyAttack.accuracy < 100 ||
                        playerStatus.heal.accuracy < 100;

  // increase accuracy of player actions
  const incAccuracy = () => {
    if (playerStatus.magic.amount > 0 && checkAccuracy) {
      dispatch(decPlayerMagic());
      dispatch(incPlayerAccuracy());
    }
  }

  // decrease accuracy of player actions
  const decAccuracy = () => {
    if (playerStatus.magic.amount < 10 && playerStatus.magic.amount < playerStatus.magic.count) {
      dispatch(incPlayerMagic());
      dispatch(decPlayerAccuracy());
    }
  }

  // start battle by removing buttons and typing announcement
  const startBattleSequence = (action) => {
    dispatch(setBattleSequence('active'));
    typeAnnouncement(`The ${playerStatus.name} has chosen to ${action}!`);
  }

  // end battle by adding buttons, resetting accuracy, and typing announcement
  const endBattleSequence = (ms = 0) => {
    // animation delay
    setTimeout(() => {
      typeAnnouncement(`What will the ${playerStatus.name} do?`);
      dispatch(setBattleSequence(''));
      dispatch(resetPlayerAccuracy());
    }, ms);
  }

  // handle light and heavy attack sequences of enemy
  const handleEnemyAttack = (enemyAttack, type) => {
    // calculate damage
    const damage = attack(enemyAttack, playerStatus);

    // animation delay
    setTimeout(() => {
      if (damage > 0) {
        // calculate remaining health of player
        const health = playerStatus.health - damage;

        if (health > 0) {
          dispatch(setPlayerHealth(health));
          endBattleSequence();
        } else {
          dispatch(setPlayerHealth(0));
          dispatch(setBattleSequence('inactive'));
        }
      } else {
        typeAnnouncement(`The Bringer of Death failed to attack.`);
        endBattleSequence(2000);
      }
    }, 2000);
  }

  // handle healing sequence of enemy
  const handleEnemyHeal = () => {
    typeAnnouncement('The Bringer of Death has chosen to heal!');
    // calculate healing received
    const healing = heal(enemyStatus.heal);

    // animation delay
    setTimeout(() => {
      if (healing > 0) {
        // calculate new health pool of enemy
        const health = enemyStatus.health + healing;

        if (health < enemyStatus.maxHealth) {
          dispatch(setEnemyHealth(health));
        } else {
          dispatch(setEnemyHealth(enemyStatus.maxHealth));
        }

        endBattleSequence();
      } else {
        typeAnnouncement(`The Bringer of Death failed to heal.`);
        endBattleSequence(2000);
      }
    }, 2000);
  }

  // handle action choice sequence of enemy
  const handleEnemyAction = (ms = 0) => {
    // declare action
    let enemyAction = '';

    if (enemyStatus.health === enemyStatus.maxHealth) {
      // set action choices for when full health
      enemyAction = enemyActionsNoHeal[genRanNum(enemyActions.length)];
    } else if (enemyStatus.health < enemyStatus.maxHealth) {
      // set action choices for when below max health
      enemyAction = enemyActions[genRanNum(enemyActions.length)];
    }
    
    // animation delay
    setTimeout(() => {
      if (enemyAction === 'light-attack') {
        typeAnnouncement('The Bringer of Death has chosen to light attack!');
        handleEnemyAttack(enemyStatus.lightAttack, enemyAction);
      } else if (enemyAction === 'heavy-attack') {
        typeAnnouncement('The Bringer of Death has chosen to heavy attack!');
        handleEnemyAttack(enemyStatus.heavyAttack, enemyAction);
      } else if (enemyAction === 'heal') {
        handleEnemyHeal();
      }
    }, ms);
  }

  // handle light and heavy attack sequences of player
  const handlePlayerAttack = (playerAttack, type) => {
    // calculate damage
    const damage = attack(playerAttack, enemyStatus);

    // animation delay
    setTimeout(() => {
      if (damage > 0) {
        // calculate remaining health of enemy
        const health = enemyStatus.health - damage;

        if (health > 0) {
          dispatch(setEnemyHealth(health));
          handleEnemyAction();
        } else {
          dispatch(setEnemyHealth(0));
          dispatch(setBattleSequence('inactive'));
        }
      } else {
        typeAnnouncement(`The ${playerStatus.name} failed to attack.`);
        handleEnemyAction(2000);
      }
    }, 2000);
  }

  // handle light attack sequence of player
  const handleLightAttack = () => {
    startBattleSequence('light attack');
    handlePlayerAttack(playerStatus.lightAttack, 'light-attack');
  }

  // handle heavy attack sequence of player
  const handleHeavyAttack = () => {
    startBattleSequence('heavy attack');
    handlePlayerAttack(playerStatus.heavyAttack, 'heavy-attack');
  }

  // handle healing sequence of player
  const handleHeal = () => {
    startBattleSequence('heal');
    // calculate healing received
    const healing = heal(playerStatus.heal);

    // animation delay
    setTimeout(() => {
      if (healing > 0) {
        // calculate new health pool of player
        const health = playerStatus.health + healing;

        if (health < playerStatus.maxHealth) {
          dispatch(setPlayerHealth(health));
        } else {
          dispatch(setPlayerHealth(playerStatus.maxHealth));
        }

        handleEnemyAction();
      } else {
        typeAnnouncement(`The ${playerStatus.name} failed to heal.`);
        handleEnemyAction(2000);
      }
    }, 2000);
  }

  // returns label for player action button
  const buttonLabel = (action, number, type, accuracy) => {
    return (
      <p>{action}<br /><span className="dmg">
        {number}
      </span> {type} <span className="acc">
        {accuracy}%
      </span> Accurate</p>
    );
  }

  return (
    <div className="turn-based-game__battle-menu">
      <div className="turn-based-game__buttons">
        <Button
          label={buttonLabel(
            'Light Attack',
            playerStatus.lightAttack.damage,
            'Damage',
            playerStatus.lightAttack.accuracy
          )}
          callback={handleLightAttack}
        />
        <Button
          label={buttonLabel(
            'Heavy Attack',
            playerStatus.heavyAttack.damage,
            'Damage',
            playerStatus.heavyAttack.accuracy
          )}
          callback={handleHeavyAttack}
        />
        <Button
          label={buttonLabel(
            'Heal',
            playerStatus.heal.health,
            'Health',
            playerStatus.heal.accuracy
          )}
          callback={handleHeal}
        />
      </div>
      <div className="turn-based-game__buttons">
        <Button
          label={`Decrease Accuracy`}
          callback={decAccuracy}
        />
        <Button
          label={`Increase Accuracy`}
          callback={incAccuracy}
        />
      </div>
    </div>
  );
}
