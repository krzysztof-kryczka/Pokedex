import React, { useContext } from 'react'
import { PokemonActions } from './PokemonActions'
import { AuthContext } from '../../context/AuthContext'
import { PokemonStatistics } from './PokemonStatistics'

export const PokemonInfo = ({
   pokemon,
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
      <div className="flex flex-col">
         <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-2 mt-2 capitalize text-center">{pokemon.name}</h2>
         <div className="grid grid-cols-2 gap-4 text-center">
            <PokemonStatistics value={pokemon.height} label="Height" />
            <PokemonStatistics value={pokemon.base_experience} label="Base exp" />
            <PokemonStatistics value={pokemon.weight} label="Weight" />
            <PokemonStatistics
               value={
                  pokemon.abilities && pokemon.abilities.length > 0 ? pokemon.abilities[0].ability.name : 'Brak danych'
               }
               label="Ability"
            />
         </div>
         {isAuthenticated && (
            <PokemonActions
               toggleFavorite={toggleFavorite}
               isFavorite={isFavorite}
               toggleArena={toggleArena}
               isInArena={isInArena}
               arenaSlots={arenaSlots}
               showFavorite={showFavorite}
               showArenaAction={showArenaAction}
            />
         )}
      </div>
   )
}
