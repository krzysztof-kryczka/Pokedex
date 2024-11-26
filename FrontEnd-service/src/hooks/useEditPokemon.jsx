import { useState } from 'react'
import { useSnackbar } from 'notistack'
import axios from 'axios'

export const useEditPokemon = navigate => {
   const { enqueueSnackbar } = useSnackbar()
   const [loading, setLoading] = useState(false)

   const editExistingPokemon = async updatedPokemon => {
      setLoading(true)
      try {
         const { id, pokemonId, name, weight, height, base_experience, sprite } = updatedPokemon
         await axios.put(`http://localhost:3000/pokemons/${id}`, {
            pokemonId,
            name,
            weight,
            height,
            base_experience,
            sprite,
         })
         enqueueSnackbar(`Zmieniono atrybuty ${updatedPokemon.name}`, { variant: 'success' })
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
