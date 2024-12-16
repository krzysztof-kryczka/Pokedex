import React, { useContext } from 'react'
import { CommonPokemonFormFields } from './CommonPokemonFormFields'
import { SpriteNavigation } from './SpriteNavigation'

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
   <form
      onSubmit={onSubmit}
      className="p-4 border rounded-lg shadow-lg flex flex-col gap-5 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50
            dark:border-dark-border dark:bg-none"
   >
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
