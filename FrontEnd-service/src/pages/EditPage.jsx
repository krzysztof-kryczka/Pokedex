import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editPokemonSchema } from '../schemas/pokemonSchema'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { useManagePokemon } from '../hooks/useManagePokemon'
import { PokemonForm } from '../shared/PokemonForm'

export const EditPage = () => {
   const { pokemons, isLoading, error, currentPage, setCurrentPage } = useFetchPokemons(15, true)
   const [selectedPokemon, setSelectedPokemon] = useState(null)
   const navigate = useNavigate()
   const { savePokemon, loading } = useManagePokemon(navigate)

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

   if (isLoading) return <p className="text-center text-blue-700">Ładowanie Pokémonów...</p>
   if (error) return <p className="text-center text-red-700">Błąd podczas ładowania Pokémonów: {error.message}</p>

   return (
      <div className="bg-blue-50 min-h-screen p-4 md:p-8">
         <button
            onClick={() => navigate('/create')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 w-full md:w-auto"
         >
            Stwórz Pokémona
         </button>
         <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8 text-blue-700">Lista Pokémonów</h1>
         <ul className="space-y-4">
            {pokemons.map((pokemon, index) => (
               <li
                  key={`${index}-${pokemon.id || pokemon.pokemonId}`}
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
                  <button
                     onClick={() => handleEditClick(pokemon)}
                     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full md:w-auto"
                  >
                     Edytuj
                  </button>
               </li>
            ))}
         </ul>
         {selectedPokemon && (
            <div ref={formRef} className="mt-8">
               <PokemonForm
                  pokemon={selectedPokemon}
                  register={register}
                  errors={errors}
                  onSubmit={handleSubmit(updatedPokemon => {
                     console.log('Zaktualizowane dane pokémona:', {
                        ...selectedPokemon,
                        ...updatedPokemon,
                     })
                     savePokemon({
                        ...selectedPokemon,
                        ...updatedPokemon,
                     })
                  })}
                  isEditing={true}
               />
            </div>
         )}
         {loading && <p className="text-center text-blue-700">Trwa edycja Pokémona...</p>}
         <div className="flex justify-center mt-8 space-x-2">
            <button
               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full md:w-auto"
               onClick={() => setCurrentPage(currentPage - 1)}
               disabled={currentPage === 1}
            >
               Poprzednia
            </button>
            <button
               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full md:w-auto"
               onClick={() => setCurrentPage(currentPage + 1)}
               disabled={pokemons.length < 15}
            >
               Następna
            </button>
         </div>
      </div>
   )
}
