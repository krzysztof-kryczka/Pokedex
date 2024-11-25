import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { createPokemonSchema } from '../schemas/pokemonSchema'
import { useSnackbar } from 'notistack'
import { z } from 'zod'
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
   const { enqueueSnackbar } = useSnackbar()
   const navigate = useNavigate()

   const handleInputChange = e => {
      const { name, value } = e.target
      setNewPokemon({
         ...newPokemon,
         [name]: value,
      })
   }

   const handleSpriteNavigation = direction => {
      if (direction === 'next') {
         setSpriteIndex(prevIndex => prevIndex + 1)
      } else {
         setSpriteIndex(prevIndex => Math.max(151, prevIndex - 1))
      }
   }

   const handleCreatePokemon = async () => {
      try {
         const validatedData = createPokemonSchema.parse({
            ...newPokemon,
            weight: parseFloat(newPokemon.weight),
            height: parseFloat(newPokemon.height),
            base_experience: parseFloat(newPokemon.base_experience),
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${spriteIndex}.svg`,
         })

         await axios.post('http://localhost:3000/pokemons', validatedData)
         enqueueSnackbar(`Nowy pokemon ${validatedData.name} został dodany`, { variant: 'success' })
         navigate('/')
      } catch (error) {
         if (error instanceof z.ZodError) {
            enqueueSnackbar(error.errors[0].message, { variant: 'error' })
         } else {
            console.error('Błąd podczas tworzenia pokemona:', error)
            enqueueSnackbar('Błąd podczas tworzenia pokemona', { variant: 'error' })
         }
      }
   }

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
                     className="w-48 h-48 mx-4"
                  />
                  <button
                     onClick={() => handleSpriteNavigation('next')}
                     className="text-blue-500 hover:text-blue-700 text-5xl"
                  >
                     <IoIosArrowDroprightCircle />

                  </button>
               </div>
            </div>
            <button
               onClick={handleCreatePokemon}
               className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4"
            >
               Stwórz
            </button>
         </div>
      </div>
   )
}
