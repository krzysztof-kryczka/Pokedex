import React from 'react'
import { FormField } from '../UI/FormField'
import { Button } from '../UI/Button'

export const PokemonFormFields = ({ pokemon, buttonText, buttonDisabled }) => (
   <div className="flex flex-col gap-5">
      <FormField
         label="Nazwa"
         type="text"
         name="name"
         defaultValue={pokemon ? pokemon.name : ''}
         disabled={!!pokemon}
      />
      <FormField
         label="Waga"
         type="number"
         name="weight"
         defaultValue={pokemon ? pokemon.weight : ''}
         min={1}
         valueAsNumber
      />
      <FormField
         label="Wzrost"
         type="number"
         name="height"
         defaultValue={pokemon ? pokemon.height : ''}
         min={1}
         valueAsNumber
      />
      <FormField
         label="Doświadczenie"
         type="number"
         name="base_experience"
         defaultValue={pokemon ? pokemon.base_experience : ''}
         min={1}
         valueAsNumber
      />

      <Button type="submit" className="w-full" disabled={buttonDisabled}>
         {buttonText}
      </Button>
   </div>
)
