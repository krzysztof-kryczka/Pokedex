import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.svg'
import { useAuth } from '../../../hooks/useAuth'
import { useSnackbar } from 'notistack'
import { Wrapper } from '../UI/Wrapper'
import { MenuToggle } from './MenuToggle'
import { UserStatus } from './UserStatus'
import { ThemeToggle } from './ThemeToggle'
import { AuthenticatedLinks } from './AuthenticatedLinks'
import { UnauthenticatedLinks } from './UnauthenticatedLinks'

export const Navigation = () => {
   const [menuOpen, setMenuOpen] = useState(false)
   const { user, isAuthenticated, logout } = useAuth()
   const { enqueueSnackbar } = useSnackbar()
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
      <header className="p-4 w-full fixed top-0 left-0 right-0 z-50 bg-light-section dark:bg-dark-section">
         <Wrapper className="md:pt-4 pt-4">
            <div className="flex items-center justify-between">
               <Link to="/">
                  <img src={logo} alt="Pokémon Logo" className="h-16 w-auto md:h-16" />
               </Link>
               <MenuToggle menuOpen={menuOpen} handleMenuToggle={handleMenuToggle} />
               <div className="hidden md:flex flex-col items-end md:space-x-4">
                  <div className="flex items-center mb-4 space-x-4">
                     {isAuthenticated && <UserStatus user={user} />} <ThemeToggle />
                  </div>
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                     {isAuthenticated ? (
                        <AuthenticatedLinks
                           links={authenticatedLinks}
                           logout={logout}
                           enqueueSnackbar={enqueueSnackbar}
                           handleMenuToggle={handleMenuToggle}
                        />
                     ) : (
                        <UnauthenticatedLinks links={unauthenticatedLinks} handleMenuToggle={handleMenuToggle} />
                     )}
                  </div>
               </div>
            </div>
         </Wrapper>
         {menuOpen && (
            <div className="md:hidden mt-4 space-y-2 text-center">
               {isAuthenticated ? (
                  <>
                     <UserStatus user={user} />
                     <AuthenticatedLinks
                        links={authenticatedLinks}
                        logout={logout}
                        enqueueSnackbar={enqueueSnackbar}
                        handleMenuToggle={handleMenuToggle}
                     />
                  </>
               ) : (
                  <UnauthenticatedLinks links={unauthenticatedLinks} handleMenuToggle={handleMenuToggle} />
               )}
               <div className="flex justify-center py-2" onClick={handleMenuToggle}>
                  <ThemeToggle />
               </div>
            </div>
         )}
      </header>
   )
}
