import React from 'react'
import { FaHeart } from 'react-icons/fa'

export const PokemonActions = ({ isAuthenticated, toggleFavorite, isFavorite }) => (
   <div className="flex items-center justify-center mt-4">
      {isAuthenticated && (
         <button
            onClick={toggleFavorite}
            className="flex items-center text-6xl"
            aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
         >
            <FaHeart
               className={`cursor-pointer ${
                  isFavorite ? 'text-red-600 hover:text-red-500' : 'text-gray-400 hover:text-red-500'
               }`}
            />
         </button>
      )}
   </div>
)
