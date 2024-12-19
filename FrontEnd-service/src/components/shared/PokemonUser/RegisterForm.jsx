import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '../UI/Button'
import { FormField } from '../UI/FormField'

export const RegisterForm = ({ onSubmit, loading }) => {
   const { handleSubmit } = useFormContext()

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="max-w-2xl mx-auto p-4 border rounded-lg shadow-lg flex flex-col gap-5 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50
            dark:border-dark-border dark:bg-none"
      >
         <FormField label="Imię" type="text" name="name" />
         <FormField label="Email" type="email" name="email" />
         <FormField label="Hasło" type="password" name="password" />
         <FormField label="Powtórz hasło" type="password" name="repeatPassword" />
         <Button type="submit" disabled={loading}>
            {loading ? 'Rejestracja...' : 'Zarejestruj się'}
         </Button>
      </form>
   )
}
