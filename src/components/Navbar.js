import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";
import Marvel_Logo from "../assets/Marvel.svg";
import Favs from "../assets/Fav_counter.png";
import { CharacterContext } from "../context/CharacterContext";

const Navbar = () => {
  const { favoritesCount } = useContext(CharacterContext);
  const location = useLocation();

  return (
    <div className="header">
      <div className="marvel_logo">
        <Link to="/" key={location.pathname}>
          <img src={Marvel_Logo} alt="Marvel Logo" />
        </Link>
      </div>
      <div className="favorites">
        <Link to="/favorites">
          <img src={Favs} alt="Favorites" />
          <span className="fav_counter">{favoritesCount}</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

