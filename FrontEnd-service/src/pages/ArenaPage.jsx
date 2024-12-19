import React, { useState, useEffect } from 'react'
import { usePokemon } from '../context/PokemonContext'
import { useSnackbar } from 'notistack'
import { PokemonCard } from '../components/shared/PokemonCard'
import { PlaceholderCard } from '../components/shared/PokemonArena/PlaceholderCard'
import { BattleButton } from '../components/shared/PokemonArena/BattleButton'
import { BattleResultModal } from '../components/shared/PokemonArena/BattleResultModal'
import { getArena, removePokemonFromArena, updatePokemon, savePokemon, getLocalPokemonById } from '../api'
import BattleArena from '../assets/battle-arena.webp'
import { Wrapper } from '../components/shared/UI/Wrapper'
import { Header } from '../components/shared/UI/Header'

export const ArenaPage = () => {
   const { pokemons, setPokemons, arena, setArena } = usePokemon()
   const { enqueueSnackbar } = useSnackbar()
   const [battleResult, setBattleResult] = useState(null)
   const [showModal, setShowModal] = useState(false)
   const [loserId, setLoserId] = useState(null)

   useEffect(() => {
      const fetchArenaData = async () => {
         try {
            const arenaResponse = await getArena()
            setArena(arenaResponse.data)
         } catch (error) {
            console.error('Nie udało się pobrać danych:', error)
            enqueueSnackbar('Nie udało się pobrać danych areny.', { variant: 'error' })
         }
      }

      fetchArenaData()
   }, [setArena, enqueueSnackbar])

   const handleRemoveFromArena = async id => {
      try {
         await removePokemonFromArena(id)
         setArena(prev => prev.filter(pokemon => pokemon.id !== id))
      } catch (error) {
         console.error('Nie udało się usunąć Pokémona z areny:', error)
         enqueueSnackbar('Nie udało się usunąć Pokémona z areny.', { variant: 'error' })
      }
   }

   const handleBattle = async () => {
      if (arena.length === 2) {
         const pokemon1 = pokemons.find(p => p.id === arena[0].id)
         const pokemon2 = pokemons.find(p => p.id === arena[1].id)
         if (pokemon1 && pokemon2) {
            const result1 = pokemon1.base_experience * pokemon1.weight
            const result2 = pokemon2.base_experience * pokemon2.weight
            if (result1 > result2) {
               setBattleResult({ winner: pokemon1, loser: pokemon2 })
               pokemon1.wins = (pokemon1.wins || 0) + 1
               pokemon1.base_experience += 10
               pokemon2.losses = (pokemon2.losses || 0) + 1
               setLoserId(pokemon2.id)
            } else if (result2 > result1) {
               setBattleResult({ winner: pokemon2, loser: pokemon1 })
               pokemon2.wins = (pokemon2.wins || 0) + 1
               pokemon2.base_experience += 10
               pokemon1.losses = (pokemon1.losses || 0) + 1
               setLoserId(pokemon1.id)
            } else {
               setBattleResult({ winner: null, loser: null })
               enqueueSnackbar('Remis! Pokemony nie otrzymały żadnych statystyk.', { variant: 'info' })
            }
            // console.log('Pokémon 1 przed zapisem:', pokemon1)
            // console.log('Pokémon 2 przed zapisem:', pokemon2)
            await saveOrUpdatePokemon(pokemon1)
            await saveOrUpdatePokemon(pokemon2)
            setShowModal(true)
         } else {
            enqueueSnackbar('Nie znaleziono Pokémona na arenie.', { variant: 'error' })
         }
      }
   }

   const saveOrUpdatePokemon = async pokemon => {
      try {
         // console.log('Pokémon przed zapisem/aktualizacją:', pokemon)
         const response = await getLocalPokemonById(pokemon.id)
         if (response.data && response.data.length > 0) {
            const existingPokemon = response.data[0]
            // console.log('Istniejący Pokémon:', existingPokemon)
            await updatePokemon(pokemon.id, { ...existingPokemon, ...pokemon })
         } else {
            await savePokemon(pokemon)
         }
      } catch (error) {
         console.error('Nie udało się zapisać lub zaktualizować Pokémona:', error)
         enqueueSnackbar('Nie udało się zapisać lub zaktualizować Pokémona.', { variant: 'error' })
      }
   }

   const handleLeaveArena = async () => {
      try {
         for (const pokemon of arena) {
            await removePokemonFromArena(pokemon.id)
         }
         setArena([])
         setShowModal(false)
         setLoserId(null)
      } catch (error) {
         console.error('Nie udało się usunąć Pokémonów z areny:', error)
         enqueueSnackbar('Nie udało się usunąć Pokémonów z areny.', { variant: 'error' })
      }
   }

   return (
      <Wrapper className="min-h-[calc(100vh-80px)]">
         <Header variant="h1">Arena</Header>
         <div
            className="p-4 w-full flex-1"
            style={{ backgroundImage: `url(${BattleArena})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
         >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {arena.length > 0 ? (
                  arena.map(arenaPokemon => {
                     const pokemon = pokemons.find(p => p.id === arenaPokemon.id)
                     if (pokemon) {
                        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
                        return (
                           <PokemonCard
                              key={pokemon.id}
                              pokemon={pokemon}
                              imageUrl={imageUrl}
                              toggleArena={() => handleRemoveFromArena(pokemon.id)}
                              isInArena={true}
                              arenaSlots={arena.length}
                              isLoser={pokemon.id === loserId}
                           />
                        )
                     } else {
                        console.error('Nie znaleziono Pokémona o ID:', arenaPokemon.id)
                        return null
                     }
                  })
               ) : (
                  <>
                     <PlaceholderCard />
                     <PlaceholderCard />
                  </>
               )}
            </div>
            <div className="flex justify-center py-4">
               <BattleButton onClick={handleBattle} disabled={arena.length < 2} />
            </div>
            {showModal && <BattleResultModal result={battleResult} onClose={handleLeaveArena} />}
         </div>
      </Wrapper>
   )
}
