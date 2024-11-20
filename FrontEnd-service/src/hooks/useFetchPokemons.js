import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetchPokemons = (pokemonsPerPage = 15) => {
   const [pokemons, setPokemons] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(() => {
      const fetchPokemons = async () => {
         try {
            setLoading(true)
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}`)
            setPokemons(response.data)
         } catch (err) {
            setError(err)
         } finally {
            setLoading(false)
         }
      }

      fetchPokemons()
   }, [pokemonsPerPage])

   return { pokemons, loading, error }
}
