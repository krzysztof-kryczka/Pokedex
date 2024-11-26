import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPokemonSchema } from '../schemas/pokemonSchema'
import { PokemonForm } from '../shared/PokemonForm'
import { useFetchSprites } from '../hooks/useFetchSprites'
import { useCreatePokemon } from '../hooks/useCreatePokemon'

export const CreatePokemonPage = () => {
   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(createPokemonSchema),
      mode: 'onSubmit',
   })
   const [spriteIndex, setSpriteIndex] = useState(151)
   const usedSprites = useFetchSprites()
   const navigate = useNavigate()
   const { createPokemon, loading } = useCreatePokemon(navigate, reset)

   useEffect(() => {
      const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${spriteIndex}.svg`
      setValue('sprite', spriteUrl)
   }, [spriteIndex, setValue])

   const handleSpriteNavigation = direction => {
      const newIndex = direction === 'next' ? spriteIndex + 1 : Math.max(151, spriteIndex - 1)
      setSpriteIndex(newIndex)
   }

   const isSpriteUsed = spriteUrl => usedSprites.includes(spriteUrl)

   const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${spriteIndex}.svg`

   return (
      <div className="bg-blue-50 min-h-screen p-8">
         <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Stwórz Pokemona</h1>
         <PokemonForm
            register={register}
            errors={errors}
            onSubmit={handleSubmit(newPokemon => createPokemon(newPokemon, spriteIndex))}
            isSpriteUsed={isSpriteUsed}
            spriteUrl={spriteUrl}
            handleSpriteNavigation={handleSpriteNavigation}
         />
         {loading && <p>Trwa tworzenie Pokémona...</p>}
      </div>
   )
}
