import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

export const CharacterContext = createContext();

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : [];
};

export const CharacterProvider = ({ children }) => {

  const [characters, setCharacters] = useState(
    loadFromLocalStorage("characters") || []
  );
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(!localStorage.getItem("characters"));
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      const fetchedCharacters = data.results;
      setCharacters(fetchedCharacters);
      saveToLocalStorage("characters", fetchedCharacters);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setError("Failed to fetch characters.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEpisodes = useCallback(async (episodeUrls) => {
    try {
      const episodePromises = episodeUrls.map((url) =>
        fetch(url).then((res) => res.json())
      );
      const episodesData = await Promise.all(episodePromises);
      setEpisodes(episodesData);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      setError("Failed to fetch episodes.");
    }
  }, []);

  const selectCharacter = useCallback(async (characterId) => {
    setLoading(true);
    try {
      const character = characters.find(char => char.id === characterId);
      if (character) {
        setSelectedCharacter(character);
        await fetchEpisodes(character.episode);
      } else {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
        const data = await response.json();
        setSelectedCharacter(data);
        await fetchEpisodes(data.episode);
      }
    } catch (error) {
      console.error("Error selecting character:", error);
      setError("Failed to select character.");
    } finally {
      setLoading(false);
    }
  }, [characters, fetchEpisodes]);

  useEffect(() => {
    saveToLocalStorage("favorites", favorites);
  }, [favorites]);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        selectedCharacter,
        episodes,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        fetchCharacters,
        fetchEpisodes,
        favorites,
        addToFavorites,
        removeFromFavorites,
        handleFavoriteClick,
        favoritesCount,
        selectCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};