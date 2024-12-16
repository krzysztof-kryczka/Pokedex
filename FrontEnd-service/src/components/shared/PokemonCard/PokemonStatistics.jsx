import React from 'react'

export const PokemonStatistics = ({ value, label }) => (
   <>
      <p className="text-lg md:text-xl lg:text-xl text-gray-600 mb-2 mt-2">{value}</p>
      <p className="text-xl md:text-xl lg:text-2xl font-bold mb-2 mt-2">{label}</p>
   </>
)
