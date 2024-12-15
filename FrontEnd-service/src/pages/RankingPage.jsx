import React, { useState, useContext } from 'react'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { usePokemon } from '../context/PokemonContext'
import { Loader } from '../components/Loader'
import { Pagination } from '../components/Pagination'
import { PokemonListDisplay } from '../shared/PokemonListDisplay'
import { PokemonSort } from '../shared/PokemonSort'
import { ThemeContext } from '../context/ThemeContext'
import clsx from 'clsx'

export const RankingPage = () => {
   const { pokemons: contextPokemons, totalCount } = usePokemon()
   const { isLoading, error, currentPage, setCurrentPage } = useFetchPokemons(15, true)
   const { theme } = useContext(ThemeContext)
   const [sortCriteria, setSortCriteria] = useState('base_experience')
   const [sortOrder, setSortOrder] = useState('desc')

   const sortedCurrentPokemons = [...contextPokemons].sort((a, b) => {
      if (sortOrder === 'asc') {
         return a[sortCriteria] - b[sortCriteria]
      } else {
         return b[sortCriteria] - a[sortCriteria]
      }
   })

   return (
      <div
         className={clsx('max-w-5xl mx-auto p-4 md:p-8', {
            'dark:bg-dark-background dark': theme === 'dark',
         })}
      >
         <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8 text-blue-700">Ranking Pokémonów</h1>
         {error && (
            <p className="text-center text-red-700 font-bold">Błąd podczas ładowania Pokémonów: {error.message}</p>
         )}
         {isLoading ? (
            <Loader />
         ) : (
            <>
               <PokemonSort
                  sortCriteria={sortCriteria}
                  sortOrder={sortOrder}
                  onSortChange={setSortCriteria}
                  onOrderChange={setSortOrder}
               />
               <PokemonListDisplay pokemons={sortedCurrentPokemons} currentPage={currentPage} pageType="ranking" />
               {Math.ceil(totalCount / 15) > 1 && (
                  <Pagination
                     currentPage={currentPage}
                     totalPages={Math.ceil(totalCount / 15)}
                     onPageChange={page => {
                        setCurrentPage(page)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                     }}
                     pageType="ranking"
                  />
               )}
            </>
         )}
      </div>
   )
}
