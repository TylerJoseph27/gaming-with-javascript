import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'
import { store } from 'store.js';
import { MemoryCard } from 'components';

test('MemoryCard loads and displays without errors', () => {
  render(<Provider store={store}>
    <MemoryCard
      index={0}
      order={0}
      matched={false}
    />
  </Provider>);

  expect(screen.getByAltText('Front of card 1')).toBeVisible();
  expect(screen.getByAltText('Back of card 1')).toBeVisible();
});

test('MemoryCard flips when clicked', async () => {
  const user = userEvent.setup();

  render(<Provider store={store}>
    <MemoryCard
      index={0}
      order={0}
      matched={false}
    />
    <MemoryCard
      index={0}
      order={1}
      matched={false}
    />
  </Provider>);

  expect(screen.getByAltText('Back of card 1').parentElement).not.toHaveClass('memory-game__card--flipped');
  expect(screen.getByAltText('Back of card 2').parentElement).not.toHaveClass('memory-game__card--flipped');

  await user.click(screen.getByAltText('Back of card 1'));
  await user.click(screen.getByAltText('Back of card 2'));

  expect(screen.getByAltText('Back of card 1').parentElement).toHaveClass('memory-game__card--flipped');
  expect(screen.getByAltText('Back of card 2').parentElement).toHaveClass('memory-game__card--flipped');
});
