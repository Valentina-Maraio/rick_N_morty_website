import React from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import { CharacterProvider } from "../context/CharacterContext";

const Home = () => {
  return (
    <>
      <CharacterProvider>
        <Search />
        <Card />
      </CharacterProvider>
    </>
  );
};

export default Home;
