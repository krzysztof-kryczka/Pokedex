import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { usePokemon } from '../context/PokemonContext'
import { useAuth } from '../hooks/useAuth'
import { useSnackbar } from 'notistack'
import { usePokemonDetails } from '../hooks/usePokemonDetails'
import { PokemonCard } from '../shared/PokemonCard'
import { addPokemonToArena, getPokemons, removePokemonFromArena, savePokemon } from '../api'

export const PokemonDetails = () => {
   const { name } = useParams()
   const { pokemons, arena, setArena } = usePokemon()
   const { user, isAuthenticated } = useAuth()
   const { enqueueSnackbar } = useSnackbar()

   const pokemon = pokemons.find(p => p.name === name)
   const { pokemonDetails, isFavorite, toggleFavorite } = usePokemonDetails(pokemon, user, enqueueSnackbar)

   const [favorite, setFavorite] = useState(isFavorite)
   const [inArena, setInArena] = useState(false)

   useEffect(() => {
      setFavorite(isFavorite)
      if (pokemonDetails && arena) {
         setInArena(arena.some(arenaPokemon => arenaPokemon.id === pokemonDetails.id))
      }
   }, [isFavorite, arena, pokemonDetails])

   if (!pokemon) {
      return <p className="text-center">Nie znaleziono danych dla Pokémona {name}.</p>
   }

   if (!pokemonDetails) {
      return <p className="text-center">Ładowanie danych Pokémona...</p>
   }

   const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonDetails.id}.svg`

   const handleToggleFavorite = () => {
      toggleFavorite(pokemonDetails.id)
      setFavorite(!favorite)
   }

   const handleToggleArena = async () => {
      try {
         if (inArena) {
            await removePokemonFromArena(pokemonDetails.id)
            setArena(prev => prev.filter(pokemon => pokemon.id !== pokemonDetails.id))
         } else {
            if (arena.length < 2) {
            const response = await getPokemons()
            const allPokemons = response.data
            const existingPokemon = allPokemons.find(p => p.id === pokemonDetails.id)

            if (!existingPokemon) {
               const { id, name, weight, height, base_experience, abilities } = pokemonDetails
               const sprite = pokemonDetails.sprites.other.dream_world.front_default
               const pokemonData = { id, name, weight, height, base_experience, sprite, abilities }
               await savePokemon(pokemonData)
            }

               await addPokemonToArena(pokemonDetails.id)
               setArena(prev => [...prev, { id: pokemonDetails.id }])
            } else {
               enqueueSnackbar('Arena jest pełna. Usuń Pokémona, aby dodać nowego.', { variant: 'error' })
               return
            }
         }
         setInArena(!inArena)
      } catch (error) {
         console.error('Błąd podczas aktualizacji areny:', error)
         enqueueSnackbar('Błąd podczas aktualizacji areny.', { variant: 'error' })
      }
   }

   return (
      <div className="p-4 max-w-full mx-auto">
         <PokemonCard
            pokemon={pokemonDetails}
            imageUrl={imageUrl}
            isAuthenticated={isAuthenticated}
            toggleFavorite={handleToggleFavorite}
            isFavorite={favorite}
            toggleArena={handleToggleArena}
            isInArena={inArena}
            showActions={true}
            arenaSlots={arena.length}
            showArenaAction={true}
         />
      </div>
   )
}
