import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../schemas/userSchema'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LoginForm } from '../shared/PokemonUser/LoginForm'
import { Header } from '../shared/UI/Header'
import { Wrapper } from '../shared/UI/Wrapper'

export const LoginPage = () => {
   const { enqueueSnackbar } = useSnackbar()
   const { login, loading } = useAuth()
   const navigate = useNavigate()
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: zodResolver(loginSchema) })

   const onSubmit = async data => {
      const result = await login(data.email, data.password, enqueueSnackbar)
      if (result) {
         navigate('/')
      }
   }

   return (
      <Wrapper>
         <Header variant="h1">Logowanie</Header>
         <LoginForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onSubmit={onSubmit}
            loading={loading}
         />
      </Wrapper>
   )
}
