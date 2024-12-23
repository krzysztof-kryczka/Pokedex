import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editPokemonSchema } from '../schemas/pokemonSchema'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { useManagePokemon } from '../hooks/useManagePokemon'
import { PokemonForm } from '../components/shared/PokemonForm'
import { Pagination } from '../components/Pagination'
import { usePokemon } from '../context/PokemonContext'
import { Loader } from '../components/Loader'
import { PokemonListDisplay } from '../components/shared/PokemonListDisplay'
import { Button } from '../components/shared/UI/Button'
import { Header } from '../components/shared/UI/Header'
import { Wrapper } from '../components/shared/UI/Wrapper'

export const EditPage = () => {
   const { pokemons: contextPokemons = [], totalCount } = usePokemon()
   const { isLoading, error, currentPage, setCurrentPage } = useFetchPokemons(15, true)
   const [selectedPokemon, setSelectedPokemon] = useState(null)
   const navigate = useNavigate()
   const { savePokemon } = useManagePokemon(navigate)

   const methods = useForm({ resolver: zodResolver(editPokemonSchema) })

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
         methods.reset({
            name: selectedPokemon.name,
            weight: selectedPokemon.weight,
            height: selectedPokemon.height,
            base_experience: selectedPokemon.base_experience,
            sprite: selectedPokemon.sprites?.other.dream_world.front_default || selectedPokemon.sprite,
            abilities: selectedPokemon.abilities ? selectedPokemon.abilities.map(a => a.ability.name).join(', ') : '',
         })
      }
   }, [selectedPokemon])

   const handlePageChange = page => {
      setSelectedPokemon(null)
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   return (
      <Wrapper>
         <div className="pt-8">
            <Button onClick={() => navigate('/create')}>Stwórz Pokémona</Button>
         </div>

         <Header variant="h1">Lista Pokémonów</Header>
         {error && <Error>Błąd podczas ładowania Pokémonów: {error.message}</Error>}
         {isLoading ? (
            <Loader />
         ) : (
            <>
               <PokemonListDisplay
                  pokemons={contextPokemons.slice((currentPage - 1) * 15, currentPage * 15)}
                  onEditClick={handleEditClick}
                  currentPage={currentPage}
                  pageType="edit"
               />
               {selectedPokemon && (
                  <div ref={formRef} className="mt-8">
                     <FormProvider {...methods}>
                        <PokemonForm
                           pokemon={selectedPokemon}
                           onSubmit={methods.handleSubmit(updatedPokemon => {
                              savePokemon({ ...selectedPokemon, ...updatedPokemon })
                           })}
                           isEditing={true}
                        />
                     </FormProvider>
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
      </Wrapper>
   )
}
