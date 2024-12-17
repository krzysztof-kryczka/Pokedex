import React, { useState, useEffect } from 'react'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { Pagination } from '../components/Pagination'
import { Loader } from '../components/Loader'
import { PokemonList } from '../components/PokemonList'
import { usePokemon } from '../context/PokemonContext'
import { Error } from '../components/shared/UI/Error'
import { PokemonSearch } from '../components/shared/PokemonSearch'
import { Wrapper } from '../components/shared/UI/Wrapper'

const pokemonsPerPage = 15

export const Pokedex = () => {
   const { pokemons: contextPokemons = [] } = usePokemon()
   const { isLoading, error, currentPage, setCurrentPage } = useFetchPokemons(pokemonsPerPage)
   const [searchTerm, setSearchTerm] = useState('')
   const [filteredPokemons, setFilteredPokemons] = useState([])

   useEffect(() => {
      setFilteredPokemons(
         contextPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())),
      )
   }, [searchTerm, contextPokemons])

   const handlePageChange = page => {
      console.log('Changing to page:', page)
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   const startIndex = (currentPage - 1) * pokemonsPerPage
   const currentPokemons = filteredPokemons.slice(startIndex, startIndex + pokemonsPerPage)

   const totalFilteredPages = Math.ceil(filteredPokemons.length / pokemonsPerPage)

   return (
      <Wrapper>
         {error && <Error>Błąd podczas pobierania danych z API.</Error>}
         {isLoading && <Loader />}
         {!isLoading && !error && (
            <>
               <PokemonSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
               <PokemonList pokemons={currentPokemons} />
               {filteredPokemons.length > 0 && (
                  <Pagination
                     currentPage={currentPage}
                     totalPages={totalFilteredPages}
                     onPageChange={handlePageChange}
                  />
               )}
            </>
         )}
      </Wrapper>
   )
}
