import React from "react";
import CardList from "../components/CardList";
import Navbar from "../components/Navbar";
import Search from '../components/Search'
import '../styles/card_grid.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <Search/>
      <div className="container">
        <div className="grid">
          <CardList />
        </div>
      </div>
    </>
  );
};

export default Home;
