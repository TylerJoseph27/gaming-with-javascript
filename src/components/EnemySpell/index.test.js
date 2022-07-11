import { render, screen } from '@testing-library/react';
import { EnemySpell } from 'components';
import { bringerOfDeath } from 'assets';

test('EnemySpell loads and displays without errors', () => {
  render(<EnemySpell
    spriteAction={bringerOfDeath['spell']}
  />);

  expect(screen.getByRole('img')).toBeVisible();
});
