import React from 'react'
import { PokemonActions } from './PokemonActions'

export const PokemonInfo = ({
   pokemon,
   isAuthenticated,
   toggleFavorite,
   isFavorite,
   toggleArena,
   isInArena,
   arenaSlots,
}) => (
   <div className="flex flex-col">
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-8 capitalize text-center">{pokemon.name}</h2>
      <div className="grid grid-cols-2 gap-10 text-center">
         <div>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-3 mt-3">{pokemon.height}</p>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 mt-3">Height</p>
         </div>
         <div>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-3 mt-3">{pokemon.base_experience}</p>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 mt-3">Base experience</p>
         </div>
         <div>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-3 mt-3">{pokemon.weight}</p>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 mt-3">Weight</p>
         </div>
         <div>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-3 mt-3">
               {pokemon.abilities && pokemon.abilities.length > 0 ? pokemon.abilities[0].ability.name : 'Brak danych'}
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 mt-3">Ability</p>
         </div>
      </div>
      {isAuthenticated && (
         <PokemonActions
            isAuthenticated={isAuthenticated}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            toggleArena={toggleArena}
            isInArena={isInArena}
            arenaSlots={arenaSlots}
         />
      )}
   </div>
)
