import React, { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editPokemonSchema } from '../schemas/pokemonSchema'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { useManagePokemon } from '../hooks/useManagePokemon'
import { PokemonForm } from '../shared/PokemonForm'
import { Pagination } from '../components/Pagination'
import { usePokemon } from '../context/PokemonContext'
import { Loader } from '../components/Loader'
import { PokemonListDisplay } from '../shared/PokemonListDisplay'
import { ThemeContext } from '../context/ThemeContext'
import clsx from 'clsx'
import { StyledButton } from '../shared/StyledButton'

export const EditPage = () => {
   const { pokemons: contextPokemons = [], setPokemons, totalCount } = usePokemon()
   const { pokemons: fetchedPokemons = [], isLoading, error, currentPage, setCurrentPage } = useFetchPokemons(15, true)
   const [selectedPokemon, setSelectedPokemon] = useState(null)
   const navigate = useNavigate()
   const { savePokemon, loading } = useManagePokemon(navigate)
   const { theme } = useContext(ThemeContext)

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      resolver: zodResolver(editPokemonSchema),
      mode: 'onSubmit',
   })

   const formRef = useRef(null)

   const handleEditClick = pokemon => {
      if (selectedPokemon && selectedPokemon.name === pokemon.name) {
         setSelectedPokemon(null)
      } else {
         setSelectedPokemon(pokemon)
         setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' })
         }, 100)
      }
   }

   useEffect(() => {
      if (selectedPokemon) {
         reset({
            name: selectedPokemon.name,
            weight: selectedPokemon.weight,
            height: selectedPokemon.height,
            base_experience: selectedPokemon.base_experience,
            sprite: selectedPokemon.sprites?.other.dream_world.front_default || selectedPokemon.sprite,
            abilities: selectedPokemon.abilities ? selectedPokemon.abilities.map(a => a.ability.name).join(', ') : '',
         })
      }
   }, [selectedPokemon, reset])

   const handlePageChange = page => {
      console.log('Changing to page:', page)
      setSelectedPokemon(null)
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   return (
      <div
         className={clsx('bg-light-blue min-h-screen p-4 md:p-8', {
            'dark:bg-dark-background dark': theme === 'dark',
         })}
      >
         <StyledButton onClick={() => navigate('/create')}>Stwórz Pokémona</StyledButton>
         <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8 text-blue-700">Lista Pokémonów</h1>
         {error && (
            <p className="text-center text-red-700 font-bold">Błąd podczas ładowania Pokémonów: {error.message}</p>
         )}
         {isLoading ? (
            <Loader />
         ) : (
            <>
               <PokemonListDisplay
                  pokemons={contextPokemons}
                  onEditClick={handleEditClick}
                  currentPage={currentPage}
                  pageType="edit"
               />
               {selectedPokemon && (
                  <div ref={formRef} className="mt-8">
                     <PokemonForm
                        pokemon={selectedPokemon}
                        register={register}
                        errors={errors}
                        onSubmit={handleSubmit(updatedPokemon => {
                           savePokemon({ ...selectedPokemon, ...updatedPokemon })
                        })}
                        isEditing={true}
                     />
                  </div>
               )}
               <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalCount / 15)}
                  onPageChange={handlePageChange}
                  pageType="edit"
               />
            </>
         )}
      </div>
   )
}
