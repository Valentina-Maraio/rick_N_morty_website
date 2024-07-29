import React, { useContext, memo } from 'react';
import { CharacterContext } from '../context/CharacterContext';
import Card from './Card';

const CardList = memo(() => {
  const { characters, loading, error, searchTerm, characterComics } = useContext(CharacterContext);
  console.log("comics:", characterComics)
  console.log("characters:" , characters)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const searchTermString = searchTerm ? searchTerm.toString().toLowerCase() : '';

  const filteredCharacters = characters.filter((character) => {
    const characterNameString = character.name ? character.name.toString().toLowerCase() : '';
    return characterNameString.includes(searchTermString);
  });

  return (
    <>
      {filteredCharacters.length > 0 ? (
        filteredCharacters.map((character) => (
          <Card key={character.id} character={character} />
        ))
      ) : (
        <div className="no-results">
          <p>No characters found for "{searchTerm}"</p>
        </div>
      )}
    </>
  );
});

export default CardList;
