import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFavorites = (userId, enqueueSnackbar) => {
   const [favorites, setFavorites] = useState([])
   const [favoriteDetails, setFavoriteDetails] = useState([])

   const fetchFavorites = async () => {
      try {
         const response = await axios.get(`http://localhost:3000/favorites?userId=${userId}`)
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
               const detailsPromises = favorites.map(favorite =>
                  axios.get(`https://pokeapi.co/api/v2/pokemon/${favorite.pokemonId}`),
               )
               const detailsResponses = await Promise.all(detailsPromises)
               setFavoriteDetails(detailsResponses.map(response => response.data))
            } catch (err) {
               console.error(err)
               enqueueSnackbar('Nie udało się pobrać szczegółów ulubionych Pokemonów.', { variant: 'error' })
            }
         }
         fetchFavoriteDetails()
      }
   }, [favorites, enqueueSnackbar])

   const toggleFavorite = async pokemonId => {
      try {
         const response = await axios.get(`http://localhost:3000/favorites?pokemonId=${pokemonId}`)
         if (response.data.length > 0) {
            const favoriteId = response.data[0]?.id
            if (favoriteId) {
               await axios.delete(`http://localhost:3000/favorites/${favoriteId}`)
               setFavorites(favorites.filter(fav => fav.pokemonId !== pokemonId))
               enqueueSnackbar('Pokemon został usunięty z ulubionych.', { variant: 'success' })
            } else {
               console.error('Nie udało się znaleźć id ulubionego Pokémona do usunięcia.')
            }
         } else {
            await axios.post('http://localhost:3000/favorites', { pokemonId })
            setFavorites([...favorites, { pokemonId }])
            enqueueSnackbar('Pokemon został dodany do ulubionych.', { variant: 'success' })
         }
      } catch (err) {
         console.error(err)
         enqueueSnackbar('Błąd podczas zarządzania ulubionymi Pokemonami.', { variant: 'error' })
      }
   }

   return { favorites, favoriteDetails, toggleFavorite, fetchFavorites }
}
