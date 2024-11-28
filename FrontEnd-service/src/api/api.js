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

// page: favorites
export const getFavoritesByUserId = userId => localAxios.get(`/favorites?userId=${userId}`)
export const addFavorite = favoriteData => localAxios.post('/favorites', favoriteData)
export const removeFavorite = favoriteId => localAxios.delete(`/favorites/${favoriteId}`)

// page: create/edit
export const fetchUsedSprites = () => localAxios.get('/pokemons')
export const savePokemon = pokemonData => localAxios.post('/pokemons', pokemonData)
export const updatePokemon = (pokemonId, pokemonData) => localAxios.put(`/pokemons/${pokemonId}`, pokemonData)
