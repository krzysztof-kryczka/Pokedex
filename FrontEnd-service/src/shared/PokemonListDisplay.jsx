import React from 'react'

export const PokemonListDisplay = ({ pokemons, onEditClick, currentPage, pageType }) => {
   if (pageType === 'edit') {
      return (
         <ul className="space-y-4">
            {pokemons.map((pokemon, index) => (
               <li
                  key={`${index}-${pokemon.id}`}
                  className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow rounded-lg"
               >
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                     <span>{(currentPage - 1) * 15 + index + 1}</span>
                     <span>{pokemon.name}</span>
                     <img
                        src={pokemon.sprites?.other.dream_world.front_default || pokemon.sprite}
                        alt={pokemon.name}
                        className="w-16 h-16 md:w-20 md:h-20"
                     />
                  </div>
                  {onEditClick && (
                     <button
                        onClick={() => onEditClick(pokemon)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full md:w-auto"
                     >
                        Edytuj
                     </button>
                  )}
               </li>
            ))}
         </ul>
      )
   }

   if (pageType === 'ranking') {
      return (
         <table className="min-w-full bg-white">
            <thead>
               <tr>
                  <th className="py-2">ID</th>
                  <th className="py-2">Nazwa Pokémona</th>
                  <th className="py-2">Obrazek</th>
                  <th className="py-2">Doświadczenie</th>
                  <th className="py-2">Waga</th>
                  <th className="py-2">Wzrost</th>
                  <th className="py-2">Liczba wygranych walk</th>
               </tr>
            </thead>
            <tbody>
               {pokemons.map((pokemon, index) => (
                  <tr key={pokemon.id} className="text-center">
                     <td className="py-2">{(currentPage - 1) * 15 + index + 1}</td>
                     <td className="py-2">{pokemon.name}</td>
                     <td className="py-2 flex justify-center items-center">
                        <img
                           src={pokemon.sprites?.other.dream_world.front_default || pokemon.sprite}
                           alt={pokemon.name}
                           className="w-16 h-16 md:w-20 md:h-20"
                        />
                     </td>
                     <td className="py-2">{pokemon.base_experience}</td>
                     <td className="py-2">{pokemon.weight}</td>
                     <td className="py-2">{pokemon.height}</td>
                     <td className="py-2">{pokemon.battle_wins}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      )
   }

   return <p className="text-center text-red-500">Nie znaleziono widoku</p>
}
