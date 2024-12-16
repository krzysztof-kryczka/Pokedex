import React, { useContext } from 'react'
import { Button } from '../UI/Button'
import { FormField } from '../UI/FormField'

export const RegisterForm = ({ register, handleSubmit, errors, onSubmit, loading, isSubmitting }) => {
   const handleFormSubmit = e => {
      e.preventDefault()
      handleSubmit(onSubmit)(e)
   }

   return (
      <form
         onSubmit={handleFormSubmit}
         className="max-w-2xl mx-auto p-4 border rounded-lg shadow-lg flex flex-col gap-5 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50
            dark:border-dark-border dark:bg-none"
      >
         <FormField label="Imię" type="text" register={register} name="name" errors={errors.name} />
         <FormField label="Email" type="email" register={register} name="email" errors={errors.email} />
         <FormField label="Hasło" type="password" register={register} name="password" errors={errors.password} />
         <FormField
            label="Powtórz hasło"
            type="password"
            register={register}
            name="repeatPassword"
            errors={errors.repeatPassword}
         />
         <Button type="submit" disabled={loading || isSubmitting}>
            {loading || isSubmitting ? 'Rejestracja...' : 'Zarejestruj się'}
         </Button>
      </form>
   )
}
