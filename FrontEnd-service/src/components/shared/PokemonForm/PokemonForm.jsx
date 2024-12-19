import React from 'react'
import { useFormContext } from 'react-hook-form'
import { PokemonFormFields } from './PokemonFormFields'
import { SpriteNavigation } from './SpriteNavigation'

export const PokemonForm = ({ pokemon, onSubmit, isSpriteUsed, spriteUrl, handleSpriteNavigation, isEditing }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useFormContext()

   console.log('Form errors:', errors)

   return (
      <form
         onSubmit={handleSubmit(onSubmit, errors => {
            console.log('Validation errors in form component:', errors)
         })}
         className="p-4 border rounded-lg shadow-lg flex flex-col gap-5 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 dark:border-dark-border dark:bg-none"
      >
         <PokemonFormFields
            pokemon={pokemon}
            buttonText={isEditing ? 'Zmień atrybuty' : 'Stwórz'}
            buttonDisabled={isEditing ? false : isSpriteUsed(spriteUrl)}
         />

         {!isEditing && (
            <>
               <input type="hidden" {...register('sprite')} value={isSpriteUsed(spriteUrl) ? '' : spriteUrl} />
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
}
