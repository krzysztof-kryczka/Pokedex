import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

export const PrivateRoute = ({ element }) => {
   const { isAuthenticated } = useAuth()

   return isAuthenticated ? (
      element
   ) : (
      <div className="flex flex-col items-center justify-center min-h-screen">
         <p className="text-xl font-semibold mb-4">Próbujesz dostać się do chronionej części serwisu.</p>
         <p className="text-lg mb-6">
            Aby kontynuować kliknij{' '}
            <Link to="/login" className="text-blue-500 underline">
               Logowanie
            </Link>
            , jeśli nie posiadasz konta kliknij{' '}
            <Link to="/register" className="text-blue-500 underline">
               Rejestracja
            </Link>
            .
         </p>
      </div>
   )
}
