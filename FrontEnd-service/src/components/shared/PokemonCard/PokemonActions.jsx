import React, { useContext } from 'react'
import { FaHeart, FaShieldAlt } from 'react-icons/fa'
import { AuthContext } from '../../../context/AuthContext'

export const PokemonActions = ({
   toggleFavorite,
   isFavorite,
   toggleArena,
   isInArena,
   arenaSlots,
   showFavorite,
   showArenaAction,
}) => {
   const { isAuthenticated } = useContext(AuthContext)
   return (
      <div className="flex items-center justify-center mt-4">
         {isAuthenticated && (
            <>
               {showFavorite && (
                  <div>
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
                     <p className="mt-2 text-lg">&nbsp;</p>
                  </div>
               )}
               {showArenaAction && (
                  <div className="flex flex-col items-center ml-6">
                     <button
                        onClick={toggleArena}
                        className="text-6xl"
                        aria-label={isInArena ? 'Usuń z areny' : `Dodaj do areny (${arenaSlots}/2)`}
                     >
                        <FaShieldAlt
                           className={`cursor-pointer ${
                              isInArena ? 'text-blue-600 hover:text-blue-500' : 'text-gray-400 hover:text-blue-500'
                           }`}
                        />
                     </button>
                     <p className="mt-2 text-lg">{isInArena ? 'Usuń z areny' : `Dodaj do areny (${arenaSlots}/2)`}</p>
                  </div>
               )}
            </>
         )}
      </div>
   )
}
