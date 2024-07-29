import React from "react";
import { useLocation } from "react-router-dom";
import Favs from "../assets/Fav_counter.png";
import "../styles/detail_banner.css";
//import "../styles/slider.css";

const DetailBanner = () => {
  const location = useLocation();
  const character = location.state.character;
  return (
    <>
      {character && (
        <>
        <div className="character">
          <div className="character_foto">
            <img
            className="thumbnail"
              src={`${character.image}`}
              alt={character.name}
            />
          </div>

          <div className="responsive_info">
            <div className="character_info">
              <div className="character_name">
                <h1>{character.name}</h1>
              </div>
              <div className="character_fav_icon">
                <img src={Favs} alt="Fav_Icon" />
              </div>
            </div>

            <div className="character_description">
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              <p>Origin: {character.origin.name}</p>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default DetailBanner;
