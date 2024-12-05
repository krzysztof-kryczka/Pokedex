import { useEffect, useState, useRef } from 'react'
import { usePokemon } from '../context/PokemonContext'
import { getPokemons, getExternalPokemons, getExternalPokemonDetails } from '../api'

export const useFetchPokemons = (pokemonsPerPage = 15, includeLocalPokemons = false) => {
   const { setPokemons, setTotalCount } = usePokemon()
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)
   const additionalPokemonsCountRef = useRef(0)

   useEffect(() => {
      const fetchPokemons = async () => {
         try {
            setIsLoading(true)
            let finalPokemons = []
            let dbPokemons = []
            let totalLocalPokemons = 0

            if (includeLocalPokemons) {
               // Fetch Pokémon from local db.json
               const dbResponse = await getPokemons()
               dbPokemons = dbResponse.data
               totalLocalPokemons = dbPokemons.length
            }

            const totalPokemons = 150 + totalLocalPokemons
            let baseOffset = (currentPage - 1) * pokemonsPerPage
            if (currentPage === 1) {
               additionalPokemonsCountRef.current = 0
            } else {
               baseOffset += additionalPokemonsCountRef.current
            }
            const limit = Math.min(pokemonsPerPage, totalPokemons - baseOffset)
            let offset = baseOffset

            // Fetch Pokémon for the current page
            if (includeLocalPokemons) {
               const localPokemonsPage = dbPokemons.slice(offset, offset + limit)
               finalPokemons = [...localPokemonsPage]
               offset += localPokemonsPage.length
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
                  // const apiOffset = offset - totalLocalPokemons
                  console.log('apiOffset: ', apiOffset)
                  const apiResponse = await getExternalPokemons(apiOffset, remainingPokemonsCount)
                  const detailedPokemons = await Promise.all(
                     apiResponse.data.results.map(async pokemon => {
                        const pokemonResponse = await getExternalPokemonDetails(pokemon.url)
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

                  while (finalPokemons.length < pokemonsPerPage && apiOffset + remainingPokemonsCount < 150) {
                     const additionalPokemonsCount = pokemonsPerPage - finalPokemons.length
                     const additionalApiOffset = apiOffset + remainingPokemonsCount
                     const additionalApiResponse = await getExternalPokemons(
                        additionalApiOffset,
                        additionalPokemonsCount,
                     )
                     const additionalPokemons = await Promise.all(
                        additionalApiResponse.data.results.map(async pokemon => {
                           const pokemonResponse = await getExternalPokemonDetails(pokemon.url)
                           const pokemonDetails = pokemonResponse.data
                           return { ...pokemon, ...pokemonDetails }
                        }),
                     )
                     finalPokemons = [...finalPokemons, ...additionalPokemons]
                     additionalPokemonsCountRef.current += additionalPokemons.length
                     console.log('finalPokemons: ', finalPokemons)
                  }
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
