import { render, screen } from '@testing-library/react';
import { Footer } from 'components';

test('Footer loads and displays without errors', () => {
  render(<Footer />);

  expect(screen.getByRole('contentinfo')).toBeVisible();

  expect(screen.getAllByRole('link').length).toBe(9);
  screen.getAllByRole('link').forEach(link => {
    expect(link).toBeVisible();
  });

  expect(screen.getAllByRole('img').length).toBe(3);
  screen.getAllByRole('img').forEach(img => {
    expect(img).toBeVisible();
  });
});
