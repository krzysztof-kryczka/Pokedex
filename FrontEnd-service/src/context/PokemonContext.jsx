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

   const addPokemon = newPokemon => {
      setPokemons(prevPokemons => [newPokemon, ...prevPokemons])
      setTotalCount(prevCount => prevCount + 1)
   }

   return (
      <PokemonContext.Provider
         value={{ pokemons, setPokemons, totalCount, setTotalCount, arena, setArena, updatePokemon, addPokemon }}
      >
         {children}
      </PokemonContext.Provider>
   )
}
