import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Pokedex } from './components/Pokedex.jsx'
import { PokemonDetails } from './components/PokemonDetails.jsx'
import { PokemonProvider } from './context/PokemonContext.jsx'

const router = createBrowserRouter([
   {
      element: <App />,
      path: '/',
      children: [
         { path: '/', element: <Pokedex /> },
         { path: 'pokemon/:name', element: <PokemonDetails /> },
      ],
   },
])

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <PokemonProvider>
         <RouterProvider router={router} />
      </PokemonProvider>
   </StrictMode>,
)
