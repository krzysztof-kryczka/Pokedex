import { useState, useEffect, useCallback } from 'react'
import {
   getFavoritesByUserId,
   getLocalPokemonById,
   addFavorite,
   removeFavorite,
   getExternalPokemonDetails,
} from '../api'

export const useFavorites = (userId, enqueueSnackbar) => {
   const [favorites, setFavorites] = useState([])
   const [favoriteDetails, setFavoriteDetails] = useState([])

   // useCallback is used here to remember the fetchFavorites function to avoid creating a new function on every render.
   // This helps prevent infinite loops in useEffect that I encountered via the dependency array
   const fetchFavorites = useCallback(async () => {
      try {
         const response = await getFavoritesByUserId(userId)
         const userFavorites = response.data.filter(
            favorite => Array.isArray(favorite.userId) && favorite.userId.includes(userId),
         )
         setFavorites(userFavorites)
         if (userFavorites.length === 0) {
            setFavoriteDetails([])
         }
      } catch (err) {
         console.error(err)
         enqueueSnackbar('Nie udało się pobrać ulubionych Pokemonów.', { variant: 'error' })
      }
   }, [userId, enqueueSnackbar])

   useEffect(() => {
      fetchFavorites()
   }, [fetchFavorites])

   useEffect(() => {
      if (favorites.length > 0) {
         const fetchFavoriteDetails = async () => {
            try {
               const detailsPromises = favorites.map(async favorite => {
                  const localResponse = await getLocalPokemonById(favorite.pokemonId)
                  if (localResponse.data.length > 0) {
                     return localResponse.data[0]
                  } else {
                     const apiResponse = await getExternalPokemonDetails(`/pokemon/${favorite.pokemonId}`)
                     return apiResponse.data
                  }
               })
               const detailsResponses = await Promise.all(detailsPromises)
               setFavoriteDetails(detailsResponses)
               // eslint-disable-next-line no-unused-vars
            } catch (err) {
               enqueueSnackbar('Nie udało się pobrać szczegółów ulubionych Pokemonów.', { variant: 'error' })
            }
         }
         fetchFavoriteDetails()
      }
   }, [favorites, enqueueSnackbar])

   const toggleFavorite = async pokemonId => {
      try {
         const favorite = favorites.find(fav => fav.pokemonId === pokemonId)
         if (favorite) {
            await removeFavorite(pokemonId, userId)
            const updatedFavorites = favorites
               .map(fav =>
                  fav.pokemonId === pokemonId ? { ...fav, userId: fav.userId.filter(id => id !== userId) } : fav,
               )
               .filter(fav => fav.userId.length > 0) // Deleting entries with an empty userId array
            setFavorites(updatedFavorites)
            enqueueSnackbar('Pokemon został usunięty z ulubionych.', { variant: 'success' })
         } else {
            await addFavorite(pokemonId, userId)
            setFavorites([...favorites, { pokemonId, userId: [userId] }])
            enqueueSnackbar('Pokemon został dodany do ulubionych.', { variant: 'success' })
         }
      } catch (err) {
         console.error(err)
         enqueueSnackbar('Błąd podczas zarządzania ulubionymi Pokemonami.', { variant: 'error' })
      }
   }

   return { favorites, favoriteDetails, toggleFavorite, fetchFavorites }
}
