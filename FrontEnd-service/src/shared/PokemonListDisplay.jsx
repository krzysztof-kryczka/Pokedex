import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import clsx from 'clsx'
import { StyledButton } from './StyledButton'
import { StyledTableHeaderCell } from './StyledTableHeaderCell'
import { StyledTableCell } from './StyledTableCell'

export const PokemonListDisplay = ({ pokemons, onEditClick, currentPage, pageType }) => {
   const { theme } = useContext(ThemeContext)

   if (pageType === 'edit') {
      return (
         <ul className="flex flex-col gap-5">
            {pokemons.map((pokemon, index) => (
               <li
                  key={`${index}-${pokemon.id}`}
                  className={clsx(
                     'flex flex-col md:flex-row items-center justify-between p-4 shadow-lg rounded-lg',
                     theme === 'dark' ? ' bg-dark-search' : 'bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50',
                  )}
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
                     <StyledButton onClick={() => onEditClick(pokemon)} className="w-full sm:w-auto">
                        Edytuj
                     </StyledButton>
                  )}
               </li>
            ))}
         </ul>
      )
   }

   if (pageType === 'ranking') {
      return (
         <div className="overflow-x-auto rounded-3xl border dark:border-gray-500">
            <table
               className={clsx('bg-light-background text-[7px] sm:text-sm md:text-base', {
                  'dark:bg-dark-background': theme === 'dark',
               })}
            >
               <thead>
                  <tr>
                     <StyledTableHeaderCell>ID</StyledTableHeaderCell>
                     <StyledTableHeaderCell>Nazwa Pokémona</StyledTableHeaderCell>
                     <StyledTableHeaderCell>Obrazek</StyledTableHeaderCell>
                     <StyledTableHeaderCell>Doświadczenie</StyledTableHeaderCell>
                     <StyledTableHeaderCell>Waga</StyledTableHeaderCell>
                     <StyledTableHeaderCell>Wzrost</StyledTableHeaderCell>
                     <StyledTableHeaderCell>Liczba wygranych walk</StyledTableHeaderCell>
                  </tr>
               </thead>
               <tbody>
                  {pokemons.map((pokemon, index) => (
                     <tr key={pokemon.id} className="text-center even:bg-gray-100 even:dark:bg-gray-700">
                        <StyledTableCell>{(currentPage - 1) * 15 + index + 1}</StyledTableCell>
                        <StyledTableCell>{pokemon.name}</StyledTableCell>
                        <StyledTableCell className="flex justify-center items-center">
                           <img
                              src={pokemon.sprites?.other.dream_world.front_default || pokemon.sprite}
                              alt={pokemon.name}
                              className="w-12 h-12 sm:w-16 sm:h-16"
                           />
                        </StyledTableCell>
                        <StyledTableCell>{pokemon.base_experience}</StyledTableCell>
                        <StyledTableCell>{pokemon.weight}</StyledTableCell>
                        <StyledTableCell>{pokemon.height}</StyledTableCell>
                        <StyledTableCell>{pokemon.wins}</StyledTableCell>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      )
   }

   return <p className="text-center text-red-500">Nie znaleziono widoku</p>
}
