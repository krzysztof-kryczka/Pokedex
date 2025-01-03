import axios from 'axios'

const LOCAL_DB_URL = 'http://localhost:3000'
const EXTERNAL_API_URL = 'https://pokeapi.co/api/v2'

const localAxios = axios.create({
   baseURL: LOCAL_DB_URL,
})

const externalAxios = axios.create({
   baseURL: EXTERNAL_API_URL,
})

// page: everywhere required
export const getExternalPokemons = (offset, limit) => externalAxios.get(`/pokemon?offset=${offset}&limit=${limit}`)
export const getExternalPokemonDetails = url => externalAxios.get(url)
export const getPokemons = () => localAxios.get('/pokemons')
export const getLocalPokemonById = pokemonId => localAxios.get(`/pokemons?id=${pokemonId}`)

// page: register/login
export const createUser = userData => localAxios.post('/users', userData)
export const getUsers = () => localAxios.get('/users')

export const validateUser = async user => {
   try {
      const response = await localAxios.get(`/users?id=${user.id}`)
      const validUser = response.data.find(u => u.id === user.id && u.email === user.email)
      return !!validUser
   } catch (error) {
      console.error('Error validating user:', error)
      return false
   }
}

// page: favorites

export const getFavoritesByUserId = userId => localAxios.get(`/favorites?userId=${userId}`)

export const addFavorite = async (pokemonId, userId) => {
   try {
      const response = await localAxios.get(`/favorites?pokemonId=${pokemonId}`)
      const favorite = response.data[0]
      if (favorite) {
         return await localAxios.patch(`/favorites/${favorite.id}`, { userId: [...favorite.userId, userId] })
      } else {
         return await localAxios.post(`/favorites`, { pokemonId, userId: [userId], id: pokemonId })
      }
   } catch (error) {
      console.error('Error adding favorite:', error)
      throw new Error('Unable to add favorite.')
   }
}

export const removeFavorite = async (pokemonId, userId) => {
   try {
      const response = await localAxios.get(`/favorites?pokemonId=${pokemonId}`)
      const favorite = response.data[0]
      if (favorite) {
         const updatedUserId = favorite.userId.filter(id => id !== userId)
         if (updatedUserId.length > 0) {
            return await localAxios.patch(`/favorites/${favorite.id}`, { userId: updatedUserId })
         } else {
            return await localAxios.delete(`/favorites/${favorite.id}`)
         }
      }
      throw new Error(`Favorite with pokemonId ${pokemonId} not found for user ${userId}`)
   } catch (error) {
      console.error('Error removing favorite:', error)
      throw new Error('Unable to remove favorite.')
   }
}

// page: create/edit
export const fetchUsedSprites = () => localAxios.get('/pokemons')
export const savePokemon = async pokemonData => {
   const { id, name, weight, height, base_experience, sprite, abilities, wins = 0, losses = 0 } = pokemonData
   const newPokemon = { id, name, weight, height, base_experience, sprite, abilities, wins, losses }
   return localAxios.post('/pokemons', newPokemon)
}
export const updatePokemon = async (pokemonId, pokemonData) => {
   const { id, name, weight, height, base_experience, sprite, abilities, wins, losses } = pokemonData
   const updatedPokemon = { id, name, weight, height, base_experience, sprite, abilities, wins, losses }
   return localAxios.put(`/pokemons/${pokemonId}`, updatedPokemon)
}

// page: arena
export const getArena = () => localAxios.get('/arena')
export const addPokemonToArena = pokemonId => localAxios.post('/arena', { id: pokemonId })
export const removePokemonFromArena = pokemonId => localAxios.delete(`/arena/${pokemonId}`)
