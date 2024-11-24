import { useState, useEffect } from 'react'
import axios from 'axios'

export const usePokemonDetails = (pokemon, user, enqueueSnackbar) => {
   const [isFavorite, setIsFavorite] = useState(false)
   const [pokemonDetails, setPokemonDetails] = useState(null)

   useEffect(() => {
      if (pokemon) {
         const fetchPokemonDetails = async () => {
            try {
               const response = await axios.get(pokemon.url)
               setPokemonDetails(response.data)
            } catch (err) {
               console.error(err)
            }
         }
         fetchPokemonDetails()
      }
   }, [pokemon])

   useEffect(() => {
      if (user && pokemonDetails) {
         const fetchFavoriteStatus = async () => {
            try {
               const response = await axios.get(
                  `http://localhost:3000/favorites?userId=${user.id}&pokemonId=${pokemonDetails.id}`,
               )
               setIsFavorite(response.data.length > 0)
            } catch (err) {
               console.error(err)
            }
         }
         fetchFavoriteStatus()
      }
   }, [pokemonDetails, user])

   const toggleFavorite = async () => {
      if (!user) return

      try {
         if (isFavorite) {
            const response = await axios.get(
               `http://localhost:3000/favorites?userId=${user.id}&pokemonId=${pokemonDetails.id}`,
            )
            await axios.delete(`http://localhost:3000/favorites/${response.data[0].id}`)
            setIsFavorite(false)
            enqueueSnackbar('Pokemon został usunięty z ulubionych.', { variant: 'success' })
         } else {
            await axios.post('http://localhost:3000/favorites', {
               userId: user.id,
               pokemonId: pokemonDetails.id,
               name: pokemonDetails.name,
               image: pokemonDetails.sprites.other['dream_world']['front_default'],
            })
            setIsFavorite(true)
            enqueueSnackbar('Pokemon został dodany do ulubionych.', { variant: 'success' })
         }
         // eslint-disable-next-line no-unused-vars
      } catch (err) {
         enqueueSnackbar('Błąd podczas aktualizacji ulubionych pokemonów.', { variant: 'error' })
      }
   }

   return { pokemonDetails, isFavorite, toggleFavorite }
}
