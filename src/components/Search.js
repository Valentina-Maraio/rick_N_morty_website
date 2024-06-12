import React from 'react'
import '../styles/search_bar.css';
import input_logo from '../assets/Input_empty.png'

const Search = () => {
  return (
    <>
    <div className="input_container">
      <input className="input_field" placeholder='SEARCH A CHARACTER...'/>
    </div>
    </>
  )
}

export default Search;