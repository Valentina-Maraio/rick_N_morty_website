import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import DetailBanner from "../components/DetailBanner";
import Slider from "../components/Slider";

const Details = () => {
  const location = useLocation();
  const character = location.state.character;

  return (
    <>
      <Navbar />
      <DetailBanner
      character={character}
      />
      <Slider/>
    </>
  );
};

export default Details;
