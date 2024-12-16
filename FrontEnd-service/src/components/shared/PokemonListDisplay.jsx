import React from 'react'
import { Button } from './UI/Button'
import { TableHeaderCell } from './UI/TableHeaderCell'
import { TableCell } from './UI/TableCell'
import { Error } from './UI/Error'

export const PokemonListDisplay = ({ pokemons, onEditClick, currentPage, pageType }) => {
   if (pageType === 'edit') {
      return (
         <ul className="flex flex-col gap-5">
            {pokemons.map((pokemon, index) => (
               <li
                  key={`${index}-${pokemon.id}`}
                  className="flex flex-col md:flex-row items-center justify-between p-4 shadow-lg rounded-lg bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 dark:bg-dark-input dark:bg-none"
               >
                  <div className="flex flex-col md:flex-row items-center md:gap-10 gap-5 mb-4 md:mb-0">
                     <span className="text-sm sm:text-base">{(currentPage - 1) * 15 + index + 1}</span>
                     <span className="text-sm sm:text-base">{pokemon.name}</span>
                     <img
                        src={pokemon.sprites?.other.dream_world.front_default || pokemon.sprite}
                        alt={pokemon.name}
                        className="w-24 h-24"
                     />
                  </div>
                  {onEditClick && (
                     <Button onClick={() => onEditClick(pokemon)} className="w-full sm:w-auto">
                        Edytuj
                     </Button>
                  )}
               </li>
            ))}
         </ul>
      )
   }

   if (pageType === 'ranking') {
      return (
         <div className="overflow-x-auto rounded-3xl border">
            <table className="sm:text-sm md:text-base">
               <thead>
                  <tr>
                     <TableHeaderCell>ID</TableHeaderCell>
                     <TableHeaderCell>Nazwa Pokémona</TableHeaderCell>
                     <TableHeaderCell>Obrazek</TableHeaderCell>
                     <TableHeaderCell>Doświadczenie</TableHeaderCell>
                     <TableHeaderCell>Waga</TableHeaderCell>
                     <TableHeaderCell>Wzrost</TableHeaderCell>
                     <TableHeaderCell>Liczba wygranych walk</TableHeaderCell>
                  </tr>
               </thead>
               <tbody>
                  {pokemons.map((pokemon, index) => (
                     <tr key={pokemon.id} className="text-center even:bg-light-row-even even:dark:bg-dark-row-even">
                        <TableCell>{(currentPage - 1) * 15 + index + 1}</TableCell>
                        <TableCell>{pokemon.name}</TableCell>
                        <TableCell className="flex justify-center items-center">
                           <img
                              src={pokemon.sprites?.other.dream_world.front_default || pokemon.sprite}
                              alt={pokemon.name}
                              className="w-12 h-12 sm:w-16 sm:h-16"
                           />
                        </TableCell>
                        <TableCell>{pokemon.base_experience}</TableCell>
                        <TableCell>{pokemon.weight}</TableCell>
                        <TableCell>{pokemon.height}</TableCell>
                        <TableCell>{pokemon.wins}</TableCell>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      )
   }

   return <Error>Nie znaleziono widoku</Error>
}
