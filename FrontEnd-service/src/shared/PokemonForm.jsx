import React from 'react'
import { SpriteNavigation } from './SpriteNavigation'

export const PokemonForm = ({ register, errors, onSubmit, isSpriteUsed, spriteUrl, handleSpriteNavigation }) => (
   <form onSubmit={onSubmit}>
      <div className="space-y-4">
         <div>
            <label className="block font-semibold mb-2">Nazwa</label>
            <input type="text" {...register('name')} className="w-full px-4 py-2 border rounded-lg" />
            {errors.name && <p className="text-red-500 mt-2">{errors.name.message}</p>}
         </div>
         <div>
            <label className="block font-semibold mb-2">Waga</label>
            <input
               type="number"
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
               {...register('base_experience', { valueAsNumber: true })}
               min="0"
               className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.base_experience && <p className="text-red-500 mt-2">{errors.base_experience.message}</p>}
         </div>
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
         <button
            type="submit"
            className={`w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 ${
               isSpriteUsed(spriteUrl) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSpriteUsed(spriteUrl)}
         >
            Stwórz
         </button>
      </div>
   </form>
)
