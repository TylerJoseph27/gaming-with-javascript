import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  setBattleSequence,
  setPlayerPlayState,
  setPlayerAction,
  setPlayerAccuracy,
  incPlayerAccuracy,
  decPlayerAccuracy,
  setPlayerHealth,
  incPlayerMagic,
  decPlayerMagic,
  setPlayerTaunt,
  setEnemyPlayState,
  setEnemyAction,
  decEnemyAccuracy,
  setEnemyHealth
} from 'components';
import {
  genRanNum,
  wait,
  enemyActions,
  enemyActionsNoHeal,
  attack,
  critAttack,
  heal,
  roll
} from 'helpers';

export const BattleMenu = ({ typeAnnouncement }) => {
  const playerStatus = useSelector(state => state.turnBasedGame.playerStatus);
  const enemyStatus = useSelector(state => state.turnBasedGame.enemyStatus);
  const dispatch = useDispatch();

  // increase accuracy of player actions
  const incAccuracy = () => {
    if (playerStatus.magic.amount > 0 && (playerStatus.lightAttack.accuracy < 100 ||
        playerStatus.heavyAttack.accuracy < 100 || playerStatus.heal.accuracy < 100)) {
      dispatch(decPlayerMagic());
      dispatch(incPlayerAccuracy());
    }
  }

  // decrease accuracy of player actions
  const decAccuracy = () => {
    if (playerStatus.magic.amount < playerStatus.maxMagic &&
        playerStatus.magic.amount < playerStatus.magic.count) {
      dispatch(incPlayerMagic());
      dispatch(decPlayerAccuracy());
    }
  }

  // start battle by removing buttons and typing announcement
  const startBattleSequence = (action) => {
    dispatch(setBattleSequence('active'));
    typeAnnouncement(`The ${playerStatus.name} chose to ${action}!`);
  }

  // end battle by adding buttons, resetting accuracy, and typing announcement
  const endBattleSequence = () => {
    typeAnnouncement(`What will the ${playerStatus.name} do?`);
    dispatch(setBattleSequence(''));
    dispatch(setPlayerAccuracy());
  }

  // change animation by applying a different CSS class
  const animateSpriteAction = async (sprite, action, ms = 10) => {
    // check for sprite
    if(document.querySelector(sprite)) {
      // stop animation
      document.querySelector(sprite).style.animation = 'none';
      // animation delay
      await wait(10);

      // chance animation/CSS class
      if (sprite === '.enemy__sprite') {
        dispatch(setEnemyAction(action));
      } else if (sprite === '.player__sprite') {
        dispatch(setPlayerAction(action));
      }
      
      // animation delay
      await wait(ms);
      // restart animation
      document.querySelector(sprite).style.animation = '';
    }
  }

  // change animation by applying a different CSS class
  const animateSprite = async (sprite, action, ms = 1000) => {
    // chance animation/CSS class
    if (sprite === '.enemy__sprite') {
      dispatch(setEnemyPlayState(action));
    } else if (sprite === '.player__sprite') {
      dispatch(setPlayerPlayState(action));
    }

    // animation delay
    await wait(ms);

    // chance animation/CSS class
    if (sprite === '.enemy__sprite') {
      dispatch(setEnemyPlayState(''));
    } else if (sprite === '.player__sprite') {
      dispatch(setPlayerPlayState(''));
    }
  }

  // animate spell when enemy casts heavy attack
  const animateEnemySpell = async () => {
    // find element
    const sprite = document.querySelector('.enemy--spell img');

    // check for sprite
    if (sprite) {
      // unpause and start animation
      sprite.parentElement.style.opacity = 1;
      sprite.classList.remove('paused');
      sprite.style.animation = '';

      // animation delay 1.5s
      await wait(1500);

      // stop and pause animation
      sprite.parentElement.style.opacity = 0;
      sprite.style.animation = 'none';
      sprite.classList.add('paused');
    }
  }

  // remove sprite after death animation and end battle
  const handleDeath = async (sprite, ms) => {
    animateSpriteAction(sprite, 'death');
    // animation delay
    await wait(ms);

    // check for sprite
    if (document.querySelector(sprite)) {
      // remove sprite
      document.querySelector(sprite).style.opacity = '0';
    }

    dispatch(setBattleSequence('inactive'));
  }

  // handle light and heavy attack sequences of enemy
  const handleEnemyAttack = async (announcement, type, enemyAttack, playerHealth) => {
    typeAnnouncement(`The Bringer of Death chose to ${announcement}!`);
    // animation delay 2s
    await wait(2000);

    if (type === 'light-attack') {
      animateSpriteAction('.enemy__sprite', 'walk');
      // animation delay 3s
      await wait(3000);
    }

    animateSpriteAction('.enemy__sprite', type, 500);

    if (type === 'light-attack') {
      // animation delay 2s
      await wait(2000);
    } else if (type === 'heavy-attack') {
      // animation delay 1s
      await wait(1000);
      await animateEnemySpell();
    }

    animateSpriteAction('.enemy__sprite', 'idle');

    if (roll(playerStatus.evasion)) {
      animateSpriteAction('.player__sprite', 'evade');
      // animation delay 1s
      await wait(1000);
      animateSpriteAction('.player__sprite', 'idle');

      typeAnnouncement(`The ${playerStatus.name} evaded the Bringer of Death's attack!`);
      // animation delay 3s
      await wait(3000);

      if (playerStatus.taunt > 0 && roll(playerStatus.taunt)) {
        typeAnnouncement(`The ${playerStatus.name} taunted the Bringer of Death!`);
        animateSpriteAction('.player__sprite', 'taunt');
        dispatch(decEnemyAccuracy());
        dispatch(setPlayerTaunt(0));
        // animation delay 2.5s
        await wait(2500);
      }

      endBattleSequence();
    } else {
      // calculate damage
      const damage = attack(enemyAttack, playerStatus);

      if (damage > 0) {
        animateSprite('.player__sprite', 'hurt');
        // calculate remaining health of player
        const health = playerHealth - damage;

        if (health > 0) {
          dispatch(setPlayerHealth(health));
          endBattleSequence();
        } else {
          dispatch(setPlayerHealth(0));
          handleDeath('.player__sprite', 2500);
        }
      } else {
        typeAnnouncement(`The Bringer of Death's attack failed.`);
        // animation delay 2s
        await wait(2000);
        endBattleSequence();
      }
    }
  }

  // handle healing sequence of enemy
  const handleEnemyHeal = async (enemyHealth) => {
    typeAnnouncement('The Bringer of Death chose to heal!');
    // animation delay 2s
    await wait(2000);

    animateSprite('.enemy__sprite', 'heal');
    // animation delay 0.5s
    await wait(500);

    // calculate healing received
    const healing = heal(enemyStatus.heal);

    if (healing > 0) {
      // calculate new health pool of enemy
      const health = enemyHealth + healing;

      if (health < enemyStatus.maxHealth) {
        dispatch(setEnemyHealth(health));
      } else {
        dispatch(setEnemyHealth(enemyStatus.maxHealth));
      }

      endBattleSequence();
    } else {
      typeAnnouncement(`The Bringer of Death's heal failed.`);
      // animation delay 2s
      await wait(2000);
      endBattleSequence();
    }
  }

  // handle action choice sequence of enemy
  const handleEnemyAction = (playerHealth = playerStatus.health, enemyHealth = enemyStatus.health) => {
    // declare action
    let enemyAction = '';

    if (enemyHealth === enemyStatus.maxHealth) {
      // set action choices for when full health
      enemyAction = enemyActionsNoHeal[genRanNum(enemyActions.length)];
    } else if (enemyHealth < enemyStatus.maxHealth) {
      // set action choices for when below max health
      enemyAction = enemyActions[genRanNum(enemyActions.length)];
    }

    if (enemyAction === 'light attack') {
      handleEnemyAttack(enemyAction, 'light-attack', enemyStatus.lightAttack, playerHealth);
    } else if (enemyAction === 'heavy attack') {
      handleEnemyAttack(enemyAction, 'heavy-attack', enemyStatus.heavyAttack, playerHealth);
    } else if (enemyAction === 'heal') {
      handleEnemyHeal(enemyHealth);
    }
  }

  // handle light and heavy attack sequences of player
  const handlePlayerAttack = async (announcement, type, playerAttack) => {
    startBattleSequence(announcement);
    // animation delay 2s
    await wait(2000);

    animateSpriteAction('.player__sprite', 'walk');
    // crit chance
    const crit = playerStatus.crit > 0 && roll(playerStatus.crit);

    if (crit) {
      typeAnnouncement(`The ${playerStatus.name} landed a critical hit!`);
      // animation delay 3s
      await wait(3000);
      animateSpriteAction('.player__sprite', 'critical-attack', 500);
    } else {
      // animation delay 3s
      await wait(3000);
      animateSpriteAction('.player__sprite', type, 500);
    }

    // animation delay 3s
    await wait(3000);
    animateSpriteAction('.player__sprite', 'idle');
      
    if (!crit && playerAttack.accuracy < 100 && roll(enemyStatus.evasion)) {
      animateSprite('.enemy__sprite', 'evade');
      typeAnnouncement(`The Bringer of Death evaded the ${playerStatus.name}'s attack!`);
      // animation delay 3s
      await wait(3000);
      handleEnemyAction();
    } else {
      // calculate damage
      const damage = crit ?
        critAttack(playerAttack, enemyStatus) : attack(playerAttack, enemyStatus);

      if (damage > 0) {
        animateSprite('.enemy__sprite', 'hurt');
        // calculate remaining health of enemy
        const health = enemyStatus.health - damage;

        if (health > 0) {
          dispatch(setEnemyHealth(health));
          handleEnemyAction(playerStatus.health, health);
        } else {
          dispatch(setEnemyHealth(0));
          handleDeath('.enemy__sprite', 1500);
        }
      } else {
        typeAnnouncement(`The ${playerStatus.name}'s attack failed.`);
        // animation delay 2s
        await wait(2000);
        handleEnemyAction();
      }
    }
  }

  // handle light attack sequence of player
  const handleLightAttack = () => {
    handlePlayerAttack('light attack', 'light-attack', playerStatus.lightAttack);
  }

  // handle heavy attack sequence of player
  const handleHeavyAttack = () => {
    handlePlayerAttack('heavy attack', 'heavy-attack', playerStatus.heavyAttack);
  }

  // handle healing sequence of player
  const handleHeal = async () => {
    startBattleSequence('heal');
    // animation delay 2s
    await wait(2000);

    animateSprite('.player__sprite', 'heal');
    // animation delay 0.5s
    await wait(500);

    // calculate healing received
    const healing = heal(playerStatus.heal);

    if (healing > 0) {
      // calculate new health pool of player
      const health = playerStatus.health + healing;

      if (health < playerStatus.maxHealth) {
        dispatch(setPlayerHealth(health));
        handleEnemyAction(health);
      } else {
        dispatch(setPlayerHealth(playerStatus.maxHealth));
        handleEnemyAction(playerStatus.maxHealth);
      }
    } else {
      typeAnnouncement(`The ${playerStatus.name}'s heal failed.`);
      // animation delay 2s
      await wait(2000);
      handleEnemyAction();
    }
  }

  // returns label for player action button
  const buttonLabel = (action, number, type, accuracy) => {
    return (
      <p>{action}<br /> <span className="dmg">
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
        {playerStatus.health < playerStatus.maxHealth && <Button
          label={buttonLabel(
            'Heal',
            playerStatus.heal.health,
            'Health',
            playerStatus.heal.accuracy
          )}
          callback={handleHeal}
        />}
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
