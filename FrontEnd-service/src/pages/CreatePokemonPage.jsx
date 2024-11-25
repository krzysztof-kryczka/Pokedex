import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPokemonSchema } from '../schemas/pokemonSchema'

export const CreatePokemonPage = () => {
   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors, isSubmitted },
   } = useForm({
      resolver: zodResolver(createPokemonSchema),
      mode: 'onSubmit',
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

   useEffect(() => {
      const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${spriteIndex}.svg`
      setValue('sprite', spriteUrl)
   }, [spriteIndex, setValue])

   const handleSpriteNavigation = direction => {
      const newIndex = direction === 'next' ? spriteIndex + 1 : Math.max(151, spriteIndex - 1)
      setSpriteIndex(newIndex)
   }

   const handleCreatePokemon = async newPokemon => {
      try {
         const pokemonToCreate = {
            pokemonId: spriteIndex,
            name: newPokemon.name,
            weight: Number(newPokemon.weight),
            height: Number(newPokemon.height),
            base_experience: Number(newPokemon.base_experience),
            sprite: newPokemon.sprite,
         }

         await axios.post('http://localhost:3000/pokemons', pokemonToCreate)
         enqueueSnackbar(`Nowy pokemon ${pokemonToCreate.name} został dodany`, { variant: 'success' })
         reset()
         navigate('/')
      } catch (error) {
         enqueueSnackbar('Błąd podczas tworzenia pokemona', { variant: 'error' })
      }
   }

   const isSpriteUsed = spriteUrl => {
      return usedSprites.includes(spriteUrl)
   }

   const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${spriteIndex}.svg`
   const spriteUsed = isSpriteUsed(spriteUrl)

   return (
      <div className="bg-blue-50 min-h-screen p-8">
         <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Stwórz Pokemona</h1>
         <form
            onSubmit={handleSubmit(newPokemon => {
               handleCreatePokemon(newPokemon)
            })}
         >
            <div className="space-y-4">
               <div>
                  <label className="block font-semibold mb-2">Nazwa</label>
                  <input type="text" {...register('name')} className="w-full px-4 py-2 border rounded-lg" />
                  {errors.name && <p className="text-red-500 mt-2">{errors.name.message}</p>}
               </div>
               <div>
                  <label className="block font-semibold mb-2">Waga</label>
                  <input
                     type="number"
                     {...register('weight', { valueAsNumber: true })}
                     min="0"
                     className="w-full px-4 py-2 border rounded-lg"
                  />
                  {errors.weight && <p className="text-red-500 mt-2">{errors.weight.message}</p>}
               </div>
               <div>
                  <label className="block font-semibold mb-2">Wzrost</label>
                  <input
                     type="number"
                     {...register('height', { valueAsNumber: true })}
                     min="0"
                     className="w-full px-4 py-2 border rounded-lg"
                  />
                  {errors.height && <p className="text-red-500 mt-2">{errors.height.message}</p>}
               </div>
               <div>
                  <label className="block font-semibold mb-2">Doświadczenie</label>
                  <input
                     type="number"
                     {...register('base_experience', { valueAsNumber: true })}
                     min="0"
                     className="w-full px-4 py-2 border rounded-lg"
                  />
                  {errors.base_experience && <p className="text-red-500 mt-2">{errors.base_experience.message}</p>}
               </div>
               <input type="hidden" {...register('sprite')} value={spriteUrl} />
               <div>
                  <label className="block font-semibold mb-2">Grafika</label>
                  <div className="flex items-center justify-center">
                     <button
                        type="button"
                        onClick={() => handleSpriteNavigation('prev')}
                        className="text-blue-500 hover:text-blue-700 text-5xl"
                     >
                        <IoIosArrowDropleftCircle />
                     </button>
                     <img
                        src={spriteUrl}
                        alt={`sprite ${spriteIndex}`}
                        className={`w-48 h-48 mx-4 ${spriteUsed ? 'opacity-50 grayscale' : ''}`}
                     />
                     <button
                        type="button"
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
                  type="submit"
                  className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 ${
                     spriteUsed ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={spriteUsed}
               >
                  Stwórz
               </button>
            </div>
         </form>
      </div>
   )
}
