import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { fetchUsedSprites, getPokemons, savePokemon as savePokemonApi, updatePokemon as updatePokemonApi } from '../api'

export const useManagePokemon = (navigate, reset) => {
   const { enqueueSnackbar } = useSnackbar()
   const [loading, setLoading] = useState(false)
   const [usedSprites, setUsedSprites] = useState([])

   useEffect(() => {
      const fetchSprites = async () => {
         try {
            const response = await fetchUsedSprites()
            const sprites = response.data.map(pokemon => pokemon.sprite)
            setUsedSprites(sprites)
         } catch (error) {
            console.error("Nie udało się pobrać listy używanych sprite'ów:", error)
         }
      }
      fetchSprites()
   }, [])

   const savePokemon = async (pokemonData, spriteIndex) => {
      setLoading(true)
      try {
         const { id, name, weight, height, base_experience, abilities } = pokemonData
         const sprite = pokemonData.sprite || pokemonData.sprites?.other.dream_world.front_default
         const pokemonId = id || spriteIndex

         const finalPokemonData = {
            id: pokemonId,
            name,
            weight: Number(weight),
            height: Number(height),
            base_experience: Number(base_experience),
            sprite,
            abilities: abilities || [],
         }

         // Check: if the Pokémon exists in db.json
         const response = await getPokemons()
         const allPokemons = response.data
         const existingPokemon = allPokemons.find(pokemon => pokemon.id === pokemonId)

         if (existingPokemon) {
            await updatePokemonApi(pokemonId, finalPokemonData)
            enqueueSnackbar(`Zmieniono atrybuty pokémona: ${name}`, { variant: 'success' })
         } else {
            await savePokemonApi(finalPokemonData)
            enqueueSnackbar(`Nowy pokémon: ${name} został dodany`, { variant: 'success' })
            if (reset) reset()
         }

         navigate('/')
      } catch (error) {
         console.error('Błąd podczas zapisywania pokémona:', error)
         enqueueSnackbar('Błąd podczas zapisywania pokémona', { variant: 'error' })
      } finally {
         setLoading(false)
      }
   }

   return { savePokemon, loading, usedSprites }
}
