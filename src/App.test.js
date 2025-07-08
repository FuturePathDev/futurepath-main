import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FuturePath welcome message', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to FuturePath/i)).toBeInTheDocument();
});

