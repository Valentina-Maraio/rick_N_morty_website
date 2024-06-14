import React, { useContext } from "react";
import { CharacterContext } from "../context/CharacterContext";
import Card from "./Card";
import '../styles/card.css'

const CardList = () => {
  const { characters, loading, error, searchTerm } =
    useContext(CharacterContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const searchTermString = searchTerm
    ? searchTerm.toString().toLowerCase()
    : "";

  const filteredCharacters = characters.filter((character) => {
    const characterNameString = character.name
      ? character.name.toString().toLowerCase()
      : "";
    return characterNameString.includes(searchTermString);
  });

  return (
    <>
      <div className="grid">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <Card key={character.id} character={character} />
          ))
        ) : (
          <div className="no-results">
            <p>No characters found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CardList;
