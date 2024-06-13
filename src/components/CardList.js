import React, { useContext } from "react";
import { CharacterContext } from "../context/CharacterContext";
import Card from "./Card";

const CardList = () => {
  const { characters, loading, error, searchTerm } =
    useContext(CharacterContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Ensure searchTerm is a string
  const searchTermString = searchTerm
    ? searchTerm.toString().toLowerCase()
    : "";

  const filteredCharacters = characters.filter((character) => {
    // Ensure character.name is a string
    const characterNameString = character.name
      ? character.name.toString().toLowerCase()
      : "";
    return characterNameString.includes(searchTermString);
  });
  return (
    <>
      <Card
        name={filteredCharacters.name}
        characterID={filteredCharacters.characterID}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
      />
    </>
  );
};

export default CardList;
