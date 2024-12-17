import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { PokemonStatistics } from './PokemonStatistics'
import { PokemonActions } from './PokemonActions'
import { Header } from '../UI/Header'

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
      <div className="flex flex-col justify-center my-4 d:w-80">
         <Header variant="h2">{pokemon.name}</Header>
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
