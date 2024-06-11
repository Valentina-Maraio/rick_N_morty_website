import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import Marvel_Logo from "../assets/Marvel.svg";
import Favs from "../assets/Fav_counter.png";

const Navbar = () => {
  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img
              src={Marvel_Logo}
              alt="Marvel Logo"
              width="122.22"
              height="44"
            />
          </Link>
        </div>
        <div className="favorites">
          <Link to="/favorites">
            <img src={Favs} alt="Marvel Logo" />
            <span className="fav_counter">0</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
