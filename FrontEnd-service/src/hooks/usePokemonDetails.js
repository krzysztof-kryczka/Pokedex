import { useState, useEffect } from 'react'
import { getLocalPokemonById, getExternalPokemonDetails, getFavoritesByUserId } from '../api'
import { useFavorites } from './useFavorites'

export const usePokemonDetails = (pokemon, user, enqueueSnackbar) => {
   const [pokemonDetails, setPokemonDetails] = useState(null)
   const [isFavorite, setIsFavorite] = useState(false)
   const { toggleFavorite } = useFavorites(user?.id, enqueueSnackbar)

   useEffect(() => {
      const fetchPokemonDetails = async () => {
         if (!pokemon) return
         try {
            const localResponse = await getLocalPokemonById(pokemon.id)
            if (localResponse.data.length > 0) {
               setPokemonDetails(localResponse.data[0])
            } else {
               const apiResponse = await getExternalPokemonDetails(`/pokemon/${pokemon.id}`)
               setPokemonDetails(apiResponse.data)
            }
         } catch (error) {
            console.error('Nie udało się pobrać szczegółów Pokémona:', error)
            enqueueSnackbar('Nie udało się pobrać szczegółów Pokémona.', { variant: 'error' })
         }
      }
      fetchPokemonDetails()
   }, [pokemon, enqueueSnackbar])

   useEffect(() => {
      if (user && pokemonDetails) {
         const fetchFavorites = async () => {
            try {
               const response = await getFavoritesByUserId(user.id)
               const isFav = response.data.some(fav => fav.pokemonId === pokemonDetails.id)
               setIsFavorite(isFav)
            } catch (error) {
               console.error('Błąd podczas pobierania pokemonów z karty Ulubione!', error)
            }
         }
         fetchFavorites()
      }
   }, [user, pokemonDetails])

   return { pokemonDetails, isFavorite, toggleFavorite }
}
