import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store.js';
import { Enemy } from 'components';
import { bringerOfDeath } from 'assets';

test('Enemy loads and displays without errors', () => {
  render(<Provider store={store}>
    <Enemy
      spriteActions={bringerOfDeath}
    />
  </Provider>);

  expect(screen.getByRole('img')).toBeVisible();
});
