import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../schemas/userSchema'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { RegisterForm } from '../shared/PokemonUser/RegisterForm'

export const RegisterPage = () => {
   const { enqueueSnackbar } = useSnackbar()
   const { register: registerUser, loading } = useAuth()
   const navigate = useNavigate()
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({ resolver: zodResolver(registerSchema) })

   const [isSubmitting, setIsSubmitting] = useState(false)

   const onSubmit = async data => {
      setIsSubmitting(true)
      const result = await registerUser(data, enqueueSnackbar)
      if (result) {
         reset()
         navigate('/')
      } else {
         setIsSubmitting(false)
      }
   }

   return (
      <div className="p-4">
         <h1 className="text-4xl font-bold py-4 text-center">Rejestracja</h1>
         <RegisterForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onSubmit={onSubmit}
            loading={loading}
            isSubmitting={isSubmitting}
         />
      </div>
   )
}
