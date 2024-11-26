import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetchPokemons = (pokemonsPerPage = 15) => {
   const [pokemons, setPokemons] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)

   useEffect(() => {
      const fetchPokemons = async () => {
         try {
            setIsLoading(true)
            /* currentPage = 1, pokemonsPerPage = 15, Offset: (1 - 1) * 15 = 0,  Get Pokémons 01 .. 15.
               currentPage = 2, pokemonsPerPage = 15, Offset: (2 - 1) * 15 = 15, Get Pokémons 16 .. 30.
               currentPage = 3, pokemonsPerPage = 15, Offset: (3 - 1) * 15 = 30, Get Pokémons 31 .. 45.
               currentPage = 4, pokemonsPerPage = 15, Offset: (4 - 1) * 15 = 45, Get Pokémons 46 .. 60.
            */
            const offset = (currentPage - 1) * pokemonsPerPage
            // Fetch Pokémon from external API
            const apiResponse = await axios.get(
               `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pokemonsPerPage}`,
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

            // Fetch Pokémon from local db.json
            const dbResponse = await axios.get('http://localhost:3000/pokemons')
            const dbPokemons = dbResponse.data

            // Merge and deduplicate Pokémon lists
            const mergedPokemons = [...detailedPokemons, ...dbPokemons]
            console.log('mergedPokemons: ', mergedPokemons)
            setPokemons(mergedPokemons)
            //setPokemons(detailedPokemons)
         } catch (err) {
            setError(err)
         } finally {
            setIsLoading(false)
         }
      }
      fetchPokemons()
   }, [pokemonsPerPage, currentPage])

   return { pokemons, isLoading, error, currentPage, setCurrentPage }
}
