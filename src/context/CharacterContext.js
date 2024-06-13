// CharacterContext.js
import React, { createContext, useState, useEffect } from "react";

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [characterDetails, setCharacterDetails] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://gateway.marvel.com/v1/public/characters?limit=50&ts=1&apikey=e8d433263a96a2011fb02a314bf9f618&hash=99375150951f8f7e28711e48dc3977be"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCharacters(data.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const fetchCharacterDetails = async (characterId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/comics/${characterId}/characters?limit=50&ts=1&apikey=e8d433263a96a2011fb02a314bf9f618&hash=99375150951f8f7e28711e48dc3977be`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Assuming data.data.results is an array with one character
      setCharacterDetails(data.data.results[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        characterDetails,
        fetchCharacterDetails,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
