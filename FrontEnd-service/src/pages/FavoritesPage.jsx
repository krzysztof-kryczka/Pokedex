import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useFavorites } from '../hooks/useFavorites'
import { PokemonCard } from '../shared/PokemonCard'
import { useSnackbar } from 'notistack'

export const FavoritesPage = () => {
   const { user } = useAuth()
   const { enqueueSnackbar } = useSnackbar()
   const { favoriteDetails, toggleFavorite, fetchFavorites } = useFavorites(user?.id, enqueueSnackbar)

   const handleRemoveFavorite = async pokemonId => {
      await toggleFavorite(pokemonId)
      fetchFavorites()
   }

   if (!user) {
      return <p className="text-center text-lg">Zaloguj się, aby zobaczyć swoje ulubione pokemony.</p>
   }

   return (
      <div className="p-4 max-w-full mx-auto">
         <h1 className="text-4xl font-bold mb-4 text-center">Ulubione Pokemony</h1>
         {favoriteDetails.length === 0 ? (
            <p className="text-center text-lg">
               Nie masz jeszcze żadnych ulubionych pokemonów. Dodaj je klikając w ikonę serca na karcie pokemona.
            </p>
         ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
               {favoriteDetails.map(pokemon => (
                  <li
                     key={pokemon.id}
                     className="border rounded-3xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50"
                  >
                     <PokemonCard
                        pokemon={pokemon}
                        imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                        imageClassName="flex justify-center items-center"
                        cardClassName="flex flex-col md:flex-col justify-around"
                        isAuthenticated={true}
                        toggleFavorite={() => handleRemoveFavorite(pokemon.id)}
                        isFavorite={true}
                        showActions={true}
                     />
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}
