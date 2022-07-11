import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'
import { store } from 'store.js';
import { MemoryGame, setDisabled } from 'components';
import * as helpers from 'helpers';

const indices = [0, 1, 2, 3, 4, 5, 6, 7];
const order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

beforeEach(() => {
  jest.spyOn(helpers, 'genRanNum').mockImplementation(() => 0);
  jest.spyOn(helpers, 'genRanNumArr').mockImplementationOnce(() => [...indices])
    .mockImplementationOnce(() => [...order]);
  jest.spyOn(helpers, 'wait').mockImplementation(() => Promise.resolve());

  render(<Provider store={store}>
    <MemoryGame />
  </Provider>);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('MemoryGame loads and displays without errors', () => {
  const imgs = screen.getAllByRole('img');

  expect(screen.queryByRole('heading')).toBeNull();
  expect(store.getState().memoryGame.turnCount).toBe(0);
  imgs.forEach(img => {
    expect(img).toBeVisible();
  })

  for (let i = 1; i <= order.length; i++) {
    expect(screen.getByAltText(`Back of card ${i}`).parentElement).not.toHaveClass('memory-game__card--flipped');
  }
});

test('MemoryGame handles unmatched card flips', async () => {
  const user = userEvent.setup();

  await user.click(screen.getByAltText('Back of card 1'));
  await user.click(screen.getByAltText('Back of card 2'));

  expect(screen.getByAltText('Back of card 1').parentElement).not.toHaveClass('memory-game__card--flipped');
  expect(screen.getByAltText('Back of card 2').parentElement).not.toHaveClass('memory-game__card--flipped');
  expect(store.getState().memoryGame.turnCount).toBe(1);
});

test('MemoryGame handles matched card flips, victory, and board reset', async () => {
  const user = userEvent.setup();

  for (let i = 1; i <= indices.length; i++) {
    await user.click(screen.getByAltText(`Back of card ${i}`));
    await user.click(screen.getByAltText(`Back of card ${i + 8}`));
  }

  expect(screen.getByRole('heading')).toHaveTextContent('You Win!');
  expect(screen.getByRole('heading')).toBeVisible;
  expect(store.getState().memoryGame.turnCount).toBe(8);

  for (let i = 1; i <= order.length; i++) {
    expect(screen.getByAltText(`Back of card ${i}`).parentElement).toHaveClass('memory-game__card--flipped');
  }

  await user.click(screen.getByRole('button'));

  for (let i = 1; i <= order.length; i++) {
    expect(screen.getByAltText(`Back of card ${i}`).parentElement).not.toHaveClass('memory-game__card--flipped');
  }
});

test('MemoryGame handles card click on disabled board', async () => {
  const user = userEvent.setup();
  store.dispatch(setDisabled(true));
  await user.click(screen.getByAltText('Back of card 1'));
  expect(screen.getByAltText('Back of card 1').parentElement).not.toHaveClass('memory-game__card--flipped');
});
