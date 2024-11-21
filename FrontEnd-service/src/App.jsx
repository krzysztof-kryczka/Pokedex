import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from './assets/logo.svg'

export const App = () => {
   return (
      <>
         <header className="flex flex-col md:flex-row items-center md:items-center p-4 bg-blue-500">
            <Link to="/" className="w-full flex justify-center md:justify-start">
               <img src={logo} alt="Pokémon Logo" className="h-16 md:h-24" />
            </Link>
         </header>
         <main>
            <Outlet />
         </main>
         <footer className="p-4 bg-blue-500 text-center">
            <p className="text-blue-900 font-bold">
               &copy; 2024 Pokédex. All Rights Reserved. <br />
               Developed by Krzysztof Kryczka
            </p>
         </footer>
      </>
   )
}
