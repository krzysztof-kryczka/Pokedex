import { useState } from 'react'
import axios from 'axios'

export const useAuth = () => {
   const [loading, setLoading] = useState(false)
   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null)

   const register = async (userData, enqueueSnackbar) => {
      setLoading(true)
      try {
         const response = await axios.get('http://localhost:3000/users')
         const users = response.data
         const userExists = users.some(user => user.email === userData.email)
         if (userExists) {
            enqueueSnackbar('Użytkownik z tym adresem email już istnieje.', { variant: 'error' })
            setLoading(false)
            return false
         }
         await axios.post('http://localhost:3000/users', {
            name: userData.name,
            email: userData.email,
            password: userData.password,
         })
         enqueueSnackbar('Rejestracja zakończona pomyślnie.', { variant: 'success' })
         return true
         // eslint-disable-next-line no-unused-vars
      } catch (err) {
         enqueueSnackbar('Błąd podczas rejestracji użytkownika.', { variant: 'error' })
         return false
      } finally {
         setLoading(false)
      }
   }

   const login = async (email, password, enqueueSnackbar) => {
      setLoading(true)
      try {
         const response = await axios.get('http://localhost:3000/users')
         const users = response.data
         const user = users.find(user => user.email === email && user.password === password)
         if (!user) {
            enqueueSnackbar('Nieprawidłowy email lub hasło.', { variant: 'error' })
            setLoading(false)
            return false
         }

         setUser(user)
         localStorage.setItem('user', JSON.stringify(user))

         enqueueSnackbar('Logowanie zakończone pomyślnie.', { variant: 'success' })
         setLoading(false)
         return true
         // eslint-disable-next-line no-unused-vars
      } catch (err) {
         enqueueSnackbar('Błąd podczas logowania.', { variant: 'error' })
         setLoading(false)
         return false
      }
   }

   const logout = enqueueSnackbar => {
      setUser(null)
      localStorage.removeItem('user')
      enqueueSnackbar('Wylogowano pomyślnie.', { variant: 'success' })
   }

   const isAuthenticated = user ? true : false

   return { register, login, logout, loading, user, isAuthenticated }
}
