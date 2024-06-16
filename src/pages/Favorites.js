import React, { useContext } from 'react'
import Navbar from '../components/Navbar';
import Search from '../components/Search'
import FavList from '../components/FavList';
import { CharacterContext } from '../context/CharacterContext';

const Favorites = () => {
  const { favorites } = useContext(CharacterContext);

  return (
    <>
    <Navbar/>
    <Search favorites={favorites}/>
    <FavList/>
    </>
  )
}

export default Favorites