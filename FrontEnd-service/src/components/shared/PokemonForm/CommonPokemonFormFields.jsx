import React from 'react'
import { FormField } from '../UI/FormField'
import { Button } from '../UI/Button'

export const CommonPokemonFormFields = ({ register, errors, pokemon, buttonText, buttonDisabled }) => (
   <div className="flex flex-col gap-5">
      <FormField
         label="Nazwa"
         type="text"
         defaultValue={pokemon ? pokemon.name : ''}
         register={register}
         name="name"
         errors={errors.name}
         disabled={!!pokemon}
      />
      <FormField
         label="Waga"
         type="number"
         defaultValue={pokemon ? pokemon.weight : ''}
         register={register}
         name="weight"
         min={1}
         valueAsNumber
         errors={errors.weight}
      />
      <FormField
         label="Wzrost"
         type="number"
         defaultValue={pokemon ? pokemon.height : ''}
         register={register}
         name="height"
         min={1}
         valueAsNumber
         errors={errors.height}
      />
      <FormField
         label="Doświadczenie"
         type="number"
         defaultValue={pokemon ? pokemon.base_experience : ''}
         register={register}
         name="base_experience"
         min={1}
         valueAsNumber
         errors={errors.base_experience}
      />
      <Button type="submit" className="w-full" disabled={buttonDisabled}>
         {buttonText}
      </Button>
   </div>
)
