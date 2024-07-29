// MockCharacterProvider.js
import React from 'react';
import { CharacterContext } from './context/CharacterContext';

const mockCharacters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    thumbnail: { path: 'path/to/image' },
  },
];

const MockCharacterProvider = ({ children }) => (
  <CharacterContext.Provider
    value={{
      characters: mockCharacters,
      loading: false,
      error: null,
      fetchCharacters: jest.fn(), // Mock function
    }}
  >
    {children}
  </CharacterContext.Provider>
);

export default MockCharacterProvider;