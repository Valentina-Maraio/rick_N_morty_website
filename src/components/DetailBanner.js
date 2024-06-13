import React from "react";
import { useLocation } from "react-router-dom";
import Favs from "../assets/Fav_counter.png";
import "../styles/detail_banner.css";
import "../styles/comic_carousel.css";

const DetailBanner = () => {
  const location = useLocation();
  const character = location.state.character;
  const selectedComics = character.comics.items.slice(0, 10);
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
                  <div className="favs">
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

      <div>
        <h2>Comics: {character.comics.available}</h2>
        <div>
          <div className="comics">
            {selectedComics.map((comic) => {
              return (
                <>
                  <div className="slider_wrapper">
                    <div className="image_list">
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.thumbnail.name}
                      />
                      <div className="comic_details">
                        <h6>{character.name}</h6>
                        <p>
                          {comic.name.match(/\((\d+)\)/)
                            ? comic.name.match(/\((\d+)\)/)[1]
                            : "Unknown"}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailBanner;
