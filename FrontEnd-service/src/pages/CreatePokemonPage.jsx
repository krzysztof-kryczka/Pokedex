import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPokemonSchema } from '../schemas/pokemonSchema'
import { PokemonForm } from '../shared/PokemonForm'
import { useManagePokemon } from '../hooks/useManagePokemon'
import { ThemeContext } from '../context/ThemeContext'
import clsx from 'clsx'
import { Header } from '../shared/UI/Header'
import { Wrapper } from '../shared/UI/Wrapper'

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
   const navigate = useNavigate()
   const { savePokemon, loading, usedSprites } = useManagePokemon(navigate, reset)
   const { theme } = useContext(ThemeContext)

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
      <Wrapper>
         <Header variant="h1">Stwórz Pokémona</Header>
         <PokemonForm
            register={register}
            errors={errors}
            onSubmit={handleSubmit(newPokemon => savePokemon(newPokemon, spriteIndex))}
            isSpriteUsed={isSpriteUsed}
            spriteUrl={spriteUrl}
            handleSpriteNavigation={handleSpriteNavigation}
            isEditing={false}
         />
         {loading && <p>Trwa tworzenie Pokémona...</p>}
      </Wrapper>
   )
}
