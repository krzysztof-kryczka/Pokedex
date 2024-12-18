import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormField } from '../UI/FormField'
import { Button } from '../UI/Button'
import { SpriteNavigation } from './SpriteNavigation'

export const PokemonForm = ({ pokemon, onSubmit, isSpriteUsed, spriteUrl, handleSpriteNavigation, isEditing }) => {
   const {
      register,
      handleSubmit,
   } = useFormContext()

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="p-4 border rounded-lg shadow-lg flex flex-col gap-5 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50
            dark:border-dark-border dark:bg-none"
      >
         <div className="flex flex-col gap-5">
            <FormField
               label="Nazwa"
               type="text"
               name="name"
               defaultValue={pokemon ? pokemon.name : ''}
               disabled={!!pokemon}
            />
            <FormField
               label="Waga"
               type="number"
               name="weight"
               defaultValue={pokemon ? pokemon.weight : ''}
               min={1}
               valueAsNumber
            />
            <FormField
               label="Wzrost"
               type="number"
               name="height"
               defaultValue={pokemon ? pokemon.height : ''}
               min={1}
               valueAsNumber
            />
            <FormField
               label="Doświadczenie"
               type="number"
               name="base_experience"
               defaultValue={pokemon ? pokemon.base_experience : ''}
               min={1}
               valueAsNumber
            />
            <Button type="submit" className="w-full" disabled={isEditing ? false : isSpriteUsed(spriteUrl)}>
               {isEditing ? 'Zmień atrybuty' : 'Stwórz'}
            </Button>
         </div>

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
}
