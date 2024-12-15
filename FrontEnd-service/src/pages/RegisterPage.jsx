import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../schemas/userSchema'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { RegisterForm } from '../shared/PokemonUser/RegisterForm'
import { Header } from '../shared/UI/Header'
import { Wrapper } from '../shared/UI/Wrapper'

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
      <Wrapper>
         <Header variant="h1">Rejestracja</Header>
         <RegisterForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onSubmit={onSubmit}
            loading={loading}
            isSubmitting={isSubmitting}
         />
      </Wrapper>
   )
}
