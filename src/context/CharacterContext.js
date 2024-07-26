import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import api from "../api";

export const CharacterContext = createContext();

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : [];
};

export const CharacterProvider = ({ children }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const api_key_hash = process.env.REACT_APP_HASH;
  const ts = process.env.REACT_APP_TS;

  const [characters, setCharacters] = useState(
    loadFromLocalStorage("characters") || []
  );
  const [loading, setLoading] = useState(!localStorage.getItem("characters"));
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [characterDetails, setCharacterDetails] = useState(null);
  const [characterComics, setCharacterComics] = useState(
    loadFromLocalStorage("characterComics") || []
  );
  const [favorites, setFavorites] = useState(
    loadFromLocalStorage("favorites") || []
  );

  const addToFavorites = useCallback(
    (character) => {
      const updatedFavorites = [...favorites, character];
      setFavorites(updatedFavorites);
      saveToLocalStorage("favorites", updatedFavorites);
    },
    [favorites]
  );

  const removeFromFavorites = useCallback(
    (characterId) => {
      const updatedFavorites = favorites.filter(
        (char) => char.id !== characterId
      );
      setFavorites(updatedFavorites);
      saveToLocalStorage("favorites", updatedFavorites);
    },
    [favorites]
  );

  const handleFavoriteClick = (character) => {
    if (favorites.some((fav) => fav.id === character.id)) {
      removeFromFavorites(character.id);
    } else {
      addToFavorites(character);
    }
  };

  const favoritesCount = useMemo(() => favorites.length, [favorites]);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (characters.length === 0) {
        setLoading(true);
        try {
          const response = await api.get(
            `https://gateway.marvel.com/v1/public/characters?limit=50&ts=${ts}&apikey=${api_key}&hash=${api_key_hash}`
          );
          const fetchedCharacters = response.data.data.results;
          setCharacters(fetchedCharacters);
          saveToLocalStorage("characters", fetchedCharacters);
        } catch (error) {
          console.error("Error fetching characters:", error);
          setError("Failed to fetch characters.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCharacters();
  }, [characters.length, api_key, api_key_hash, ts]);

  const fetchCharacterDetails = async (characterId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${api_key}&hash=${api_key_hash}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch character details.");
      }
      const data = await response.json();
      if (data.data && data.data.results.length > 0) {
        setCharacterDetails(data.data.results[0]);
      } else {
        setCharacterDetails(null);
      }
    } catch (error) {
      console.error("Error fetching character details:", error);
      setError("Failed to load character details.");
    } finally {
      setLoading(false);
    }
  };

  // New function to fetch character's comics
  const fetchCharacterComics = async (characterId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${ts}&apikey=${api_key}&hash=${api_key_hash}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch character comics.");
      }
      const data = await response.json();
      if (data.data && data.data.results.length > 0) {
        setCharacterComics(data.data.results); // Set the comics data
        saveToLocalStorage("characterComics", data.data.results); // Save the data in localStorage
      } else {
        setCharacterComics([]);
      }
    } catch (error) {
      console.error("Error fetching character comics:", error);
      setError("Failed to load character comics.");
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
        characterComics, // Expose comics data
        fetchCharacterComics, // Expose fetch function
        favorites,
        addToFavorites,
        removeFromFavorites,
        handleFavoriteClick,
        favoritesCount,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};