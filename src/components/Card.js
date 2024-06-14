import React, { useContext, useState } from "react";
import "../styles/card.css";
import notFav from "../assets/notFav.png";
import Favs from "../assets/Fav_counter.png";
import { CharacterContext } from "../context/CharacterContext";
import { Link } from "react-router-dom";

const Card = ({ character }) => {
  const { favorites, handleFavoriteClick } = useContext(CharacterContext);

  console.log("This is the favorites from the context:  ", favorites);

  console.log("favorites updated?", favorites);

  return (
    <>
      {" "}
      <div className="grid">
        <div className="card" key={character.id}>
          <Link to={`/details/${character.characterID}`} state={{ character }}>
            <div className="image-container">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt="Character Card"
              />
              <div className="red-line"></div>
            </div>
          </Link>
          <div className="footer">
            <div className="faves-container">
              <div className="character_name">
                <h5>{character.name}</h5>
              </div>
              <div
                className="favs"
                onClick={() => handleFavoriteClick(character)}
              >
                {favorites.some((fav) => fav.id === character.id) ? (
                  <img src={Favs} alt="Fav_Icon" />
                ) : (
                  <img src={notFav} alt="Not_Fav_Icon" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
