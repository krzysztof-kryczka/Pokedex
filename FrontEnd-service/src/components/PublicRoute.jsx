import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const PublicRoute = ({ element }) => {
   const { isAuthenticated } = useAuth()

   return isAuthenticated ? <Navigate to="/" /> : element
}
