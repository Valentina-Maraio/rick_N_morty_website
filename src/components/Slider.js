import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CharacterContext } from "../context/CharacterContext";
import "../styles/slider.css";

const Slider = () => {
  const location = useLocation();
  const character = location.state.character;
  const { characterComics, fetchCharacterComics } = useContext(CharacterContext);

  useEffect(() => {
    fetchCharacterComics(character.id);
  }, [character.id, fetchCharacterComics]);

  return (
    <>
      <div className="comic_container">
        <div className="comic">
          <h2>COMICS</h2>
        </div>
        <div id="slider_content">
          {characterComics.length > 0 ? (
            characterComics.map((comic) => {
              // Check if thumbnail exists
              const thumbnailUrl = comic.thumbnail 
                ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` 
                : 'default-thumbnail-url.jpg'; // Fallback to a default image

              return (
                <div className="slider_image_box" key={comic.id}>
                  <img
                    src={thumbnailUrl} // Use the comic's thumbnail URL
                    alt={comic.name} // Use the comic's name for the alt text
                    className="image_box"
                  />
                  <div className="comic_des">
                    <h4>{comic.title || comic.name}</h4> {/* Use title if available */}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No comics found.</p> // Fallback if no comics are available
          )}
        </div>
      </div>
    </>
  );
};

export default Slider;