import React from 'react'

export const PokemonImage = ({ imageUrl, imageClassName, pokemonName }) => (
   <div className={`flex justify-center items-center mx-4 px-4 ${imageClassName}`}>
      <img src={imageUrl} alt={pokemonName} className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain" />
   </div>
)
