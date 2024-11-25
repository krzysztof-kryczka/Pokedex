import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'

export const CreatePokemonPage = () => {
   const [newPokemon, setNewPokemon] = useState({
      name: '',
      weight: '',
      height: '',
      base_experience: '',
      sprite: '',
   })
   const [spriteIndex, setSpriteIndex] = useState(151)
   const [usedSprites, setUsedSprites] = useState([])
   const { enqueueSnackbar } = useSnackbar()
   const navigate = useNavigate()

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

   const handleInputChange = e => {
      const { name, value } = e.target
      setNewPokemon({
         ...newPokemon,
         [name]: value,
      })
   }

   const handleSpriteNavigation = direction => {
      const newIndex = direction === 'next' ? spriteIndex + 1 : Math.max(151, spriteIndex - 1)
      setSpriteIndex(newIndex)
   }

   const handleCreatePokemon = async () => {
      try {
         const pokemonToCreate = {
            pokemonId: spriteIndex,
            name: newPokemon.name,
            weight: parseFloat(newPokemon.weight),
            height: parseFloat(newPokemon.height),
            base_experience: parseFloat(newPokemon.base_experience),
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${spriteIndex}.svg`,
         }

         await axios.post('http://localhost:3000/pokemons', pokemonToCreate)
         enqueueSnackbar(`Nowy pokemon ${pokemonToCreate.name} został dodany`, { variant: 'success' })
         navigate('/')
      } catch (error) {
         enqueueSnackbar('Błąd podczas tworzenia pokemona', { variant: 'error' })
      }
   }

   const isSpriteUsed = spriteUrl => {
      return usedSprites.includes(spriteUrl)
   }

   const spriteUsed = isSpriteUsed(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${spriteIndex}.svg`,
   )

   return (
      <div className="bg-blue-50 min-h-screen p-8">
         <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Stwórz Pokemona</h1>
         <div className="space-y-4">
            <div>
               <label className="block font-semibold mb-2">Nazwa</label>
               <input
                  type="text"
                  name="name"
                  value={newPokemon.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
               />
            </div>
            <div>
               <label className="block font-semibold mb-2">Waga</label>
               <input
                  type="number"
                  name="weight"
                  value={newPokemon.weight}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
               />
            </div>
            <div>
               <label className="block font-semibold mb-2">Wzrost</label>
               <input
                  type="number"
                  name="height"
                  value={newPokemon.height}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
               />
            </div>
            <div>
               <label className="block font-semibold mb-2">Doświadczenie</label>
               <input
                  type="number"
                  name="base_experience"
                  value={newPokemon.base_experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
               />
            </div>
            <div>
               <label className="block font-semibold mb-2">Grafika</label>
               <div className="flex items-center justify-center">
                  <button
                     onClick={() => handleSpriteNavigation('prev')}
                     className="text-blue-500 hover:text-blue-700 text-5xl"
                  >
                     <IoIosArrowDropleftCircle />
                  </button>
                  <img
                     src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${spriteIndex}.svg`}
                     alt={`sprite ${spriteIndex}`}
                     className={`w-48 h-48 mx-4 ${spriteUsed ? 'opacity-50 grayscale' : ''}`}
                  />
                  <button
                     onClick={() => handleSpriteNavigation('next')}
                     className="text-blue-500 hover:text-blue-700 text-5xl"
                  >
                     <IoIosArrowDroprightCircle />
                  </button>
               </div>
               {spriteUsed && (
                  <p className="text-red-500 font-semibold mt-2">
                     Obrazek został już użyty i nie może być ponownie wybrany.
                  </p>
               )}
            </div>
            <button
               onClick={handleCreatePokemon}
               className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 ${
                  spriteUsed ? 'opacity-50 cursor-not-allowed' : ''
               }`}
               disabled={spriteUsed}
            >
               Stwórz
            </button>
         </div>
      </div>
   )
}
