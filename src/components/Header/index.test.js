import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from 'store.js';
import { Header } from 'components';

beforeEach(() => {
  render(<Provider store={store}>
    <Header />
  </Provider>);
});

test('Header loads and displays without errors', () => {
  expect(screen.getAllByRole('listitem').length).toBe(3);
  screen.getAllByRole('listitem').forEach(item => {
    expect(item).toBeVisible();
  });

  expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Home');
  expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('Memory');
  expect(screen.getAllByRole('listitem')[2]).toHaveTextContent('Turn-Based');
  expect(screen.getByRole('heading')).toHaveTextContent('Gaming with JavaScript');
});

test('Header changes heading text on list item click', async () => {
  const user = userEvent.setup();

  await user.click(screen.getAllByRole('listitem')[1]);
  expect(screen.getByRole('heading')).toHaveTextContent('Memory Game');

  await user.click(screen.getAllByRole('listitem')[2]);
  expect(screen.getByRole('heading')).toHaveTextContent('Turn-Based Game');

  await user.click(screen.getAllByRole('listitem')[0]);
  expect(screen.getByRole('heading')).toHaveTextContent('Gaming with JavaScript');
});
