import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'
import { store } from 'store.js';
import { TurnBasedGame, setPlayerCrit } from 'components';
import * as helpers from 'helpers';

beforeEach(() => {
  // mock helper functions
  jest.spyOn(helpers, 'genRanNum').mockImplementation(() => 0);
  jest.spyOn(helpers, 'wait').mockImplementation(() => Promise.resolve());
  jest.spyOn(helpers, 'attack').mockImplementation(() => 10);
  jest.spyOn(helpers, 'heal').mockImplementation(() => 20);
  jest.spyOn(helpers, 'roll').mockImplementation(() => false);

  // increase crit rate
  store.dispatch(setPlayerCrit(50));

  render(<Provider store={store}>
    <TurnBasedGame />
  </Provider>);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('TurnBasedGame loads and displays without errors', () => {
  expect(screen.getByRole('heading')).toHaveTextContent('Select Difficulty');
  expect(screen.getByRole('heading')).toBeVisible();
  expect(screen.getAllByRole('button')[0]).toHaveTextContent('Easy');
  expect(screen.getAllByRole('button')[1]).toHaveTextContent('Normal');
  expect(screen.getAllByRole('button')[2]).toHaveTextContent('Hard');

  expect(screen.getAllByRole('button').length).toBe(3);
  screen.getAllByRole('button').forEach(button => {
    expect(button).toBeVisible();
  });
});

test('TurnBasedGame changes difficulty', async () => {
  const user = userEvent.setup();

  // choose easy difficulty
  await user.click(screen.getAllByRole('button')[0]);
  
  expect(screen.getAllByRole('button').length).toBe(5);
  screen.getAllByRole('button').forEach(button => {
    expect(button).toBeVisible();
  });
  
  expect(screen.getAllByRole('img').length).toBe(3);
  screen.getAllByRole('img').forEach(img => {
    expect(img).toBeVisible();
  });

  // reset game
  await user.click(screen.getAllByRole('button')[0]);
  // choose normal difficulty
  await user.click(screen.getAllByRole('button')[1]);

  expect(screen.getAllByRole('button').length).toBe(5);
  screen.getAllByRole('button').forEach(button => {
    expect(button).toBeVisible();
  });
  
  expect(screen.getAllByRole('img').length).toBe(3);
  screen.getAllByRole('img').forEach(img => {
    expect(img).toBeVisible();
  });

  // reset game
  await user.click(screen.getAllByRole('button')[0]);
  // choose hard difficulty
  await user.click(screen.getAllByRole('button')[2]);

  expect(screen.getAllByRole('button').length).toBe(5);
  screen.getAllByRole('button').forEach(button => {
    expect(button).toBeVisible();
  });
  
  expect(screen.getAllByRole('img').length).toBe(3);
  screen.getAllByRole('img').forEach(img => {
    expect(img).toBeVisible();
  });
});

test('TurnBasedGame handles inc and dec accuracy', async () => {
  const user = userEvent.setup();

  // choose easy difficulty
  await user.click(screen.getAllByRole('button')[0]);
  expect(screen.getAllByRole('button')[1]).toHaveTextContent('Light Attack 10 Damage 80% Accurate');
  expect(screen.getAllByRole('button')[2]).toHaveTextContent('Heavy Attack 20 Damage 40% Accurate');

  // increase accuracy
  for (let i = 0; i < 7; i++) {
    await user.click(screen.getAllByRole('button')[4]);
  }
  expect(screen.getAllByRole('button')[1]).toHaveTextContent('Light Attack 10 Damage 100% Accurate');
  expect(screen.getAllByRole('button')[2]).toHaveTextContent('Heavy Attack 20 Damage 100% Accurate');

  // decrease accuracy
  for (let i = 0; i < 7; i++) {
    await user.click(screen.getAllByRole('button')[3]);
  }
  expect(screen.getAllByRole('button')[1]).toHaveTextContent('Light Attack 10 Damage 80% Accurate');
  expect(screen.getAllByRole('button')[2]).toHaveTextContent('Heavy Attack 20 Damage 40% Accurate');
});

test('TurnBasedGame handles attack and heal animations', async () => {
  const user = userEvent.setup();

  // choose easy difficulty
  await user.click(screen.getAllByRole('button')[0]);

  // light attack
  await user.click(screen.getAllByRole('button')[1]);
  // wait for battleSequence setTimeout
  await waitFor(() => {
    expect(screen.getAllByRole('button').length).toBe(6);
  });

  // heavy attack
  helpers.genRanNum.mockImplementationOnce(() => 6);
  await user.click(screen.getAllByRole('button')[2]);
  // wait for battleSequence setTimeout
  await waitFor(() => {
    expect(screen.getAllByRole('button').length).toBe(6);
  });

  // heal
  helpers.genRanNum.mockImplementationOnce(() => 9);
  await user.click(screen.getAllByRole('button')[3]);
  // wait for battleSequence setTimeout
  await waitFor(() => {
    expect(screen.getAllByRole('button').length).toBe(5);
  });
});

test('TurnBasedGame handles death animations', async () => {
  const user = userEvent.setup();

  // choose normal difficulty
  await user.click(screen.getAllByRole('button')[1]);

  // enemy death
  helpers.attack.mockImplementationOnce(() => 100);
  await user.click(screen.getAllByRole('button')[1]);
  // wait for battleSequence setTimeout
  await waitFor(() => {
    expect(screen.getAllByRole('button').length).toBe(1);
  });

  // reset game
  await user.click(screen.getAllByRole('button')[0]);
  // choose hard difficulty
  await user.click(screen.getAllByRole('button')[2]);

  // player death
  helpers.attack.mockImplementationOnce(() => 0)
    .mockImplementationOnce(() => 100);
  await user.click(screen.getAllByRole('button')[1]);
  // wait for battleSequence setTimeout
  await waitFor(() => {
    expect(screen.getAllByRole('button').length).toBe(1);
  });
});
