import React from 'react'
import { Link } from 'react-router-dom'
import { PokemonCard } from '../shared/PokemonCard'

export const PokemonList = ({ pokemons, onRemoveFavorite }) => {
   return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
         {pokemons.map(pokemon => {
            const pokemonId = pokemon.id || pokemon.url.split('/')[6]
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
            return (
               <li
                  key={pokemon.name}
                  className="border rounded-lg overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50"
               >
                  <Link to={`/pokemon/${pokemon.name}`}>
                     <PokemonCard
                        pokemon={pokemon}
                        imageUrl={imageUrl}
                        onRemoveFavorite={onRemoveFavorite}
                        imageClassName="flex justify-center items-center"
                        cardClassName="flex flex-col md:flex-col"
                     />
                  </Link>
               </li>
            )
         })}
      </ul>
   )
}
