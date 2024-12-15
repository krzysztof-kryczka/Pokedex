import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useAuth } from '../hooks/useAuth'
import { useSnackbar } from 'notistack'
import { ThemeContext } from '../context/ThemeContext'
import { FaSun, FaMoon, FaBars, FaTimes, FaUser } from 'react-icons/fa'
import clsx from 'clsx'
import { NavLinkButton } from '../shared/UI/NavLinkButton'
import { Wrapper } from '../shared/UI/Wrapper'

export const Navigation = () => {
   const { user, isAuthenticated, logout } = useAuth()
   const { enqueueSnackbar } = useSnackbar()
   const { theme, toggleTheme } = useContext(ThemeContext)
   const [menuOpen, setMenuOpen] = useState(false)

   const handleMenuToggle = () => {
      setMenuOpen(!menuOpen)
   }

   const authenticatedLinks = [
      { to: '/favorites', text: 'Ulubione' },
      { to: '/arena', text: 'Arena' },
      { to: '/ranking', text: 'Ranking' },
      { to: '/edit', text: 'Edycja' },
   ]

   const unauthenticatedLinks = [
      { to: '/login', text: 'Logowanie' },
      { to: '/register', text: 'Rejestracja' },
   ]

   return (
      <header
         className={clsx(
            'p-4 w-full fixed top-0 left-0 right-0 z-50',
            theme === 'dark' ? 'bg-section-dark' : 'bg-section-light',
         )}
      >
         <Wrapper className="md:pt-4 pt-4">
            <div className="flex items-center justify-between">
               <Link to="/">
                  <img src={logo} alt="Pokémon Logo" className="h-16 w-auto md:h-16" />
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
                              theme === 'dark'
                                 ? 'bg-dark-background translate-x-3'
                                 : 'bg-light-background -translate-x-3',
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
                           {authenticatedLinks.map(link => (
                              <NavLinkButton key={link.to} to={link.to}>
                                 {link.text}
                              </NavLinkButton>
                           ))}
                           <NavLinkButton onClick={() => logout(enqueueSnackbar)}>Wyloguj</NavLinkButton>
                        </>
                     ) : (
                        <>
                           {unauthenticatedLinks.map(link => (
                              <NavLinkButton key={link.to} to={link.to}>
                                 {link.text}
                              </NavLinkButton>
                           ))}
                        </>
                     )}
                  </div>
               </div>
            </div>
         </Wrapper>
         {menuOpen && (
            <div className="md:hidden mt-4 space-y-2 text-center">
               {isAuthenticated ? (
                  <>
                     <p className="text-white flex items-center justify-center">
                        <FaUser className="mr-2" /> {`Zalogowany jako: ${user.name}`}
                     </p>
                     {authenticatedLinks.map(link => (
                        <NavLinkButton key={link.to} to={link.to} onClick={handleMenuToggle}>
                           {link.text}
                        </NavLinkButton>
                     ))}
                     <NavLinkButton
                        onClick={() => {
                           logout(enqueueSnackbar)
                           handleMenuToggle()
                        }}
                     >
                        Wyloguj
                     </NavLinkButton>
                  </>
               ) : (
                  <>
                     {unauthenticatedLinks.map(link => (
                        <NavLinkButton key={link.to} to={link.to} onClick={handleMenuToggle}>
                           {link.text}
                        </NavLinkButton>
                     ))}
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
