import React, { createContext, useState, useContext } from 'react'

const PokemonContext = createContext()

export const usePokemon = () => useContext(PokemonContext)

export const PokemonProvider = ({ children }) => {
   const [pokemons, setPokemons] = useState([])
   const [totalCount, setTotalCount] = useState(0)
   const [arena, setArena] = useState([])

   const updatePokemon = updatedPokemon => {
      setPokemons(prevPokemons =>
         prevPokemons.map(pokemon => (pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon)),
      )
   }

   return (
      <PokemonContext.Provider
         value={{ pokemons, setPokemons, totalCount, setTotalCount, arena, setArena, updatePokemon }}
      >
         {children}
      </PokemonContext.Provider>
   )
}
