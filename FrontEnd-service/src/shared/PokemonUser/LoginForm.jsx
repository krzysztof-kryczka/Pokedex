import React, { useContext } from 'react'
import { Button } from '../UI/Button'
import { FormField } from '../UI/FormField'
import { ThemeContext } from '../../context/ThemeContext'
import clsx from 'clsx'

export const LoginForm = ({ register, handleSubmit, errors, onSubmit, loading }) => {
   const { theme } = useContext(ThemeContext)

   const handleFormSubmit = e => {
      e.preventDefault()
      handleSubmit(onSubmit)(e)
   }

   return (
      <form
         onSubmit={handleFormSubmit}
         className={clsx(
            'max-w-2xl mx-auto p-4 border rounded-lg shadow-lg flex flex-col gap-5',
            theme === 'dark' ? 'border-gray-500' : 'bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50',
         )}
      >
         <FormField label="Email:" type="email" register={register} name="email" errors={errors.email} />
         <FormField label="Hasło:" type="password" register={register} name="password" errors={errors.password} />
         <Button type="submit" disabled={loading}>
            {loading ? 'Logowanie...' : 'Zaloguj się'}
         </Button>
      </form>
   )
}
