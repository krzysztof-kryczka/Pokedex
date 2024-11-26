import React from 'react'
import { SpriteNavigation } from './SpriteNavigation'
import { CommonPokemonFormFields } from './CommonPokemonFormFields'

export const PokemonForm = ({
   pokemon,
   register,
   errors,
   onSubmit,
   isSpriteUsed,
   spriteUrl,
   handleSpriteNavigation,
   isEditing,
}) => (
   <form onSubmit={onSubmit}>
      <CommonPokemonFormFields
         register={register}
         errors={errors}
         pokemon={pokemon}
         buttonText={isEditing ? 'Zmień atrybuty' : 'Stwórz'}
         buttonDisabled={isEditing ? false : isSpriteUsed(spriteUrl)}
      />
      {!isEditing && (
         <>
            <input type="hidden" {...register('sprite')} value={spriteUrl} />
            <div>
               <label className="block font-semibold mb-2">Grafika</label>
               <SpriteNavigation
                  spriteUrl={spriteUrl}
                  handleSpriteNavigation={handleSpriteNavigation}
                  isSpriteUsed={isSpriteUsed}
               />
               {isSpriteUsed(spriteUrl) && (
                  <p className="text-red-500 font-semibold mt-2 text-center">
                     Obrazek został już użyty i nie może być ponownie wybrany.
                  </p>
               )}
            </div>
         </>
      )}
   </form>
)
