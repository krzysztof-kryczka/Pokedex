import React, { useState } from 'react'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { Pagination } from '../components/Pagination'
import { Loader } from '../components/Loader'
import { PokemonList } from '../components/PokemonList'
import { usePokemon } from '../context/PokemonContext'
import { Error } from '../shared/UI/Error'
import { PokemonSearch } from '../shared/PokemonSearch'
import { Wrapper } from '../shared/UI/Wrapper'

const pokemonsPerPage = 15

export const Pokedex = () => {
   const { pokemons: contextPokemons = [], setPokemons, totalCount } = usePokemon()
   const {
      pokemons: fetchedPokemons,
      isLoading,
      error,
      currentPage,
      setCurrentPage,
   } = useFetchPokemons(pokemonsPerPage, true)

   const [searchTerm, setSearchTerm] = useState('')

   const filteredPokemons = contextPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
   )

   const handlePageChange = page => {
      console.log('Changing to page:', page)
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   return (
      <Wrapper>
         {error && <Error>Błąd podczas pobierania danych z API.</Error>}
         {isLoading && <Loader />}
         <PokemonSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
         {!isLoading && !error && (
            <>
               <PokemonList pokemons={filteredPokemons} />
               {filteredPokemons.length >= 0 && (
                  <Pagination
                     currentPage={currentPage}
                     totalPages={Math.ceil(totalCount / pokemonsPerPage)}
                     onPageChange={handlePageChange}
                  />
               )}
            </>
         )}
      </Wrapper>
   )
}
