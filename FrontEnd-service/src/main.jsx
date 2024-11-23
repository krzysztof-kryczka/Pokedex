import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Pokedex } from './components/Pokedex.jsx'
import { PokemonDetails } from './components/PokemonDetails.jsx'
import { PokemonProvider } from './context/PokemonContext.jsx'
import { SnackbarProvider } from 'notistack'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'

const router = createBrowserRouter([
   {
      element: <App />,
      path: '/',
      children: [
         { path: '/', element: <Pokedex /> },
         { path: 'pokemon/:name', element: <PokemonDetails /> },
         { path: 'register', element: <RegisterPage /> },
         { path: 'login', element: <LoginPage /> },
      ],
   },
])

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
         <PokemonProvider>
            <RouterProvider router={router} />
         </PokemonProvider>
      </SnackbarProvider>
   </StrictMode>,
)
