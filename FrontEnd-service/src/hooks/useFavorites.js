import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFavorites = userId => {
   const [favorites, setFavorites] = useState([])
   const [favoriteDetails, setFavoriteDetails] = useState([])

   useEffect(() => {
      if (!userId) return

      const fetchFavorites = async () => {
         try {
            const response = await axios.get(`http://localhost:3000/favorites?userId=${userId}`)
            setFavorites(response.data)
         } catch (err) {
            console.error(err)
         }
      }

      fetchFavorites()
   }, [userId])

   useEffect(() => {
      if (favorites.length === 0) return

      const fetchFavoriteDetails = async () => {
         try {
            const detailsPromises = favorites.map(favorite =>
               axios.get(`https://pokeapi.co/api/v2/pokemon/${favorite.pokemonId}`),
            )
            const detailsResponses = await Promise.all(detailsPromises)
            setFavoriteDetails(detailsResponses.map(response => response.data))
         } catch (err) {
            console.error(err)
         }
      }

      fetchFavoriteDetails()
   }, [favorites])

   const removeFavorite = async (pokemonId, enqueueSnackbar) => {
      try {
         const response = await axios.get(`http://localhost:3000/favorites?userId=${userId}&pokemonId=${pokemonId}`)
         if (response.data.length > 0) {
            await axios.delete(`http://localhost:3000/favorites/${response.data[0].id}`)
            setFavorites(favorites.filter(fav => fav.pokemonId !== pokemonId))
            enqueueSnackbar('Pokemon został usunięty z ulubionych.', { variant: 'success' })
         }

         // eslint-disable-next-line no-unused-vars
      } catch (err) {
         enqueueSnackbar('Błąd podczas usuwania ulubionego pokemona.', { variant: 'error' })
      }
   }

   return { favorites, favoriteDetails, removeFavorite }
}
