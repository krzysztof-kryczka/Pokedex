import { useState, useEffect } from 'react'
import axios from 'axios'
import { useFavorites } from './useFavorites'

export const usePokemonDetails = (pokemon, user, enqueueSnackbar) => {
   const [pokemonDetails, setPokemonDetails] = useState(null)
   const [isFavorite, setIsFavorite] = useState(false)
   const { toggleFavorite } = useFavorites(user?.id, enqueueSnackbar)

   useEffect(() => {
      const fetchPokemonDetails = async () => {
         if (!pokemon) return
         try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
            setPokemonDetails(response.data)
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
               const response = await axios.get(
                  `http://localhost:3000/favorites?userId=${user.id}&pokemonId=${pokemonDetails.id}`,
               )
               setIsFavorite(response.data.length > 0)
            } catch (error) {
               console.error('Błąd podczas pobierania pokemonów z karty Ulubione!', error)
            }
         }
         fetchFavorites()
      }
   }, [user, pokemonDetails])

   return { pokemonDetails, isFavorite, toggleFavorite }
}
