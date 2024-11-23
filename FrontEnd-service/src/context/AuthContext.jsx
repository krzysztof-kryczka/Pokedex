import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null)

   const isAuthenticated = user ? true : false

   return <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>{children}</AuthContext.Provider>
}
