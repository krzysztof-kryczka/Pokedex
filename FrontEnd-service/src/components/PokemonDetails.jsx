import React from 'react'
import { useParams } from 'react-router-dom'

export const PokemonDetails = () => {
   const { name } = useParams()

   return (
      <div className="p-4 max-auto mx-auto">
         <h1 className="text-4xl font-bold mb-4 text-center capitalize">{name}</h1>
         <p>Informacje o Pokémonie {name}.</p>
      </div>
   )
}
