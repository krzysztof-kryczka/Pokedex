import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../schemas/userSchema'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Wrapper } from '../components/shared/UI/Wrapper'
import { Header } from '../components/shared/UI/Header'
import { RegisterForm } from '../components/shared/PokemonUser/RegisterForm'

export const RegisterPage = () => {
   const { enqueueSnackbar } = useSnackbar()
   const { register: registerUser, loading } = useAuth()
   const methods = useForm({ resolver: zodResolver(registerSchema) })
   const navigate = useNavigate()

   const onSubmit = async data => {
      setIsSubmitting(true)
      const result = await registerUser(data, enqueueSnackbar)
      if (result) {
         navigate('/')
      }
   }

   return (
      <Wrapper>
         <Header variant="h1">Rejestracja</Header>
         <FormProvider {...methods}>
            <RegisterForm onSubmit={methods.handleSubmit(onSubmit)} loading={loading} />
         </FormProvider>
      </Wrapper>
   )
}
