import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import clsx from 'clsx'
import { StyledButton } from './StyledButton'

export const CommonPokemonFormFields = ({ register, errors, pokemon, buttonText, buttonDisabled }) => {
   const { theme } = useContext(ThemeContext)
   return (
      <div className="space-y-4">
         <div>
            <label className="block font-semibold mb-2">Nazwa</label>
            <input
               type="text"
               defaultValue={pokemon ? pokemon.name : ''}
               {...register('name')}
               disabled={!!pokemon}
               className={clsx('w-full px-4 py-2 border rounded-lg', theme === 'dark' ? 'bg-dark-search' : '')}
            />
            {errors.name && <p className="text-red-500 mt-2">{errors.name.message}</p>}
         </div>
         <div>
            <label className="block font-semibold mb-2">Waga</label>
            <input
               type="number"
               defaultValue={pokemon ? pokemon.weight : ''}
               {...register('weight', { valueAsNumber: true })}
               min="0"
               className={clsx('w-full px-4 py-2 border rounded-lg', theme === 'dark' ? 'bg-dark-search' : '')}
            />
            {errors.weight && <p className="text-red-500 mt-2">{errors.weight.message}</p>}
         </div>
         <div>
            <label className="block font-semibold mb-2">Wzrost</label>
            <input
               type="number"
               defaultValue={pokemon ? pokemon.height : ''}
               {...register('height', { valueAsNumber: true })}
               min="0"
               className={clsx('w-full px-4 py-2 border rounded-lg', theme === 'dark' ? 'bg-dark-search' : '')}
            />
            {errors.height && <p className="text-red-500 mt-2">{errors.height.message}</p>}
         </div>
         <div>
            <label className="block font-semibold mb-2">Doświadczenie</label>
            <input
               type="number"
               defaultValue={pokemon ? pokemon.base_experience : ''}
               {...register('base_experience', { valueAsNumber: true })}
               min="0"
               className={clsx('w-full px-4 py-2 border rounded-lg', theme === 'dark' ? 'bg-dark-search' : '')}
            />
            {errors.base_experience && <p className="text-red-500 mt-2">{errors.base_experience.message}</p>}
         </div>
         <StyledButton type="submit" className="w-full" disabled={buttonDisabled}>
            {buttonText}
         </StyledButton>
      </div>
   )
}
