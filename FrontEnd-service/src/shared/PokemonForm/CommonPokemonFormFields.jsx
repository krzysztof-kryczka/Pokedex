import React from 'react'
import { StyledButton } from '../StyledButton'
import { StyledFormField } from '../StyledFormField'

export const CommonPokemonFormFields = ({ register, errors, pokemon, buttonText, buttonDisabled }) => {
   return (
      <div className="flex flex-col gap-5">
         <StyledFormField
            label="Nazwa"
            type="text"
            defaultValue={pokemon ? pokemon.name : ''}
            register={register}
            name="name"
            errors={errors.name}
            disabled={!!pokemon}
         />
         <StyledFormField
            label="Waga"
            type="number"
            defaultValue={pokemon ? pokemon.weight : ''}
            register={register}
            name="weight"
            min={1}
            valueAsNumber
            errors={errors.weight}
         />
         <StyledFormField
            label="Wzrost"
            type="number"
            defaultValue={pokemon ? pokemon.height : ''}
            register={register}
            name="height"
            min={1}
            valueAsNumber
            errors={errors.height}
         />
         <StyledFormField
            label="Doświadczenie"
            type="number"
            defaultValue={pokemon ? pokemon.base_experience : ''}
            register={register}
            name="base_experience"
            min={1}
            valueAsNumber
            errors={errors.base_experience}
         />
         <StyledButton type="submit" className="w-full" disabled={buttonDisabled}>
            {buttonText}
         </StyledButton>
      </div>
   )
}
