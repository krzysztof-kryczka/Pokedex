import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../schemas/userSchema'
import { useSnackbar } from 'notistack'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LoginForm } from '../components/LoginForm'

export const LoginPage = () => {
   const { enqueueSnackbar } = useSnackbar()
   const { login, loading, isAuthenticated } = useAuth()
   const navigate = useNavigate()
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: zodResolver(loginSchema) })

   const onSubmit = async data => {
      const result = await login(data.email, data.password, enqueueSnackbar)
      if (result) {
         enqueueSnackbar('Logowanie zakończone pomyślnie.', { variant: 'success' })
         navigate('/')
      } else {
         enqueueSnackbar('Logowanie nie powiodło się. Sprawdź swoje dane i spróbuj ponownie.', { variant: 'error' })
      }
   }

   if (isAuthenticated) {
      return <Navigate to="/" />
   }

   return (
      <div className="p-4 max-auto mx-auto">
         <h1 className="text-4xl font-bold mb-4 text-center">Logowanie</h1>
         <LoginForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onSubmit={onSubmit}
            loading={loading}
         />
      </div>
   )
}
