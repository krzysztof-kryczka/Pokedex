import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetchPokemons = (pokemonsPerPage = 15, includeLocalPokemons = false) => {
   const [pokemons, setPokemons] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)

   useEffect(() => {
      const fetchPokemons = async () => {
         try {
            setIsLoading(true)
            let finalPokemons = []
            let totalLocalPokemons = 0

            if (includeLocalPokemons) {
               // Fetch Pokémon from local db.json
               const dbResponse = await axios.get('http://localhost:3000/pokemons')
               const dbPokemons = dbResponse.data
               totalLocalPokemons = dbPokemons.length

               // Include local Pokémons in the current Page
               const localPokemonsPage = dbPokemons.slice(
                  (currentPage - 1) * pokemonsPerPage,
                  currentPage * pokemonsPerPage,
               )
               finalPokemons = [...localPokemonsPage]
            }

            const remainingPokemonsCount = pokemonsPerPage - finalPokemons.length
            console.log('remainingPokemonsCount', remainingPokemonsCount)

            if (remainingPokemonsCount > 0) {
               /* currentPage = 1, pokemonsPerPage = 15, Offset: (1 - 1) * 15 = 0,  Get Pokémons 01 .. 15.
               currentPage = 2, pokemonsPerPage = 15, Offset: (2 - 1) * 15 = 15, Get Pokémons 16 .. 30.
               currentPage = 3, pokemonsPerPage = 15, Offset: (3 - 1) * 15 = 30, Get Pokémons 31 .. 45.
               currentPage = 4, pokemonsPerPage = 15, Offset: (4 - 1) * 15 = 45, Get Pokémons 46 .. 60.
            */
               // Calculate offset, starting from 0 for API Pokémon
               const offset = Math.max(0, (currentPage - 1) * pokemonsPerPage - totalLocalPokemons)
               // const offset = (currentPage - 1) * remainingPokemonsCount

               // Fetch Pokémon from external API
               const apiResponse = await axios.get(
                  `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${remainingPokemonsCount}`,
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
               finalPokemons = [...finalPokemons, ...detailedPokemons]
               console.log(finalPokemons)
            }
            setPokemons(finalPokemons)
         } catch (err) {
            setError(err)
         } finally {
            setIsLoading(false)
         }
      }
      fetchPokemons()
   }, [pokemonsPerPage, currentPage, includeLocalPokemons])

   return { pokemons, isLoading, error, currentPage, setCurrentPage }
}
