/* function that calculates and returns one random
number based on a minimum and maximum number */
export const genRanNum = (max = 1, min = 0) => {
  return Math.floor(Math.random() * (max + min));
};

/* function that calculates and returns an array of
random numbers based on a minimum and maximum number 
with a user defined size and no repeating numbers*/
export const genRanNumArr = (size = 1, max = 1, min = 0) => {
  const arr = [];

  while(arr.length < size) {
    let current = genRanNum(max, min);
    if(arr.indexOf(current) === -1) {
       arr.push(current);
    }
  }

  return arr;
};

/* function to combine arrays with map method */
export const arrZip = (arr1, arr2) => {
  return arr1.map((element, index) => [element, arr2[index]]);
};

/* function to combine arrays into one array of objects with map method */
export const objZip = (arr1, arr2, label1, label2) => {
  return arr1.map((element, index) => ({
    [label1]: element,
    [label2]: arr2[index]
  }));
};

/* function to return resolved promise after a set amount of time */
export const wait = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/* function to display a message as if it is being typed */
export const typeMessage = async (message = '', callback, displayMessage = () => {}, ms = 25) => {
  if (message.length) {
    let visibleMessage = ''
    for (let i = 0; i < message.length; i++) {
      await wait(ms);
      visibleMessage = visibleMessage + message[i];
      displayMessage(callback(visibleMessage));
    }
  }
}

/* player data object */
export const playerData = {
  name: '',
  action: 'idle',
  playState: 'paused',
  lightAttack: {
    damage: 10,
    accuracy: 80,
    count: 0
  },
  heavyAttack: {
    damage: 20,
    accuracy: 40,
    count: 0
  },
  heal: {
    health: 15,
    accuracy: 60,
    count: 0
  },
  health: 100,
  maxHealth: 100,
  magic: {
    amount: 10,
    count: 10
  },
  maxMagic: 10,
  resistance: 0
};

/* enemy data object */
export const enemyData = {
  action: 'idle',
  playState: 'paused',
  lightAttack: {
    damage: 10,
    accuracy: 80
  },
  heavyAttack: {
    damage: 20,
    accuracy: 40
  },
  heal: {
    health: 15,
    accuracy: 60
  },
  health: 100,
  maxHealth: 100,
  resistance: 0
};

/* array to simulate probability of enemy performing certain actions */
export const enemyActions = [
  'light-attack',
  'light-attack',
  'light-attack',
  'light-attack',
  'light-attack',
  'heavy-attack',
  'heavy-attack',
  'heavy-attack',
  'heal',
  'heal'
];

/* array to simulate probability of enemy performing certain actions */
export const enemyActionsNoHeal = [
  'light-attack',
  'light-attack',
  'light-attack',
  'light-attack',
  'light-attack',
  'light-attack',
  'heavy-attack',
  'heavy-attack',
  'heavy-attack',
  'heavy-attack'
];

/* function to simulate the chance of an event happening */
export const probability = (chance = 0) => {
  const arr = Array(10).fill(false);

  for (let i = 0; i < chance && chance <= arr.length; i++) {
    arr[i] = true;
  }

  return arr[genRanNum(arr.length)];
}

/* function to return damage of an attack */
export const attack = (attacker = { damage: 0, accuracy: 0 }, defender = { resistance: 0 }) => {
  if (probability(attacker.accuracy / 10)) {
    const damage = attacker.damage - (attacker.damage * (defender.resistance / 100));
    return damage
  } else {
    return 0;
  }
};

/* function to return health restored by a heal */
export const heal = (healer = { health: 0, accuracy: 0 }) => {
  if (probability(healer.accuracy / 10)) {
    return healer.health;
  } else {
    return 0;
  }
};
