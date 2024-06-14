import React from "react";
import { useLocation } from "react-router-dom";
import Favs from "../assets/Fav_counter.png";
import "../styles/detail_banner.css";
import "../styles/slider.css";

const DetailBanner = () => {
  const location = useLocation();
  const character = location.state.character;
  return (
    <>
      {character && (
        <>
          <div className="character_resume">
            <div className="character_resume_content">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.thumbnail.name}
              />
              <div className="character_info">
                <div className="character_details_name">
                  <h1>{character.name}</h1>
                  <div className="favs_details">
                    <img src={Favs} alt="Fav_Icon" />
                  </div>
                </div>
                <div className="row2">
                  {character.description ? (
                    <p>{character.description}</p>
                  ) : (
                    <p>This character does not have a description.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailBanner;
