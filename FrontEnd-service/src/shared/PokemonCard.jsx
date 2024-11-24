import React from 'react'
import clsx from 'clsx'

export const PokemonCard = ({
   pokemon,
   imageUrl,
   onRemoveFavorite,
   cardClassName,
   imageClassName,
   isAuthenticated,
   toggleFavorite,
   isFavorite,
}) => {
   return (
      <div className="p4">
         <div
            className={clsx(
               'overflow-hidden shadow-lg p-4 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 flex flex-col md:flex-row',
               cardClassName,
            )}
         >
            <div className="flex justify-center items-center">
               <img
                  src={imageUrl}
                  alt={pokemon.name}
                  className={clsx('w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 object-contain', imageClassName)}
               />
            </div>

            <div className="flex flex-col">
               <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 capitalize text-center">
                  {pokemon.name}
               </h2>
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
                        {pokemon.abilities[0].ability.name}
                     </p>
                     <p className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 mt-3">Ability</p>
                  </div>
               </div>
               {isAuthenticated && (
                  <button
                     onClick={toggleFavorite}
                     className={`mt-4 ${isFavorite ? 'bg-red-600' : 'bg-green-500'} text-white py-2 px-4 rounded`}
                  >
                     {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                  </button>
               )}
               {onRemoveFavorite && (
                  <button
                     onClick={() => onRemoveFavorite(pokemon.id)}
                     className="mt-4 bg-red-600 text-white py-2 px-4 rounded"
                  >
                     Usuń z ulubionych
                  </button>
               )}
            </div>
         </div>
      </div>
   )
}
