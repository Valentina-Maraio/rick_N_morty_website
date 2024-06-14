import React, { useContext } from "react";
import { CharacterContext } from "../context/CharacterContext";
import Card from "./Card";

const FavList = () => {
  const { favorites } = useContext(CharacterContext);

  return (
    <>
      <div className="grid">
        {favorites.length > 0 ? (
          favorites.map((character) => (
            <Card key={character.id} character={character} />
          ))
        ) : (
          <p>No favorite characters yet!</p>
        )}
      </div>
    </>
  );
};

export default FavList;
