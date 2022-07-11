import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'components';

test('Button loads and displays without errors', () => {
  render(<Button label="test" />);

  expect(screen.getByRole('button')).toBeVisible();
  expect(screen.getByRole('button')).toHaveTextContent('test');
});

test('Button click calls function', async () => {
  const handleClick = jest.fn();
  const user = userEvent.setup();

  render(<Button label="test" callback={handleClick} />);

  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();

  jest.restoreAllMocks();
});
