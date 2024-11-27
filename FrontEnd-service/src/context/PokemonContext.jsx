import React, { createContext, useState, useContext } from 'react'

const PokemonContext = createContext()

export const usePokemon = () => useContext(PokemonContext)

export const PokemonProvider = ({ children }) => {
   const [pokemons, setPokemons] = useState([])
   const [totalCount, setTotalCount] = useState(150) // Default set 150 Pokémon for external API

   return (
      <PokemonContext.Provider value={{ pokemons, setPokemons, totalCount, setTotalCount }}>
         {children}
      </PokemonContext.Provider>
   )
}
