import React, { useContext } from "react";
import { CharacterContext } from "../context/CharacterContext";
import Card from "./Card";

const FavList = () => {
  const { favorites, loading, error, searchTerm } = useContext(CharacterContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const searchTermString = searchTerm
    ? searchTerm.toString().toLowerCase()
    : "";

  const filteredFavsCharacters = favorites.filter((character) => {
    const characterNameString = character.name
      ? character.name.toString().toLowerCase()
      : "";
    return characterNameString.includes(searchTermString);
  });

  return (
    <>
      <>
        {filteredFavsCharacters.length > 0 ? (
          filteredFavsCharacters.map((character) => (
            <Card key={character.id} character={character} />
          ))
        ) : (
          <p>No favorite characters yet!</p>
        )}
      </>
    </>
  );
};

export default FavList;
