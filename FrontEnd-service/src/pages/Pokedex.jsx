import React, { useEffect, useState, useContext } from 'react'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { Pagination } from '../components/Pagination'
import { Loader } from '../components/Loader'
import { PokemonList } from '../components/PokemonList'
import { usePokemon } from '../context/PokemonContext'
import { ThemeContext } from '../context/ThemeContext'
import clsx from 'clsx'

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
   const { theme } = useContext(ThemeContext)

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
      <div className="p-4">
         {error && <p className="text-center text-red-700 font-bold">Błąd podczas pobierania danych z API.</p>}
         {isLoading && <Loader />}
         <input
            type="text"
            placeholder="Szukaj Pokémona"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={clsx(
               'p-2 border rounded w-full mb-4 md:p-3 md:mb-6 lg:p-4 lg:mb-8  text-black',
               theme === 'dark'
                  ? 'bg-dark-search border-gray-500 text-white'
                  : 'bg-gradient-to-r from-blue-200 via-blue-50 to-blue-100',
            )}
         />
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
      </div>
   )
}
