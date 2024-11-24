import React from 'react'
import { useParams } from 'react-router-dom'
import { usePokemon } from '../context/PokemonContext'
import { useAuth } from '../hooks/useAuth'
import { useSnackbar } from 'notistack'
import { usePokemonDetails } from '../hooks/usePokemonDetails'
import { PokemonCard } from '../shared/PokemonCard'

export const PokemonDetails = () => {
   const { name } = useParams()
   const { pokemons } = usePokemon()
   const { user, isAuthenticated } = useAuth()
   const { enqueueSnackbar } = useSnackbar()

   const pokemon = pokemons.find(p => p.name === name)
   const { pokemonDetails, isFavorite, toggleFavorite } = usePokemonDetails(pokemon, user, enqueueSnackbar)

   if (!pokemon) {
      return <p className="text-center">Nie znaleziono danych dla Pokémona {name}.</p>
   }

   if (!pokemonDetails) {
      return <p className="text-center">Ładowanie danych Pokémona...</p>
   }

   const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonDetails.id}.svg`

   return (
      <div className="p-4 max-w-full mx-auto">
         <PokemonCard
            pokemon={pokemonDetails}
            imageUrl={imageUrl}
            imageClassName="flex justify-center items-center mb-4 md:mb-0 md:w-1/3"
            cardClassName="flex flex-col md:flex-row justify-around"
            isAuthenticated={isAuthenticated}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
         />
      </div>
   )
}
