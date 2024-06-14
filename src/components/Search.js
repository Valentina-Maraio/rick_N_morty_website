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
    return characters.filter(char => 
      char.name.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm, characters]);

  // Calculate current character count based on filtered characters
  const currentCharacterCount = useMemo(() => {
    return filteredCharacters.length;
  }, [filteredCharacters]);

  return (
    <>
      <div className="search_wrapper">
        <div className="input_container">
          <input
            className="input_field"
            placeholder="SEARCH A CHARACTER..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <p>{currentCharacterCount} RESULTS</p>
      </div>
    </>
  );
};

export default Search;
