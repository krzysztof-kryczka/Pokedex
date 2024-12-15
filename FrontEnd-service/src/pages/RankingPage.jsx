import React, { useState, useContext } from 'react'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { usePokemon } from '../context/PokemonContext'
import { Loader } from '../components/Loader'
import { Pagination } from '../components/Pagination'
import { PokemonListDisplay } from '../shared/PokemonListDisplay'
import { PokemonSort } from '../shared/PokemonSort'
import { ThemeContext } from '../context/ThemeContext'
import clsx from 'clsx'
import { Error } from '../shared/UI/Error'
import { Header } from '../shared/UI/Header'
import { Wrapper } from '../shared/UI/Wrapper'

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
      <Wrapper>
         <Header variant="h1">Ranking Pokémonów</Header>
         {error && <Error>Błąd podczas ładowania Pokémonów: {error.message}</Error>}
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
      </Wrapper>
   )
}
