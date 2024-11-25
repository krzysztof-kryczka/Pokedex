import React from 'react'
import clsx from 'clsx'

export const PokemonImage = ({ imageUrl, imageClassName, pokemonName }) => (
   <div className={clsx('flex justify-center items-center', imageClassName)}>
      <img src={imageUrl} alt={pokemonName} className="w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 object-contain" />
   </div>
)
