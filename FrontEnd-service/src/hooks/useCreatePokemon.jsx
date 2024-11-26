import { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'

export const useCreatePokemon = (navigate, reset) => {
   const { enqueueSnackbar } = useSnackbar()
   const [loading, setLoading] = useState(false)

   const createPokemon = async (newPokemon, spriteIndex) => {
      setLoading(true)
      try {
         const pokemonToCreate = {
            pokemonId: spriteIndex,
            name: newPokemon.name,
            weight: Number(newPokemon.weight),
            height: Number(newPokemon.height),
            base_experience: Number(newPokemon.base_experience),
            sprite: newPokemon.sprite,
         }

         await axios.post('http://localhost:3000/pokemons', pokemonToCreate)
         enqueueSnackbar(`Nowy pokemon ${pokemonToCreate.name} został dodany`, { variant: 'success' })
         reset()
         navigate('/')
      } catch (error) {
         enqueueSnackbar('Błąd podczas tworzenia pokemona', { variant: 'error' })
      } finally {
         setLoading(false)
      }
   }

   return { createPokemon, loading }
}
