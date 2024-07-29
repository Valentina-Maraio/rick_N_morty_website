import React, { useEffect, useContext} from "react";
import { useLocation } from "react-router-dom";
import { CharacterContext } from "../context/CharacterContext";
import Navbar from "../components/Navbar";
import DetailBanner from "../components/DetailBanner";
import Slider from "../components/Slider";

const Details = () => {
  const location = useLocation();
  const { selectedCharacter, episodes, loading, error, selectCharacter } = useContext(CharacterContext);

  // Get character from location state
  const character = location.state.character;

  useEffect(() => {
    if (character) {
      selectCharacter(character.id);
    }
  }, [character, selectCharacter]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedCharacter) return <div>No character selected</div>;

  return (
    <>
      <Navbar />
      <DetailBanner character={character} />
      <Slider episodes={episodes} characterImage={character.image}/>
    </>
  );
};

export default Details;
