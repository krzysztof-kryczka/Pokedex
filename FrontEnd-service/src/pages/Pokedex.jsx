import React, { useEffect, useState } from 'react'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { Pagination } from '../components/Pagination'
import { Loader } from '../components/Loader'
import { PokemonList } from '../components/PokemonList'
import { usePokemon } from '../context/PokemonContext'

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
               <PokemonList pokemons={filteredPokemons} />
               {filteredPokemons.length >= 0 && (
                  <Pagination
                     currentPage={currentPage}
                     totalPages={Math.ceil(totalCount / pokemonsPerPage)}
                     onPageChange={setCurrentPage}
                  />
               )}
            </>
         )}
      </div>
   )
}
