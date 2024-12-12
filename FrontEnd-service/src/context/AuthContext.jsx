import { createContext, useState, useContext, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null)

   const isAuthenticated = user ? true : false

   useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if (storedUser) {
         setUser(storedUser)
      }
   }, [])

   return <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
