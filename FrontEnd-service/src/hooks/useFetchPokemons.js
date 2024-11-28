import { useEffect, useState } from 'react'
import axios from 'axios'
import { usePokemon } from '../context/PokemonContext'

export const useFetchPokemons = (pokemonsPerPage = 15, includeLocalPokemons = false) => {
   const { setPokemons, setTotalCount } = usePokemon()
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)

   useEffect(() => {
      const fetchPokemons = async () => {
         try {
            setIsLoading(true)
            let finalPokemons = []
            let dbPokemons = []
            let totalLocalPokemons = 0

            if (includeLocalPokemons) {
               // Fetch Pokémon from local db.json
               const dbResponse = await axios.get('http://localhost:3000/pokemons')
               dbPokemons = dbResponse.data
               totalLocalPokemons = dbPokemons.length
            }

            const totalPokemons = 150 + totalLocalPokemons
            const offset = (currentPage - 1) * pokemonsPerPage
            const limit = Math.min(pokemonsPerPage, totalPokemons - offset) // Don't fetch more Pokémon than available

            // Fetch Pokémon for the current page
            if (includeLocalPokemons) {
               const localPokemonsPage = dbPokemons.slice(offset, offset + limit)
               finalPokemons = [...localPokemonsPage]
            }

            if (finalPokemons.length < limit) {
               const remainingPokemonsCount = limit - finalPokemons.length

               if (remainingPokemonsCount > 0) {
                  /* currentPage = 1, pokemonsPerPage = 15, Offset: (1 - 1) * 15 = 0,  Get Pokémons 01 .. 15.
               currentPage = 2, pokemonsPerPage = 15, Offset: (2 - 1) * 15 = 15, Get Pokémons 16 .. 30.
               currentPage = 3, pokemonsPerPage = 15, Offset: (3 - 1) * 15 = 30, Get Pokémons 31 .. 45.
               currentPage = 4, pokemonsPerPage = 15, Offset: (4 - 1) * 15 = 45, Get Pokémons 46 .. 60.
            */
                  // Calculate offset, starting from 0 for API Pokémon
                  const apiOffset = Math.max(0, offset - totalLocalPokemons)
                  // const offset = (currentPage - 1) * remainingPokemonsCount

                  // Fetch Pokémon from external API
                  const apiResponse = await axios.get(
                     `https://pokeapi.co/api/v2/pokemon?offset=${apiOffset}&limit=${remainingPokemonsCount}`,
                  )
                  const detailedPokemons = await Promise.all(
                     apiResponse.data.results.map(async pokemon => {
                        const pokemonResponse = await axios.get(pokemon.url)
                        const pokemonDetails = pokemonResponse.data
                        // console.log('Fetched Pokemon Details:', pokemonDetails)
                        // const combinedData = { ...pokemon, ...pokemonDetails }
                        // console.log('Combined Pokemon Details Data:', combinedData)
                        return { ...pokemon, ...pokemonDetails }
                     }),
                  )

                  // Exclude duplicates: prioritize local Pokémon
                  const localPokemonIds = dbPokemons.map(pokemon => pokemon.id)
                  const uniqueApiPokemons = detailedPokemons.filter(pokemon => !localPokemonIds.includes(pokemon.id))

                  finalPokemons = [...finalPokemons, ...uniqueApiPokemons]
                  console.log(finalPokemons)
               }
            }
            setPokemons(finalPokemons)

            // Update total count: 150 Pokémon from external API + local Pokémon
            setTotalCount(totalPokemons)
         } catch (err) {
            setError(err)
         } finally {
            setIsLoading(false)
         }
      }
      fetchPokemons()
   }, [pokemonsPerPage, currentPage, includeLocalPokemons, setPokemons, setTotalCount])

   return { isLoading, error, currentPage, setCurrentPage, totalCount: 150 }
}
