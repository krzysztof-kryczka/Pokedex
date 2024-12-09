import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAuth } from '../hooks/useAuth'
import { useSnackbar } from 'notistack'
import { ThemeContext } from '../context/ThemeContext'
import { FaSun, FaMoon, FaBars, FaTimes, FaUser } from 'react-icons/fa'
import clsx from 'clsx'

export const Navigation = () => {
   const { user, isAuthenticated, logout } = useAuth()
   const { enqueueSnackbar } = useSnackbar()
   const { theme, toggleTheme } = useContext(ThemeContext)
   const [menuOpen, setMenuOpen] = useState(false)

   const handleMenuToggle = () => {
      setMenuOpen(!menuOpen)
   }

   return (
      <header className={clsx('w-full p-4 shadow-md', theme === 'dark' ? 'bg-dark-section' : 'bg-light-section')}>
         <div className="flex items-center justify-between">
            <Link to="/" className="flex justify-center md:justify-start">
               <img src={logo} alt="Pokémon Logo" className="h-16 md:h-24" />
            </Link>
            <button className="md:hidden text-white" onClick={handleMenuToggle}>
               {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
            <div className="hidden md:flex flex-col items-end md:space-x-4">
               <div className="flex items-center mb-4 space-x-4">
                  {isAuthenticated && (
                     <p className="text-white flex items-center">
                        <FaUser className="mr-2" /> {`Zalogowany jako: ${user.name}`}
                     </p>
                  )}
                  <div
                     className="relative flex items-center justify-center w-16 h-8 bg-dark-background rounded-full cursor-pointer"
                     onClick={toggleTheme}
                  >
                     <div
                        className={clsx(
                           'absolute w-11 h-11 rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300',
                           theme === 'dark' ? 'bg-dark-background translate-x-3' : 'bg-light-background -translate-x-3',
                        )}
                     >
                        {theme === 'dark' ? (
                           <FaMoon className="text-blue-500" />
                        ) : (
                           <FaSun className="text-yellow-500" />
                        )}
                     </div>
                  </div>
               </div>
               <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                  {isAuthenticated ? (
                     <>
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
                        <Link
                           onClick={() => logout(enqueueSnackbar)}
                           className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center w-32"
                        >
                           Wyloguj
                        </Link>
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
         </div>
         {menuOpen && (
            <div className="md:hidden mt-4 space-y-2 text-center">
               {isAuthenticated ? (
                  <>
                     <p className="text-white flex items-center justify-center">
                        <FaUser className="mr-2" /> {`Zalogowany jako: ${user.name}`}
                     </p>
                     <Link
                        to="/favorites"
                        className="block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center"
                        onClick={handleMenuToggle}
                     >
                        Ulubione
                     </Link>
                     <Link
                        to="/arena"
                        className="block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center"
                        onClick={handleMenuToggle}
                     >
                        Arena
                     </Link>
                     <Link
                        to="/ranking"
                        className="block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center"
                        onClick={handleMenuToggle}
                     >
                        Ranking
                     </Link>
                     <Link
                        to="/edit"
                        className="block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center"
                        onClick={handleMenuToggle}
                     >
                        Edycja
                     </Link>
                     <Link
                        onClick={() => {
                           logout(enqueueSnackbar)
                           handleMenuToggle()
                        }}
                        className="block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center"
                     >
                        Wyloguj
                     </Link>
                  </>
               ) : (
                  <>
                     <Link
                        to="/login"
                        className="block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center"
                        onClick={handleMenuToggle}
                     >
                        Logowanie
                     </Link>
                     <Link
                        to="/register"
                        className="block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700 text-center"
                        onClick={handleMenuToggle}
                     >
                        Rejestracja
                     </Link>
                  </>
               )}
               <div
                  className="flex justify-center py-2"
                  onClick={() => {
                     toggleTheme()
                     handleMenuToggle()
                  }}
               >
                  <div
                     className={clsx(
                        'w-16 h-16 rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300',
                        theme === 'dark' ? 'bg-dark-background' : 'bg-light-background',
                     )}
                  >
                     {theme === 'dark' ? <FaMoon className="text-blue-500" /> : <FaSun className="text-yellow-500" />}
                  </div>
               </div>
            </div>
         )}
      </header>
   )
}
