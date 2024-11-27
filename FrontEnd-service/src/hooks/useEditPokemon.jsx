import { useState } from 'react'
import { useSnackbar } from 'notistack'
import axios from 'axios'

export const useEditPokemon = navigate => {
   const { enqueueSnackbar } = useSnackbar()
   const [loading, setLoading] = useState(false)

   const editExistingPokemon = async updatedPokemon => {
      setLoading(true)
      try {
         const { id, name, weight, height, base_experience, abilities } = updatedPokemon
         const sprite = updatedPokemon.sprite || updatedPokemon.sprites?.other.dream_world.front_default
         const pokemonUrl = `http://localhost:3000/pokemons/${id}`

         const finalPokemonData = {
            id,
            name,
            weight,
            height,
            base_experience,
            sprite,
            abilities: abilities || [],
         }

         // Check if the Pokémon exists in db.json
         const response = await axios.get('http://localhost:3000/pokemons')
         const allPokemons = response.data
         const existingPokemon = allPokemons.find(pokemon => pokemon.id === id)

         if (existingPokemon) {
            await axios.put(pokemonUrl, finalPokemonData)
         } else {
            await axios.post('http://localhost:3000/pokemons', finalPokemonData)
         }

         enqueueSnackbar(`Zmieniono atrybuty ${name}`, { variant: 'success' })
         navigate('/')
      } catch (error) {
         console.error('Błąd podczas edycji pokemona:', error)
         enqueueSnackbar('Błąd podczas edycji pokemona', { variant: 'error' })
      } finally {
         setLoading(false)
      }
   }

   return { editExistingPokemon, loading }
}
