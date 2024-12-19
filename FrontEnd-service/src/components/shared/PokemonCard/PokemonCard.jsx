import React, { useContext } from 'react'
import { PokemonImage } from './PokemonImage'
import { PokemonInfo } from './PokemonInfo'
import { AuthContext } from '../../../context/AuthContext'
import { Button } from '../UI/Button'

export const PokemonCard = ({
   pokemon,
   imageUrl,
   cardClassName,
   imageClassName,
   toggleFavorite,
   isFavorite,
   toggleArena,
   isInArena = false,
   showFavorite = false,
   arenaSlots,
   showArenaAction,
   isLoser,
}) => {
   const { isAuthenticated } = useContext(AuthContext)

   return (
      <div className={`relative p-0 ${isInArena ? 'opacity-75' : ''} ${isLoser ? 'opacity-30' : ''}`}>
         <div
            className={`rounded-3xl overflow-hidden p-4 flex flex-col md:flex-row justify-evenly relative border-2 gap-8 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50
                  dark:bg-dark-background dark:border-dark-border dark:bg-none
               ${cardClassName}
            `}
         >
            {isAuthenticated && (pokemon.wins > 0 || pokemon.losses > 0) && (
               <div className="absolute top-0 left-0 bg-black text-amber-300 p-5 rounded-tl-2xl rounded-br-2xl shadow-lg">
                  <div className="flex flex-col items-start space-y-1 font-mono font-bold">
                     <p className="text-lg">W: {pokemon.wins || 0}</p>
                     <p className="text-lg">L: {pokemon.losses || 0}</p>
                  </div>
               </div>
            )}
            <PokemonImage imageUrl={imageUrl} imageClassName={imageClassName} pokemonName={pokemon.name} />
            <PokemonInfo
               pokemon={pokemon}
               toggleFavorite={toggleFavorite}
               isFavorite={isFavorite}
               toggleArena={toggleArena}
               isInArena={isInArena}
               showFavorite={showFavorite}
               arenaSlots={arenaSlots}
               showArenaAction={showArenaAction}
            />
         </div>
         {!showArenaAction && isInArena && (
            <Button onClick={toggleArena} variant="removeFromArena">
               Usuń z areny
            </Button>
         )}
      </div>
   )
}
