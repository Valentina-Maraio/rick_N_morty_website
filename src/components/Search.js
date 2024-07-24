import React, { useContext, useMemo } from "react";
import "../styles/search_bar.css";
import { CharacterContext } from "../context/CharacterContext";

const Search = () => {
  const { searchTerm, setSearchTerm, characters } = useContext(CharacterContext);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtered characters based on searchTerm
  const filteredCharacters = useMemo(() => {
    if (!searchTerm.trim()) return characters;

    const searchTermLower = searchTerm.toLowerCase().trim();
    return characters.filter((char) =>
      char.name.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm, characters]);

  // Calculate current character count based on filtered characters
  const currentCharacterCount = useMemo(() => {
    const newFilter = filteredCharacters.length;
    return newFilter;
  }, [filteredCharacters]);

  return (
    <>
      <div className="search_wrapper">
        <div className="input_container">
          <input
            className="input_container"
            placeholder="SEARCH A CHARACTER..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="result-text">
          <h2>{currentCharacterCount} RESULTS</h2>
        </div>
      </div>
    </>
  );
};

export default Search;
