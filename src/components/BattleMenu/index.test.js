import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'
import { store } from 'store.js';
import { BattleMenu, setEnemyStatus, setPlayerStatus } from 'components';
import * as helpers from 'helpers';

const mockTypeAnnouncement = jest.fn();

beforeEach(() => {
  // mock helper functions
  jest.spyOn(helpers, 'genRanNum').mockImplementation(() => 0);
  jest.spyOn(helpers, 'wait').mockImplementation(() => Promise.resolve());
  jest.spyOn(helpers, 'attack').mockImplementation(() => 20);
  jest.spyOn(helpers, 'critAttack').mockImplementation(() => 40);
  jest.spyOn(helpers, 'heal').mockImplementation(() => 10);
  jest.spyOn(helpers, 'roll').mockImplementation(() => false);

  // reset state
  store.dispatch(setEnemyStatus(helpers.enemyData));
  store.dispatch(setPlayerStatus({ ...helpers.playerData, taunt: 100, crit: 100 }));

  render(<Provider store={store}>
    <BattleMenu typeAnnouncement={mockTypeAnnouncement} />
  </Provider>);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('BattleMenu loads and displays without errors', () => {
  expect(screen.getAllByRole('button').length).toBe(4);
  screen.getAllByRole('button').forEach(button => {
    expect(button).toBeVisible();
  });

  expect(screen.getAllByRole('button')[0]).toHaveTextContent('Light Attack 10 Damage 80% Accurate');
  expect(screen.getAllByRole('button')[1]).toHaveTextContent('Heavy Attack 20 Damage 40% Accurate');
  expect(screen.getAllByRole('button')[2]).toHaveTextContent('Decrease Accuracy');
  expect(screen.getAllByRole('button')[3]).toHaveTextContent('Increase Accuracy');
});

test('BattleMenu increases and decreases player accuracy', async () => {
  const user = userEvent.setup();

  // inc accuracy
  await user.click(screen.getAllByRole('button')[3]);
  // dec accuracy
  await user.click(screen.getAllByRole('button')[2]);
});

test('BattleMenu handles light attack success and fail', async () => {
  const user = userEvent.setup();

  // player light attack then enemy light attack
  await user.click(screen.getAllByRole('button')[0]);

  // player and enemy light attack fail
  helpers.attack.mockImplementationOnce(() => 0)
    .mockImplementationOnce(() => 0);
  await user.click(screen.getAllByRole('button')[0]);

  expect(mockTypeAnnouncement).toHaveBeenCalled();
});

test('BattleMenu handles heavy attack success and fail', async () => {
  const user = userEvent.setup();

  // player heavy attack then enemy heavy attack
  await user.click(screen.getAllByRole('button')[1]);

  // player and enemy heavy attack fail
  helpers.attack.mockImplementationOnce(() => 0)
    .mockImplementationOnce(() => 0);
  helpers.genRanNum.mockImplementationOnce(() => 6);
  await user.click(screen.getAllByRole('button')[1]);

  expect(mockTypeAnnouncement).toHaveBeenCalled();
});

test('BattleMenu handles heal success and fail', async () => {
  const user = userEvent.setup();

  // lower character health to allow healing
  await user.click(screen.getAllByRole('button')[0]);

  // wait for healing button to render
  await waitFor(() => {
    expect(screen.getAllByRole('button').length).toBe(5);
  });

  expect(screen.getAllByRole('button')[2]).toHaveTextContent('Heal 15 Health 60% Accurate');

  // player and enemy heal fail
  helpers.heal.mockImplementationOnce(() => 0)
    .mockImplementationOnce(() => 0);
  helpers.genRanNum.mockImplementationOnce(() => 9);
  await user.click(screen.getAllByRole('button')[2]);

  // player heal then enemy heal
  helpers.genRanNum.mockImplementationOnce(() => 9);
  await user.click(screen.getAllByRole('button')[2]);

  // heal both characters to full health
  helpers.genRanNum.mockImplementationOnce(() => 9);
  await user.click(screen.getAllByRole('button')[2]);

  expect(mockTypeAnnouncement).toHaveBeenCalled();
});

test('BattleMenu handles evasion and taunt', async () => {
  const user = userEvent.setup();

  // prevent crit then ensure successful evades and taunt
  helpers.roll.mockImplementationOnce(() => false)
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => true);
  await user.click(screen.getAllByRole('button')[0]);

  expect(mockTypeAnnouncement).toHaveBeenCalled();
});

test('BattleMenu handles critical attack', async () => {
  const user = userEvent.setup();

  // ensure successful crit
  helpers.roll.mockImplementationOnce(() => true);
  await user.click(screen.getAllByRole('button')[0]);

  expect(mockTypeAnnouncement).toHaveBeenCalled();
});

test('BattleMenu handles death', async () => {
  const user = userEvent.setup();

  // enemy death
  helpers.attack.mockImplementationOnce(() => 100);
  await user.click(screen.getAllByRole('button')[0]);

  // player death
  helpers.attack.mockImplementationOnce(() => 0)
    .mockImplementationOnce(() => 100);
  await user.click(screen.getAllByRole('button')[0]);

  expect(mockTypeAnnouncement).toHaveBeenCalled();
});
