// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FeaturesData from '../src/data/features_home.json'
import AccountData from '../src/data/accounts_data.json'
import Home from './pages/home/home'
import SignIn from './pages/sign-in/sign-in'
import User from './pages/user/user'
import { Provider } from 'react-redux'
import store from './redux/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserSuccess, loginUserFailure } from './redux/slice'

const App = () => {
  const dispatch = useDispatch()
  // useEffect est utilisé ici pour exécuter le code à l'intérieur une fois que le composant est monté
  useEffect(() => {
    // Récupération du token de l'utilisateur depuis localStorage
    const rememberedToken = localStorage.getItem('userToken')
    // Récupération du token de l'utilisateur depuis sessionStorage
    const sessionToken = sessionStorage.getItem('userToken')

    // Condition pour vérifier l'existence des tokens et leur origine
    if (!rememberedToken && sessionToken) {
      // S'il n'y a pas de token dans localStorage mais un dans sessionStorage
      // on considère que l'utilisateur est connecté pour la session en cours uniquement
      dispatch(loginUserSuccess({ token: sessionToken }))
    } else if (rememberedToken) {
      // Si un token est trouvé dans localStorage, on le considère comme une connexion
      dispatch(loginUserSuccess({ token: rememberedToken }))
    } else {
      // Si aucun token n'est trouvé ni dans localStorage ni dans sessionStorage,
      // on envoie une action échec avec un message demandant de se connecter.
      dispatch(loginUserFailure('No token found, please log in.'))
    }
  }, [dispatch])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home featuresData={FeaturesData} />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<User accountData={AccountData} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
