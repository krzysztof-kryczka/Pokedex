import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useFavorites } from '../hooks/useFavorites'
import { PokemonCard } from '../shared/PokemonCard'
import { useSnackbar } from 'notistack'
import { Pagination } from '../components/Pagination'
import { useNavigate } from 'react-router-dom'
import { Header } from '../shared/UI/Header'
import { Wrapper } from '../shared/UI/Wrapper'

export const FavoritesPage = () => {
   const { user } = useAuth()
   const { enqueueSnackbar } = useSnackbar()
   const { favoriteDetails, toggleFavorite, fetchFavorites } = useFavorites(user?.id, enqueueSnackbar)
   const [currentPage, setCurrentPage] = useState(1)
   const navigate = useNavigate()

   const totalCount = favoriteDetails.length
   const startIndex = (currentPage - 1) * 15
   const endIndex = currentPage * 15

   // Logic to automatically change currentPage to the previous page if the current page is empty
   useEffect(() => {
      if (currentPage > 1 && favoriteDetails.slice(startIndex, endIndex).length === 0) {
         setCurrentPage(currentPage - 1)
      }
   }, [favoriteDetails, currentPage, startIndex, endIndex])

   const handleRemoveFavorite = async (pokemonId, e) => {
      e.stopPropagation() // Prevent click event from bubbling up to the card
      await toggleFavorite(pokemonId)
      fetchFavorites()
   }

   const handleCardClick = pokemon => {
      navigate(`/pokemon/${pokemon.id}`)
   }

   return (
      <Wrapper>
         <Header variant="h1">Ulubione Pokemony</Header>
         {favoriteDetails.length === 0 ? (
            <p className="text-center text-lg">
               Nie masz jeszcze żadnych ulubionych pokemonów. Dodaj je klikając w ikonę serca na karcie pokemona.
            </p>
         ) : (
            <>
               <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                  {favoriteDetails.slice(startIndex, endIndex).map(pokemon => (
                     <li
                        key={pokemon.id}
                        className="border rounded-3xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50"
                        onClick={() => handleCardClick(pokemon)}
                     >
                        <PokemonCard
                           pokemon={pokemon}
                           imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                           imageClassName="flex justify-center items-center"
                           cardClassName="flex flex-col md:flex-col justify-around"
                           toggleFavorite={e => handleRemoveFavorite(pokemon.id, e)}
                           isFavorite={true}
                           showFavorite={true}
                        />
                     </li>
                  ))}
               </ul>
               {Math.ceil(totalCount / 15) > 1 && (
                  <Pagination
                     currentPage={currentPage}
                     totalPages={Math.ceil(totalCount / 15)}
                     onPageChange={setCurrentPage}
                     pageType="favorites"
                  />
               )}
            </>
         )}
      </Wrapper>
   )
}
