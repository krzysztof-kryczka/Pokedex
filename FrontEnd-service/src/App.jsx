import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer.jsx'

export const App = () => {
   return (
      <div className="flex flex-col min-h-screen">
         <Navigation />
         <main className="flex-grow">
            <Outlet />
         </main>
         <Footer />
      </div>
   )
}
