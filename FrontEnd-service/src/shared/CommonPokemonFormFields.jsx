import React from 'react'

export const CommonPokemonFormFields = ({ register, errors, pokemon, buttonText, buttonDisabled }) => (
   <div className="space-y-4">
      <div>
         <label className="block font-semibold mb-2">Nazwa</label>
         <input
            type="text"
            defaultValue={pokemon ? pokemon.name : ''}
            {...register('name')}
            disabled={!!pokemon}
            className="w-full px-4 py-2 border rounded-lg"
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
            className="w-full px-4 py-2 border rounded-lg"
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
            className="w-full px-4 py-2 border rounded-lg"
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
            className="w-full px-4 py-2 border rounded-lg"
         />
         {errors.base_experience && <p className="text-red-500 mt-2">{errors.base_experience.message}</p>}
      </div>
      <button
         type="submit"
         className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 ${
            buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''
         }`}
         disabled={buttonDisabled}
      >
         {buttonText}
      </button>
   </div>
)