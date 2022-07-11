import {
  genRanNum,
  genRanNumArr,
  zip,
  wait,
  typeMessage,
  probability,
  attack,
  critAttack,
  heal,
  roll
} from 'helpers';

test('genRanNum', () => {
  expect(genRanNum()).toBeGreaterThanOrEqual(0);
  expect(genRanNum()).toBeLessThan(1);
});

test('genRanNumArr', () => {
  expect(genRanNumArr().length).toBe(1);
  genRanNumArr().forEach(element => {
    expect(genRanNum()).toBeGreaterThanOrEqual(0);
    expect(element).toBeLessThan(1);
  });
});

test('zip', () => {
  expect(zip([1], [2], 'one', 'two').length).toBe(1);
  expect(zip([1], [2], 'one', 'two')).toStrictEqual([{ 'one': 1,'two': 2 }]);
});

test('wait', async () => {
  expect(await wait()).toBeDefined();
});

test('typeMessage', async () => {
  expect(await typeMessage()).toBeUndefined();
  expect(await typeMessage('test')).toBe('test');
});

test('probability', () => {
  expect(probability()).toBeFalsy();
  expect(probability(10)).toBeTruthy();
});

test('attack', () => {
  expect(attack()).toBe(0);
  expect(attack({ damage: 10, accuracy: 100 })).toBe(10);
});

test('critArrack', () => {
  expect(critAttack()).toBe(0);
  expect(critAttack({ damage: 10 })).toBe(20);
});

test('heal', () => {
  expect(heal()).toBe(0);
  expect(heal({ health: 15, accuracy: 100 })).toBe(15);
});

test('roll', () => {
  expect(roll()).toBeFalsy();
  expect(roll(100)).toBeTruthy();
});
