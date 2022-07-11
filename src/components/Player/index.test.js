import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from 'store.js';
import { Player } from 'components';

test('Player loads and displays without errors', () => {
  render(<Provider store={store}>
    <Player
      type="archer"
    />
  </Provider>);

  expect(screen.getByRole('img')).toBeVisible();
});
