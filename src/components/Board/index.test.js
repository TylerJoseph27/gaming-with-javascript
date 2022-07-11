import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'
import { store } from 'store.js';
import { Board } from 'components';

test('Board loads and displays without errors', () => {
  render(<Provider store={store}>
    <Board />
  </Provider>);

  expect(screen.getAllByRole('button').length).toBe(5);
  screen.getAllByRole('button').forEach(button => {
    expect(button).toBeVisible();
  });
  
  expect(screen.getAllByRole('img').length).toBe(2);
  screen.getAllByRole('img').forEach(img => {
    expect(img).toBeVisible();
  });
});

test('Board reset button does not throw errors', async () => {
  const mockResetBoard = jest.fn();
  const user = userEvent.setup();

  render(<Provider store={store}>
    <Board resetBoard={mockResetBoard} />
  </Provider>);

  await user.click(screen.getAllByRole('button')[0]);
  expect(mockResetBoard).toHaveBeenCalled();

  jest.restoreAllMocks();
});
