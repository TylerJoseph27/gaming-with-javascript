import { render, screen } from '@testing-library/react';
import { Bar } from 'components';

test('Bar loads and displays without errors', () => {
  render(<Bar 
    name="test"
    value={100}
    maxValue={100}
  />);

  expect(screen.getByTestId('health-bar')).toBeVisible();
});
