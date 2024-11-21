import React, { useState } from 'react'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { Pagination } from './Pagination'
import { Loader } from './Loader'

const totalPokemons = 150
const pokemonsPerPage = 15
const totalPages = Math.ceil(totalPokemons / pokemonsPerPage)

export const Pokedex = () => {
   const { pokemons, isLoading, error, currentPage, setCurrentPage } = useFetchPokemons(pokemonsPerPage)
   console.log('pokemons', pokemons)
   const [searchTerm, setSearchTerm] = useState('')
   const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))

   const handlePageChange = pageNumber => setCurrentPage(pageNumber)

   return (
      <div className="p-4 max-auto mx-auto">
         {error && <p className="text-center text-red-700 font-bold">Błąd podczas pobierania danych z API.</p>}
         {isLoading && <Loader />}
         <input
            type="text"
            placeholder="Szukaj Pokémona"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full mb-4 md:p-3 md:mb-6 lg:p-4 lg:mb-8 bg-gradient-to-r from-blue-200 via-blue-50 to-blue-100 text-black"
         />
         {!isLoading && !error && (
            <>
               <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                  {filteredPokemons.map(pokemon => {
                     console.log('pokemon.url.split', pokemon.url.split('/'))
                     return (
                        <li
                           key={pokemon.name}
                           className="border rounded-lg overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50"
                        >
                           <div className="p-4">
                              {/* SPRITE IMG: https://stackoverflow.com/a/71250760 */}
                              <img
                                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                                    pokemon.url.split('/')[6] // ["https:", "", "pokeapi.co", "api", "v2", "pokemon", "1", ""]
                                 }.svg`}
                                 alt={pokemon.name}
                                 className="mx-auto w-36 h-36 sm:w-48 sm:h-48 md:w-96 md:h-96 object-contain"
                              />
                              <h2 className="mt-4 text-lg sm:text-xl md:text-4xl font-bold text-center uppercase">
                                 {pokemon.name}
                              </h2>
                              <div className="mt-4 text-center grid grid-cols-2 gap-4">
                                 <div>
                                    <p className="text-sm sm:text-base md:text-lg">{pokemon.height}</p>
                                    <p className="text-sm sm:text-base md:text-lg font-bold">Height:</p>
                                 </div>
                                 <div>
                                    <p className="text-sm sm:text-base md:text-lg">{pokemon.base_experience}</p>
                                    <p className="text-sm sm:text-base md:text-lg font-bold">Base Exp:</p>
                                 </div>
                                 <div>
                                    <p className="text-sm sm:text-base md:text-lg">{pokemon.weight}</p>
                                    <p className="text-sm sm:text-base md:text-lg font-bold">Weight:</p>
                                 </div>
                                 <div>
                                    <p className="text-sm sm:text-base md:text-lg">
                                       {pokemon.abilities?.map(ability => ability.ability.name).join(', ')}
                                    </p>
                                    <p className="text-sm sm:text-base md:text-lg font-bold">Ability:</p>
                                 </div>
                              </div>
                           </div>
                        </li>
                     )
                  })}
               </ul>
               {filteredPokemons.length >= pokemonsPerPage && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
               )}
            </>
         )}
      </div>
   )
}
