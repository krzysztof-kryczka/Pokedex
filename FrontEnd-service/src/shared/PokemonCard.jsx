import React from 'react'
import clsx from 'clsx'
import { PokemonImage } from './PokemonImage'
import { PokemonInfo } from './PokemonInfo'

export const PokemonCard = ({
   pokemon,
   imageUrl,
   cardClassName,
   imageClassName,
   isAuthenticated,
   toggleFavorite,
   isFavorite,
   toggleArena,
   isInArena,
   showActions,
   showFavorite = true,
   arenaSlots,
}) => (
   <div className="relative p4">
      {true && (
         <div className="absolute top-0 left-0 bg-black text-white p-5 rounded-tl-2xl rounded-br-2xl shadow-lg">
            <div className="flex flex-col items-start space-y-1 font-mono font-bold">
               <p className="text-lg">W: {pokemon.wins || 0}</p> <p className="text-lg">L: {pokemon.losses || 0}</p>
            </div>
         </div>
      )}
      <div
         className={clsx(
            'overflow-hidden shadow-lg p-4 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 flex flex-col md:flex-row justify-evenly',
            cardClassName,
         )}
      >
         <PokemonImage imageUrl={imageUrl} imageClassName={imageClassName} pokemonName={pokemon.name} />
         <PokemonInfo
            pokemon={pokemon}
            isAuthenticated={isAuthenticated}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            toggleArena={toggleArena}
            isInArena={isInArena}
            showFavorite={showFavorite}
            arenaSlots={arenaSlots}
         />
      </div>
      {showActions && isInArena && (
         <button
            onClick={toggleArena}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
         >
            Usuń z areny
         </button>
      )}
   </div>
)
