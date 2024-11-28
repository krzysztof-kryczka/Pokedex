import { useState, useEffect } from 'react'
import {
   addFavorite,
   getExternalPokemonDetails,
   getFavoritesByUserId,
   getLocalPokemonById,
   removeFavorite,
} from '../api'

export const useFavorites = (userId, enqueueSnackbar) => {
   const [favorites, setFavorites] = useState([])
   const [favoriteDetails, setFavoriteDetails] = useState([])

   const fetchFavorites = async () => {
      try {
         const response = await getFavoritesByUserId(userId)
         setFavorites(response.data)
         if (response.data.length === 0) {
            setFavoriteDetails([])
         }
      } catch (err) {
         console.error(err)
         enqueueSnackbar('Nie udało się pobrać ulubionych Pokemonów.', { variant: 'error' })
      }
   }

   useEffect(() => {
      fetchFavorites()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

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
         const response = await getFavoritesByUserId(userId)
         const favorite = response.data.find(fav => fav.pokemonId === pokemonId)
         if (favorite) {
            await removeFavorite(favorite.id)
            setFavorites(favorites.filter(fav => fav.pokemonId !== pokemonId))
            enqueueSnackbar('Pokemon został usunięty z ulubionych.', { variant: 'success' })
         } else {
            await addFavorite({ userId, pokemonId })
            setFavorites([...favorites, { userId, pokemonId }])
            enqueueSnackbar('Pokemon został dodany do ulubionych.', { variant: 'success' })
         }
      } catch (err) {
         console.error(err)
         enqueueSnackbar('Błąd podczas zarządzania ulubionymi Pokemonami.', { variant: 'error' })
      }
   }

   return { favorites, favoriteDetails, toggleFavorite, fetchFavorites }
}
