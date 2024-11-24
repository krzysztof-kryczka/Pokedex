import React from 'react'
import { Link } from 'react-router-dom'

export const PokemonList = ({ pokemons }) => {
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
                     <div className="p-4">
                        <img
                           src={imageUrl}
                           alt={pokemon.name}
                           className="mx-auto w-36 h-36 sm:w-48 sm:h-48 md:w-96 md:h-96 object-contain"
                        />
                        <h2 className="mt-4 text-lg sm:text-xl md:text-4xl font-bold text-center uppercase">
                           {pokemon.name}
                        </h2>
                        <div className="mt-4 text-center grid grid-cols-2 gap-4">
                           <div>
                              <p className="text-sm sm:text-base md:text-lg">{pokemon.height}</p>
                              <p className="text-sm sm:text-base md:text-lg font-bold">Height:</p>
                           </div>
                           <div>
                              <p className="text-sm sm:text-base md:text-lg">{pokemon.base_experience}</p>
                              <p className="text-sm sm:text-base md:text-lg font-bold">Base Exp:</p>
                           </div>
                           <div>
                              <p className="text-sm sm:text-base md:text-lg">{pokemon.weight}</p>
                              <p className="text-sm sm:text-base md:text-lg font-bold">Weight:</p>
                           </div>
                           <div>
                              <p className="text-sm sm:text-base md:text-lg">
                                 {pokemon.abilities?.map(ability => ability.ability.name).join(', ')}
                              </p>
                              <p className="text-sm sm:text-base md:text-lg font-bold">Ability:</p>
                           </div>
                        </div>
                     </div>
                  </Link>
               </li>
            )
         })}
      </ul>
   )
}
