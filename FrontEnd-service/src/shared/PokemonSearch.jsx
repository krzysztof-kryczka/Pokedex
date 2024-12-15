import React from 'react'
import clsx from 'clsx'
import { ThemeContext } from '../context/ThemeContext'
import { useContext } from 'react'

export const PokemonSearch = ({ searchTerm, setSearchTerm }) => {
   const { theme } = useContext(ThemeContext)

   return (
      <input
         type="text"
         placeholder="Szukaj Pokémona"
         value={searchTerm}
         onChange={e => setSearchTerm(e.target.value)}
         className={clsx(
            'px-4 py-2 border rounded-lg w-full my-8 text-black',
            theme === 'dark'
               ? 'bg-dark-search border-gray-500 text-white'
               : 'bg-gradient-to-r from-blue-200 via-blue-50 to-blue-100',
         )}
      />
   )
}
