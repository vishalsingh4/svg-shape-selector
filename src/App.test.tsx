import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Implementation link', () => {
  render(<App />);
  const linkElement = screen.getByText(/implementation/i);
  expect(linkElement).toBeInTheDocument();
});
