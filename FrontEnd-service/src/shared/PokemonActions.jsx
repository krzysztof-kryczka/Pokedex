import React from 'react'
import { FaHeart, FaShieldAlt } from 'react-icons/fa'

export const PokemonActions = ({ isAuthenticated, toggleFavorite, isFavorite, toggleArena, isInArena, arenaSlots }) => (
   <div className="flex items-center justify-center mt-4">
      {isAuthenticated && (
         <>
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
            <button
               onClick={toggleArena}
               className="flex items-center text-6xl ml-6"
               aria-label={isInArena ? 'Usuń z areny' : `Dodaj do areny (${arenaSlots}/2)`}
            >
               <FaShieldAlt
                  className={`cursor-pointer ${
                     isInArena ? 'text-blue-600 hover:text-blue-500' : 'text-gray-400 hover:text-blue-500'
                  }`}
               />
            </button>
            <p className="ml-2 text-lg">{isInArena ? 'Usuń z areny' : `Dodaj do areny (${arenaSlots}/2)`}</p>
         </>
      )}
   </div>
)
