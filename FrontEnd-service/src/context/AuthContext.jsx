import React, { createContext, useState, useEffect } from 'react'
import { validateUser } from '../api'
import { useSnackbar } from 'notistack'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
   const { enqueueSnackbar } = useSnackbar()
   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null)

   const isAuthenticated = user ? true : false

   useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if (storedUser) {
         const validateStoredUser = async () => {
            try {
               const isValid = await validateUser(storedUser)
               if (isValid) {
                  setUser(storedUser)
               } else {
                  setUser(null)
                  localStorage.removeItem('user')
                  enqueueSnackbar(
                     'Nieprawidłowe dane użytkownika. Dane przechowywane w localStorage są niezgodne z tymi na serwerze. Proszę zalogować się ponownie.',
                     {
                        variant: 'error',
                     },
                  )
               }
            } catch (error) {
               console.error('Błąd podczas walidacji użytkownika:', error)
               setUser(null)
               localStorage.removeItem('user')
               enqueueSnackbar('Wystąpił błąd podczas walidacji użytkownika. Proszę zalogować się ponownie.', {
                  variant: 'error',
               })
            }
         }

         validateStoredUser()
      }
   }, [enqueueSnackbar])

   return <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
