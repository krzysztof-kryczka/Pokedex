import { useState } from 'react'
import axios from 'axios'

export const useAuth = () => {
   const [loading, setLoading] = useState(false)

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
   return { register, loading }
}
