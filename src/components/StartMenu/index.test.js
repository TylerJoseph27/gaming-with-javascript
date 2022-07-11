import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'
import { store } from 'store.js';
import { StartMenu } from 'components';

beforeEach(() => {
  render(<Provider store={store}>
    <StartMenu />
  </Provider>);
});

test('StartMenu loads and displays without errors', () => {
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

test('StartMenu buttons do not throw errors when clicked', async () => {
  const user = userEvent.setup();

  await user.click(screen.getAllByRole('button')[0]);
  await user.click(screen.getAllByRole('button')[1]);
  await user.click(screen.getAllByRole('button')[2]);
});
