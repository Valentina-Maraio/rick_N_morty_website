import React from "react";
import "../styles/slider.css";

const Slider = ({ episodes, characterImage }) => {
  const limitedEpisodes = episodes.slice(0, 20);

  return (
    <>
      <div className="comic_container">
        <div className="comic">
          <h2 className="episode-title">EPISODES</h2>
        </div>
        <div id="slider_content">
          {limitedEpisodes.length > 0 ? (
            limitedEpisodes.map((episode) => (
              <div className="slider_image_box" key={episode.id}>
                <img
                  src={characterImage}
                  alt={`Character in ${episode.name}`}
                  className="episode-character-image"
                />
                <div className="episode_box">
                  <h4>Episode {episode.id}</h4>
                  <p>{episode.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No episodes found.</p>
          )}
        </div>
      </div>
    </>

  );
};

export default Slider;