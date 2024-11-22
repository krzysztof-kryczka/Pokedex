import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export const Navigation = () => {
   const isAuthenticated = true
   const user = { name: 'Stefan' }

   return (
      <header className="w-full bg-blue-500 p-4 shadow-md">
         <div className="flex flex-col md:flex-row items-center justify-between">
            <Link to="/" className="flex justify-center md:justify-start">
               <img src={logo} alt="Pokémon Logo" className="h-16 md:h-24" />
            </Link>
            <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
               {isAuthenticated ? (
                  <>
                     <p className="text-white text-center md:text-left">{`Zalogowany jako: ${user.name}`}</p>
                     <Link
                        to="/favorites"
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center w-32"
                     >
                        Ulubione
                     </Link>
                     <Link
                        to="/arena"
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center w-32"
                     >
                        Arena
                     </Link>
                     <Link
                        to="/ranking"
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center w-32"
                     >
                        Ranking
                     </Link>
                     <Link
                        to="/edit"
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center w-32"
                     >
                        Edycja
                     </Link>
                     <button
                        onClick={() => {}}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center w-32"
                     >
                        Wyloguj
                     </button>
                  </>
               ) : (
                  <>
                     <Link
                        to="/login"
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center w-32"
                     >
                        Logowanie
                     </Link>
                     <Link
                        to="/register"
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center w-32"
                     >
                        Rejestracja
                     </Link>
                  </>
               )}
            </div>
         </div>
      </header>
   )
}
