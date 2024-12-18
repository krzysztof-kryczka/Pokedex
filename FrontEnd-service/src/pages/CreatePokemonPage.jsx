import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPokemonSchema } from '../schemas/pokemonSchema'
import { PokemonForm } from '../components/shared/PokemonForm'
import { useManagePokemon } from '../hooks/useManagePokemon'
import { Header } from '../components/shared/UI/Header'
import { Wrapper } from '../components/shared/UI/Wrapper'

export const CreatePokemonPage = () => {
   const methods = useForm({ resolver: zodResolver(createPokemonSchema) })
   const [spriteIndex, setSpriteIndex] = useState(151)
   const navigate = useNavigate()
   const { savePokemon, loading, usedSprites } = useManagePokemon(navigate, methods.reset)

   useEffect(() => {
      const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${spriteIndex}.svg`
      methods.setValue('sprite', spriteUrl)
   }, [spriteIndex, methods])

   const handleSpriteNavigation = direction => {
      const newIndex = direction === 'next' ? spriteIndex + 1 : Math.max(151, spriteIndex - 1)
      setSpriteIndex(newIndex)
   }

   const isSpriteUsed = spriteUrl => usedSprites.includes(spriteUrl)

   const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${spriteIndex}.svg`

   return (
      <Wrapper>
         <Header variant="h1">Stwórz Pokémona</Header>
         <FormProvider {...methods}>
            <PokemonForm
               onSubmit={methods.handleSubmit(newPokemon => savePokemon(newPokemon, spriteIndex))}
               isSpriteUsed={isSpriteUsed}
               spriteUrl={spriteUrl}
               handleSpriteNavigation={handleSpriteNavigation}
               isEditing={false}
            />
         </FormProvider>
         {loading && <p>Trwa tworzenie Pokémona...</p>}
      </Wrapper>
   )
}
