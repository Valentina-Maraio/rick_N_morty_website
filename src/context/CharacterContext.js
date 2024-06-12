import React, { createContext, useState, useEffect } from "react";

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let dataFromStorage = localStorage.getItem("charactersData");
        let storedTimestamp = localStorage.getItem("charactersTimestamp");

        // If there is stored data and it's within 24 hours, use it
        if (dataFromStorage && storedTimestamp) {
          const currentTime = new Date().getTime();
          const storedTime = new Date(storedTimestamp).getTime();
          const hoursDifference = (currentTime - storedTime) / (1000 * 60 * 60);

          if (hoursDifference < 24) {
            setCharacters(JSON.parse(dataFromStorage));
            setLoading(false);
            return;
          }
        }

        // Make the API call
        const response = await fetch(
          "https://gateway.marvel.com/v1/public/characters?limit=50&ts=1&apikey=e8d433263a96a2011fb02a314bf9f618&hash=99375150951f8f7e28711e48dc3977be"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Store data in local storage
        localStorage.setItem(
          "charactersData",
          JSON.stringify(data.data.results)
        );
        localStorage.setItem("charactersTimestamp", new Date().toISOString());

        setCharacters(data.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <CharacterContext.Provider value={{ characters, loading, error, searchTerm, setSearchTerm }}>
      {children}
    </CharacterContext.Provider>
  );
};
