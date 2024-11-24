import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { PokemonList } from '../components/PokemonList'
import { useFavorites } from '../hooks/useFavorites'
import { useSnackbar } from 'notistack'

export const FavoritesPage = () => {
   const { user } = useAuth()
   const { enqueueSnackbar } = useSnackbar()
   const { favoriteDetails, removeFavorite } = useFavorites(user?.id)

   const handleRemoveFavorite = pokemonId => {
      removeFavorite(pokemonId, enqueueSnackbar)
   }

   if (!user) {
      return <p className="text-center text-lg">Zaloguj się, aby zobaczyć swoje ulubione pokemony.</p>
   }

   return (
      <div className="p-4">
         <h1 className="text-4xl font-bold mb-4 text-center">Ulubione Pokemony</h1>
         {favoriteDetails.length === 0 ? (
            <p className="text-center text-lg">
               Nie masz jeszcze żadnych ulubionych pokemonów. Dodaj je klikając w ikonę serca na karcie pokemona.
            </p>
         ) : (
            <PokemonList pokemons={favoriteDetails} onRemoveFavorite={handleRemoveFavorite} />
         )}
      </div>
   )
}
