import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from '../schemas/userSchema'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Registration = () => {
   const { enqueueSnackbar } = useSnackbar()
   const { register: registerUser, loading } = useAuth()
   const [isSubmitting, setIsSubmitting] = useState(false)
   const navigate = useNavigate()
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({ resolver: zodResolver(userSchema) })

   const onSubmit = async data => {
      setIsSubmitting(true)
      const result = await registerUser(data, enqueueSnackbar)
      if (result) {
         reset()
         enqueueSnackbar('Nastąpiło przekierowanie na stronę główną', { variant: 'info', autoHideDuration: 5000 })
         setTimeout(() => {
            navigate('/')
         }, 500)
      } else {
         setIsSubmitting(false)
      }
   }

   return (
      <div className="p-4 max-auto mx-auto">
         <h1 className="text-4xl font-bold mb-4 text-center">Rejestracja</h1>
         <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
            <div className="mb-4">
               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Imię
               </label>
               <input id="name" type="text" {...register('name')} className="mt-1 p-2 block w-full border rounded-md" />
               {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
               </label>
               <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="mt-1 p-2 block w-full border rounded-md"
               />
               {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Hasło
               </label>
               <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="mt-1 p-2 block w-full border rounded-md"
               />
               {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="mb-4">
               <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">
                  Powtórz hasło
               </label>
               <input
                  id="repeatPassword"
                  type="password"
                  {...register('repeatPassword')}
                  className="mt-1 p-2 block w-full border rounded-md"
               />
               {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword.message}</p>}
            </div>
            <button
               type="submit"
               className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
               disabled={loading || isSubmitting}
            >
               {loading || isSubmitting ? 'Rejestracja...' : 'Zarejestruj się'}
            </button>
         </form>
      </div>
   )
}
