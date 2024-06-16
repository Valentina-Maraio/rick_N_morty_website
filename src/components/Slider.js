import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/slider.css";

const Slider = () => {
  const location = useLocation();
  const character = location.state.character;
  const selectedComics = character.comics.items.slice(0, 10);

  return (
    <>
      <div className="comic_container">
        <div className="comic">
          <h2>COMICS
          </h2>
        </div>
        <div id="slider_content">
          {selectedComics.map((comic) => {
            return (
              <>
                <div className="slider_image_box" key={comic.id}>
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.thumbnail.name}
                    className="image_box"
                  />
                  <div className="comic_des">
                    <h4>{character.name}</h4>
                    <p>
                      {comic.name.match(/\((\d+)\)/)
                        ? comic.name.match(/\((\d+)\)/)[1]
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Slider;
