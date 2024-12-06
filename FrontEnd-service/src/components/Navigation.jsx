import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAuth } from '../hooks/useAuth'
import { useSnackbar } from 'notistack'
import { ThemeContext } from '../context/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'
import clsx from 'clsx'

export const Navigation = () => {
   const { user, isAuthenticated, logout } = useAuth()
   const { enqueueSnackbar } = useSnackbar()
   const { theme, toggleTheme } = useContext(ThemeContext)

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
                        onClick={() => logout(enqueueSnackbar)}
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
               <div
                  className="relative flex items-center justify-center w-16 h-8 dark:bg-dark-background rounded-full cursor-pointer"
                  onClick={toggleTheme}
               >
                  <div
                     className={clsx(
                        'absolute w-11 h-11 rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300',
                        theme === 'dark' ? 'bg-dark-background translate-x-3' : 'bg-light-background -translate-x-3',
                     )}
                  >
                     {theme === 'dark' ? <FaMoon className="text-blue-500" /> : <FaSun className="text-yellow-500" />}
                  </div>
               </div>
            </div>
         </div>
      </header>
   )
}
