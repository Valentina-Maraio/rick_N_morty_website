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
  const [comics, setComics] = useState(loadFromLocalStorage("comics") || {});
  const [loading, setLoading] = useState(!localStorage.getItem("characters"));
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [characterDetails, setCharacterDetails] = useState(null);
  const [characterComics, setCharacterComics] = useState([]);
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

    const fetchComics = async () => {
      if (Object.keys(comics).length === 0) {
        try {
          const allComics = {};
          // Initiate the comics fetch for all characters
          await Promise.all(
            characters.map(async (character) => {
              const response = await api.get(
                `https://gateway.marvel.com/v1/public/characters/${character.id}/comics?ts=${ts}&apikey=${api_key}&hash=${api_key_hash}`
              );
              const fetchedComics = response.data.data.results;
              allComics[character.id] = fetchedComics;
            })
          );
          setComics(allComics);
          saveToLocalStorage("comics", allComics);
        } catch (error) {
          console.error("Error fetching comics:", error);
          setError("Failed to fetch comics.");
        }
      }
    };

    // Fetch characters first
    fetchCharacters().then(() => {
      // Fetch comics in the background
      setTimeout(fetchComics, 0);
    });
  }, [characters, api_key, api_key_hash, ts, comics]);

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
        fetchCharacterComics(characterId);
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
        setCharacterComics(data.data.results);
        setComics((prevComics) => ({
          ...prevComics,
          [characterId]: data.data.results,
        }));
        saveToLocalStorage("comics", {
          ...comics,
          [characterId]: data.data.results,
        });
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

  const handleCharacterSelect = async (characterId) => {
    await fetchCharacterDetails(characterId);
    // Fetch comics after details are fetched
    fetchCharacterComics(characterId);
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
        characterComics,
        fetchCharacterComics,
        handleCharacterSelect,
        favorites,
        addToFavorites,
        removeFromFavorites,
        handleFavoriteClick,
        favoritesCount,
        comics, // Provide comics data to context
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
