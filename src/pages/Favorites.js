import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import FavList from "../components/FavList";
import { CharacterContext } from "../context/CharacterContext";
import '../styles/card_grid.css'


const Favorites = () => {
  const { favorites } = useContext(CharacterContext);

  return (
    <>
      <Navbar />
      <Search favorites={favorites} />
      <div className="container">
        <div className="grid">
          <FavList />
        </div>
      </div>
    </>
  );
};

export default Favorites;
