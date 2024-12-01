import React, { useEffect, useState } from 'react'
import { usePokemon } from '../context/PokemonContext'
import { PokemonCard } from '../shared/PokemonCard'
import { PlaceholderCard } from '../shared/PlaceholderCard'
import { BattleButton } from '../shared/BattleButton'
import { BattleResultModal } from '../shared/BattleResultModal'
import { enqueueSnackbar } from 'notistack'
import { getArena } from '../api'

export const ArenaPage = () => {
   const { pokemons, arena, setArena } = usePokemon()
   const [battleResult, setBattleResult] = useState(null)
   const [showModal, setShowModal] = useState(false)

   useEffect(() => {
      const fetchArena = async () => {
         try {
            const response = await getArena()
            setArena(response.data)
         } catch (error) {
            console.error('Nie udało się pobrać danych z areny:', error)
            enqueueSnackbar('Nie udało się pobrać danych z areny.', { variant: 'error' })
         }
      }
      fetchArena()
   }, [setArena, enqueueSnackbar])

   const handleRemoveFromArena = () => {}

   const handleBattle = () => {}

   const handleLeaveArena = () => {}

   return (
      <div className="p-4 max-w-full mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {arena.length > 0 ? (
               arena.map(arenaPokemon => {
                  const pokemon = pokemons.find(p => p.id === arenaPokemon.id)
                  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
                  return (
                     <PokemonCard
                        key={pokemon?.id}
                        pokemon={pokemons.find(p => p.id === pokemon.id)}
                        imageUrl={imageUrl}
                        isAuthenticated={true}
                        toggleFavorite={() => {}}
                        isFavorite={false}
                        toggleArena={() => handleRemoveFromArena()}
                        isInArena={true}
                        showActions={true}
                        showFavorite={false}
                        arenaSlots={arena.length}
                     />
                  )
               })
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
