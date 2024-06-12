import React, { useContext } from "react";
import "../styles/card.css";
import Favs from "../assets/Fav_counter.png";
import { CharacterContext } from "../context/CharacterContext";

const Card = () => {
  const { characters, loading, error, searchTerm } = useContext(CharacterContext);

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
      <div className="grid">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character, index) => {
            const thumbnailUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;

            return (
              <div className="card" key={character.index}>
                <div className="image-container">
                  <img src={thumbnailUrl} alt="Character Card" />
                  <div className="red-line"></div>
                </div>
                <div className="footer">
                  <div className="faves-container">
                    <div className="character_name">
                      <h5>{character.name}</h5>
                    </div>
                    <div className="favs">
                      <img src={Favs} alt="Fav_Icon" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <p>No characters found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
