import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice'

// récupére le token stocké dans le localStorage et seesionStorage
const tokenFromStorage = localStorage.getItem('token')
const tokenFromSession = sessionStorage.getItem('token')

// Utilise sessionStorage si localStorage est vide
const token = tokenFromStorage || tokenFromSession

const store = configureStore({
  reducer: {
    token: token,
    auth: authReducer,
  },
})

export default store
