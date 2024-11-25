import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Pokedex } from './pages/Pokedex.jsx'
import { PokemonDetails } from './pages/PokemonDetails.jsx'
import { PokemonProvider } from './context/PokemonContext.jsx'
import { SnackbarProvider } from 'notistack'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { FavoritesPage } from './pages/FavoritesPage.jsx'
import { EditPage } from './pages/EditPage.jsx'
import { CreatePokemonPage } from './pages/CreatePokemonPage.jsx'

const router = createBrowserRouter([
   {
      element: <App />,
      path: '/',
      children: [
         { path: '/', element: <Pokedex /> },
         { path: 'pokemon/:name', element: <PokemonDetails /> },
         { path: 'register', element: <RegisterPage /> },
         { path: 'login', element: <LoginPage /> },
         { path: 'favorites', element: <FavoritesPage /> },
         { path: 'edit', element: <EditPage /> },
         { path: 'create', element: <CreatePokemonPage /> },
         { path: '*', element: <Navigate to="/" /> },
      ],
   },
])

createRoot(document.getElementById('root')).render(
   // <StrictMode>
   <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <AuthProvider>
         <PokemonProvider>
            <RouterProvider router={router} />
         </PokemonProvider>
      </AuthProvider>
   </SnackbarProvider>,
   // </StrictMode>,
)
