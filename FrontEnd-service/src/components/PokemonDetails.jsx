import React from 'react'
import { useParams } from 'react-router-dom'
import { usePokemon } from '../context/PokemonContext'

export const PokemonDetails = () => {
   const { name } = useParams()
   const { pokemons } = usePokemon()

   const pokemon = pokemons.find(p => p.name === name)

   if (!pokemon) {
      return <p className="text-center">Nie znaleziono danych dla Pokémona {name}.</p>
   }

   const pokemonId = pokemon.url.split('/')[6]
   const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`

   return (
      <div className="p-4 max-w-full mx-auto">
         <div className="border rounded-3xl overflow-hidden shadow-lg p-4 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 flex flex-col md:flex-row">
            <div className="flex justify-center items-center mb-4 md:mb-0 md:w-1/3">
               <img src={imageUrl} alt={pokemon.name} className="w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96" />
            </div>
            <div className="flex flex-col items-center justify-center md:ml-4 md:w-2/3">
               <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 capitalize text-center">
                  {pokemon.name}
               </h2>
               <div className="grid grid-cols-2 gap-10 text-center">
                  <div>
                     <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-3 mt-3">{pokemon.height}</p>
                     <p className="text-xl md:text-2xl lg:text-3xl font-bold">Height</p>
                  </div>
                  <div>
                     <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-3 mt-3">{pokemon.base_experience}</p>
                     <p className="text-xl md:text-2xl lg:text-3xl font-bold">Base experience</p>
                  </div>
                  <div>
                     <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-3 mt-3">{pokemon.weight}</p>
                     <p className="text-xl md:text-2xl lg:text-3xl font-bold">Weight</p>
                  </div>
                  <div>
                     <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-3 mt-3">
                        {pokemon.abilities[0].ability.name}
                     </p>
                     <p className="text-xl md:text-2xl lg:text-3xl font-bold">Ability</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
