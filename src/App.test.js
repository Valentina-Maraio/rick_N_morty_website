import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import MockCharacterProvider from './MockCharacterProvider'; // Import the mock provider
import '@testing-library/jest-dom';

test('renders characters from context', async () => {
  render(
    <MemoryRouter>
      <MockCharacterProvider>
        <App />
      </MockCharacterProvider>
    </MemoryRouter>
  );

  // Check for initial loading state (if applicable)
  // expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Uncomment if your component shows a loading state

  // Wait for the character to be rendered
  await waitFor(() => {
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });
});