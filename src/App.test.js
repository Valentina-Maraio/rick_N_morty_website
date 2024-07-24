import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { CharacterProvider } from './context/CharacterContext';
import '@testing-library/jest-dom/extend-expect'; 

test('handles asynchronous updates correctly', async () => {
  // Mock the fetch response
  fetch.mockResponseOnce(JSON.stringify({
    data: {
      results: [
        {
          id: 1,
          name: 'some async data',
          thumbnail: {
            path: 'path/to/image',
            extension: 'jpg'
          }
        }
      ]
    }
  }));
  

  render(
    <MemoryRouter>
      <CharacterProvider>
        <App />
      </CharacterProvider>
    </MemoryRouter>
  );

  // Wait for the async update to complete
  const dataElement = await screen.findByText(/some async data/i);

  // Assert that the data element is in the document
  expect(dataElement).toBeInTheDocument();
});
