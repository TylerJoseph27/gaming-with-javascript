import { render, screen } from '@testing-library/react';
import { HomeScreen } from 'components';

test('HomeScreen loads and displays without errors', () => {
  render(<HomeScreen />);

  expect(screen.getByRole('heading')).toHaveTextContent('Welcome to Gaming with JavaScript');
  expect(screen.getByRole('heading')).toBeVisible();

  expect(screen.getAllByRole('link').length).toBe(9);
  screen.getAllByRole('link').forEach(link => {
    expect(link).toBeVisible();
  });
});
