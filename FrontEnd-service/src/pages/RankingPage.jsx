import React, { useState, useEffect } from 'react'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { usePokemon } from '../context/PokemonContext'
import { Loader } from '../components/Loader'
import { Pagination } from '../components/Pagination'
import { PokemonListDisplay } from '../components/shared/PokemonListDisplay'
import { PokemonSort } from '../components/shared/PokemonSort'
import { Wrapper } from '../components/shared/UI/Wrapper'
import { Header } from '../components/shared/UI/Header'

export const RankingPage = () => {
   const { pokemons: contextPokemons, totalCount } = usePokemon()
   const { isLoading, error, currentPage, setCurrentPage } = useFetchPokemons(15)
   const [sortCriteria, setSortCriteria] = useState('base_experience')
   const [sortOrder, setSortOrder] = useState('desc')
   const [sortedPokemons, setSortedPokemons] = useState([])

   useEffect(() => {
      const pokemonsWithDefaultWins = contextPokemons.map(pokemon => ({
         ...pokemon,
         wins: pokemon.wins ?? 0,
      }))

      const sorted = [...pokemonsWithDefaultWins].sort((a, b) => {
         if (sortOrder === 'asc') {
            return a[sortCriteria] - b[sortCriteria]
         } else {
            return b[sortCriteria] - a[sortCriteria]
         }
      })

      const startIndex = (currentPage - 1) * 15
      const paginatedSortedPokemons = sorted.slice(startIndex, startIndex + 15)

      setSortedPokemons(paginatedSortedPokemons)
   }, [contextPokemons, sortCriteria, sortOrder, currentPage])

   const handleSortChange = criteria => {
      setSortCriteria(criteria)
      setCurrentPage(1)
   }

   const handleOrderChange = () => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
      setCurrentPage(1)
   }

   const handlePageChange = page => {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

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
                  onSortChange={handleSortChange}
                  onOrderChange={handleOrderChange}
               />
               <PokemonListDisplay pokemons={sortedPokemons} currentPage={currentPage} pageType="ranking" />
               {Math.ceil(totalCount / 15) > 1 && (
                  <Pagination
                     currentPage={currentPage}
                     totalPages={Math.ceil(totalCount / 15)}
                     onPageChange={handlePageChange}
                     pageType="ranking"
                  />
               )}
            </>
         )}
      </Wrapper>
   )
}
