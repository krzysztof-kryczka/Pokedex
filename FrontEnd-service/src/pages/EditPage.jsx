import React from 'react'
import { useNavigate } from 'react-router-dom'

export const EditPage = () => {
   const navigate = useNavigate()

   return (
      <div className="bg-blue-50 min-h-screen p-8">
         <button
            onClick={() => navigate('/create')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
         >
            Stwórz pokemona
         </button>
      </div>
   )
}
