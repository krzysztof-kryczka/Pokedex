import React, { useState } from 'react'
import { usePokemon } from '../context/PokemonContext'
import { PokemonCard } from '../shared/PokemonCard'
import { PlaceholderCard } from '../shared/PlaceholderCard'
import { BattleButton } from '../shared/BattleButton'
import { BattleResultModal } from '../shared/BattleResultModal'

export const ArenaPage = () => {
   const { arena, setArena } = usePokemon()
   const [battleResult, setBattleResult] = useState(null)
   const [showModal, setShowModal] = useState(false)

   const handleRemoveFromArena = () => {}

   const handleBattle = () => {}

   const handleLeaveArena = () => {}

   return (
      <div className="p-4 max-w-full mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {arena.length > 0 ? (
               arena.map(pokemon => (
                  <PokemonCard
                     key={pokemon.id}
                     pokemon={pokemon}
                     isAuthenticated={true}
                     toggleFavorite={() => {}}
                     isFavorite={false}
                     toggleArena={() => handleRemoveFromArena()}
                     isInArena={true}
                     showActions={true}
                  />
               ))
            ) : (
               <>
                  <PlaceholderCard />
                  <PlaceholderCard />
               </>
            )}
         </div>
         <div className="flex justify-center mt-4">
            <BattleButton onClick={handleBattle} disabled={arena.length < 2} />
         </div>
         {showModal && <BattleResultModal result={battleResult} onClose={handleLeaveArena} />}
      </div>
   )
}
