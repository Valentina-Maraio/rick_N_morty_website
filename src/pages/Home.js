import React from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import { CharacterProvider } from "../context/CharacterContext";

const Home = () => {
  return (
    <>
      <CharacterProvider>
        <Search />
        <h1>Counter</h1>
        <Card/>
      </CharacterProvider>
    </>
  );
};

export default Home;
