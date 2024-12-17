import React from 'react'
import { Link } from 'react-router-dom'
import { PokemonCard } from './shared/PokemonCard'

export const PokemonList = ({ pokemons }) => (
   <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
      {pokemons.map(pokemon => {
         const imageUrl = pokemon.sprites?.other.dream_world.front_default || pokemon.sprite
         return (
            <li
               key={pokemon.id}
               className="rounded-3xl border shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer
                     bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50
                        dark:border-dark-border dark:bg-dark-background dark:bg-none"
            >
               <Link to={`/pokemon/${pokemon.id}`}>
                  <PokemonCard
                     pokemon={pokemon}
                     imageUrl={imageUrl}
                     imageClassName="flex justify-center items-center"
                     cardClassName="flex flex-col md:flex-col border-0"
                     showActions={false}
                  />
               </Link>
            </li>
         )
      })}
   </ul>
)
