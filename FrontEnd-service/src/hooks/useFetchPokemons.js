import { useEffect, useState } from 'react'
import { usePokemon } from '../context/PokemonContext'
import { getPokemons, getExternalPokemons, getExternalPokemonDetails } from '../api'

export const useFetchPokemons = (pokemonsPerPage = 15) => {
   const { pokemons, setPokemons, setTotalCount } = usePokemon()
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)

   useEffect(() => {
      const fetchAllPokemons = async () => {
         try {
            setIsLoading(true)

            // Fetch local Pokémons
            const localPokemonsResponse = await getPokemons()
            const localPokemons = localPokemonsResponse.data.reverse()

            // Fetch external Pokémons
            const externalPokemonsResponse = await getExternalPokemons(0, 150)
            const externalPokemons = await Promise.all(
               externalPokemonsResponse.data.results.map(async pokemon => {
                  const pokemonResponse = await getExternalPokemonDetails(pokemon.url)
                  return { ...pokemon, ...pokemonResponse.data }
               }),
            )

            // Merge and deduplicate Pokémons, giving priority to local Pokémons
            const localPokemonIds = new Set(localPokemons.map(pokemon => pokemon.id))
            const uniqueExternalPokemons = externalPokemons.filter(pokemon => !localPokemonIds.has(pokemon.id))
            const allPokemons = [...localPokemons, ...uniqueExternalPokemons]

            setPokemons(allPokemons)
            setTotalCount(allPokemons.length)
         } catch (err) {
            setError(err)
         } finally {
            setIsLoading(false)
         }
      }

      if (pokemons.length === 0) {
         fetchAllPokemons()
      } else {
         setIsLoading(false)
      }
   }, [pokemons, setPokemons, setTotalCount])

   const totalPages = Math.ceil(pokemons.length / pokemonsPerPage)

   return { isLoading, error, currentPage, setCurrentPage, totalPages }
}
