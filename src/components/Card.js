import React, { useContext } from "react";
import "../styles/card.css";
import notFav from "../assets/notFav.png";
import Favs from "../assets/Fav_counter.png";
import { CharacterContext } from "../context/CharacterContext";
import { Link } from "react-router-dom";

const Card = ({ character }) => {
  const { favorites, handleFavoriteClick } = useContext(CharacterContext);

  const handleFavoriteIconClick = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    handleFavoriteClick(character);
  };
  return (
    <>
      <div className="card">
        <Link
          to={`/details/${character.characterID}`}
          state={{ character }}
          className="card-link"
          key={character.id}
        >
          <img
            src={`${character.image}`}
            alt={character.name}
            className="card-image"
          />
          <div className="card-content">
            <div className="character_name">
              <h5>{character.name}</h5>
            </div>
            <div
              className="favs"
              onClick={handleFavoriteIconClick}
            >
              {favorites.some((fav) => fav.id === character.id) ? (
                <img src={Favs} alt="Fav_Icon" />
              ) : (
                <img src={notFav} alt="Not_Fav_Icon" />
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
