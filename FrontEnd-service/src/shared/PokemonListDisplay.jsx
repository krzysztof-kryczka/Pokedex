import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import clsx from 'clsx'
import { StyledButton } from './StyledButton'

export const PokemonListDisplay = ({ pokemons, onEditClick, currentPage, pageType }) => {
   const { theme } = useContext(ThemeContext)

   if (pageType === 'edit') {
      return (
         <ul className="space-y-4">
            {pokemons.map((pokemon, index) => (
               <li
                  key={`${index}-${pokemon.id}`}
                  className={clsx(
                     'flex flex-col md:flex-row items-center justify-between p-4 shadow rounded-lg bg-light-background',
                     {
                        'dark:bg-black': theme === 'dark',
                     },
                  )}
               >
                  <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 mb-4 md:mb-0">
                     <span className="text-sm sm:text-base">{(currentPage - 1) * 15 + index + 1}</span>
                     <span className="text-sm sm:text-base">{pokemon.name}</span>
                     <img
                        src={pokemon.sprites?.other.dream_world.front_default || pokemon.sprite}
                        alt={pokemon.name}
                        className="w-12 h-12 sm:w-16 sm:h-16"
                     />
                  </div>
                  {onEditClick && (
                     <StyledButton
                        onClick={() => onEditClick(pokemon)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
                     >
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
         <div className="overflow-x-auto">
            <table
               className={clsx('min-w-full bg-light-background text-[7px] sm:text-sm md:text-base', {
                  'dark:bg-dark-background': theme === 'dark',
               })}
            >
               <thead>
                  <tr>
                     <th className="py-1 px-2 sm:px-4 md:px-8">ID</th>
                     <th className="py-1 px-2 sm:px-4 md:px-8">Nazwa Pokémona</th>
                     <th className="py-1 px-2 sm:px-4 md:px-8">Obrazek</th>
                     <th className="py-1 px-2 sm:px-4 md:px-8">Doświadczenie</th>
                     <th className="py-1 px-2 sm:px-4 md:px-8">Waga</th>
                     <th className="py-1 px-2 sm:px-4 md:px-8">Wzrost</th>
                     <th className="py-1 px-2 sm:px-4 md:px-8">Liczba wygranych walk</th>
                  </tr>
               </thead>
               <tbody>
                  {pokemons.map((pokemon, index) => (
                     <tr key={pokemon.id} className="text-center">
                        <td className="py-1 px-2 sm:px-4 md:px-8">{(currentPage - 1) * 15 + index + 1}</td>
                        <td className="py-1 px-2 sm:px-4 md:px-8">{pokemon.name}</td>
                        <td className="py-1 px-2 sm:px-4 md:px-8 flex justify-center items-center">
                           <img
                              src={pokemon.sprites?.other.dream_world.front_default || pokemon.sprite}
                              alt={pokemon.name}
                              className="w-12 h-12 sm:w-16 sm:h-16"
                           />
                        </td>
                        <td className="py-1 px-2 sm:px-4 md:px-8">{pokemon.base_experience}</td>
                        <td className="py-1 px-2 sm:px-4 md:px-8">{pokemon.weight}</td>
                        <td className="py-1 px-2 sm:px-4 md:px-8">{pokemon.height}</td>
                        <td className="py-1 px-2 sm:px-4 md:px-8">{pokemon.wins}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      )
   }

   return <p className="text-center text-red-500">Nie znaleziono widoku</p>
}
