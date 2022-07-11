import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from 'store.js';
import { App } from 'components';

beforeEach(() => {
  render(<Provider store={store}>
    <App />
  </Provider>);
});

test('App loads and displays without errors', () => {
  expect(screen.getAllByRole('listitem').length).toBe(3);
  screen.getAllByRole('listitem').forEach(item => {
    expect(item).toBeVisible();
  })

  expect(screen.getAllByRole('heading').length).toBe(2);
  expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Gaming with JavaScript');
  expect(screen.getAllByRole('heading')[1]).toHaveTextContent('Welcome to Gaming with JavaScript');
  screen.getAllByRole('heading').forEach(heading => {
    expect(heading).toBeVisible();
  });

  expect(screen.getAllByRole('link').length).toBe(18);
  screen.getAllByRole('link').forEach(link => {
    expect(link).toBeVisible();
  });
});

test('App navigates to different games', async () => {
  const user = userEvent.setup();

  // navigate to memory game
  await user.click(screen.getAllByRole('listitem')[1]);

  screen.debug();

  expect(screen.getByRole('heading')).toHaveTextContent('Memory Game');
  expect(screen.getByRole('heading')).toBeVisible();

  // navigate to turn-based game
  await user.click(screen.getAllByRole('listitem')[2]);

  expect(screen.getAllByRole('heading').length).toBe(2);
  expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Turn-Based Game');
  expect(screen.getAllByRole('heading')[1]).toHaveTextContent('Select Difficulty');
  screen.getAllByRole('heading').forEach(heading => {
    expect(heading).toBeVisible();
  });
});
