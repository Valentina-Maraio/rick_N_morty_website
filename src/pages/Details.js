import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import DetailBanner from "../components/DetailBanner";

const Details = () => {
  const location = useLocation();
  const character = location.state.character;

  return (
    <>
      <Navbar />
      <DetailBanner
      character={character}
      />
    </>
  );
};

export default Details;
