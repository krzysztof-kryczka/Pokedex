import React, { useState, useEffect } from 'react'
import { usePokemon } from '../context/PokemonContext'
import { useSnackbar } from 'notistack'
import { PokemonCard } from '../shared/PokemonCard'
import { PlaceholderCard } from '../shared/PokemonArena/PlaceholderCard'
import { BattleButton } from '../shared/PokemonArena/BattleButton'
import { BattleResultModal } from '../shared/PokemonArena/BattleResultModal'
import { getPokemons, getArena, removePokemonFromArena, updatePokemon } from '../api'
import BattleArena from '../assets/battle-arena.webp'

export const ArenaPage = () => {
   const { pokemons, setPokemons, arena, setArena } = usePokemon()
   const { enqueueSnackbar } = useSnackbar()
   const [battleResult, setBattleResult] = useState(null)
   const [showModal, setShowModal] = useState(false)
   const [loserId, setLoserId] = useState(null)

   useEffect(() => {
      const fetchData = async () => {
         try {
            const pokemonsResponse = await getPokemons()
            setPokemons(pokemonsResponse.data)
            console.log('Pokémons zostały pobrane:', pokemonsResponse.data)
            const arenaResponse = await getArena()
            setArena(arenaResponse.data)
            console.log('Dane areny zostały pobrane:', arenaResponse.data)
         } catch (error) {
            console.error('Nie udało się pobrać danych:', error)
            enqueueSnackbar('Nie udało się pobrać danych.', { variant: 'error' })
         }
      }
      fetchData()
   }, [setPokemons, setArena, enqueueSnackbar])

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
            await updatePokemon(pokemon1?.id, pokemon1)
            await updatePokemon(pokemon2?.id, pokemon2)
            setShowModal(true)
         } else {
            enqueueSnackbar('Nie znaleziono Pokémona na arenie.', { variant: 'error' })
         }
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
      // <div className="min-w-full">
         <div
            className="p-4"
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
                              // showArenaAction={false}
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
            <div className="flex justify-center mt-4">
               <BattleButton onClick={handleBattle} disabled={arena.length < 2} />
            </div>
            {showModal && <BattleResultModal result={battleResult} onClose={handleLeaveArena} />}
         </div>
      // </div>
   )
}
