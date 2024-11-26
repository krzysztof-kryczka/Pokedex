import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetchSprites = () => {
   const [usedSprites, setUsedSprites] = useState([])

   useEffect(() => {
      const fetchUsedSprites = async () => {
         try {
            const response = await axios.get('http://localhost:3000/pokemons')
            const sprites = response.data.map(pokemon => pokemon.sprite)
            setUsedSprites(sprites)
         } catch (error) {
            console.error("Nie udało się pobrać listy używanych sprite'ów:", error)
         }
      }
      fetchUsedSprites()
   }, [])

   return usedSprites
}
