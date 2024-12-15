import React, { useContext } from 'react'
import { SpriteNavigation } from './SpriteNavigation'
import { CommonPokemonFormFields } from './CommonPokemonFormFields'
import { ThemeContext } from '../../context/ThemeContext'
import clsx from 'clsx'

export const PokemonForm = ({
   pokemon,
   register,
   errors,
   onSubmit,
   isSpriteUsed,
   spriteUrl,
   handleSpriteNavigation,
   isEditing,
}) => {
   const { theme } = useContext(ThemeContext)
   return (
      <form
         onSubmit={onSubmit}
         className={clsx(
            'p-4 border rounded-lg shadow-lg flex flex-col gap-5',
            theme === 'dark' ? 'border-gray-500' : 'bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50',
         )}
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
}
