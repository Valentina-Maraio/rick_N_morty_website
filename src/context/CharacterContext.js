import React, { createContext, useState, useEffect } from 'react';

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                //const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${process.env.TS_VALUE}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}&hash=${process.env.REACT_APP_MARVEL_API_HASH}`);
                const response = await fetch('https://gateway.marvel.com/v1/public/characters?nameStartsWith=Spider&ts=1&apikey=e8d433263a96a2011fb02a314bf9f618&hash=99375150951f8f7e28711e48dc3977be');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCharacters(data.data.results);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    return (
        <CharacterContext.Provider value={{ characters, loading, error }}>
            {children}
        </CharacterContext.Provider>
    );
};