import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation } from './components/Navigation'

export const App = () => {
   return (
      <>
         <Navigation />
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
