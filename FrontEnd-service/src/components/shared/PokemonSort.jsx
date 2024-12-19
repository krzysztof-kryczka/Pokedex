import React from 'react'
import { Button } from './UI/Button'

export const PokemonSort = ({ sortCriteria, sortOrder, onSortChange, onOrderChange }) => {
   const handleSortChange = e => {
      const criteria = e.target.value
      onSortChange(criteria)
   }

   const handleOrderChange = () => {
      onOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')
   }

   const getSortLabel = () => {
      switch (sortCriteria) {
         case 'base_experience':
            return 'Doświadczenie'
         case 'weight':
            return 'Waga'
         case 'height':
            return 'Wzrost'
         case 'battle_wins':
            return 'Liczba wygranych walk'
         default:
            return ''
      }
   }

   return (
      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center">
         <label htmlFor="sortCriteria" className="flex mb-2 md:mb-0 md:mr-4">
            Sortuj według:
         </label>
         <select
            id="sortCriteria"
            className="p-2 border rounded-lg w-full md:w-auto dark:bg-dark-input mb-2 md:mb-0"
            value={sortCriteria}
            onChange={handleSortChange}
         >
            <option value="base_experience">Doświadczenie</option>
            <option value="weight">Waga</option>
            <option value="height">Wzrost</option>
            <option value="wins">Liczba wygranych walk</option>
         </select>
         <Button onClick={handleOrderChange} className="md:ml-4">
            {sortOrder === 'asc' ? 'Rosnąco' : 'Malejąco'}
         </Button>
         <p className="mt-2 md:mt-0 md:ml-4">
            Obecnie sortowane według: <strong>{getSortLabel()}</strong> ({sortOrder === 'asc' ? 'Rosnąco' : 'Malejąco'})
         </p>
      </div>
   )
}
