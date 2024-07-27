import React from "react";
import Search from "../components/Search";
import CardList from "../components/CardList";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Search />
      <CardList />
    </>
  );
};

export default Home;
