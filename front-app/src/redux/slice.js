import { createSlice } from '@reduxjs/toolkit'

// État initial pour l'authentification
const initialState = {
  token: null,
  isAuthenticated: false,
  error: null,
  user: null,
  loading: false,
}

// Slice pour la gestion de l'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Lance le processus de connexion, à ce stade le statut est en attente et aucun token n'est stocké.
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    // Connexion réussie, le token est stocké
    loginUserSuccess(state, action) {
      state.loading = false
      state.isAuthenticated = true
      state.token = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
    },
    // Connexion échouée, enregistre l'erreur
    loginUserFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    // Déconnexion de l'utilisateur, réinitialise l'état d'authentification
    logoutUser(state) {
      state.isAuthenticated = false
      state.token = null
      state.user = null
      state.error = null
      localStorage.removeItem('token') // Supprimer le token de localStorage
    },
  },
})

// Exportation des actions de chaque slice pour utilisation dans les composants
export const {
  loginStart,
  setUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
} = authSlice.actions

// Exportation du reducer racine pour utilisation dans le store Redux
export default authSlice.reducer
