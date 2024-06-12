import React, { useContext } from "react";
import "../styles/esempio.css";
import Favs from '../assets/Fav_counter.png'
import { CharacterContext } from "../context/CharacterContext";

const Card = () => {
  const { characters, loading, error } = useContext(CharacterContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {" "}
      <div className="grid">
        {characters.map((character) => {
          const thumbnailUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;

          return (
            <>
              <div className="card" key={character.id}>
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
                {" "}
              </div>
            </>
          );
        })}{" "}
      </div>
    </>
  );
};

export default Card;
