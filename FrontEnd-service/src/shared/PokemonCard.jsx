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
}) => (
   <div className="p4">
      <div
         className={clsx(
            'overflow-hidden shadow-lg p-4 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 flex flex-col md:flex-row',
            cardClassName,
         )}
      >
         <PokemonImage imageUrl={imageUrl} imageClassName={imageClassName} pokemonName={pokemon.name} />
         <PokemonInfo
            pokemon={pokemon}
            isAuthenticated={isAuthenticated}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
         />
      </div>
   </div>
)
