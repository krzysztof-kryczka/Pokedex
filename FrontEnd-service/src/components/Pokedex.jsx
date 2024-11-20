import React, { useState } from 'react'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { Pagination } from './Pagination'
import { Loader } from './Loader'

const totalPokemons = 150
const pokemonsPerPage = 15
const totalPages = Math.ceil(totalPokemons / pokemonsPerPage)

export const Pokedex = () => {
   const [currentPage, setCurrentPage] = useState(1)
   const { pokemons, isLoading, error } = useFetchPokemons(pokemonsPerPage, currentPage)
   console.log(pokemons)

   const handlePageChange = pageNumber => {
      setCurrentPage(pageNumber)
   }

   return (
      <div className="p-4 max-auto mx-auto">
         {error && <p className="text-center text-red-700 font-bold">Błąd podczas pobierania danych z API.</p>}
         {isLoading && <Loader />}
         {!isLoading && !error && (
            <>
               <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                  {pokemons.results.map(pokemon => {
                     console.log('pokemon.url.split', pokemon.url.split('/'))
                     return (
                        <li key={pokemon.name} className="border rounded-lg overflow-hidden shadow-lg">
                           <div className="p-4 hover:scale-105 transform transition-transform cursor-pointer">
                              <h2 className="text-lg sm:text-xl md:text-4xl font-bold text-center uppercase">
                                 {pokemon.name}
                              </h2>
                              {/* SPRITE IMG: https://stackoverflow.com/a/71250760 */}
                              <img
                                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                                    pokemon.url.split('/')[6] // ["https:", "", "pokeapi.co", "api", "v2", "pokemon", "1", ""]
                                 }.svg`}
                                 alt={pokemon.name}
                                 className="mx-auto w-36 h-36 sm:w-48 sm:h-48 md:w-96 md:h-96 object-contain"
                              />
                           </div>
                        </li>
                     )
                  })}
               </ul>
               <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
         )}
      </div>
   )
}
