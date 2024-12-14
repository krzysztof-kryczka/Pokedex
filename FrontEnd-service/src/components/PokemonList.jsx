import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { PokemonCard } from '../shared/PokemonCard'
import clsx from 'clsx'
import { ThemeContext } from '../context/ThemeContext'

export const PokemonList = ({ pokemons }) => {
   const { theme } = useContext(ThemeContext)
   return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 pb-4">
         {pokemons.map(pokemon => {
            const imageUrl = pokemon.sprites?.other.dream_world.front_default || pokemon.sprite
            return (
               <li
                  key={pokemon.name}
                  className={clsx(
                     'rounded-3xl  shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer',
                     theme === 'dark'
                        ? 'border-gray-500 bg-dark-background'
                        : 'bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50',
                  )}
               >
                  <Link to={`/pokemon/${pokemon.name}`}>
                     <PokemonCard
                        pokemon={pokemon}
                        imageUrl={imageUrl}
                        imageClassName="flex justify-center items-center"
                        cardClassName="flex flex-col md:flex-col justify-around"
                        showActions={false}
                     />
                  </Link>
               </li>
            )
         })}
      </ul>
   )
}
