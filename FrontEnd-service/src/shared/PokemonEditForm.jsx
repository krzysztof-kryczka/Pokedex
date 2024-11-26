import React from 'react'

export const PokemonEditForm = ({ pokemon, register, errors, onSubmit }) => (
   <form onSubmit={onSubmit}>
      <div className="space-y-4">
         <div>
            <label className="block font-semibold mb-2">Nazwa</label>
            <input type="text" value={pokemon.name} disabled className="w-full px-4 py-2 border rounded-lg" />
         </div>
         <div>
            <label className="block font-semibold mb-2">Waga</label>
            <input
               type="number"
               defaultValue={pokemon.weight}
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
               defaultValue={pokemon.height}
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
               defaultValue={pokemon.base_experience}
               {...register('base_experience', { valueAsNumber: true })}
               min="0"
               className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.base_experience && <p className="text-red-500 mt-2">{errors.base_experience.message}</p>}
         </div>
         <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4">
            Zmień atrybuty
         </button>
      </div>
   </form>
)
