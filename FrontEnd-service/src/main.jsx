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
import { RankingPage } from './pages/RankingPage.jsx'
import { ArenaPage } from './pages/ArenaPage.jsx'
import { PrivateRoute } from './components/PrivateRoute.jsx'
import { PublicRoute } from './components/PublicRoute.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

const router = createBrowserRouter([
   {
      element: <App />,
      path: '/',
      children: [
         { path: '/', element: <Pokedex /> },
         { path: 'pokemon/:name', element: <PokemonDetails /> },
         // public route
         { path: 'register', element: <PublicRoute element={<RegisterPage />} /> },
         { path: 'login', element: <PublicRoute element={<LoginPage />} /> },
         // private route
         { path: 'favorites', element: <PrivateRoute element={<FavoritesPage />} /> },
         { path: 'edit', element: <PrivateRoute element={<EditPage />} /> },
         { path: 'create', element: <PrivateRoute element={<CreatePokemonPage />} /> },
         { path: 'ranking', element: <PrivateRoute element={<RankingPage />} /> },
         { path: 'arena', element: <PrivateRoute element={<ArenaPage />} /> },
         { path: '*', element: <Navigate to="/" /> },
      ],
   },
])

createRoot(document.getElementById('root')).render(
   // <StrictMode>
   <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <ThemeProvider>
         <AuthProvider>
            <PokemonProvider>
               <RouterProvider router={router} />
            </PokemonProvider>
         </AuthProvider>
      </ThemeProvider>
   </SnackbarProvider>,
   // </StrictMode>,
)
