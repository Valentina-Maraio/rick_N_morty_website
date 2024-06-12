import React, { useContext } from "react";
import "../styles/search_bar.css";
import { CharacterContext } from "../context/CharacterContext";

const Search = () => {
  const { searchTerm, setSearchTerm } = useContext(CharacterContext);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

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
        <p>Counter</p>
      </div>
    </>
  );
};

export default Search;
