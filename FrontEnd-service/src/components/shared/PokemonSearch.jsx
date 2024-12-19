import React from 'react'

export const PokemonSearch = ({ searchTerm, setSearchTerm }) => (
   <input
      type="text"
      placeholder="Szukaj Pokémona"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      className="px-4 py-2 border rounded-lg w-full my-8
                 bg-gradient-to-r from-blue-200 via-blue-50 to-blue-100
                 dark:bg-dark-input dark:border-dark-border dark:text-dark-text
                 dark:bg-none"
   />
)
