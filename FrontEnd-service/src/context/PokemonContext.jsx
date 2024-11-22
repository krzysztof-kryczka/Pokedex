import React, { createContext, useState, useContext } from 'react'
const PokemonContext = createContext()

export const usePokemon = () => useContext(PokemonContext)

export const PokemonProvider = ({ children }) => {
   const [pokemons, setPokemons] = useState([])
   return <PokemonContext.Provider value={{ pokemons, setPokemons }}> {children} </PokemonContext.Provider>
}
