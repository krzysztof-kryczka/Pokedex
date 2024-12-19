import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getUsers, createUser } from '../api'

export const useAuth = () => {
   const [loading, setLoading] = useState(false)
   const { user, setUser, isAuthenticated } = useContext(AuthContext)

   const register = async (userData, enqueueSnackbar) => {
      setLoading(true)
      try {
         const response = await getUsers()
         const users = response.data
         const userExists = users.some(user => user.email === userData.email)
         if (userExists) {
            enqueueSnackbar('Użytkownik z tym adresem email już istnieje.', { variant: 'error' })
            return false
         }
         await createUser({
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
         const response = await getUsers()
         const users = response.data
         const user = users.find(user => user.email === email && user.password === password)
         if (!user) {
            enqueueSnackbar('Nieprawidłowy email lub hasło.', { variant: 'error' })
            return false
         }

         setUser(user)
         const userData = { id: user.id, name: user.name, email: user.email }
         localStorage.setItem('user', JSON.stringify(userData))
         enqueueSnackbar('Logowanie zakończone pomyślnie.', { variant: 'success' })
         return true
         // eslint-disable-next-line no-unused-vars
      } catch (err) {
         enqueueSnackbar('Błąd podczas logowania.', { variant: 'error' })
         return false
      } finally {
         setLoading(false)
      }
   }

   const logout = enqueueSnackbar => {
      setUser(null)
      localStorage.removeItem('user')
      enqueueSnackbar('Wylogowano pomyślnie.', { variant: 'success' })
   }

   return { register, login, logout, loading, user, isAuthenticated }
}
